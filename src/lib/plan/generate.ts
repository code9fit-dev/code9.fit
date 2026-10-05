import type { Plan, PlanWeek, Workout } from "@/lib/store/types";

/**
 * MOCK plan generator. Produces a structured, trackable 9-week plan so the
 * progress UI has something real to track. Real, coach-authored plan
 * generation is a later phase — this is a deterministic template, flavored per
 * coach, NOT actual programming.
 */

const TEMPLATES: Record<string, { focus: string; exercises: string[] }[]> = {
  default: [
    {
      focus: "Lower / Push",
      exercises: [
        "Back squat — 4 x 6-8",
        "Romanian deadlift — 3 x 8-10",
        "Walking lunge — 3 x 12/leg",
        "Plank — 3 x 45s",
      ],
    },
    {
      focus: "Upper / Pull",
      exercises: [
        "Bench press — 4 x 6-8",
        "Bent-over row — 4 x 8-10",
        "Overhead press — 3 x 8-10",
        "Face pull — 3 x 15",
      ],
    },
    {
      focus: "Full body / Conditioning",
      exercises: [
        "Deadlift — 3 x 5",
        "Pull-up (or assisted) — 3 x AMRAP",
        "Kettlebell swing — 4 x 15",
        "Farmer carry — 3 x 40m",
      ],
    },
  ],
  "home-workout-systems-builder": [
    {
      focus: "Fundamentals — Push",
      exercises: [
        "Push-up (scaled to level) — 4 x 8-12",
        "Pike push-up — 3 x 6-10",
        "Chair dip — 3 x 10-12",
        "Hollow hold — 3 x 30s",
      ],
    },
    {
      focus: "Fundamentals — Lower",
      exercises: [
        "Bodyweight squat — 4 x 15",
        "Reverse lunge — 3 x 10/leg",
        "Glute bridge — 3 x 15",
        "Wall sit — 3 x 45s",
      ],
    },
    {
      focus: "Fundamentals — Pull / Core",
      exercises: [
        "Doorway row — 4 x 10-12",
        "Superman — 3 x 12",
        "Dead bug — 3 x 10/side",
        "Side plank — 3 x 30s/side",
      ],
    },
  ],
  "precision-nutrition-planner": [
    {
      focus: "Meal structure — training day",
      exercises: [
        "Protein at each meal (~0.4g/lb split across 4)",
        "Carbs anchored around training",
        "2+ servings vegetables",
        "Log everything for the day",
      ],
    },
    {
      focus: "Meal structure — rest day",
      exercises: [
        "Same protein target, fewer carbs",
        "Prioritise fibre + fats",
        "Hydration: 3L target",
        "Log everything for the day",
      ],
    },
    {
      focus: "Habit — weekly prep",
      exercises: [
        "Batch-cook 2 protein sources",
        "Pre-portion 5 lunches",
        "Grocery list from the plan",
        "Weigh-in + measurements",
      ],
    },
  ],
  "lifestyle-recovery-coach": [
    {
      focus: "Sleep anchor",
      exercises: [
        "Same wake time (±30 min) all 7 days",
        "Screens off 45 min before bed",
        "10-min wind-down routine",
        "Log sleep + energy (1-10)",
      ],
    },
    {
      focus: "Stress + recovery",
      exercises: [
        "10-min daily walk (no phone)",
        "One 5-min breathing session",
        "Caffeine cutoff by 2pm",
        "Log stress (1-10)",
      ],
    },
    {
      focus: "Habit stack",
      exercises: [
        "Attach a new habit to an existing one",
        "Prep tomorrow the night before",
        "One screen-free evening",
        "Weekly review of what stuck",
      ],
    },
  ],
};

const DAYS = ["Mon", "Wed", "Fri"];

function buildWeek(
  weekNo: number,
  slug: string,
  blocks: { focus: string; exercises: string[] }[],
): PlanWeek {
  const workouts: Workout[] = blocks.map((block, i) => ({
    id: `${slug}-w${weekNo}-d${i}`,
    day: DAYS[i] ?? `Day ${i + 1}`,
    title: `Week ${weekNo} · ${block.focus.split(" — ")[0]}`,
    focus: block.focus,
    exercises: block.exercises.map((name, j) => ({
      id: `${slug}-w${weekNo}-d${i}-e${j}`,
      name: name.split(" — ")[0].split(" (")[0],
      detail: name.includes(" — ") ? name.split(" — ")[1] : name,
      done: false,
    })),
  }));
  return { week: weekNo, workouts };
}

export function generatePlan(
  coachSlug: string,
  coachName: string,
  createdAt: number,
  weeks = 9,
): Plan {
  const blocks = TEMPLATES[coachSlug] ?? TEMPLATES.default;
  const schedule: PlanWeek[] = Array.from({ length: weeks }, (_, i) =>
    buildWeek(i + 1, coachSlug, blocks),
  );
  return {
    coachSlug,
    coachName,
    title: `${coachName} — ${weeks}-week program`,
    createdAt,
    weeks,
    currentWeek: 1,
    schedule,
  };
}
