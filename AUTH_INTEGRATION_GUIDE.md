# Auth System Integration Guide

Complete guide to integrating the new auth system with existing C9F components.

## Quick Start

1. **AuthProvider is already wrapped in root layout** (`src/app/layout.tsx`)
   - All components can now use auth hooks
   - Auth state is global and persists across navigation

2. **Login flow improvements**:
   - Supports `?redirect=` parameter to return users to where they came from
   - Works with both password login and email signup
   - Email confirmation redirects to coach selection for new users

3. **New components ready to use**:
   - `/auth/callback` - Email confirmation handler
   - `/coach/select` - Coach selection/assignment page
   - Enhanced `PackageGate` - Includes redirect parameter

## Integration Points

### 1. Replace manual auth checks with hooks

**Before:**
```tsx
const { data: { user } } = await supabase.auth.getUser();
if (!user) router.push('/login');
```

**After:**
```tsx
import { useAuth } from '@/lib/auth';

const { user, isLoading } = useAuth();
if (!isLoading && !user) {
  router.push('/login?redirect=' + encodeURIComponent(pathname));
}
```

### 2. Update HeaderNav to show user tier

```tsx
import { useAuth } from '@/lib/auth';

export function HeaderNav() {
  const { profile, tier, coaches } = useAuth();

  return (
    <nav>
      {profile && (
        <>
          <span>{profile.displayName || profile.email}</span>
          <span className="text-xs">{tier} tier</span>
          {coaches.length > 0 && (
            <span>{coaches.length} coach{coaches.length !== 1 ? 'es' : ''}</span>
          )}
        </>
      )}
    </nav>
  );
}
```

### 3. Update profile page to show assigned coaches

```tsx
import { useAuth } from '@/lib/auth';

export function ProfilePage() {
  const { profile, coaches } = useAuth();

  return (
    <div>
      <h1>{profile?.displayName}</h1>
      <h2>Your Coaches</h2>
      <ul>
        {coaches.map((coach) => (
          <li key={coach.id}>
            {coach.name} - {coach.tier}
          </li>
        ))}
      </ul>
      <a href="/coach/select">Add Another Coach</a>
    </div>
  );
}
```

### 4. Update PackageGate usage (already enhanced)

The `PackageGate` component now automatically includes the current URL as a redirect parameter:

```tsx
// No changes needed! Just use it as before
import { PackageGate } from '@/components/PackageGate';

export function ProgramContent() {
  return (
    <PackageGate packageId="hybrid-intro-focus">
      <div>Premium program content</div>
    </PackageGate>
  );
}

// When user clicks "Sign in" on a gated program,
// they'll be redirected back after login
```

### 5. Update admin routes

```tsx
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AdminPage() {
  const { profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && profile?.role !== 'admin') {
      router.push('/');
    }
  }, [profile, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (profile?.role !== 'admin') return null;

  return <div>Admin dashboard</div>;
}
```

### 6. Update checkout to set tier

After successful Lemon Squeezy checkout:

```tsx
// Option 1: Use webhook (recommended)
// Lemon Squeezy webhook updates coach_tiers table
// Auth context automatically refetches

// Option 2: Manual update (if webhook not set up)
import { upgradeUserTier } from '@/lib/auth';

const success = await upgradeUserTier(
  supabase,
  userId,
  'fat-loss-architect',
  'Subscription'
);
```

### 7. Update onboarding to use auth context

```tsx
import { useAuth } from '@/lib/auth';

export function OnboardingFlow() {
  const { user, coaches, refetchUserData } = useAuth();

  // After form submission
  const handleComplete = async () => {
    // Save data
    // Then refetch to update coach assignments
    await refetchUserData();
  };
}
```

## New Routes

### Authentication Routes

- `/auth/callback` - Email confirmation handler (Supabase redirect target)
- `/login` - Login/signup page with redirect support
- `/coach/select` - Coach selection and assignment

### Protected Routes Pattern

```tsx
'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute() {
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

## Database Setup

The auth system uses existing tables:

### coach_tiers
- Stores user → coach → tier mapping
- Already in schema.sql
- One row per user-coach pair

### coach_grants
- Stores specific package grants (alternative to tiers)
- Already in schema.sql
- Used when coaches grant individual access

### profiles
- Stores user profile info
- Auto-created on signup by Supabase trigger
- Contains: id, email, display_name, role, created_at

No schema changes needed! Everything is already set up.

## Lemon Squeezy Integration

### Webhook Handler

Create a route to handle Lemon Squeezy webhooks:

```tsx
// src/app/api/webhooks/lemon-squeezy/route.ts
import { upgradeUserTier } from '@/lib/auth/tier';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const data = await req.json();
  const supabase = await getSupabaseServerClient();

  if (data.meta.event_name === 'order:created') {
    const { user_id, coach_slug, tier } = data.data.attributes.custom_data;
    
    await upgradeUserTier(supabase, user_id, coach_slug, tier);
    
    return new Response('OK', { status: 200 });
  }

  return new Response('OK', { status: 200 });
}
```

### Checkout Redirect

```tsx
// In checkout component
const handleCheckout = async (tier: 'One-Time' | 'Subscription' | 'Premium') => {
  const { user } = useAuth();
  
  // Pass tier info to Lemon Squeezy as custom data
  const customData = {
    user_id: user.id,
    coach_slug: 'fat-loss-architect',
    tier: tier,
  };

  // Redirect to Lemon Squeezy with custom data
  window.location.href = `https://lemonsqueezy.com/...?custom_data=${JSON.stringify(customData)}`;
};
```

## Testing Checklist

### Auth Flow

- [ ] New user signup works
- [ ] Email confirmation link works
- [ ] First-time user redirected to coach selection
- [ ] Coach selection creates tier entry
- [ ] Returning user login works
- [ ] Login redirect parameter works
- [ ] Email signup redirect parameter works

### Coach Management

- [ ] User can select coach on `/coach/select`
- [ ] Coach is assigned with Free tier
- [ ] Coach appears in `useUserCoaches()`
- [ ] User can add multiple coaches
- [ ] Each coach has independent tier

### Package Access

- [ ] PackageGate checks tier correctly
- [ ] Login redirect includes current path
- [ ] After login, user has expected access
- [ ] Admin tier grants all access
- [ ] Coach grants work

### Integration

- [ ] HeaderNav shows user info
- [ ] Protected routes redirect to login
- [ ] Profile page shows coaches
- [ ] Tier upgrade works (after checkout)
- [ ] refetchUserData() updates correctly

## Migration Checklist

### Phase 1: Enable Auth System (DONE)
- [x] Create AuthProvider
- [x] Create auth hooks
- [x] Create auth callback handler
- [x] Enhance login page
- [x] Create coach selection page

### Phase 2: Update Components
- [ ] Update HeaderNav to use auth hooks
- [ ] Update profile page to show coaches
- [ ] Update admin routes to check role
- [ ] Update protected routes to use useAuth

### Phase 3: Integration
- [ ] Set up Lemon Squeezy webhook
- [ ] Test end-to-end signup flow
- [ ] Test end-to-end upgrade flow
- [ ] Update onboarding to handle coach selection
- [ ] Remove old auth checks

### Phase 4: Polish
- [ ] Add error boundaries around auth
- [ ] Add loading states
- [ ] Test on mobile
- [ ] Update docs

## Common Patterns

### Protecting a page

```tsx
'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [user, isLoading, router]);

  if (isLoading) return <Skeleton />;
  if (!user) return null;

  return <Content />;
}
```

### Checking tier in component

```tsx
import { useUserTier } from '@/lib/auth';

export function TierGate() {
  const { tier, isLoading } = useUserTier();

  if (isLoading) return <Skeleton />;

  if (tier === 'Premium' || tier === 'Subscription') {
    return <PremiumContent />;
  }

  return <FreeContent />;
}
```

### Checking specific coach access

```tsx
import { useAuth } from '@/lib/auth';

export function CoachGate({ coachSlug }) {
  const { coaches, isLoading } = useAuth();

  const hasCoach = coaches.some((c) => c.slug === coachSlug);

  if (isLoading) return <Skeleton />;
  if (!hasCoach) return <div>Coach not assigned</div>;

  return <CoachContent />;
}
```

### Manual access check in async function

```tsx
import { useAuth } from '@/lib/auth';

export function MyComponent() {
  const { hasAccessTo } = useAuth();

  const handleClick = async () => {
    const access = await hasAccessTo('hybrid-intro-focus');
    if (access) {
      // Show content
    } else {
      // Show upsell
    }
  };

  return <button onClick={handleClick}>Check Access</button>;
}
```

## Troubleshooting

### "useAuth must be used within an AuthProvider"

This means a component is using `useAuth()` but AuthProvider isn't in its tree.

**Fix**: Make sure AuthProvider wraps the component. It's in root layout, so this shouldn't happen unless AuthProvider was removed.

### User is null immediately after signup

This is normal — email confirmation hasn't been verified yet. Once user clicks email link, they'll be authenticated.

### Tier is null for existing user

This means no coach is assigned. Call `initializeUserTier()` or visit `/coach/select`.

### PackageGate not checking auth

Make sure:
1. Supabase is configured (env vars set)
2. AuthProvider wraps the component
3. User is actually logged in

### Redirect loop on login

Make sure redirect parameter doesn't point to `/login` itself.

## API Documentation

See `/src/lib/auth/README.md` for complete API reference.
