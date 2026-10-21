'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { getCheckInHistory, getSessionLogs } from '@/lib/check-ins/service';
import { ClientCheckIn, ClientSessionLog } from '@/lib/check-ins/types';
import { CheckInDetail } from '@/components/CheckInDetail';

type TabType = 'activity' | 'plan' | 'check-ins';

export default function ProfilePage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('activity');
  const [loading, setLoading] = useState(true);
  const [checkIns, setCheckIns] = useState<ClientCheckIn[]>([]);
  const [sessionLogs, setSessionLogs] = useState<ClientSessionLog[]>([]);
  const [selectedCheckIn, setSelectedCheckIn] = useState<ClientCheckIn | null>(null);

  useEffect(() => {
    const adminSession = typeof window !== 'undefined' ? localStorage.getItem('admin_session') : null;

    // Check for admin session first
    if (adminSession) {
      setUser({ id: 'admin', email: 'admin@localhost' });
      setLoading(false);
      return;
    }

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

      // For now, assume user is viewing their own profile
      // In a real app, this would be fetched from a coach relationship
      const userId = user.id;

      try {
        // Get check-in history (last 12 weeks)
        const checkInData = await getCheckInHistory(supabase, userId, userId, 12);
        setCheckIns(checkInData);

        // Get session logs (last 90 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90);
        const logsData = await getSessionLogs(
          supabase,
          userId,
          userId,
          thirtyDaysAgo.toISOString().split('T')[0],
          new Date().toISOString().split('T')[0]
        );
        setSessionLogs(logsData);
      } catch (error) {
        console.error('Failed to load profile data:', error);
      } finally {
        setLoading(false);
      }
    });
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-stone-600">Loading profile...</div>
      </div>
    );
  }

  if (!user) return null;

  const tabs: Array<{ id: TabType; label: string; count?: number }> = [
    { id: 'activity', label: 'Activity' },
    { id: 'plan', label: 'Plan' },
    { id: 'check-ins', label: 'Check-Ins', count: checkIns.length },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Your Profile</h1>
            <p className="text-sm text-stone-600">{user.email}</p>
          </div>
          <Link href="/dashboard" className="rounded bg-stone-200 px-4 py-2 text-sm font-semibold hover:bg-stone-300">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Tabs */}
        <div className="border-b border-stone-200 mb-8">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-accent text-stone-900'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && <span className="ml-2 text-xs bg-stone-200 rounded-full px-2 py-0.5">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-stone-200">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Profile created</p>
                    <p className="text-xs text-stone-600">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                {checkIns.length > 0 && (
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Latest check-in</p>
                      <p className="text-xs text-stone-600">
                        {new Date(checkIns[0].submitted_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">Training Plan</h2>
              <p className="text-sm text-stone-600">Your training plan details will appear here.</p>
            </div>
          </div>
        )}

        {activeTab === 'check-ins' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-stone-200 bg-white overflow-hidden">
                <div className="bg-stone-50 px-4 py-3 border-b border-stone-200">
                  <p className="text-sm font-semibold text-stone-900">Check-In History</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {checkIns.length === 0 ? (
                    <div className="p-4 text-xs text-stone-600">No check-ins yet</div>
                  ) : (
                    <div className="divide-y divide-stone-200">
                      {checkIns.map((checkIn) => (
                        <button
                          key={checkIn.id}
                          onClick={() => setSelectedCheckIn(checkIn)}
                          className={`w-full text-left px-4 py-3 text-xs transition-colors ${
                            selectedCheckIn?.id === checkIn.id
                              ? 'bg-accent/10 border-l-2 border-accent'
                              : 'hover:bg-stone-50'
                          }`}
                        >
                          <p className="font-semibold text-stone-900">
                            {new Date(checkIn.week_of).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-stone-600 mt-1">{checkIn.sessions_completed} sessions</p>
                          {checkIn.mood && <p className="text-stone-600">Mood: {checkIn.mood}</p>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detail view */}
            <div className="lg:col-span-2">
              {selectedCheckIn ? (
                <CheckInDetail checkIn={selectedCheckIn} />
              ) : (
                <div className="rounded-lg border border-stone-200 bg-white p-6 text-center">
                  <p className="text-sm text-stone-600">Select a check-in to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
