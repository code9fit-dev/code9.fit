import { getSupabaseServerClient } from '@/lib/supabase/server';
import { generateProgressSummary } from '@/lib/workouts/analytics';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/workouts/client/:clientId/summary?program_id=X&week=3
 * Get 3/6/9 week summaries
 *
 * Query params:
 * - program_id: string (required)
 * - week: number (required) - milestone week (3, 6, 9, etc)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  try {
    const { clientId } = await params;
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

    // Verify access
    if (user.id !== clientId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get query params
    const { searchParams } = new URL(req.url);
    const programId = searchParams.get('program_id');
    const weekStr = searchParams.get('week');

    if (!programId || !weekStr) {
      return NextResponse.json(
        { error: 'Missing required query params: program_id, week' },
        { status: 400 }
      );
    }

    const week = parseInt(weekStr, 10);
    if (isNaN(week) || week < 1) {
      return NextResponse.json(
        { error: 'Invalid week number' },
        { status: 400 }
      );
    }

    const summary = await generateProgressSummary(
      supabase,
      clientId,
      programId,
      week
    );

    if (!summary) {
      return NextResponse.json(
        { error: 'No data available for summary' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate summary',
      },
      { status: 500 }
    );
  }
}
