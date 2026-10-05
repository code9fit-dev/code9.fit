import type { Program } from "./types";

const WU = "10 min light cardio + dynamic stretches";

/** Refined from ImpactShredz "Hybrid Focus (BASE)". */
export const hybridFocusBase: Program = {
  meta: {
    id: "hybrid-focus-base",
    title: "Hybrid Focus (BASE)",
    weeks: 9,
    level: "beginner",
    goals: ["performance", "recomposition"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["sports-performance-optimizer", "gym-program-architect"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Balance between strength, endurance, and conditioning.",
  goalStatement: "New goals every 3 weeks — establish a hybrid-athlete base.",
  overview:
    "For individuals new to hybrid fitness. Balances strength, endurance, and conditioning across a 9-week, 3-phase structure. Prioritise sleep, stretching, and foam rolling; tailor intensity to how your body feels.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Strength" },
    { day: 2, focus: "Endurance (Run/Cycle/Row)" },
    { day: 3, focus: "Upper Body Strength" },
    { day: 4, focus: "Rest or Light Active Recovery" },
    { day: 5, focus: "Full Body Strength" },
    { day: 6, focus: "Swim" },
    { day: 7, focus: "Rest or Light Active Recovery" },
  ],
  phases: [
    {
      name: "Phase 1 — Base Building",
      weekStart: 1,
      weekEnd: 3,
      focus: "Establish basic movements, building strength and endurance.",
      days: [
        {
          day: 1,
          title: "Strength (Lower Body)",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Goblet Squats", pattern: "squat", sets: 4, reps: "11" },
            { name: "Romanian Deadlifts", pattern: "hinge", sets: 4, reps: "11" },
            { name: "Dumbbell Step-Ups", pattern: "lunge", sets: 4, reps: "11", perSide: true },
            { name: "Hip Thrusts", pattern: "hinge", sets: 4, reps: "11" },
            { name: "Bicycle Crunches", pattern: "core", sets: 4, reps: "20" },
            { name: "Plank", pattern: "core", sets: 4, reps: "to failure" },
          ],
        },
        {
          day: 2,
          title: "Endurance — Fartlek",
          type: "cardio",
          exercises: [
            { name: "Fartlek run", pattern: "conditioning", notes: "Jog 5 min; alternate 2 min fast / 3 min easy for 20-30 min; 5 min cool-down" },
          ],
        },
        {
          day: 3,
          title: "Strength (Upper Body)",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Push-Ups", pattern: "push", sets: 4, reps: "12-15" },
            { name: "Dumbbell Rows", pattern: "pull", sets: 4, reps: "10-12", perSide: true },
            { name: "Dumbbell Shoulder Press", pattern: "push", sets: 4, reps: "10-12" },
            { name: "Lat Pulldown", pattern: "pull", sets: 4, reps: "12-15" },
            { name: "Russian Twists", pattern: "core", sets: 4, reps: "11", perSide: true },
            { name: "Hanging Leg Raises", pattern: "core", sets: 4, reps: "11" },
          ],
        },
        { day: 4, title: "Rest / Active Recovery", type: "recovery", exercises: [], notes: "Light cardio + mobility & stretching (20 min)." },
        {
          day: 5,
          title: "Strength (Full Body)",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlifts", pattern: "hinge", sets: 4, reps: "8-10" },
            { name: "Barbell Bench Press", pattern: "push", sets: 3, reps: "8-10" },
            { name: "Barbell Rows", pattern: "pull", sets: 3, reps: "10-12" },
            { name: "Dumbbell Lunges", pattern: "lunge", sets: 3, reps: "12", perSide: true },
            { name: "Plank", pattern: "core", sets: 4, durationSec: 45 },
          ],
        },
        {
          day: 6,
          title: "Endurance — Swim",
          type: "cardio",
          exercises: [
            { name: "Steady-state swim", pattern: "conditioning", notes: "30-40 min at a calm, relaxed pace (or row/cycle)" },
          ],
        },
        { day: 7, title: "Rest / Active Recovery", type: "recovery", exercises: [], notes: "Light cardio & mobility work." },
      ],
    },
    {
      name: "Phase 2 — Strength & Conditioning Build",
      weekStart: 4,
      weekEnd: 6,
      focus: "Increase intensity and volume; introduce more complex movements.",
      keyChanges: [
        "Lower → Front Squats 4x9, Deadlifts 4x9, Bulgarian Split Squats 3x11/leg, Leg Curls",
        "Upper → Incline DB Press 4x6-8, Pull-Ups 3x8, Seated DB Press, Cable Rows",
        "Day 4 becomes Conditioning: 20-min AMRAP — 10 KB swings / 10 burpees / 10 box jumps / 200m run",
        "Full Body → Power Cleans 4x4, Bench 3x6-8; endurance adds tempo runs + 6x200m intervals",
      ],
    },
    {
      name: "Phase 3 — Peak Performance",
      weekStart: 7,
      weekEnd: 9,
      focus: "Optimise strength, speed, and endurance.",
      keyChanges: [
        "Lower → Back Squats & Deadlifts 4x4-6 (heavy), Bulgarian Split Squats 3x8",
        "Upper → Bench 4x4-6, Weighted Pull-Ups 4x4-6, Military Press",
        "Conditioning circuit 3-4 rounds: 15 thrusters / 20 KB swings / 10 burpees / 100m sprint",
        "Full Body → Deadlifts 4x3-5, Push Press, Power Cleans, T-Bar Rows; 8x100m sprints",
      ],
    },
  ],
  nutrition: {
    note: "Proteins from meats/dairy; carbs from rice/pasta; fruit selection; limited veg.",
    proteinPct: [30, 35],
    carbsPct: [40, 45],
    fatsPct: [20, 25],
  },
  recovery: ["Sleep, stretching, foam rolling to minimise injury risk", "Light cardio + mobility on rest days"],
};
