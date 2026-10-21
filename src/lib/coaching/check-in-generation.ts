/**
 * Daily Workout Check-In Generation
 * Generates AI prompts for checking in on workout completion
 * Includes context about program schedule and recent performance
 */

import { ClientCheckIn, ClientSessionLog } from '@/lib/check-ins/types';

export interface WorkoutCheckInContext {
  clientName?: string;
  todayWorkoutType?: string; // e.g., "Leg Day", "Upper Body", "Cardio"
  weekCompletionStats?: {
    completedThisWeek: number;
    totalScheduledThisWeek: number;
    energyAverageThisWeek?: number; // 1-10
  };
  consecutiveDaysCompleted?: number;
  lastWorkoutDate?: string;
  lastWorkoutType?: string;
}

/**
 * Generate the initial daily check-in prompt for AI to ask user
 * This is what the coach AI will say at the start of each day
 */
export function generateWorkoutCheckIn(context: WorkoutCheckInContext): string {
  const name = context.clientName ? `${context.clientName}` : 'there';
  const workoutType = context.todayWorkoutType || 'today\'s workout';

  const basePrompt = `Hey! Did you complete ${workoutType} today?`;

  // Add encouraging context if available
  const contextParts: string[] = [basePrompt];

  if (context.consecutiveDaysCompleted && context.consecutiveDaysCompleted > 0) {
    contextParts.push(`(You've been crushing it — ${context.consecutiveDaysCompleted} days in a row!)`);
  }

  if (context.weekCompletionStats) {
    const { completedThisWeek, totalScheduledThisWeek } = context.weekCompletionStats;
    if (completedThisWeek !== undefined && totalScheduledThisWeek !== undefined) {
      contextParts.push(`This week: ${completedThisWeek}/${totalScheduledThisWeek} workouts done.`);
    }
  }

  return contextParts.join('\n');
}

/**
 * Generate follow-up messages based on user response
 */
export function generateFollowUp(
  completionStatus: 'completed' | 'not_yet' | 'skipped' | 'missed',
  context?: WorkoutCheckInContext
): string {
  switch (completionStatus) {
    case 'completed':
      return 'That\'s awesome! Ready to log it, or want to chat about it first?';

    case 'not_yet':
      return 'No problem — get it done when you can. Let me know once you wrap it up so we can log it!';

    case 'skipped':
      return 'Got it. We can talk about why that didn\'t work — or if you\'ve got time later, we can still knock it out.';

    case 'missed':
      return 'Happens to the best of us. Let\'s figure out what got in the way and how to lock in tomorrow.';

    default:
      return 'Let me know how it went!';
  }
}

/**
 * Create missed workout reason buttons/options
 * Returns a structured format ready to render as UI buttons or inline options
 */
export interface MissedWorkoutOption {
  value: string;
  label: string;
  description: string;
}

export function formatMissedWorkoutOptions(): MissedWorkoutOption[] {
  return [
    {
      value: 'sick',
      label: 'Sick',
      description: 'Not feeling well or under the weather',
    },
    {
      value: 'tired',
      label: 'Tired',
      description: 'Felt too fatigued to train',
    },
    {
      value: 'too_busy',
      label: 'Too Busy',
      description: 'Didn\'t have enough time',
    },
    {
      value: 'injury',
      label: 'Injury',
      description: 'Pain or physical limitation',
    },
    {
      value: 'motivation',
      label: 'Motivation',
      description: 'Just wasn\'t feeling it',
    },
    {
      value: 'other',
      label: 'Other',
      description: 'Something else came up',
    },
  ];
}

/**
 * Generate a question about when they plan to reschedule
 */
export function generateReschedulePrompt(reason: string): string {
  const reasonText = formatMissedWorkoutOptions()
    .find(opt => opt.value === reason)
    ?.label || reason;

  return `I hear you — ${reasonText.toLowerCase()} gets in the way sometimes. When are you thinking you\'ll get this one in?`;
}

/**
 * Build rich context from recent check-ins and session logs for AI prompt
 */
export function buildCheckInContext(
  latestCheckIn: ClientCheckIn | null,
  recentSessions: ClientSessionLog[],
  todayWorkoutType?: string
): WorkoutCheckInContext {
  let weekCompletionStats;
  let consecutiveDaysCompleted = 0;

  if (latestCheckIn) {
    const completed = latestCheckIn.sessions_completed || 0;
    const total = (latestCheckIn.next_week_plan?.length || 0) + completed;
    const energyAverage = latestCheckIn.nervous_system?.awareness_score;

    weekCompletionStats = {
      completedThisWeek: completed,
      totalScheduledThisWeek: total,
      energyAverageThisWeek: energyAverage,
    };
  }

  // Calculate consecutive days
  if (recentSessions.length > 0) {
    const today = new Date();
    let current = new Date(today);

    for (let i = 0; i < recentSessions.length; i++) {
      const sessionDate = new Date(recentSessions[i].session_date);
      if (Math.abs(sessionDate.getTime() - current.getTime()) < 86400000) { // within 1 day
        consecutiveDaysCompleted++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }
  }

  const lastSession = recentSessions[0];

  return {
    todayWorkoutType,
    weekCompletionStats,
    consecutiveDaysCompleted,
    lastWorkoutDate: lastSession?.session_date,
    lastWorkoutType: lastSession?.session_type,
  };
}

/**
 * Parse check-in response to extract completion status
 * Simplified version — full logic lives in workout-detection.ts
 */
export function parseCheckInResponse(message: string): {
  status: 'completed' | 'not_yet' | 'skipped' | 'missed' | 'unclear';
  confidence: number;
} {
  const normalized = message.toLowerCase();

  if (/^(yes|yep|yup|done|completed|finished)/.test(normalized)) {
    return { status: 'completed', confidence: 0.95 };
  }
  if (/^(no|nope|skip|skip it|can't|couldn't)/.test(normalized)) {
    return { status: 'skipped', confidence: 0.9 };
  }
  if (/^(not yet|later|soon|in a bit)/.test(normalized)) {
    return { status: 'not_yet', confidence: 0.85 };
  }
  if (/^(missed|didn't|didn't complete|didn't finish)/.test(normalized)) {
    return { status: 'missed', confidence: 0.88 };
  }

  return { status: 'unclear', confidence: 0 };
}
