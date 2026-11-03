import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { adminFrom } from '@/lib/admin/session';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!adminFrom(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  try {
    const file = path.join(process.cwd(), 'src', 'data', 'admin-workouts', `code9-${slug}.html`);
    const html = await fs.readFile(file, 'utf-8');
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
