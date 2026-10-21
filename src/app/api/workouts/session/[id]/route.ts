import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getWorkoutSession } from '@/lib/workouts/service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/workouts/session/:id
 * Fetch a workout session with planned exercises
 */
export async function GET(
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

    // Fetch session
    const session = await getWorkoutSession(supabase, sessionId);

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Verify ownership
    if (session.client_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Transform to expected format for WorkoutLoggingForm
    const response = {
      id: session.id,
      dayTitle: session.day ? `Day ${session.day}` : 'Workout',
      exercises: (session.exercises || []).map((ex) => ({
        name: ex.name,
        sets: ex.planned_sets,
        reps: ex.planned_reps,
        weight: ex.planned_weight,
        notes: ex.notes,
      })),
      isRestDay: false, // TODO: Determine based on program day type
      warmup: undefined,
      cooldown: undefined,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching workout session:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch session',
      },
      { status: 500 }
    );
  }
}
