'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase not configured');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase not configured');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setError(null);
        router.push('/onboarding');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8"
      style={{ background: 'var(--surface)' }}
    >
      <div
        className="w-full max-w-md rounded-lg border p-8"
        data-theme="signature"
        style={{
          background: 'var(--panel)',
          borderColor: 'var(--line)',
        }}
      >
        {/* Logo & Heading */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-wide inline-block"
            style={{ color: 'var(--ink)' }}
          >
            CODE<span className="text-accent">9</span> FITNESS
          </Link>
          <p className="mt-3 text-sm" style={{ color: 'var(--ink-dim)' }}>
            Sign in to your account or create a new one
          </p>
        </div>

        <form className="space-y-4">
          {error && (
            <div
              className="rounded border p-3 text-sm"
              style={{
                borderColor: 'var(--accent)',
                backgroundColor:
                  'color-mix(in srgb, var(--accent) 10%, transparent)',
                color: 'var(--accent)',
              }}
            >
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold" style={{ color: 'var(--ink)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="c9-input mt-1"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold" style={{ color: 'var(--ink)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="c9-input mt-1"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="btn-primary w-full"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full"
                style={{
                  borderTopColor: 'var(--line)',
                  borderTopWidth: '1px',
                }}
              ></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span
                className="px-2"
                style={{
                  background: 'var(--panel)',
                  color: 'var(--ink-dim)',
                }}
              >
                or
              </span>
            </div>
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading || !email || !password}
            className="btn-secondary w-full"
          >
            {loading ? 'Creating account...' : 'Create new account'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs" style={{ color: 'var(--ink-dim)' }}>
          By continuing, you agree to our terms of service
        </p>
      </div>
    </div>
  );
}
