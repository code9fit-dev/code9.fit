'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/primitives';

export default function CheckInGuidePage() {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    setPdfUrl('/C9F_CheckIn_Guide.pdf');
  }, []);

  return (
    <main className="flex-1 relative z-10">
      {/* Header */}
      <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px' }}>
        <Container>
          <Link href="/resources" className="font-mono text-xs mb-4 inline-block" style={{ color: 'var(--ink-dim)' }}>
            ← Back to Resources
          </Link>
          <div className="max-w-2xl">
            <h1 className="font-display text-[32px] font-semibold mb-2" style={{ color: 'var(--ink)' }}>
              Check-In Guidelines
            </h1>
            <p style={{ color: 'var(--ink-dim)' }}>
              Master guide to effective progress check-ins and performance tracking
            </p>
          </div>
        </Container>
      </section>

      {/* PDF Viewer */}
      <section>
        <Container className="py-12">
          <div
            className="rounded border overflow-hidden"
            style={{
              borderColor: 'var(--line)',
              background: 'var(--surface)',
              minHeight: '800px',
            }}
          >
            {pdfUrl ? (
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full"
                style={{ minHeight: '800px' }}
                title="Check-In Guidelines PDF"
              />
            ) : (
              <div className="flex items-center justify-center h-96">
                <p style={{ color: 'var(--ink-dim)' }}>Loading...</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="/C9F_CheckIn_Guide.pdf" download className="btn-primary">
              Download PDF
            </a>
            <Link href="/resources" className="btn-secondary">
              Back to Resources
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
