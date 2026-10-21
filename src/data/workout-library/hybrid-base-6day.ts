import type { Program } from "./types";

/**
 * Hybrid Base (6-day) — sport-specific intermediate
 * Refined from Code9 Fitness HTML program.
 */
export const hybridBase6Day: Program = {
  meta: {
    id: "hybrid-base-6day",
    title: "Hybrid Base (6-day)",
    weeks: 9,
    level: "intermediate",
    goals: ["performance", "muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Hybrid Training",
    personaTags: ["athlete-coach", "sport-specific-trainer"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 6,
    refined: true,
    purchasable: true,
  },
  focus:
    "Comprehensive athletic development combining strength, power, and conditioning in 6 days per week.",
  goalStatement:
    "Develop well-rounded athletic capabilities with higher frequency strength and conditioning work.",
  overview:
    "An intermediate 6-day per week program for committed athletes. Combines multiple energy systems, movement patterns, and sport-specific qualities for comprehensive athletic development.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Strength" },
    { day: 2, focus: "Upper Body Push" },
    { day: 3, focus: "Conditioning & Skills" },
    { day: 4, focus: "Upper Body Pull" },
    { day: 5, focus: "Lower Body Power" },
    { day: 6, focus: "Sport-Specific" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Aerobic Base & Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build aerobic foundation, establish strength baseline, develop all movement patterns.",
      days: [
        {
          day: 1,
          title: "Lower Body Strength",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Romanian Deadlifts",
              pattern: "hinge",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Leg Press",
              pattern: "squat",
              sets: 3,
              reps: "10-12",
            },
          ],
        },
        {
          day: 2,
          title: "Upper Body Push",
          type: "strength",
          exercises: [
            {
              name: "Bench Press",
              pattern: "push",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Incline Press",
              pattern: "push",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Dumbbell Shoulder Press",
              pattern: "push",
              sets: 3,
              reps: "8-10",
            },
          ],
        },
        {
          day: 3,
          title: "Conditioning & Skills",
          type: "cardio",
          exercises: [
            {
              name: "Medium-Intensity Run",
              pattern: "conditioning",
              durationSec: 1200,
              notes: "20 minutes at 70% max HR",
            },
            {
              name: "Sport Skills Work",
              pattern: "conditioning",
              notes: "Sport-specific drills and techniques",
            },
          ],
        },
        {
          day: 4,
          title: "Upper Body Pull",
          type: "strength",
          exercises: [
            {
              name: "Barbell Rows",
              pattern: "pull",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Weighted Pull-Ups",
              pattern: "pull",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Face Pulls",
              pattern: "pull",
              sets: 3,
              reps: "12-15",
            },
          ],
        },
        {
          day: 5,
          title: "Lower Body Power",
          type: "hiit",
          exercises: [
            {
              name: "Box Jumps",
              pattern: "squat",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Jump Squats",
              pattern: "squat",
              sets: 3,
              reps: "10",
            },
            {
              name: "Bounding",
              pattern: "lunge",
              sets: 3,
              reps: "15",
            },
          ],
        },
        {
          day: 6,
          title: "Sport-Specific",
          type: "hiit",
          exercises: [
            {
              name: "High-Intensity Sport Practice",
              pattern: "conditioning",
              durationSec: 1800,
              notes: "Game-paced work with brief recovery",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Threshold Work & Power Development",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Build strength, develop power-endurance, introduce threshold conditioning.",
      progression: [
        "Increase lift weights by 5-10 lbs",
        "Add power-specific sets",
        "Introduce threshold intervals",
      ],
      keyChanges: [
        "Threshold intervals: 4-5 minute efforts",
        "Increase plyometric complexity",
        "Add velocity-based training",
      ],
    },
    {
      name: "Phase 3 — Competition Preparation",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Peak strength, power, and sport-specific conditioning for competition.",
      progression: [
        "Test new maxes or peak volume",
        "Competition-paced sport work",
        "Maximize power output",
      ],
      keyChanges: [
        "Deload week 8",
        "Competition-simulation workouts",
        "Sport-specific intensification",
      ],
    },
  ],
  nutrition: {
    note: "Balanced macros with emphasis on carbs for high-frequency training.",
    proteinPct: [25, 35],
    carbsPct: [50, 60],
    fatsPct: [15, 20],
  },
  recovery: [
    "Sleep: 8-9 hours nightly",
    "Active recovery on low-intensity days",
    "Hydration: 150-180 oz daily",
    "Nutrition: slight surplus or maintenance for performance",
  ],
};
