import Link from 'next/link';

export function FreeResourcesCTA() {
  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '48px 24px' }}>
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: 'var(--accent)' }}>
            <span className="inline-block h-px w-5" style={{ background: 'var(--accent)' }} />
            Free
          </div>
          <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>
            Learn before you commit
          </h2>
          <p className="mb-6" style={{ color: 'var(--ink-dim)' }}>
            Six proven protocols and templates to build momentum. Fasting guides, fascia training, daily wellness protocols, and check-in checklists—everything free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/resources" className="btn-primary">
              Access Free Resources
            </Link>
            <Link href="/library" className="btn-secondary">
              Or Explore Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
