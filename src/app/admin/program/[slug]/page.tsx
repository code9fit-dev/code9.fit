import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProgram } from '@/data/workout-library';
import type { ExercisePrescription, Phase, TrainingDay } from '@/data/workout-library/types';

function prescription(ex: ExercisePrescription): string {
  const parts: string[] = [];
  if (ex.sets && ex.reps) parts.push(`${ex.sets} × ${ex.reps}`);
  else if (ex.sets) parts.push(`${ex.sets} sets`);
  else if (ex.reps) parts.push(ex.reps);
  if (ex.durationSec) parts.push(`${ex.durationSec}s`);
  if (ex.perSide) parts.push('per side');
  return parts.join(' · ');
}

function DayBlock({ day }: { day: TrainingDay }) {
  return (
    <div className="rounded border p-4" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-semibold">Day {day.day} — {day.title}</h4>
        <span className="text-xs uppercase" style={{ color: 'var(--ink-dim)' }}>{day.type}</span>
      </div>
      {day.warmup && <p className="mt-2 text-sm" style={{ color: 'var(--ink-dim)' }}>Warm-up: {day.warmup}</p>}
      {day.exercises.length > 0 && (
        <ul className="mt-3 space-y-2">
          {day.exercises.map((ex, i) => (
            <li key={i} className="text-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <span className="font-medium">{ex.name}</span>
                <span style={{ color: 'var(--accent)' }}>{prescription(ex)}</span>
              </div>
              {ex.notes && <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>{ex.notes}</p>}
            </li>
          ))}
        </ul>
      )}
      {day.notes && <p className="mt-2 text-sm" style={{ color: 'var(--ink-dim)' }}>{day.notes}</p>}
      {day.cooldown && <p className="mt-2 text-sm" style={{ color: 'var(--ink-dim)' }}>Cool-down: {day.cooldown}</p>}
    </div>
  );
}

function PhaseBlock({ phase, index }: { phase: Phase; index: number }) {
  return (
    <section className="space-y-4 rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
      <div>
        <h3 className="text-lg font-semibold">{phase.name || `Phase ${index + 1}`}</h3>
        <p className="text-xs uppercase" style={{ color: 'var(--ink-dim)' }}>Weeks {phase.weekStart}–{phase.weekEnd}</p>
        <p className="mt-2 text-sm">{phase.focus}</p>
      </div>
      {phase.days?.map((day) => <DayBlock key={day.day} day={day} />)}
      {phase.progression && phase.progression.length > 0 && (
        <div>
          <p className="text-sm font-semibold">Progression</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm" style={{ color: 'var(--ink-dim)' }}>
            {phase.progression.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}
      {phase.keyChanges && phase.keyChanges.length > 0 && (
        <div>
          <p className="text-sm font-semibold">Key changes</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm" style={{ color: 'var(--ink-dim)' }}>
            {phase.keyChanges.map((k, i) => <li key={i}>{k}</li>)}
          </ul>
        </div>
      )}
    </section>
  );
}

export default async function AdminProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const { meta } = program;
  const hasHtml = `/admin/workout-viewer/${meta.id}`;

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-8" style={{ color: 'var(--ink)' }}>
      <div>
        <Link href="/admin/library" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>← Back to library</Link>
        <h1 className="mt-2 text-3xl font-semibold">{meta.title}</h1>
        <p className="mt-1" style={{ color: 'var(--ink-dim)' }}>{program.focus}</p>
        <p className="mt-2 text-xs uppercase" style={{ color: 'var(--ink-dim)' }}>
          {meta.level} · {meta.weeks} weeks · {meta.daysPerWeek ?? '—'} days/week · {meta.equipment}
        </p>
        <Link href={hasHtml} className="mt-4 inline-block rounded px-4 py-2 text-sm font-semibold" style={{ border: '1px solid var(--line)', color: 'var(--ink)' }}>
          Open HTML breakdown (if available)
        </Link>
      </div>

      {program.overview && (
        <section>
          <h2 className="mb-2 text-lg font-semibold">Overview</h2>
          <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>{program.overview}</p>
        </section>
      )}

      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Phases</h2>
        {program.phases.map((phase, i) => <PhaseBlock key={i} phase={phase} index={i} />)}
      </section>
    </main>
  );
}
