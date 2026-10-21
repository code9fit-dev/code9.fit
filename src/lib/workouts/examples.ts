/**
 * Example usage of the workout logging API
 * Uncomment and adapt for your use cases
 */

import { getSupabaseServerClient } from '@/lib/supabase/server';
import {
  createWorkoutSession,
  addSessionExercises,
  completeWorkoutSession,
  markSessionMissed,
  getWorkoutSession,
  getClientCurrentWeek,
  getClientSessions,
  getClientSessionsByWeek,
  calculateAdherence,
  aggregateWeeklyMetrics,
  generateProgressSummary,
  getDashboardProgress,
} from './index';

/**
 * Example 1: Create and log a complete workout
 */
export async function exampleCompleteWorkout() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const clientId = 'user-uuid-here';
  const programId = 'hybrid-focus-intermediate';

  // Step 1: Create session
  const session = await createWorkoutSession(supabase, clientId, programId, {
    week: 1,
    day: 1,
    planned_date: '2024-10-20',
  });

  console.log('Created session:', session.id);

  // Step 2: Add exercises
  const exercises = await addSessionExercises(supabase, session.id, [
    {
      name: 'Back Squat',
      planned_sets: 4,
      planned_reps: 6,
      planned_weight: 185,
    },
    {
      name: 'Bench Press',
      planned_sets: 4,
      planned_reps: 8,
      planned_weight: 155,
    },
    {
      name: 'Deadlift',
      planned_sets: 3,
      planned_reps: 5,
      planned_weight: 275,
    },
  ]);

  console.log('Added exercises:', exercises.length);

  // Step 3: Complete workout with actual performance
  const completed = await completeWorkoutSession(supabase, session.id, {
    exercises: [
      {
        id: exercises[0].id,
        name: 'Back Squat',
        actual_sets: 4,
        actual_reps: 6,
        actual_weight: 195, // +10 lbs from planned
        notes: 'Felt strong, could have done more',
      },
      {
        id: exercises[1].id,
        name: 'Bench Press',
        actual_sets: 4,
        actual_reps: 8,
        actual_weight: 160, // +5 lbs
        notes: 'Good form',
      },
      {
        id: exercises[2].id,
        name: 'Deadlift',
        actual_sets: 3,
        actual_reps: 5,
        actual_weight: 285, // +10 lbs
        notes: 'Final rep was tight',
      },
    ],
    energy_level: 8,
    soreness: 3,
    mood: 7,
    sleep_hours: 7.5,
    sleep_quality: 8,
  });

  console.log('Workout complete:', completed.status);
  return completed;
}

/**
 * Example 2: Mark workout as missed with hold
 */
export async function exampleMissWorkout() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const sessionId = 'session-uuid-here';

  const missed = await markSessionMissed(supabase, sessionId, {
    reason: 'sick',
    details: 'Had a cold, wanted to rest and recover',
    on_hold_until: '2024-10-22', // Plan to resume in 2 days
  });

  console.log('Marked as on hold until:', missed.status);
  return missed;
}

/**
 * Example 3: Get this week's overview
 */
export async function exampleGetWeekOverview() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const clientId = 'user-uuid-here';

  const sessions = await getClientCurrentWeek(supabase, clientId);

  console.log('This week sessions:');
  sessions.forEach((session) => {
    console.log(`  ${session.planned_date}: ${session.status}`);
    if (session.exercises) {
      session.exercises.forEach((ex) => {
        console.log(`    - ${ex.name}: ${ex.actual_reps || ex.planned_reps} reps`);
      });
    }
  });

  // Calculate weekly metrics
  const metrics = aggregateWeeklyMetrics(sessions);
  console.log('Weekly metrics:', metrics);

  return { sessions, metrics };
}

/**
 * Example 4: Get dashboard progress
 */
export async function exampleGetDashboard() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const clientId = 'user-uuid-here';

  const progress = await getDashboardProgress(supabase, clientId);

  console.log('Current Week:');
  console.log(`  Adherence: ${progress.current_week.adherence_pct}%`);
  console.log(`  Completed: ${progress.current_week.metrics?.completed_sessions}/${progress.current_week.metrics?.total_sessions}`);
  console.log(`  Avg Energy: ${progress.current_week.metrics?.avg_energy_level}/10`);
  console.log(`  Avg Sleep: ${progress.current_week.metrics?.avg_sleep_hours} hours`);

  console.log('Overall Stats (last 6 weeks):');
  console.log(`  Adherence: ${progress.overall_stats.adherence_pct}%`);
  console.log(`  Total Logged: ${progress.overall_stats.total_sessions_logged}`);
  console.log(`  Completed: ${progress.overall_stats.total_completed}`);
  console.log(`  Missed: ${progress.overall_stats.total_missed}`);

  return progress;
}

/**
 * Example 5: Generate 3-week summary
 */
export async function exampleGet3WeekSummary() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const clientId = 'user-uuid-here';
  const programId = 'hybrid-focus-intermediate';

  const summary = await generateProgressSummary(supabase, clientId, programId, 3);

  console.log('3-Week Summary:');
  console.log(`  Adherence: ${summary?.adherence_pct}%`);
  console.log(`  Completed: ${summary?.total_completed}/${summary?.total_planned}`);

  console.log('Strength Progressions:');
  summary?.strength_progressions.forEach((prog) => {
    console.log(
      `  ${prog.exercise_name}: ${prog.starting_weight} → ${prog.ending_weight} lbs (+${prog.weight_change_pct}%)`
    );
  });

  console.log('Weekly Trends:');
  summary?.weekly_metrics.forEach((w) => {
    console.log(
      `  Week ${w.week}: Energy ${w.avg_energy_level}/10, Sleep ${w.avg_sleep_hours}h, Completed ${w.completed_sessions}/${w.total_sessions}`
    );
  });

  return summary;
}

/**
 * Example 6: Get sessions for a specific week
 */
export async function exampleGetWeekSessions() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const clientId = 'user-uuid-here';
  const programId = 'hybrid-focus-intermediate';
  const week = 1;

  const sessions = await getClientSessionsByWeek(supabase, clientId, programId, week);

  console.log(`Week ${week} sessions:`);
  sessions.forEach((session) => {
    console.log(`  Day ${session.day}: ${session.status}`);
  });

  return sessions;
}

/**
 * Example 7: Get sessions in date range
 */
export async function exampleGetDateRange() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const clientId = 'user-uuid-here';
  const startDate = '2024-10-01';
  const endDate = '2024-10-31';

  const sessions = await getClientSessions(supabase, clientId, startDate, endDate);

  console.log(`Sessions from ${startDate} to ${endDate}:`);
  console.log(`  Total: ${sessions.length}`);
  console.log(`  Completed: ${sessions.filter((s) => s.status === 'completed').length}`);
  console.log(`  Missed: ${sessions.filter((s) => s.status === 'missed').length}`);
  console.log(`  On Hold: ${sessions.filter((s) => s.status === 'on_hold').length}`);

  return sessions;
}

/**
 * Example 8: Track strength progression across a program
 */
export async function exampleTrackProgression() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const clientId = 'user-uuid-here';
  const programId = 'hybrid-focus-intermediate';

  // Get 3, 6, and 9 week summaries
  const summaries = await Promise.all([
    generateProgressSummary(supabase, clientId, programId, 3),
    generateProgressSummary(supabase, clientId, programId, 6),
    generateProgressSummary(supabase, clientId, programId, 9),
  ]);

  summaries.forEach((summary) => {
    if (summary) {
      console.log(`\nWeek ${summary.week}:`);
      console.log(`Adherence: ${summary.adherence_pct}%`);
      summary.strength_progressions.slice(0, 3).forEach((prog) => {
        console.log(`  ${prog.exercise_name}: ${prog.starting_weight} → ${prog.ending_weight} lbs`);
      });
    }
  });

  return summaries;
}

/**
 * Example 9: API route handler pattern
 * This shows how to structure a route handler using these functions
 */
export async function exampleRouteHandler(clientId: string, sessionData: any) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) throw new Error('Supabase not configured');

  // Verify user owns the session
  const session = await getWorkoutSession(supabase, sessionData.sessionId);
  if (!session || session.client_id !== clientId) {
    throw new Error('Not authorized');
  }

  // Complete the session
  const completed = await completeWorkoutSession(supabase, sessionData.sessionId, {
    exercises: sessionData.exercises,
    energy_level: sessionData.energy_level,
    soreness: sessionData.soreness,
    mood: sessionData.mood,
    sleep_hours: sessionData.sleep_hours,
    sleep_quality: sessionData.sleep_quality,
  });

  // Get updated full session
  const fullSession = await getWorkoutSession(supabase, completed.id);

  return {
    success: true,
    session: fullSession,
  };
}

/**
 * Example 10: Batch operations for weekly setup
 */
export async function exampleSetupWeek() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return;

  const clientId = 'user-uuid-here';
  const programId = 'hybrid-focus-intermediate';
  const week = 2;

  // Planned schedule
  const workoutPlan = [
    {
      day: 1,
      date: '2024-10-21',
      exercises: ['Back Squat', 'Barbell Row', 'Pull-ups'],
    },
    {
      day: 2,
      date: '2024-10-22',
      exercises: ['Bench Press', 'Incline Dumbbell Press'],
    },
    {
      day: 3,
      date: '2024-10-24',
      exercises: ['Deadlift', 'Barbell Rows', 'Weighted Dips'],
    },
  ];

  // Create all sessions for the week
  const sessions = [];
  for (const workout of workoutPlan) {
    const session = await createWorkoutSession(supabase, clientId, programId, {
      week,
      day: workout.day,
      planned_date: workout.date,
    });

    // Add exercises (would normally get from program definition)
    await addSessionExercises(
      supabase,
      session.id,
      workout.exercises.map((name) => ({ name }))
    );

    sessions.push(session);
  }

  console.log(`Created ${sessions.length} sessions for week ${week}`);
  return sessions;
}
