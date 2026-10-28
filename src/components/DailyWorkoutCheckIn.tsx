'use client';

import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import {
  detectWorkoutCompletion,
  generateWorkoutCheckIn,
  generateFollowUp,
  formatMissedWorkoutOptions,
  generateReschedulePrompt,
  buildCheckInContext,
} from '@/lib/coaching';
import { ClientCheckIn, ClientSessionLog } from '@/lib/check-ins/types';

interface DailyWorkoutCheckInProps {
  coachId: string;
  clientId: string;
  clientName?: string;
  todayWorkoutType?: string;
  latestCheckIn?: ClientCheckIn | null;
  recentSessions?: ClientSessionLog[];
  onResponse?: (status: 'completed' | 'not_yet' | 'skipped' | 'missed', details?: string) => void;
  onClose?: () => void;
}

type Step = 'initial' | 'awaiting_response' | 'missed_reason' | 'reschedule' | 'complete';

/**
 * Daily Workout Check-In Component
 * Simpler than the full CheckInFlow, focused on daily completion tracking
 * Collects: completion status, missed reason (if applicable), reschedule date
 */
export function DailyWorkoutCheckIn({
  coachId,
  clientId,
  clientName,
  todayWorkoutType = "today's workout",
  latestCheckIn,
  recentSessions = [],
  onResponse,
  onClose,
}: DailyWorkoutCheckInProps) {
  const [step, setStep] = useState<Step>('initial');
  const [userMessage, setUserMessage] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();

  // Build context for the check-in
  const context = buildCheckInContext(latestCheckIn || null, recentSessions, todayWorkoutType);
  const initialPrompt = generateWorkoutCheckIn(context);

  const handleInitialResponse = () => {
    if (!userMessage.trim()) return;

    const detection = detectWorkoutCompletion(userMessage);
    const followUp = generateFollowUp(detection.status as any, context);

    // Update step based on response
    if (detection.status === 'missed' || detection.status === 'skipped') {
      setStep('missed_reason');
    } else if (detection.status === 'not_yet') {
      setStep('reschedule');
    } else {
      setStep('complete');
      onResponse?.(detection.status as any, userMessage);
      // Auto close after a few seconds
      setTimeout(() => onClose?.(), 2000);
    }

    setUserMessage('');
  };

  const handleMissedReason = (reason: string) => {
    setSelectedReason(reason);
    setStep('reschedule');
  };

  const handleRescheduleSubmit = async () => {
    if (!rescheduleDate) return;

    setLoading(true);
    setError(null);

    try {
      const detection = detectWorkoutCompletion(userMessage);
      const missedData = {
        status: detection.status as any,
        reason: selectedReason,
        rescheduledFor: rescheduleDate,
        originalMessage: userMessage,
      };

      onResponse?.(detection.status as any, JSON.stringify(missedData));
      setStep('complete');

      // Auto close after a few seconds
      setTimeout(() => onClose?.(), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record missed workout');
    } finally {
      setLoading(false);
    }
  };

  const missedOptions = formatMissedWorkoutOptions();
  const reasonPrompt = selectedReason
    ? generateReschedulePrompt(selectedReason)
    : 'Why couldn\'t you complete it?';

  return (
    <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
      {step === 'initial' && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-stone-900">{initialPrompt}</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleInitialResponse()}
              placeholder="Your response..."
              className="c9-input flex-1 text-sm"
              autoFocus
            />
            <button
              onClick={handleInitialResponse}
              disabled={!userMessage.trim()}
              className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {step === 'missed_reason' && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-stone-900">{reasonPrompt}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {missedOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleMissedReason(option.value)}
                className="rounded border border-blue-300 bg-white px-3 py-2 text-xs font-medium text-stone-700 hover:bg-blue-100 min-h-[44px] flex items-center justify-center"
                title={option.description}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'reschedule' && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-stone-900">When will you do it?</p>
          <div className="flex gap-2">
            <input
              type="date"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
              className="c9-input flex-1 text-sm"
              min={new Date().toISOString().split('T')[0]}
            />
            <button
              onClick={handleRescheduleSubmit}
              disabled={!rescheduleDate || loading}
              className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      )}

      {step === 'complete' && (
        <div className="rounded bg-green-50 p-3">
          <p className="text-sm font-medium text-green-900">✓ Check-in saved!</p>
        </div>
      )}

      {step === 'awaiting_response' && (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
          <p className="text-sm text-stone-600">Processing...</p>
        </div>
      )}
    </div>
  );
}
