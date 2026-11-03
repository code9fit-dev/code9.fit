import type { DayType, Equipment, Goal, Level, Program, TrainingDay } from '@/data/workout-library/types';

export const DAY_TYPES: DayType[] = ['strength', 'hiit', 'cardio', 'recovery', 'rest', 'mobility'];

export interface DraftExercise {
  name: string;
  sets: number;
  reps: string;
  notes?: string;
}

export interface DraftDay {
  day: number;
  title: string;
  type: DayType;
  exercises: DraftExercise[];
}

export interface DraftProgram {
  id: string;
  title: string;
  focus: string;
  overview: string;
  level: Level;
  goals: Goal[];
  equipment: Equipment;
  weeks: number;
  daysPerWeek: number;
  days: DraftDay[];
}

export const EMPTY_DRAFT: DraftProgram = {
  id: '',
  title: '',
  focus: '',
  overview: '',
  level: 'intermediate',
  goals: ['general-fitness'],
  equipment: 'full-gym',
  weeks: 8,
  daysPerWeek: 3,
  days: [],
};

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateDraft(d: DraftProgram): string[] {
  const errors: string[] = [];
  if (!d.title.trim()) errors.push('Give the program a title.');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d.id)) errors.push('The program id must be lowercase words separated by dashes.');
  if (!d.focus.trim()) errors.push('Add a one-line focus.');
  if (d.weeks < 1 || d.weeks > 52) errors.push('Weeks must be between 1 and 52.');
  if (d.days.length === 0) errors.push('Add at least one training day.');
  for (const day of d.days) {
    if (!day.title.trim()) errors.push(`Day ${day.day} needs a title.`);
    if (day.type !== 'rest' && day.type !== 'recovery' && day.exercises.length === 0) {
      errors.push(`Day ${day.day} has no exercises.`);
    }
    for (const ex of day.exercises) {
      if (!ex.name.trim()) errors.push(`Day ${day.day} has an exercise with no name.`);
      if (!ex.reps.trim()) errors.push(`${ex.name || 'An exercise'} on day ${day.day} needs reps.`);
    }
  }
  return errors;
}

export function toProgram(d: DraftProgram): Program {
  const days: TrainingDay[] = d.days.map((day) => ({
    day: day.day,
    title: day.title,
    type: day.type,
    exercises: day.exercises.map((ex) => ({
      name: ex.name,
      sets: ex.sets,
      reps: ex.reps,
      ...(ex.notes ? { notes: ex.notes } : {}),
    })),
  }));

  return {
    meta: {
      id: d.id,
      title: d.title,
      weeks: d.weeks,
      level: d.level,
      goals: d.goals,
      equipment: d.equipment,
      primaryCategory: 'Code9 Fitness',
      personaTags: [],
      source: 'Code9 Fitness',
      copyright: '© Code9 Fitness (C9F)',
      daysPerWeek: d.daysPerWeek,
      refined: false,
      purchasable: false,
    },
    focus: d.focus,
    goalStatement: d.focus,
    overview: d.overview,
    weeklyStructure: days.map((day) => ({ day: day.day, focus: day.title })),
    phases: [{ name: 'Phase 1', weekStart: 1, weekEnd: d.weeks, focus: d.focus, days }],
  };
}

export function toLibraryFile(d: DraftProgram): string {
  const exportName = d.id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
  return `import type { Program } from "./types";\n\nexport const ${exportName}: Program = ${JSON.stringify(toProgram(d), null, 2)};\n`;
}
