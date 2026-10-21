import { SupabaseClient } from '@supabase/supabase-js';
import {
  WeeklyMetrics,
  StrengthProgression,
  ProgressSummary,
  WorkoutSessionFull,
} from './types';

/**
 * Calculate adherence percentage for a date range
 */
export function calculateAdherence(sessions: WorkoutSessionFull[]): number {
  if (sessions.length === 0) return 0;

  const completed = sessions.filter((s) => s.status === 'completed').length;
  return Math.round((completed / sessions.length) * 100);
}

/**
 * Calculate weekly aggregated metrics
 */
export function aggregateWeeklyMetrics(sessions: WorkoutSessionFull[]): WeeklyMetrics | null {
  if (sessions.length === 0) return null;

  const completed = sessions.filter((s) => s.status === 'completed');
  const missed = sessions.filter((s) => s.status === 'missed' || s.status === 'on_hold');

  // Collect all feelings data
  const allFeelings = sessions
    .map((s) => s.feelings)
    .filter((f) => f !== null && f !== undefined);

  const avgEnergyLevel =
    allFeelings.length > 0
      ? allFeelings.reduce((sum, f) => sum + (f.energy_level || 0), 0) / allFeelings.length
      : undefined;

  const avgSoreness =
    allFeelings.length > 0
      ? allFeelings.reduce((sum, f) => sum + (f.soreness || 0), 0) / allFeelings.length
      : undefined;

  const avgMood =
    allFeelings.length > 0
      ? allFeelings.reduce((sum, f) => sum + (f.mood || 0), 0) / allFeelings.length
      : undefined;

  const avgSleepHours =
    allFeelings.length > 0
      ? allFeelings.reduce((sum, f) => sum + (f.sleep_hours || 0), 0) / allFeelings.length
      : undefined;

  const avgSleepQuality =
    allFeelings.length > 0
      ? allFeelings.reduce((sum, f) => sum + (f.sleep_quality || 0), 0) / allFeelings.length
      : undefined;

  return {
    week: sessions[0].week || 1,
    total_sessions: sessions.length,
    completed_sessions: completed.length,
    missed_sessions: missed.length,
    avg_energy_level: avgEnergyLevel ? Math.round(avgEnergyLevel * 10) / 10 : undefined,
    avg_soreness: avgSoreness ? Math.round(avgSoreness * 10) / 10 : undefined,
    avg_mood: avgMood ? Math.round(avgMood * 10) / 10 : undefined,
    avg_sleep_hours: avgSleepHours ? Math.round(avgSleepHours * 10) / 10 : undefined,
    avg_sleep_quality: avgSleepQuality ? Math.round(avgSleepQuality * 10) / 10 : undefined,
  };
}

/**
 * Calculate strength progression for a specific exercise
 */
export function calculateExerciseProgression(
  startSessions: WorkoutSessionFull[],
  endSessions: WorkoutSessionFull[],
  exerciseName: string
): StrengthProgression | null {
  const getMaxWeight = (sessions: WorkoutSessionFull[]) => {
    let maxWeight: number | undefined;

    for (const session of sessions) {
      if (!session.exercises) continue;
      const exercise = session.exercises.find(
        (e) => e.name.toLowerCase() === exerciseName.toLowerCase()
      );
      if (exercise && exercise.actual_weight) {
        if (!maxWeight || exercise.actual_weight > maxWeight) {
          maxWeight = exercise.actual_weight;
        }
      }
    }
    return maxWeight;
  };

  const startWeight = getMaxWeight(startSessions);
  const endWeight = getMaxWeight(endSessions);

  if (!startWeight || !endWeight) return null;

  const change = endWeight - startWeight;
  const changePct = (change / startWeight) * 100;

  return {
    exercise_name: exerciseName,
    week_start: startSessions[0]?.week || 1,
    week_end: endSessions[endSessions.length - 1]?.week || 1,
    starting_weight: startWeight,
    ending_weight: endWeight,
    weight_change: change,
    weight_change_pct: Math.round(changePct * 10) / 10,
  };
}

/**
 * Extract all unique exercises from sessions
 */
function getExerciseNames(sessions: WorkoutSessionFull[]): string[] {
  const names = new Set<string>();
  for (const session of sessions) {
    if (session.exercises) {
      for (const exercise of session.exercises) {
        names.add(exercise.name);
      }
    }
  }
  return Array.from(names);
}

/**
 * Calculate strength progressions across all exercises
 */
export function calculateAllStrengthProgressions(
  startSessions: WorkoutSessionFull[],
  endSessions: WorkoutSessionFull[]
): StrengthProgression[] {
  const exerciseNames = getExerciseNames([...startSessions, ...endSessions]);
  const progressions: StrengthProgression[] = [];

  for (const exerciseName of exerciseNames) {
    const progression = calculateExerciseProgression(startSessions, endSessions, exerciseName);
    if (progression) {
      progressions.push(progression);
    }
  }

  return progressions.sort((a, b) => (b.weight_change_pct || 0) - (a.weight_change_pct || 0));
}

/**
 * Generate a progress summary for a given week milestone (3, 6, 9, etc.)
 */
export async function generateProgressSummary(
  supabase: SupabaseClient,
  clientId: string,
  programId: string,
  targetWeek: number
): Promise<ProgressSummary | null> {
  // Fetch all sessions from week 1 to target week
  const { data: sessions, error } = await supabase
    .from('workout_sessions')
    .select(`
      *,
      session_exercises(*),
      session_missed(*),
      session_feelings(*)
    `)
    .eq('client_id', clientId)
    .eq('program_id', programId)
    .lte('week', targetWeek)
    .gte('week', 1)
    .order('week', { ascending: true });

  if (error) throw error;
  if (!sessions || sessions.length === 0) return null;

  const allSessions = sessions as unknown as WorkoutSessionFull[];

  // Group by week
  const sessionsByWeek = new Map<number, WorkoutSessionFull[]>();
  for (const session of allSessions) {
    const week = session.week || 1;
    if (!sessionsByWeek.has(week)) {
      sessionsByWeek.set(week, []);
    }
    sessionsByWeek.get(week)!.push(session);
  }

  // Collect metrics per week
  const weeklyMetrics: WeeklyMetrics[] = [];
  for (let w = 1; w <= targetWeek; w++) {
    const weekSessions = sessionsByWeek.get(w) || [];
    const metrics = aggregateWeeklyMetrics(weekSessions);
    if (metrics) {
      weeklyMetrics.push(metrics);
    }
  }

  // Calculate strength progressions (first week vs target week)
  const firstWeekSessions = sessionsByWeek.get(1) || [];
  const targetWeekSessions = sessionsByWeek.get(targetWeek) || [];
  const strengthProgressions = calculateAllStrengthProgressions(firstWeekSessions, targetWeekSessions);

  // Calculate overall adherence
  const adherence = calculateAdherence(allSessions);

  // Count missed and held
  const totalMissed = allSessions.filter((s) => s.status === 'missed').length;
  const totalHeld = allSessions.filter((s) => s.status === 'on_hold').length;

  return {
    week: targetWeek,
    adherence_pct: adherence,
    total_completed: allSessions.filter((s) => s.status === 'completed').length,
    total_planned: allSessions.length,
    sessions_missed: totalMissed,
    sessions_held: totalHeld,
    strength_progressions: strengthProgressions,
    weekly_metrics: weeklyMetrics,
    generated_at: new Date().toISOString(),
  };
}

/**
 * Get progress data for dashboard (current week + overall stats)
 */
export async function getDashboardProgress(
  supabase: SupabaseClient,
  clientId: string
) {
  // Get current week
  const now = new Date();
  const dayOfWeek = now.getDay();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - dayOfWeek);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const { data: currentWeekSessions, error: weekError } = await supabase
    .from('workout_sessions')
    .select(`
      *,
      session_exercises(*),
      session_missed(*),
      session_feelings(*)
    `)
    .eq('client_id', clientId)
    .gte('planned_date', weekStart.toISOString().split('T')[0])
    .lte('planned_date', weekEnd.toISOString().split('T')[0]);

  if (weekError) throw weekError;

  const sessions = (currentWeekSessions as unknown as WorkoutSessionFull[]) || [];

  // Calculate metrics
  const currentWeekMetrics = aggregateWeeklyMetrics(sessions);
  const adherenceThisWeek = calculateAdherence(sessions);

  // Get last 6 weeks of history
  const sixWeeksAgo = new Date(now);
  sixWeeksAgo.setDate(now.getDate() - 42);

  const { data: historyData, error: historyError } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('client_id', clientId)
    .gte('planned_date', sixWeeksAgo.toISOString().split('T')[0])
    .lte('planned_date', now.toISOString().split('T')[0]);

  if (historyError) throw historyError;

  const historySessions = (historyData as WorkoutSessionFull[]) || [];
  const overallAdherence = calculateAdherence(historySessions);

  return {
    current_week: {
      start_date: weekStart.toISOString().split('T')[0],
      end_date: weekEnd.toISOString().split('T')[0],
      sessions: sessions,
      metrics: currentWeekMetrics,
      adherence_pct: adherenceThisWeek,
    },
    overall_stats: {
      total_sessions_logged: historySessions.length,
      total_completed: historySessions.filter((s) => s.status === 'completed').length,
      total_missed: historySessions.filter((s) => s.status === 'missed').length,
      total_held: historySessions.filter((s) => s.status === 'on_hold').length,
      adherence_pct: overallAdherence,
    },
  };
}
