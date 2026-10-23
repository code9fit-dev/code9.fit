import Link from 'next/link';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';

export default async function WorkoutViewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let htmlContent = '';
  let error = '';

  try {
    const filePath = path.join(process.cwd(), 'public', 'workouts', `code9-${slug}.html`);
    htmlContent = await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    error = `Workout not found: code9-${slug}.html`;
  }

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #ddd', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image
              src="/code9-logo-dark.svg"
              alt="Code9 Admin"
              width={32}
              height={32}
            />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Full Workout Program
            </span>
          </div>
          <Link
            href="/admin"
            style={{
              fontSize: '13px',
              fontWeight: '600',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              color: '#333',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            ← Back to Admin
          </Link>
        </div>
      </header>

      {/* Content */}
      <div style={{ padding: '20px', background: 'white', margin: '20px auto', maxWidth: '1000px' }}>
        {error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#d32f2f' }}>
            <h2>{error}</h2>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}
      </div>
    </div>
  );
}
