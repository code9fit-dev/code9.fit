# Phase 1: Workout Logging Implementation Plan

## Overview
Activate and enhance existing workout tracking on programs with:
- Daily AI check-ins asking about workout completion
- Missed workout reason capture (sick, tired, etc.) with "hold" status
- Dashboard progress overview aligned with C9F theme
- 3/6/9 week progress summaries

## Architecture

### Data Model: Workout Session
```typescript
{
  sessionId: string;
  clientId: string;
  programId: string;
  week: number;
  day: number;
  plannedDate: ISO8601;
  
  // Completion Status
  status: "pending" | "completed" | "missed" | "on_hold";
  completedDate?: ISO8601;
  
  // Missed Workout Details
  missedReason?: "sick" | "tired" | "busy" | "injury" | "other";
  missedDetails?: string;
  onHoldUntil?: ISO8601; // When they plan to resume
  
  // Logged Performance
  exercises: {
    name: string;
    plannedSets: number;
    plannedReps: number;
    plannedWeight: number;
    actualSets?: number;
    actualReps?: number;
    actualWeight?: number;
    notes?: string;
  }[];
  
  // Feelings
  feelings: {
    energyLevel: 1-10;
    soreness: 1-10;
    mood: 1-10;
    sleepHours: number;
    sleepQuality: 1-10;
  };
  
  // Coaching
  aiSummary?: string; // AI summary of session
  coachNotes?: string;
  
  timestamp: ISO8601;
}
```

### Database Tables
```sql
CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL,
  program_id UUID NOT NULL,
  week INT,
  day INT,
  planned_date TIMESTAMP,
  status VARCHAR(20), -- pending, completed, missed, on_hold
  completed_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE session_exercises (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES workout_sessions,
  name VARCHAR(255),
  planned_sets INT,
  planned_reps INT,
  planned_weight DECIMAL,
  actual_sets INT,
  actual_reps INT,
  actual_weight DECIMAL,
  notes TEXT
);

CREATE TABLE session_missed (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES workout_sessions,
  reason VARCHAR(50), -- sick, tired, busy, injury, other
  details TEXT,
  on_hold_until TIMESTAMP
);

CREATE TABLE session_feelings (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES workout_sessions,
  energy_level INT,
  soreness INT,
  mood INT,
  sleep_hours DECIMAL,
  sleep_quality INT
);

CREATE TABLE session_ai_summaries (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES workout_sessions,
  summary TEXT,
  generated_at TIMESTAMP
);
```

## API Endpoints

### Workout Session Management
```
POST   /api/workouts/session/create
       - Create session when client starts workout

POST   /api/workouts/session/:id/complete
       - Mark workout complete with exercises and feelings

POST   /api/workouts/session/:id/miss
       - Mark workout missed with reason

GET    /api/workouts/client/:clientId/current-week
       - Get this week's scheduled workouts + current status

GET    /api/workouts/client/:clientId/progress
       - Get progress overview for dashboard

GET    /api/workouts/client/:clientId/summary
       - Get 3/6/9 week summaries
```

## UI Components Needed

### 1. Daily AI Check-In (Chat Integration)
```
AI Message: "Hey! Did you complete today's workout (Leg Day)?"

Client Options:
├─ "Yes, completed!" → Goes to detailed logging form
├─ "Not yet, doing it later" → Mark as pending
├─ "Skip today, not feeling it" → Capture reason → Mark as missed/hold
└─ "Can't do it today" → Detail modal for reason capture
```

### 2. Workout Logging Form
```
WorkoutLoggingForm.tsx
├─ Show planned workout
├─ Exercise by exercise:
│  ├─ Name (pre-filled)
│  ├─ Sets completed (input)
│  ├─ Reps completed (input)
│  ├─ Weight used (input)
│  └─ Notes (text)
├─ Post-workout feelings:
│  ├─ Energy level (1-10 slider)
│  ├─ Soreness (1-10 slider)
│  ├─ Mood (1-10 slider)
│  ├─ Sleep hours (decimal input)
│  └─ Sleep quality (1-10 slider)
└─ Buttons: Save | Save & Skip Rest Day | Cancel
```

### 3. Missed Workout Modal
```
MissedWorkoutForm.tsx
├─ "Why couldn't you complete today's workout?"
├─ Radio options:
│  ├─ Sick
│  ├─ Tired
│  ├─ Too busy
│  ├─ Injury
│  └─ Other (text input)
├─ "When do you plan to do this workout?"
│  └─ Date picker
├─ Additional notes (optional text)
└─ Buttons: Mark as Hold | Skip This Week
```

### 4. Dashboard Progress View
```
WorkoutProgressDashboard.tsx
├─ THIS WEEK
│  ├─ Workouts Completed: 3/4 (75%)
│  ├─ Week Overview Card:
│  │  ├─ Day 1 ✓ (completed)
│  │  ├─ Day 2 ✓ (completed)
│  │  ├─ Day 3 ✗ (missed - hold)
│  │  └─ Day 4 ⏳ (pending)
│  └─ Recent Feelings Average:
│     ├─ Energy: 7/10 📊
│     ├─ Soreness: 4/10 📊
│     └─ Sleep: 7.2 hrs 📊
│
├─ PROGRAM PROGRESS
│  ├─ Week 3/12 (25% complete)
│  ├─ Adherence: 92% (sessions completed)
│  ├─ Workouts on hold: 1
│  └─ [View All Weeks] button
│
├─ STRENGTH PROGRESSION (if data exists)
│  ├─ Main Lift Trends (line chart)
│  │  ├─ Squat: 185 → 195 lbs (+10)
│  │  ├─ Bench: 155 → 160 lbs (+5)
│  │  └─ Deadlift: 275 → 285 lbs (+10)
│  └─ [View Details]
│
└─ 3/6/9 WEEK SUMMARIES (if available)
   ├─ Week 3 Summary (if completed) [View]
   ├─ Week 6 Summary (if completed) [View]
   └─ Week 9 Summary (if completed) [View]
```

### 5. Summary Report (3/6/9 weeks)
```
ProgressSummary.tsx (WEEK 3, 6, or 9)
├─ Adherence Report
│  ├─ Sessions completed: 21/21 (100%)
│  ├─ Sessions missed/held: 0
│  ├─ Completion streak: 21 days
│  └─ Consistency: Excellent
│
├─ Strength Progression
│  ├─ Squat: 185 lbs → 195 lbs (+10 lbs, +5.4%)
│  ├─ Bench: 155 lbs → 160 lbs (+5 lbs, +3.2%)
│  └─ Deadlift: 275 lbs → 285 lbs (+10 lbs, +3.6%)
│
├─ Recovery Trends
│  ├─ Average energy: 7.4/10 (↑ from week 1)
│  ├─ Average sleep: 7.1 hours (stable)
│  ├─ Reported injuries: None
│  └─ Recovery status: On track
│
├─ AI Coach Summary
│  └─ "Great job! You've crushed 3 weeks. Energy 
│     improving (+0.5/week), strength up across all
│     lifts. Sleep slightly low—consider 30 min
│     earlier bed. Ready for week 4?"
│
└─ Next Steps
   ├─ [View Next Phase] (Coach-adjusted program)
   ├─ [Share with Coach]
   └─ [Continue Current Program]
```

## Implementation Steps

### Step 1: Database & APIs (Parallel)
- [ ] Create Supabase tables
- [ ] Create API routes for session management
- [ ] Create helper functions for data aggregation

### Step 2: AI Integration
- [ ] Add daily check-in prompt to coach chat
- [ ] Create "Did you complete today?" detection
- [ ] Build missed workout → reason flow

### Step 3: Frontend Components
- [ ] WorkoutLoggingForm.tsx
- [ ] MissedWorkoutForm.tsx
- [ ] WorkoutProgressDashboard.tsx
- [ ] ProgressSummary.tsx

### Step 4: Dashboard Integration
- [ ] Add progress widget to existing dashboard
- [ ] Style aligned with C9F theme (cream, gold, ink colors)
- [ ] Mobile responsive

### Step 5: Testing
- [ ] Test logging workflow
- [ ] Test AI prompts
- [ ] Test progress calculations
- [ ] Test summary generation

## UI/Theme Alignment

Use existing C9F color palette:
```css
--c9-cream: #F5F1EA
--c9-line: #E3DDD2
--c9-gold: #B8915A
--c9-gold-d: #94703F
--c9-gold-soft: #F2EADD
--c9-ink: #13201C
--c9-ink-2: #1E2E29
--c9-muted: #5C605B
--c9-white: #fff
```

Components should use:
- Space Grotesk for headings
- IBM Plex Sans for body
- Card design with borders (border-line color)
- Gold accents for highlights
- Consistent spacing (8px grid)

## Success Criteria
- ✓ Clients can log workouts daily
- ✓ Missed workouts captured with reason
- ✓ AI asks about completion automatically
- ✓ Dashboard shows progress clearly
- ✓ 3/6/9 week summaries generate automatically
- ✓ All data flows to check-in system
- ✓ UI matches C9F design system

