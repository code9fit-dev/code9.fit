/**
 * Workout Detection Module
 * Parses user messages to detect workout completion status
 * Used in daily AI check-ins to track adherence
 */

export type WorkoutCompletionStatus =
  | 'completed'
  | 'not_yet'
  | 'skipped'
  | 'missed'
  | 'unclear';

export interface WorkoutDetectionResult {
  status: WorkoutCompletionStatus;
  confidence: number; // 0-1: how confident is the detection
  rawMessage: string;
  indicators: string[]; // which keywords triggered this detection
}

const COMPLETED_PATTERNS = [
  /\b(yes|yep|yup|done|completed|finished|crushed|smashed|nailed|got it done|knocked it out)\b/i,
  /\b(already (did|completed|finished)|already (worked out|trained|lifted))\b/i,
  /\b(just (finished|completed|did|worked out))\b/i,
  /\bI (did|completed|finished|worked out|trained|lifted) (it|today|the workout)\b/i,
  /\ball set\b/i,
];

const NOT_YET_PATTERNS = [
  /\b(not yet|haven't|will|gonna|planning|later|tonight|tomorrow|after)\b/i,
  /\b(do it (later|tonight|soon|when))\b/i,
  /\b(get to it|still need to)\b/i,
  /\b(no problem|no worries|sounds good|on it)\b/i,
];

const SKIPPED_PATTERNS = [
  /\b(skip|skip (it|today)|can't|cannot|can't do it|unable|won't be able)\b/i,
  /\b(can't do (it|the workout)|won't work today)\b/i,
  /\b(taking (a day off|today off)|rest day|rest|recovery day)\b/i,
  /\b(passing on it|pass on (it|today))\b/i,
];

const MISSED_PATTERNS = [
  /\b(miss|missed|didn't|did not|couldn't|could not|failed|didn't make it)\b/i,
  /\b(wasn't able|wasn't able to|unable to)\b/i,
  /\b(didn't (do|complete|finish|get to) (it|the workout))\b/i,
  /\b(didn't happen|didn't work out)\b/i,
];

/**
 * Detect workout completion status from user message
 */
export function detectWorkoutCompletion(message: string): WorkoutDetectionResult {
  const normalized = message.toLowerCase().trim();
  const indicators: string[] = [];

  // Check completed
  for (const pattern of COMPLETED_PATTERNS) {
    if (pattern.test(normalized)) {
      indicators.push(pattern.source);
      return {
        status: 'completed',
        confidence: 0.95,
        rawMessage: message,
        indicators,
      };
    }
  }

  // Check not yet
  for (const pattern of NOT_YET_PATTERNS) {
    if (pattern.test(normalized)) {
      indicators.push(pattern.source);
      return {
        status: 'not_yet',
        confidence: 0.85,
        rawMessage: message,
        indicators,
      };
    }
  }

  // Check skipped/can't do
  for (const pattern of SKIPPED_PATTERNS) {
    if (pattern.test(normalized)) {
      indicators.push(pattern.source);
      return {
        status: 'skipped',
        confidence: 0.9,
        rawMessage: message,
        indicators,
      };
    }
  }

  // Check missed
  for (const pattern of MISSED_PATTERNS) {
    if (pattern.test(normalized)) {
      indicators.push(pattern.source);
      return {
        status: 'missed',
        confidence: 0.88,
        rawMessage: message,
        indicators,
      };
    }
  }

  // If no clear pattern matches, return unclear
  return {
    status: 'unclear',
    confidence: 0,
    rawMessage: message,
    indicators: [],
  };
}

/**
 * Check if a status indicates the workout was NOT completed
 */
export function isWorkoutIncomplete(status: WorkoutCompletionStatus): boolean {
  return ['not_yet', 'skipped', 'missed'].includes(status);
}

/**
 * Check if a status indicates the workout was completed
 */
export function isWorkoutComplete(status: WorkoutCompletionStatus): boolean {
  return status === 'completed';
}

/**
 * Get a human-readable summary of the detection result
 */
export function summarizeDetection(result: WorkoutDetectionResult): string {
  switch (result.status) {
    case 'completed':
      return 'Workout completed';
    case 'not_yet':
      return 'Workout not yet done, plan to do later';
    case 'skipped':
      return 'Workout skipped or taking a rest day';
    case 'missed':
      return 'Workout was missed';
    case 'unclear':
      return 'Unclear if workout was completed';
    default:
      return 'Unknown status';
  }
}
