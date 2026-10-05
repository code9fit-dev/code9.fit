import type { Program } from "./types";

const WU = "10 min light cardio + dynamic stretches";

/** C9F 3-day/week hypertrophy program — full-body split biased push / pull / legs. */
export const threeDayMuscleGain: Program = {
  meta: {
    id: "three-day-muscle-gain",
    title: "3-Day Muscle Gain",
    weeks: 9,
    level: "intermediate",
    goals: ["muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["muscle-gain-strategist", "gym-program-architect"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
    daysPerWeek: 3,
  },
  focus: "Three sessions a week, each full-body with a push / pull / legs bias.",
  goalStatement: "Build muscle on three visits a week with progressive overload.",
  overview:
    "A 3-day hypertrophy plan: each day is full-body but emphasises push, pull, or legs so every muscle group is hit ~twice a fortnight with room to recover. Progresses across three 3-week phases over 9 weeks in a modest surplus.",
  weeklyStructure: [
    { day: 1, focus: "Full Body — Push bias" },
    { day: 2, focus: "Rest" },
    { day: 3, focus: "Full Body — Pull bias" },
    { day: 4, focus: "Rest" },
    { day: 5, focus: "Full Body — Legs + arms" },
    { day: 6, focus: "Rest / light activity" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundation (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Accumulate quality volume with clean technique.",
      days: [
        {
          day: 1,
          title: "Full Body — Push bias",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Barbell Bench Press", pattern: "push", sets: 4, reps: "8" },
            { name: "Overhead Press", pattern: "push", sets: 3, reps: "10" },
            { name: "Back Squat", pattern: "squat", sets: 3, reps: "8" },
            { name: "Dumbbell Lateral Raise", pattern: "push", sets: 3, reps: "15" },
            { name: "Cable Tricep Pushdown", pattern: "push", sets: 3, reps: "12" },
          ],
        },
        {
          day: 3,
          title: "Full Body — Pull bias",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlift", pattern: "hinge", sets: 3, reps: "6" },
            { name: "Pull-Ups (or Lat Pulldown)", pattern: "pull", sets: 4, reps: "8" },
            { name: "Barbell Row", pattern: "pull", sets: 3, reps: "10" },
            { name: "Dumbbell Curl", pattern: "pull", sets: 3, reps: "12" },
            { name: "Face Pulls", pattern: "pull", sets: 3, reps: "15" },
          ],
        },
        {
          day: 5,
          title: "Full Body — Legs + arms",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Front Squat", pattern: "squat", sets: 3, reps: "8" },
            { name: "Romanian Deadlift", pattern: "hinge", sets: 3, reps: "10" },
            { name: "Leg Press", pattern: "squat", sets: 3, reps: "12" },
            { name: "Hammer Curl", pattern: "pull", sets: 3, reps: "12" },
            { name: "Overhead Tricep Extension", pattern: "push", sets: 3, reps: "12" },
            { name: "Calf Raises", pattern: "core", sets: 4, reps: "15" },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Build (Weeks 4-6)",
      weekStart: 4,
      weekEnd: 6,
      focus: "Progressive overload — more load and volume.",
      keyChanges: [
        "Add load or a rep on Bench, Deadlift, and Squat weekly",
        "Add a set to one accessory per day",
        "Keep 2-3 min rest on the heavy compounds",
      ],
    },
    {
      name: "Phase 3 — Intensify (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Peak hypertrophy with intensity techniques.",
      keyChanges: [
        "Supersets on accessories; a drop set to finish",
        "Push top sets heavier with strict form",
        "Deload in week 9 if fatigue accumulates",
      ],
    },
  ],
  nutrition: {
    note: "Modest surplus with high protein (~1g per lb bodyweight).",
    proteinPct: [30, 35],
    carbsPct: [40, 45],
    fatsPct: [20, 25],
  },
  recovery: ["Full rest between sessions supports growth", "Sleep 7.5-9 hours"],
};
