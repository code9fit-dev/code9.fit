import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { library } from '@/data/workout-library';
import { ADMIN_COOKIE, adminFromCookieValue } from '@/lib/admin/session';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import { buildCatalog } from '@/lib/admin/catalog';
import { ProgramCatalog } from '@/components/admin/ProgramCatalog';

export const metadata = {
  title: 'Admin - Programs — Code9 Fitness',
  description: 'All Code9 programs with full admin access',
};

export default async function AdminLibraryPage() {
  const htmlDir = path.join(process.cwd(), 'src', 'data', 'admin-workouts');
  const htmlIds = new Set(await fs.readdir(htmlDir).catch(() => [] as string[]));
  const series = buildCatalog(library, htmlIds);
  const total = series.reduce((n, s) => n + s.programs.length, 0);

  const jar = await cookies();
  const isAdmin = !!adminFromCookieValue(jar.get(ADMIN_COOKIE)?.value);
  const db = isAdmin ? getSupabaseAdminClient() : null;
  const saved = db
    ? (await db.from('admin_workouts').select('id, title, status, saved_at').order('saved_at', { ascending: false })).data ?? []
    : [];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-8" style={{ color: 'var(--ink)' }}>
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            ← Back to admin
          </Link>
          <h1 className="mt-2 text-3xl font-semibold">All programs</h1>
          <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
            {total} programs across {series.length} series
          </p>
        </div>
        <Link href="/admin/workout-builder" className="rounded px-4 py-2 text-sm font-semibold" style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}>
          + Create workout
        </Link>
      </div>

      {db && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Saved workouts</h2>
          {saved.length === 0 && (
            <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>No saved workouts yet. Use Save day or Full save in the builder.</p>
          )}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {saved.map((w) => (
              <Link
                key={w.id}
                href={`/admin/workout-builder?id=${w.id}`}
                className="flex flex-col gap-1 rounded-lg border p-4"
                style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}
              >
                <span className="font-semibold">{w.title}</span>
                <span className="text-xs uppercase" style={{ color: w.status === 'complete' ? 'var(--accent)' : 'var(--ink-dim)' }}>
                  {w.status === 'complete' ? 'Complete' : 'Draft'} · {new Date(w.saved_at).toLocaleDateString('en-GB')}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ProgramCatalog series={series} />
    </main>
  );
}
