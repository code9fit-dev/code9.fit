import type { Program } from "./types";

/**
 * Peachy Progression (4-day) — lower body focus intermediate
 * Refined from Code9 Fitness HTML program.
 */
export const peachyProgression4Day: Program = {
  meta: {
    id: "peachy-progression-4day",
    title: "Peachy Progression (4-day)",
    weeks: 9,
    level: "intermediate",
    goals: ["muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Glute & Lower Body",
    personaTags: ["glute-specialist", "lower-body-builder"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 4,
    refined: true,
    purchasable: true,
  },
  focus:
    "Advanced lower body and glute development with 4 training days per week.",
  goalStatement:
    "Achieve significant glute and lower body muscle development through higher frequency, targeted training.",
  overview:
    "An intermediate lower body specialization program with 4 training days per week. Provides higher training frequency and volume for aggressive glute and lower body development. Includes dedicated quad, hamstring, and glute days.",
  weeklyStructure: [
    { day: 1, focus: "Glute & Quad Focus" },
    { day: 2, focus: "Hamstring & Glute Focus" },
    { day: 3, focus: "Rest or Light Activity" },
    { day: 4, focus: "Quad & Accessory" },
    { day: 5, focus: "Glute & Core Intensive" },
    { day: 6, focus: "Rest" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Strength Foundation & Glute Activation",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build strength foundation. Activate glutes. Establish movement patterns.",
      days: [
        {
          day: 1,
          title: "Glute & Quad Focus",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Hip Thrusts (Loaded)",
              pattern: "hinge",
              sets: 4,
              reps: "8-10",
            },
            {
              name: "Leg Press (High Foot Placement)",
              pattern: "squat",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Leg Extensions",
              pattern: "squat",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Cable Kickbacks",
              pattern: "hinge",
              sets: 3,
              reps: "12-15",
              perSide: true,
            },
          ],
        },
        {
          day: 2,
          title: "Hamstring & Glute Focus",
          type: "strength",
          exercises: [
            {
              name: "Romanian Deadlifts",
              pattern: "hinge",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Bulgarian Split Squats",
              pattern: "lunge",
              sets: 4,
              reps: "8-10",
              perSide: true,
            },
            {
              name: "Leg Curls",
              pattern: "hinge",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Glute-Focused Leg Press",
              pattern: "hinge",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Nordic Hamstring Curls or Machine Curls",
              pattern: "hinge",
              sets: 2,
              reps: "6-8",
            },
          ],
        },
        {
          day: 3,
          title: "Rest or Light Activity",
          type: "recovery",
          exercises: [],
          notes: "Light walk or stretching",
        },
        {
          day: 4,
          title: "Quad & Accessory",
          type: "strength",
          exercises: [
            {
              name: "Front Squats",
              pattern: "squat",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Leg Press (Quad-Dominant Angle)",
              pattern: "squat",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Leg Extensions",
              pattern: "squat",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Walking Lunges",
              pattern: "lunge",
              sets: 3,
              reps: "10-12",
              perSide: true,
            },
            {
              name: "Adduction Machine",
              pattern: "hinge",
              sets: 2,
              reps: "15",
            },
          ],
        },
        {
          day: 5,
          title: "Glute & Core Intensive",
          type: "strength",
          exercises: [
            {
              name: "Sumo Deadlifts",
              pattern: "hinge",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Glute Bridges (Paused)",
              pattern: "hinge",
              sets: 4,
              reps: "10-12",
              notes: "2 sec pause at top",
            },
            {
              name: "Smith Machine Squats (Glute-Emphasis)",
              pattern: "squat",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Cable Pull-Through",
              pattern: "hinge",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Core Circuit: Ab Wheel, Planks, Pallof Press",
              pattern: "core",
              notes: "10, 45 sec, 12 per side × 3",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Hypertrophy & Volume Increase",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Increase volume and intensity. Build muscle. Maximize pump and engagement.",
      progression: [
        "Increase weights by 5-10 lbs",
        "Add 1-2 reps to main lifts",
        "Add additional sets to accessories",
      ],
      keyChanges: [
        "Main compounds: add 1 set",
        "Accessory: higher reps (15-20)",
        "Reduce rest by 15 seconds",
      ],
    },
    {
      name: "Phase 3 — Peak Muscle Development",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Maximize glute and lower body muscle development. Peak hypertrophy.",
      progression: [
        "Match or exceed Phase 2 volumes",
        "High-rep glute finishers",
        "Maximum metabolic stress",
      ],
      keyChanges: [
        "Add drop sets on final sets",
        "Increase glute-focused exercise selection",
        "Implement 20-30 rep finisher sets",
      ],
    },
  ],
  nutrition: {
    note: "High protein and carbs for muscle building. Moderate surplus.",
    proteinPct: [30, 40],
    carbsPct: [40, 50],
    fatsPct: [20, 25],
  },
  recovery: [
    "Sleep: 8-9 hours nightly",
    "Glute-specific mobility and massage",
    "Hydration: 120-150 oz daily",
    "Caloric surplus: 400-600 kcal daily",
  ],
};
