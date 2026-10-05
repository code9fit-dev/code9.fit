import type { Program } from "./types";

const WU = "10 min light cardio + dynamic stretches";

/** C9F 3-day/week recomposition program — strength base with a conditioning day. */
export const threeDayRecomposition: Program = {
  meta: {
    id: "three-day-recomposition",
    title: "3-Day Recomposition",
    weeks: 9,
    level: "intermediate",
    goals: ["recomposition"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["body-recomposition-engineer", "gym-program-architect"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
    daysPerWeek: 3,
  },
  focus: "Lose fat and build muscle together on three sessions a week.",
  goalStatement: "Recompose — strength to keep/build muscle, conditioning to lean out.",
  overview:
    "A 3-day plan balancing heavy-ish strength with a conditioning day and a hypertrophy day. Best at maintenance calories (or a slight deficit) with high protein — recomposition is slower than single-goal training, so give it the full 9 weeks across three phases.",
  weeklyStructure: [
    { day: 1, focus: "Full Body — Strength" },
    { day: 2, focus: "Rest" },
    { day: 3, focus: "Full Body + Conditioning" },
    { day: 4, focus: "Rest" },
    { day: 5, focus: "Full Body — Hypertrophy" },
    { day: 6, focus: "Active recovery" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundation (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Strength base + hypertrophy + a metcon; groove technique.",
      days: [
        {
          day: 1,
          title: "Full Body — Strength",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Back Squat", pattern: "squat", sets: 4, reps: "6" },
            { name: "Bench Press", pattern: "push", sets: 4, reps: "6" },
            { name: "Barbell Row", pattern: "pull", sets: 4, reps: "8" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 45 },
          ],
        },
        {
          day: 3,
          title: "Full Body + Conditioning",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Romanian Deadlift", pattern: "hinge", sets: 3, reps: "8" },
            { name: "Overhead Press", pattern: "push", sets: 3, reps: "8" },
            { name: "Lat Pulldown", pattern: "pull", sets: 3, reps: "10" },
            { name: "Walking Lunge", pattern: "lunge", sets: 3, reps: "10", perSide: true },
            { name: "Finisher — 10-min AMRAP", pattern: "conditioning", notes: "10 KB swings / 10 push-ups / 200m row" },
          ],
        },
        {
          day: 5,
          title: "Full Body — Hypertrophy",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Leg Press", pattern: "squat", sets: 3, reps: "12" },
            { name: "Incline Dumbbell Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Seated Cable Row", pattern: "pull", sets: 3, reps: "12" },
            { name: "Dumbbell Curl", pattern: "pull", sets: 3, reps: "12" },
            { name: "Hanging Leg Raises", pattern: "core", sets: 3, reps: "15" },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Build (Weeks 4-6)",
      weekStart: 4,
      weekEnd: 6,
      focus: "Add strength load and conditioning density.",
      keyChanges: [
        "Increase the Day 1 strength loads",
        "Add a set to the hypertrophy day",
        "AMRAP finisher +2-3 min or +1 round",
      ],
    },
    {
      name: "Phase 3 — Peak (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Sharpen with intensity.",
      keyChanges: [
        "Supersets on the hypertrophy day; drop-set finish",
        "Heavier strength top sets",
        "Add sprint intervals or a heavier conditioning finisher",
      ],
    },
  ],
  nutrition: {
    note: "Maintenance or a slight deficit; keep protein high to drive recomposition.",
    proteinPct: [35, 40],
    carbsPct: [30, 35],
    fatsPct: [25, 30],
  },
  recovery: ["Recomposition is slow — judge by 4-8 weeks, not days", "Prioritise protein + sleep"],
};
