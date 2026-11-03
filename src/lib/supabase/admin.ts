import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, isSupabaseConfigured } from './config';

export function getSupabaseAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured() || !key) return null;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
}
