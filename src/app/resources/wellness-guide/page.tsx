'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/primitives';

export default function WellnessGuidePage() {
  const [htmlContent, setHtmlContent] = useState('');
  const [styles, setStyles] = useState('');

  useEffect(() => {
    fetch('/code9-holistic-wellness.html')
      .then((res) => res.text())
      .then((content) => {
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/);
        const bodyContent = bodyMatch ? bodyMatch[1] : content;

        const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
        const styleContent = styleMatch ? styleMatch[1] : '';

        setHtmlContent(bodyContent);
        setStyles(styleContent);
      })
      .catch((error) => console.error('Error loading wellness guide:', error));
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
              Holistic Wellness Daily Protocol
            </h1>
            <p style={{ color: 'var(--ink-dim)' }}>
              Comprehensive daily wellness routine for optimal recovery and performance
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </section>

      {/* Footer */}
      <section style={{ background: 'var(--panel)' }}>
        <Container className="py-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/code9-holistic-wellness.html" download className="btn-primary">
              Download Guide
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
