'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { getCheckInHistory, getSessionLogs } from '@/lib/check-ins/service';
import { ClientCheckIn, ClientSessionLog } from '@/lib/check-ins/types';

export default function ClientCheckInHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const clientId = params.clientId as string;

  const [user, setUser] = useState<any>(null);
  const [clientEmail, setClientEmail] = useState<string>('');
  const [checkIns, setCheckIns] = useState<ClientCheckIn[]>([]);
  const [sessionLogs, setSessionLogs] = useState<ClientSessionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<ClientCheckIn | null>(null);

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
        // Get client email
        const { data: profile } = await supabase.from('profiles').select('email').eq('id', clientId).single();
        if (profile) setClientEmail(profile.email);

        // Get check-in history (last 12 weeks)
        const checkInData = await getCheckInHistory(supabase, user.id, clientId, 12);
        setCheckIns(checkInData);
        if (checkInData.length > 0) setSelectedWeek(checkInData[0]);

        // Get session logs for past 90 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90);
        const logsData = await getSessionLogs(
          supabase,
          user.id,
          clientId,
          thirtyDaysAgo.toISOString().split('T')[0],
          new Date().toISOString().split('T')[0]
        );
        setSessionLogs(logsData);
      } catch (error) {
        console.error('Failed to load client data:', error);
      } finally {
        setLoading(false);
      }
    });
  }, [supabase, router, clientId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-stone-600">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">{clientEmail}</h1>
            <p className="text-sm text-stone-600">Check-in history & session logs</p>
          </div>
          <Link href="/coach/check-ins" className="rounded bg-stone-200 px-4 py-2 text-sm font-semibold hover:bg-stone-300">
            Back to Clients
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        {/* Check-in history */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900">Check-In History (Last 12 Weeks)</h2>

          {checkIns.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <p className="text-sm text-stone-600">No check-ins yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Timeline */}
              <div className="lg:col-span-1 space-y-2">
                {checkIns.map((checkIn) => (
                  <button
                    key={checkIn.id}
                    onClick={() => setSelectedWeek(checkIn)}
                    className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${
                      selectedWeek?.id === checkIn.id
                        ? 'border-accent bg-accent/10'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <p className="font-semibold text-stone-900">Week of {new Date(checkIn.week_of).toLocaleDateString()}</p>
                    <p className="text-xs text-stone-600">{checkIn.sessions_completed} sessions</p>
                  </button>
                ))}
              </div>

              {/* Detail view */}
              <div className="lg:col-span-2">
                {selectedWeek && (
                  <div className="rounded-lg border border-stone-200 bg-white p-6 space-y-4">
                    <h3 className="font-semibold text-stone-900">
                      Week of {new Date(selectedWeek.week_of).toLocaleDateString()}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-stone-600 uppercase">Sessions</p>
                        <p className="text-2xl font-bold text-stone-900">{selectedWeek.sessions_completed}</p>
                        {selectedWeek.missed_reason && (
                          <p className="text-xs text-stone-600 mt-1">Reason: {selectedWeek.missed_reason}</p>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-stone-600 uppercase">Mood</p>
                        <p className="text-lg font-semibold text-stone-900">{selectedWeek.mood || '—'}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-stone-600 uppercase">Sleep</p>
                        <p className="text-lg font-semibold text-stone-900">
                          {selectedWeek.sleep_hours ? `${selectedWeek.sleep_hours} hrs/night` : '—'}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-stone-600 uppercase">Status</p>
                        <p className="text-sm font-semibold text-green-700">
                          {selectedWeek.sessions_completed >= 3 ? '✓ On track' : '⚠ Below target'}
                        </p>
                      </div>
                    </div>

                    {selectedWeek.physical_issues && (
                      <div className="rounded bg-amber-50 border border-amber-200 p-3">
                        <p className="text-xs font-semibold text-amber-700 uppercase">Physical Issues</p>
                        <p className="text-sm text-amber-900 mt-1">{selectedWeek.physical_issues}</p>
                      </div>
                    )}

                    {selectedWeek.next_week_plan.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-stone-600 uppercase">Next Week's Plan</p>
                        <div className="mt-2 space-y-1 text-sm">
                          {selectedWeek.next_week_plan.map((session, idx) => (
                            <p key={idx} className="text-stone-900">
                              {session.day} — <strong>{session.type}</strong>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedWeek.notes && (
                      <div>
                        <p className="text-xs font-semibold text-stone-600 uppercase">Notes</p>
                        <p className="text-sm text-stone-900 mt-1">{selectedWeek.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Session logs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900">Recent Session Logs (Last 90 Days)</h2>

          {sessionLogs.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <p className="text-sm text-stone-600">No session logs yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessionLogs.map((log) => (
                <div key={log.id} className="rounded-lg border border-stone-200 bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-stone-900">{log.session_type}</p>
                      <p className="text-xs text-stone-600">
                        {new Date(log.session_date).toLocaleDateString()} — Effort: {log.overall_effort || '—'}/10
                      </p>
                      {log.win_of_day && (
                        <p className="text-xs text-green-700 mt-1">
                          <strong>Win:</strong> {log.win_of_day}
                        </p>
                      )}
                      {log.exercises.length > 0 && (
                        <p className="text-xs text-stone-600 mt-1">{log.exercises.length} exercises logged</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
