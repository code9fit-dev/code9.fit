import type { Program } from "./types";

/**
 * Hybrid Performance — intermediate performance-focused hybrid
 * Refined from Code9 Fitness HTML program.
 */
export const hybridPerformance: Program = {
  meta: {
    id: "hybrid-performance",
    title: "Hybrid Performance",
    weeks: 9,
    level: "intermediate",
    goals: ["performance", "muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Hybrid Training",
    personaTags: ["athlete-coach", "performance-director"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 5,
    refined: true,
    purchasable: true,
  },
  focus:
    "Maximize athletic performance through focused strength-power-conditioning integration.",
  goalStatement:
    "Develop peak performance capabilities combining maximal strength, power, and metabolic conditioning.",
  overview:
    "A performance-focused hybrid program emphasizing strength quality, explosive power, and high-intensity conditioning. Designed for competitive athletes seeking balanced athletic development.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Strength & Power" },
    { day: 2, focus: "Upper Body Strength & Power" },
    { day: 3, focus: "Rest or Light Activity" },
    { day: 4, focus: "Metabolic Conditioning" },
    { day: 5, focus: "Sport-Specific Skills" },
    { day: 6, focus: "Power Development" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Strength & Movement Quality",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build maximal strength foundation. Perfect movement patterns. Establish power baseline.",
      days: [
        {
          day: 1,
          title: "Lower Body Strength & Power",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 6,
              reps: "3-5",
            },
            {
              name: "Deadlifts or Trap Bar Deadlifts",
              pattern: "hinge",
              sets: 5,
              reps: "3-5",
            },
            {
              name: "Box Jumps",
              pattern: "squat",
              sets: 3,
              reps: "5",
            },
            {
              name: "Bulgarian Split Squats",
              pattern: "lunge",
              sets: 3,
              reps: "6-8",
              perSide: true,
            },
          ],
        },
        {
          day: 2,
          title: "Upper Body Strength & Power",
          type: "strength",
          exercises: [
            {
              name: "Barbell Bench Press",
              pattern: "push",
              sets: 6,
              reps: "3-5",
            },
            {
              name: "Weighted Pull-Ups",
              pattern: "pull",
              sets: 5,
              reps: "3-5",
            },
            {
              name: "Push Press or Dumbbell Power",
              pattern: "push",
              sets: 4,
              reps: "5-6",
            },
            {
              name: "Medicine Ball Chest Pass",
              pattern: "push",
              sets: 3,
              reps: "8",
            },
          ],
        },
        {
          day: 3,
          title: "Rest or Active Recovery",
          type: "recovery",
          exercises: [],
          notes: "Light walk, mobility work, or yoga",
        },
        {
          day: 4,
          title: "Metabolic Conditioning",
          type: "hiit",
          exercises: [
            {
              name: "5 min warm-up, then: 3 min hard / 2 min easy x 4 rounds",
              pattern: "conditioning",
              durationSec: 1500,
            },
          ],
        },
        {
          day: 5,
          title: "Sport-Specific Skills",
          type: "cardio",
          exercises: [
            {
              name: "Sport-Specific Drills & Technique",
              pattern: "conditioning",
              durationSec: 1800,
              notes: "Footwork, agility, sport-specific movements",
            },
          ],
        },
        {
          day: 6,
          title: "Power Development",
          type: "hiit",
          exercises: [
            {
              name: "Plyometric Circuit: Box Jumps, Broad Jumps, Bounding",
              pattern: "squat",
              sets: 4,
              reps: "5-6",
              notes: "Full recovery between sets",
            },
            {
              name: "Medicine Ball Throws (various angles)",
              pattern: "conditioning",
              sets: 3,
              reps: "8",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Strength-Power Integration",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Combine heavy strength with explosive power. Build power-endurance. Increase conditioning volume.",
      progression: [
        "Maintain heavy loads, increase speed of movement",
        "Add contrast pairs (heavy lift + explosive movement)",
        "Increase conditioning complexity",
      ],
      keyChanges: [
        "Tempo training: emphasize explosive concentric",
        "Cluster sets: strength + power combinations",
        "Higher-intensity sport simulation",
      ],
    },
    {
      name: "Phase 3 — Peak Performance & Competition",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Maximize power output and sport-specific performance. Competition preparation.",
      progression: [
        "Test 1-rep maxes if training supports",
        "Maximum velocity work",
        "Competition-paced conditioning",
      ],
      keyChanges: [
        "Taper loading: deload week 8",
        "High-velocity low-volume work",
        "Competition-simulation sessions",
      ],
    },
  ],
  nutrition: {
    note: "Higher carbs for high-intensity training. Adequate protein for recovery.",
    proteinPct: [25, 30],
    carbsPct: [55, 65],
    fatsPct: [15, 20],
  },
  recovery: [
    "Sleep: 8-9 hours nightly",
    "Recovery modalities: ice, compression, massage",
    "Hydration: 150-180 oz daily",
    "Caloric intake: slight surplus for performance gains",
  ],
};
