// Admin login + session cookie. Server-only.
// Env: C9_ADMIN_EMAIL, C9_ADMIN_PASSWORD_HASH (scrypt$salt$hash), C9_SESSION_SECRET (32+ chars).
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE = 'c9_admin';
export const SESSION_HOURS = 12;

const admins = () =>
  (process.env.C9_ADMIN_EMAIL || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);

function secret(): string {
  const s = process.env.C9_SESSION_SECRET || '';
  if (s.length < 32) throw new Error('C9_SESSION_SECRET is missing or shorter than 32 characters');
  return s;
}

const b64 = (b: Buffer | string) => Buffer.from(b).toString('base64url');
const sign = (data: string) => createHmac('sha256', secret()).update(data).digest('base64url');

function same(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function adminEmail(): string | null {
  return admins()[0] ?? null;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString('base64url')}$${scryptSync(password, salt, 64).toString('base64url')}`;
}

const passwordFingerprint = () =>
  createHash('sha256').update(process.env.C9_ADMIN_PASSWORD_HASH || '').digest('base64url').slice(0, 16);

export function makeSetupToken(): string {
  const body = b64(JSON.stringify({ p: 'setup', h: passwordFingerprint(), exp: Date.now() + 30 * 60e3 }));
  return `${body}.${sign(body)}`;
}

/** Valid for 30 minutes and only until the stored password hash changes. */
export function verifySetupToken(token: string): boolean {
  const [body, sig] = token.split('.');
  if (!body || !sig) return false;
  try {
    if (!same(sig, sign(body))) return false;
    const p = JSON.parse(Buffer.from(body, 'base64url').toString());
    return p.p === 'setup' && p.exp > Date.now() && p.h === passwordFingerprint();
  } catch {
    return false;
  }
}

export function checkAdmin(email: string, password: string): boolean {
  const okEmail = admins().includes(String(email || '').trim().toLowerCase());
  const stored = process.env.C9_ADMIN_PASSWORD_HASH || '';
  if (!okEmail || !stored) return false;
  const [algo, salt, hash] = stored.split('$');
  if (algo === 'scrypt' && salt && hash) {
    const got = scryptSync(String(password || ''), Buffer.from(salt, 'base64url'), 64).toString('base64url');
    return same(got, hash);
  }
  return same(String(password || ''), stored);
}

export function makeSession(email: string): string {
  const body = b64(JSON.stringify({ e: email.trim().toLowerCase(), exp: Date.now() + SESSION_HOURS * 3600e3 }));
  return `${body}.${sign(body)}`;
}

function readSession(value: string | undefined): string | null {
  if (!value || !value.includes('.')) return null;
  const [body, sig] = value.split('.');
  try {
    if (!same(sig, sign(body))) return null;
    const p = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!p.exp || p.exp < Date.now() || !admins().includes(p.e)) return null;
    return p.e;
  } catch {
    return null;
  }
}

export function adminFrom(req: NextRequest): string | null {
  return readSession(req.cookies.get(ADMIN_COOKIE)?.value);
}

export function adminFromCookieValue(value: string | undefined): string | null {
  return readSession(value);
}

const tries = new Map<string, { n: number; until: number }>();
export function tooMany(ip: string): boolean {
  const t = tries.get(ip);
  return !!t && t.n >= 5 && t.until > Date.now();
}
export function failed(ip: string) {
  const t = tries.get(ip);
  if (!t || t.until < Date.now()) tries.set(ip, { n: 1, until: Date.now() + 15 * 60e3 });
  else t.n++;
}
export function cleared(ip: string) {
  tries.delete(ip);
}
