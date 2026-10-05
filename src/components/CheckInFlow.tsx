'use client';

import { useState } from 'react';
import { submitCheckIn, linkCoachClient } from '@/lib/check-ins/service';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { NextWeekSession } from '@/lib/check-ins/types';

interface CheckInFlowProps {
  coachId: string;
  clientId: string;
  coachSlug: string;
  onComplete?: () => void;
}

type CheckInStep = 'intro' | 'sessions' | 'missed-reason' | 'mood' | 'sleep' | 'physical' | 'next-week' | 'notes' | 'review' | 'complete';

export function CheckInFlow({ coachId, clientId, coachSlug, onComplete }: CheckInFlowProps) {
  const [step, setStep] = useState<CheckInStep>('intro');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();

  const [data, setData] = useState({
    week_of: new Date().toISOString().split('T')[0],
    sessions_completed: 0,
    missed_reason: '' as string | undefined,
    mood: '',
    sleep_hours: undefined as number | undefined,
    physical_issues: '' as string | undefined,
    next_week_plan: [] as NextWeekSession[],
    notes: '' as string | undefined,
  });

  const handleSessionCount = (count: number) => {
    setData({ ...data, sessions_completed: count });
    if (count === 3 || count === 4) {
      setStep('mood');
    } else {
      setStep('missed-reason');
    }
  };

  const handleMissedReason = (reason: string) => {
    setData({ ...data, missed_reason: reason });
    setStep('mood');
  };

  const handleMood = (mood: string) => {
    setData({ ...data, mood });
    setStep('sleep');
  };

  const handleSleep = (hours: number) => {
    setData({ ...data, sleep_hours: hours });
    setStep('physical');
  };

  const handlePhysicalIssues = (issues: string) => {
    setData({ ...data, physical_issues: issues || undefined });
    setStep('next-week');
  };

  const handleNextWeekSession = (index: number, field: 'day' | 'type', value: string) => {
    const updated = [...data.next_week_plan];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, next_week_plan: updated });
  };

  const addNextWeekSession = () => {
    setData({
      ...data,
      next_week_plan: [...data.next_week_plan, { day: '', type: '' }],
    });
  };

  const handleNotes = (notes: string) => {
    setData({ ...data, notes: notes || undefined });
    setStep('review');
  };

  const handleSubmit = async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);

    try {
      // Link coach-client if not already linked
      await linkCoachClient(supabase, coachId, clientId, coachSlug);

      // Submit check-in
      await submitCheckIn(supabase, coachId, clientId, coachSlug, data);

      setStep('complete');
      onComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit check-in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-stone-200 bg-white p-6">
      {step === 'intro' && (
        <div className="space-y-4">
          <p className="text-stone-900">Let's do your weekly check-in. This takes about a minute and helps me adjust your program.</p>
          <button
            onClick={() => setStep('sessions')}
            className="rounded bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Start Check-In
          </button>
        </div>
      )}

      {step === 'sessions' && (
        <div className="space-y-4">
          <p className="font-semibold text-stone-900">How many sessions did you complete this week?</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => handleSessionCount(count)}
                className="rounded border border-stone-300 px-4 py-2 text-sm font-semibold hover:bg-stone-100"
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'missed-reason' && (
        <div className="space-y-4">
          <p className="font-semibold text-stone-900">What got in the way?</p>
          <div className="space-y-2">
            {['No time', 'No energy', "Didn't know what to do", 'Fatigue or niggle', "Just didn't want to"].map((reason) => (
              <button
                key={reason}
                onClick={() => handleMissedReason(reason.toLowerCase())}
                className="block w-full rounded border border-stone-300 px-4 py-2 text-left text-sm hover:bg-stone-100"
              >
                {reason}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'mood' && (
        <div className="space-y-4">
          <label className="block">
            <p className="font-semibold text-stone-900">How's your mood this week? (one word)</p>
            <input
              type="text"
              value={data.mood}
              onChange={(e) => {
                const mood = e.target.value;
                setData({ ...data, mood });
                if (mood.trim().length > 0) {
                  handleMood(mood);
                }
              }}
              placeholder="e.g. energized, tired, resilient"
              className="c9-input mt-2"
            />
          </label>
        </div>
      )}

      {step === 'sleep' && (
        <div className="space-y-4">
          <label className="block">
            <p className="font-semibold text-stone-900">Average sleep per night this week? (hours)</p>
            <input
              type="number"
              step="0.5"
              min="0"
              max="12"
              value={data.sleep_hours || ''}
              onChange={(e) => {
                const hours = e.target.value ? parseFloat(e.target.value) : undefined;
                setData({ ...data, sleep_hours: hours });
                if (hours) handleSleep(hours);
              }}
              placeholder="e.g. 7"
              className="c9-input mt-2"
            />
          </label>
        </div>
      )}

      {step === 'physical' && (
        <div className="space-y-4">
          <p className="font-semibold text-stone-900">Anything feel off physically? (pain, unusual soreness, dizziness)</p>
          <textarea
            value={data.physical_issues || ''}
            onChange={(e) => {
              const issues = e.target.value;
              setData({ ...data, physical_issues: issues });
            }}
            placeholder="Leave blank if no issues. Otherwise, describe what you felt."
            className="c9-input mt-2"
            rows={3}
          />
          <button
            onClick={() => handlePhysicalIssues(data.physical_issues || '')}
            className="rounded bg-stone-200 px-4 py-2 text-sm font-semibold hover:bg-stone-300"
          >
            Next
          </button>
        </div>
      )}

      {step === 'next-week' && (
        <div className="space-y-4">
          <p className="font-semibold text-stone-900">What are your 3-4 sessions next week?</p>
          <div className="space-y-3">
            {data.next_week_plan.map((session, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Mon"
                  value={session.day}
                  onChange={(e) => handleNextWeekSession(idx, 'day', e.target.value)}
                  className="c9-input flex-1"
                />
                <input
                  type="text"
                  placeholder="Strength"
                  value={session.type}
                  onChange={(e) => handleNextWeekSession(idx, 'type', e.target.value)}
                  className="c9-input flex-1"
                />
              </div>
            ))}
            {data.next_week_plan.length < 4 && (
              <button onClick={addNextWeekSession} className="text-sm text-accent font-semibold hover:underline">
                + Add session
              </button>
            )}
            {data.next_week_plan.length >= 3 && (
              <button
                onClick={() => setStep('notes')}
                className="rounded bg-stone-200 px-4 py-2 text-sm font-semibold hover:bg-stone-300"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {step === 'notes' && (
        <div className="space-y-4">
          <label className="block">
            <p className="font-semibold text-stone-900">Anything else worth noting? (life context, stress, travel, etc)</p>
            <textarea
              value={data.notes || ''}
              onChange={(e) => {
                const notes = e.target.value;
                setData({ ...data, notes });
              }}
              placeholder="Leave blank if nothing to add. Otherwise, give me context."
              className="c9-input mt-2"
              rows={3}
            />
          </label>
          <button
            onClick={() => handleNotes(data.notes || '')}
            className="rounded bg-stone-200 px-4 py-2 text-sm font-semibold hover:bg-stone-300"
          >
            Review
          </button>
        </div>
      )}

      {step === 'review' && (
        <div className="space-y-6">
          <h3 className="font-semibold text-stone-900">Here's what I have:</h3>

          <div className="space-y-2 rounded bg-stone-50 p-4 text-sm">
            <p>
              <strong>Sessions:</strong> {data.sessions_completed} completed {data.missed_reason && `(${data.missed_reason})`}
            </p>
            {data.mood && (
              <p>
                <strong>Mood:</strong> {data.mood}
              </p>
            )}
            {data.sleep_hours && (
              <p>
                <strong>Sleep:</strong> {data.sleep_hours} hrs/night
              </p>
            )}
            {data.physical_issues && (
              <p>
                <strong>Physical:</strong> {data.physical_issues}
              </p>
            )}
            <p>
              <strong>Next week:</strong>{' '}
              {data.next_week_plan.map((s) => `${s.day} ${s.type}`).join(', ')}
            </p>
            {data.notes && (
              <p>
                <strong>Notes:</strong> {data.notes}
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded bg-accent px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Check-In'}
          </button>
        </div>
      )}

      {step === 'complete' && (
        <div className="space-y-4 rounded bg-green-50 p-4">
          <p className="font-semibold text-green-900">✓ Check-in saved!</p>
          <p className="text-sm text-green-800">I'll use this to adjust your program. Great work staying consistent.</p>
        </div>
      )}
    </div>
  );
}
