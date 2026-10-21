# Complete Remaining Tasks - C9F Platform Build

**Current Status:** Authentication & Programs Complete | Ready for Testing  
**Next Phase:** Integration, Payment, and Production Readiness

---

## 📋 MASTER CHECKLIST

### ✅ COMPLETED (Locked In)
- [x] Core Authentication System (signup, login, redirect)
- [x] Auth Context & Global State Management  
- [x] Coach Assignment Flow
- [x] Tier Management Database
- [x] All 23 Workout Programs (TypeScript + HTML)
- [x] Admin Full Access System
- [x] START NOW Button on All Programs
- [x] Package Gating (BlurGate)
- [x] Auth Callback Handler
- [x] Type Definitions & Server Utilities

---

## 🔄 PHASE 2: INTEGRATION & ENHANCEMENT

### 2.1 Payment Integration (High Priority)
**Why:** Users need to be able to purchase programs and upgrade tiers  
**Time Est:** 3-4 hours

- [ ] **Lemon Squeezy Webhook Setup**
  - Create API endpoint: `/api/webhooks/lemon-squeezy`
  - Handle webhook events: `order.created`, `subscription.updated`
  - Implement `upgradeUserTier()` function call
  - Test webhook locally with Lemon Squeezy simulator

- [ ] **Checkout Page** (`/src/app/checkout/page.tsx`)
  - Display program details + pricing
  - Show coaching tier options
  - Generate Lemon Squeezy checkout link with user data
  - Handle post-purchase redirect

- [ ] **Purchase Verification**
  - After purchase, verify tier in Supabase
  - Sync with auth context
  - Unlock program access immediately
  - Show success message

**Files to Create:**
- `/src/app/api/webhooks/lemon-squeezy/route.ts`
- `/src/app/checkout/page.tsx`
- Update: `/src/lib/auth/tier.ts` (add webhook handler)

---

### 2.2 Email Configuration (High Priority)
**Why:** Users need email confirmation to complete signup  
**Time Est:** 1-2 hours

- [ ] **Supabase Email Setup**
  - Enable email confirmation in Supabase project
  - Configure SMTP provider (SendGrid/Mailgun/custom)
  - Set email confirmation redirect URL: `https://your-domain/auth/callback`
  - Test email sending

- [ ] **Email Templates**
  - Customize Supabase default email template
  - Add Code9 branding
  - Include magic link / verification code

- [ ] **Local Testing**
  - Use Supabase local development email sink
  - Or use mailtrap.io for testing

**Documentation:**
- See Supabase Auth docs for email setup
- See `/src/app/login/page.tsx` line 59 for redirect URL

---

### 2.3 HeaderNav User Display (Medium Priority)
**Why:** Users need to see who they're logged in as  
**Time Est:** 1 hour

- [ ] **Update `/src/components/HeaderNav.tsx`**
  - Import `useAuth()` hook
  - Show user email when logged in
  - Show coach assignment
  - Add dropdown with:
    - Profile link
    - Coach settings link
    - Logout button
  - Show login button when logged out

**Changes:**
```typescript
const { user, tier, coaches } = useAuth();
// Display: "Hi, user@email.com | Tier: Free | Coach: Sarah"
// Or login button if not authenticated
```

---

### 2.4 User Profile Page (Medium Priority)
**Why:** Users need to manage their account and coaches  
**Time Est:** 2 hours

- [ ] **Create `/src/app/profile/page.tsx`**
  - Display user info (email, name)
  - Show assigned coaches
  - Option to add/remove coaches
  - View tier and subscription info
  - Edit profile settings
  - Logout button

- [ ] **Coach Management UI**
  - List current coaches
  - "Add Coach" button → opens `/coach/select`
  - "Remove" button for each coach
  - Show tier for each coach

**Database Operations:**
- Read from `profiles`, `coach_tiers`
- Update: `profiles`, `coach_tiers`

---

## 🎯 PHASE 3: FEATURES & ENHANCEMENTS

### 3.1 Check-In System (High Priority - Phase 1)
**Why:** Core feature for user engagement & coaching  
**Time Est:** 8-10 hours

From your memory: Conversational check-ins in coach chat, sidebar timeline, coach dashboard with trends/alerts

- [ ] **Daily Workout Check-ins**
  - Coach chat integration to ask "Did you complete today's workout?"
  - Natural language detection
  - Capture missed workout reason (sick, tired, etc.)
  - Mark session as "hold" if unable to complete

- [ ] **Workout Logging Form**
  - Exercise-by-exercise logging (sets, reps, weight)
  - Post-workout feelings (energy, soreness, mood, sleep)
  - Save to database

- [ ] **Dashboard Progress View**
  - This week overview (completed/missed)
  - Program progress (week X/9)
  - Strength progression charts
  - 3/6/9 week summaries

- [ ] **Database Schema** (if not already done)
  ```sql
  workout_sessions
  session_exercises  
  session_missed
  session_feelings
  session_ai_summaries
  ```

**Documentation:** See `COACHING_SYSTEM_ARCHITECTURE.md` for full details

---

### 3.2 Coach Dashboard (Medium Priority)
**Why:** Coaches need to see client progress and give guidance  
**Time Est:** 6-8 hours

From your memory: Coach view with client roster, progression tracking, check-in queue

- [ ] **Coach Dashboard Route** (`/src/app/coach/dashboard/page.tsx`)
  - Verify user is a coach (role='human_coach')
  - Display client roster with status
  - Show check-in queue
  - Display weekly activity summary

- [ ] **Client Roster View**
  - List all assigned clients
  - Show each client's:
    - Current program & week
    - Adherence %
    - Last workout date
    - Red flags (missed sessions, low energy)

- [ ] **Check-In Queue**
  - Filter by week (3, 6, 9)
  - Show pending check-ins
  - Quick actions to review/approve

- [ ] **AI Coaching Recommendations**
  - Display AI-generated suggestions for each client
  - Coach can accept/modify/send to client

---

### 3.3 Coach Chat Enhancement (Medium Priority)
**Why:** Central hub for coach-client communication  
**Time Est:** 4-6 hours

- [ ] **Integrate Workout Data into Chat**
  - Show recent workouts in chat context
  - Display client's current week's progress
  - Use data to inform AI responses

- [ ] **Check-In Trigger in Chat**
  - At weeks 3, 6, 9: Automatically ask check-in questions
  - Capture responses
  - Generate AI analysis

- [ ] **Chat UI Enhancements**
  - Sidebar with client info
  - Quick access to programs
  - Performance metrics display

---

## 📊 PHASE 4: OPERATIONS & ADMIN

### 4.1 Admin Dashboard Enhancements (Low Priority)
**Why:** You need tools to manage the platform  
**Time Est:** 3-4 hours

- [ ] **User Management**
  - View all users
  - Promote to admin
  - View user tier/coaching assignments
  - Manually upgrade tiers (for support)

- [ ] **Program Management**
  - View all programs
  - Edit program details
  - Manage purchasable vs free
  - Track program downloads

- [ ] **Analytics Dashboard**
  - Total signups (by date)
  - Active users
  - Program popularity
  - Conversion rates

- [ ] **Coaching Operations**
  - View all coaches
  - Assign coaches to clients
  - View coach load/availability
  - Performance metrics

---

### 4.2 Email Notifications (Low Priority)
**Why:** Keep users and coaches informed  
**Time Est:** 3 hours

- [ ] **User Notifications**
  - Workout reminder emails
  - Check-in due soon
  - Coach message notification
  - Weekly progress summary

- [ ] **Coach Notifications**
  - New check-in to review
  - Client missed workout
  - Low engagement alert
  - New client assigned

- [ ] **Email Templates**
  - Create Supabase/SendGrid templates
  - Brand with Code9 design
  - Include action links

---

### 4.3 Logging & Error Tracking (Low Priority)
**Why:** Catch production issues early  
**Time Est:** 2 hours

- [ ] **Error Logging**
  - Set up Sentry or equivalent
  - Track auth errors
  - Track database errors
  - Alert on errors in production

- [ ] **Analytics**
  - Track user flows (signup → login → coach selection)
  - Track program access patterns
  - Monitor performance

---

## 🚀 PHASE 5: DEPLOYMENT & PRODUCTION

### 5.1 Pre-Deployment Checklist (High Priority)
**Time Est:** 4-6 hours

- [ ] **Security Review**
  - Run security audit
  - Check RLS policies in Supabase
  - Verify no secrets in code
  - Test rate limiting on APIs

- [ ] **Performance Testing**
  - Test load times
  - Test database queries
  - Optimize images/assets
  - Minify code

- [ ] **Browser Testing**
  - Test on Chrome, Firefox, Safari, Edge
  - Test on mobile (iOS/Android)
  - Check responsive design
  - Test all user flows

- [ ] **Accessibility**
  - Check WCAG compliance
  - Test keyboard navigation
  - Test screen reader compatibility

- [ ] **Environment Setup**
  - Staging environment
  - Production environment
  - Database backups
  - DNS configuration

---

### 5.2 Deployment (High Priority)
**Time Est:** 2 hours

- [ ] **Choose Hosting**
  - Vercel (recommended for Next.js)
  - AWS, GCP, or other
  - Set up CI/CD pipeline

- [ ] **Deploy Steps**
  - Push to GitHub (or git provider)
  - Configure deployment settings
  - Set environment variables
  - Run migrations
  - Deploy to staging
  - Test all flows on staging
  - Deploy to production

- [ ] **Post-Deployment**
  - Monitor error logs
  - Test critical flows
  - Verify email sending
  - Check payment processing

---

### 5.3 Lemon Squeezy Live Setup (High Priority)
**Time Est:** 2 hours

- [ ] **Production Lemon Squeezy Account**
  - Create product/variant for each program
  - Set pricing
  - Create checkout links
  - Configure webhooks to production URL

- [ ] **Payment Testing**
  - Test with test payment method
  - Verify tier updates
  - Verify user receives email
  - Check thank you page

---

## 📱 PHASE 6: MOBILE & PROGRESSIVE ENHANCEMENT

### 6.1 Mobile Optimization (Low Priority)
**Time Est:** 3-4 hours

- [ ] **Responsive Design Review**
  - Test all pages on mobile
  - Fix touch interactions
  - Optimize font sizes
  - Test performance on slow networks

- [ ] **Mobile Navigation**
  - Hamburger menu on small screens
  - Touch-friendly buttons
  - Mobile-optimized forms

---

### 6.2 Progressive Web App (PWA) (Very Low Priority)
**Time Est:** 4-6 hours

- [ ] **Service Worker**
  - Cache static assets
  - Offline fallback
  - Background sync for check-ins

- [ ] **Web App Manifest**
  - Add to home screen
  - App icon
  - Theme color

---

## 🎓 PHASE 7: DOCUMENTATION & HANDOFF

### 7.1 Developer Documentation (Medium Priority)
**Time Est:** 4-6 hours

- [ ] **Architecture Guide**
  - System overview
  - Data flow diagrams
  - Database schema documentation
  - API documentation

- [ ] **Setup Instructions**
  - Local development setup
  - Environment variables
  - Database setup
  - Testing procedures

- [ ] **Deployment Guide**
  - Step-by-step deployment
  - Troubleshooting
  - Rollback procedures
  - Monitoring setup

---

### 7.2 User Documentation (Medium Priority)
**Time Est:** 3-4 hours

- [ ] **User Guide**
  - How to sign up
  - How to select a coach
  - How to access programs
  - How to log workouts
  - How to do check-ins

- [ ] **Coach Guide**
  - How to view client progress
  - How to review check-ins
  - How to send coaching advice
  - How to adjust programs

- [ ] **Admin Guide**
  - How to manage users
  - How to manage coaches
  - How to view analytics
  - How to handle support issues

---

## 📅 RECOMMENDED PRIORITY ORDER

### Week 1 (This Week)
1. **Complete Testing** (TESTING_CHECKLIST.md)
2. **Fix Any Issues Found**
3. **Lemon Squeezy Integration** (payments)
4. **Email Configuration** (verification)

### Week 2
1. **HeaderNav User Display**
2. **User Profile Page**
3. **Check-In System Phase 1** (Daily check-ins)

### Week 3
1. **Coach Dashboard Basics**
2. **Admin Dashboard Enhancements**
3. **Email Notifications**

### Week 4+
1. **Pre-Deployment Review**
2. **Deployment to Staging**
3. **Staging Testing**
4. **Deploy to Production**
5. **Monitor & Support**

---

## 🔗 QUICK LINKS TO EXISTING DOCS

- [Auth System Docs](./src/lib/auth/README.md)
- [Auth Integration Guide](./AUTH_INTEGRATION_GUIDE.md)
- [Testing Guide](./AUTH_TESTING_GUIDE.md)
- [Deployment Checklist](./AUTH_DEPLOYMENT_CHECKLIST.md)
- [Coaching Architecture](./COACHING_SYSTEM_ARCHITECTURE.md)
- [Phase 1 Implementation Plan](./PHASE_1_IMPLEMENTATION.md)

---

## 💡 NOTES

- **Start with Testing** → Ensure current systems work
- **Payment First** → Users need to buy programs
- **Email Second** → Users need email confirmation
- **Features Third** → Then build coaching features
- **Polish Last** → Admin tools and optimizations

---

## ✅ SUCCESS CRITERIA (For Launch)

- [ ] Users can signup and verify email
- [ ] Users can login and stay logged in
- [ ] Users can select coaches and see tiers
- [ ] Users can view programs (gated by tier)
- [ ] Users can purchase programs and upgrade tiers
- [ ] Coaches can view assigned clients
- [ ] Admins can manage users and tiers
- [ ] All 23 programs are accessible
- [ ] START NOW button works on all programs
- [ ] System is deployed to production
- [ ] Monitoring and error tracking active

---

**Total Estimated Time for All Remaining Tasks:** 40-60 hours  
**Recommended Dev Timeline:** 3-4 weeks with focused work

