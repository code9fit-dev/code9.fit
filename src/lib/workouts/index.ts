/**
 * Workout logging and analytics exports
 * Phase 1: Session tracking, exercise logging, adherence calculation
 */

// Types
export * from './types';

// Database service
export {
  createWorkoutSession,
  addSessionExercises,
  completeWorkoutSession,
  markSessionMissed,
  getWorkoutSession,
  getClientCurrentWeek,
  getClientSessions,
  getClientSessionsByWeek,
  addSessionAISummary,
} from './service';

// Analytics and calculations
export {
  calculateAdherence,
  aggregateWeeklyMetrics,
  calculateExerciseProgression,
  calculateAllStrengthProgressions,
  generateProgressSummary,
  getDashboardProgress,
} from './analytics';
