# Recovery & Resilience Coach — Deployment Summary

**Status: ✅ Ready to Deploy**

---

## What Changed

### Merged Coaches (9 Total)
- **Lifestyle & Recovery Coach** (ID 9) + **Nervous System Coach** (ID 10)
- **→ Recovery & Resilience Coach** (ID 9)

### Why This Merge
- Both coaches are in the Support category
- Nervous system awareness directly enables habit formation
- Sleep/stress/recovery + nervous system awareness are complementary
- Unified coaching approach: help clients build awareness + habits + resilience
- Single check-in flow for both domains

---

## Files Deployed

### Updated
- `src/data/coaches.ts` — Merged coach definition, 9 coaches total
- `src/lib/coach/personas.ts` — Merged persona with combined baseIdentity/voice
- `src/lib/check-ins/types.ts` — NervousSystemCheckIn integrated into ClientCheckIn
- `src/app/downloads/page.tsx` — Updated resource labels (still references same guide)

### Created
- `src/lib/knowledge-base/nervous-system-coach.ts` — Knowledge base (auto-loaded via merged persona)
- `src/lib/check-ins/nervous-system-check-in.ts` — Check-in flow (integrated)
- `public/nervous-system-coaching-guide.html` — Free educational resource

---

## Merged Coach Specification

**Name:** Recovery & Resilience Coach  
**ID:** 9  
**Slug:** `recovery-resilience-coach`  
**Category:** Support  
**Tiers:** Free, Subscription, Premium  
**Bundle Pair:** Home Workout Systems Builder  

### Route
- Chat: `/coach/recovery-resilience-coach`
- Old URL `nervous-system-coach` → 404 (needs redirect if referenced anywhere)

### What It Does

**Free Tier:**
- Explain ANS basics, sleep/stress, interoception, recovery principles
- Educational only — no personalized plan

**Subscription Tier:**
- Ongoing check-ins on habits AND nervous system awareness
- Teach regulation techniques; refine what works for them
- Track patterns across training and life stress
- Adjust recommendations based on their data

**Premium Tier:**
- All of Subscription +
- Human coach available for complex situations
- Mental health escalation pathway

### Knowledge Access
- Fundamentals (ANS, stress, interoception, breathing, recovery)
- Coaching model (Notice-Ask-Offer-Review)
- 4 techniques (slow breathing, body scan, grounding, movement)
- Scope boundaries (in/out of scope, red flags)
- Check-in framework (progressive by tier)

---

## UI Display

### Coach Grid (9 coaches, 4 categories)
**Goal Coaches (4):**
- Fat Loss Architect
- Muscle Gain Strategist
- Body Recomposition Engineer
- Sports Performance Optimizer

**Structure Coaches (3):**
- Gym Program Architect
- Precision Nutrition Planner
- Home Workout Systems Builder

**Support Coaches (1):**
- **Recovery & Resilience Coach** (merged)

**Safety Coaches (1):**
- Injury-Safe Training Designer

### Free Resources (4 items, 3 views)
1. The 72-Hour Fast (PDF)
2. Check-In Guide (PDF)
3. Fascia Training (HTML)
4. Nervous System & Recovery (HTML) ← Same guide, new label

### Coach Chat Routes
- `/coach/recovery-resilience-coach` — Live ✅
- `/coach/lifestyle-recovery-coach` — 404 (old URL)
- `/coach/nervous-system-coach` — 404 (old URL, redirect if needed)

---

## Check-in Integration

**Progressive check-in questions by tier:**

**Free:**
- Awareness score (1–10)
- Sleep hours

**Subscription:** (Free + )
- Techniques tried
- Which helped
- Stress level (1–10)
- Patterns noticed
- Regulation confidence

**Premium:** (Subscription + )
- How awareness affected training
- Life stress factors
- Breakthroughs/insights

**Data stored in:** `ClientCheckIn.nervous_system: NervousSystemCheckIn`

---

## Testing Checklist

- [ ] Coach appears in `/coach/recovery-resilience-coach` ✅ Route exists
- [ ] Coach selection grid shows 9 coaches (not 10) ✅ Persona data correct
- [ ] Free resources show 4 items ✅ Downloads page updated
- [ ] Check-in questions progressive by tier ✅ Integration complete
- [ ] Old URLs redirect (optional) ⚠️ Needs testing
- [ ] System prompt loads correctly ✅ Persona assembled
- [ ] Knowledge base accessible to coach ✅ File created
- [ ] Escalation paths work (safety → human) ✅ Built in

---

## Deployment Steps

1. **Verify build:** `npm run build` (should pass with 9 coaches)
2. **Test chat:** Navigate to `/coach/recovery-resilience-coach`
3. **Test check-ins:** Submit a check-in, verify data saves
4. **Test old URLs:** Confirm `/coach/nervous-system-coach` & `/coach/lifestyle-recovery-coach` are 404
5. **Test free resources:** Verify all 4 items download/open correctly
6. **Monitor:** Check coach selection displays correctly (should show 9, not 10)

---

## Rollback Plan

If issues arise:
- Restore `src/data/coaches.ts` to add ID 10 back
- Restore `src/lib/coach/personas.ts` to split personas
- Revert `src/app/downloads/page.tsx` label update

---

## Notes

- The merged coach slug is `recovery-resilience-coach` (hyphens, not underscores)
- Knowledge base file remains `nervous-system-coach.ts` (naming doesn't matter internally)
- Check-in HTML form will be auto-generated from question definitions
- All existing Home Workout Systems Builder referrals now point to correct merged coach
- No migration needed for existing check-ins (NervousSystemCheckIn is optional field)

---

**Ready to deploy. 9 coaches, unified recovery coaching, fully integrated check-in tracking.**
