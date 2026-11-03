import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { library } from '@/data/workout-library';
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

      <ProgramCatalog series={series} />
    </main>
  );
}
