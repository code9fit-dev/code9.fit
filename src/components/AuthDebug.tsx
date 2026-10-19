'use client';

/**
 * Debug component to display current auth state
 * Remove or hide in production
 */

import { useAuth } from '@/lib/auth';

export function AuthDebug() {
  const { user, profile, isLoading, tier, coaches, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="rounded border border-stone-300 bg-stone-50 p-4 text-xs text-stone-600">
        <p>Loading auth state...</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-stone-300 bg-stone-50 p-4 text-xs font-mono">
      <div className="space-y-2">
        <div>
          <span className="font-bold">User:</span>{' '}
          {user ? `${user.email} (${user.id.slice(0, 8)}...)` : 'Not logged in'}
        </div>
        <div>
          <span className="font-bold">Profile:</span> {profile ? profile.displayName || profile.email : 'None'}
        </div>
        <div>
          <span className="font-bold">Tier:</span> {tier || 'None'}
        </div>
        <div>
          <span className="font-bold">Coaches:</span> {coaches.length > 0 ? coaches.map((c) => c.slug).join(', ') : 'None'}
        </div>
        <div>
          <span className="font-bold">Role:</span> {profile?.role || 'None'}
        </div>
        {user && (
          <button
            onClick={() => signOut()}
            className="mt-3 rounded bg-stone-300 px-2 py-1 hover:bg-stone-400"
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}
