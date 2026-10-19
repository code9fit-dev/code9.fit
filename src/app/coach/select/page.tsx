'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { assignCoachToUser } from '@/lib/auth/tier';
import { coaches, coachSlug } from '@/data/coaches';

function CoachSelectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();
  const isOnboarding = searchParams.get('onboarding') === 'true';
  const redirectUrl = searchParams.get('redirect');

  const [user, setUser] = useState<string | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      router.push('/login');
      return;
    }

    const checkAuth = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (!currentUser) {
          router.push('/login');
          return;
        }

        setUser(currentUser.id);
      } catch (err) {
        console.error('Failed to check auth:', err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [supabase, router]);

  const handleSelectCoach = async (coach: typeof coaches[0]) => {
    if (!user || !supabase) return;

    setAssigning(true);
    setError(null);

    try {
      const slug = coachSlug(coach);
      const success = await assignCoachToUser(supabase, user, slug);

      if (!success) {
        setError('Failed to assign coach. Please try again.');
        setAssigning(false);
        return;
      }

      // Coach successfully assigned
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
      } else if (isOnboarding) {
        router.push('/onboarding?coach_selected=true');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Error assigning coach:', err);
      setError('An error occurred. Please try again.');
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
          <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
            Choose Your First Coach
          </h1>
          <p className="text-lg" style={{ color: 'var(--ink-dim)' }}>
            {isOnboarding
              ? 'Select a coach to get started with your personalized fitness journey.'
              : 'Add a new coach to your program.'}
          </p>
        </div>

        {error && (
          <div
            className="rounded border p-4 mb-8 mx-auto max-w-md"
            style={{
              borderColor: 'var(--accent)',
              backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              color: 'var(--accent)',
            }}
          >
            {error}
          </div>
        )}

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="rounded-lg border p-6 cursor-pointer transition-all hover:shadow-lg"
              data-theme="signature"
              style={{
                background: 'var(--panel)',
                borderColor: selectedCoach === coachSlug(coach) ? 'var(--accent)' : 'var(--line)',
                borderWidth: selectedCoach === coachSlug(coach) ? '2px' : '1px',
              }}
              onClick={() => !assigning && setSelectedCoach(coachSlug(coach))}
            >
              {/* Coach Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>
                    {coach.name}
                  </h3>
                  <span
                    className="text-xs font-bold rounded px-2 py-1"
                    style={{
                      background: 'color-mix(in srgb, var(--accent) 20%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    {coach.index}
                  </span>
                </div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--accent)' }}
                >
                  {coach.category}
                </p>
              </div>

              {/* Coach Description */}
              <p className="text-sm mb-4" style={{ color: 'var(--ink-dim)' }}>
                {coach.desc}
              </p>

              {/* Available Tiers */}
              <div className="mb-6">
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                  Available Tiers:
                </p>
                <div className="flex flex-wrap gap-2">
                  {coach.tiers.map((tier) => (
                    <span
                      key={tier}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        background: 'color-mix(in srgb, var(--ink) 10%, transparent)',
                        color: 'var(--ink)',
                      }}
                    >
                      {tier}
                    </span>
                  ))}
                </div>
              </div>

              {/* Select Button */}
              <button
                onClick={() => handleSelectCoach(coach)}
                disabled={assigning}
                className={`w-full rounded py-2 px-4 font-semibold transition-all ${
                  selectedCoach === coachSlug(coach)
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {assigning && selectedCoach === coachSlug(coach) ? 'Assigning...' : 'Select'}
              </button>
            </div>
          ))}
        </div>

        {/* Skip for now link (only on onboarding) */}
        {isOnboarding && (
          <div className="text-center mt-12">
            <p className="text-sm mb-4" style={{ color: 'var(--ink-dim)' }}>
              Not sure yet?
            </p>
            <Link
              href="/dashboard"
              className="text-sm font-semibold hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              Skip for now and explore →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CoachSelectPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
            <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
              Loading coaches...
            </p>
          </div>
        </div>
      }
    >
      <CoachSelectContent />
    </Suspense>
  );
}
