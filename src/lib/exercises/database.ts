// Exercise Database - extracted from existing programs
// Each exercise includes: name, equipment, muscle groups, category, difficulty

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

// Common exercises - will be populated from existing programs
export const COMMON_EXERCISES: Exercise[] = [
  // Chest
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    equipment: ['barbell'],
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    category: 'compound',
    difficulty: 'intermediate',
    description: 'Classic chest builder, flat bench position',
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
  // Back
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
    name: 'Bent Over Row',
    equipment: ['barbell', 'dumbbell'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    category: 'compound',
    difficulty: 'intermediate',
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    equipment: ['bodyweight'],
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    category: 'compound',
    difficulty: 'advanced',
  },
  // Legs
  {
    id: 'barbell-squat',
    name: 'Barbell Squat',
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
    secondaryMuscles: ['back', 'quads'],
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
  // Cardio/Conditioning
  {
    id: 'kettlebell-swings',
    name: 'Kettlebell Swings',
    equipment: ['kettlebell'],
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'core'],
    category: 'cardio',
    difficulty: 'intermediate',
  },
  {
    id: 'burpees',
    name: 'Burpees',
    equipment: ['bodyweight'],
    primaryMuscles: ['chest', 'core'],
    secondaryMuscles: ['legs'],
    category: 'plyometric',
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
