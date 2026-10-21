import { NextRequest, NextResponse } from 'next/server';
import { seedKnowledgeBase } from '@/lib/knowledge-base/seed';
import { createClient } from '@supabase/supabase-js';

/**
 * Admin endpoint to seed the knowledge base.
 * POST /api/admin/seed-knowledge-base
 *
 * Requires Authorization header with admin token
 */
export async function POST(req: NextRequest) {
  try {
    // Verify admin (simple check - in production, use proper auth)
    const authHeader = req.headers.get('authorization');
    const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    // In production, verify this is an admin user via Supabase
    // For now, check against service role key as a simple gate
    const token = authHeader.substring(7);
    if (token !== adminKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const result = await seedKnowledgeBase();
    const { success: _, ...resultData } = result;

    return NextResponse.json(
      {
        success: true,
        message: 'Knowledge base seeded successfully',
        ...resultData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
