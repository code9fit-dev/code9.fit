'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container } from '@/components/primitives';
import { getProgram } from '@/data/workout-library';

export default function AdminProgramPage() {
  const params = useParams();
  const slug = params.slug as string;
  const program = getProgram(slug) as any;

  if (!program) {
    return (
      <main className="flex-1 relative z-10">
        <section style={{ paddingTop: '48px', paddingBottom: '48px' }}>
          <Container>
            <div className="max-w-2xl text-center">
              <h1 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>
                Program not found
              </h1>
              <p style={{ color: 'var(--ink-dim)' }} className="mb-8">
                The program "{slug}" doesn't exist in our library.
              </p>
              <Link
                href="/admin/library"
                className="px-6 py-3 rounded font-semibold text-sm"
                style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
              >
                Back to Programs
              </Link>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1 relative z-10">
      {/* Header */}
      <section
        style={{
          borderBottom: '1px solid var(--line)',
          paddingBottom: '24px',
          paddingTop: '24px',
          background: 'var(--surface)',
        }}
      >
        <Container>
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/admin/library"
              className="px-3 py-2 rounded text-sm font-semibold"
              style={{
                background: 'var(--surface)',
                color: 'var(--ink)',
                border: '1px solid var(--line)',
              }}
            >
              ← Back to Library
            </Link>
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded"
              style={{
                background: 'var(--accent)',
                color: 'var(--on-accent)',
              }}
            >
              ADMIN FULL ACCESS
            </span>
          </div>
          <h1 className="font-display text-3xl font-semibold" style={{ color: 'var(--ink)' }}>
            {program.meta.title}
          </h1>
        </Container>
      </section>

      {/* Content */}
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <Container className="py-12">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Overview */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>
                  Program Overview
                </h2>
                <div className="space-y-4">
                  {program.description && (
                    <div>
                      <p className="text-sm font-semibold mb-2" style={{ color: 'var(--ink-dim)' }}>
                        Description
                      </p>
                      <p style={{ color: 'var(--ink)' }}>{program.description}</p>
                    </div>
                  )}

                  {program.focus && (
                    <div>
                      <p className="text-sm font-semibold mb-2" style={{ color: 'var(--ink-dim)' }}>
                        Focus
                      </p>
                      <p style={{ color: 'var(--ink)' }}>{program.focus}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Phases */}
              {program.phases && program.phases.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--ink)' }}>
                    Program Phases
                  </h2>
                  <div className="space-y-6">
                    {program.phases.map((phase: any, idx: number) => (
                      <div
                        key={idx}
                        className="rounded-lg border p-6"
                        style={{
                          borderColor: 'var(--line)',
                          background: 'var(--panel)',
                        }}
                      >
                        <h3 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--ink)' }}>
                          {phase.title || `Phase ${idx + 1}`}
                        </h3>

                        {phase.description && (
                          <p className="mb-4" style={{ color: 'var(--ink-dim)' }}>
                            {phase.description}
                          </p>
                        )}

                        {phase.weeks && (
                          <div className="mb-4">
                            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--ink-dim)' }}>
                              Duration: {phase.weeks} weeks
                            </p>
                          </div>
                        )}

                        {phase.days && phase.days.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--ink-dim)' }}>
                              Weekly Split:
                            </p>
                            <div className="grid gap-2 md:grid-cols-2">
                              {phase.days.map((day: any, dayIdx: number) => (
                                <div
                                  key={dayIdx}
                                  className="rounded p-3"
                                  style={{
                                    background: 'var(--surface)',
                                    borderLeft: `3px solid var(--accent)`,
                                  }}
                                >
                                  <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                                    {day.title || `Day ${dayIdx + 1}`}
                                  </p>
                                  {day.focus && (
                                    <p className="text-xs mt-1" style={{ color: 'var(--ink-dim)' }}>
                                      {day.focus}
                                    </p>
                                  )}
                                  {day.exercises && day.exercises.length > 0 && (
                                    <p className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
                                      {day.exercises.length} exercises
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div
                className="rounded-lg border p-6 sticky top-24"
                style={{
                  borderColor: 'var(--line)',
                  background: 'var(--panel)',
                }}
              >
                <h3 className="font-display text-lg font-semibold mb-6" style={{ color: 'var(--ink)' }}>
                  Program Details
                </h3>

                <div className="space-y-4">
                  {program.meta.difficulty && (
                    <div>
                      <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>
                        Difficulty
                      </p>
                      <p className="mt-1" style={{ color: 'var(--ink)' }}>
                        {program.meta.difficulty}
                      </p>
                    </div>
                  )}

                  {program.meta.durationWeeks && (
                    <div>
                      <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>
                        Duration
                      </p>
                      <p className="mt-1" style={{ color: 'var(--ink)' }}>
                        {program.meta.durationWeeks} weeks
                      </p>
                    </div>
                  )}

                  {program.meta.sessionsPerWeek && (
                    <div>
                      <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>
                        Sessions Per Week
                      </p>
                      <p className="mt-1" style={{ color: 'var(--ink)' }}>
                        {program.meta.sessionsPerWeek}
                      </p>
                    </div>
                  )}

                  {program.meta.equipment && program.meta.equipment.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>
                        Equipment
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {program.meta.equipment.map((eq: string) => (
                          <span
                            key={eq}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              background: 'var(--surface)',
                              color: 'var(--ink)',
                            }}
                          >
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {program.meta.goals && program.meta.goals.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>
                        Goals
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {program.meta.goals.map((goal: string) => (
                          <span
                            key={goal}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              background: 'var(--accent)',
                              color: 'var(--on-accent)',
                            }}
                          >
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--line)' }}>
                  <Link
                    href={`/admin/workout-viewer/${program.meta.id}`}
                    className="w-full block text-center px-4 py-2 rounded font-semibold text-sm"
                    style={{
                      background: 'var(--accent)',
                      color: 'var(--on-accent)',
                    }}
                  >
                    View Full HTML
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
