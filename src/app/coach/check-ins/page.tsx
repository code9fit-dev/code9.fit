'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { getCoachCheckInDashboard } from '@/lib/check-ins/service';
import { ClientCheckInSummary } from '@/lib/check-ins/types';

export default function CoachCheckInsPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<any>(null);
  const [summaries, setSummaries] = useState<ClientCheckInSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push('/login');
        return;
      }

      setUser(user);

      try {
        const data = await getCoachCheckInDashboard(supabase, user.id);
        setSummaries(data);
      } catch (error) {
        console.error('Failed to load check-ins:', error);
      } finally {
        setLoading(false);
      }
    });
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-stone-600">Loading check-ins...</div>
      </div>
    );
  }

  if (!user) return null;

  const clientsNeedingCheckIn = summaries.filter((s) => s.is_overdue);
  const clientsUpToDate = summaries.filter((s) => !s.is_overdue && s.latest_check_in);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Client Check-Ins</h1>
            <p className="text-sm text-stone-600">Track client progress and trends</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/check-in-templates"
              className="rounded bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Templates (Free)
            </a>
            <Link href="/coach" className="rounded bg-stone-200 px-4 py-2 text-sm font-semibold hover:bg-stone-300">
              Back to Coach
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        {/* Alerts: Clients needing check-in */}
        {clientsNeedingCheckIn.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              ⚠ Needs Check-In ({clientsNeedingCheckIn.length})
            </h2>
            <p className="mt-2 text-sm text-amber-800">
              These clients haven't checked in for more than 7 days. Reach out to them.
            </p>
            <div className="mt-4 space-y-2">
              {clientsNeedingCheckIn.map((summary) => (
                <div key={summary.client_id} className="flex items-center justify-between rounded bg-white p-3">
                  <div>
                    <p className="font-semibold text-stone-900">{summary.client_email}</p>
                    <p className="text-xs text-stone-600">
                      Last check-in: {summary.days_since_check_in} days ago
                      {summary.latest_check_in && (
                        <>
                          {' '}
                          ({new Date(summary.latest_check_in.week_of).toLocaleDateString()})
                        </>
                      )}
                    </p>
                  </div>
                  <Link
                    href={`/coach/check-ins/${summary.client_id}`}
                    className="rounded bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All clients with check-in status */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900">All Clients ({summaries.length})</h2>

          {summaries.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <p className="text-sm text-stone-600">No clients linked yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {summaries
                .sort((a, b) => (b.latest_check_in?.submitted_at || '').localeCompare(a.latest_check_in?.submitted_at || ''))
                .map((summary) => (
                  <Link key={summary.client_id} href={`/coach/check-ins/${summary.client_id}`}>
                    <div className="rounded-lg border border-stone-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="grid grid-cols-12 gap-4">
                        {/* Client info */}
                        <div className="col-span-3">
                          <p className="font-semibold text-stone-900">{summary.client_email}</p>
                          <p className="text-xs text-stone-600 mt-1">
                            {summary.latest_check_in ? `Checked in ${summary.days_since_check_in}d ago` : 'No check-in yet'}
                          </p>
                        </div>

                        {/* Latest check-in status */}
                        <div className="col-span-3">
                          {summary.latest_check_in ? (
                            <div className="space-y-1">
                              <p className="text-sm">
                                <strong>{summary.latest_check_in.sessions_completed}</strong> sessions
                              </p>
                              <p className="text-xs text-stone-600">
                                {summary.latest_check_in.mood ? `Mood: ${summary.latest_check_in.mood}` : 'No mood logged'}
                              </p>
                              {summary.latest_check_in.sleep_hours && (
                                <p className="text-xs text-stone-600">Sleep: {summary.latest_check_in.sleep_hours} hrs</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-stone-500 italic">No data yet</p>
                          )}
                        </div>

                        {/* 6-week trends */}
                        <div className="col-span-3">
                          <div className="space-y-1">
                            <p className="text-sm">
                              <strong>{summary.trend.avg_sessions.toFixed(1)}</strong> sessions/week (avg)
                            </p>
                            {summary.trend.avg_sleep > 0 && (
                              <p className="text-xs text-stone-600">{summary.trend.avg_sleep.toFixed(1)} hrs sleep (avg)</p>
                            )}
                            {summary.trend.most_common_miss_reason && (
                              <p className="text-xs text-stone-600">Often: {summary.trend.most_common_miss_reason}</p>
                            )}
                          </div>
                        </div>

                        {/* Status indicator */}
                        <div className="col-span-3 flex items-center justify-end">
                          {summary.is_overdue ? (
                            <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                              Overdue
                            </div>
                          ) : summary.latest_check_in ? (
                            <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              On Track
                            </div>
                          ) : (
                            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                              Pending
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
