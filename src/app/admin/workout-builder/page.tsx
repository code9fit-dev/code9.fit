'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/primitives';
import { WORKOUT_TEMPLATES, KEYWORD_SUGGESTIONS, getTemplate } from '@/lib/exercises/templates';
import { COMMON_EXERCISES, getExerciseById } from '@/lib/exercises/database';

interface WorkoutDay {
  title: string;
  focus: string;
  exercises: Array<{
    exerciseId: string;
    setsReps: string;
  }>;
}

interface WorkoutPhase {
  name: string;
  description: string;
  weeks: number;
  days: WorkoutDay[];
}

export default function WorkoutBuilderPage() {
  const [step, setStep] = useState<'template' | 'phase' | 'day' | 'preview'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');
  const [draftFocus, setDraftFocus] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [phases, setPhases] = useState<WorkoutPhase[]>([]);
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);
  const [currentDayIdx, setCurrentDayIdx] = useState(0);

  const template = selectedTemplate ? getTemplate(selectedTemplate) : null;

  // Step 1: Template Selection
  if (step === 'template' && !selectedTemplate) {
    return (
      <main className="flex-1 relative z-10">
        <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px', background: 'var(--surface)' }}>
          <Container>
            <div className="flex items-center gap-4 mb-6">
              <Link href="/admin" className="px-3 py-2 rounded text-sm font-semibold" style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                ← Back
              </Link>
            </div>
            <h1 className="font-display text-3xl font-semibold" style={{ color: 'var(--ink)' }}>
              Create Workout Program
            </h1>
          </Container>
        </section>

        <section style={{ borderBottom: '1px solid var(--line)' }}>
          <Container className="py-12">
            <div className="max-w-3xl">
              <h2 className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--ink)' }}>
                Step 1: Select a Template
              </h2>
              <p className="mb-8" style={{ color: 'var(--ink-dim)' }}>
                Choose a pre-built template as your starting point, then customize with your own exercises.
              </p>

              <div className="space-y-3">
                {WORKOUT_TEMPLATES.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className="rounded border p-6 cursor-pointer transition-all hover:border-accent"
                    style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}
                  >
                    <h3 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--ink)' }}>
                      {tmpl.name}
                    </h3>
                    <p className="mb-3" style={{ color: 'var(--ink-dim)' }}>
                      {tmpl.focus}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
                      {tmpl.description}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <span className="text-xs px-2 py-1 rounded" style={{ background: 'var(--surface)', color: 'var(--ink)' }}>
                        {tmpl.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded" style={{ background: 'var(--surface)', color: 'var(--ink)' }}>
                        {tmpl.suggestedExercises.length} exercise groups
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  // Step 2: Program Details
  if (step === 'template' && selectedTemplate) {
    return (
      <main className="flex-1 relative z-10">
        <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px', background: 'var(--surface)' }}>
          <Container>
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setSelectedTemplate(null)} className="px-3 py-2 rounded text-sm font-semibold" style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                ← Back to Templates
              </button>
            </div>
            <h1 className="font-display text-3xl font-semibold" style={{ color: 'var(--ink)' }}>
              Program Details
            </h1>
          </Container>
        </section>

        <section style={{ borderBottom: '1px solid var(--line)' }}>
          <Container className="py-12">
            <div className="max-w-2xl space-y-6">
              <div>
                <label style={{ color: 'var(--ink)' }} className="block text-sm font-semibold mb-2">
                  Program Name
                </label>
                <input
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder={template?.name}
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
                />
              </div>

              <div>
                <label style={{ color: 'var(--ink)' }} className="block text-sm font-semibold mb-2">
                  Focus Area (or use keywords for AI suggestions)
                </label>
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="e.g., 'upper body', 'HIIT', 'compound'"
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: 'var(--line)', background: 'var(--panel)', color: 'var(--ink)' }}
                />
                <p className="text-xs mt-2" style={{ color: 'var(--ink-dim)' }}>
                  Available: {Object.keys(KEYWORD_SUGGESTIONS).join(', ')}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('phase')}
                  className="px-6 py-2 rounded font-semibold"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  disabled={!draftName.trim()}
                >
                  Continue to Phases
                </button>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="px-6 py-2 rounded font-semibold border"
                  style={{ color: 'var(--ink)', borderColor: 'var(--line)', background: 'transparent' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  // Step 3: Build Phases
  if (step === 'phase') {
    return (
      <main className="flex-1 relative z-10">
        <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px', background: 'var(--surface)' }}>
          <Container>
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setStep('template')} className="px-3 py-2 rounded text-sm font-semibold" style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                ← Back
              </button>
            </div>
            <h1 className="font-display text-3xl font-semibold" style={{ color: 'var(--ink)' }}>
              {draftName}
            </h1>
            <p style={{ color: 'var(--ink-dim)' }} className="mt-2">
              Building phases for your program
            </p>
          </Container>
        </section>

        <section style={{ borderBottom: '1px solid var(--line)' }}>
          <Container className="py-12">
            <div className="max-w-3xl space-y-6">
              <div className="rounded border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>
                  Add Training Phase
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Phase name (e.g., 'Hypertrophy Block')"
                    className="w-full px-4 py-2 rounded border"
                    style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                  />
                  <input
                    type="number"
                    placeholder="Duration (weeks)"
                    min="1"
                    max="12"
                    className="w-full px-4 py-2 rounded border"
                    style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                  />
                  <button
                    className="w-full px-4 py-2 rounded font-semibold"
                    style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  >
                    + Add Phase
                  </button>
                </div>
              </div>

              {phases.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>
                    Phases ({phases.length})
                  </h3>
                  <div className="space-y-3">
                    {phases.map((phase, idx) => (
                      <div key={idx} className="rounded border p-4" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold" style={{ color: 'var(--ink)' }}>{phase.name}</h4>
                            <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>{phase.weeks} weeks</p>
                          </div>
                          <button
                            onClick={() => {
                              setCurrentPhaseIdx(idx);
                              setCurrentDayIdx(0);
                              setStep('day');
                            }}
                            className="px-3 py-1 rounded text-sm font-semibold"
                            style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                          >
                            Build Days
                          </button>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
                          {phase.days.length} days configured
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('preview')}
                  className="px-6 py-2 rounded font-semibold"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  disabled={phases.length === 0}
                >
                  Preview & Publish
                </button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1 relative z-10">
      <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px', background: 'var(--surface)' }}>
        <Container>
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setStep('phase')} className="px-3 py-2 rounded text-sm font-semibold" style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
              ← Back
            </button>
          </div>
          <h1 className="font-display text-3xl font-semibold" style={{ color: 'var(--ink)' }}>
            Preview: {draftName}
          </h1>
        </Container>
      </section>

      <section>
        <Container className="py-12">
          <div className="max-w-3xl">
            <div className="rounded border p-6 space-y-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <div>
                <h2 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                  Program Summary
                </h2>
                <p style={{ color: 'var(--ink-dim)' }}>
                  {phases.length} phases • {phases.reduce((sum, p) => sum + p.days.length, 0)} total days
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
                <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>
                  Program Structure
                </h3>
                <div className="space-y-4">
                  {phases.map((phase, idx) => (
                    <div key={idx} className="rounded p-4" style={{ background: 'var(--surface)' }}>
                      <h4 className="font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                        {phase.name} ({phase.weeks} weeks)
                      </h4>
                      <div className="space-y-2">
                        {phase.days.map((day, dayIdx) => (
                          <p key={dayIdx} className="text-sm" style={{ color: 'var(--ink-dim)' }}>
                            Day {dayIdx + 1}: {day.title} — {day.exercises.length} exercises
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="px-6 py-2 rounded font-semibold"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                >
                  Save as Draft
                </button>
                <button
                  className="px-6 py-2 rounded font-semibold border"
                  style={{ color: 'var(--ink)', borderColor: 'var(--line)', background: 'transparent' }}
                  onClick={() => setStep('phase')}
                >
                  Back to Edit
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
