import type { Program } from "./types";

/**
 * Peachy Progression (3-day) — lower body focus beginner
 * Refined from Code9 Fitness HTML program.
 */
export const peachyProgression3Day: Program = {
  meta: {
    id: "peachy-progression-3day",
    title: "Peachy Progression (3-day)",
    weeks: 9,
    level: "beginner",
    goals: ["muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Glute & Lower Body",
    personaTags: ["glute-specialist", "lower-body-builder"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 3,
    refined: true,
    purchasable: true,
  },
  focus:
    "Progressive lower body and glute development with 3 training days per week.",
  goalStatement:
    "Build strong, developed glutes and lower body through targeted, progressive training.",
  overview:
    "A beginner-friendly lower body specialization program with 3 training days per week. Focuses on progressive glute development, strength, and hypertrophy. Includes comprehensive lower body and core work.",
  weeklyStructure: [
    { day: 1, focus: "Glute & Quad Emphasis" },
    { day: 2, focus: "Rest or Active Recovery" },
    { day: 3, focus: "Glute & Hamstring Emphasis" },
    { day: 4, focus: "Rest or Active Recovery" },
    { day: 5, focus: "Full Lower Body" },
    { day: 6, focus: "Rest" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundation & Activation",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build foundational strength. Master movement patterns. Activate and develop glute awareness.",
      days: [
        {
          day: 1,
          title: "Glute & Quad Emphasis",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 4,
              reps: "8-10",
            },
            {
              name: "Glute Bridges or Hip Thrusts",
              pattern: "hinge",
              sets: 4,
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
            {
              name: "Leg Press (feet high on platform)",
              pattern: "squat",
              sets: 3,
              reps: "12-15",
            },
          ],
        },
        {
          day: 2,
          title: "Rest or Active Recovery",
          type: "recovery",
          exercises: [],
          notes: "Light walk, yoga, or stretching",
        },
        {
          day: 3,
          title: "Glute & Hamstring Emphasis",
          type: "strength",
          exercises: [
            {
              name: "Deadlifts or Romanian Deadlifts",
              pattern: "hinge",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Bulgarian Split Squats",
              pattern: "lunge",
              sets: 4,
              reps: "10-12",
              perSide: true,
            },
            {
              name: "Leg Curls",
              pattern: "hinge",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Glute-Focused Leg Press (feet high)",
              pattern: "hinge",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Good Mornings or Back Extensions",
              pattern: "hinge",
              sets: 3,
              reps: "10-12",
            },
          ],
        },
        {
          day: 4,
          title: "Rest or Active Recovery",
          type: "recovery",
          exercises: [],
          notes: "Light walk, foam rolling",
        },
        {
          day: 5,
          title: "Full Lower Body",
          type: "strength",
          exercises: [
            {
              name: "Front Squats or Goblet Squats",
              pattern: "squat",
              sets: 3,
              reps: "8-10",
            },
            {
              name: "Walking Lunges",
              pattern: "lunge",
              sets: 3,
              reps: "10",
              perSide: true,
            },
            {
              name: "Sumo Deadlifts or Wide-Stance Squats",
              pattern: "hinge",
              sets: 3,
              reps: "8-10",
            },
            {
              name: "Abduction Machine",
              pattern: "hinge",
              sets: 3,
              reps: "15",
            },
            {
              name: "Core Circuit: Planks, Side Planks, Dead Bugs",
              pattern: "core",
              notes: "30 sec each, 3 rounds",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Progressive Overload",
      weekStart: 4,
      weekEnd: 6,
      focus: "Increase weight or reps. Build strength and hypertrophy.",
      progression: [
        "Increase weight by 5-10 lbs on main lifts",
        "Add 1-2 reps to accessory exercises",
        "Add 1 set to main movements",
      ],
      keyChanges: [
        "Main compounds: heavier loads",
        "Accessory: higher reps (15-20) for pump",
        "Reduce rest periods slightly",
      ],
    },
    {
      name: "Phase 3 — Peak Hypertrophy & Strength",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Maximize muscle development. Peak strength. High-volume glute work.",
      progression: [
        "Match or exceed Phase 2 loads",
        "Higher rep accessory work",
        "Maximum glute activation",
      ],
      keyChanges: [
        "Add drop sets on final sets",
        "High-rep glute finishers (20-30 reps)",
        "Focus on glute mind-muscle connection",
      ],
    },
  ],
  nutrition: {
    note: "High protein and carbs for muscle building. Slight surplus.",
    proteinPct: [30, 40],
    carbsPct: [40, 50],
    fatsPct: [20, 25],
  },
  recovery: [
    "Sleep: 7.5-9 hours nightly",
    "Glute-specific mobility work daily",
    "Hydration: 100-120 oz daily",
    "Caloric surplus: 300-500 kcal daily",
  ],
};
