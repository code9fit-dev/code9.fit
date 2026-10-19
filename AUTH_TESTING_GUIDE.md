# Auth System Testing Guide

Complete guide to testing the authentication and access control system end-to-end.

## Prerequisites

1. Supabase project is set up with:
   - `NEXT_PUBLIC_SUPABASE_URL` env var
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` env var
2. Email confirmation is enabled in Supabase auth settings
3. Database schema has been applied (run `supabase/schema.sql`)
4. Dev server is running: `npm run dev`

## Test Scenarios

### Scenario 1: First-Time User Signup Flow

**Objective**: User signs up, verifies email, selects coach, and gets assigned Free tier.

**Steps**:

1. Open browser to `http://localhost:3000/login`
2. Click "Create new account"
3. Enter test email: `test-user-1@example.com`
4. Enter password: `TestPassword123!`
5. Click "Create new account"
6. Should redirect to `/onboarding`
7. Open Supabase email test (or check email inbox)
8. Click "Confirm your email" link in email
9. Should redirect to `/auth/callback`
10. Should show loading spinner briefly
11. Should redirect to `/coach/select?onboarding=true`
12. Click "Select" on any coach (e.g., "Fat Loss Architect")
13. Should show "Assigning..." then redirect to `/onboarding`

**Expected Results**:

- New profile row created in Supabase with email
- `coach_tiers` row created with tier="Free"
- User is authenticated and in session
- Coach appears in `useUserCoaches()`

**Debug**:

1. Check browser console for errors
2. Check Supabase logs for RLS issues
3. Use `AuthDebug` component to verify state
4. Check Supabase `profiles` table for user record
5. Check Supabase `coach_tiers` table for coach assignment

---

### Scenario 2: Login with Redirect

**Objective**: User is redirected to login, then back to original page after signin.

**Steps**:

1. Open browser to `http://localhost:3000/programs/some-program`
   (or any page with PackageGate component)
2. Scroll down past 15% of content
3. See "Unlock full program details" prompt
4. Click "Sign in"
5. Should redirect to `/login?redirect=/programs/some-program`
6. Sign in with existing account from Scenario 1
7. Should redirect back to `/programs/some-program`

**Expected Results**:

- Login page shows correct error messages
- Redirect parameter is preserved
- User is redirected back to original page after login
- PackageGate re-evaluates access and shows content

**Debug**:

1. Check URL contains `redirect=` parameter
2. Check browser console for redirect logic
3. Verify user session is active
4. Check PackageGate access check in network tab

---

### Scenario 3: Coach Selection Flow

**Objective**: User can add additional coaches anytime.

**Steps**:

1. Sign in as existing user from Scenario 1
2. Navigate to `/coach/select`
3. Click "Select" on a different coach
4. Should show "Assigning..." and redirect to dashboard
5. View `useUserCoaches()` state - should show 2 coaches

**Expected Results**:

- New `coach_tiers` row created for second coach
- Both coaches appear in `useUserCoaches()`
- Each coach has independent tier ("Free")
- User can add multiple coaches

**Debug**:

1. Query Supabase `coach_tiers` table for user_id
2. Should have 2+ rows with same user_id, different coach_slug
3. Check network tab for successful coach assignment API call

---

### Scenario 4: Tier Upgrade Flow

**Objective**: Coach grants access or user purchases tier upgrade.

**Steps**:

1. Sign in as user from Scenario 1
2. Manually update `coach_tiers` tier in Supabase:
   ```sql
   UPDATE coach_tiers
   SET tier = 'Subscription'
   WHERE user_id = '[user-id]' AND coach_slug = 'fat-loss-architect';
   ```
3. Refresh browser
4. `useUserTier()` should show "Subscription"
5. `canAccessPackage()` should return true for any package

**Expected Results**:

- Tier updates in real-time or after refresh
- `useAuth()` refetches data
- PackageGate recognizes new tier
- Premium content becomes accessible

**Debug**:

1. Check Supabase `coach_tiers` table for tier value
2. Use `AuthDebug` component to verify tier
3. Check PackageGate access logic in `src/lib/packages/access.ts`

---

### Scenario 5: Protected Route

**Objective**: Unauthenticated user is redirected to login when accessing protected route.

**Steps**:

1. Sign out all sessions
2. Navigate to `http://localhost:3000/dashboard`
3. Should redirect to `/login?redirect=/dashboard`
4. Sign in
5. Should redirect back to `/dashboard`

**Expected Results**:

- Unauthenticated users cannot access protected routes
- Redirect parameter preserves original destination
- After login, user returns to original page

**Debug**:

1. Check component uses `useAuth()` to protect route
2. Verify redirect URL is properly encoded
3. Check auth context is initialized

---

### Scenario 6: Admin Access

**Objective**: Admin users have full access to everything.

**Steps**:

1. Manually update profile in Supabase:
   ```sql
   UPDATE profiles
   SET role = 'admin'
   WHERE id = '[user-id]';
   ```
2. Refresh browser
3. `useAuth()` profile.role should be 'admin'
4. `canAccessPackage()` should return true for all packages
5. Admin pages should be accessible

**Expected Results**:

- Admin flag is recognized
- Admin has access to all packages
- Admin pages render without gating

**Debug**:

1. Check `profiles` table role field
2. Verify `isUserAdmin()` function works
3. Check PackageGate logic for admin check

---

### Scenario 7: Coach Grants

**Objective**: Coach can grant specific package access to client.

**Steps**:

1. Create `coach_grants` entry in Supabase:
   ```sql
   INSERT INTO coach_grants (coach_id, client_id, package_id, granted_at, expires_at)
   VALUES (
     '[coach-user-id]',
     '[client-user-id]',
     'hybrid-intro-focus',
     now(),
     null  -- lifetime access
   );
   ```
2. User refreshes or signs in
3. `canAccessPackage('hybrid-intro-focus')` should return true
4. Package should be accessible via PackageGate

**Expected Results**:

- Coach grants work independently of tiers
- Multiple coaches can grant access to same user
- Access can be time-limited or lifetime

**Debug**:

1. Check `coach_grants` table for entry
2. Verify grant is not expired
3. Check `canAccessPackage()` logic for coach_grants

---

## Manual Testing Checklist

### Auth State

- [ ] User can sign up with email/password
- [ ] Email confirmation link works
- [ ] User can login with email/password
- [ ] User can logout
- [ ] Auth state persists on page refresh
- [ ] Auth state clears after logout

### Coach Assignment

- [ ] New users are prompted to select coach
- [ ] Coach selection creates tier entry
- [ ] Users can add multiple coaches
- [ ] Coach data is fetched correctly
- [ ] Coach list shows in profile

### Tier & Access

- [ ] Free tier users see correct content
- [ ] Tier upgrades grant new access
- [ ] Admin users have full access
- [ ] Coach grants work
- [ ] Expired grants deny access
- [ ] Multiple access vectors work together

### Redirects

- [ ] PackageGate login includes redirect parameter
- [ ] Login form accepts redirect parameter
- [ ] Signup respects redirect parameter
- [ ] Auth callback respects redirect parameter
- [ ] Invalid redirect URLs are rejected
- [ ] Redirect works across multiple hops

### UI/UX

- [ ] Loading states display correctly
- [ ] Error messages are clear
- [ ] Buttons are properly disabled during loading
- [ ] Forms validate before submission
- [ ] User info displays in header
- [ ] No console errors

### Performance

- [ ] Auth state loads quickly on mount
- [ ] ProfileGate access checks are fast
- [ ] No unnecessary re-renders
- [ ] Supabase queries are efficient

---

## Automated Tests (TODO)

```tsx
// Example test structure
describe('Auth System', () => {
  describe('Signup Flow', () => {
    test('New user can signup and select coach', async () => {
      // 1. Navigate to login
      // 2. Fill signup form
      // 3. Verify email redirect works
      // 4. Select coach
      // 5. Verify coach assignment
    });
  });

  describe('Auth Hooks', () => {
    test('useAuth() returns correct initial state', () => {
      // Render component with AuthProvider
      // Check initial state
    });

    test('useUserCoaches() returns assigned coaches', () => {
      // Sign in user
      // Get coaches
      // Verify list
    });

    test('usePackageAccess() checks access correctly', async () => {
      // Check access before tier
      // Upgrade tier
      // Check access after tier
    });
  });

  describe('Protected Routes', () => {
    test('Unauthenticated users are redirected to login', () => {
      // Navigate to protected route
      // Verify redirect to login
      // Check redirect parameter
    });
  });
});
```

---

## Troubleshooting

### "Supabase not configured"

**Cause**: Environment variables not set

**Fix**:
```bash
echo "NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key" >> .env.local
npm run dev
```

### "User not found" after email confirmation

**Cause**: Email confirmation didn't exchange code for session

**Fix**:
1. Check browser console for errors
2. Check Supabase logs
3. Verify email was actually confirmed
4. Try confirming again

### "useAuth must be used within AuthProvider"

**Cause**: Component using hook isn't wrapped by AuthProvider

**Fix**: Ensure AuthProvider wraps the component tree (it should be in root layout)

### Tier is null after signup

**Cause**: Coach not assigned

**Fix**: Call `/coach/select` or `initializeUserTier()` manually

### Access not checking correctly

**Cause**: Supabase queries failing silently

**Fix**:
1. Check Supabase RLS policies
2. Check user is actually authenticated
3. Check profile row exists
4. Check coach_tiers row exists

### Redirect loop

**Cause**: Redirect parameter points back to login

**Fix**: Ensure redirect URL is not `/login` or contains login in path

---

## Performance Testing

### Load Testing

```bash
# Test concurrent users
npm run dev &
# Use artillery or k6 to simulate users
```

### Query Performance

Check Supabase logs for slow queries:
1. Sign in as user
2. Check Network tab in DevTools
3. Look for slow requests
4. Optimize queries if needed

### Memory Usage

Check if auth context causes memory leaks:
1. Navigate between pages
2. Check memory usage in DevTools
3. Sign in/out multiple times
4. Verify no memory growth

---

## Production Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] No console errors
- [ ] Error boundaries added
- [ ] Email confirmation is working
- [ ] Supabase RLS policies reviewed
- [ ] Admin user created
- [ ] Webhook handler configured (for tier upgrades)
- [ ] Rate limiting configured
- [ ] Audit logs enabled
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Performance monitoring enabled
- [ ] Database backups configured

---

## Quick Debugging

### View current auth state

Add `<AuthDebug />` component to page temporarily:

```tsx
import { AuthDebug } from '@/components/AuthDebug';

export default function Page() {
  return (
    <div>
      <AuthDebug />
      {/* Page content */}
    </div>
  );
}
```

### Check Supabase state

```tsx
// In browser console
const { getSupabaseBrowserClient } = await import('@/lib/supabase/client');
const supabase = getSupabaseBrowserClient();
const { data: { user } } = await supabase.auth.getUser();
console.log(user);
const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id);
console.log(profile);
```

### Check network requests

1. Open DevTools Network tab
2. Filter by `coach_tiers`, `profiles`, etc.
3. Check request/response
4. Verify status code 200/201

### Enable debug logging

```tsx
// In auth context
console.log('Auth state changed:', user?.email);
console.log('Coaches:', coaches);
console.log('Tier:', tier);
```
