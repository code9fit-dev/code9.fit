import { NextRequest, NextResponse } from 'next/server';
import { adminFrom } from '@/lib/admin/session';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import { validateDraft, type DraftProgram } from '@/lib/workout-builder/draft';

export const dynamic = 'force-dynamic';

function notConfigured() {
  return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
}

export async function GET(req: NextRequest) {
  if (!adminFrom(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getSupabaseAdminClient();
  if (!db) return notConfigured();

  const { data, error } = await db
    .from('admin_workouts')
    .select('id, title, program_id, status, saved_at')
    .order('saved_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ workouts: data });
}

export async function POST(req: NextRequest) {
  if (!adminFrom(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getSupabaseAdminClient();
  if (!db) return notConfigured();

  const body = (await req.json().catch(() => null)) as { id?: string; mode?: 'day' | 'full'; draft?: DraftProgram } | null;
  if (!body?.draft || (body.mode !== 'day' && body.mode !== 'full')) {
    return NextResponse.json({ error: 'Invalid save request' }, { status: 400 });
  }

  const draft = body.draft;
  if (body.mode === 'full') {
    const problems = validateDraft(draft);
    if (problems.length) return NextResponse.json({ error: problems.join(' ') }, { status: 400 });
  } else if (!draft.title.trim() || !draft.id.trim()) {
    return NextResponse.json({ error: 'Give the workout a title and id before saving' }, { status: 400 });
  }

  const row = {
    title: draft.title || 'Untitled workout',
    program_id: draft.id || 'untitled',
    status: body.mode === 'full' ? 'complete' : 'draft',
    draft,
    saved_at: new Date().toISOString(),
  };

  const query = body.id
    ? db.from('admin_workouts').update(row).eq('id', body.id).select('id, status').single()
    : db.from('admin_workouts').insert(row).select('id, status').single();
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id, status: data.status });
}
