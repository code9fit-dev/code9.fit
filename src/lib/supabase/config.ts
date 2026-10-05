/**
 * Supabase configuration gate. Until a project is created and these env vars
 * are set, the app keeps running on the localStorage store (see store.ts).
 * The whole data-layer swap is gated on `isSupabaseConfigured()`.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
}
