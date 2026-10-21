import type { Program } from "./types";

/**
 * Hybrid Base (4-day) — sport-specific foundation
 * Refined from Code9 Fitness HTML program.
 */
export const hybridBase4Day: Program = {
  meta: {
    id: "hybrid-base-4day",
    title: "Hybrid Base (4-day)",
    weeks: 9,
    level: "beginner",
    goals: ["performance", "muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Hybrid Training",
    personaTags: ["athlete-coach", "sport-specific-trainer"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 4,
    refined: true,
    purchasable: true,
  },
  focus:
    "Build athletic foundation combining strength and conditioning in 4 days per week.",
  goalStatement:
    "Develop balanced strength, power, and conditioning for athletes new to hybrid training.",
  overview:
    "An efficient 4-day per week program blending strength training and sport-specific conditioning. Ideal for athletes with limited training days who need balanced athletic development.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Strength" },
    { day: 2, focus: "Upper Body Strength" },
    { day: 3, focus: "Rest or Mobility" },
    { day: 4, focus: "Sport-Specific Conditioning" },
    { day: 5, focus: "Hybrid Skills & Power" },
    { day: 6, focus: "Rest or Light Activity" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Aerobic Base & Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build aerobic capacity, establish strength baseline, develop movement patterns.",
      days: [
        {
          day: 1,
          title: "Lower Body Strength",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Deadlifts",
              pattern: "hinge",
              sets: 3,
              reps: "5-6",
            },
            {
              name: "Bulgarian Split Squats",
              pattern: "lunge",
              sets: 3,
              reps: "8-10",
              perSide: true,
            },
            {
              name: "Leg Curls",
              pattern: "hinge",
              sets: 3,
              reps: "12",
            },
          ],
        },
        {
          day: 2,
          title: "Upper Body Strength",
          type: "strength",
          exercises: [
            {
              name: "Bench Press",
              pattern: "push",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Barbell Rows",
              pattern: "pull",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Overhead Press",
              pattern: "push",
              sets: 3,
              reps: "6-8",
            },
            {
              name: "Pull-Ups",
              pattern: "pull",
              sets: 3,
              reps: "6-10",
            },
          ],
        },
        {
          day: 3,
          title: "Rest or Mobility",
          type: "recovery",
          exercises: [],
          notes: "Yoga, stretching, or foam rolling",
        },
        {
          day: 4,
          title: "Sport-Specific Conditioning",
          type: "cardio",
          exercises: [
            {
              name: "Moderate Intensity Run",
              pattern: "conditioning",
              durationSec: 1800,
              notes: "30 minutes at conversational pace",
            },
          ],
        },
        {
          day: 5,
          title: "Hybrid Skills & Power",
          type: "hiit",
          exercises: [
            {
              name: "Medicine Ball Slams",
              pattern: "conditioning",
              sets: 3,
              reps: "10",
            },
            {
              name: "Box Jumps",
              pattern: "squat",
              sets: 3,
              reps: "6",
            },
            {
              name: "Medicine Ball Chest Pass",
              pattern: "push",
              sets: 3,
              reps: "8",
            },
            {
              name: "Jump Rope",
              pattern: "conditioning",
              sets: 3,
              durationSec: 60,
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Threshold & Intensification",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Increase strength, introduce threshold conditioning, build power-endurance.",
      progression: [
        "Increase lifting weights by 5-10 lbs",
        "Add 1-2 reps to main lifts",
        "Increase conditioning volume and intensity",
      ],
      keyChanges: [
        "Threshold intervals: 3-5 minute efforts",
        "Add plyometric complexity",
        "Reduce rest periods",
      ],
    },
    {
      name: "Phase 3 — Competition Ready",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Peak strength and conditioning. Sport-specific energy system work.",
      progression: [
        "Test new maxes or achieve highest volume",
        "Competition-paced conditioning workouts",
        "Sport-specific metabolic finishers",
      ],
      keyChanges: [
        "Deload before peak testing",
        "High-intensity interval work",
        "Game-speed drills and combinations",
      ],
    },
  ],
  nutrition: {
    note: "Balanced macros for strength and endurance development.",
    proteinPct: [25, 35],
    carbsPct: [45, 55],
    fatsPct: [15, 25],
  },
  recovery: [
    "Sleep: 8-9 hours nightly",
    "Sport-specific recovery modalities",
    "Hydration: 120-150 oz daily",
    "Caloric intake: maintenance to slight surplus",
  ],
};
