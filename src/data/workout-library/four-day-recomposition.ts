import type { Program } from "./types";

const WU = "10 min light cardio + dynamic stretches";

/** C9F 4-day/week, 9-week progressive recomposition program. */
export const fourDayRecomposition: Program = {
  meta: {
    id: "four-day-recomposition",
    title: "4-Day Recomposition (9-Week)",
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
    daysPerWeek: 4,
  },
  focus: "Two strength days and two hybrid strength-plus-conditioning days.",
  goalStatement: "Build muscle and lose fat together across a progressive 9 weeks.",
  overview:
    "Four sessions: upper and lower strength, plus two full-body days that pair hypertrophy with conditioning. Best at maintenance or a slight deficit with high protein.",
  weeklyStructure: [
    { day: 1, focus: "Upper Strength" },
    { day: 2, focus: "Lower Strength" },
    { day: 3, focus: "Rest" },
    { day: 4, focus: "Full Body + Conditioning" },
    { day: 5, focus: "Full Body Hypertrophy" },
    { day: 6, focus: "Active recovery" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundation (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Strength base + conditioning; groove technique.",
      days: [
        {
          day: 1,
          title: "Upper Strength",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Bench Press", pattern: "push", sets: 4, reps: "6" },
            { name: "Barbell Row", pattern: "pull", sets: 4, reps: "8" },
            { name: "Overhead Press", pattern: "push", sets: 3, reps: "8" },
            { name: "Face Pulls", pattern: "pull", sets: 3, reps: "15" },
          ],
        },
        {
          day: 2,
          title: "Lower Strength",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Back Squat", pattern: "squat", sets: 4, reps: "6" },
            { name: "Romanian Deadlift", pattern: "hinge", sets: 3, reps: "8" },
            { name: "Walking Lunge", pattern: "lunge", sets: 3, reps: "10", perSide: true },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 45 },
          ],
        },
        {
          day: 4,
          title: "Full Body + Conditioning",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlift", pattern: "hinge", sets: 3, reps: "6" },
            { name: "Incline Dumbbell Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Lat Pulldown", pattern: "pull", sets: 3, reps: "12" },
            { name: "Finisher — 10-min AMRAP", pattern: "conditioning", notes: "10 KB swings / 10 push-ups / 200m row" },
          ],
        },
        {
          day: 5,
          title: "Full Body Hypertrophy",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Leg Press", pattern: "squat", sets: 3, reps: "12" },
            { name: "Dumbbell Bench Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Seated Cable Row", pattern: "pull", sets: 3, reps: "12" },
            { name: "Dumbbell Curl", pattern: "pull", sets: 3, reps: "12" },
            { name: "Bicycle Crunches", pattern: "core", sets: 3, reps: "20" },
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
        "Add 5-10% to the strength-day compounds",
        "Add a set to the hypertrophy-day accessories",
        "AMRAP finisher to 12-15 min or +1 round on circuits",
      ],
    },
    {
      name: "Phase 3 — Peak (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Sharpen with intensity and conditioning.",
      keyChanges: [
        "Supersets on hypertrophy day; drop set to finish",
        "Heavier top sets on strength days",
        "Add sprint intervals or a heavier conditioning finisher",
      ],
    },
  ],
  nutrition: {
    note: "Maintenance or slight deficit; keep protein high to recompose.",
    proteinPct: [35, 40],
    carbsPct: [30, 35],
    fatsPct: [25, 30],
  },
  recovery: ["Judge progress by 4-8 weeks", "Protein + sleep are the levers"],
};
