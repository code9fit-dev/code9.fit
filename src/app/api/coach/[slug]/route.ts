import Anthropic from "@anthropic-ai/sdk";
import type { Tier } from "@/data/coaches";
import { ALL_TIERS } from "@/data/coaches";
import { assembleSystemPrompt, COACH_TOOLS } from "@/lib/coach/assemble";
import { getPersonaBySlug } from "@/lib/coach/personas";

// Uses the Anthropic SDK (Node APIs) and streams — must run on the Node runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-sonnet-5";

// Added only when the client has active adverts to target. The AI names the
// offer; the app renders it and handles the client's request.
const OFFER_TOOL = {
  name: "surface_offer",
  description:
    "Surface a relevant specialist offer to the client, at most once, when their own message clearly matches an offer's topics and it genuinely helps. Never during a pain/injury/safety situation. Never quote a price.",
  input_schema: {
    type: "object" as const,
    properties: {
      advert_id: {
        type: "string",
        description: "The id of the offer from the SPECIALIST OFFERS list.",
      },
      reason: {
        type: "string",
        description: "One sentence on why this offer fits what the client raised.",
      },
    },
    required: ["advert_id", "reason"],
  },
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function line(obj: unknown): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(obj) + "\n");
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const persona = getPersonaBySlug(slug);
  if (!persona) {
    return Response.json({ error: "Unknown coach" }, { status: 404 });
  }

  const body = (await req.json()) as {
    messages?: ChatMessage[];
    tier?: Tier;
    planContext?: string;
    handoff?: { fromName?: string; reason?: string; clientName?: string };
    adverts?: {
      id: string;
      coach: string;
      specialty: string;
      headline: string;
      topics: string[];
    }[];
  };
  const messages = body.messages ?? [];
  const adverts = body.adverts ?? [];
  const tier: Tier =
    body.tier && ALL_TIERS.includes(body.tier) ? body.tier : "Free";

  // Tier-gating middleware (§2.3): a coach may not offer every tier.
  if (!persona.tiers.includes(tier)) {
    return Response.json(
      {
        error: `The ${persona.name} isn't available on the ${tier} tier.`,
        availableTiers: persona.tiers,
      },
      { status: 403 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    // Surface a graceful, streamed error the UI can render.
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          line({
            type: "error",
            message:
              "ANTHROPIC_API_KEY is not set on the server. Add it to .env.local to enable the coach.",
          }),
        );
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
    });
  }

  const client = new Anthropic();
  const system = assembleSystemPrompt(persona, tier);

  // Stable prompt is cached; volatile plan context goes in a second, uncached
  // system block so the cached prefix still hits.
  const systemBlocks: Anthropic.TextBlockParam[] = [
    { type: "text", text: system, cache_control: { type: "ephemeral" } },
  ];
  if (body.planContext) {
    systemBlocks.push({ type: "text", text: `# CURRENT PLAN\n${body.planContext}` });
  }
  if (body.handoff) {
    const h = body.handoff;
    systemBlocks.push({
      type: "text",
      text: `# REFERRAL HAND-OFF
The client just arrived via a referral from the ${h.fromName ?? "another C9F coach"}${
        h.reason ? ` about: ${h.reason}` : ""
      }. The first user message contains the context of what they discussed there — it is the app handing you the transcript, not the client speaking to you directly.

Open the conversation YOURSELF, proactively, in your own voice — do not wait for them to speak first:
- Greet the client${h.clientName ? ` (their name is "${h.clientName}" — use it only if it reads like a real first name, otherwise skip it)` : ""}.
- Acknowledge you can see they were referred to you about ${h.reason || "this topic"}.
- Briefly reference the specific thing they raised with the ${h.fromName ?? "other coach"} (quote or paraphrase it) so they feel remembered.
- Offer to help them understand it and get started.
Keep it warm and to 2-4 sentences, then let them respond. Do not mention transcripts, hand-offs, or that you were "given" anything.`,
    });
  }
  if (adverts.length > 0) {
    const list = adverts
      .map(
        (a) =>
          `- id=${a.id} | ${a.coach} (${a.specialty}) | headline: "${a.headline}" | topics: ${a.topics.join(", ")}`,
      )
      .join("\n");
    systemBlocks.push({
      type: "text",
      text: `# SPECIALIST OFFERS AVAILABLE
These human specialists have offers the client can request:
${list}

If — and only if — the client's OWN latest message clearly relates to one of these offers' topics, and mentioning it genuinely helps them, you may call surface_offer(advert_id, reason) ONCE in the conversation. Rules:
- NEVER surface an offer in a pain/injury/safety situation — safety escalation always takes priority.
- Do not be pushy or salesy, and never quote a price — the app shows the offer itself.
- If nothing genuinely fits what the client raised, do not surface anything.
- Answer the client's actual question first; the offer is a brief, helpful aside.`,
    });
  }

  // Convert the chat history to the API shape. The system prompt is stable per
  // (coach, tier), so cache it — history lives after the breakpoint.
  const convo: Anthropic.MessageParam[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const tools =
    adverts.length > 0 ? [...COACH_TOOLS, OFFER_TOOL] : COACH_TOOLS;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => controller.enqueue(line(obj));
      try {
        // Tool loop: stream a turn; if the model fires event tools, surface
        // them to the client, acknowledge, and continue until end_turn.
        for (let hop = 0; hop < 4; hop++) {
          const ms = client.messages.stream({
            model: MODEL,
            max_tokens: 2048,
            thinking: { type: "disabled" }, // snappy chat; rules live in the prompt
            system: systemBlocks,
            tools,
            messages: convo,
          });

          ms.on("text", (delta) => send({ type: "text", text: delta }));

          const final = await ms.finalMessage();
          convo.push({ role: "assistant", content: final.content });

          if (final.stop_reason !== "tool_use") break;

          const toolResults: Anthropic.ToolResultBlockParam[] = [];
          for (const block of final.content) {
            if (block.type === "tool_use") {
              send({ type: "event", name: block.name, input: block.input });
              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content:
                  "Acknowledged. The app has surfaced this to the user — continue coaching.",
              });
            }
          }
          convo.push({ role: "user", content: toolResults });
        }
        send({ type: "done" });
      } catch (err) {
        send({
          type: "error",
          message: err instanceof Error ? err.message : "Coach request failed.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
