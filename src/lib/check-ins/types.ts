export interface NextWeekSession {
  day: string; // "Mon", "Tue", etc
  type: string; // "Strength", "Cardio", "Mobility", "Rest-active"
}

export interface ClientCheckIn {
  id: string;
  coach_id: string;
  client_id: string;
  coach_slug: string;
  week_of: string; // date
  sessions_completed: number;
  missed_reason?: string; // "no time" | "no energy" | "didn't know what to do" | "fatigue or niggle" | "just didn't want to"
  mood?: string;
  sleep_hours?: number;
  physical_issues?: string;
  next_week_plan: NextWeekSession[];
  notes?: string;
  submitted_at: string; // ISO timestamp
  created_at: string;
}

export interface SessionExercise {
  name: string;
  sets: Array<{
    weight?: number | string;
    reps?: number;
    rpe?: number; // rate of perceived exertion 1-10
  }>;
}

export interface ClientSessionLog {
  id: string;
  coach_id: string;
  client_id: string;
  coach_slug: string;
  session_date: string; // date
  session_type: string; // "Strength" | "Cardio" | "Mobility" | "Rest-active"
  exercises: SessionExercise[];
  overall_effort?: number; // 1-10
  win_of_day?: string;
  next_time_beat?: string;
  notes?: string;
  submitted_at: string;
  created_at: string;
}

export interface CoachClientRelationship {
  id: string;
  coach_id: string;
  client_id: string;
  coach_slug: string;
  created_at: string;
}

// For coach dashboard views
export interface ClientCheckInSummary {
  client_id: string;
  client_email: string;
  latest_check_in: ClientCheckIn | null;
  days_since_check_in: number;
  is_overdue: boolean; // > 7 days
  recent_check_ins: ClientCheckIn[]; // last 6 weeks
  trend: {
    avg_sessions: number;
    avg_sleep: number;
    most_common_miss_reason?: string;
  };
}
