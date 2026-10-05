import type { Program } from "@/data/workout-library/types";
import { formatPrescription, goalLabels } from "@/data/workout-library/document";

/** Renders a workout program as a branded C9F document. */
export function ProgramDocument({ program: p }: { program: Program }) {
  return (
    <article className="mx-auto max-w-[720px]">
      <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
        <span className="inline-block h-px w-5 bg-accent" />
        {p.meta.source} · Program package
      </div>
      <h1 className="font-display text-[32px] font-semibold leading-tight max-[480px]:text-[26px]">
        {p.meta.title}
      </h1>
      <p className="mt-2 text-ink-dim">{p.focus}</p>
      <p className="mt-1 text-sm text-ink-dim">
        <span className="text-ink">Goal:</span> {p.goalStatement}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wide">
        {[
          p.meta.level,
          `${goalLabels(p)}`,
          `${p.meta.equipment} equipment`,
          p.meta.daysPerWeek ? `${p.meta.daysPerWeek}-day/week` : `${p.meta.weeks} weeks`,
        ].map(
          (chip) => (
            <span key={chip} className="rounded-sm border border-line px-2 py-1 text-ink-dim">
              {chip}
            </span>
          ),
        )}
        <span
          className={`rounded-sm px-2 py-1 ${
            p.meta.refined ? "bg-accent text-on-accent" : "border border-line text-ink-dim"
          }`}
        >
          {p.meta.refined ? "Full detail" : "Outline — detail in progress"}
        </span>
      </div>

      <section className="mt-8">
        <h2 className="mb-2 font-display text-lg font-semibold">Overview</h2>
        <p className="text-sm text-ink-dim">{p.overview}</p>
      </section>

      {p.weeklyStructure.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-2 font-display text-lg font-semibold">Weekly structure</h2>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {p.weeklyStructure.map((d) => (
              <div key={d.day} className="flex gap-3 text-sm">
                <span className="font-mono text-xs text-accent">D{d.day}</span>
                <span className="text-ink-dim">{d.focus}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {p.phases.map((ph) => (
        <section key={ph.name} className="mt-8 border-t border-line pt-6">
          <h2 className="font-display text-lg font-semibold">{ph.name}</h2>
          <p className="mt-1 text-sm text-ink-dim">{ph.focus}</p>

          {ph.days?.map((day) => (
            <div key={day.day} className="fill-panel mt-4 rounded border border-line p-4">
              <div className="mb-2 flex items-baseline justify-between">
                <div className="font-display text-sm font-semibold">
                  Day {day.day} — {day.title}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wide text-accent">
                  {day.type}
                </span>
              </div>
              {day.warmup && (
                <p className="mb-2 text-[13px] text-ink-dim">Warm-up: {day.warmup}</p>
              )}
              {day.exercises.length > 0 ? (
                <ul className="space-y-1 text-sm">
                  {day.exercises.map((e, i) => (
                    <li key={i} className="text-ink">
                      {formatPrescription(e)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-ink-dim">{day.notes}</p>
              )}
              {day.cooldown && (
                <p className="mt-2 text-[13px] text-ink-dim">Cool-down: {day.cooldown}</p>
              )}
            </div>
          ))}

          {ph.progression && ph.progression.length > 0 && (
            <div className="mt-3">
              <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-ink-dim">
                Progression
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-ink-dim">
                {ph.progression.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          )}
          {ph.keyChanges && ph.keyChanges.length > 0 && (
            <div className="mt-3">
              <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-ink-dim">
                Key changes
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-ink-dim">
                {ph.keyChanges.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}

      {p.nutrition && (
        <section className="mt-8 border-t border-line pt-6">
          <h2 className="mb-2 font-display text-lg font-semibold">Nutrition</h2>
          {p.nutrition.note && <p className="mb-2 text-sm text-ink-dim">{p.nutrition.note}</p>}
          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            {p.nutrition.proteinPct && (
              <span className="rounded-sm border border-line px-2 py-1 text-ink-dim">
                Protein {p.nutrition.proteinPct[0]}-{p.nutrition.proteinPct[1]}%
              </span>
            )}
            {p.nutrition.carbsPct && (
              <span className="rounded-sm border border-line px-2 py-1 text-ink-dim">
                Carbs {p.nutrition.carbsPct[0]}-{p.nutrition.carbsPct[1]}%
              </span>
            )}
            {p.nutrition.fatsPct && (
              <span className="rounded-sm border border-line px-2 py-1 text-ink-dim">
                Fats {p.nutrition.fatsPct[0]}-{p.nutrition.fatsPct[1]}%
              </span>
            )}
          </div>
        </section>
      )}

      {p.recovery && p.recovery.length > 0 && (
        <section className="mt-8 border-t border-line pt-6">
          <h2 className="mb-2 font-display text-lg font-semibold">Recovery</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-ink-dim">
            {p.recovery.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-10 border-t border-line pt-4 font-mono text-[11px] text-ink-dim">
        {p.meta.copyright}. All rights reserved.
      </footer>
    </article>
  );
}
