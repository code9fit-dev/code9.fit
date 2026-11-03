import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, SESSION_HOURS, checkAdmin, cleared, failed, makeSession, tooMany } from '@/lib/admin/session';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  if (tooMany(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  let email = '';
  let password = '';
  try {
    ({ email = '', password = '' } = await req.json());
  } catch {
    // empty body is treated as a failed login
  }

  if (!checkAdmin(email, password)) {
    failed(ip);
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  cleared(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeSession(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_HOURS * 3600,
  });
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
