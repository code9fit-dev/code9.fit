import type { Program } from "./types";

const WU = "8-10 min light cardio + dynamic stretches";

/** C9F 3-day/week fat-loss program — full-body strength with conditioning finishers. */
export const threeDayFatLoss: Program = {
  meta: {
    id: "three-day-fat-loss",
    title: "3-Day Fat Loss",
    weeks: 9,
    level: "intermediate",
    goals: ["fat-loss"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["fat-loss-architect", "gym-program-architect"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
    daysPerWeek: 3,
  },
  focus: "Three full-body sessions a week — strength kept, fat stripped with finishers.",
  goalStatement: "Lose fat on a busy schedule while holding onto muscle.",
  overview:
    "A time-efficient 3-day/week plan. Each session is full-body strength followed by a short conditioning finisher, so three visits cover everything. Progresses across three 3-week phases over 9 weeks.",
  weeklyStructure: [
    { day: 1, focus: "Full Body A + finisher" },
    { day: 2, focus: "Rest / light walk" },
    { day: 3, focus: "Full Body B + finisher" },
    { day: 4, focus: "Rest" },
    { day: 5, focus: "Full Body C + steady cardio" },
    { day: 6, focus: "Active recovery" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundation (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Full-body strength + conditioning; groove the movements.",
      days: [
        {
          day: 1,
          title: "Full Body A + finisher",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Goblet Squat", pattern: "squat", sets: 3, reps: "12" },
            { name: "Dumbbell Bench Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Lat Pulldown", pattern: "pull", sets: 3, reps: "12" },
            { name: "Walking Lunge", pattern: "lunge", sets: 3, reps: "12", perSide: true },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 30 },
            { name: "Finisher — bike intervals", pattern: "conditioning", notes: "8 rounds: 20 sec hard / 10 sec easy" },
          ],
        },
        {
          day: 3,
          title: "Full Body B + finisher",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Romanian Deadlift", pattern: "hinge", sets: 3, reps: "10" },
            { name: "Incline Dumbbell Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Seated Cable Row", pattern: "pull", sets: 3, reps: "12" },
            { name: "Leg Press", pattern: "squat", sets: 3, reps: "15" },
            { name: "Hanging Knee Raises", pattern: "core", sets: 3, reps: "12" },
            { name: "Finisher — KB circuit", pattern: "conditioning", notes: "3 rounds: 30 sec KB swings / 30 sec mountain climbers" },
          ],
        },
        {
          day: 5,
          title: "Full Body C + steady cardio",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlift", pattern: "hinge", sets: 3, reps: "8" },
            { name: "Push-Ups", pattern: "push", sets: 3, reps: "AMRAP" },
            { name: "Single-Arm Dumbbell Row", pattern: "pull", sets: 3, reps: "12", perSide: true },
            { name: "Step-Ups", pattern: "lunge", sets: 3, reps: "12", perSide: true },
            { name: "Bicycle Crunches", pattern: "core", sets: 3, reps: "20" },
            { name: "Steady cardio", pattern: "conditioning", notes: "15-20 min moderate to finish" },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Build (Weeks 4-6)",
      weekStart: 4,
      weekEnd: 6,
      focus: "More load and density; sharpen the deficit.",
      keyChanges: [
        "Add 5-10% load and a 4th set to the main lifts",
        "Cut rests; add a round to the finishers",
        "Nudge the deficit if loss stalls two weeks",
      ],
    },
    {
      name: "Phase 3 — Peak (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Peak intensity and conditioning.",
      keyChanges: [
        "Supersets / drop sets on accessories",
        "Add plyometrics; rests down to ~45s",
        "Longer or extra conditioning rounds",
      ],
    },
  ],
  nutrition: {
    note: "Moderate calorie deficit with high protein to protect muscle.",
    proteinPct: [30, 35],
    carbsPct: [35, 40],
    fatsPct: [25, 30],
  },
  recovery: ["Keep a light walk on off days", "7.5-9 hours sleep"],
};
