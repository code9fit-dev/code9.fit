import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Check if a user is an admin
 * Admins have full access to all site features and programs
 */
export async function isUserAdmin(
  supabase: SupabaseClient,
  userId: string
): Promise<boolean> {
  if (!userId) return false;

  try {
    // Check if user has admin role in the profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .limit(1)
      .maybeSingle();

    return profile?.role === 'admin';
  } catch (error) {
    console.error('Failed to check admin status:', error);
    return false;
  }
}
