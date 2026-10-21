/**
 * Coach Orchestration Layer (architecture §2.4): compose the final system
 * prompt for a (coach, tier) pair from modular blocks, and define the
 * app-level event tools (§2.5). Server-only.
 *
 * FINAL_PROMPT = GLOBAL_RULES + NO_YES_MAN + VOICE_PRINCIPLES
 *   + [FREE_TIER_PROTOCOL if Free] + [SUPPLEMENT_PROTOCOL if applicable]
 *   + BASE_IDENTITY + per-coach VOICE + TIER_MODIFIER[tier] + REFERRAL_TRIGGERS
 */

import type { Tier } from "@/data/coaches";
import {
  FREE_TIER_PROTOCOL,
  GLOBAL_RULES,
  NO_YES_MAN_PROTOCOL,
  SUPPLEMENT_PROTOCOL,
  VOICE_PRINCIPLES,
  DAILY_CHECKIN_PROTOCOL,
} from "./prompt-blocks";
import type { Persona } from "./personas";

export function assembleSystemPrompt(persona: Persona, tier: Tier): string {
  const tierModifier =
    persona.tierModifiers[tier] ??
    persona.tierModifiers.Free ??
    "Definitions and education only.";

  const blocks: string[] = [
    `# GLOBAL RULES\n${GLOBAL_RULES}`,
    `# HOW YOU DISAGREE\n${NO_YES_MAN_PROTOCOL}`,
    `# HOW YOU TALK\n${VOICE_PRINCIPLES}`,
  ];

  if (tier === "Free") {
    blocks.push(`# FREE TIER RULES\n${FREE_TIER_PROTOCOL}`);
  }
  if (persona.supplement) {
    blocks.push(`# SUPPLEMENTS\n${SUPPLEMENT_PROTOCOL}`);
  }

  blocks.push(`# WHO YOU ARE\n${persona.baseIdentity}`);
  blocks.push(`# YOUR VOICE\n${persona.voice}`);
  blocks.push(
    `# WHAT YOU DELIVER AT THIS TIER (client is on the ${tier} tier)\n${tierModifier}`,
  );
  blocks.push(
    `# WHEN TO REFER OUT\n${persona.referralTriggers.map((t) => `- ${t}`).join("\n")}`,
  );

  return blocks.join("\n\n");
}

/**
 * Event tools. The model *names* the event; the app renders the pricing/bundle/
 * queue UI. The model never quotes a price (architecture §2.5).
 */
export const COACH_TOOLS = [
  {
    name: "suggest_referral",
    description:
      "Call when the client needs help outside your coaching lane. Name the correct C9F coach. The app renders a suggested-coach card and any bundle offer.",
    input_schema: {
      type: "object" as const,
      properties: {
        coach_name: {
          type: "string",
          description: "Exact name of the C9F coach to refer to.",
        },
        reason: {
          type: "string",
          description: "One sentence on why this coach fits the client's need.",
        },
      },
      required: ["coach_name", "reason"],
    },
  },
  {
    name: "escalate_to_human",
    description:
      "Call to route the client to a human coach. Use 'safety' for pain, injury symptoms, dizziness, chest pain, or disordered-eating signals (never a sales moment — framed as care). Use 'growth' for a plateau or a client wanting more support (may be framed as an offer).",
    input_schema: {
      type: "object" as const,
      properties: {
        type: {
          type: "string",
          enum: ["safety", "growth"],
          description: "The escalation kind.",
        },
        signal: {
          type: "string",
          description: "What the client said or did that triggered this.",
        },
      },
      required: ["type", "signal"],
    },
  },
  {
    name: "signal_tier_upgrade",
    description:
      "Call when the client would benefit from a higher tier — program completion, sustained adherence, or a plateau needing adaptive coaching. The app decides whether and how to present an upgrade. Never quote a price yourself.",
    input_schema: {
      type: "object" as const,
      properties: {
        reason: {
          type: "string",
          description: "Why an upgrade would help this specific client now.",
        },
      },
      required: ["reason"],
    },
  },
  {
    name: "record_workout_completion",
    description:
      "Call when the client reports completing a workout. The app will create/update the session record with the completion status and any relevant details from the conversation.",
    input_schema: {
      type: "object" as const,
      properties: {
        status: {
          type: "string",
          enum: ["completed", "not_yet", "skipped", "missed"],
          description: "Whether the workout was completed, not yet done, skipped, or missed.",
        },
        reason: {
          type: "string",
          description: "If skipped/missed, why (e.g., 'sick', 'tired', 'busy', 'injury', 'other').",
        },
        rescheduled_for: {
          type: "string",
          description: "If not completed today, when they plan to do it (YYYY-MM-DD format).",
        },
        notes: {
          type: "string",
          description: "Any additional context about the workout or completion status.",
        },
      },
      required: ["status"],
    },
  },
  {
    name: "record_missed_workout",
    description:
      "Call when a workout has been missed. Logs the reason and reschedule date for re-engagement tracking.",
    input_schema: {
      type: "object" as const,
      properties: {
        reason: {
          type: "string",
          description: "Why the workout was missed (e.g., 'sick', 'tired', 'busy', 'injury', 'motivation').",
        },
        rescheduled_for: {
          type: "string",
          description: "When the client plans to reschedule this workout (YYYY-MM-DD format).",
        },
        notes: {
          type: "string",
          description: "Any coaching context or encouragement to include.",
        },
      },
      required: ["reason"],
    },
  },
];
