// Type definitions for workout programs
// Matches the structure used in the existing library

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: number | string; // "8-10" for range, or number for exact
  durationSec?: number;
  notes?: string;
  pattern?: string;
}

export interface WorkoutDay {
  day: number;
  title: string;
  type?: string;
  focus?: string;
  warmup?: string;
  exercises: WorkoutExercise[];
  cooldown?: string;
}

export interface TrainingPhase {
  name: string;
  title?: string;
  description?: string;
  focus?: string;
  weeks: number;
  days: WorkoutDay[];
}

export interface WeeklyStructureDay {
  day: number;
  focus: string;
  type?: string;
}

export interface ProgramMeta {
  id: string;
  title: string;
  level?: string;
  difficulty?: string;
  daysPerWeek?: number;
  sessionsPerWeek?: number;
  weeks?: number;
  durationWeeks?: number;
  equipment?: string[];
  goals?: string[];
}

export interface WorkoutProgram {
  meta: ProgramMeta;
  slug: string;
  title?: string;
  focus: string;
  description?: string;
  overview?: string;
  phases: TrainingPhase[];
  weeklyStructure?: WeeklyStructureDay[];
}

// Draft program (in-progress) with additional metadata
export interface DraftProgram extends WorkoutProgram {
  draftId: string;
  createdAt: string;
  lastModified: string;
  status: 'draft' | 'published';
  authorId?: string;
}

// Conversion helper - workout structure to code
export function programToTypeScriptCode(program: WorkoutProgram): string {
  return `export const ${program.meta.id} = {
  meta: {
    id: '${program.meta.id}',
    title: '${program.meta.title}',
    level: '${program.meta.level || 'intermediate'}',
    daysPerWeek: ${program.meta.daysPerWeek || 3},
    weeks: ${program.meta.weeks || 8},
    equipment: [${program.meta.equipment?.map(e => `'${e}'`).join(', ') || ''}],
    goals: [${program.meta.goals?.map(g => `'${g}'`).join(', ') || ''}],
  },
  slug: '${program.slug}',
  focus: '${program.focus}',
  description: '${program.description?.replace(/'/g, "\\'")}',
  phases: ${JSON.stringify(program.phases, null, 2)},
} as const;`;
}
