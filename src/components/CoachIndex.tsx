import Link from "next/link";
import {
  ALL_TIERS,
  coachCategoryOrder,
  coachesByCategory,
  coachSlug,
  type Coach,
} from "@/data/coaches";
import { Container, SectionHead } from "./primitives";

function TierAvailability({ coach }: { coach: Coach }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-wide">
      <span className="text-accent">Tiers</span>
      {ALL_TIERS.map((tier) => {
        const available = coach.tiers.includes(tier);
        return (
          <span
            key={tier}
            className={
              available ? "text-ink-dim" : "text-ink-dim/45 line-through"
            }
            title={available ? undefined : "Not offered for this coach"}
          >
            {tier}
          </span>
        );
      })}
    </div>
  );
}

function CoachRow({ coach }: { coach: Coach }) {
  if (coach.safety) {
    return (
      <div className="fill-safety -mx-5 flex items-start gap-4 rounded px-5 py-4 transition-all duration-200 hover:bg-panel hover:shadow-sm hover:-translate-y-0.5">
        <div className="min-w-6 pt-[3px] font-mono text-xs text-accent">
          {coach.index}
        </div>
        <div>
          <Link
            href={`/coach/${coachSlug(coach)}`}
            className="mb-1 inline-block font-display text-base font-semibold text-safety hover:underline"
          >
            {coach.name}
          </Link>
          <div className="text-sm text-ink-dim">{coach.desc}</div>
          <TierAvailability coach={coach} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 border-b border-line py-4 last:border-b-0 -mx-2 px-2 rounded transition-all duration-200 hover:bg-panel hover:shadow-sm hover:-translate-y-0.5">
      <div className="min-w-6 pt-[3px] font-mono text-xs text-accent">
        {coach.index}
      </div>
      <div>
        <Link
          href={`/coach/${coachSlug(coach)}`}
          className="mb-1 inline-block font-display text-base font-semibold hover:text-accent"
        >
          {coach.name}
        </Link>
        <div className="text-sm text-ink-dim">{coach.desc}</div>
        <TierAvailability coach={coach} />
      </div>
    </div>
  );
}

export function CoachIndex() {
  return (
    <section id="coaches" className="border-t border-line py-[60px]">
      <Container>
        <SectionHead
          eyebrow="Coach index"
          title="Nine specialists. Four categories."
          sub="Every coach has one job and stays in their lane. Need more than one? The system tells you — you never have to guess."
        />

        {coachCategoryOrder.map((category) => (
          <div key={category} className="mb-9 last:mb-0">
            <div className="mb-3 border-b border-line pb-2 font-mono text-xs uppercase tracking-wide text-ink-dim">
              {category}
            </div>
            {coachesByCategory[category].map((coach) => (
              <CoachRow key={coach.index} coach={coach} />
            ))}
          </div>
        ))}
      </Container>
    </section>
  );
}
