import { NextResponse } from 'next/server';
import { adminEmail, makeSetupToken } from '@/lib/admin/session';

export const dynamic = 'force-dynamic';

const MIN_INTERVAL_MS = 5 * 60e3;
let lastSentAt = 0;

export async function POST() {
  const to = adminEmail();
  if (!to || !process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_URL) {
    return NextResponse.json({ error: 'Admin email is not configured' }, { status: 500 });
  }

  if (Date.now() - lastSentAt < MIN_INTERVAL_MS) {
    return NextResponse.json({ ok: true });
  }
  lastSentAt = Date.now();

  const link = `${process.env.NEXT_PUBLIC_URL}/admin/setup?token=${encodeURIComponent(makeSetupToken())}`;
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: 'CODE9 Fitness <downloads@code9fitness.com>',
    to,
    subject: 'Set your CODE9 admin password',
    html: `<p>Use this link to set your admin password. It expires in 30 minutes and stops working once the password is changed.</p><p><a href="${link}">Set admin password</a></p><p>If you didn't ask for this, you can ignore this email.</p>`,
  });

  if (result.error) {
    lastSentAt = 0;
    return NextResponse.json({ error: 'Email could not be sent' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
