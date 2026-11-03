import { NextRequest, NextResponse } from 'next/server';
import { adminFrom } from '@/lib/admin/session';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!adminFrom(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  if (!UUID.test(id)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const db = getSupabaseAdminClient();
  if (!db) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });

  const { data, error } = await db.from('admin_workouts').select('id, status, draft').eq('id', id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!adminFrom(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  if (!UUID.test(id)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const db = getSupabaseAdminClient();
  if (!db) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });

  const { error } = await db.from('admin_workouts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
