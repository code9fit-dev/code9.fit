# Phase 1: Daily AI Workout Check-Ins

This module implements daily AI-driven workout completion tracking for the Code9 Fitness coaching system.

## Overview

The coaching integration automatically triggers daily check-ins when a client enters a coaching chat, asking whether they completed their scheduled workout. Based on their response, the system:

1. **Detects completion status** from conversational text (yes/no/skipped/missed)
2. **Generates contextual prompts** that reference recent performance and consistency
3. **Captures missed workout reasons** with options (sick, tired, busy, injury, other)
4. **Reschedules missed workouts** by capturing the intended date
5. **Integrates with AI coach** via two new tool calls for recording workout events

## Architecture

### Core Modules

#### `workout-detection.ts`
Pattern-matching engine that parses user responses to detect workout completion:
- **detectWorkoutCompletion()** - Returns `{status, confidence, indicators}`
- Status: `'completed' | 'not_yet' | 'skipped' | 'missed' | 'unclear'`
- ~95% confidence on explicit yes/no, 85%+ on modal verbs (will/gonna/not yet)

**Example:**
```typescript
const result = detectWorkoutCompletion("yeah I just finished leg day");
// { status: 'completed', confidence: 0.95, indicators: ['just finished'] }
```

#### `check-in-generation.ts`
Generates contextual AI prompts and formatting:
- **generateWorkoutCheckIn()** - Creates the opening daily prompt with context
- **generateFollowUp()** - Response based on completion status
- **formatMissedWorkoutOptions()** - Returns structured button options
- **buildCheckInContext()** - Enriches prompt with recent data

**Example:**
```typescript
const prompt = generateWorkoutCheckIn({
  todayWorkoutType: "Leg Day",
  consecutiveDaysCompleted: 5,
  weekCompletionStats: { completedThisWeek: 3, totalScheduledThisWeek: 4 }
});
// "Hey! Did you complete Leg Day today?
//  (You've been crushing it — 5 days in a row!)
//  This week: 3/4 workouts done."
```

#### `api-client.ts`
Thin client layer for workout API endpoints:
- **createWorkoutSession()** - POST /api/workouts/session/create
- **missWorkoutSession()** - POST /api/workouts/session/:id/miss
- **completeWorkoutSession()** - POST /api/workouts/session/:id/complete
- **getWeekWorkouts()** - GET /api/workouts/client/:id/current-week

### Components

#### `<DailyWorkoutCheckIn />`
React component that renders the daily check-in flow. Multi-step UI:

**Step 1: Initial Check-In**
```
Coach: "Did you complete today's workout (Leg Day)?"
Client: [text input] [Send button]
```

**Step 2: (If Missed/Skipped) Reason Selection**
```
Coach: "Why couldn't you complete it?"
Buttons: [Sick] [Tired] [Too Busy] [Injury] [Motivation] [Other]
```

**Step 3: (If Not Yet/Missed) Reschedule**
```
Coach: "When will you do it?"
Input: [Date picker] [Save]
```

**Props:**
```typescript
interface DailyWorkoutCheckInProps {
  coachId: string;
  clientId: string;
  clientName?: string;
  todayWorkoutType?: string;
  latestCheckIn?: ClientCheckIn | null;
  recentSessions?: ClientSessionLog[];
  onResponse?: (status, details) => void;
  onClose?: () => void;
}
```

### Coach Integration

#### AI Coach System Prompt

Two new tools added to all coaches:

1. **record_workout_completion()**
   ```json
   {
     "status": "completed|not_yet|skipped|missed",
     "reason": "sick|tired|busy|injury|other",
     "rescheduled_for": "YYYY-MM-DD",
     "notes": "any context"
   }
   ```

2. **record_missed_workout()**
   ```json
   {
     "reason": "sick|tired|busy|injury|motivation",
     "rescheduled_for": "YYYY-MM-DD",
     "notes": "coaching context"
   }
   ```

These tools allow coaches to explicitly signal workout events, which the app then records in the database.

#### New Prompt Block: `DAILY_CHECKIN_PROTOCOL`

Added to `/src/lib/coach/prompt-blocks.ts`:
- Instructs coaches on daily check-in flow
- Specifies tone and response patterns
- References the new tool calls
- Integrated into all coach personas via prompt assembly

## Usage

### 1. Automatic Daily Check-Ins (Coach Chat Page)

In `/src/app/coach/chat/[clientId]/page.tsx`:

```typescript
// On page load, automatically trigger daily check-in if 24+ hours have passed
const shouldTrigger = shouldTriggerDailyCheckIn(latestCheckIn?.submitted_at);
setShowDailyCheckIn(shouldTrigger);

// Render the component
{showDailyCheckIn && (
  <DailyWorkoutCheckIn
    coachId={user.id}
    clientId={clientId}
    latestCheckIn={latestCheckIn}
    recentSessions={recentSessions}
    onResponse={(status, details) => {
      // Handle the response (could trigger full check-in flow)
      setShowDailyCheckIn(false);
    }}
  />
)}
```

### 2. Programmatic Detection

In custom components or API handlers:

```typescript
import { detectWorkoutCompletion } from '@/lib/coaching';

// In a chat handler
const userMessage = "Yeah, just finished the leg workout";
const result = detectWorkoutCompletion(userMessage);

if (result.status === 'completed') {
  // Auto-open workout logging
}
```

### 3. Building Context

```typescript
import { buildCheckInContext } from '@/lib/coaching';

const context = buildCheckInContext(latestCheckIn, recentSessions);
// context includes:
// - weekCompletionStats
// - consecutiveDaysCompleted
// - lastWorkoutType

const prompt = generateWorkoutCheckIn(context);
```

## Data Flow

```
Client Opens Chat
    ↓
Check if 24+ hours since last check-in
    ↓ (YES)
Show <DailyWorkoutCheckIn /> component
    ↓
Client responds (AI or manual)
    ↓
detectWorkoutCompletion() parses response
    ↓
Route by status:
├─ 'completed'  → Show logging form or AI confirmation
├─ 'not_yet'    → Encouragement, ask to check in later
├─ 'skipped'    → Ask why, capture reason
└─ 'missed'     → Ask why + reschedule
    ↓
onResponse callback fires with (status, details)
    ↓ (Optional)
submitCheckIn() saves to Supabase
    OR
API call to /api/workouts/session/[id]/miss
```

## AI Coach Flow (Future Integration)

Once the coach API is connected to the chat:

```
1. Coach system prompt includes DAILY_CHECKIN_PROTOCOL
2. Coach naturally asks: "Did you complete today's workout?"
3. Client responds conversationally
4. Coach calls record_workout_completion() tool
5. App records event and updates UI
6. Coach can follow up or suggest logging
```

## Type Definitions

```typescript
// Workout Detection
type WorkoutCompletionStatus = 'completed' | 'not_yet' | 'skipped' | 'missed' | 'unclear';

interface WorkoutDetectionResult {
  status: WorkoutCompletionStatus;
  confidence: number; // 0-1
  rawMessage: string;
  indicators: string[]; // matching patterns
}

// Context for Check-In Generation
interface WorkoutCheckInContext {
  clientName?: string;
  todayWorkoutType?: string;
  weekCompletionStats?: {
    completedThisWeek: number;
    totalScheduledThisWeek: number;
    energyAverageThisWeek?: number; // 1-10
  };
  consecutiveDaysCompleted?: number;
  lastWorkoutDate?: string;
  lastWorkoutType?: string;
}

// Missed Workout Reason Options
interface MissedWorkoutOption {
  value: string;
  label: string;
  description: string;
}
```

## Key Functions

### Exported from `index.ts`

- `shouldTriggerDailyCheckIn(lastCheckInTime: string | null): boolean`
- `getWeekStartDate(date?: Date): string`
- `getWeekEndDate(date?: Date): string`
- `formatDateForDisplay(dateStr: string): string`

### Exported from `workout-detection.ts`

- `detectWorkoutCompletion(message: string): WorkoutDetectionResult`
- `isWorkoutIncomplete(status: WorkoutCompletionStatus): boolean`
- `isWorkoutComplete(status: WorkoutCompletionStatus): boolean`
- `summarizeDetection(result: WorkoutDetectionResult): string`

### Exported from `check-in-generation.ts`

- `generateWorkoutCheckIn(context: WorkoutCheckInContext): string`
- `generateFollowUp(status, context?): string`
- `formatMissedWorkoutOptions(): MissedWorkoutOption[]`
- `generateReschedulePrompt(reason: string): string`
- `buildCheckInContext(latestCheckIn, recentSessions, todayWorkoutType?): WorkoutCheckInContext`
- `parseCheckInResponse(message: string): {status, confidence}`

### Exported from `api-client.ts`

- `createWorkoutSession(programId, plannedDate, options?): Promise<any>`
- `missWorkoutSession(sessionId, reason?, rescheduledFor?): Promise<any>`
- `completeWorkoutSession(sessionId, data?): Promise<any>`
- `getWeekWorkouts(clientId): Promise<any>`
- `getWorkoutSummary(clientId): Promise<any>`

## Testing

### Unit Tests (Recommended)

```typescript
// workout-detection.test.ts
describe('detectWorkoutCompletion', () => {
  it('detects explicit completion', () => {
    const result = detectWorkoutCompletion('yes, finished it');
    expect(result.status).toBe('completed');
    expect(result.confidence).toBeGreaterThan(0.9);
  });
  
  it('detects missed with low confidence on ambiguous', () => {
    const result = detectWorkoutCompletion('not sure if I can make it');
    expect(result.status).toBe('unclear');
  });
});

// check-in-generation.test.ts
describe('generateWorkoutCheckIn', () => {
  it('includes streak in prompt', () => {
    const prompt = generateWorkoutCheckIn({
      consecutiveDaysCompleted: 5,
      todayWorkoutType: 'Leg Day'
    });
    expect(prompt).toContain('5 days in a row');
  });
});
```

### Integration Tests

```typescript
// In coach chat page test
it('shows daily check-in if 24+ hours since last check-in', async () => {
  const oldCheckIn = { submitted_at: getDateNDaysAgo(2) };
  render(<CoachChatPage />);
  
  expect(screen.getByText(/did you complete/i)).toBeInTheDocument();
});
```

## Future Enhancements

### Phase 2: AI Coach Integration
- Wire coach API to accept workout completion from conversational flow
- Parse coach responses for missing workout reasons
- Auto-create sessions when workouts mentioned

### Phase 3: Context Enrichment
- Include energy levels, recovery scores in prompts
- Reference performance trends ("You've hit 4/4 this week")
- Suggest rest days based on overtraining signals

### Phase 4: Adaptive Check-Ins
- Time checks based on client's typical workout time
- Adjust frequency based on adherence patterns
- Escalate to human if pattern of misses detected

## Files Modified / Created

**New Files:**
- `/src/lib/coaching/workout-detection.ts`
- `/src/lib/coaching/check-in-generation.ts`
- `/src/lib/coaching/api-client.ts`
- `/src/lib/coaching/index.ts`
- `/src/lib/coaching/README.md`
- `/src/components/DailyWorkoutCheckIn.tsx`

**Modified Files:**
- `/src/app/coach/chat/[clientId]/page.tsx` - Integrated daily check-in trigger
- `/src/lib/coach/prompt-blocks.ts` - Added DAILY_CHECKIN_PROTOCOL
- `/src/lib/coach/assemble.ts` - Added workout tools to COACH_TOOLS

## Notes

- All text patterns (completion/missed) are case-insensitive
- Confidence scoring helps distinguish explicit vs. ambiguous responses
- Component is fully decoupled from coach chat — can be used standalone
- API client uses existing endpoints (no new backend work needed)
- Ready for integration with streaming coach responses
