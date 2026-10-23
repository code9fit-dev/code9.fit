'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { useStore } from '@/lib/store/store';
import { PageBranding } from '@/components/PageBranding';
import {
  currentWeek,
  todaysWorkout,
  weeklyProgress,
  workoutPct,
  workoutComplete,
} from '@/lib/plan/progress';
import { getCoachBySlug } from '@/data/coaches';

const DAILY_MOTIVATIONS = [
  {
    title: 'Build Your Identity',
    message:
      'Every workout you complete isn\'t just building strength—it\'s building the identity of someone who shows up. Small, consistent actions compound into transformation.',
    source: 'Atomic Habits',
  },
  {
    title: 'Recovery is Where it Happens',
    message:
      'Your body doesn\'t adapt during the workout. It adapts while you rest. Sleep tonight and move intentionally tomorrow. Adaptation is your superpower.',
    source: 'Outlive',
  },
  {
    title: 'One Percent Better',
    message:
      'You don\'t need a perfect program. A 1% improvement in form, consistency, or focus compounds over time. Small changes, sustained over weeks, create exponential results.',
    source: 'Atomic Habits',
  },
  {
    title: 'Movement is Medicine',
    message:
      'Exercise is the most powerful medicine available. It prevents disease, builds resilience, and protects your mind. Show up for yourself.',
    source: 'Outlive',
  },
  {
    title: 'The Struggle Builds Character',
    message:
      'Discomfort is where growth lives. Your workout today is shaping who you become. Embrace the challenge—it\'s the price of transformation.',
    source: 'Can\'t Hurt Me',
  },
  {
    title: 'Rest is Powerful',
    message:
      'Rest isn\'t laziness. It\'s a strategic advantage. Your recovery days are where your body rebuilds stronger. Honor them as much as your training days.',
    source: 'Rest Is Resistance',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const state = useStore();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dailyMotivation, setDailyMotivation] = useState(DAILY_MOTIVATIONS[0]);

  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const adminSession = typeof window !== 'undefined' ? localStorage.getItem('admin_session') : null;

    // Check for admin session first
    if (adminSession) {
      setUser({ id: 'admin', email: 'admin@localhost' });
      const dayOfWeek = new Date().getDay();
      setDailyMotivation(DAILY_MOTIVATIONS[dayOfWeek % DAILY_MOTIVATIONS.length]);
      setLoading(false);
      return;
    }

    if (!supabase) {
      if (isDev) {
        // Dev mode: mock user
        setUser({ id: 'dev-user', email: 'dev@example.com' });
        const dayOfWeek = new Date().getDay();
        setDailyMotivation(DAILY_MOTIVATIONS[dayOfWeek % DAILY_MOTIVATIONS.length]);
      }
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        if (isDev) {
          // Dev mode: mock user instead of redirecting
          setUser({ id: 'dev-user', email: 'dev@example.com' });
          const dayOfWeek = new Date().getDay();
          setDailyMotivation(DAILY_MOTIVATIONS[dayOfWeek % DAILY_MOTIVATIONS.length]);
        } else {
          router.push('/login');
        }
      } else {
        setUser(user);
        // Rotate daily motivation based on day of week
        const dayOfWeek = new Date().getDay();
        setDailyMotivation(DAILY_MOTIVATIONS[dayOfWeek % DAILY_MOTIVATIONS.length]);
      }
      setLoading(false);
    });
  }, [supabase, router]);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const plan = Object.keys(state.plans).length > 0 ? Object.values(state.plans)[0] : null;
  const coach = plan ? getCoachBySlug(plan.coachSlug) : null;
  const currentWeekData = plan ? currentWeek(plan) : null;
  const weekly = plan ? weeklyProgress(plan) : null;
  const today = plan ? todaysWorkout(plan) : null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }} data-theme="signature">
      {/* Header */}
      <header className="px-6 py-4" style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>Dashboard</h1>
            <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>Welcome, {user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/profile"
              className="text-xs font-semibold px-3 py-1.5 rounded transition-all"
              style={{
                color: 'var(--ink)',
                border: '1px solid var(--line)',
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = 'var(--on-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--ink)';
              }}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold transition-colors"
              style={{ color: 'var(--ink-dim)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--ink-dim)';
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Branding Section */}
      <section className="px-6 py-6" style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
        <div className="mx-auto max-w-4xl">
          <PageBranding variant="dark" centered={true} />
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-8 space-y-8">
        {/* Daily Motivation */}
        <div className="rounded-lg border p-6" style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, var(--panel))' }}>
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
            Daily Motivation
          </h2>
          <h3 className="mt-2 text-xl font-bold" style={{ color: 'var(--ink)' }}>{dailyMotivation.title}</h3>
          <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--ink-dim)' }}>{dailyMotivation.message}</p>
          <p className="mt-3 text-xs" style={{ color: 'var(--accent)' }}>— {dailyMotivation.source}</p>
        </div>

        {!plan ? (
          /* No Plan Yet */
          <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
            <h2 className="font-semibold" style={{ color: 'var(--ink)' }}>No Training Plan Yet</h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--ink-dim)' }}>
              Connect with a coach to get a personalized training plan and start your journey.
            </p>
            <Link
              href="/coach/lifestyle-recovery-coach"
              className="mt-4 inline-block rounded px-4 py-2 text-sm font-semibold hover:opacity-90"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              Browse Coaches
            </Link>
          </div>
        ) : (
          <>
            {/* Coach & Plan Info */}
            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-dim)' }}>
                    Active Plan
                  </h2>
                  <h3 className="mt-1 text-xl font-bold" style={{ color: 'var(--ink)' }}>{plan.title}</h3>
                  <p className="mt-1 text-sm" style={{ color: 'var(--ink-dim)' }}>
                    Coached by <span className="font-semibold">{coach?.name}</span>
                  </p>
                  <p className="mt-2 text-xs" style={{ color: 'var(--ink-dim)' }}>
                    Week {plan.currentWeek} of {plan.weeks}
                  </p>
                </div>
                <Link
                  href={`/coach/${plan.coachSlug}`}
                  className="rounded px-4 py-2 text-sm font-semibold hover:opacity-90"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                >
                  View Plan
                </Link>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-dim)' }}>
                This Week's Progress
              </h2>
              <div className="mt-4 flex items-end gap-4">
                <div>
                  <div className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>{weekly?.pct ?? 0}%</div>
                  <p className="mt-1 text-sm" style={{ color: 'var(--ink-dim)' }}>
                    {weekly?.done ?? 0} of {weekly?.total ?? 0} workouts complete
                  </p>
                </div>
                <div className="flex-1">
                  <div className="h-2 w-full rounded-full" style={{ background: 'var(--line)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${weekly?.pct ?? 0}%`, background: 'var(--accent)' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Workout */}
            {today ? (
              <div className="rounded-lg border p-6" style={{ borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, var(--panel))' }}>
                <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                  Today's Workout
                </h2>
                <h3 className="mt-2 text-2xl font-bold" style={{ color: 'var(--ink)' }}>{today.title}</h3>
                <p className="mt-1" style={{ color: 'var(--ink-dim)' }}>{today.focus}</p>

                {today.exercises.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {today.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex items-center gap-3 rounded p-3"
                        style={{ background: 'var(--surface)', borderColor: 'var(--line)', border: '1px solid' }}
                      >
                        <input
                          type="checkbox"
                          checked={exercise.done}
                          disabled
                          className="h-4 w-4"
                          style={{ accentColor: 'var(--accent)' }}
                        />
                        <div>
                          <p className="font-semibold" style={{ color: 'var(--ink)' }}>{exercise.name}</p>
                          <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>{exercise.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-xs" style={{ color: 'var(--accent)' }}>
                  {workoutPct(today)}% complete — Go to the coach to update your progress
                </p>
              </div>
            ) : (
              <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>No scheduled workout for today.</p>
              </div>
            )}

            {/* Weekly Schedule */}
            {currentWeekData && (
              <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-dim)' }}>
                  This Week's Schedule
                </h2>
                <div className="mt-4 space-y-3">
                  {currentWeekData.workouts.map((workout) => (
                    <div
                      key={workout.id}
                      className="flex items-start justify-between rounded border p-3"
                      style={{
                        borderColor: workoutComplete(workout) ? 'var(--accent)' : 'var(--line)',
                        background: workoutComplete(workout) ? 'color-mix(in srgb, var(--accent) 10%, var(--surface))' : 'var(--surface)'
                      }}
                    >
                      <div>
                        <p className="font-semibold" style={{ color: 'var(--ink)' }}>
                          {workout.day} — {workout.title}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>{workout.focus}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                          {workoutPct(workout)}%
                        </div>
                        <div className="text-xs" style={{ color: 'var(--ink-dim)' }}>
                          {workout.exercises.filter((e) => e.done).length}/{workout.exercises.length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights */}
            <div className="rounded-lg border p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-dim)' }}>
                Your Insights
              </h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--ink-dim)' }}>
                Curated wisdom from fitness and wellness books to support your journey.
              </p>
              <Link
                href="/insights"
                className="mt-4 inline-block text-sm font-semibold hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                View all insights →
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
