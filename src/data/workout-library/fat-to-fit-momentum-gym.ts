import type { Program } from "./types";

/**
 * Fat-to-Fit Momentum (Gym) — intermediate gym-based training
 * Refined from Code9 Fitness HTML program.
 */
export const fatToFitMomentumGym: Program = {
  meta: {
    id: "fat-to-fit-momentum-gym",
    title: "Fat-to-Fit Momentum (Gym)",
    weeks: 9,
    level: "intermediate",
    goals: ["fat-loss", "muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["home-workout-systems-builder", "fat-loss-architect"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 5,
    refined: true,
    purchasable: true,
  },
  focus:
    "Accelerate fat loss and build muscle with progressive loading, higher volume, and metabolic circuits.",
  goalStatement:
    "Build strength and muscle while losing fat through structured compound lifting and conditioning.",
  overview:
    "An intermediate gym program building on foundational strength. Uses progressive loading, higher volume, and metabolic circuits to drive simultaneous fat loss and muscle gain.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Strength" },
    { day: 2, focus: "Upper Body Push" },
    { day: 3, focus: "Active Recovery or Rest" },
    { day: 4, focus: "Upper Body Pull" },
    { day: 5, focus: "Lower Body Hypertrophy" },
    { day: 6, focus: "Full-Body Conditioning" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Strength Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Establish baseline strength on major lifts. Build work capacity with higher volume.",
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
            {
              name: "Leg Curls",
              pattern: "hinge",
              sets: 3,
              reps: "12-15",
            },
          ],
        },
        {
          day: 2,
          title: "Upper Body Push",
          type: "strength",
          exercises: [
            {
              name: "Barbell Bench Press",
              pattern: "push",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Incline Dumbbell Press",
              pattern: "push",
              sets: 4,
              reps: "8-10",
            },
            {
              name: "Dumbbell Shoulder Press",
              pattern: "push",
              sets: 3,
              reps: "8-10",
            },
            {
              name: "Cable Flyes",
              pattern: "push",
              sets: 3,
              reps: "12",
            },
          ],
        },
        {
          day: 3,
          title: "Active Recovery",
          type: "recovery",
          exercises: [],
          notes: "Light treadmill walk, stretching, or foam rolling",
        },
        {
          day: 4,
          title: "Upper Body Pull",
          type: "strength",
          exercises: [
            {
              name: "Barbell Bent-Over Rows",
              pattern: "pull",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Weighted Chin-Ups",
              pattern: "pull",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "T-Bar Rows",
              pattern: "pull",
              sets: 3,
              reps: "8-10",
            },
            {
              name: "Face Pulls",
              pattern: "pull",
              sets: 3,
              reps: "15",
            },
          ],
        },
        {
          day: 5,
          title: "Lower Body Hypertrophy",
          type: "strength",
          exercises: [
            {
              name: "Barbell Front Squats",
              pattern: "squat",
              sets: 4,
              reps: "8-10",
            },
            {
              name: "Walking Lunges (Dumbbell)",
              pattern: "lunge",
              sets: 3,
              reps: "10",
              perSide: true,
            },
            {
              name: "Leg Press",
              pattern: "squat",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Leg Extensions",
              pattern: "squat",
              sets: 3,
              reps: "15-20",
            },
          ],
        },
        {
          day: 6,
          title: "Full-Body Conditioning",
          type: "hiit",
          exercises: [
            {
              name: "Circuit A: Dumbbell Clean & Press",
              pattern: "conditioning",
              sets: 4,
              reps: "8",
            },
            {
              name: "Circuit B: Battle Ropes",
              pattern: "conditioning",
              sets: 4,
              durationSec: 30,
            },
            {
              name: "Circuit C: Box Jumps",
              pattern: "conditioning",
              sets: 4,
              reps: "10",
            },
            {
              name: "Rowing Machine Finisher",
              pattern: "conditioning",
              durationSec: 300,
              notes: "5 minutes steady pace",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Progressive Overload",
      weekStart: 4,
      weekEnd: 6,
      focus: "Increase weight, volume, or density. Build strength and endurance.",
      progression: [
        "Increase main lift weights by 5-10 lbs",
        "Add 1-2 reps to each set",
        "Reduce rest by 15-30 seconds",
      ],
      keyChanges: [
        "Accessory exercises: 10-15 lbs heavier",
        "Increase conditioning volume",
        "Add drop sets on final sets",
      ],
    },
    {
      name: "Phase 3 — Peak Performance",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Maximize strength and conditioning. Test new maxes or achieve highest volume.",
      progression: [
        "Test new 1-2 rep maxes if form is perfect",
        "Match or exceed Phase 2 volume",
        "Increase speed of movements",
      ],
      keyChanges: [
        "Deload final week before testing",
        "Add explosive variations to lifts",
        "Increase HIIT complexity",
      ],
    },
  ],
  nutrition: {
    note: "Higher protein for muscle gain while maintaining slight deficit for fat loss.",
    proteinPct: [30, 40],
    carbsPct: [35, 45],
    fatsPct: [20, 30],
  },
  recovery: [
    "Sleep: 8-9 hours nightly",
    "Foam rolling: 10-15 min post-workout",
    "Hydration: 120-150 oz daily",
    "Slight caloric deficit: 250-350 kcal daily",
  ],
};
