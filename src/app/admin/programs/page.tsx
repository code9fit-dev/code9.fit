'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { library } from '@/data/workout-library';

export default function AdminProgramsPage() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session');
    if (!adminSession) {
      router.push('/admin/login');
    } else {
      setIsAuthed(true);
    }
    setLoading(false);
  }, [router]);

  if (loading || !isAuthed) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/admin" className="text-sm font-semibold text-stone-600 hover:text-stone-900">
            ← Back to Admin
          </Link>
          <h1 className="text-2xl font-bold text-stone-900">All Programs (No Blur)</h1>
          <div className="text-xs text-stone-600">Admin view</div>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6">
          {library.map((program) => (
            <Link
              key={program.meta.id}
              href={`/admin/programs/${program.meta.id}`}
              className="rounded-lg border border-stone-200 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-stone-900">{program.meta.title}</h2>
                  <p className="text-sm text-stone-600 mt-1">{program.focus}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-stone-600 uppercase">
                    {program.meta.daysPerWeek}-day / {program.meta.weeks}wks
                  </p>
                  <p className="text-sm font-semibold text-accent mt-1">{program.meta.level}</p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-stone-100 px-2 py-1 rounded">{program.meta.equipment}</span>
                <span className="text-xs bg-stone-100 px-2 py-1 rounded">{program.goalStatement}</span>
                {program.meta.refined && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Full Detail</span>}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
