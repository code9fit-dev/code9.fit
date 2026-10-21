import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getDashboardProgress } from '@/lib/workouts/analytics';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/workouts/client/:clientId/progress
 * Get progress overview for dashboard (current week + overall stats)
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

    const progress = await getDashboardProgress(supabase, clientId);

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch progress',
      },
      { status: 500 }
    );
  }
}
