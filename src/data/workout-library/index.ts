/**
 * The Shared Workout Knowledge Base (§2.9). All 9 coaches retrieve from this
 * one library — programs are tagged, not owned. Every entry is fully refined
 * from the ImpactShredz source into the canonical schema.
 */

import type { Equipment, Goal, Level, Program } from "./types";
import { fatToFitLowBudget } from "./fat-to-fit-lowbudget";
import { fatToFitBase } from "./fat-to-fit-base";
import { intermediateFatLoss9Week } from "./intermediate-fat-loss-9week";
import { fatToFitFunctional } from "./fat-to-fit-functional";
import { fatToFitMetcon } from "./fat-to-fit-metcon";
import { hybridIntroFocus } from "./hybrid-intro-focus";
import { hybridFocusBase } from "./hybrid-focus-base";
import { hybridFocusIntermediate } from "./hybrid-focus-intermediate";
import { leanBulk9Week } from "./lean-bulk-9week";
import { leanBulk9Week2 } from "./lean-bulk-9week-2";
import { peachyPump } from "./peachy-pump";
import { peachyProgression } from "./peachy-progression";
import { threeDayFatLoss } from "./three-day-fat-loss";
import { threeDayMuscleGain } from "./three-day-muscle-gain";
import { threeDayRecomposition } from "./three-day-recomposition";
import { threeDayPerformance } from "./three-day-performance";
import { threeDayGeneralFitness } from "./three-day-general-fitness";
import { threeDayMobility } from "./three-day-mobility";
import { fourDayFatLoss } from "./four-day-fat-loss";
import { fourDayMuscleGain } from "./four-day-muscle-gain";
import { fourDayRecomposition } from "./four-day-recomposition";
import { fourDayPerformance } from "./four-day-performance";
import { fourDayGeneralFitness } from "./four-day-general-fitness";
import { fourDayMobility } from "./four-day-mobility";

export * from "./types";

export const library: Program[] = [
  // 3-day/week series (C9F) — one per training-goal category
  threeDayFatLoss,
  threeDayMuscleGain,
  threeDayRecomposition,
  threeDayPerformance,
  threeDayGeneralFitness,
  threeDayMobility,
  // 4-day/week series (C9F) — one per training-goal category
  fourDayFatLoss,
  fourDayMuscleGain,
  fourDayRecomposition,
  fourDayPerformance,
  fourDayGeneralFitness,
  fourDayMobility,
  // ImpactShredz higher-frequency library
  fatToFitLowBudget,
  fatToFitBase,
  intermediateFatLoss9Week,
  fatToFitFunctional,
  fatToFitMetcon,
  hybridIntroFocus,
  hybridFocusBase,
  hybridFocusIntermediate,
  leanBulk9Week,
  leanBulk9Week2,
  peachyPump,
  peachyProgression,
];

export function getProgram(id: string): Program | undefined {
  return library.find((p) => p.meta.id === id);
}

/** Retrieval hint for coaches: filter by what the client actually needs. */
export function findPrograms(filter: {
  goal?: Goal;
  level?: Level;
  equipment?: Equipment;
  personaSlug?: string;
}): Program[] {
  return library.filter((p) => {
    if (filter.goal && !p.meta.goals.includes(filter.goal)) return false;
    if (filter.level && p.meta.level !== filter.level) return false;
    if (filter.equipment && p.meta.equipment !== filter.equipment) return false;
    if (filter.personaSlug && !p.meta.personaTags.includes(filter.personaSlug))
      return false;
    return true;
  });
}

export const purchasablePrograms = (): Program[] =>
  library.filter((p) => p.meta.purchasable);
