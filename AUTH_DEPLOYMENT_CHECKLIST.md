# Auth System Deployment Checklist

## Pre-Deployment Verification

### Code Quality
- [x] Types compile without errors
- [x] Auth system compiles
- [x] No console errors on startup
- [x] Auth context properly wrapped in layout

### Database
- [x] Supabase project created
- [x] Schema applied (tables exist)
- [x] RLS policies enabled
- [x] Email confirmation configured

### Environment
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in `.env.local`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in `.env.local`
- [ ] Email verification enabled in Supabase
- [ ] SMTP configured for emails

## Local Testing

### Auth Flows
- [ ] Signup works
- [ ] Email confirmation link sends
- [ ] Email verification redirects to coach selection
- [ ] Coach selection creates tier entry
- [ ] Login works
- [ ] Logout clears state
- [ ] Multiple coaches can be assigned
- [ ] Auth state persists on refresh

### Redirects
- [ ] `/login?redirect=/path` preserves redirect
- [ ] Redirect works after signup
- [ ] Redirect works after login
- [ ] Invalid redirects are rejected
- [ ] PackageGate login link includes redirect

### Hooks
- [ ] `useAuth()` returns correct state
- [ ] `useUserTier()` returns tier
- [ ] `useUserCoaches()` returns coaches
- [ ] `usePackageAccess()` checks access
- [ ] Auth state updates after actions

### Protected Routes
- [ ] Unauthenticated users redirected to login
- [ ] Redirect parameter preserved
- [ ] Redirected back after auth

### Tier Management
- [ ] Free tier assigned on signup
- [ ] Coach grants work
- [ ] Admin access bypasses all checks
- [ ] Tier upgrades grant access

### UI/UX
- [ ] No console errors
- [ ] Loading states work
- [ ] Error messages display
- [ ] Buttons disabled during loading
- [ ] User info shows in header (if added)

## Component Integration

### HeaderNav
- [ ] Shows user email when logged in
- [ ] Shows user tier when assigned
- [ ] Shows coach count when coaches assigned
- [ ] Sign out button works

### PackageGate
- [ ] Login link includes redirect parameter
- [ ] Content shows for authorized users
- [ ] Content blurs for unauthorized users
- [ ] Access re-evaluated after tier change

### Dashboard
- [ ] Shows coaches when logged in
- [ ] Shows tier information
- [ ] Shows dashboard when authenticated

### Profile Page
- [ ] Shows user information
- [ ] Shows assigned coaches
- [ ] "Add coach" link works

### Login Page
- [ ] Signup works
- [ ] Login works
- [ ] Redirect parameter preserved
- [ ] Error messages display

## Lemon Squeezy Integration

### Webhook Setup
- [ ] Webhook URL configured in Lemon Squeezy: `https://yourdomain.com/api/webhooks/lemon-squeezy`
- [ ] Webhook secret stored securely
- [ ] Webhook handler implemented
- [ ] Handler calls `upgradeUserTier()` on purchase

### Test Purchase
- [ ] Test purchase completes
- [ ] Webhook received (check logs)
- [ ] Tier updated in database
- [ ] User sees new access

### Webhook Handler Implementation
Create `/src/app/api/webhooks/lemon-squeezy/route.ts`:
```tsx
import { upgradeUserTier } from '@/lib/auth/tier';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const signature = req.headers.get('x-signature-sha256');
  const body = await req.text();
  
  // Verify signature
  if (!verifyWebhookSignature(body, signature, WEBHOOK_SECRET)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const data = JSON.parse(body);
  const supabase = await getSupabaseServerClient();

  if (data.meta.event_name === 'order:created') {
    const { user_id, coach_slug, tier } = data.data.attributes.custom_data;
    await upgradeUserTier(supabase, user_id, coach_slug, tier);
  }

  return new Response('OK', { status: 200 });
}
```

## Performance Testing

### Load Test
- [ ] Multiple concurrent signups work
- [ ] Multiple concurrent logins work
- [ ] No database connection errors
- [ ] No timeout issues

### Query Performance
- [ ] Auth checks are <100ms
- [ ] Package access checks are <100ms
- [ ] No N+1 queries
- [ ] Database indexes sufficient

### Memory
- [ ] No memory leaks
- [ ] Auth context cleanup works
- [ ] Multiple signouts don't leak memory

## Security Testing

### Authentication
- [ ] Weak passwords are rejected
- [ ] Invalid emails are rejected
- [ ] Session hijacking prevented
- [ ] CSRF protection enabled

### Authorization
- [ ] Users can't access others' data
- [ ] RLS policies enforced
- [ ] Admin-only endpoints protected
- [ ] Coach-only endpoints protected

### Session Security
- [ ] Session tokens are secure
- [ ] Session tokens rotate
- [ ] Logout clears session
- [ ] Session expires appropriately

### Data Protection
- [ ] Passwords are hashed
- [ ] Sensitive data not logged
- [ ] Secrets not in frontend code
- [ ] HTTPS enforced

## Monitoring & Logging

### Error Tracking
- [ ] Error tracking service configured (Sentry, etc.)
- [ ] Auth errors logged
- [ ] Database errors logged
- [ ] Webhook errors logged

### Analytics
- [ ] Signup tracked
- [ ] Login tracked
- [ ] Coach selection tracked
- [ ] Tier upgrade tracked

### Dashboards
- [ ] User creation rate monitored
- [ ] Auth error rate monitored
- [ ] Webhook failure rate monitored
- [ ] Performance metrics visible

## Documentation

### For Developers
- [x] API documented in `/src/lib/auth/README.md`
- [x] Integration guide in `AUTH_INTEGRATION_GUIDE.md`
- [x] Testing guide in `AUTH_TESTING_GUIDE.md`
- [ ] Deployed with inline code comments

### For Product
- [ ] User flow documented
- [ ] Tier structure documented
- [ ] Coach assignment documented
- [ ] Redirect flow documented

### For Support
- [ ] Common issues documented
- [ ] Troubleshooting guide written
- [ ] Debug steps documented
- [ ] Contact info for escalation

## Final Checks

### Code Review
- [ ] All code reviewed
- [ ] No security issues
- [ ] Performance optimized
- [ ] Edge cases handled

### Testing Coverage
- [ ] Happy path tested
- [ ] Error cases tested
- [ ] Edge cases tested
- [ ] Integration tested

### Backup & Recovery
- [ ] Database backup configured
- [ ] Rollback plan documented
- [ ] Recovery tested
- [ ] Disaster recovery plan ready

### Deployment Readiness
- [ ] All tests passing
- [ ] No breaking changes
- [ ] Backward compatible
- [ ] Gradual rollout planned

## Deployment Steps

### Stage 1: Deploy to Staging
1. [ ] Push to staging branch
2. [ ] Build succeeds
3. [ ] Deploy to staging environment
4. [ ] Full testing on staging
5. [ ] Verify all checklist items
6. [ ] Get approval

### Stage 2: Deploy to Production
1. [ ] Create production branch
2. [ ] Run full test suite
3. [ ] Build production bundle
4. [ ] Deploy to production
5. [ ] Verify deployment
6. [ ] Monitor for errors

### Stage 3: Post-Deployment
1. [ ] Monitor error rates
2. [ ] Check user signups
3. [ ] Check login success rate
4. [ ] Check tier assignments
5. [ ] Monitor webhook processing
6. [ ] Check performance metrics
7. [ ] Be ready to rollback if needed

## Rollback Plan

If issues occur in production:

1. **Identify Issue**
   - Check error logs
   - Check user reports
   - Check performance metrics

2. **Decide to Rollback**
   - Determine scope of issue
   - Estimate time to fix
   - Decide on rollback

3. **Execute Rollback**
   - Revert to previous commit
   - Rebuild and deploy
   - Verify functionality
   - Notify team

4. **Post-Mortem**
   - Document what failed
   - Document why it failed
   - Plan preventative measures
   - Update tests/checks

## Success Criteria

### Functional
- [ ] Users can sign up
- [ ] Users can log in
- [ ] Users can select coaches
- [ ] Users can access programs
- [ ] Tiers grant correct access
- [ ] Upgrades work immediately

### Performance
- [ ] Signup < 5 seconds
- [ ] Login < 3 seconds
- [ ] Package access check < 100ms
- [ ] Page load not affected

### Security
- [ ] No data breaches
- [ ] No unauthorized access
- [ ] All secrets protected
- [ ] RLS policies working

### User Experience
- [ ] Smooth onboarding flow
- [ ] Clear error messages
- [ ] No confusing redirects
- [ ] Intuitive UI

## Go-Live Signoff

### Tech Lead
- [ ] System reviewed and approved
- [ ] Performance acceptable
- [ ] Security concerns addressed
- [ ] Monitoring in place

### Product Manager
- [ ] Feature meets requirements
- [ ] User experience approved
- [ ] Documentation complete
- [ ] Ready for users

### DevOps
- [ ] Infrastructure configured
- [ ] Backups in place
- [ ] Monitoring setup
- [ ] Deployment procedures ready

### QA
- [ ] All tests passing
- [ ] Edge cases covered
- [ ] Production-like testing done
- [ ] Sign-off for launch

## Post-Launch

### Week 1
- [ ] Monitor error rates daily
- [ ] Check user feedback
- [ ] Verify tier assignments
- [ ] Monitor webhook processing
- [ ] Be available for hotfixes

### Week 2-4
- [ ] Analyze user behavior
- [ ] Optimize based on usage
- [ ] Add missing features
- [ ] Plan V2 improvements

### Ongoing
- [ ] Monitor performance
- [ ] Track error trends
- [ ] Update documentation
- [ ] Gather user feedback
- [ ] Plan improvements

## Timeline

Suggested timeline:

- **Day 1-3**: Local testing and fixes
- **Day 4**: Staging deployment and QA
- **Day 5**: Final review and signoff
- **Day 6**: Production deployment
- **Day 7**: Monitor and support

Adjust based on your team's schedule and testing needs.

## Contact & Support

For questions or issues:
1. Check `/src/lib/auth/README.md`
2. Check `AUTH_TESTING_GUIDE.md`
3. Check `AUTH_INTEGRATION_GUIDE.md`
4. Review code comments
5. Check Supabase docs

## Approval Sign-Off

### Technical Review
- [ ] Reviewed by: ________________
- [ ] Date: ________________
- [ ] Approved: ☐ Yes ☐ No

### Product Review
- [ ] Reviewed by: ________________
- [ ] Date: ________________
- [ ] Approved: ☐ Yes ☐ No

### QA Sign-Off
- [ ] Reviewed by: ________________
- [ ] Date: ________________
- [ ] Approved: ☐ Yes ☐ No

### Go-Live Approval
- [ ] Final approval: ________________
- [ ] Date: ________________
- [ ] Go-live time: ________________
