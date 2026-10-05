import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Check if a user has access to a package
 * Cross-checks all access vectors:
 * 1. User tier (Premium grants all packages)
 * 2. Specific package purchase (from Lemon Squeezy)
 * 3. Coach grant (coach upgraded them to this package)
 */
export async function canAccessPackage(
  supabase: SupabaseClient,
  userId: string,
  packageId: string
): Promise<boolean> {
  if (!userId) return false;

  try {
    // 1. Check if user is Premium (has all packages)
    // Note: This assumes coach_tiers stores subscription tier
    // Adjust based on your actual tier structure
    const { data: tierData } = await supabase
      .from('coach_tiers')
      .select('tier')
      .eq('user_id', userId)
      .in('tier', ['Premium', 'Subscription']) // Both include packages
      .limit(1)
      .maybeSingle();

    if (tierData?.tier) return true; // User has subscription access

    // 2. Check if user has a coach grant for this package
    const { data: grant } = await supabase
      .from('coach_grants')
      .select('id')
      .eq('client_id', userId)
      .eq('package_id', packageId)
      .or(`expires_at.is.null,expires_at.gt.now()`) // No expiry or not expired
      .limit(1)
      .maybeSingle();

    if (grant) return true; // Coach granted access

    // 3. Check if user purchased this specific package
    // Note: You'll need to adjust this based on your Lemon Squeezy integration
    // For now, we'll return false as a placeholder
    // In production, check against your purchase table from Lemon Squeezy webhooks

    return false; // No access found
  } catch (error) {
    console.error('Failed to check package access:', error);
    return false;
  }
}

/**
 * Get all packages a user has access to
 */
export async function getAccessiblePackages(
  supabase: SupabaseClient,
  userId: string
): Promise<string[]> {
  if (!userId) return [];

  try {
    const packages: string[] = [];

    // 1. If Premium, return all packages (empty array = all)
    const { data: tierData } = await supabase
      .from('coach_tiers')
      .select('tier')
      .eq('user_id', userId)
      .in('tier', ['Premium', 'Subscription'])
      .limit(1)
      .maybeSingle();

    if (tierData?.tier) {
      // Premium gets all packages - return special indicator
      return ['*'];
    }

    // 2. Get all coach grants for this user
    const { data: grants } = await supabase
      .from('coach_grants')
      .select('package_id')
      .eq('client_id', userId)
      .or(`expires_at.is.null,expires_at.gt.now()`);

    if (grants) {
      packages.push(...grants.map((g) => g.package_id));
    }

    return packages;
  } catch (error) {
    console.error('Failed to get accessible packages:', error);
    return [];
  }
}
