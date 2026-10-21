/**
 * Coaching Module - Phase 1: Daily Workout Check-Ins
 * Orchestrates AI check-ins for workout completion tracking
 * Includes detection, generation, and parsing of check-in flows
 */

export {
  type WorkoutCompletionStatus,
  type WorkoutDetectionResult,
  detectWorkoutCompletion,
  isWorkoutIncomplete,
  isWorkoutComplete,
  summarizeDetection,
} from './workout-detection';

export {
  type WorkoutCheckInContext,
  type MissedWorkoutOption,
  generateWorkoutCheckIn,
  generateFollowUp,
  formatMissedWorkoutOptions,
  generateReschedulePrompt,
  buildCheckInContext,
  parseCheckInResponse,
} from './check-in-generation';

/**
 * Main coach integration point
 * Call this when initializing a chat session to check if we need to inject a daily check-in
 */
export function shouldTriggerDailyCheckIn(
  lastCheckInTime: string | null,
  nowTime: Date = new Date()
): boolean {
  if (!lastCheckInTime) return true;

  const lastCheckIn = new Date(lastCheckInTime);
  const now = new Date(nowTime);

  // Check if it's been 24+ hours since last check-in
  const hoursSinceLastCheckIn = (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60);
  return hoursSinceLastCheckIn >= 24;
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Get start of week (Monday) in YYYY-MM-DD format
 */
export function getWeekStartDate(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const weekStart = new Date(d.setDate(diff));
  return weekStart.toISOString().split('T')[0];
}

/**
 * Get end of week (Sunday) in YYYY-MM-DD format
 */
export function getWeekEndDate(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? 0 : 7); // Get next Sunday
  const weekEnd = new Date(d.setDate(diff));
  return weekEnd.toISOString().split('T')[0];
}

/**
 * Format a date string to a human-readable format
 */
export function formatDateForDisplay(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
