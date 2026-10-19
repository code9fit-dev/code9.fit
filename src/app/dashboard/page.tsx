'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { useStore } from '@/lib/store/store';
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
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
            <p className="text-sm text-stone-600">Welcome, {user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/profile"
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-300 px-3 py-1.5 rounded hover:bg-stone-50"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8 space-y-8">
        {/* Daily Motivation */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Daily Motivation
          </h2>
          <h3 className="mt-2 text-xl font-bold text-blue-900">{dailyMotivation.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-blue-800">{dailyMotivation.message}</p>
          <p className="mt-3 text-xs text-blue-700">— {dailyMotivation.source}</p>
        </div>

        {!plan ? (
          /* No Plan Yet */
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
            <h2 className="font-semibold text-amber-900">No Training Plan Yet</h2>
            <p className="mt-2 text-sm text-amber-800">
              Connect with a coach to get a personalized training plan and start your journey.
            </p>
            <Link
              href="/coach/lifestyle-recovery-coach"
              className="mt-4 inline-block rounded bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Browse Coaches
            </Link>
          </div>
        ) : (
          <>
            {/* Coach & Plan Info */}
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-600">
                    Active Plan
                  </h2>
                  <h3 className="mt-1 text-xl font-bold text-stone-900">{plan.title}</h3>
                  <p className="mt-1 text-sm text-stone-600">
                    Coached by <span className="font-semibold">{coach?.name}</span>
                  </p>
                  <p className="mt-2 text-xs text-stone-500">
                    Week {plan.currentWeek} of {plan.weeks}
                  </p>
                </div>
                <Link
                  href={`/coach/${plan.coachSlug}`}
                  className="rounded bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  View Plan
                </Link>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-600">
                This Week's Progress
              </h2>
              <div className="mt-4 flex items-end gap-4">
                <div>
                  <div className="text-4xl font-bold text-stone-900">{weekly?.pct ?? 0}%</div>
                  <p className="mt-1 text-sm text-stone-600">
                    {weekly?.done ?? 0} of {weekly?.total ?? 0} workouts complete
                  </p>
                </div>
                <div className="flex-1">
                  <div className="h-2 w-full rounded-full bg-stone-200">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{ width: `${weekly?.pct ?? 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Workout */}
            {today ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-green-700">
                  Today's Workout
                </h2>
                <h3 className="mt-2 text-2xl font-bold text-green-900">{today.title}</h3>
                <p className="mt-1 text-green-800">{today.focus}</p>

                {today.exercises.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {today.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex items-center gap-3 rounded bg-white p-3"
                      >
                        <input
                          type="checkbox"
                          checked={exercise.done}
                          disabled
                          className="h-4 w-4"
                        />
                        <div>
                          <p className="font-semibold text-stone-900">{exercise.name}</p>
                          <p className="text-xs text-stone-600">{exercise.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-xs text-green-700">
                  {workoutPct(today)}% complete — Go to the coach to update your progress
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <p className="text-sm text-stone-600">No scheduled workout for today.</p>
              </div>
            )}

            {/* Weekly Schedule */}
            {currentWeekData && (
              <div className="rounded-lg border border-stone-200 bg-white p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-600">
                  This Week's Schedule
                </h2>
                <div className="mt-4 space-y-3">
                  {currentWeekData.workouts.map((workout) => (
                    <div
                      key={workout.id}
                      className={`flex items-start justify-between rounded border p-3 ${
                        workoutComplete(workout)
                          ? 'border-green-200 bg-green-50'
                          : 'border-stone-200 bg-stone-50'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-stone-900">
                          {workout.day} — {workout.title}
                        </p>
                        <p className="text-xs text-stone-600">{workout.focus}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-stone-900">
                          {workoutPct(workout)}%
                        </div>
                        <div className="text-xs text-stone-600">
                          {workout.exercises.filter((e) => e.done).length}/{workout.exercises.length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights */}
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-600">
                Your Insights
              </h2>
              <p className="mt-2 text-sm text-stone-600">
                Curated wisdom from fitness and wellness books to support your journey.
              </p>
              <Link
                href="/insights"
                className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
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
