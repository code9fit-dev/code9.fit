import type { Program } from "./types";

const WU = "10 min light cardio + dynamic stretches";

/** C9F 4-day/week, 9-week progressive hypertrophy program — upper/lower split. */
export const fourDayMuscleGain: Program = {
  meta: {
    id: "four-day-muscle-gain",
    title: "4-Day Muscle Gain (9-Week)",
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
    daysPerWeek: 4,
  },
  focus: "Classic upper/lower split, each hit twice a week, progressed over 9 weeks.",
  goalStatement: "Build muscle with an upper/lower split and progressive overload.",
  overview:
    "A 4-day upper/lower split — Upper A, Lower A, Upper B, Lower B — so each region trains twice weekly. Three phases move from volume to heavier loading in a modest surplus.",
  weeklyStructure: [
    { day: 1, focus: "Upper A" },
    { day: 2, focus: "Lower A" },
    { day: 3, focus: "Rest" },
    { day: 4, focus: "Upper B" },
    { day: 5, focus: "Lower B" },
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
          title: "Upper A",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Barbell Bench Press", pattern: "push", sets: 4, reps: "8" },
            { name: "Barbell Row", pattern: "pull", sets: 4, reps: "8" },
            { name: "Incline Dumbbell Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Lat Pulldown", pattern: "pull", sets: 3, reps: "12" },
            { name: "Lateral Raise", pattern: "push", sets: 3, reps: "15" },
          ],
        },
        {
          day: 2,
          title: "Lower A",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Back Squat", pattern: "squat", sets: 4, reps: "8" },
            { name: "Romanian Deadlift", pattern: "hinge", sets: 4, reps: "10" },
            { name: "Leg Press", pattern: "squat", sets: 3, reps: "12" },
            { name: "Leg Curl", pattern: "hinge", sets: 3, reps: "12" },
            { name: "Calf Raises", pattern: "core", sets: 4, reps: "15" },
          ],
        },
        {
          day: 4,
          title: "Upper B",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Overhead Press", pattern: "push", sets: 4, reps: "8" },
            { name: "Weighted Pull-Ups", pattern: "pull", sets: 4, reps: "8" },
            { name: "Dumbbell Bench Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Seated Cable Row", pattern: "pull", sets: 3, reps: "12" },
            { name: "Barbell Curl", pattern: "pull", sets: 3, reps: "12" },
            { name: "Cable Tricep Pushdown", pattern: "push", sets: 3, reps: "12" },
          ],
        },
        {
          day: 5,
          title: "Lower B",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlift", pattern: "hinge", sets: 4, reps: "6" },
            { name: "Front Squat", pattern: "squat", sets: 3, reps: "8" },
            { name: "Bulgarian Split Squat", pattern: "lunge", sets: 3, reps: "10", perSide: true },
            { name: "Glute Bridge / Hip Thrust", pattern: "hinge", sets: 3, reps: "12" },
            { name: "Hanging Leg Raises", pattern: "core", sets: 3, reps: "15" },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Build (Weeks 4-6)",
      weekStart: 4,
      weekEnd: 6,
      focus: "Progressive overload — add load and a little volume.",
      keyChanges: [
        "Add 5-10% to the main lifts; add a set to one accessory per day",
        "Drop main-lift reps slightly (e.g. 8→6) as load climbs",
        "Keep 2-3 min rest on the heavy compounds",
      ],
    },
    {
      name: "Phase 3 — Intensify (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Peak hypertrophy with intensity techniques.",
      keyChanges: [
        "Add supersets on accessories and a drop set to finish each session",
        "Push top sets heavier while holding form",
        "Consider a deload if fatigue accumulates in week 9",
      ],
    },
  ],
  nutrition: {
    note: "Modest surplus, high protein (~1g per lb).",
    proteinPct: [30, 35],
    carbsPct: [40, 45],
    fatsPct: [20, 25],
  },
  recovery: ["Full rest days support growth", "Sleep 7.5-9 hours"],
};
