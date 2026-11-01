// Pre-built workout templates with AI-powered suggestions
// Templates provide starting points for coaches to customize

import { Exercise, MuscleGroup, ExerciseCategory } from './database';

export interface WorkoutTemplate {
  id: string;
  name: string;
  focus: string;
  description: string;
  suggestedExercises: SuggestedExerciseGroup[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  setsRepsOptions: SetRepOption[];
}

export interface SuggestedExerciseGroup {
  title: string;
  description?: string;
  exercises: string[]; // exercise IDs
  setsReps: string[]; // e.g., ["3x5", "4x8", "5x5"]
}

export interface SetRepOption {
  label: string;
  value: string; // e.g., "3x5", "4x8"
  repRange: string;
}

// AI suggestion patterns - match keywords to exercise suggestions
export const KEYWORD_SUGGESTIONS: Record<string, SuggestedExerciseGroup> = {
  'upper body': {
    title: 'Upper Body Foundation',
    exercises: [
      'barbell-bench-press',
      'barbell-row',
      'incline-bench-press',
      'bent-over-row',
    ],
    setsReps: ['3x5', '4x8', '5x5'],
  },
  'lower body': {
    title: 'Lower Body Foundation',
    exercises: [
      'barbell-squat',
      'deadlift',
      'leg-press',
    ],
    setsReps: ['3x5', '4x8', '5x5'],
  },
  'hiit': {
    title: 'High Intensity Interval Training',
    exercises: [
      'kettlebell-swings',
      'burpees',
    ],
    setsReps: ['30s work / 30s rest', '40s work / 20s rest', '45s work / 15s rest'],
  },
  'compound': {
    title: 'Compound Movements',
    exercises: [
      'barbell-bench-press',
      'barbell-squat',
      'deadlift',
      'barbell-row',
    ],
    setsReps: ['3x3', '3x5', '4x5'],
  },
  'isolation': {
    title: 'Isolation Work',
    exercises: [
      'dumbbell-bench-press',
      'dumbbell-curl',
    ],
    setsReps: ['3x10', '4x10', '3x12'],
  },
};

// Pre-built templates
export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: 'strength-focus',
    name: 'Strength Focus',
    focus: 'Building max strength through compound movements',
    description: 'Classic strength-building program using heavy compound lifts with progressive overload.',
    suggestedExercises: [
      {
        title: 'Main Lift',
        description: 'Heavy compound movement',
        exercises: ['barbell-bench-press', 'barbell-squat', 'deadlift', 'barbell-row'],
        setsReps: ['3x3', '4x3', '5x3'],
      },
      {
        title: 'Secondary Lift',
        description: 'Supporting compound',
        exercises: ['incline-bench-press', 'bent-over-row', 'leg-press'],
        setsReps: ['3x5', '4x5', '5x5'],
      },
    ],
    difficulty: 'intermediate',
    setsRepsOptions: [
      { label: 'Heavy', value: '3x3', repRange: '1-3 reps' },
      { label: 'Moderate', value: '4x5', repRange: '4-6 reps' },
      { label: 'Lighter', value: '5x8', repRange: '7-8 reps' },
    ],
  },
  {
    id: 'hypertrophy-focus',
    name: 'Hypertrophy Focus',
    focus: 'Building muscle size through higher reps and volume',
    description: 'Volume-based training designed to maximize muscle growth with controlled tempo.',
    suggestedExercises: [
      {
        title: 'Compound Builder',
        exercises: ['barbell-bench-press', 'barbell-squat', 'barbell-row'],
        setsReps: ['4x8', '4x10', '5x8'],
      },
      {
        title: 'Isolation Finisher',
        exercises: ['dumbbell-bench-press', 'dumbbell-curl'],
        setsReps: ['3x12', '4x12', '3x15'],
      },
    ],
    difficulty: 'intermediate',
    setsRepsOptions: [
      { label: 'Volume Heavy', value: '4x8', repRange: '8 reps' },
      { label: 'Moderate Volume', value: '4x10', repRange: '10 reps' },
      { label: 'Volume Light', value: '3x12', repRange: '12 reps' },
    ],
  },
  {
    id: 'conditioning-hiit',
    name: 'Conditioning & HIIT',
    focus: 'Metabolic conditioning and cardiovascular adaptations',
    description: 'High-intensity interval training combining explosive movements and cardio.',
    suggestedExercises: [
      {
        title: 'Explosive Movement',
        exercises: ['kettlebell-swings', 'burpees'],
        setsReps: ['30s work / 30s rest', '40s work / 20s rest'],
      },
    ],
    difficulty: 'advanced',
    setsRepsOptions: [
      { label: 'Moderate Intensity', value: '30s work / 30s rest', repRange: '30s intervals' },
      { label: 'High Intensity', value: '40s work / 20s rest', repRange: '40s intervals' },
      { label: 'Max Intensity', value: '45s work / 15s rest', repRange: '45s intervals' },
    ],
  },
];

// Get template by ID
export function getTemplate(id: string): WorkoutTemplate | undefined {
  return WORKOUT_TEMPLATES.find(t => t.id === id);
}

// Parse user keywords to suggest exercises
export function suggestExercisesFromKeywords(keywords: string[]): SuggestedExerciseGroup[] {
  const suggestions: SuggestedExerciseGroup[] = [];
  const seen = new Set<string>();

  for (const keyword of keywords) {
    const normalized = keyword.toLowerCase();
    if (KEYWORD_SUGGESTIONS[normalized] && !seen.has(normalized)) {
      suggestions.push(KEYWORD_SUGGESTIONS[normalized]);
      seen.add(normalized);
    }
  }

  return suggestions;
}

// Get template suggestions based on focus area
export function getTemplatesByFocus(focus: string): WorkoutTemplate[] {
  const normalized = focus.toLowerCase();
  return WORKOUT_TEMPLATES.filter(t =>
    t.focus.toLowerCase().includes(normalized) ||
    t.name.toLowerCase().includes(normalized)
  );
}
