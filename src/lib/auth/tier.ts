import { SupabaseClient } from '@supabase/supabase-js';
import type { Coach } from './types';

/**
 * Initialize user tier on signup (create Free tier entry)
 */
export async function initializeUserTier(
  supabase: SupabaseClient,
  userId: string,
  coachSlug: string = 'lifestyle-recovery-coach'
): Promise<boolean> {
  try {
    // Check if tier already exists
    const { data: existing } = await supabase
      .from('coach_tiers')
      .select('id')
      .eq('user_id', userId)
      .eq('coach_slug', coachSlug)
      .maybeSingle();

    if (existing) {
      return true; // Already exists
    }

    // Create Free tier entry
    const { error } = await supabase
      .from('coach_tiers')
      .insert({
        user_id: userId,
        coach_slug: coachSlug,
        tier: 'Free',
        unlocked_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to initialize user tier:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error initializing user tier:', error);
    return false;
  }
}

/**
 * Get user's current tier(s) for a specific coach
 */
export async function getUserTier(
  supabase: SupabaseClient,
  userId: string,
  coachSlug?: string
): Promise<string | null> {
  try {
    let query = supabase
      .from('coach_tiers')
      .select('tier')
      .eq('user_id', userId);

    if (coachSlug) {
      query = query.eq('coach_slug', coachSlug);
    }

    const { data, error } = await query.order('unlocked_at', { ascending: false }).limit(1);

    if (error) {
      console.error('Failed to get user tier:', error);
      return null;
    }

    return data && data.length > 0 ? data[0].tier : null;
  } catch (error) {
    console.error('Error getting user tier:', error);
    return null;
  }
}

/**
 * Get all coaches assigned to a user with their tiers
 */
export async function getUserCoaches(
  supabase: SupabaseClient,
  userId: string
): Promise<Coach[]> {
  try {
    const { data, error } = await supabase
      .from('coach_tiers')
      .select('coach_slug, tier, unlocked_at')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false });

    if (error) {
      console.error('Failed to get user coaches:', error);
      return [];
    }

    // Map to Coach objects
    return (data || []).map((row) => ({
      id: `${userId}-${row.coach_slug}`,
      slug: row.coach_slug,
      name: formatCoachName(row.coach_slug),
      tier: row.tier,
      unlockedAt: row.unlocked_at,
    }));
  } catch (error) {
    console.error('Error getting user coaches:', error);
    return [];
  }
}

/**
 * Check if user has access to a specific coach/program
 */
export async function hasAccessToCoach(
  supabase: SupabaseClient,
  userId: string,
  coachSlug: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('coach_tiers')
      .select('id')
      .eq('user_id', userId)
      .eq('coach_slug', coachSlug)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Failed to check coach access:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking coach access:', error);
    return false;
  }
}

/**
 * Assign a coach to a user (typically called after coach selection)
 */
export async function assignCoachToUser(
  supabase: SupabaseClient,
  userId: string,
  coachSlug: string,
  tier: string = 'Free'
): Promise<boolean> {
  try {
    // Check if already assigned
    const { data: existing } = await supabase
      .from('coach_tiers')
      .select('id')
      .eq('user_id', userId)
      .eq('coach_slug', coachSlug)
      .maybeSingle();

    if (existing) {
      return true; // Already assigned
    }

    const { error } = await supabase
      .from('coach_tiers')
      .insert({
        user_id: userId,
        coach_slug: coachSlug,
        tier: tier,
        unlocked_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to assign coach:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error assigning coach:', error);
    return false;
  }
}

/**
 * Upgrade user tier for a coach
 */
export async function upgradeUserTier(
  supabase: SupabaseClient,
  userId: string,
  coachSlug: string,
  newTier: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('coach_tiers')
      .update({
        tier: newTier,
        unlocked_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('coach_slug', coachSlug);

    if (error) {
      console.error('Failed to upgrade user tier:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error upgrading user tier:', error);
    return false;
  }
}

/**
 * Format coach slug into readable name
 */
function formatCoachName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
