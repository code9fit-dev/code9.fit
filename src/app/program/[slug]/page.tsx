'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { library, getProgram } from '@/data/workout-library';
import { Container } from '@/components/primitives';
import { PageBranding } from '@/components/PageBranding';
import { addToCart } from '@/lib/cart-store';

function CartSection({ programSlug, programTitle }: { programSlug: string; programTitle: string }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      type: 'program',
      slug: programSlug,
      name: programTitle,
    });
    setAdded(true);
    setTimeout(() => router.push('/cart'), 500);
  };

  return (
    <section style={{ background: 'var(--panel)', borderTop: '1px solid var(--line)' }}>
      <Container className="py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>
            Ready to start?
          </h2>
          <p className="mb-6" style={{ color: 'var(--ink-dim)' }}>
            Begin your transformation with this expertly-designed program. Add to cart and proceed to checkout.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 rounded font-semibold text-sm"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)', border: 'none', cursor: 'pointer' }}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <Link href="/library" className="px-6 py-3 rounded font-semibold text-sm text-center" style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)' }}>
              Back to Library
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

interface Program {
  meta: any;
  focus: string;
  goalStatement: string;
  overview: string;
  weeklyStructure?: any[];
  phases?: any[];
}

export default function ProgramViewPage({ params: rawParams }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const [program, setProgram] = useState<Program | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        // Try to await it (works for both Promise and non-Promise)
        const resolved = await Promise.resolve(rawParams);
        console.log('Resolved params:', resolved);
        setSlug(resolved.slug);
      } catch (e) {
        console.error('Error resolving params:', e);
        // If it fails, it's not a Promise-like object
        if (rawParams && typeof rawParams === 'object' && 'slug' in rawParams) {
          setSlug((rawParams as any).slug);
        }
      }
    };
    resolveParams();
  }, [rawParams]);

  useEffect(() => {
    if (!slug) return;
    console.log('Looking for program with slug:', slug);
    const prog = getProgram(slug);
    console.log('Found program:', prog?.meta.title);
    if (prog) {
      setProgram(prog as Program);
    } else {
      console.log('No program found for slug:', slug);
    }
  }, [slug]);

  if (!program) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
        <Container className="py-16 text-center">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>Program not found</h1>
          <Link href="/library" className="mt-4 inline-block px-4 py-2 rounded font-semibold" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>
            Back to Library
          </Link>
        </Container>
      </div>
    );
  }

  const programSlug = slug || '';
  const programTitle = program?.meta.title || '';

  return (
    <main className="flex-1 relative z-10">
      {/* Branding */}
      <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px', background: 'var(--surface)' }}>
        <Container>
          <PageBranding variant="light" centered={true} />
        </Container>
      </section>

      {/* Program Header */}
      <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '48px', paddingTop: '48px' }}>
        <Container>
          <div className="max-w-4xl">
            <Link href="/library" className="inline-block text-sm font-semibold mb-4" style={{ color: 'var(--accent)' }}>
              ← Back to Library
            </Link>
            <h1 className="font-display text-[48px] font-semibold leading-tight mb-4" style={{ color: 'var(--ink)' }}>
              {program.meta.title}
            </h1>
            <p className="text-lg mb-6" style={{ color: 'var(--ink-dim)' }}>
              {program.focus}
            </p>
            <p className="mb-6" style={{ color: 'var(--ink-dim)' }}>
              {program.overview}
            </p>

            {/* Program Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="rounded-lg border p-4" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>Level</p>
                <p className="font-semibold mt-2" style={{ color: 'var(--ink)' }}>{program.meta.level}</p>
              </div>
              <div className="rounded-lg border p-4" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>Duration</p>
                <p className="font-semibold mt-2" style={{ color: 'var(--ink)' }}>{program.meta.weeks} weeks</p>
              </div>
              <div className="rounded-lg border p-4" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>Days/Week</p>
                <p className="font-semibold mt-2" style={{ color: 'var(--ink)' }}>{program.meta.daysPerWeek}</p>
              </div>
              <div className="rounded-lg border p-4" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-xs font-semibold uppercase" style={{ color: 'var(--ink-dim)' }}>Equipment</p>
                <p className="font-semibold mt-2" style={{ color: 'var(--ink)' }}>{program.meta.equipment}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Weekly Structure */}
      {program.weeklyStructure && (
        <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '48px', paddingTop: '48px' }}>
          <Container>
            <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: 'var(--ink)' }}>
              Weekly Structure
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {program.weeklyStructure.map((day: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded text-center border"
                  style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}
                >
                  <p className="font-semibold text-sm" style={{ color: 'var(--accent)' }}>Day {day.day}</p>
                  <p className="text-xs mt-2" style={{ color: 'var(--ink-dim)' }}>{day.focus}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Training Phases */}
      {program.phases && (
        <section style={{ paddingBottom: '48px', paddingTop: '48px' }}>
          <Container>
            <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: 'var(--ink)' }}>
              Training Program
            </h2>

            <div className="space-y-6">
              {program.phases.map((phase: any, phaseIdx: number) => (
                <div
                  key={phaseIdx}
                  className="rounded-lg border overflow-hidden"
                  style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}
                >
                  {/* Phase Header */}
                  <button
                    onClick={() => setExpandedPhase(expandedPhase === phaseIdx ? null : phaseIdx)}
                    className="w-full p-6 text-left hover:opacity-80 transition-opacity"
                    style={{ borderBottom: expandedPhase === phaseIdx ? '1px solid var(--line)' : 'none' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg" style={{ color: 'var(--ink)' }}>
                          {phase.name}
                        </h3>
                        <p className="text-sm mt-2" style={{ color: 'var(--ink-dim)' }}>
                          {phase.focus}
                        </p>
                      </div>
                      <span style={{ color: 'var(--accent)' }} className="font-semibold">
                        {expandedPhase === phaseIdx ? '−' : '+'}
                      </span>
                    </div>
                  </button>

                  {/* Phase Content */}
                  {expandedPhase === phaseIdx && (
                    <div className="p-6 space-y-6" style={{ borderTop: '1px solid var(--line)' }}>
                      {phase.days?.map((day: any, dayIdx: number) => {
                        const dayKey = `${phaseIdx}-${dayIdx}`;
                        const isExpanded = expandedDay === dayKey;

                        return (
                          <div key={dayIdx} className="rounded-lg" style={{ background: 'var(--surface)' }}>
                            {/* Day Header */}
                            <button
                              onClick={() => setExpandedDay(isExpanded ? null : dayKey)}
                              className="w-full p-4 text-left hover:opacity-80 transition-opacity flex items-center justify-between"
                            >
                              <div>
                                <p className="font-semibold" style={{ color: 'var(--accent)' }}>
                                  Day {day.day} — {day.title}
                                </p>
                                <p className="text-xs mt-1" style={{ color: 'var(--ink-dim)' }}>
                                  {day.type} • {day.exercises?.length || 0} exercises
                                </p>
                              </div>
                              <span style={{ color: 'var(--ink-dim)' }}>
                                {isExpanded ? '▼' : '▶'}
                              </span>
                            </button>

                            {/* Day Content */}
                            {isExpanded && (
                              <div className="p-4" style={{ borderTop: '1px solid var(--line)' }}>
                                {day.warmup && (
                                  <div className="mb-6 pb-6" style={{ borderBottom: '1px solid var(--line)' }}>
                                    <p className="font-semibold text-sm mb-2" style={{ color: 'var(--ink)' }}>
                                      Warmup
                                    </p>
                                    <p style={{ color: 'var(--ink-dim)' }}>{day.warmup}</p>
                                  </div>
                                )}

                                {/* Exercises */}
                                <div className="space-y-4">
                                  {day.exercises?.map((ex: any, exIdx: number) => (
                                    <div key={exIdx} className="pb-4" style={{ borderBottom: exIdx < (day.exercises.length - 1) ? '1px solid var(--line)' : 'none' }}>
                                      <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                          <p className="font-semibold" style={{ color: 'var(--ink)' }}>
                                            {ex.name}
                                          </p>
                                          {ex.pattern && (
                                            <p className="text-xs mt-1" style={{ color: 'var(--ink-dim)' }}>
                                              {ex.pattern}
                                            </p>
                                          )}
                                        </div>
                                        {ex.sets && (
                                          <p className="font-semibold" style={{ color: 'var(--accent)' }}>
                                            {ex.sets}×{ex.reps}
                                            {ex.durationSec && ` (${ex.durationSec}s)`}
                                          </p>
                                        )}
                                      </div>
                                      {ex.notes && (
                                        <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
                                          {ex.notes}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <CartSection programSlug={programSlug} programTitle={programTitle} />
    </main>
  );
}
