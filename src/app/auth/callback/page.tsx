'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { initializeUserTier, getUserCoaches } from '@/lib/auth/tier';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    if (!supabase) {
      router.push('/login');
      return;
    }

    const handleCallback = async () => {
      try {
        // Exchange the code for a session
        const code = searchParams.get('code');
        if (!code) {
          console.error('No auth code provided');
          router.push('/login');
          return;
        }

        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error('Failed to exchange code:', exchangeError);
          router.push('/login?error=auth_failed');
          return;
        }

        // Get the current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error('Failed to get user:', userError);
          router.push('/login?error=no_user');
          return;
        }

        // Check if this is their first time (no coaches assigned yet)
        const coaches = await getUserCoaches(supabase, user.id);

        if (coaches.length === 0) {
          // First time: initialize with Free tier and redirect to coach selection
          await initializeUserTier(supabase, user.id);
          router.push('/coach/select?onboarding=true');
        } else {
          // Returning user: check for redirect parameter, otherwise go to dashboard
          const redirect = searchParams.get('redirect');
          if (redirect) {
            try {
              // Only allow safe redirects (relative URLs)
              const url = new URL(redirect, window.location.origin);
              if (url.origin === window.location.origin) {
                router.push(redirect);
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
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/login?error=callback_error');
      }
    };

    handleCallback();
  }, [supabase, router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
        <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
          Completing sign-in...
        </p>
      </div>
    </div>
  );
}
