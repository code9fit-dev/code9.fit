import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getUserTier, getUserCoaches, hasAccessToCoach } from '@/lib/auth/tier';
import { canAccessPackage } from '@/lib/packages/access';
import type { UserProfile } from '@/lib/auth/types';

/**
 * Get the current user on the server
 */
export async function getServerUser() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Failed to get server user:', error);
    return null;
  }
}

/**
 * Get the current user's profile on the server
 */
export async function getServerUserProfile() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const user = await getServerUser();
  if (!user) return null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, display_name, role, created_at')
      .eq('id', user.id)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Failed to get user profile:', error);
      return null;
    }

    if (data) {
      return {
        id: data.id,
        email: data.email,
        displayName: data.display_name,
        role: data.role,
        createdAt: data.created_at,
      } as UserProfile;
    }

    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

/**
 * Get user's tier on the server
 */
export async function getServerUserTier(coachSlug?: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const user = await getServerUser();
  if (!user) return null;

  return getUserTier(supabase, user.id, coachSlug);
}

/**
 * Get user's coaches on the server
 */
export async function getServerUserCoaches() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];

  const user = await getServerUser();
  if (!user) return [];

  return getUserCoaches(supabase, user.id);
}

/**
 * Check if user has access to a coach on the server
 */
export async function getServerUserHasCoachAccess(coachSlug: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return false;

  const user = await getServerUser();
  if (!user) return false;

  return hasAccessToCoach(supabase, user.id, coachSlug);
}

/**
 * Check if user has access to a package on the server
 */
export async function getServerUserHasPackageAccess(packageId: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return false;

  const user = await getServerUser();
  if (!user) return false;

  return canAccessPackage(supabase, user.id, packageId);
}

/**
 * Redirect to login with the current path as the redirect parameter
 * Useful in server components that need auth
 */
export function getLoginRedirectUrl(currentPath: string): string {
  return `/login?redirect=${encodeURIComponent(currentPath)}`;
}
