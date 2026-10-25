'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import { PageBranding } from '@/components/PageBranding';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();
  const redirectUrl = searchParams.get('redirect');
  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        auth_failed: 'Authentication failed. Please try again.',
        no_user: 'Could not retrieve user information. Please try again.',
        callback_error: 'An error occurred during sign-in. Please try again.',
      };
      setError(errorMessages[errorParam] || 'An error occurred. Please try again.');
    }
  }, [errorParam]);

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
        // Redirect to original location or dashboard
        if (redirectUrl) {
          try {
            const url = new URL(redirectUrl, window.location.origin);
            if (url.origin === window.location.origin) {
              router.push(redirectUrl);
            } else {
              router.push('/dashboard');
            }
          } catch {
            router.push('/dashboard');
          }
        } else {
          router.push('/dashboard');
        }
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
      // Build the email redirect URL with redirect parameter if provided
      let emailRedirectTo = `${window.location.origin}/auth/callback`;
      if (redirectUrl) {
        try {
          const url = new URL(redirectUrl, window.location.origin);
          if (url.origin === window.location.origin) {
            emailRedirectTo += `?redirect=${encodeURIComponent(redirectUrl)}`;
          }
        } catch {
          // Keep default email redirect
        }
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setError(null);
        // Redirect to onboarding with redirect parameter if provided
        const onboardingUrl = redirectUrl
          ? `/onboarding?redirect=${encodeURIComponent(redirectUrl)}`
          : '/onboarding';
        router.push(onboardingUrl);
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
      <div className="mb-12">
        <PageBranding variant="dark" centered={true} />
      </div>

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
          <Link href="/" className="flex justify-center mb-4">
            <Image
              src="/code9-logo-cream-transparent.svg"
              alt="Code9 Fitness"
              width={56}
              height={56}
              style={{ height: '56px', width: 'auto' }}
            />
          </Link>
          <h2
            className="font-display text-xl font-bold tracking-wide inline-block"
            style={{ color: 'var(--ink)' }}
          >
            Code9 Fitness
          </h2>
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <LoginContent />
    </Suspense>
  );
}
