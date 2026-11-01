// Exercise library exports

export * from './database';
export * from './templates';

// Re-export common utilities
export {
  COMMON_EXERCISES,
  EXERCISES_BY_MUSCLE,
  getExercisesByCategory,
  getExerciseById,
  type Exercise,
  type Equipment,
  type MuscleGroup,
  type ExerciseCategory,
} from './database';

export {
  WORKOUT_TEMPLATES,
  KEYWORD_SUGGESTIONS,
  getTemplate,
  suggestExercisesFromKeywords,
  getTemplatesByFocus,
  type WorkoutTemplate,
  type SuggestedExerciseGroup,
  type SetRepOption,
} from './templates';
