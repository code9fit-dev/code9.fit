'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { CheckInSidebar } from '@/components/CheckInSidebar';
import { CheckInDetail } from '@/components/CheckInDetail';
import { CheckInFlow } from '@/components/CheckInFlow';
import { DailyWorkoutCheckIn } from '@/components/DailyWorkoutCheckIn';
import { ClientCheckIn, ClientSessionLog } from '@/lib/check-ins/types';
import {
  getLatestCheckIn,
  getSessionLogs,
} from '@/lib/check-ins/service';
import {
  shouldTriggerDailyCheckIn,
  getWeekStartDate,
} from '@/lib/coaching';

export default function CoachChatPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const clientId = params.clientId as string;

  const [user, setUser] = useState<any>(null);
  const [clientEmail, setClientEmail] = useState('');
  const [selectedCheckIn, setSelectedCheckIn] = useState<ClientCheckIn | null>(null);
  const [showCheckInFlow, setShowCheckInFlow] = useState(false);
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [latestCheckIn, setLatestCheckIn] = useState<ClientCheckIn | null>(null);
  const [recentSessions, setRecentSessions] = useState<ClientSessionLog[]>([]);
  const [lastCheckInTime, setLastCheckInTime] = useState<string | null>(null);

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

        // Load latest check-in and recent sessions for daily check-in context
        const latest = await getLatestCheckIn(supabase, user.id, clientId);
        setLatestCheckIn(latest);
        setLastCheckInTime(latest?.submitted_at || null);

        if (latest) {
          // Get recent sessions from this week
          const weekStart = getWeekStartDate(new Date(latest.week_of));
          const today = new Date().toISOString().split('T')[0];
          const sessions = await getSessionLogs(supabase, user.id, clientId, weekStart, today);
          setRecentSessions(sessions);

          // Check if we should trigger daily check-in (24+ hours since last)
          const shouldTrigger = shouldTriggerDailyCheckIn(latest.submitted_at);
          setShowDailyCheckIn(shouldTrigger);
        } else {
          // No check-in yet, show daily check-in on first visit
          setShowDailyCheckIn(true);
        }
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
        <div className="text-stone-600">Loading chat...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">{clientEmail}</h1>
            <p className="text-sm text-stone-600">Coach Chat</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/coach/check-ins"
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-300 px-3 py-1.5 rounded hover:bg-stone-50"
            >
              All Check-Ins
            </Link>
            <Link href="/coach" className="rounded bg-stone-200 px-4 py-2 text-sm font-semibold hover:bg-stone-300">
              Back to Coach
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with check-ins */}
        <div className="w-64 border-r border-stone-200 bg-white overflow-hidden flex flex-col">
          <CheckInSidebar coachId={user.id} clientId={clientId} onSelectCheckIn={setSelectedCheckIn} />
        </div>

        {/* Chat and content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages area - placeholder for actual chat */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Daily Workout Check-In - appears at top if triggered */}
            {showDailyCheckIn && (
              <div className="max-w-2xl">
                <DailyWorkoutCheckIn
                  coachId={user.id}
                  clientId={clientId}
                  todayWorkoutType="today's workout"
                  latestCheckIn={latestCheckIn}
                  recentSessions={recentSessions}
                  onResponse={(status, details) => {
                    console.log('Daily check-in response:', { status, details });
                    // Could auto-open check-in flow here if needed
                    setShowDailyCheckIn(false);
                  }}
                  onClose={() => {
                    setShowDailyCheckIn(false);
                  }}
                />
              </div>
            )}

            {selectedCheckIn ? (
              <div className="max-w-2xl">
                <CheckInDetail checkIn={selectedCheckIn} />
              </div>
            ) : showCheckInFlow ? (
              <div className="max-w-2xl">
                <CheckInFlow
                  coachId={user.id}
                  clientId={clientId}
                  coachSlug="coach" // Would need actual coach slug in real implementation
                  onComplete={() => {
                    setShowCheckInFlow(false);
                    setShowDailyCheckIn(false);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-stone-600 mb-6">Select a check-in from the sidebar or start a new one</p>
                <button
                  onClick={() => setShowCheckInFlow(true)}
                  className="rounded bg-accent px-6 py-3 font-semibold text-white hover:opacity-90"
                >
                  Start Check-In
                </button>
              </div>
            )}
          </div>

          {/* Footer with action buttons */}
          {!selectedCheckIn && !showCheckInFlow && (
            <div className="border-t border-stone-200 bg-white px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCheckInFlow(true)}
                  className="rounded bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  + New Check-In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
