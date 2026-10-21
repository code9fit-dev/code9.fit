import { SupabaseClient } from '@supabase/supabase-js';
import {
  WorkoutSession,
  SessionExercise,
  SessionMissed,
  SessionFeelings,
  WorkoutSessionFull,
} from './types';

/**
 * Create a new workout session
 */
export async function createWorkoutSession(
  supabase: SupabaseClient,
  clientId: string,
  programId: string,
  data: {
    week?: number;
    day?: number;
    planned_date: string; // ISO date YYYY-MM-DD
  }
) {
  const { data: session, error } = await supabase
    .from('workout_sessions')
    .insert({
      client_id: clientId,
      program_id: programId,
      week: data.week,
      day: data.day,
      planned_date: data.planned_date,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return session as WorkoutSession;
}

/**
 * Add exercises to a session
 */
export async function addSessionExercises(
  supabase: SupabaseClient,
  sessionId: string,
  exercises: Array<{
    name: string;
    planned_sets?: number;
    planned_reps?: number;
    planned_weight?: number;
  }>
) {
  const { data, error } = await supabase
    .from('session_exercises')
    .insert(
      exercises.map((ex) => ({
        session_id: sessionId,
        name: ex.name,
        planned_sets: ex.planned_sets,
        planned_reps: ex.planned_reps,
        planned_weight: ex.planned_weight,
      }))
    )
    .select();

  if (error) throw error;
  return data as SessionExercise[];
}

/**
 * Mark a session as complete with logged exercises and feelings
 */
export async function completeWorkoutSession(
  supabase: SupabaseClient,
  sessionId: string,
  data: {
    exercises?: Array<{
      id?: string;
      name: string;
      actual_sets?: number;
      actual_reps?: number;
      actual_weight?: number;
      notes?: string;
    }>;
    energy_level?: number;
    soreness?: number;
    mood?: number;
    sleep_hours?: number;
    sleep_quality?: number;
  }
) {
  // Update session status
  const { data: updatedSession, error: sessionError } = await supabase
    .from('workout_sessions')
    .update({
      status: 'completed',
      completed_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
    .select()
    .single();

  if (sessionError) throw sessionError;

  // Update or create exercises with actual performance
  if (data.exercises && data.exercises.length > 0) {
    for (const exercise of data.exercises) {
      if (exercise.id) {
        // Update existing
        const { error: exError } = await supabase
          .from('session_exercises')
          .update({
            actual_sets: exercise.actual_sets,
            actual_reps: exercise.actual_reps,
            actual_weight: exercise.actual_weight,
            notes: exercise.notes,
          })
          .eq('id', exercise.id);

        if (exError) throw exError;
      } else {
        // Create new (if not pre-added)
        const { error: exError } = await supabase
          .from('session_exercises')
          .insert({
            session_id: sessionId,
            name: exercise.name,
            actual_sets: exercise.actual_sets,
            actual_reps: exercise.actual_reps,
            actual_weight: exercise.actual_weight,
            notes: exercise.notes,
          });

        if (exError) throw exError;
      }
    }
  }

  // Store feelings if provided
  if (
    data.energy_level !== undefined ||
    data.soreness !== undefined ||
    data.mood !== undefined ||
    data.sleep_hours !== undefined ||
    data.sleep_quality !== undefined
  ) {
    const { error: feelingsError } = await supabase
      .from('session_feelings')
      .upsert({
        session_id: sessionId,
        energy_level: data.energy_level,
        soreness: data.soreness,
        mood: data.mood,
        sleep_hours: data.sleep_hours,
        sleep_quality: data.sleep_quality,
      });

    if (feelingsError) throw feelingsError;
  }

  return updatedSession as WorkoutSession;
}

/**
 * Mark a workout as missed with reason
 */
export async function markSessionMissed(
  supabase: SupabaseClient,
  sessionId: string,
  data: {
    reason?: string; // sick | tired | busy | injury | other
    details?: string;
    on_hold_until?: string; // ISO date YYYY-MM-DD
  }
) {
  const status = data.on_hold_until ? 'on_hold' : 'missed';

  // Update session status
  const { data: updatedSession, error: sessionError } = await supabase
    .from('workout_sessions')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
    .select()
    .single();

  if (sessionError) throw sessionError;

  // Record the miss
  const { error: missError } = await supabase
    .from('session_missed')
    .upsert({
      session_id: sessionId,
      reason: data.reason,
      details: data.details,
      on_hold_until: data.on_hold_until,
    });

  if (missError) throw missError;

  return updatedSession as WorkoutSession;
}

/**
 * Get a single workout session with all related data
 */
export async function getWorkoutSession(
  supabase: SupabaseClient,
  sessionId: string
) {
  const { data: session, error: sessionError } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();

  if (sessionError && sessionError.code !== 'PGRST116') throw sessionError;
  if (!session) return null;

  // Fetch related data
  const [exercises, missed, feelings, aiSummary] = await Promise.all([
    supabase.from('session_exercises').select('*').eq('session_id', sessionId),
    supabase.from('session_missed').select('*').eq('session_id', sessionId).single(),
    supabase.from('session_feelings').select('*').eq('session_id', sessionId).single(),
    supabase.from('session_ai_summaries').select('*').eq('session_id', sessionId).single(),
  ]);

  return {
    ...session,
    exercises: exercises.data || [],
    missed: missed.data || null,
    feelings: feelings.data || null,
    ai_summary: aiSummary.data || null,
  } as WorkoutSessionFull;
}

/**
 * Get this week's workouts for a client
 */
export async function getClientCurrentWeek(
  supabase: SupabaseClient,
  clientId: string,
  asOfDate?: Date
) {
  const date = asOfDate || new Date();
  const dayOfWeek = date.getDay(); // 0 = Sunday
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - dayOfWeek); // Start at Sunday

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // End at Saturday

  const { data, error } = await supabase
    .from('workout_sessions')
    .select(`
      *,
      session_exercises(*),
      session_missed(*),
      session_feelings(*),
      session_ai_summaries(*)
    `)
    .eq('client_id', clientId)
    .gte('planned_date', weekStart.toISOString().split('T')[0])
    .lte('planned_date', weekEnd.toISOString().split('T')[0])
    .order('planned_date', { ascending: true });

  if (error) throw error;

  return (data as unknown as Array<WorkoutSessionFull>) || [];
}

/**
 * Get all sessions for a client in a date range
 */
export async function getClientSessions(
  supabase: SupabaseClient,
  clientId: string,
  startDate: string, // YYYY-MM-DD
  endDate: string
) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select(`
      *,
      session_exercises(*),
      session_missed(*),
      session_feelings(*),
      session_ai_summaries(*)
    `)
    .eq('client_id', clientId)
    .gte('planned_date', startDate)
    .lte('planned_date', endDate)
    .order('planned_date', { ascending: true });

  if (error) throw error;

  return (data as unknown as Array<WorkoutSessionFull>) || [];
}

/**
 * Get sessions by week number
 */
export async function getClientSessionsByWeek(
  supabase: SupabaseClient,
  clientId: string,
  programId: string,
  week: number
) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select(`
      *,
      session_exercises(*),
      session_missed(*),
      session_feelings(*),
      session_ai_summaries(*)
    `)
    .eq('client_id', clientId)
    .eq('program_id', programId)
    .eq('week', week)
    .order('day', { ascending: true });

  if (error) throw error;

  return (data as unknown as Array<WorkoutSessionFull>) || [];
}

/**
 * Add AI summary to session
 */
export async function addSessionAISummary(
  supabase: SupabaseClient,
  sessionId: string,
  summary: string
) {
  const { data, error } = await supabase
    .from('session_ai_summaries')
    .upsert({
      session_id: sessionId,
      summary,
      generated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
