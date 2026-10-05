/**
 * Canonical Shared Workout Knowledge Base schema (architecture §2.9).
 *
 * Every ImpactShredz program is refined into this ONE structure so that:
 *  - all 9 coaches can retrieve + draw from the same library (not siloed),
 *  - each program renders to a consistent, branded standalone document +
 *    weekly tracker (§2.10), and
 *  - the "consistency pass" the whiteboard asked for is enforced by the type
 *    system, not by hand.
 *
 * Pure data + types — safe to import anywhere (client or server).
 */

export type Level = "beginner" | "intermediate" | "advanced";
export type Equipment = "none" | "minimal" | "full-gym";
export type Goal =
  | "fat-loss"
  | "muscle-gain"
  | "recomposition"
  | "performance"
  | "general-fitness"
  | "mobility";

export type DayType =
  | "strength"
  | "hiit"
  | "cardio"
  | "recovery"
  | "rest"
  | "mobility";

/** One prescribed movement. Fields are optional so time-based / per-side / AMRAP work all fit one shape. */
export interface ExercisePrescription {
  name: string;
  /** Primary movement pattern — powers weight-tracking + cross-program lookups. */
  pattern?:
    | "squat"
    | "hinge"
    | "push"
    | "pull"
    | "lunge"
    | "carry"
    | "core"
    | "conditioning";
  sets?: number;
  /** Kept as text to preserve ranges/AMRAP, e.g. "11", "12-13", "AMRAP". */
  reps?: string;
  durationSec?: number;
  perSide?: boolean;
  notes?: string;
}

export interface TrainingDay {
  day: number; // 1-7
  title: string;
  type: DayType;
  warmup?: string;
  exercises: ExercisePrescription[];
  cooldown?: string;
  notes?: string;
}

/**
 * A block of weeks. Early phases carry explicit day templates; later phases
 * often just adjust the prior phase (progression / key changes) — both are
 * first-class so no program has to be flattened or duplicated.
 */
export interface Phase {
  name: string;
  weekStart: number;
  weekEnd: number;
  focus: string;
  days?: TrainingDay[];
  progression?: string[];
  keyChanges?: string[];
}

/** Macro split as ranges (matches how the source documents express it). */
export interface MacroSplit {
  note?: string;
  proteinPct?: [number, number];
  carbsPct?: [number, number];
  fatsPct?: [number, number];
}

export interface ProgramMeta {
  id: string; // slug, e.g. "intermediate-fat-loss-9week"
  title: string;
  weeks: number;
  level: Level;
  goals: Goal[];
  equipment: Equipment;
  /** The §2.9 primary category tag (for discovery); any coach may still use any program. */
  primaryCategory: string;
  /** Coach-persona slugs this program most naturally serves (retrieval hint, not a restriction). */
  personaTags: string[];
  source: "ImpactShredz" | "Code9 Fitness";
  copyright: "© Code9 Fitness (C9F)";
  /** Weekly training frequency (e.g. 3 for a 3-day/week program). */
  daysPerWeek?: number;
  /** True once run through the standardization/consistency pass. */
  refined: boolean;
  /** Sold as a standalone document + tracker (§2.10)? */
  purchasable: boolean;
}

export interface Program {
  meta: ProgramMeta;
  focus: string;
  goalStatement: string;
  overview: string;
  weeklyStructure: { day: number; focus: string }[];
  phases: Phase[];
  nutrition?: MacroSplit;
  recovery?: string[];
}
