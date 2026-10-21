import type { Program } from "./types";

/**
 * Fat-to-Fit Momentum (Home) — intermediate home-based training
 * Refined from Code9 Fitness HTML program.
 */
export const fatToFitMomentumHome: Program = {
  meta: {
    id: "fat-to-fit-momentum-home",
    title: "Fat-to-Fit Momentum (Home)",
    weeks: 9,
    level: "intermediate",
    goals: ["fat-loss", "muscle-gain"],
    equipment: "none",
    primaryCategory: "Physical Fitness",
    personaTags: ["home-workout-systems-builder", "fat-loss-architect"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 5,
    refined: true,
    purchasable: true,
  },
  focus:
    "Accelerate fat loss and build muscle momentum with advanced bodyweight progressions and higher volume.",
  goalStatement:
    "Take bodyweight training to the next level with progressive overload, higher density circuits, and compound movement mastery.",
  overview:
    "An intermediate progression of home training. Uses advanced bodyweight variations, higher volume, and density training to drive fat loss and muscle gain. Requires strong fundamental movement patterns from foundations training.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Strength & Power" },
    { day: 2, focus: "Upper Body & Core" },
    { day: 3, focus: "Active Recovery or Rest" },
    { day: 4, focus: "Full-Body Density" },
    { day: 5, focus: "Conditioning & Metabolic" },
    { day: 6, focus: "Upper Body Hypertrophy" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Building Momentum",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Establish high volume and density. Master advanced movement progressions.",
      days: [
        {
          day: 1,
          title: "Lower Body Strength & Power",
          type: "strength",
          exercises: [
            {
              name: "Pistol Squat Progressions",
              pattern: "squat",
              sets: 4,
              reps: "5-8",
              perSide: true,
            },
            {
              name: "Jump Squats",
              pattern: "squat",
              sets: 3,
              reps: "12",
            },
            {
              name: "Single-Leg Glute Bridges",
              pattern: "hinge",
              sets: 3,
              reps: "10-12",
              perSide: true,
            },
            {
              name: "Bulgarian Split Squats",
              pattern: "lunge",
              sets: 3,
              reps: "10",
              perSide: true,
            },
            {
              name: "Core Circuit",
              pattern: "core",
              notes: "Dead bug 15, bird dog 15, plank 45 sec",
            },
          ],
        },
        {
          day: 2,
          title: "Upper Body & Core",
          type: "strength",
          exercises: [
            {
              name: "Archer Push-Ups",
              pattern: "push",
              sets: 4,
              reps: "6-8",
              perSide: true,
            },
            {
              name: "Pike Push-Ups",
              pattern: "push",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Reverse Snow Angels",
              pattern: "pull",
              sets: 3,
              reps: "15",
            },
            {
              name: "L-Sit Hold",
              pattern: "core",
              sets: 3,
              durationSec: 20,
            },
            {
              name: "Decline Push-Ups",
              pattern: "push",
              sets: 3,
              reps: "10",
            },
          ],
        },
        {
          day: 3,
          title: "Active Recovery",
          type: "recovery",
          exercises: [],
          notes: "Yoga, light walk, or stretching",
        },
        {
          day: 4,
          title: "Full-Body Density",
          type: "strength",
          exercises: [
            {
              name: "Circuit: Burpees → Push-Ups → Squats → Lunges",
              pattern: "conditioning",
              sets: 5,
              reps: "10 each",
              notes: "Minimal rest between rounds",
            },
          ],
        },
        {
          day: 5,
          title: "Conditioning & Metabolic",
          type: "hiit",
          exercises: [
            {
              name: "EMOM: 20 min",
              pattern: "conditioning",
              notes: "Min 1: 15 burpees, Min 2: 20 mountain climbers, Min 3: 25 jump squats, Min 4: 30 sec plank",
            },
          ],
        },
        {
          day: 6,
          title: "Upper Body Hypertrophy",
          type: "strength",
          exercises: [
            {
              name: "Push-Up Variations",
              pattern: "push",
              sets: 4,
              reps: "12-15",
              notes: "Wide, normal, diamond grip",
            },
            {
              name: "Decline Push-Ups",
              pattern: "push",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Tricep Dips (Bench)",
              pattern: "push",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Reverse Snow Angels",
              pattern: "pull",
              sets: 3,
              reps: "15-20",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Accelerating Progress",
      weekStart: 4,
      weekEnd: 6,
      focus: "Increase density, reduce rest, add more advanced variations.",
      progression: [
        "Increase reps by 2-4 per set",
        "Reduce rest periods to 30-45 seconds",
        "Add more challenging variations",
        "Increase circuit speed",
      ],
      keyChanges: [
        "Pistol squat progression: aim for full ROM",
        "Add handstand progressions if ready",
        "Increase EMOM difficulty",
      ],
    },
    {
      name: "Phase 3 — Peak Conditioning & Performance",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Maximize conditioning and work capacity. Achieve peak fitness levels.",
      progression: [
        "Match or exceed Phase 2 volume at faster pace",
        "Perform 2-3 minute circuits with 15-30 sec rest",
        "Test new PRs on advanced movements",
      ],
      keyChanges: [
        "Add complex combinations (strength + endurance)",
        "Increase EMOM complexity",
        "Perform 20-30 minute finishers",
      ],
    },
  ],
  nutrition: {
    note: "Higher protein to support muscle gain while in moderate deficit for fat loss.",
    proteinPct: [30, 40],
    carbsPct: [35, 45],
    fatsPct: [20, 30],
  },
  recovery: [
    "Sleep: 7.5-9 hours nightly",
    "Mobility work: 10-15 min daily",
    "Hydration: 100-120 oz daily",
    "Moderate caloric deficit: 200-300 kcal",
  ],
};
