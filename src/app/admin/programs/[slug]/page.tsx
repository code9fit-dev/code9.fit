'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/primitives';
import { ProgramDocument } from '@/components/ProgramDocument';
import { getProgram } from '@/data/workout-library';

export default function AdminProgramPage() {
  const params = useParams();
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const slug = params.slug as string;
  const program = getProgram(slug);

  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session');
    if (!adminSession) {
      router.push('/admin/login');
    } else {
      setIsAuthed(true);
    }
  }, [router]);

  if (!isAuthed) return null;

  if (!program) {
    return (
      <Container className="py-20 text-center">
        <p className="mb-4 text-ink-dim">That program doesn't exist.</p>
        <Link href="/admin/programs" className="btn-primary">
          All programs
        </Link>
      </Container>
    );
  }

  return (
    <>
      <main className="relative z-10 flex-1">
        <Container className="py-8">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/admin/programs" className="font-mono text-xs text-ink-dim">
              ← All programs
            </Link>
            <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              ADMIN VIEW (No Blur)
            </div>
          </div>

          {/* Full content without blur */}
          <ProgramDocument program={program} />

          <p className="mx-auto mt-6 max-w-[720px] font-mono text-[10px] text-ink-dim">
            Admin view: Full access to program content.
          </p>
        </Container>
      </main>
    </>
  );
}
