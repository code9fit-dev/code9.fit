import type { Program } from "./types";

const WU = "10 min light cardio + dynamic stretches";

/** C9F 4-day/week, 9-week progressive fat-loss program. */
export const fourDayFatLoss: Program = {
  meta: {
    id: "four-day-fat-loss",
    title: "4-Day Fat Loss (9-Week)",
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
    daysPerWeek: 4,
  },
  focus: "Upper/lower strength plus dedicated conditioning across four sessions.",
  goalStatement: "Strip fat while holding muscle over a progressive 9 weeks.",
  overview:
    "Four sessions a week — two strength (upper/lower) and two conditioning-led — progressing across three 3-week phases from foundation to peak intensity.",
  weeklyStructure: [
    { day: 1, focus: "Upper Body Strength" },
    { day: 2, focus: "Lower Body Strength" },
    { day: 3, focus: "Rest / light walk" },
    { day: 4, focus: "Full Body + HIIT" },
    { day: 5, focus: "Conditioning / Cardio" },
    { day: 6, focus: "Active recovery" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundation (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Build the base — form, work capacity, and a steady deficit.",
      days: [
        {
          day: 1,
          title: "Upper Body Strength",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Bench Press", pattern: "push", sets: 3, reps: "10" },
            { name: "Barbell Row", pattern: "pull", sets: 3, reps: "10" },
            { name: "Overhead Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Lat Pulldown", pattern: "pull", sets: 3, reps: "12" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 30 },
          ],
        },
        {
          day: 2,
          title: "Lower Body Strength",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Back Squat", pattern: "squat", sets: 3, reps: "10" },
            { name: "Romanian Deadlift", pattern: "hinge", sets: 3, reps: "10" },
            { name: "Walking Lunge", pattern: "lunge", sets: 3, reps: "12", perSide: true },
            { name: "Leg Curl", pattern: "hinge", sets: 3, reps: "12" },
            { name: "Calf Raises", pattern: "core", sets: 3, reps: "15" },
          ],
        },
        {
          day: 4,
          title: "Full Body + HIIT",
          type: "hiit",
          warmup: WU,
          exercises: [
            { name: "Goblet Squat", pattern: "squat", sets: 3, reps: "12" },
            { name: "Push-Ups", pattern: "push", sets: 3, reps: "AMRAP" },
            { name: "Single-Arm DB Row", pattern: "pull", sets: 3, reps: "12", perSide: true },
            { name: "HIIT finisher", pattern: "conditioning", notes: "8 rounds: 20 sec hard bike/row / 10 sec easy" },
          ],
        },
        {
          day: 5,
          title: "Conditioning / Cardio",
          type: "cardio",
          warmup: WU,
          exercises: [
            { name: "KB circuit", pattern: "conditioning", notes: "4 rounds: 15 KB swings / 10 burpees / 200m row" },
            { name: "Steady cardio", pattern: "conditioning", notes: "15-20 min moderate" },
            { name: "Hanging Knee Raises", pattern: "core", sets: 3, reps: "12" },
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
        "Cut strength rest to ~60s; add 1-2 reps on ranges",
        "HIIT finisher to 10 rounds; conditioning circuit to 5 rounds",
      ],
    },
    {
      name: "Phase 3 — Peak (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Maximise fat loss with intensity techniques and volume.",
      keyChanges: [
        "Supersets on accessories; drop sets to finish key lifts",
        "Rest down to ~45s; add plyometrics (box jumps, jump squats)",
        "Conditioning to 6 rounds / longer steady sessions",
      ],
    },
  ],
  nutrition: {
    note: "Moderate deficit, high protein.",
    proteinPct: [30, 35],
    carbsPct: [35, 40],
    fatsPct: [25, 30],
  },
  recovery: ["Light walks on off days", "Sleep 7.5-9 hours"],
};
