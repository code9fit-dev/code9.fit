import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { promises as fs } from 'fs';
import path from 'path';
import { ADMIN_COOKIE, adminFromCookieValue } from '@/lib/admin/session';

export default async function WorkoutViewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const jar = await cookies();
  if (!adminFromCookieValue(jar.get(ADMIN_COOKIE)?.value)) {
    redirect(`/admin/login?next=/admin/workout-viewer/${encodeURIComponent(slug)}`);
  }

  const file = path.join(process.cwd(), 'src', 'data', 'admin-workouts', `code9-${slug}.html`);
  const exists = await fs.access(file).then(() => true, () => false);

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh' }}>
      <header style={{ background: 'white', borderBottom: '1px solid #ddd', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Full Workout Program (admin)</span>
          <Link
            href="/admin"
            style={{ fontSize: '13px', fontWeight: '600', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', color: '#333', textDecoration: 'none' }}
          >
            ← Back to Admin
          </Link>
        </div>
      </header>

      {exists ? (
        <iframe
          src={`/api/admin/workouts/${encodeURIComponent(slug)}`}
          title={`Full workout program: ${slug}`}
          style={{ display: 'block', width: '100%', height: 'calc(100vh - 65px)', border: 0, background: 'white' }}
        />
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: '#d32f2f' }}>
          <h2>No admin version for {slug}</h2>
        </div>
      )}
    </div>
  );
}
