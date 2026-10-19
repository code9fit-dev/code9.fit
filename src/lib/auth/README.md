# Authentication & Access Control System

Complete auth system for C9F web app with global auth state, coach assignment, and package gating.

## Architecture

### Components

1. **AuthProvider** (`context.tsx`)
   - Global auth state management with React Context
   - Handles user session, profile, tier, and coach data
   - Manages real-time auth state changes
   - Refetches user data when needed

2. **Auth Callback Handler** (`/src/app/auth/callback/page.tsx`)
   - Handles email confirmation redirects from Supabase
   - Routes first-time users to coach selection
   - Redirects returning users back to requested page

3. **Enhanced Login Page** (`/src/app/login/page.tsx`)
   - Supports `redirect` query parameter
   - Redirects users back to original location after login/signup
   - Passes redirect through to auth callback

4. **Coach Selection** (`/src/app/coach/select/page.tsx`)
   - Allows users to assign their first (or additional) coach
   - Shows available coaches with their tiers
   - Part of onboarding flow or accessible anytime

5. **Tier Management** (`tier.ts`)
   - Initialize user tiers on signup (defaults to "Free")
   - Get user's current tier(s)
   - Manage coach assignments
   - Upgrade user tiers

## Usage

### Setup

Wrap your app with `AuthProvider`:

```tsx
// src/app/layout.tsx
import { AuthProvider } from '@/lib/auth';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Using Auth Hooks

```tsx
'use client';

import { useAuth, useUserTier, useUserCoaches } from '@/lib/auth';

export function MyComponent() {
  // Get full auth context
  const { user, profile, isLoading, tier, coaches } = useAuth();

  // Or use specific hooks
  const { tier } = useUserTier();
  const { coaches } = useUserCoaches();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <div>Not authenticated</div>;

  return (
    <div>
      <h1>Welcome, {profile?.displayName || user.email}</h1>
      <p>Tier: {tier}</p>
      <p>Coaches: {coaches.length}</p>
    </div>
  );
}
```

### Checking Package Access

```tsx
import { usePackageAccess } from '@/lib/auth';

export function PackageContent({ packageId }) {
  const { hasAccess, isLoading } = usePackageAccess(packageId);

  if (isLoading) return <div>Checking access...</div>;

  if (!hasAccess) {
    return <div>You don't have access to this package</div>;
  }

  return <div>Premium content here</div>;
}
```

### Manual Access Checks

```tsx
import { hasAccessToCoach, getUserTier } from '@/lib/auth';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const supabase = getSupabaseBrowserClient();
const userId = 'user-id';

// Check if user has access to a specific coach
const hasAccess = await hasAccessToCoach(supabase, userId, 'fat-loss-architect');

// Get user's current tier
const tier = await getUserTier(supabase, userId);
```

## Auth Flow

### First-time User (Signup)

1. User signs up on `/login`
2. Supabase sends confirmation email
3. User clicks link → `/auth/callback?code=...`
4. Callback verifies email and redirects to `/coach/select?onboarding=true`
5. User selects a coach
6. User is assigned "Free" tier for selected coach
7. Redirect to `/onboarding` or requested page

### Returning User (Login)

1. User logs in on `/login`
2. Redirects to dashboard or requested page
3. Auth state is restored
4. Component queries for user's coaches/tier

### Coach Selection

Users can add additional coaches anytime via `/coach/select`
- Each coach gets their own tier entry
- Coaches start at "Free" tier by default
- Tiers can be upgraded via Lemon Squeezy webhook

## Database Schema

### coach_tiers

```sql
create table coach_tiers (
  id          uuid primary key,
  user_id     uuid references auth.users,
  coach_slug  text not null,
  tier        text not null,           -- Free | One-Time | Subscription | Premium
  unlocked_at timestamptz not null,
  unique (user_id, coach_slug)
);
```

Each user-coach pair has exactly one row with a tier level.

### coach_grants (Alternative Access)

Coaches can grant clients access to specific packages:

```sql
create table coach_grants (
  id            uuid primary key,
  coach_id      uuid references auth.users,
  client_id     uuid references auth.users,
  package_id    text not null,
  granted_at    timestamptz,
  expires_at    timestamptz,  -- null = lifetime
  unique (client_id, package_id, coach_id)
);
```

## Access Control

Users can access packages via:

1. **Admin Role** - Full access to everything
2. **User Tier** - Premium/Subscription tiers unlock all packages
3. **Coach Grants** - Individual packages granted by coaches
4. **Package Purchase** - Purchased via Lemon Squeezy (webhook creates coach_grants)

See `src/lib/packages/access.ts` for implementation.

## Tier Upgrade Flow

When user purchases a tier upgrade:

1. Lemon Squeezy webhook fires
2. Creates/updates `coach_grants` or updates `coach_tiers.tier`
3. Client-side auth context refetches data
4. PackageGate re-evaluates access

## Protected Routes

Use `useAuth()` to protect routes:

```tsx
'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  return <div>Protected content</div>;
}
```

## API Reference

### AuthProvider

Context provider component. Must wrap entire app.

```tsx
<AuthProvider>{children}</AuthProvider>
```

### useAuth()

Returns full auth context:

```tsx
{
  user: User | null,              // Supabase auth user
  profile: UserProfile | null,    // User profile from DB
  isLoading: boolean,             // Initial auth check in progress
  tier: string | null,            // Current tier (first coach)
  coaches: Coach[],               // All assigned coaches
  hasAccessTo: (packageId) => Promise<boolean>, // Check package access
  refetchUserData: () => Promise<void>, // Refresh user info
  signOut: () => Promise<void>,   // Sign out user
}
```

### useUserTier()

Returns just tier info:

```tsx
{ tier: string | null, isLoading: boolean }
```

### useUserCoaches()

Returns coaches list:

```tsx
{ coaches: Coach[], isLoading: boolean }
```

### usePackageAccess(packageId)

Check access to specific package:

```tsx
{ hasAccess: boolean | null, isLoading: boolean }
```

### Tier Functions

```tsx
// Initialize Free tier for new user
initializeUserTier(supabase, userId, coachSlug?)

// Get user's tier for a coach
getUserTier(supabase, userId, coachSlug?)

// Get all coaches for user
getUserCoaches(supabase, userId)

// Check if user has access to a coach
hasAccessToCoach(supabase, userId, coachSlug)

// Assign coach to user
assignCoachToUser(supabase, userId, coachSlug, tier?)

// Upgrade user's tier for a coach
upgradeUserTier(supabase, userId, coachSlug, newTier)
```

## Testing

### Test Signup Flow

1. Visit `/login`
2. Create new account with email
3. Click confirmation link in email
4. Should redirect to `/coach/select?onboarding=true`
5. Select a coach
6. Should be assigned "Free" tier
7. Redirect to `/onboarding` or dashboard

### Test Login with Redirect

1. Visit `/programs/some-program` (protected)
2. Should trigger PackageGate login redirect
3. Visit `/login?redirect=/programs/some-program`
4. Sign in
5. Should redirect back to `/programs/some-program`

### Test Coach Selection

1. Sign in as existing user
2. Visit `/coach/select`
3. Select a coach
4. Should be assigned to that coach with Free tier
5. New coach should appear in `useUserCoaches()`

## Common Issues

### "useAuth must be used within AuthProvider"

Make sure `AuthProvider` wraps the component using `useAuth()`. It should be in the root layout.

### Auth state not updating after signup

Check if `initializeUserTier()` is being called in the auth callback. Without it, new users have no coaches and the tier will be null.

### PackageGate not checking auth

Make sure PackageGate is wrapped inside AuthProvider. The component needs access to auth context to check tiers.

### Redirect not working after login

Check that:
1. Redirect parameter is passed to login: `/login?redirect=/path`
2. Redirect is a relative URL starting with `/`
3. URL is being properly encoded/decoded

## Schema Notes

- Each `coach_tiers` row represents a user-coach relationship
- Tiers are per-coach, so users can have different tiers for different coaches
- "Free" is the default tier for new user-coach pairs
- Webhook should update `coach_tiers.tier` or create `coach_grants` on purchase
