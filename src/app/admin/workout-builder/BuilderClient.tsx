'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { COMMON_EXERCISES } from '@/lib/exercises/database';
import {
  DAY_TYPES,
  EMPTY_DRAFT,
  slugify,
  toLibraryFile,
  validateDraft,
  type DraftDay,
  type DraftExercise,
  type DraftProgram,
} from '@/lib/workout-builder/draft';
import type { DayType, Equipment, Goal, Level } from '@/data/workout-library/types';

const STORAGE_KEY = 'c9_workout_draft';
const GOALS: Goal[] = ['fat-loss', 'muscle-gain', 'recomposition', 'performance', 'general-fitness', 'mobility'];
const LEVELS: Level[] = ['beginner', 'intermediate', 'advanced'];
const EQUIPMENT: Equipment[] = ['none', 'minimal', 'full-gym'];

const field = 'w-full rounded border px-3 py-2 text-sm';
const fieldStyle = { borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' };
const panel = 'rounded-lg border p-6 space-y-4';
const panelStyle = { borderColor: 'var(--line)', background: 'var(--panel)' };
const btn = 'rounded px-4 py-2 text-sm font-semibold disabled:opacity-50';
const btnPrimary = { background: 'var(--accent)', color: 'var(--on-accent)' };
const btnGhost = { border: '1px solid var(--line)', color: 'var(--ink)', background: 'transparent' };

export function BuilderClient({ initialId }: { initialId?: string }) {
  const [draft, setDraft] = useState<DraftProgram>(EMPTY_DRAFT);
  const [loaded, setLoaded] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<'draft' | 'complete' | null>(null);
  const [saving, setSaving] = useState<'day' | 'full' | null>(null);
  const [idTouched, setIdTouched] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiBusy, setAiBusy] = useState(false);
  const [aiStatus, setAiStatus] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setDraft({ ...EMPTY_DRAFT, ...JSON.parse(saved) });
        setIdTouched(true);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    if (initialId) {
      fetch(`/api/admin/saved-workouts/${initialId}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((w) => {
          if (!w) {
            setMessage({ kind: 'error', text: 'That saved workout could not be opened.' });
            return;
          }
          setDraft({ ...EMPTY_DRAFT, ...w.draft });
          setIdTouched(true);
          setSavedId(w.id);
          setSavedStatus(w.status);
        });
    }
    setLoaded(true);
  }, [initialId]);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft, loaded]);

  const update = (patch: Partial<DraftProgram>) => setDraft((d) => ({ ...d, ...patch }));

  const setTitle = (title: string) => update({ title, ...(idTouched ? {} : { id: slugify(title) }) });

  const setDays = (days: DraftDay[]) => update({ days });

  const updateDay = (index: number, patch: Partial<DraftDay>) =>
    setDays(draft.days.map((d, i) => (i === index ? { ...d, ...patch } : d)));

  const updateExercise = (dayIndex: number, exIndex: number, patch: Partial<DraftExercise>) =>
    updateDay(dayIndex, {
      exercises: draft.days[dayIndex].exercises.map((e, i) => (i === exIndex ? { ...e, ...patch } : e)),
    });

  const addDay = () => {
    const next = draft.days.length + 1;
    setDays([...draft.days, { day: next, title: `Day ${next}`, type: 'strength', exercises: [] }]);
  };

  const removeDay = (index: number) =>
    setDays(draft.days.filter((_, i) => i !== index).map((d, i) => ({ ...d, day: i + 1 })));

  const addExercise = (dayIndex: number) =>
    updateDay(dayIndex, {
      exercises: [...draft.days[dayIndex].exercises, { name: '', sets: 3, reps: '8-10' }],
    });

  const removeExercise = (dayIndex: number, exIndex: number) =>
    updateDay(dayIndex, { exercises: draft.days[dayIndex].exercises.filter((_, i) => i !== exIndex) });

  const toggleGoal = (goal: Goal) =>
    update({ goals: draft.goals.includes(goal) ? draft.goals.filter((g) => g !== goal) : [...draft.goals, goal] });

  const draftWithAi = async () => {
    setAiStatus(null);
    if (draft.days.length > 0 && !confirm('Replace the current days with an AI draft?')) return;
    setAiBusy(true);
    const res = await fetch('/api/admin/workout-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: aiPrompt,
        level: draft.level,
        goals: draft.goals,
        equipment: draft.equipment,
        daysPerWeek: draft.daysPerWeek,
      }),
    }).catch(() => null);
    setAiBusy(false);
    const body = await res?.json().catch(() => null);
    if (res?.ok && Array.isArray(body?.days)) {
      setDraft((d) => ({ ...d, days: body.days, daysPerWeek: body.days.length }));
      setAiStatus({ kind: 'ok', text: `AI drafted ${body.days.length} days below. Review and adjust before downloading.` });
      document.getElementById('days')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setAiStatus({ kind: 'error', text: body?.error || 'The AI draft failed. Try again.' });
    }
  };

  const download = () => {
    const problems = validateDraft(draft);
    setErrors(problems);
    if (problems.length) {
      setMessage({ kind: 'error', text: 'Fix the highlighted items before downloading.' });
      return;
    }
    const blob = new Blob([toLibraryFile(draft)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draft.id}.ts`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({
      kind: 'ok',
      text: `Downloaded ${draft.id}.ts. Put it in src/data/workout-library/, import it in index.ts, then commit and push.`,
    });
  };

  const saveWorkout = async (mode: 'day' | 'full') => {
    setMessage(null);
    setErrors([]);
    setSaving(mode);
    const res = await fetch('/api/admin/saved-workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: savedId ?? undefined, mode, draft }),
    }).catch(() => null);
    setSaving(null);
    const body = await res?.json().catch(() => null);
    if (res?.ok && body?.id) {
      setSavedId(body.id);
      setSavedStatus(body.status);
      setMessage({
        kind: 'ok',
        text: mode === 'full'
          ? 'Full workout saved. It is in the library under Saved workouts, ready to upload or share.'
          : 'Progress saved. Use Full save when every day is done.',
      });
    } else {
      const text = body?.error || 'Saving failed. Check the connection and try again.';
      setMessage({ kind: 'error', text });
      if (mode === 'full') setErrors(text.split('. ').filter(Boolean));
    }
  };

  const reset = () => {
    if (!confirm('Clear this draft?')) return;
    setDraft(EMPTY_DRAFT);
    setSavedId(null);
    setSavedStatus(null);
    setIdTouched(false);
    setErrors([]);
    setMessage(null);
  };

  if (!loaded) return null;

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-8" style={{ color: 'var(--ink)' }}>
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            ← Back to admin
          </Link>
          <h1 className="mt-2 text-3xl font-semibold">Create workout</h1>
          <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
            Drafts save in this browser. Download a finished program to add it to the library.
          </p>
        </div>
        <button onClick={reset} className={btn} style={btnGhost}>
          Clear draft
        </button>
      </div>

      {message && (
        <div
          className="rounded border p-3 text-sm"
          style={{
            borderColor: message.kind === 'ok' ? 'var(--line)' : '#ef4444',
            color: message.kind === 'ok' ? 'var(--ink)' : '#b91c1c',
            background: 'var(--panel)',
          }}
        >
          {message.text}
        </div>
      )}
      {errors.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-red-700">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      <section className={panel} style={panelStyle}>
        <h2 className="text-lg font-semibold">Program details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm font-semibold">
            Title
            <input className={field} style={fieldStyle} value={draft.title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            Library id
            <input
              className={field}
              style={fieldStyle}
              value={draft.id}
              onChange={(e) => {
                setIdTouched(true);
                update({ id: e.target.value });
              }}
            />
          </label>
        </div>
        <label className="block space-y-1 text-sm font-semibold">
          Focus (one line)
          <input className={field} style={fieldStyle} value={draft.focus} onChange={(e) => update({ focus: e.target.value })} />
        </label>
        <label className="block space-y-1 text-sm font-semibold">
          Overview
          <textarea className={field} style={fieldStyle} rows={3} value={draft.overview} onChange={(e) => update({ overview: e.target.value })} />
        </label>
        <div className="grid gap-4 md:grid-cols-4">
          <label className="space-y-1 text-sm font-semibold">
            Level
            <select className={field} style={fieldStyle} value={draft.level} onChange={(e) => update({ level: e.target.value as Level })}>
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm font-semibold">
            Equipment
            <select className={field} style={fieldStyle} value={draft.equipment} onChange={(e) => update({ equipment: e.target.value as Equipment })}>
              {EQUIPMENT.map((q) => (
                <option key={q}>{q}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm font-semibold">
            Weeks
            <input type="number" min={1} max={52} className={field} style={fieldStyle} value={draft.weeks} onChange={(e) => update({ weeks: Number(e.target.value) })} />
          </label>
          <label className="space-y-1 text-sm font-semibold">
            Days per week
            <input type="number" min={1} max={7} className={field} style={fieldStyle} value={draft.daysPerWeek} onChange={(e) => update({ daysPerWeek: Number(e.target.value) })} />
          </label>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Goals</p>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((g) => {
              const on = draft.goals.includes(g);
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleGoal(g)}
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={on ? btnPrimary : btnGhost}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className={panel} style={panelStyle}>
        <h2 className="text-lg font-semibold">Draft with AI</h2>
        <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
          Describe the program. Example: &ldquo;upper body strength, dumbbells only, 4 days&rdquo; or &ldquo;HIIT finisher days with kettlebells&rdquo;.
        </p>
        <textarea className={field} style={fieldStyle} rows={3} value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} />
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={draftWithAi} disabled={aiBusy || !aiPrompt.trim()} className={btn} style={btnPrimary}>
            {aiBusy ? 'Drafting…' : 'Draft days with AI'}
          </button>
          {aiBusy && <span className="text-sm" style={{ color: 'var(--ink-dim)' }}>This can take 20–40 seconds.</span>}
        </div>
        {aiStatus && (
          <p className="text-sm" style={{ color: aiStatus.kind === 'ok' ? 'var(--ink)' : '#b91c1c' }}>
            {aiStatus.text}
          </p>
        )}
      </section>

      <section id="days" className="scroll-mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Days</h2>
          <button onClick={addDay} className={btn} style={btnGhost}>
            + Add day
          </button>
        </div>

        {draft.days.length === 0 && (
          <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
            No days yet. Use the AI draft above, or add a day and pick exercises.
          </p>
        )}

        {draft.days.map((day, di) => (
          <div key={di} className={panel} style={panelStyle}>
            <div className="flex flex-wrap items-end gap-3">
              <span className="pb-2 text-sm font-semibold">Day {day.day}</span>
              <label className="flex-1 space-y-1 text-sm font-semibold">
                Title
                <input className={field} style={fieldStyle} value={day.title} onChange={(e) => updateDay(di, { title: e.target.value })} />
              </label>
              <label className="space-y-1 text-sm font-semibold">
                Type
                <select className={field} style={fieldStyle} value={day.type} onChange={(e) => updateDay(di, { type: e.target.value as DayType })}>
                  {DAY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <button onClick={() => removeDay(di)} className={btn} style={btnGhost}>
                Remove day
              </button>
            </div>

            <div className="space-y-2">
              {day.exercises.map((ex, ei) => (
                <div key={ei} className="grid items-end gap-2 md:grid-cols-[1fr_80px_100px_1fr_auto]">
                  <label className="space-y-1 text-xs font-semibold">
                    Exercise
                    <input
                      list="c9-exercises"
                      className={field}
                      style={fieldStyle}
                      value={ex.name}
                      onChange={(e) => updateExercise(di, ei, { name: e.target.value })}
                    />
                  </label>
                  <label className="space-y-1 text-xs font-semibold">
                    Sets
                    <input type="number" min={1} max={10} className={field} style={fieldStyle} value={ex.sets} onChange={(e) => updateExercise(di, ei, { sets: Number(e.target.value) })} />
                  </label>
                  <label className="space-y-1 text-xs font-semibold">
                    Reps
                    <input className={field} style={fieldStyle} value={ex.reps} onChange={(e) => updateExercise(di, ei, { reps: e.target.value })} />
                  </label>
                  <label className="space-y-1 text-xs font-semibold">
                    Notes
                    <input className={field} style={fieldStyle} value={ex.notes ?? ''} onChange={(e) => updateExercise(di, ei, { notes: e.target.value })} />
                  </label>
                  <button onClick={() => removeExercise(di, ei)} className={btn} style={btnGhost}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addExercise(di)} className={btn} style={btnGhost}>
              + Add exercise
            </button>
          </div>
        ))}
      </section>

      <datalist id="c9-exercises">
        {COMMON_EXERCISES.map((e) => (
          <option key={e.id} value={e.name} />
        ))}
      </datalist>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => saveWorkout('day')} disabled={saving !== null} className={btn} style={btnGhost}>
          {saving === 'day' ? 'Saving…' : 'Save day'}
        </button>
        <button onClick={() => saveWorkout('full')} disabled={saving !== null} className={btn} style={btnPrimary}>
          {saving === 'full' ? 'Saving…' : 'Full save'}
        </button>
        <button onClick={download} className={btn} style={btnGhost}>
          Download program file
        </button>
        {savedStatus && (
          <span className="text-sm" style={{ color: 'var(--ink-dim)' }}>
            Saved as {savedStatus === 'complete' ? 'complete' : 'draft'}
          </span>
        )}
      </div>
    </main>
  );
}
