# C9F Testing Checklist - Complete System

**Date Started:** 2026-10-21  
**Tested By:** User  
**Status:** IN PROGRESS

---

## Phase 1: Authentication Flows ✓ Ready to Test

### Test 1.1: Signup Flow
**Steps:**
1. Go to http://localhost:3000/login
2. Enter email: `test-user-1@example.com`
3. Enter password: `Test123!@#`
4. Click "Create new account"
5. Should see success message or redirect to onboarding

**Expected Results:**
- [ ] Form accepts email and password
- [ ] Signup button is clickable
- [ ] No immediate error about email confirmation
- [ ] User should be able to proceed

**Issues Found:**
_None yet_

---

### Test 1.2: Email Verification (Simulated)
**Steps:**
1. Check Supabase Auth > Users for the test user
2. Note the email confirmation token
3. Manually construct verification URL or use Supabase link
4. Should auto-redirect to coach selection

**Expected Results:**
- [ ] Email verification works
- [ ] User redirected to `/coach/select?onboarding=true`
- [ ] Coach selection page loads

**Issues Found:**
_None yet_

---

### Test 1.3: Coach Selection on Signup
**Steps:**
1. After email verification, user lands on `/coach/select`
2. Should see list of coaches (or at minimum one default coach)
3. Select a coach
4. Should be assigned Free tier
5. Redirected to dashboard/onboarding

**Expected Results:**
- [ ] Coach list loads
- [ ] Can select a coach
- [ ] Free tier automatically assigned
- [ ] Auth context updates with coach assignment

**Issues Found:**
_None yet_

---

### Test 1.4: Login Flow
**Steps:**
1. Go to http://localhost:3000/login
2. Enter email: `test-user-1@example.com`
3. Enter password: `Test123!@#`
4. Click "Sign in"
5. Should redirect to dashboard

**Expected Results:**
- [ ] Login succeeds
- [ ] Redirect to dashboard
- [ ] Auth context loads user profile and tier
- [ ] User sees their coach assignment

**Issues Found:**
_None yet_

---

### Test 1.5: Login with Redirect Parameter
**Steps:**
1. Go to http://localhost:3000/login?redirect=/programs/hybrid-base-4day
2. Log in with valid credentials
3. Should redirect back to `/programs/hybrid-base-4day` NOT to dashboard

**Expected Results:**
- [ ] Redirect parameter is preserved
- [ ] After login, user goes to specified URL
- [ ] Not redirected to dashboard instead

**Issues Found:**
_None yet_

---

## Phase 2: Program Access & Gating ✓ Ready to Test

### Test 2.1: Free Program Access (Logged In)
**Steps:**
1. Log in as test user
2. Navigate to a FREE program: `/programs/fat-to-fit-foundations-home`
3. Should see full program details

**Expected Results:**
- [ ] Program page loads
- [ ] No blur/overlay on content
- [ ] Full program visible
- [ ] START NOW button present

**Issues Found:**
_None yet_

---

### Test 2.2: Paid Program Gating (Logged In, No Access)
**Steps:**
1. Log in as test user with Free tier
2. Navigate to a PAID program: `/programs/hybrid-base-4day`
3. Should see blurred content with unlock prompt

**Expected Results:**
- [ ] Program overview visible
- [ ] Content is progressively blurred as user scrolls
- [ ] "Unlock full program details" popup appears
- [ ] "Sign in" button visible with redirect parameter

**Issues Found:**
_None yet_

---

### Test 2.3: Paid Program Access with Proper Tier
**Steps:**
1. In Supabase, manually update test user's coach_tiers to Premium
2. Refresh the program page
3. Should now see full content

**Expected Results:**
- [ ] Content blur disappears
- [ ] Full program details visible
- [ ] No unlock prompts

**Issues Found:**
_None yet_

---

### Test 2.4: Admin Full Access
**Steps:**
1. In Supabase, create test-admin user with role='admin'
2. Log in as admin
3. Navigate to any paid program
4. Should see full content without tier requirements

**Expected Results:**
- [ ] Admin sees all content
- [ ] No blur/gating
- [ ] Full access to Premium features
- [ ] START NOW button routes to coach selection (not checkout)

**Issues Found:**
_None yet_

---

### Test 2.5: Unauthenticated Access to Paid Program
**Steps:**
1. Log out completely
2. Navigate to `/programs/hybrid-base-4day`
3. Should see blurred content
4. Click "Sign in" button

**Expected Results:**
- [ ] Content is blurred
- [ ] "Sign in" button has redirect parameter: `?redirect=/programs/hybrid-base-4day`
- [ ] After login, user returns to program page

**Issues Found:**
_None yet_

---

## Phase 3: START NOW Button Behavior

### Test 3.1: START NOW - Not Logged In
**Steps:**
1. Unauthenticated user on `/programs/hybrid-base-4day`
2. Click START NOW button
3. Should redirect to login

**Expected Results:**
- [ ] Redirected to `/login`
- [ ] After login, returned to program
- [ ] Can proceed to coach/checkout flow

**Issues Found:**
_None yet_

---

### Test 3.2: START NOW - Free Tier, Free Program
**Steps:**
1. Logged in as Free tier user
2. On a FREE program page
3. Click START NOW

**Expected Results:**
- [ ] Redirected to `/coach/select?program=fat-to-fit-foundations-home`
- [ ] Can select/assign coach
- [ ] Can access program after assignment

**Issues Found:**
_None yet_

---

### Test 3.3: START NOW - Free Tier, Paid Program
**Steps:**
1. Logged in as Free tier user
2. On a PAID/Purchasable program page
3. Click START NOW

**Expected Results:**
- [ ] Redirected to `/checkout?program=hybrid-base-4day`
- [ ] Can purchase program
- [ ] Tier updated after purchase
- [ ] Can access program

**Issues Found:**
_None yet_

---

### Test 3.4: START NOW - Admin User
**Steps:**
1. Logged in as admin user
2. On any program page (free or paid)
3. Click START NOW

**Expected Results:**
- [ ] Redirected to `/coach/select?program=hybrid-base-4day`
- [ ] Admin bypasses checkout
- [ ] Goes straight to coach selection
- [ ] Can access program without payment

**Issues Found:**
_None yet_

---

## Phase 4: All 23 Programs Accessible

### Test 4.1: Program List Coverage
**Steps:**
1. As logged-in admin user
2. Navigate to each program:

**Fat-to-Fit Programs:**
- [ ] `/programs/fat-to-fit-foundations-home` - Loads
- [ ] `/programs/fat-to-fit-foundations-gym` - Loads
- [ ] `/programs/fat-to-fit-momentum-home` - Loads
- [ ] `/programs/fat-to-fit-momentum-gym` - Loads
- [ ] `/programs/fat-to-fit` - Loads
- [ ] `/programs/fat-to-fit-light-budget` - Loads
- [ ] `/programs/fat-to-fit-intermediate` - Loads
- [ ] `/programs/fat-to-fit-advanced` - Loads

**Hybrid Training Programs:**
- [ ] `/programs/hybrid-base-4day` - Loads
- [ ] `/programs/hybrid-base` - Loads
- [ ] `/programs/hybrid-base-6day` - Loads
- [ ] `/programs/hybrid-performance` - Loads
- [ ] `/programs/hybrid-athlete` - Loads
- [ ] `/programs/hybrid-race` - Loads
- [ ] `/programs/hybrid-explosive` - Loads
- [ ] `/programs/hybrid-sport` - Loads

**Peachy Programs:**
- [ ] `/programs/peachy-pump` - Loads
- [ ] `/programs/peachy-progression-3day` - Loads
- [ ] `/programs/peachy-progression-4day` - Loads
- [ ] `/programs/peachy-progression-5day` - Loads
- [ ] `/programs/peachy-progression` - Loads

**Lean Bulk Programs:**
- [ ] `/programs/lean-bulk-9week` - Loads
- [ ] `/programs/lean-bulk-2` - Loads

---

## Phase 5: Auth Context & State Management

### Test 5.1: Auth State Persists Across Pages
**Steps:**
1. Log in to `/login`
2. Navigate to dashboard: `/dashboard`
3. Check browser console: `window.localStorage` should have auth token
4. Navigate to program page
5. Auth state should still be loaded

**Expected Results:**
- [ ] Auth state persists across navigation
- [ ] User info available on all pages
- [ ] No re-login required

**Issues Found:**
_None yet_

---

### Test 5.2: Auth Refresh on New Tab
**Steps:**
1. Log in on one tab
2. Open new tab and go to http://localhost:3000
3. Auth context should load existing session

**Expected Results:**
- [ ] New tab auto-detects logged-in user
- [ ] No need to log in again
- [ ] Auth context syncs across tabs

**Issues Found:**
_None yet_

---

### Test 5.3: Logout/Session End
**Steps:**
1. Log in successfully
2. Manual logout (if link exists) OR clear auth token in localStorage
3. Refresh page
4. Should require login

**Expected Results:**
- [ ] User is logged out
- [ ] Redirected to login
- [ ] Protected content not accessible

**Issues Found:**
_None yet_

---

## Phase 6: Error Handling

### Test 6.1: Invalid Credentials
**Steps:**
1. Go to `/login`
2. Enter invalid email/password
3. Click Sign in

**Expected Results:**
- [ ] Error message displayed
- [ ] User not logged in
- [ ] Can retry

**Issues Found:**
_None yet_

---

### Test 6.2: Network Error Handling
**Steps:**
1. Disable network (DevTools)
2. Try to load program page
3. Should handle gracefully

**Expected Results:**
- [ ] No infinite loading
- [ ] Error message or retry option
- [ ] Page doesn't crash

**Issues Found:**
_None yet_

---

### Test 6.3: Missing Program
**Steps:**
1. Go to `/programs/non-existent-program`
2. Should show 404 or "Program not found"

**Expected Results:**
- [ ] Graceful error page
- [ ] Link back to programs
- [ ] No console errors

**Issues Found:**
_None yet_

---

## Summary

**Total Tests:** 25+  
**Passed:** ___/25+  
**Failed:** ___/25+  
**Issues Found:** ___

### Critical Blockers (If Any):


### Minor Issues (If Any):


### Notes:

