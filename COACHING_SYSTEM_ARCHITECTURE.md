# Code9 Fitness: Coaching System Architecture

## Executive Summary
Integrate a comprehensive coaching ecosystem that tracks client progress through workout logging, AI-powered insights, and structured check-ins at 3/6/9 week intervals, with a coach dashboard for guidance recommendations.

---

## 1. System Overview

### Core Components
```
CLIENT JOURNEY:
┌─────────────────────────────────────────────────────┐
│ 1. Client selects coach & program                  │
│ 2. Receives structured plan                        │
│ 3. Logs workouts + notes + feelings               │
│ 4. AI coach responds & tracks progress            │
│ 5. Check-ins at weeks 3, 6, 9                     │
│ 6. Receives progression report + adjustments      │
└─────────────────────────────────────────────────────┘

COACH JOURNEY:
┌─────────────────────────────────────────────────────┐
│ 1. Views client roster                             │
│ 2. Sees check-in alerts at 3/6/9 weeks           │
│ 3. Receives AI summary + progression data         │
│ 4. Gets coaching recommendations from AI          │
│ 5. Adds personal notes + adjustments              │
│ 6. Sends updated plan to client                   │
└─────────────────────────────────────────────────────┘
```

---

## 2. Data Models

### Client Profile (Enhanced)
```
{
  clientId: string
  userId: string
  coachId: string
  tier: "Free" | "One-Time" | "Subscription" | "Premium"
  programId: string
  startDate: ISO8601
  programDuration: number (weeks)
  stats: {
    weight: number
    measurements: { chest, waist, hips, arms, legs }
    experience: "beginner" | "intermediate" | "advanced"
    equipment: string[]
  }
  preferences: {
    trainingDays: number
    location: "gym" | "home" | "mixed"
    goals: string[]
  }
  progressData: CheckInData[]
}
```

### Workout Log Entry
```
{
  logId: string
  clientId: string
  date: ISO8601
  programWeek: number
  workoutDay: number
  planned: {
    exercises: Exercise[]
    targetReps: { min, max }
    targetWeight: number
  }
  actual: {
    exercises: Exercise[]
    reps: number[]
    weight: number[]
    completed: boolean
    duration: number (minutes)
  }
  notes: string
  feelings: {
    energy: 1-10
    soreness: 1-10
    mood: 1-10
    sleepQuality: 1-10
    sleepHours: number
    nutrition: 1-10
  }
  injuries: {
    hasIssues: boolean
    location: string
    severity: 1-10
    description: string
  }
  timestamp: ISO8601
}
```

### Check-In Data (3/6/9 weeks)
```
{
  checkInId: string
  clientId: string
  coachId: string
  checkInWeek: 3 | 6 | 9
  programDuration: number
  
  // Captured Data
  clientInput: {
    overallFeedback: string
    energyTrend: "increasing" | "stable" | "decreasing"
    strengthProgress: "yes" | "slight" | "no"
    confidenceLevel: 1-10
    challenges: string[]
    victories: string[]
    injuries: string | null
    adjustmentsWanted: string[]
  }
  
  // AI Analysis
  aiAnalysis: {
    adherenceRate: percentage
    strengthGains: {
      exercises: { name, startWeight, currentWeight, gain }[]
      averageGain: number
    }
    workoutTrend: {
      consistency: percentage
      averageCompletion: percentage
      missedSessions: number
    }
    recoveryTrend: {
      averageSleep: number
      averageEnergy: number
      injuryIndicators: string[]
    }
    progressSummary: string
    aiRecommendations: string[]
  }
  
  // Coach Review
  coachReview: {
    reviewed: boolean
    coachNotes: string
    coachRecommendations: string[]
    programAdjustments: {
      intensity: "same" | "increase" | "decrease"
      volume: "same" | "increase" | "decrease"
      focus: string[]
      newExercises: Exercise[]
    }
    nextPhase: string
  }
  
  // Generated Plan
  nextProgram: {
    startDate: ISO8601
    weeks: number
    focus: string
    exercises: Exercise[]
  }
  
  timestamp: ISO8601
}
```

---

## 3. Feature Breakdown

### Phase 1: Workout Logging (Weeks 1-2)
**Goal**: Enable clients to log workouts with detailed tracking

#### Components Needed
- `WorkoutLogger.tsx` - Main logging interface
- `WorkoutForm.tsx` - Exercise entry, reps, weight
- `FeelingsForms.tsx` - Energy, sleep, mood, soreness, injuries
- `WorkoutHistory.tsx` - View past workouts

#### API Endpoints Needed
```
POST   /api/workouts/log              - Create workout log
GET    /api/workouts/client/:id       - Get client's workouts
GET    /api/workouts/client/:id/week  - Get week's workouts
PUT    /api/workouts/:id              - Edit workout log
DELETE /api/workouts/:id              - Delete workout log
```

#### Database Schema
- `workout_logs` table
- `workout_exercises` table (exercises per log)
- `client_feelings` table (energy, sleep, mood, etc.)

#### UI Flow
```
Dashboard → "Log Workout" 
  → Select date & workout day
  → Compare to planned workout
  → Enter actual exercises/reps/weight
  → Log feelings (energy, sleep, mood, soreness)
  → Check injury flags
  → Coach chat integrates here
  → Save
```

---

### Phase 2: Coaching Chat Integration (Weeks 2-3)
**Goal**: Connect workout logs to AI coaching responses

#### Components Needed
- Enhance existing `/coach/chat/[clientId]/page.tsx`
- `ChatWithContext.tsx` - Include recent workout data in chat
- `ProgressSidebar.tsx` - Show progress metrics during chat
- `CoachInsights.tsx` - AI-generated insights from logs

#### AI Integration Points
```
When client messages coach:
1. Fetch recent workout logs (7-14 days)
2. Include in system prompt: adherence, strength trends, reported issues
3. AI coach responds with:
   - Acknowledgment of progress
   - Specific feedback on technique/form from notes
   - Adjustments based on feelings/energy
   - Injury precautions if flagged

When generating coach recommendations:
1. Analyze workout data for patterns
2. Identify which exercises are progressing
3. Flag any regressions or stalls
4. Suggest form checks or exercise swaps
```

#### API Endpoints Needed
```
GET    /api/coaching/context/:clientId  - Get last 14 days of logs + feelings
POST   /api/coaching/message            - Send message with context
GET    /api/coaching/insights/:clientId - Generate insights from logs
```

---

### Phase 3: Check-In System at 3/6/9 Weeks (Weeks 3-4)
**Goal**: Structured check-ins with AI analysis and coach review

#### Components Needed
- `CheckInPrompt.tsx` - Trigger check-in at week 3/6/9
- `CheckInFlow.tsx` - Enhanced (already exists, needs expansion)
  - Client feedback questionnaire
  - Review of workout trends
  - Injury assessment
  - Goals progress tracking
- `CheckInReview.tsx` - Coach review interface
- `ProgressReport.tsx` - Display analysis for both client & coach

#### Check-In Flow
```
WEEK 3/6/9 TRIGGER:
Client sees: "Time for your check-in!"
  ↓
Client Input:
  - How are you feeling overall?
  - Energy trends? (↑ stable ↓)
  - Strength progress? (yes/slight/no)
  - Any injuries?
  - Biggest challenges?
  - What's going well?
  - Want any adjustments?
  ↓
AI Analysis (Automatic):
  - Adherence: 85% of workouts completed
  - Strength: Average +5 lbs on main lifts
  - Recovery: 7.2 avg sleep hours
  - Energy: 7.1/10 average
  - Red flags: Declining energy week 2-3, missed 2 sessions
  - Summary: "Good progress, but recovery dipping—suggest more sleep"
  ↓
Coach Notification:
  Coach sees: "CheckIn Ready: Client X - Week 6"
  Coach reviews:
    - Client's self-assessment
    - AI's quantitative analysis
    - AI's coaching recommendations
  ↓
Coach Adds:
  - Notes: "Great form improvement, keep pushing legs"
  - Adjustments: "Increase volume 10%, add mobility work"
  - New phase: "Week 7-9: Strength emphasis"
  ↓
System Generates:
  - New 3-week program
  - Sends to client with cover note from coach
  - Creates accountability: "Coach reviewed and adjusted your plan"
```

#### API Endpoints Needed
```
POST   /api/checkins/trigger/:clientId       - Auto-trigger at week 3/6/9
GET    /api/checkins/pending                 - Coach's pending check-ins
GET    /api/checkins/:id                     - Get check-in details
POST   /api/checkins/:id/client-input        - Client submits responses
POST   /api/checkins/:id/analyze             - Trigger AI analysis
GET    /api/checkins/:id/ai-analysis         - Get AI analysis results
POST   /api/checkins/:id/coach-review        - Coach submits review
POST   /api/checkins/:id/generate-program    - Generate next phase program
GET    /api/checkins/:clientId/history       - Get all check-ins for client
```

---

### Phase 4: Coach Dashboard (Weeks 4-5)
**Goal**: Coach view with client roster, progression tracking, and insights

#### Components Needed
- `CoachDashboard.tsx` - Main overview
- `ClientRoster.tsx` - List of clients with status
- `ClientDetailView.tsx` - Individual client deep dive
- `ProgressionChart.tsx` - Visualize strength/weight trends
- `CheckInQueue.tsx` - Pending check-ins
- `AIRecommendations.tsx` - AI suggestions for coach

#### Coach Dashboard Features
```
COACH HOME:
├─ Client Roster (sortable)
│  ├─ Name, Tier, Weeks Elapsed, Adherence %
│  ├─ Red flags (missed sessions, injuries, energy dip)
│  └─ Click to deep dive
│
├─ Check-In Queue
│  ├─ Week 3: 5 pending
│  ├─ Week 6: 2 pending
│  └─ Week 9: 3 pending
│
├─ This Week's Activity
│  ├─ Messages received: 12
│  ├─ Workouts logged: 47/50 expected
│  └─ Injuries reported: 1
│
└─ AI Coaching Assistant
   ├─ "Sarah's strength plateauing—add variation"
   ├─ "Mike's sleep dropped—recommend rest day"
   └─ "Lisa ready for progression—increase intensity"

CLIENT DEEP DIVE:
├─ Client Info & Goals
├─ Current Program & Week
├─ Strength Progression Graph
├─ Workout Adherence Timeline
├─ Recent Check-ins & AI Analysis
├─ Injury History
├─ Chat Thread
└─ Quick Actions:
   ├─ Send adjustment
   ├─ Flag for check-in
   └─ End program & assign new one
```

#### API Endpoints Needed
```
GET    /api/coach/clients                  - Coach's client roster
GET    /api/coach/clients/:id              - Client details
GET    /api/coach/clients/:id/progression  - Strength/weight trends
GET    /api/coach/checkins/pending         - Pending check-ins
GET    /api/coach/insights/summary         - Weekly coaching insights
GET    /api/coach/alerts                   - Injury/energy/adherence flags
POST   /api/coach/send-adjustment/:clientId - Send program adjustment
```

---

## 4. Implementation Roadmap

### Week 1-2: Workout Logging Foundation
- [ ] Design WorkoutLogger UI
- [ ] Create workout_logs database schema
- [ ] Build log/edit/delete APIs
- [ ] Integrate into client dashboard
- [ ] Add coach chat context (show recent workout)

### Week 3-4: Check-In System
- [ ] Design check-in questionnaire
- [ ] Build check-in trigger logic (week 3/6/9)
- [ ] Create AI analysis function
- [ ] Build coach review interface
- [ ] Implement program generation

### Week 5-6: Coach Dashboard
- [ ] Design coach dashboard layout
- [ ] Build client roster view
- [ ] Create progression charts
- [ ] Build check-in queue
- [ ] Implement AI recommendations display

### Week 7: Testing & Refinement
- [ ] End-to-end testing
- [ ] User testing with sample clients
- [ ] Performance optimization
- [ ] Bug fixes

### Week 8: Deployment
- [ ] Deploy to staging
- [ ] Final QA
- [ ] Deploy to production

---

## 5. Database Schema Summary

```sql
-- Existing (enhance)
clients
check_ins
coach_chat_messages

-- New
workout_logs
workout_exercises
client_feelings
check_in_analyses
coach_recommendations
program_phases
client_progression_metrics
injury_reports
```

---

## 6. AI Integration Points

### Claude API Usage
```
1. Workout Analysis
   Input: Last 14 days of logs + feelings
   Output: Adherence rate, strength trends, recovery patterns

2. Check-in Analysis  
   Input: Client questionnaire + 3 weeks of workout data
   Output: Structured analysis, red flags, coaching recommendations

3. Coach Assistance
   Input: Client message + context of recent logs
   Output: Personalized coaching response

4. Dashboard Insights
   Input: All clients' recent data
   Output: Priority list of clients needing attention + suggestions
```

---

## 7. Success Metrics

- **Client Engagement**: Log rate (target: 80%+ of prescribed workouts logged)
- **Data Quality**: Completion of feelings/injuries (target: 70%+ complete)
- **Check-in Adoption**: 90%+ completion at 3/6/9 weeks
- **Coach Efficiency**: Time to review check-in reduced by 60%
- **AI Accuracy**: Coach agreement with AI recommendations (target: 80%+)
- **Program Adherence**: Clients completing prescribed adjustments (target: 85%+)

---

## 8. Technical Considerations

### Performance
- Cache workout aggregations (daily/weekly summaries)
- Pagination on workout history (20 per page)
- Debounce AI analysis calls (max 1 per client per day)

### Security
- Clients see only their own data
- Coaches see only their assigned clients
- Audit log for coach adjustments

### Scalability
- Separate AI processing queue for check-in analysis
- Archive old workouts after check-in
- Batch process weekly insights for coaches

---

## 9. Future Enhancements

- Mobile app for workout logging
- Wearable integration (Fitbit, Apple Watch)
- Video form analysis (client uploads form check videos)
- Group programming (cohort check-ins)
- Client-to-client community features
- Advanced analytics dashboard

---

## Questions for Clarification

1. **Existing Coach Chat**: Should workout logs auto-appear in chat context, or be manual?
2. **Check-in Timing**: Fixed at weeks 3/6/9, or customizable per client?
3. **Program Duration**: All programs 9 weeks, or variable?
4. **Injury Escalation**: Auto-flag certain injuries, or all to coach?
5. **AI Coach Personality**: Current tone/style in coaching messages?
6. **Coach Adjustments**: Can coaches create custom exercises, or select from library?

