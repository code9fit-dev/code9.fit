import { getSupabaseServerClient } from '@/lib/supabase/server';
import { markSessionMissed, getWorkoutSession } from '@/lib/workouts/service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/workouts/session/:id/miss
 * Mark a workout session as missed with reason
 *
 * Body:
 * {
 *   reason?: string; // sick | tired | busy | injury | other
 *   details?: string;
 *   on_hold_until?: string; // YYYY-MM-DD date to resume
 * }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sessionId } = await params;
    const supabase = await getSupabaseServerClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 503 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify ownership
    const session = await getWorkoutSession(supabase, sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if (session.client_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json() as {
      reason?: string;
      details?: string;
      on_hold_until?: string;
    };

    await markSessionMissed(supabase, sessionId, body);

    // Fetch full session
    const fullSession = await getWorkoutSession(supabase, sessionId);

    return NextResponse.json({
      success: true,
      session: fullSession,
    });
  } catch (error) {
    console.error('Error marking session missed:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to mark session missed',
      },
      { status: 500 }
    );
  }
}
