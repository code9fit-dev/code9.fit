import { getSupabaseServerClient } from '@/lib/supabase/server';
import { createWorkoutSession, addSessionExercises } from '@/lib/workouts/service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/workouts/session/create
 * Create a new workout session with optional exercises
 *
 * Body:
 * {
 *   program_id: string;
 *   week?: number;
 *   day?: number;
 *   planned_date: string; // YYYY-MM-DD
 *   exercises?: Array<{
 *     name: string;
 *     planned_sets?: number;
 *     planned_reps?: number;
 *     planned_weight?: number;
 *   }>;
 * }
 */
export async function POST(req: NextRequest) {
  try {
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

    const body = await req.json() as {
      program_id: string;
      week?: number;
      day?: number;
      planned_date: string;
      exercises?: Array<{
        name: string;
        planned_sets?: number;
        planned_reps?: number;
        planned_weight?: number;
      }>;
    };

    // Validate required fields
    if (!body.program_id || !body.planned_date) {
      return NextResponse.json(
        { error: 'Missing required fields: program_id, planned_date' },
        { status: 400 }
      );
    }

    // Create session
    const session = await createWorkoutSession(supabase, user.id, body.program_id, {
      week: body.week,
      day: body.day,
      planned_date: body.planned_date,
    });

    // Add exercises if provided
    let exercises: any[] = [];
    if (body.exercises && body.exercises.length > 0) {
      exercises = await addSessionExercises(supabase, session.id, body.exercises);
    }

    return NextResponse.json(
      {
        success: true,
        session,
        exercises,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating workout session:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create session',
      },
      { status: 500 }
    );
  }
}
