/**
 * Workout logging types for Phase 1
 */

export interface WorkoutSession {
  id: string;
  client_id: string;
  program_id: string;
  week?: number;
  day?: number;
  planned_date: string; // ISO date
  status: 'pending' | 'completed' | 'missed' | 'on_hold';
  completed_date?: string; // ISO datetime
  created_at: string;
  updated_at: string;
}

export interface SessionExercise {
  id: string;
  session_id: string;
  name: string;
  planned_sets?: number;
  planned_reps?: number;
  planned_weight?: number;
  actual_sets?: number;
  actual_reps?: number;
  actual_weight?: number;
  notes?: string;
  created_at: string;
}

export interface SessionMissed {
  id: string;
  session_id: string;
  reason?: string; // sick | tired | busy | injury | other
  details?: string;
  on_hold_until?: string; // ISO date
  created_at: string;
}

export interface SessionFeelings {
  id: string;
  session_id: string;
  energy_level?: number; // 1-10
  soreness?: number; // 1-10
  mood?: number; // 1-10
  sleep_hours?: number;
  sleep_quality?: number; // 1-10
  created_at: string;
}

export interface SessionAISummary {
  id: string;
  session_id: string;
  summary: string;
  generated_at: string;
}

export interface WorkoutSessionFull extends WorkoutSession {
  exercises?: SessionExercise[];
  missed?: SessionMissed | null;
  feelings?: SessionFeelings | null;
  ai_summary?: SessionAISummary | null;
}

export interface WeeklyMetrics {
  week: number;
  total_sessions: number;
  completed_sessions: number;
  missed_sessions: number;
  avg_energy_level?: number;
  avg_soreness?: number;
  avg_mood?: number;
  avg_sleep_hours?: number;
  avg_sleep_quality?: number;
}

export interface StrengthProgression {
  exercise_name: string;
  week_start: number;
  week_end: number;
  starting_weight?: number;
  ending_weight?: number;
  weight_change?: number;
  weight_change_pct?: number;
  reps_changed?: boolean;
}

export interface ProgressSummary {
  week: number;
  adherence_pct: number;
  total_completed: number;
  total_planned: number;
  sessions_missed: number;
  sessions_held: number;
  strength_progressions: StrengthProgression[];
  weekly_metrics: WeeklyMetrics[];
  generated_at: string;
}
