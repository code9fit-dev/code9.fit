import { SupabaseClient } from '@supabase/supabase-js';
import { ClientCheckIn, ClientSessionLog, NextWeekSession, ClientCheckInSummary } from './types';

/**
 * Link a coach and client relationship for tracking purposes
 */
export async function linkCoachClient(
  supabase: SupabaseClient,
  coachId: string,
  clientId: string,
  coachSlug: string
) {
  const { error } = await supabase
    .from('coach_client_relationships')
    .upsert({ coach_id: coachId, client_id: clientId, coach_slug: coachSlug });

  if (error) throw error;
}

/**
 * Submit a weekly check-in (called from coach chat after conversation)
 */
export async function submitCheckIn(
  supabase: SupabaseClient,
  coachId: string,
  clientId: string,
  coachSlug: string,
  data: {
    week_of: string; // date format YYYY-MM-DD
    sessions_completed: number;
    missed_reason?: string;
    mood?: string;
    sleep_hours?: number;
    physical_issues?: string;
    next_week_plan: NextWeekSession[];
    notes?: string;
  }
) {
  const { data: checkIn, error } = await supabase
    .from('client_check_ins')
    .upsert(
      {
        coach_id: coachId,
        client_id: clientId,
        coach_slug: coachSlug,
        week_of: data.week_of,
        sessions_completed: data.sessions_completed,
        missed_reason: data.missed_reason,
        mood: data.mood,
        sleep_hours: data.sleep_hours,
        physical_issues: data.physical_issues,
        next_week_plan: data.next_week_plan,
        notes: data.notes,
      },
      { onConflict: 'client_id,coach_id,week_of' }
    )
    .select()
    .single();

  if (error) throw error;
  return checkIn as ClientCheckIn;
}

/**
 * Submit a session log
 */
export async function submitSessionLog(
  supabase: SupabaseClient,
  coachId: string,
  clientId: string,
  coachSlug: string,
  data: {
    session_date: string;
    session_type: string;
    exercises: Array<{ name: string; sets: Array<{ weight?: number | string; reps?: number; rpe?: number }> }>;
    overall_effort?: number;
    win_of_day?: string;
    next_time_beat?: string;
    notes?: string;
  }
) {
  const { data: log, error } = await supabase
    .from('client_session_logs')
    .insert({
      coach_id: coachId,
      client_id: clientId,
      coach_slug: coachSlug,
      session_date: data.session_date,
      session_type: data.session_type,
      exercises: data.exercises,
      overall_effort: data.overall_effort,
      win_of_day: data.win_of_day,
      next_time_beat: data.next_time_beat,
      notes: data.notes,
    })
    .select()
    .single();

  if (error) throw error;
  return log as ClientSessionLog;
}

/**
 * Get all clients for a coach
 */
export async function getCoachClients(
  supabase: SupabaseClient,
  coachId: string
) {
  const { data, error } = await supabase
    .from('coach_client_relationships')
    .select('client_id')
    .eq('coach_id', coachId);

  if (error) throw error;
  return data.map((row: any) => row.client_id);
}

/**
 * Get latest check-in for a client
 */
export async function getLatestCheckIn(
  supabase: SupabaseClient,
  coachId: string,
  clientId: string
) {
  const { data, error } = await supabase
    .from('client_check_ins')
    .select('*')
    .eq('coach_id', coachId)
    .eq('client_id', clientId)
    .order('week_of', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return (data as ClientCheckIn) || null;
}

/**
 * Get check-in history for a client (last N weeks)
 */
export async function getCheckInHistory(
  supabase: SupabaseClient,
  coachId: string,
  clientId: string,
  weeks: number = 6
) {
  const { data, error } = await supabase
    .from('client_check_ins')
    .select('*')
    .eq('coach_id', coachId)
    .eq('client_id', clientId)
    .order('week_of', { ascending: false })
    .limit(weeks);

  if (error) throw error;
  return (data as ClientCheckIn[]) || [];
}

/**
 * Get session logs for a client in a date range
 */
export async function getSessionLogs(
  supabase: SupabaseClient,
  coachId: string,
  clientId: string,
  startDate: string,
  endDate: string
) {
  const { data, error } = await supabase
    .from('client_session_logs')
    .select('*')
    .eq('coach_id', coachId)
    .eq('client_id', clientId)
    .gte('session_date', startDate)
    .lte('session_date', endDate)
    .order('session_date', { ascending: false });

  if (error) throw error;
  return (data as ClientSessionLog[]) || [];
}

/**
 * Get check-in summary for coach dashboard (all clients)
 */
export async function getCoachCheckInDashboard(
  supabase: SupabaseClient,
  coachId: string
) {
  // Get all client relationships
  const { data: relationships, error: relError } = await supabase
    .from('coach_client_relationships')
    .select('client_id')
    .eq('coach_id', coachId);

  if (relError) throw relError;

  const clientIds = relationships.map((r: any) => r.client_id);

  if (clientIds.length === 0) return [];

  // Get profiles for client emails
  const { data: profiles, error: profError } = await supabase
    .from('profiles')
    .select('id, email')
    .in('id', clientIds);

  if (profError) throw profError;

  const profileMap = Object.fromEntries(profiles.map((p: any) => [p.id, p.email]));

  // Get latest check-in for each client + history
  const summaries: ClientCheckInSummary[] = [];

  for (const clientId of clientIds) {
    const latestCheckIn = await getLatestCheckIn(supabase, coachId, clientId);
    const history = await getCheckInHistory(supabase, coachId, clientId, 6);

    const daysSinceCheckIn = latestCheckIn
      ? Math.floor((Date.now() - new Date(latestCheckIn.submitted_at).getTime()) / (1000 * 60 * 60 * 24))
      : -1;

    const isOverdue = daysSinceCheckIn > 7;

    // Calculate trend
    const trend = {
      avg_sessions: history.length > 0 ? history.reduce((sum, c) => sum + c.sessions_completed, 0) / history.length : 0,
      avg_sleep: history.length > 0
        ? history.filter(c => c.sleep_hours).reduce((sum, c) => sum + (c.sleep_hours || 0), 0) / history.filter(c => c.sleep_hours).length
        : 0,
      most_common_miss_reason: getMostCommon(history.filter(c => c.missed_reason).map(c => c.missed_reason!)),
    };

    summaries.push({
      client_id: clientId,
      client_email: profileMap[clientId] || 'unknown',
      latest_check_in: latestCheckIn,
      days_since_check_in: daysSinceCheckIn,
      is_overdue: isOverdue,
      recent_check_ins: history,
      trend,
    });
  }

  return summaries;
}

/**
 * Helper: get most common string in array
 */
function getMostCommon(items: string[]): string | undefined {
  if (items.length === 0) return undefined;
  const counts: Record<string, number> = {};
  items.forEach(item => {
    counts[item] = (counts[item] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
}
