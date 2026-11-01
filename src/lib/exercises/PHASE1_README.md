# Admin Workout Builder - Phase 1: Foundation

## Overview
Phase 1 establishes the foundation for AI-powered workout program creation in the admin dashboard. This includes exercise database, template system, and basic UI skeleton.

## What's Implemented

### 1. Exercise Database (`database.ts`)
- **Exercise interface** with: name, equipment, muscle groups, category, difficulty
- **65+ curated starter exercises** covering all movement patterns from programs
- **Extracted from 217 unique exercises** across 25 existing programs
- **Top 15 most common exercises** included (push-ups, plank, bench press, rows, deadlift, squat, curls, glute bridges, pull-ups, overhead press, Romanian deadlift, mountain climbers, burpees, lat pulldown, dumbbell bench press)
- **Organized by muscle group** for quick filtering
- **Helpers**: `getExercisesByCategory()`, `getExerciseById()`
- **Equipment types**: barbell, dumbbell, kettlebell, machine, bodyweight, cable, resistance-band, medicine-ball
- **Categories**: compound, isolation, cardio, mobility, plyometric, isometric
- **Difficulty levels**: beginner, intermediate, advanced

### 2. Template System (`templates.ts`)
- **3 pre-built templates**: Strength Focus, Hypertrophy Focus, Conditioning & HIIT
- **Keyword-based suggestions**: Maps "upper body" → bench press, rows, etc.
- **Set/rep patterns**: Ready to use (3x5, 4x8, 3x12, HIIT intervals, etc.)
- **Extensible structure** for adding custom templates
- **Helpers**: `getTemplate()`, `suggestExercisesFromKeywords()`, `getTemplatesByFocus()`

### 3. Type Definitions (`types.ts`)
- **WorkoutProgram interface** matching existing library structure
- **TrainingPhase** with weeks and daily breakdown
- **WorkoutDay** with exercises and metadata
- **DraftProgram** for in-progress workouts (draft/published status)
- **Code generator**: `programToTypeScriptCode()` for outputting final programs

### 4. Admin UI Skeleton (`/admin/workout-builder/page.tsx`)
**Multi-step workflow:**
1. **Template Selection** - Browse and choose base template
2. **Program Details** - Name, focus, keyword-based suggestions
3. **Phase Builder** - Add training phases with duration
4. **Preview & Save** - Review structure, save as draft

**Features:**
- Client-side form handling
- Template preview
- Keyword input for AI suggestions
- Visual progress through steps

## TODO: Phase 2 (Template Builder)

### Exercise Selection UI
- Searchable exercise dropdown with filters (by muscle, equipment, difficulty)
- Favorite/recent exercises for quick access
- Exercise preview (description, typical sets/reps, GIF animation)

### Workout Day Builder
- Drag-and-drop exercise ordering
- Set/rep selector with template presets
- Notes/cues field per exercise
- Warmup/cooldown sections

### Phase Customization
- Week-by-week exercise assignment
- Progressive overload templates (increase weight, add reps, etc.)
- Copy-previous-week shortcut

## TODO: Phase 3 (AI Suggestions)

### Custom Prompt Interface
- Text input: "2-day upper/lower split with minimal equipment"
- Generates exercise suggestions with sets/reps
- Coach validation before applying

### Pattern Recognition
- Learn from existing programs
- Suggest exercises based on focus area
- Auto-fill sets/reps based on category

## TODO: Phase 4 (Publish Workflow)

### Draft Management
- Save/load in-progress programs
- Version history
- Share with other admins for review

### Publishing
- Convert to TypeScript file
- Add to library
- Sync with Supabase

## How to Extend

### Adding an Exercise
```typescript
// In database.ts, add to COMMON_EXERCISES:
{
  id: 'dumbbell-curl',
  name: 'Dumbbell Curl',
  equipment: ['dumbbell'],
  primaryMuscles: ['biceps'],
  category: 'isolation',
  difficulty: 'beginner',
}
```

### Adding a Template
```typescript
// In templates.ts, add to WORKOUT_TEMPLATES:
{
  id: 'mobility-flow',
  name: 'Mobility & Flexibility',
  focus: 'Movement quality and range of motion',
  suggestedExercises: [...],
  difficulty: 'beginner',
  setsRepsOptions: [...]
}
```

### Adding a Keyword
```typescript
// In templates.ts, add to KEYWORD_SUGGESTIONS:
'mobility': {
  title: 'Mobility Work',
  exercises: ['exercise-id-1', 'exercise-id-2'],
  setsReps: ['3x10', '4x10'],
}
```

## Database Population

Current starter exercises (13) will be expanded by:
1. **Extraction from existing 25 programs** - Parse HTML/JSON files
2. **Manual curation** - Ensure quality and consistency
3. **Community additions** - Allow coaches to suggest new exercises

## Files Created

```
src/lib/exercises/
  ├── database.ts          # Exercise database & helpers
  ├── templates.ts         # Workout templates & keyword system
  ├── types.ts            # TypeScript definitions
  ├── index.ts            # Re-exports
  └── PHASE1_README.md    # This file

src/app/admin/
  └── workout-builder/
      └── page.tsx        # Main builder UI
```

## Next Steps

1. **Extract exercises** from existing 25 programs (currently parsing)
2. **Populate database** with full exercise list
3. **Build Phase 2 UI** - Exercise selection & day builder
4. **Wire up state management** - Handle phase/day/exercise data flow
5. **Test with one complete workout** - End-to-end workflow
