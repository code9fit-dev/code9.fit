"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeController } from "@/components/ThemeController";
import {
  coachSlug,
  getCoachByName,
  getCoachBySlug,
} from "@/data/coaches";
import {
  addAdRequest,
  advanceWeek,
  clearHandoff,
  displayName,
  getTier,
  isAdmin,
  saveChat,
  setPlan,
  startHandoff,
  toggleExercise,
  useStore,
} from "@/lib/store/store";
import type { Advert, ChatMessage, HandoffContext } from "@/lib/store/types";
import { generatePlan } from "@/lib/plan/generate";
import {
  currentWeek,
  planContextLine,
  todaysWorkout,
  weeklyProgress,
  workoutComplete,
  workoutPct,
} from "@/lib/plan/progress";
import { formatCoachResponse } from "@/lib/markdown/format";

type CoachEvent = { name: string; input: Record<string, unknown> };

export default function CoachChatPage() {
  const { slug } = useParams<{ slug: string }>();
  const coach = getCoachBySlug(slug);
  const state = useStore();
  const router = useRouter();

  const [tab, setTab] = useState<"chat" | "plan">("chat");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [events, setEvents] = useState<CoachEvent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const kicked = useRef(false);

  const tier = getTier(state, slug);
  const chat = state.chats[slug] ?? [];
  const plan = state.plans[slug];

  // Referral hand-off: if the client was sent here by another coach, open
  // proactively using the shared history from that coach (architecture §4 #2).
  useEffect(() => {
    if (kicked.current) return;
    const h = state.handoff;
    if (!h || h.toSlug !== slug) return;
    kicked.current = true;
    clearHandoff();
    if ((state.chats[slug] ?? []).length === 0) void runHandoffKickoff(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!coach) {
    return (
      <div className="mx-auto max-w-[560px] px-6 py-20 text-center">
        <ThemeController theme="signature" />
        <p className="mb-4 text-ink-dim">That coach doesn&rsquo;t exist.</p>
        <Link href="/#coaches" className="btn-primary">
          See all coaches
        </Link>
      </div>
    );
  }

  const canPlan = tier !== "Free";
  const activeAdverts = state.adverts.filter((a) => a.active);
  const advertPayload = activeAdverts.map((a) => ({
    id: a.id,
    coach: a.coach,
    specialty: a.specialty,
    headline: a.headline,
    topics: a.topics,
  }));

  function scrollToEnd() {
    requestAnimationFrame(() =>
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }),
    );
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);
    setEvents([]); // Clear any previous offer cards

    const base: ChatMessage[] = [...chat, { role: "user", content: text }];
    saveChat(slug, [...base, { role: "assistant", content: "" }]);
    scrollToEnd();

    let assistant = "";
    const flush = () => saveChat(slug, [...base, { role: "assistant", content: assistant }]);

    try {
      const res = await fetch(`/api/coach/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: base,
          tier,
          planContext: plan ? planContextLine(plan) : undefined,
          adverts: advertPayload,
        }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        assistant = err.error ?? "Something went wrong reaching the coach.";
        flush();
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const raw of lines) {
          if (!raw.trim()) continue;
          const evt = JSON.parse(raw);
          if (evt.type === "text") {
            assistant += evt.text;
            flush();
          } else if (evt.type === "event") {
            setEvents((p) => [...p, { name: evt.name, input: evt.input }]);
          } else if (evt.type === "error") {
            assistant += `\n\n⚠ ${evt.message}`;
            flush();
          }
          scrollToEnd();
        }
      }
    } catch {
      assistant += "\n\n⚠ Connection lost. Please retry.";
      flush();
    } finally {
      setBusy(false);
    }
  }

  function makePlan() {
    setPlan(generatePlan(slug, coach!.name, Date.now()));
    setTab("plan");
  }

  function buildTranscript(fromSlug: string): string {
    const msgs = (state.chats[fromSlug] ?? [])
      .filter((m) => !m.hidden)
      .slice(-10);
    const fromName = getCoachBySlug(fromSlug)?.name ?? "the other coach";
    return msgs
      .map((m) => `${m.role === "user" ? "Client" : fromName}: ${m.content}`)
      .join("\n");
  }

  // The target coach opens the conversation itself, using the shared history
  // from the referring coach as a hidden context message.
  async function runHandoffKickoff(h: HandoffContext) {
    setBusy(true);
    const transcript = buildTranscript(h.fromSlug);
    const clientName = displayName(state);
    const contextMsg: ChatMessage = {
      role: "user",
      hidden: true,
      content:
        `[Referral hand-off from the ${h.fromName}${h.reason ? ` about ${h.reason}` : ""}. ` +
        `Here is what the client discussed with them:]\n${transcript || "(no prior messages)"}`,
    };
    saveChat(slug, [contextMsg, { role: "assistant", content: "" }]);
    scrollToEnd();

    let assistant = "";
    const flush = () =>
      saveChat(slug, [contextMsg, { role: "assistant", content: assistant }]);

    try {
      const res = await fetch(`/api/coach/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: contextMsg.role, content: contextMsg.content }],
          tier,
          planContext: plan ? planContextLine(plan) : undefined,
          handoff: { fromName: h.fromName, reason: h.reason, clientName },
        }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        assistant = err.error ?? "Couldn't start the conversation.";
        flush();
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const raw of lines) {
          if (!raw.trim()) continue;
          const evt = JSON.parse(raw);
          if (evt.type === "text") {
            assistant += evt.text;
            flush();
          } else if (evt.type === "event") {
            setEvents((p) => [...p, { name: evt.name, input: evt.input }]);
          } else if (evt.type === "error") {
            assistant += `\n\n⚠ ${evt.message}`;
            flush();
          }
          scrollToEnd();
        }
      }
    } catch {
      assistant += "\n\n⚠ Connection lost. Please retry.";
      flush();
    } finally {
      setBusy(false);
    }
  }

  function onRequestOffer(advert: Advert, message: string) {
    const context = chat
      .filter((m) => !m.hidden)
      .slice(-6)
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");
    addAdRequest({
      advertId: advert.id,
      coach: advert.coach,
      clientEmail: state.identity?.email ?? "",
      clientMessage: message,
      context,
    });
  }

  function onReferral(coachName: string, reason: string) {
    const target = getCoachByName(coachName);
    if (!target) {
      router.push("/#coaches");
      return;
    }
    startHandoff({
      fromSlug: slug,
      fromName: coach!.name,
      toSlug: coachSlug(target),
      reason,
    });
    router.push(`/coach/${coachSlug(target)}`);
  }

  return (
    <div className="mx-auto flex h-screen max-w-[640px] flex-col px-4 sm:px-6">
      <ThemeController theme="signature" />

      {/* Header */}
      <header className="border-b border-line py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/#coaches" className="font-mono text-xs text-ink-dim">
              ←
            </Link>
            <div>
              <div className="font-display text-base font-semibold leading-tight">
                {coach.name}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wide text-accent">
                C9F Coach {coach.index} · {tier} tier
              </div>
            </div>
          </div>
          {tier === "Free" ? (
            <Link
              href={`/checkout?coach=${slug}`}
              className="font-mono text-[11px] text-accent underline"
            >
              Unlock plans →
            </Link>
          ) : (
            isAdmin(state) && (
              <span className="font-mono text-[10px] text-ink-dim">admin</span>
            )
          )}
        </div>
        <div className="mt-3 flex gap-1">
          <TabButton active={tab === "chat"} onClick={() => setTab("chat")}>
            Chat
          </TabButton>
          <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>
            Plan{plan ? "" : " ·"}
          </TabButton>
        </div>
      </header>

      {tab === "chat" ? (
        <>
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto py-6">
            {chat.length === 0 && (
              <div className="fill-panel schematic rounded border border-line p-5 text-sm text-ink-dim">
                <div className="mb-1.5 font-display text-base font-semibold text-ink">
                  You&rsquo;re talking to the {coach.name}.
                </div>
                {coach.desc} Ask a question to get started — you&rsquo;re on the{" "}
                <span className="text-accent">{tier}</span> tier
                {tier === "Free" ? " (education only)." : "."}
              </div>
            )}
            {chat
              .filter((m) => !m.hidden)
              .map((m, i) => (
                <MessageBubble
                  key={i}
                  role={m.role}
                  content={m.content}
                  busy={busy}
                />
              ))}
            {events.map((e, i) =>
              e.name === "surface_offer" ? (
                <OfferCard
                  key={`e${i}`}
                  advert={activeAdverts.find(
                    (a) => a.id === String(e.input.advert_id),
                  )}
                  onRequest={onRequestOffer}
                />
              ) : (
                <EventCard key={`e${i}`} event={e} onReferral={onReferral} />
              ),
            )}
          </div>

          <div className="border-t border-line py-4">
            <div className="flex items-end gap-2">
              <textarea
                className="c9-input max-h-40 min-h-[46px] flex-1 resize-none"
                placeholder={`Message the ${coach.name}…`}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
              />
              <button
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                onClick={send}
                disabled={busy || !input.trim()}
              >
                {busy ? "…" : "Send"}
              </button>
            </div>
            <p className="mt-2 font-mono text-[10px] text-ink-dim">
              C9F AI coach — not a licensed medical professional. Pain or injury
              is routed to a human.
            </p>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto py-6">
          <PlanView
            slug={slug}
            canPlan={canPlan}
            onGenerate={makePlan}
            hasPlan={!!plan}
            state={state}
          />
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-t px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
        active ? "text-accent" : "text-ink-dim hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function ProgressBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between font-mono text-[11px] text-ink-dim">
        <span>{label}</span>
        <span className="text-accent">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-sm bg-line">
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function PlanView({
  slug,
  canPlan,
  onGenerate,
  hasPlan,
  state,
}: {
  slug: string;
  canPlan: boolean;
  onGenerate: () => void;
  hasPlan: boolean;
  state: ReturnType<typeof useStore>;
}) {
  const plan = state.plans[slug];

  if (!hasPlan || !plan) {
    return (
      <div className="fill-panel schematic rounded border border-line p-6 text-sm text-ink-dim">
        <div className="mb-1.5 font-display text-base font-semibold text-ink">
          No active plan yet.
        </div>
        {canPlan ? (
          <>
            <p className="mb-4">
              Generate your structured program — your daily and weekly progress
              tracks here per workout.
            </p>
            <button onClick={onGenerate} className="btn-primary">
              Generate my plan
            </button>
          </>
        ) : (
          <>
            <p className="mb-4">
              Plans unlock at One-Time and above. The Free tier is education
              only.
            </p>
            <Link href={`/checkout?coach=${slug}`} className="btn-primary">
              Unlock a plan
            </Link>
          </>
        )}
      </div>
    );
  }

  const wk = weeklyProgress(plan);
  const today = todaysWorkout(plan);
  const thisWeek = currentWeek(plan);

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-1 font-display text-base font-semibold">
          {plan.title}
        </div>
        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] text-ink-dim">
          <button
            onClick={() => advanceWeek(slug, -1)}
            className="text-accent disabled:opacity-30"
            disabled={plan.currentWeek <= 1}
          >
            ◀
          </button>
          <span>
            Week {plan.currentWeek} / {plan.weeks}
          </span>
          <button
            onClick={() => advanceWeek(slug, 1)}
            className="text-accent disabled:opacity-30"
            disabled={plan.currentWeek >= plan.weeks}
          >
            ▶
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="fill-panel rounded border border-line p-4">
          <ProgressBar
            label="Today"
            pct={today ? workoutPct(today) : 0}
          />
          <div className="mt-1.5 text-[11px] text-ink-dim">
            {today ? today.focus : "Rest day"}
          </div>
        </div>
        <div className="fill-panel rounded border border-line p-4">
          <ProgressBar label={`This week`} pct={wk.pct} />
          <div className="mt-1.5 text-[11px] text-ink-dim">
            {wk.done}/{wk.total} workouts done
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {thisWeek?.workouts.map((w) => (
          <div
            key={w.id}
            className={`rounded border p-4 ${
              workoutComplete(w) ? "border-accent fill-accent" : "border-line fill-panel"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wide text-accent">
                  {w.day}
                </span>
                <div className="font-display text-sm font-semibold">
                  {w.focus}
                </div>
              </div>
              <span className="font-mono text-[11px] text-ink-dim">
                {workoutPct(w)}%
              </span>
            </div>
            <ul className="space-y-1.5">
              {w.exercises.map((ex) => (
                <li key={ex.id}>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                    <input
                      type="checkbox"
                      checked={ex.done}
                      onChange={() => toggleExercise(slug, w.id, ex.id)}
                      className="mt-1 h-4 w-4 flex-shrink-0 accent-[var(--accent)]"
                    />
                    <span className={ex.done ? "text-ink-dim line-through" : "text-ink"}>
                      {ex.name}{" "}
                      <span className="text-ink-dim">— {ex.detail}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({
  role,
  content,
  busy,
}: {
  role: "user" | "assistant";
  content: string;
  busy: boolean;
}) {
  const isUser = role === "user";
  const formattedContent = !isUser && content ? formatCoachResponse(content) : content;

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-2.5 text-sm ${
          isUser
            ? "bg-accent text-on-accent"
            : "fill-panel border border-line text-ink"
        }`}
      >
        {formattedContent || (busy ? "…" : "")}
      </div>
    </div>
  );
}

function OfferCard({
  advert,
  onRequest,
}: {
  advert?: Advert;
  onRequest: (advert: Advert, message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!advert) return null;

  if (sent) {
    return (
      <div className="fill-accent rounded border border-accent p-4 text-sm">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-accent">
          Request sent
        </div>
        <div className="text-ink-dim">
          {advert.coach} will review your request and get back to you.
        </div>
      </div>
    );
  }

  return (
    <div className="fill-panel rounded border border-line p-4 text-sm">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-ink-dim">
        Specialist offer · sponsored
      </div>
      <div className="font-display font-semibold">
        {advert.coach} — {advert.specialty}
      </div>
      <div className="mb-1 text-ink">{advert.headline}</div>
      <div className="mb-3 text-accent">{advert.offer}</div>
      <textarea
        className="c9-input mb-2 min-h-[44px] resize-none"
        rows={2}
        placeholder={`Anything ${advert.coach} should know? (optional)`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="btn-primary"
        onClick={() => {
          onRequest(advert, message.trim());
          setSent(true);
        }}
      >
        Request {advert.coach}
      </button>
      <p className="mt-2 font-mono text-[10px] text-ink-dim">
        The coach reviews your request before anything is booked.
      </p>
    </div>
  );
}

function EventCard({
  event,
  onReferral,
}: {
  event: CoachEvent;
  onReferral: (coachName: string, reason: string) => void;
}) {
  const { name, input } = event;

  if (name === "suggest_referral") {
    const coachName = String(input.coach_name ?? "");
    const reason = String(input.reason ?? "");
    const target = getCoachByName(coachName);
    return (
      <div className="fill-accent rounded border border-accent p-4 text-sm">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-accent">
          Suggested coach
        </div>
        <div className="mb-1 font-display font-semibold">
          {coachName || "Another specialist"}
        </div>
        <div className="mb-3 text-ink-dim">{reason}</div>
        <button
          className="btn-primary"
          onClick={() => onReferral(coachName, reason)}
        >
          {target ? `Talk to ${target.name}` : "See all coaches"}
        </button>
      </div>
    );
  }

  if (name === "escalate_to_human") {
    const safety = input.type === "safety";
    return (
      <div
        className={`rounded border p-4 text-sm ${
          safety ? "border-safety bg-safety/10" : "fill-accent border-accent"
        }`}
      >
        <div
          className={`mb-1 font-mono text-[10px] uppercase tracking-wide ${
            safety ? "text-safety" : "text-accent"
          }`}
        >
          {safety
            ? "Routed to a human coach — for your safety"
            : "More support available"}
        </div>
        <div className="text-ink-dim">
          {safety
            ? "This looks like something a person should look at before we build anything around it. A C9F coach will review it — this is included, not an upsell."
            : String(input.signal ?? "A human coach can take this further.")}
        </div>
        {!safety && (
          <Link href="/#pricing" className="btn-primary mt-3">
            See plans
          </Link>
        )}
      </div>
    );
  }

  if (name === "signal_tier_upgrade") {
    return (
      <div className="fill-accent rounded border border-accent p-4 text-sm">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-accent">
          Ready for more
        </div>
        <div className="mb-3 text-ink-dim">{String(input.reason ?? "")}</div>
        <Link href="/#pricing" className="btn-primary">
          See plans
        </Link>
      </div>
    );
  }

  return null;
}
