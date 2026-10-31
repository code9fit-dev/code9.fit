import Link from 'next/link';
import { Container } from '@/components/primitives';
import { PageBranding } from '@/components/PageBranding';
import { library } from '@/data/workout-library';

export const metadata = {
  title: 'Admin - Program Library — Code9 Fitness',
  description: 'Full admin access to all programs with complete workout viewing',
};

export default function AdminLibraryPage() {
  // Filter to only programs with available HTML files
  const programsWithHTML = [
    'fat-to-fit',
    'fat-to-fit-advanced',
    'fat-to-fit-foundations-gym',
    'fat-to-fit-foundations-home',
    'fat-to-fit-intermediate',
    'fat-to-fit-light-budget',
    'fat-to-fit-momentum-gym',
    'fat-to-fit-momentum-home',
    'hybrid-athlete',
    'hybrid-base',
    'hybrid-base-4day',
    'hybrid-base-6day',
    'hybrid-explosive',
    'hybrid-performance',
    'hybrid-race',
    'hybrid-sport',
    'lean-bulk',
    'lean-bulk-2',
    'machine-starter',
    'peachy-progression',
    'peachy-progression-3day',
    'peachy-progression-4day',
    'peachy-progression-5day',
    'peachy-pump',
    'find-your-program',
  ];

  const programs = library.filter((p) =>
    programsWithHTML.includes(p.meta.id)
  );

  return (
    <main className="flex-1 relative z-10">
      {/* Branding Section */}
      <section
        style={{
          borderBottom: '1px solid var(--line)',
          paddingBottom: '24px',
          paddingTop: '24px',
          background: 'var(--surface)',
        }}
      >
        <Container>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="px-3 py-2 rounded text-sm font-semibold"
              style={{
                background: 'var(--surface)',
                color: 'var(--ink)',
                border: '1px solid var(--line)',
              }}
            >
              ← Back to Admin
            </Link>
            <PageBranding variant="light" />
          </div>
        </Container>
      </section>

      {/* Header Section */}
      <section
        style={{
          borderBottom: '1px solid var(--line)',
          paddingBottom: '48px',
          paddingTop: '48px',
        }}
      >
        <Container>
          <div className="max-w-3xl">
            <div
              className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em]"
              style={{ color: 'var(--accent)' }}
            >
              <span
                className="inline-block h-px w-5"
                style={{ background: 'var(--accent)' }}
              />
              Admin Full Access
            </div>
            <h1
              className="font-display text-[40px] font-semibold leading-tight mb-4"
              style={{ color: 'var(--ink)' }}
            >
              Program Library
            </h1>
            <p style={{ color: 'var(--ink-dim)' }}>
              View all {programs.length} programs with full access to complete workout details. Click any program to see
              the full workout breakdown.
            </p>
          </div>
        </Container>
      </section>

      {/* Programs Grid */}
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <Container className="py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.slug}
                className="rounded border p-6 transition-all hover:border-accent"
                style={{
                  borderColor: 'var(--line)',
                  background: 'var(--surface)',
                }}
              >
                {/* Program Title */}
                <h3
                  className="font-display font-semibold text-lg mb-3"
                  style={{ color: 'var(--ink)' }}
                >
                  {program.meta.title}
                </h3>

                {/* Program Meta */}
                <div className="mb-4 space-y-2">
                  <p style={{ color: 'var(--ink-dim)', fontSize: '14px' }}>
                    <strong>Focus:</strong> {program.focus}
                  </p>
                  {program.meta.difficulty && (
                    <p style={{ color: 'var(--ink-dim)', fontSize: '14px' }}>
                      <strong>Level:</strong> {program.meta.difficulty}
                    </p>
                  )}
                  {program.meta.durationWeeks && (
                    <p style={{ color: 'var(--ink-dim)', fontSize: '14px' }}>
                      <strong>Duration:</strong> {program.meta.durationWeeks} weeks
                    </p>
                  )}
                  {program.meta.sessionsPerWeek && (
                    <p style={{ color: 'var(--ink-dim)', fontSize: '14px' }}>
                      <strong>Sessions/Week:</strong> {program.meta.sessionsPerWeek}
                    </p>
                  )}
                </div>

                {/* Description */}
                {program.description && (
                  <p className="text-sm mb-6" style={{ color: 'var(--ink-dim)' }}>
                    {program.description.substring(0, 150)}
                    {program.description.length > 150 ? '...' : ''}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/admin/program/${program.meta.id}`}
                    className="btn-primary text-center"
                  >
                    View Full Details
                  </Link>
                  <Link
                    href={`/admin/workout-viewer/${program.meta.id}`}
                    className="px-4 py-2 rounded font-semibold text-sm text-center"
                    style={{
                      background: 'var(--surface)',
                      color: 'var(--ink)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    View HTML Breakdown
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Summary Section */}
      <section style={{ background: 'var(--panel)', borderBottom: '1px solid var(--line)' }}>
        <Container className="py-16">
          <div className="max-w-2xl">
            <h2
              className="font-display text-2xl font-semibold mb-4"
              style={{ color: 'var(--ink)' }}
            >
              Quick Stats
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div
                className="rounded border p-4"
                style={{
                  borderColor: 'var(--line)',
                  background: 'var(--surface)',
                }}
              >
                <p
                  className="text-sm font-semibold uppercase"
                  style={{ color: 'var(--ink-dim)' }}
                >
                  Total Programs
                </p>
                <p
                  className="text-3xl font-bold mt-2"
                  style={{ color: 'var(--accent)' }}
                >
                  {programs.length}
                </p>
              </div>
              <div
                className="rounded border p-4"
                style={{
                  borderColor: 'var(--line)',
                  background: 'var(--surface)',
                }}
              >
                <p
                  className="text-sm font-semibold uppercase"
                  style={{ color: 'var(--ink-dim)' }}
                >
                  Full Access
                </p>
                <p
                  className="text-3xl font-bold mt-2"
                  style={{ color: 'var(--accent)' }}
                >
                  ✓
                </p>
              </div>
              <div
                className="rounded border p-4"
                style={{
                  borderColor: 'var(--line)',
                  background: 'var(--surface)',
                }}
              >
                <p
                  className="text-sm font-semibold uppercase"
                  style={{ color: 'var(--ink-dim)' }}
                >
                  Admin Only
                </p>
                <p
                  className="text-3xl font-bold mt-2"
                  style={{ color: 'var(--accent)' }}
                >
                  🔒
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
