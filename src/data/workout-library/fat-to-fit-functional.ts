import type { Program } from "./types";

const WU = "10 min treadmill, incline 10%, speed 6 km/hr";

/** Refined from ImpactShredz "Fat-to-Fit (Int. Functional)". */
export const fatToFitFunctional: Program = {
  meta: {
    id: "fat-to-fit-functional",
    title: "Fat-to-Fit (Intermediate — Functional)",
    weeks: 9,
    level: "intermediate",
    goals: ["fat-loss", "performance"],
    equipment: "minimal",
    primaryCategory: "Physical Fitness",
    personaTags: ["fat-loss-architect", "sports-performance-optimizer"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Functional strength, endurance, and fat loss.",
  goalStatement: "Enhance athletic performance, lose fat, and build lean muscle.",
  overview:
    "An intermediate fat-loss program built on functional movement (kettlebell work, Olympic-style lifts, circuits) blended with HIIT and conditioning. Diet: high protein, moderate fats, low carbs, no grains.",
  weeklyStructure: [
    { day: 1, focus: "Functional Strength Training" },
    { day: 2, focus: "HIIT & Core" },
    { day: 3, focus: "Mobility & Flexibility (Yoga or Pilates)" },
    { day: 4, focus: "Circuit Training (Full-Body)" },
    { day: 5, focus: "Strength & Conditioning" },
    { day: 6, focus: "Cardio (Steady State or HIIT)" },
    { day: 7, focus: "Rest or Light Active Recovery" },
  ],
  phases: [
    {
      name: "Phase 1 — Functional Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus: "Build a functional fitness base — movement quality and endurance.",
      days: [
        {
          day: 1,
          title: "Functional Strength Training",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Kettlebell Swings", pattern: "hinge", sets: 3, reps: "15" },
            { name: "Goblet Squats", pattern: "squat", sets: 3, reps: "11" },
            { name: "Push Press", pattern: "push", sets: 3, reps: "11" },
            { name: "Plank with Shoulder Taps", pattern: "core", sets: 3, reps: "22 taps" },
            { name: "Dead Bug", pattern: "core", sets: 3, reps: "11", perSide: true },
          ],
        },
        {
          day: 2,
          title: "Cardio / HIIT",
          type: "hiit",
          warmup: WU,
          exercises: [
            { name: "Sprint intervals", pattern: "conditioning", notes: "30 sec sprint / 30 sec rest x10" },
            { name: "Russian Twists", pattern: "core", sets: 3, reps: "22" },
            { name: "Leg Raises", pattern: "core", sets: 3, reps: "15" },
            { name: "Superman Hold", pattern: "core", sets: 3, durationSec: 30 },
          ],
        },
        { day: 3, title: "Active Rest", type: "recovery", exercises: [], notes: "Mobility work, yoga, or a light walk." },
        {
          day: 4,
          title: "Functional Circuit (3 rounds)",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Bodyweight Squats", pattern: "squat", reps: "15" },
            { name: "Push-Ups", pattern: "push", reps: "15" },
            { name: "Dumbbell Row", pattern: "pull", reps: "12", perSide: true },
            { name: "Walking Lunges", pattern: "lunge", reps: "10", perSide: true },
            { name: "Mountain Climbers", pattern: "conditioning", durationSec: 20 },
          ],
        },
        {
          day: 5,
          title: "Strength & Conditioning",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlifts (DB or barbell)", pattern: "hinge", sets: 4, reps: "6-8" },
            { name: "Push-Ups", pattern: "push", sets: 4, reps: "12-15" },
            { name: "Bent-Over Rows (DB or barbell)", pattern: "pull", sets: 4, reps: "8-10" },
            { name: "Goblet Squats", pattern: "squat", sets: 4, reps: "12-15" },
            { name: "Kettlebell Swings", pattern: "hinge", sets: 4, reps: "15-20" },
            { name: "Box Jumps", pattern: "conditioning", sets: 4, reps: "8-10" },
          ],
        },
        {
          day: 6,
          title: "Cardio",
          type: "cardio",
          warmup: WU,
          exercises: [
            { name: "Steady-state cardio", pattern: "conditioning", notes: "45-60 min moderate-high intensity" },
            { name: "Finisher", pattern: "conditioning", notes: "3 rounds: 30 sec burpees / 30 sec jump rope / 30 sec rest" },
          ],
          cooldown: "Stretch and mobility",
        },
        { day: 7, title: "Light Active Recovery", type: "recovery", exercises: [], notes: "Light recovery such as yoga." },
      ],
    },
    {
      name: "Phase 2 — Strength & Power Development",
      weekStart: 4,
      weekEnd: 6,
      focus: "More complex movements and higher weights.",
      keyChanges: [
        "Day 1 → Kettlebell Deadlifts 4x10, Pull-Ups 4x8, Overhead Squats 4x8, Turkish Get-Ups 3x5/side, Side Plank w/ Leg Lift 3x12/side",
        "HIIT sprints to 40 sec / 20 sec rest x10; core: hanging leg raises, plank-to-push-up, hollow holds",
        "Functional Circuit x4 (barbell squats, push-ups x20, rows, burpees, box jumps)",
        "Day 5 adds an endurance circuit (3 rounds 40s burpees / 40s jump rope)",
      ],
    },
    {
      name: "Phase 3 — Peak Performance",
      weekStart: 7,
      weekEnd: 9,
      focus: "Peak intensity and complex, explosive movements.",
      keyChanges: [
        "Day 1 heavy: Barbell Deadlifts 5x5, Clean and Press 5x5, Front Squats 5x5, Renegade Rows 4x8/side",
        "Circuit x4: Deadlift-to-High-Pull, Push-Up-to-T-Stand, DB Snatch 9/side, Jump Squats, Sled Push & Pull 40m",
        "Sprints 45 sec / 15 sec rest x10; endurance circuit 4 rounds 45s work",
      ],
    },
  ],
  nutrition: {
    note: "High in protein, moderate in fats, low in carbs, no grains.",
    proteinPct: [35, 40],
    carbsPct: [20, 25],
    fatsPct: [35, 40],
  },
  recovery: ["Mobility, yoga, or a light walk on rest days", "Stretch and mobility after cardio"],
};
