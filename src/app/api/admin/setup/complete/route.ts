import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, verifySetupToken } from '@/lib/admin/session';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let token = '';
  let password = '';
  try {
    ({ token = '', password = '' } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!verifySetupToken(token)) {
    return NextResponse.json({ error: 'This link has expired. Request a new one.' }, { status: 401 });
  }
  if (password.length < 12) {
    return NextResponse.json({ error: 'Use at least 12 characters' }, { status: 400 });
  }

  return NextResponse.json({ hash: hashPassword(password) });
}
