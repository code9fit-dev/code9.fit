/**
 * Coaching API Client
 * Handles API calls for workout sessions and missed workout tracking
 */

export interface CreateSessionRequest {
  program_id: string;
  week?: number;
  day?: number;
  planned_date: string;
  exercises?: Array<{
    name: string;
    planned_sets?: number;
    planned_reps?: number;
    planned_weight?: number;
  }>;
}

export interface MissSessionRequest {
  reason?: string;
  details?: string;
  on_hold_until?: string;
}

/**
 * Create a new workout session
 */
export async function createWorkoutSession(
  programId: string,
  plannedDate: string,
  options?: {
    week?: number;
    day?: number;
    exercises?: CreateSessionRequest['exercises'];
  }
): Promise<any> {
  const response = await fetch('/api/workouts/session/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      program_id: programId,
      week: options?.week,
      day: options?.day,
      planned_date: plannedDate,
      exercises: options?.exercises,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create workout session');
  }

  return response.json();
}

/**
 * Mark a workout session as missed
 */
export async function missWorkoutSession(
  sessionId: string,
  reason?: string,
  rescheduledFor?: string
): Promise<any> {
  const response = await fetch(`/api/workouts/session/${sessionId}/miss`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reason,
      on_hold_until: rescheduledFor,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to mark session missed');
  }

  return response.json();
}

/**
 * Complete a workout session
 */
export async function completeWorkoutSession(
  sessionId: string,
  data?: {
    exercises?: Array<{
      name: string;
      completed_sets?: number;
      actual_reps?: number;
      actual_weight?: number;
      rpe?: number;
    }>;
    notes?: string;
    win_of_day?: string;
  }
): Promise<any> {
  const response = await fetch(`/api/workouts/session/${sessionId}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to complete session');
  }

  return response.json();
}

/**
 * Get current week's workouts
 */
export async function getWeekWorkouts(clientId: string): Promise<any> {
  const response = await fetch(`/api/workouts/client/${clientId}/current-week`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch workouts');
  }

  return response.json();
}

/**
 * Get workout summary
 */
export async function getWorkoutSummary(clientId: string): Promise<any> {
  const response = await fetch(`/api/workouts/client/${clientId}/summary`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch summary');
  }

  return response.json();
}
