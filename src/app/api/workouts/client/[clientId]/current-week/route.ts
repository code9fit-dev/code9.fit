import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getClientCurrentWeek } from '@/lib/workouts/service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/workouts/client/:clientId/current-week
 * Get this week's workouts + current status for a client
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

    // Verify access (user can only access own data)
    if (user.id !== clientId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const sessions = await getClientCurrentWeek(supabase, clientId);

    return NextResponse.json({
      success: true,
      week: {
        start_date: new Date().toISOString().split('T')[0],
        sessions: sessions,
      },
    });
  } catch (error) {
    console.error('Error fetching current week:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch current week',
      },
      { status: 500 }
    );
  }
}
