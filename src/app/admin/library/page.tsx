import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { library } from '@/data/workout-library';

export const metadata = {
  title: 'Admin - Program Library — Code9 Fitness',
  description: 'Full admin access to all programs',
};

export default async function AdminLibraryPage() {
  const htmlDir = path.join(process.cwd(), 'src', 'data', 'admin-workouts');
  const htmlFiles = new Set(await fs.readdir(htmlDir).catch(() => [] as string[]));

  const programs = library.map((p) => ({
    ...p,
    hasHtml: htmlFiles.has(`code9-${p.meta.id}.html`),
  }));

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-8" style={{ color: 'var(--ink)' }}>
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            ← Back to admin
          </Link>
          <h1 className="mt-2 text-3xl font-semibold">Program library</h1>
          <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
            {programs.length} programs · {programs.filter((p) => p.hasHtml).length} with full HTML breakdown
          </p>
        </div>
        <Link href="/admin/workout-builder" className="rounded px-4 py-2 text-sm font-semibold" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>
          + Create workout
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <div key={p.meta.id} className="flex flex-col gap-3 rounded-lg border p-5" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
            <div>
              <h2 className="font-semibold">{p.meta.title}</h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink-dim)' }}>{p.focus}</p>
            </div>
            <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>
              {p.meta.level} · {p.meta.weeks} weeks · {p.meta.daysPerWeek ?? '—'} days/week
            </p>
            <div className="mt-auto flex flex-col gap-2">
              <Link href={`/admin/program/${p.meta.id}`} className="rounded px-4 py-2 text-center text-sm font-semibold" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>
                View full program
              </Link>
              {p.hasHtml ? (
                <Link href={`/admin/workout-viewer/${p.meta.id}`} className="rounded px-4 py-2 text-center text-sm font-semibold" style={{ border: '1px solid var(--line)', color: 'var(--ink)' }}>
                  View HTML breakdown
                </Link>
              ) : (
                <span className="text-center text-xs" style={{ color: 'var(--ink-dim)' }}>No HTML breakdown</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
