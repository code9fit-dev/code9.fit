# Workout Logging API - Phase 1 Implementation

## Overview

This document describes the Phase 1 workout logging system for Code9 Fitness. The system tracks:
- Workout session creation and completion
- Exercise performance (sets, reps, weights)
- Missed workouts with reasons
- Post-workout feelings (energy, soreness, mood, sleep)
- Progress aggregation and analysis

## Database Schema

### Tables

**workout_sessions**
- Primary session tracking table
- Statuses: `pending`, `completed`, `missed`, `on_hold`
- Linked to client and program

**session_exercises**
- Individual exercise logs per session
- Captures planned vs actual performance
- Supports multiple exercises per session

**session_missed**
- Captures reason when workout is skipped
- Supports "hold until" dates for temporary holds
- Reasons: sick, tired, busy, injury, other

**session_feelings**
- Post-workout subjective metrics
- Energy level, soreness, mood (1-10 scale)
- Sleep hours and quality tracking

**session_ai_summaries** (optional)
- Stores AI-generated insights about sessions
- Expandable for future ML integration

### Row-Level Security (RLS)

- Clients can only access their own workout data
- Admins can access all data
- Related tables are accessible through session ownership

## API Endpoints

### 1. Create Session

```
POST /api/workouts/session/create
```

Creates a new workout session.

**Request:**
```json
{
  "program_id": "hybrid-focus-intermediate",
  "week": 1,
  "day": 1,
  "planned_date": "2024-10-20",
  "exercises": [
    {
      "name": "Back Squat",
      "planned_sets": 4,
      "planned_reps": 6,
      "planned_weight": 185
    },
    {
      "name": "Bench Press",
      "planned_sets": 4,
      "planned_reps": 8,
      "planned_weight": 155
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "session": {
    "id": "uuid",
    "client_id": "uuid",
    "program_id": "hybrid-focus-intermediate",
    "week": 1,
    "day": 1,
    "planned_date": "2024-10-20",
    "status": "pending",
    "created_at": "2024-10-20T10:00:00Z",
    "updated_at": "2024-10-20T10:00:00Z"
  },
  "exercises": [
    {
      "id": "uuid",
      "session_id": "uuid",
      "name": "Back Squat",
      "planned_sets": 4,
      "planned_reps": 6,
      "planned_weight": 185,
      "created_at": "2024-10-20T10:00:00Z"
    }
  ]
}
```

### 2. Complete Session

```
POST /api/workouts/session/:id/complete
```

Marks a session as complete with actual performance and feelings.

**Request:**
```json
{
  "exercises": [
    {
      "id": "exercise-uuid",
      "name": "Back Squat",
      "actual_sets": 4,
      "actual_reps": 6,
      "actual_weight": 195,
      "notes": "Felt strong"
    }
  ],
  "energy_level": 8,
  "soreness": 3,
  "mood": 7,
  "sleep_hours": 7.5,
  "sleep_quality": 8
}
```

**Response:**
```json
{
  "success": true,
  "session": {
    "id": "uuid",
    "status": "completed",
    "completed_date": "2024-10-20T18:30:00Z",
    "exercises": [...],
    "feelings": {
      "energy_level": 8,
      "soreness": 3,
      "mood": 7,
      "sleep_hours": 7.5,
      "sleep_quality": 8
    }
  }
}
```

### 3. Mark Session Missed

```
POST /api/workouts/session/:id/miss
```

Marks a workout as missed with optional reason and hold date.

**Request:**
```json
{
  "reason": "sick",
  "details": "Had a cold, didn't want to push it",
  "on_hold_until": "2024-10-22"
}
```

**Response:**
```json
{
  "success": true,
  "session": {
    "id": "uuid",
    "status": "on_hold",
    "missed": {
      "reason": "sick",
      "details": "Had a cold, didn't want to push it",
      "on_hold_until": "2024-10-22"
    }
  }
}
```

### 4. Get Current Week

```
GET /api/workouts/client/:clientId/current-week
```

Retrieves this week's scheduled workouts with current status.

**Response:**
```json
{
  "success": true,
  "week": {
    "start_date": "2024-10-20",
    "sessions": [
      {
        "id": "uuid",
        "planned_date": "2024-10-20",
        "status": "completed",
        "exercises": [
          {
            "name": "Back Squat",
            "actual_weight": 195
          }
        ]
      }
    ]
  }
}
```

### 5. Get Progress Dashboard

```
GET /api/workouts/client/:clientId/progress
```

Returns current week metrics and overall stats for dashboard display.

**Response:**
```json
{
  "success": true,
  "data": {
    "current_week": {
      "start_date": "2024-10-20",
      "end_date": "2024-10-26",
      "sessions": [...],
      "metrics": {
        "week": 1,
        "total_sessions": 4,
        "completed_sessions": 3,
        "missed_sessions": 0,
        "avg_energy_level": 7.3,
        "avg_soreness": 3.2,
        "avg_mood": 7.1,
        "avg_sleep_hours": 7.4
      },
      "adherence_pct": 75
    },
    "overall_stats": {
      "total_sessions_logged": 12,
      "total_completed": 11,
      "total_missed": 1,
      "total_held": 0,
      "adherence_pct": 92
    }
  }
}
```

### 6. Get Progress Summary (3/6/9 weeks)

```
GET /api/workouts/client/:clientId/summary?program_id=hybrid-focus-intermediate&week=3
```

Generates comprehensive summary for milestone weeks.

**Response:**
```json
{
  "success": true,
  "summary": {
    "week": 3,
    "adherence_pct": 95,
    "total_completed": 20,
    "total_planned": 21,
    "sessions_missed": 1,
    "sessions_held": 0,
    "strength_progressions": [
      {
        "exercise_name": "Back Squat",
        "week_start": 1,
        "week_end": 3,
        "starting_weight": 185,
        "ending_weight": 200,
        "weight_change": 15,
        "weight_change_pct": 8.1
      }
    ],
    "weekly_metrics": [
      {
        "week": 1,
        "total_sessions": 7,
        "completed_sessions": 6,
        "avg_energy_level": 7.2,
        "avg_soreness": 3.5
      }
    ],
    "generated_at": "2024-11-10T15:00:00Z"
  }
}
```

## Helper Functions

### Database Service (`/src/lib/workouts/service.ts`)

```typescript
// Create session
await createWorkoutSession(supabase, clientId, programId, {
  week: 1,
  day: 1,
  planned_date: "2024-10-20"
});

// Add exercises
await addSessionExercises(supabase, sessionId, [
  { name: "Squat", planned_sets: 4, planned_reps: 6 }
]);

// Complete session
await completeWorkoutSession(supabase, sessionId, {
  exercises: [...],
  energy_level: 8,
  sleep_hours: 7.5
});

// Mark missed
await markSessionMissed(supabase, sessionId, {
  reason: "sick",
  on_hold_until: "2024-10-22"
});

// Fetch session
await getWorkoutSession(supabase, sessionId);

// Get week's workouts
await getClientCurrentWeek(supabase, clientId);

// Get sessions in range
await getClientSessions(supabase, clientId, "2024-10-20", "2024-10-26");
```

### Analytics (`/src/lib/workouts/analytics.ts`)

```typescript
// Calculate adherence percentage
const adherence = calculateAdherence(sessions); // 0-100

// Aggregate weekly metrics
const metrics = aggregateWeeklyMetrics(sessions);
// Returns: { avg_energy_level, avg_soreness, avg_mood, avg_sleep_hours, ... }

// Calculate strength progression for one exercise
const squat = calculateExerciseProgression(week1Sessions, week3Sessions, "Back Squat");
// Returns: { exercise_name, starting_weight, ending_weight, weight_change_pct, ... }

// Get all strength progressions
const progressions = calculateAllStrengthProgressions(startSessions, endSessions);

// Generate 3/6/9 week summary
const summary = await generateProgressSummary(supabase, clientId, programId, 3);
// Returns comprehensive stats with adherence, strength gains, metrics trends

// Get dashboard data
const dashboardData = await getDashboardProgress(supabase, clientId);
// Returns current week + overall stats
```

## Usage Examples

### Example 1: Log a Complete Workout Day

```typescript
import { getSupabaseServerClient } from '@/lib/supabase/server';
import {
  createWorkoutSession,
  addSessionExercises,
  completeWorkoutSession,
} from '@/lib/workouts';

async function logWorkoutDay(clientId: string, programId: string) {
  const supabase = await getSupabaseServerClient();

  // 1. Create session
  const session = await createWorkoutSession(supabase, clientId, programId, {
    week: 1,
    day: 1,
    planned_date: new Date().toISOString().split('T')[0],
  });

  // 2. Add exercises
  const exercises = await addSessionExercises(supabase, session.id, [
    { name: 'Back Squat', planned_sets: 4, planned_reps: 6, planned_weight: 185 },
    { name: 'Bench Press', planned_sets: 4, planned_reps: 8, planned_weight: 155 },
  ]);

  // 3. Complete with actual performance
  const completed = await completeWorkoutSession(supabase, session.id, {
    exercises: [
      {
        id: exercises[0].id,
        name: 'Back Squat',
        actual_sets: 4,
        actual_reps: 6,
        actual_weight: 195,
      },
    ],
    energy_level: 8,
    soreness: 3,
    mood: 7,
    sleep_hours: 7.5,
    sleep_quality: 8,
  });

  return completed;
}
```

### Example 2: Get Progress Dashboard

```typescript
import { getDashboardProgress } from '@/lib/workouts';

async function showProgressDashboard(clientId: string) {
  const supabase = await getSupabaseServerClient();
  const progress = await getDashboardProgress(supabase, clientId);

  console.log(`This week's adherence: ${progress.current_week.adherence_pct}%`);
  console.log(`Overall adherence: ${progress.overall_stats.adherence_pct}%`);
  console.log(`Energy level: ${progress.current_week.metrics.avg_energy_level}/10`);
}
```

### Example 3: Generate 3-Week Summary

```typescript
import { generateProgressSummary } from '@/lib/workouts';

async function showSummary(clientId: string, programId: string) {
  const supabase = await getSupabaseServerClient();
  const summary = await generateProgressSummary(supabase, clientId, programId, 3);

  console.log(`3-week adherence: ${summary.adherence_pct}%`);
  console.log('Strength gains:');
  summary.strength_progressions.forEach((prog) => {
    console.log(`  ${prog.exercise_name}: +${prog.weight_change} lbs (${prog.weight_change_pct}%)`);
  });
}
```

## Integration Points

### With Coach Chat
- AI check-in asks: "Did you complete today's workout?"
- Client response triggers session creation via this API
- AI can call functions to fetch progress for personalized feedback

### With Check-In System
- `session_feelings` mirrors existing check-in metrics
- Session completion can trigger check-in data flow
- Progress summaries feed into coach dashboard

### With Programs/Plans
- `program_id` links sessions to specific programs
- `week` and `day` align with program structure
- Enables program-level progress tracking

## Testing

Test with `curl` or similar:

```bash
# Create session
curl -X POST http://localhost:3000/api/workouts/session/create \
  -H "Content-Type: application/json" \
  -d '{
    "program_id": "hybrid-focus-intermediate",
    "week": 1,
    "day": 1,
    "planned_date": "2024-10-20"
  }'

# Get current week
curl http://localhost:3000/api/workouts/client/{clientId}/current-week

# Get progress
curl http://localhost:3000/api/workouts/client/{clientId}/progress

# Get 3-week summary
curl "http://localhost:3000/api/workouts/client/{clientId}/summary?program_id=hybrid-focus-intermediate&week=3"
```

## Notes

- All timestamps in ISO 8601 format (UTC)
- Dates in YYYY-MM-DD format
- Row-level security ensures clients can only access own data
- All API endpoints require authentication
- Empty arrays returned when no data available
- Progress calculations are real-time (no caching)

## Future Enhancements

- AI-generated session summaries
- Strength prediction models
- Plate loading calculator
- Video/image logging for exercises
- Social sharing of progress
- Custom exercise names per user
