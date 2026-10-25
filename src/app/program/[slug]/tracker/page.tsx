'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProgram } from '@/data/workout-library';
import { Container } from '@/components/primitives';
import { PageBranding } from '@/components/PageBranding';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  pattern: string;
  notes: string;
}

export default function WorkoutTrackerPage({ params: rawParams }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const [program, setProgram] = useState<any>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [sessionLogs, setSessionLogs] = useState<{ [key: string]: { weight: string; reps: string }[] }>({});
  const [sessionTime, setSessionTime] = useState('0:00');
  const [difficulty, setDifficulty] = useState(5);
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);
  const [params, setParams] = useState<{ slug: string } | null>(null);

  useEffect(() => {
    // Handle both Promise and direct params
    const resolveParams = async () => {
      if (rawParams instanceof Promise) {
        const resolved = await rawParams;
        setParams(resolved);
      } else {
        setParams(rawParams);
      }
    };
    resolveParams();
  }, [rawParams]);

  useEffect(() => {
    if (!params?.slug) return;

    const prog = getProgram(params.slug);
    if (prog) {
      setProgram(prog);
      // Set first day as default
      if (prog.phases && prog.phases[0]?.days?.[0]) {
        setSelectedDay(prog.phases[0].days[0].day);
      }
    }
  }, [params?.slug]);

  useEffect(() => {
    if (!program || !selectedDay) return;

    // Find the current session based on selected week and day
    const phase = program.phases?.[Math.floor((selectedWeek - 1) / 3)];
    if (!phase) return;

    const session = phase.days.find((d: any) => d.day === selectedDay);
    setCurrentSession(session);

    // Initialize session logs
    if (session) {
      const key = `w${selectedWeek}-d${selectedDay}`;
      if (!sessionLogs[key]) {
        const logs: { [key: string]: { weight: string; reps: string }[] } = {};
        session.exercises.forEach((ex: Exercise, idx: number) => {
          logs[idx] = Array(ex.sets).fill(null).map(() => ({ weight: '', reps: '' }));
        });
        setSessionLogs(prev => ({ ...prev, [key]: logs[key] }));
      }
    }
  }, [selectedWeek, selectedDay, program]);

  if (!program || !currentSession) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
        <Container className="py-16 text-center">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>Loading...</h1>
        </Container>
      </div>
    );
  }

  const totalSets = currentSession.exercises.reduce((sum: number, ex: Exercise) => sum + ex.sets, 0);
  const completedSets = Object.values(sessionLogs[`w${selectedWeek}-d${selectedDay}`] || {})
    .flat()
    .filter((log: any) => log.weight && log.reps)
    .length;

  return (
    <main className="flex-1 relative z-10" style={{ background: 'var(--surface)' }}>
      {/* Header Navigation */}
      <header className="sticky top-0 z-50" style={{ background: 'var(--panel)', borderBottom: '1px solid var(--line)' }}>
        <Container>
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/code9-logo-dark.svg"
                alt="Code9"
                width={24}
                height={24}
              />
              <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                {program.meta.title}
              </span>
            </div>
            <div className="flex gap-4 text-sm">
              <button className="font-semibold" style={{ color: 'var(--accent)' }}>Overview</button>
              <button style={{ color: 'var(--ink-dim)' }}>Nutrition</button>
              <button style={{ color: 'var(--ink-dim)' }}>Weekly Structure</button>
              <button style={{ color: 'var(--ink-dim)' }}>Exercise Library</button>
              <button className="font-semibold" style={{ color: 'var(--accent)' }}>Workout Tracker</button>
              <button style={{ color: 'var(--ink-dim)' }}>All programs</button>
            </div>
            <Link href={`/program/${program.meta.id}`} style={{ color: 'var(--ink-dim)' }} className="text-sm font-semibold">
              ← Back
            </Link>
          </div>
        </Container>
      </header>

      {/* Branding */}
      <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '16px', paddingTop: '16px' }}>
        <Container>
          <PageBranding variant="light" centered={true} />
        </Container>
      </section>

      <Container>
        <div className="py-8 flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Workout Tracker</h1>
              <p style={{ color: 'var(--ink-dim)' }}>
                Pick your week and day, tick each set as you finish it and log what you actually did. When you complete a session, it's saved to your progress — and shared with your Code9 AI coach.
              </p>
            </div>

            {/* Week Selector */}
            <div className="mb-8">
              <p className="text-sm font-semibold mb-3 uppercase" style={{ color: 'var(--ink-dim)' }}>Week</p>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: program.meta.weeks }).map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => setSelectedWeek(idx + 1)}
                    className="w-10 h-10 rounded font-semibold transition-all text-sm"
                    style={{
                      background: selectedWeek === idx + 1 ? 'var(--ink)' : 'var(--panel)',
                      color: selectedWeek === idx + 1 ? 'var(--cream)' : 'var(--ink)',
                      border: `1px solid ${selectedWeek === idx + 1 ? 'var(--ink)' : 'var(--line)'}`
                    }}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Day Selector */}
            <div className="mb-8">
              <p className="text-sm font-semibold mb-3 uppercase" style={{ color: 'var(--ink-dim)' }}>Day</p>
              <div className="flex gap-2 flex-wrap">
                {currentSession && program.phases?.[Math.floor((selectedWeek - 1) / 3)]?.days.map((day: any) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className="px-4 py-2 rounded font-semibold text-sm transition-all"
                    style={{
                      background: selectedDay === day.day ? 'var(--ink)' : 'var(--panel)',
                      color: selectedDay === day.day ? 'var(--cream)' : 'var(--ink)',
                      border: `1px solid ${selectedDay === day.day ? 'var(--ink)' : 'var(--line)'}`
                    }}
                  >
                    Day {day.day} {day.type === 'strength' ? 'Strength' : day.type === 'conditioning' ? 'Conditioning' : 'Mobility'}
                  </button>
                ))}
              </div>
            </div>

            {/* Session Info */}
            <div className="mb-8 p-4 rounded" style={{ background: 'var(--panel)' }}>
              <h2 className="font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                {currentSession.title}
              </h2>
              <p style={{ color: 'var(--ink-dim)', fontSize: '14px' }}>
                {currentSession.exercises.length} exercises • {totalSets} sets total
              </p>
            </div>

            {/* Warmup */}
            {currentSession.warmup && (
              <div className="mb-6 p-4 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--accent)' }}>Warmup</p>
                <p style={{ color: 'var(--ink)' }}>{currentSession.warmup}</p>
              </div>
            )}

            {/* Exercises */}
            <div className="space-y-6 mb-8">
              {currentSession.exercises.map((exercise: Exercise, exIdx: number) => {
                const sessionKey = `w${selectedWeek}-d${selectedDay}`;
                const exerciseLogs = sessionLogs[sessionKey]?.[exIdx] || [];

                return (
                  <div key={exIdx} className="p-6 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                    <div className="flex gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full font-bold flex items-center justify-center" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
                        {exIdx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg" style={{ color: 'var(--ink)' }}>
                          {exercise.name}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
                          {exercise.sets} × {exercise.reps}
                        </p>
                      </div>
                      <div style={{ color: 'var(--accent)', fontWeight: '600' }}>
                        {exercise.sets} sets
                      </div>
                    </div>

                    {/* Instructions */}
                    {exercise.notes && (
                      <div className="mb-4 p-3 rounded" style={{ background: 'var(--surface)' }}>
                        <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
                          {exercise.notes}
                        </p>
                      </div>
                    )}

                    {/* Set Logging */}
                    <div className="space-y-2 mb-4">
                      {Array.from({ length: exercise.sets }).map((_, setIdx) => (
                        <div key={setIdx} className="grid grid-cols-4 gap-2 items-center">
                          <label className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                            Set {setIdx + 1}
                          </label>
                          <input
                            type="number"
                            placeholder="Weight"
                            value={(exerciseLogs as any)[setIdx]?.weight || ''}
                            onChange={(e) => {
                              const newLogs: any = { ...sessionLogs[sessionKey] };
                              if (!newLogs[exIdx]) newLogs[exIdx] = [];
                              if (!newLogs[exIdx][setIdx]) newLogs[exIdx][setIdx] = { weight: '', reps: '' };
                              newLogs[exIdx][setIdx].weight = e.target.value;
                              setSessionLogs(prev => ({ ...prev, [sessionKey]: newLogs }));
                            }}
                            className="p-2 rounded border text-sm"
                            style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                          />
                          <input
                            type="text"
                            placeholder="Reps"
                            value={(exerciseLogs as any)[setIdx]?.reps || ''}
                            onChange={(e) => {
                              const newLogs: any = { ...sessionLogs[sessionKey] };
                              if (!newLogs[exIdx]) newLogs[exIdx] = [];
                              if (!newLogs[exIdx][setIdx]) newLogs[exIdx][setIdx] = { weight: '', reps: '' };
                              newLogs[exIdx][setIdx].reps = e.target.value;
                              setSessionLogs(prev => ({ ...prev, [sessionKey]: newLogs }));
                            }}
                            className="p-2 rounded border text-sm"
                            style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
                          />
                          <button className="px-3 py-2 rounded text-sm font-semibold" style={{ background: 'var(--surface)', color: 'var(--ink)' }}>
                            Done
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80">
            {/* Session Summary */}
            <div className="rounded-lg border p-6 mb-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <p className="text-xs font-semibold uppercase mb-3" style={{ color: 'var(--ink-dim)' }}>This Session</p>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>
                  {completedSets}
                </div>
                <p style={{ color: 'var(--ink-dim)' }}>of {totalSets} sets</p>
              </div>
              <div style={{ background: 'var(--surface)', borderRadius: '4px', overflow: 'hidden', height: '8px' }}>
                <div
                  style={{
                    width: `${(completedSets / totalSets) * 100}%`,
                    height: '100%',
                    background: 'var(--accent)',
                    transition: 'width 0.3s'
                  }}
                />
              </div>
            </div>

            {/* Session Time */}
            <div className="rounded-lg border p-6 mb-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--ink-dim)' }}>Session Time</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>{sessionTime}</p>
            </div>

            {/* Difficulty */}
            <div className="rounded-lg border p-6 mb-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <p className="text-xs font-semibold uppercase mb-3" style={{ color: 'var(--ink-dim)' }}>How Hard Was It?</p>
              <div className="flex gap-2 justify-between">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setDifficulty(num)}
                    className="w-8 h-8 rounded font-semibold text-sm transition-all"
                    style={{
                      background: difficulty === num ? 'var(--accent)' : 'var(--surface)',
                      color: difficulty === num ? 'var(--on-accent)' : 'var(--ink-dim)',
                      border: `1px solid ${difficulty === num ? 'var(--accent)' : 'var(--line)'}`
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--ink-dim)' }}>
                <span>Very easy</span>
                <span>Max effort</span>
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-lg border p-6 mb-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--ink-dim)' }}>Notes For Your Coach</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did it feel? Any pain, swaps or wins?"
                rows={4}
                className="w-full p-2 rounded border text-sm resize-none"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
              />
            </div>

            {/* Complete Button */}
            <button
              onClick={() => setCompleted(true)}
              className="w-full py-3 rounded font-semibold mb-4"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              Complete Session
            </button>

            {/* AI Coach Feedback */}
            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <p className="text-xs font-semibold uppercase mb-3" style={{ color: 'var(--ink-dim)' }}>AI Coach Feedback</p>
              <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '4px' }}>
                <p style={{ color: 'var(--ink-dim)', fontSize: '14px' }}>
                  Complete a session and your coach's feedback will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
