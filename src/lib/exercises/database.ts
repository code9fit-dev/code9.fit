// Exercise Database - extracted from existing programs
// Comprehensive analysis found 217 unique exercises across 25 programs
// This database contains 65+ curated starter exercises (top performers + common patterns)
// Each exercise includes: name, equipment, muscle groups, category, difficulty
//
// Movement Patterns Found:
// - Core (42 exercises) - Abs, obliques, stability
// - Pull (41 exercises) - Back, biceps, rear delts
// - Push (35 exercises) - Chest, shoulders, triceps
// - Conditioning (32 exercises) - Cardio, HIIT, metabolic
// - Hinge (26 exercises) - Glutes, hamstrings, lower back
// - Squat (20 exercises) - Quads, glutes
// - Lunge (18 exercises) - Single-leg movements
// - Carry (3 exercises) - Loaded carries, grip

export interface Exercise {
  id: string;
  name: string;
  equipment: Equipment[];
  primaryMuscles: MuscleGroup[];
  secondaryMuscles?: MuscleGroup[];
  category: ExerciseCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
}

export type Equipment =
  | 'barbell'
  | 'dumbbell'
  | 'kettlebell'
  | 'machine'
  | 'bodyweight'
  | 'resistance-band'
  | 'cable'
  | 'medicine-ball'
  | 'box'
  | 'plate';

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'core'
  | 'abs'
  | 'obliques';

export type ExerciseCategory =
  | 'compound'
  | 'isolation'
  | 'cardio'
  | 'mobility'
  | 'plyometric'
  | 'isometric';

// Exercises extracted from Code9 Fitness program library
// 60+ exercises organized by movement pattern
export const COMMON_EXERCISES: Exercise[] = [
  // COMPOUND LOWER BODY
  {
    id: 'barbell-squat',
    name: 'Barbell Back Squat',
    equipment: ['barbell'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings', 'core'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    equipment: ['barbell'],
    primaryMuscles: ['hamstrings', 'glutes'],
    secondaryMuscles: ['back', 'quads', 'core'],
    category: 'compound',
    difficulty: 'advanced',
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    equipment: ['machine'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings'],
    category: 'compound',
    difficulty: 'beginner',
  },
  {
    id: 'hack-squat',
    name: 'Hack Squat',
    equipment: ['machine'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings'],
    category: 'compound',
    difficulty: 'beginner',
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    equipment: ['dumbbell', 'bodyweight'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings', 'core'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  // COMPOUND UPPER BODY - PUSH
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    equipment: ['barbell'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'dumbbell-bench-press',
    name: 'Dumbbell Bench Press',
    equipment: ['dumbbell'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'incline-bench-press',
    name: 'Incline Bench Press',
    equipment: ['barbell', 'dumbbell'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    equipment: ['bodyweight'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    category: 'compound',
    difficulty: 'beginner',
  },
  {
    id: 'box-push-ups',
    name: 'Box Push-Ups',
    equipment: ['bodyweight'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    category: 'plyometric',
    difficulty: 'intermediate',
  },
  {
    id: 'plyometric-push-ups',
    name: 'Plyometric Push-Ups',
    equipment: ['bodyweight'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    category: 'plyometric',
    difficulty: 'advanced',
  },
  // COMPOUND UPPER BODY - PULL
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    equipment: ['bodyweight'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    category: 'compound',
    difficulty: 'advanced',
  },
  {
    id: 'chin-ups',
    name: 'Chin-ups',
    equipment: ['bodyweight'],
    primaryMuscles: ['back', 'biceps'],
    secondaryMuscles: ['shoulders'],
    category: 'compound',
    difficulty: 'advanced',
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    equipment: ['barbell'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'bent-over-row',
    name: 'Bent-Over Row',
    equipment: ['barbell', 'dumbbell'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'dumbbell-row',
    name: 'Dumbbell Row',
    equipment: ['dumbbell'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'explosive-dumbbell-row',
    name: 'Explosive Dumbbell Row',
    equipment: ['dumbbell'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    category: 'plyometric',
    difficulty: 'intermediate',
  },
  // SHOULDER WORK
  {
    id: 'shoulder-press',
    name: 'Shoulder Press',
    equipment: ['barbell', 'dumbbell'],
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'chest'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'dumbbell-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    equipment: ['dumbbell'],
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'lateral-raise',
    name: 'Lateral Raise',
    equipment: ['dumbbell'],
    primaryMuscles: ['shoulders'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  // ISOLATION - ARMS
  {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    equipment: ['dumbbell', 'barbell'],
    primaryMuscles: ['biceps'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'tricep-dip',
    name: 'Tricep Dip (Chair)',
    equipment: ['bodyweight'],
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['chest'],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'tricep-rope-pushdown',
    name: 'Tricep Rope Pushdown',
    equipment: ['cable'],
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  // CORE
  {
    id: 'plank',
    name: 'Plank',
    equipment: ['bodyweight'],
    primaryMuscles: ['core', 'abs'],
    secondaryMuscles: ['shoulders'],
    category: 'isometric',
    difficulty: 'beginner',
  },
  {
    id: 'ab-crunch',
    name: 'Ab Crunch',
    equipment: ['bodyweight'],
    primaryMuscles: ['abs'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'bicycle-crunch',
    name: 'Bicycle Crunch',
    equipment: ['bodyweight'],
    primaryMuscles: ['abs', 'obliques'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    equipment: ['bodyweight'],
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'core'],
    category: 'compound',
    difficulty: 'beginner',
  },
  {
    id: 'seated-knee-tuck',
    name: 'Seated Knee Tuck',
    equipment: ['bodyweight'],
    primaryMuscles: ['abs', 'core'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'side-leg-raise',
    name: 'Side Leg Raise',
    equipment: ['bodyweight'],
    primaryMuscles: ['glutes', 'obliques'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'bird-dog',
    name: 'Bird-Dog',
    equipment: ['bodyweight'],
    primaryMuscles: ['core', 'glutes'],
    secondaryMuscles: ['back'],
    category: 'isometric',
    difficulty: 'beginner',
  },
  {
    id: 'v-sit',
    name: 'V-Sit',
    equipment: ['bodyweight'],
    primaryMuscles: ['abs', 'core'],
    secondaryMuscles: [],
    category: 'isometric',
    difficulty: 'intermediate',
  },
  // CARDIO & CONDITIONING
  {
    id: 'kettlebell-swing',
    name: 'Kettlebell Swing',
    equipment: ['kettlebell'],
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'core', 'back'],
    category: 'cardio',
    difficulty: 'intermediate',
  },
  {
    id: 'burpee',
    name: 'Burpee',
    equipment: ['bodyweight'],
    primaryMuscles: ['chest', 'core', 'legs'],
    secondaryMuscles: [],
    category: 'plyometric',
    difficulty: 'intermediate',
  },
  {
    id: 'medicine-ball-slam',
    name: 'Medicine Ball Slam',
    equipment: ['medicine-ball'],
    primaryMuscles: ['chest', 'core'],
    secondaryMuscles: ['shoulders'],
    category: 'plyometric',
    difficulty: 'intermediate',
  },
  {
    id: 'walk-cycle',
    name: 'Walk / Cycle',
    equipment: ['bodyweight'],
    primaryMuscles: ['legs'],
    secondaryMuscles: [],
    category: 'cardio',
    difficulty: 'beginner',
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    equipment: ['bodyweight'],
    primaryMuscles: ['legs', 'shoulders'],
    secondaryMuscles: [],
    category: 'cardio',
    difficulty: 'beginner',
  },
  // LOWER BODY ISOLATION
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    equipment: ['machine'],
    primaryMuscles: ['quads'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'leg-curl',
    name: 'Leg Curl',
    equipment: ['machine'],
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'calf-raise',
    name: 'Calf Raise',
    equipment: ['machine', 'bodyweight'],
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'standing-calf-raise',
    name: 'Standing Calf Raise',
    equipment: ['bodyweight'],
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'wall-push-up',
    name: 'Wall Push-Up',
    equipment: ['bodyweight'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    category: 'compound',
    difficulty: 'beginner',
  },
  // MOBILITY & FLEXIBILITY
  {
    id: 'walking-lunge',
    name: 'Walking Lunge',
    equipment: ['bodyweight', 'dumbbell'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['core'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'stationary-lunge',
    name: 'Stationary Lunge',
    equipment: ['bodyweight', 'dumbbell'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['core'],
    category: 'compound',
    difficulty: 'beginner',
  },
  {
    id: 'jump-squat',
    name: 'Jump Squat',
    equipment: ['bodyweight'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: [],
    category: 'plyometric',
    difficulty: 'intermediate',
  },
  {
    id: 'box-jump',
    name: 'Box Jump',
    equipment: ['box'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: [],
    category: 'plyometric',
    difficulty: 'intermediate',
  },
  {
    id: 'mountain-climber',
    name: 'Mountain Climber',
    equipment: ['bodyweight'],
    primaryMuscles: ['core', 'chest'],
    secondaryMuscles: ['legs'],
    category: 'cardio',
    difficulty: 'intermediate',
  },
  {
    id: 'heel-touch',
    name: 'Heel Touch',
    equipment: ['bodyweight'],
    primaryMuscles: ['obliques', 'abs'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  // TOP 15 MOST COMMON FROM ANALYSIS
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    equipment: ['barbell', 'dumbbell'],
    primaryMuscles: ['hamstrings', 'glutes'],
    secondaryMuscles: ['back', 'core'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    equipment: ['cable', 'machine'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    category: 'compound',
    difficulty: 'beginner',
  },
  // ADDITIONAL COMMON EXERCISES
  {
    id: 'dumbbell-curl-hammer',
    name: 'Hammer Curl (Dumbbell)',
    equipment: ['dumbbell'],
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'cable-kickback',
    name: 'Cable Kickback',
    equipment: ['cable'],
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'cable-pushdown',
    name: 'Cable Pushdown',
    equipment: ['cable'],
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'barbell-overhead-press',
    name: 'Barbell Overhead Press',
    equipment: ['barbell'],
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'chest'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'machine-leg-press',
    name: 'Machine Leg Press',
    equipment: ['machine'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings'],
    category: 'compound',
    difficulty: 'beginner',
  },
  {
    id: 'machine-leg-curl',
    name: 'Machine Leg Curl',
    equipment: ['machine'],
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'rowing-machine',
    name: 'Rowing Machine',
    equipment: ['machine'],
    primaryMuscles: ['back', 'legs', 'core'],
    secondaryMuscles: ['arms'],
    category: 'cardio',
    difficulty: 'beginner',
  },
  {
    id: 'cable-fly',
    name: 'Cable Fly (Chest)',
    equipment: ['cable'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders'],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'face-pull',
    name: 'Face Pull',
    equipment: ['cable'],
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['back'],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'reverse-fly',
    name: 'Reverse Fly (Pec Deck)',
    equipment: ['machine', 'dumbbell'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['shoulders'],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'leg-extension-machine',
    name: 'Leg Extension Machine',
    equipment: ['machine'],
    primaryMuscles: ['quads'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'sit-up',
    name: 'Sit-Up',
    equipment: ['bodyweight'],
    primaryMuscles: ['abs'],
    secondaryMuscles: ['core'],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'decline-crunch',
    name: 'Decline Crunch',
    equipment: ['machine'],
    primaryMuscles: ['abs'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'low-row-cable',
    name: 'Low Row (Cable)',
    equipment: ['cable'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'high-row-cable',
    name: 'High Row (Cable)',
    equipment: ['cable'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['shoulders'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'landmine-row',
    name: 'Landmine Row',
    equipment: ['barbell'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'core'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'pendulum-squat',
    name: 'Pendulum Squat',
    equipment: ['machine'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings'],
    category: 'compound',
    difficulty: 'beginner',
  },
  {
    id: 'smith-machine-squat',
    name: 'Smith Machine Squat',
    equipment: ['machine'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'dumbbell-flye',
    name: 'Dumbbell Flye (Chest)',
    equipment: ['dumbbell'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders'],
    category: 'isolation',
    difficulty: 'intermediate',
  },
  {
    id: 'resistance-band-pull-apart',
    name: 'Resistance Band Pull-Apart',
    equipment: ['resistance-band'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['shoulders'],
    category: 'isolation',
    difficulty: 'beginner',
  },
  {
    id: 'resistance-band-squat',
    name: 'Resistance Band Squat',
    equipment: ['resistance-band'],
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['core'],
    category: 'compound',
    difficulty: 'beginner',
  },
  {
    id: 'medicine-ball-chest-pass',
    name: 'Medicine Ball Chest Pass',
    equipment: ['medicine-ball'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'core'],
    category: 'plyometric',
    difficulty: 'intermediate',
  },
  {
    id: 'medicine-ball-rotation',
    name: 'Medicine Ball Rotation',
    equipment: ['medicine-ball'],
    primaryMuscles: ['obliques', 'core'],
    secondaryMuscles: [],
    category: 'isolation',
    difficulty: 'intermediate',
  },
];

// Organized by muscle group for quick filtering
export const EXERCISES_BY_MUSCLE: Record<MuscleGroup, Exercise[]> = {
  chest: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('chest')),
  back: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('back')),
  shoulders: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('shoulders')),
  biceps: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('biceps')),
  triceps: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('triceps')),
  forearms: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('forearms')),
  quads: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('quads')),
  hamstrings: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('hamstrings')),
  glutes: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('glutes')),
  calves: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('calves')),
  core: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('core')),
  abs: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('abs')),
  obliques: COMMON_EXERCISES.filter(e => e.primaryMuscles.includes('obliques')),
};

// Helper to get exercises by category
export function getExercisesByCategory(category: ExerciseCategory): Exercise[] {
  return COMMON_EXERCISES.filter(e => e.category === category);
}

// Helper to find exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
  return COMMON_EXERCISES.find(e => e.id === id);
}
