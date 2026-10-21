import { getSupabaseServerClient } from '@/lib/supabase/server';
import { completeWorkoutSession, getWorkoutSession } from '@/lib/workouts/service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/workouts/session/:id/complete
 * Mark a workout session as complete with exercises and feelings
 *
 * Body:
 * {
 *   exercises?: Array<{
 *     id?: string; // existing exercise ID
 *     name: string;
 *     actual_sets?: number;
 *     actual_reps?: number;
 *     actual_weight?: number;
 *     notes?: string;
 *   }>;
 *   energy_level?: number; // 1-10
 *   soreness?: number; // 1-10
 *   mood?: number; // 1-10
 *   sleep_hours?: number;
 *   sleep_quality?: number; // 1-10
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
    };

    const updated = await completeWorkoutSession(supabase, sessionId, body);

    // Fetch full session with all related data
    const fullSession = await getWorkoutSession(supabase, sessionId);

    return NextResponse.json({
      success: true,
      session: fullSession,
    });
  } catch (error) {
    console.error('Error completing workout session:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to complete session',
      },
      { status: 500 }
    );
  }
}
