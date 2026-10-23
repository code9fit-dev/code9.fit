import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/primitives';

export default async function FasciaGuidePage() {
  const htmlPath = path.join(process.cwd(), 'public/code9-fascia-training.html');
  const content = await fs.readFile(htmlPath, 'utf-8');

  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/);
  const htmlContent = bodyMatch ? bodyMatch[1] : content;

  const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  const styles = styleMatch ? styleMatch[1] : '';

  return (
    <main className="flex-1 relative z-10">
      {/* Header */}
      <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px' }}>
        <Container>
          <Link href="/resources" className="font-mono text-xs mb-4 inline-block" style={{ color: 'var(--ink-dim)' }}>
            ← Back to Resources
          </Link>
          <div className="flex gap-6 items-start">
            <Image
              src="/code9-logo-dark.svg"
              alt="Code9 Fitness"
              width={56}
              height={56}
              className="flex-shrink-0"
              style={{ height: '56px', width: 'auto' }}
            />
            <div className="max-w-2xl">
              <h1 className="font-display text-[32px] font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                Fascia Training Guide
              </h1>
              <p style={{ color: 'var(--ink-dim)' }}>
                Learn myofascial release techniques and fascia-focused training methods
              </p>
            </div>
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
            <a href="/code9-fascia-training.html" download className="btn-primary">
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
