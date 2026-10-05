'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/primitives';
import { ProgramDocument } from '@/components/ProgramDocument';
import { PackageGate } from '@/components/PackageGate';
import { getProgram } from '@/data/workout-library';

export default function ProgramPage() {
  const params = useParams();
  const slug = params.slug as string;
  const program = getProgram(slug);

  if (!program) {
    return (
      <Container className="py-20 text-center">
        <p className="mb-4 text-ink-dim">That program doesn't exist.</p>
        <Link href="/downloads" className="btn-primary">
          Back to Programs
        </Link>
      </Container>
    );
  }

  return (
    <main className="relative z-10 flex-1">
      <Container className="py-8">
        <Link href="/downloads" className="font-mono text-xs text-ink-dim mb-6 inline-block">
          ← Back to Programs
        </Link>

        {/* Package gate for paid programs */}
        {program.meta.purchasable ? (
          <PackageGate packageId={program.meta.id}>
            <ProgramDocument program={program} />
          </PackageGate>
        ) : (
          <ProgramDocument program={program} />
        )}
      </Container>
    </main>
  );
}
