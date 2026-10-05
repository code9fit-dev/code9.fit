import type { Program } from "./types";

/** Refined from ImpactShredz "Drop that A: Fat-to-Fit (BASE)". Beginner on-ramp. */
export const fatToFitBase: Program = {
  meta: {
    id: "fat-to-fit-base",
    title: "Drop that A: Fat-to-Fit (BASE)",
    weeks: 9,
    level: "beginner",
    goals: ["fat-loss", "general-fitness"],
    equipment: "minimal",
    primaryCategory: "Physical Fitness",
    personaTags: ["home-workout-systems-builder", "fat-loss-architect"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Build a fitness foundation, improve mobility, and start fat loss.",
  goalStatement:
    "Introduce consistent exercise and healthy eating habits for someone new to fitness.",
  overview:
    "For individuals new to fitness. Builds a strong foundation with simple, effective exercises and a basic nutritional plan (moderate protein, higher fats, lower carbs, no grains). Equipment: resistance bands, an optional pair of dumbbells, a jump rope, and a sturdy chair or bench.",
  weeklyStructure: [
    { day: 1, focus: "Full-Body Workout" },
    { day: 2, focus: "Cardio & Core" },
    { day: 3, focus: "Rest or Light Activity" },
    { day: 4, focus: "Upper Body Focus" },
    { day: 5, focus: "Lower Body Focus" },
    { day: 6, focus: "HIIT / Cardio & Core" },
    { day: 7, focus: "Rest or Light Active Recovery" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundation Building",
      weekStart: 1,
      weekEnd: 3,
      focus: "Develop coordination, strength, and endurance with basic exercises.",
      days: [
        {
          day: 1,
          title: "Full-Body Strength",
          type: "strength",
          exercises: [
            { name: "Bodyweight Squats", pattern: "squat", sets: 3, reps: "11" },
            { name: "Push-Ups", pattern: "push", sets: 3, reps: "11", notes: "Modified if needed" },
            { name: "Bent-Over Rows", pattern: "pull", sets: 3, reps: "11", notes: "Bands or light dumbbells" },
            { name: "Glute Bridges", pattern: "hinge", sets: 3, reps: "10-12" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 20 },
          ],
        },
        {
          day: 2,
          title: "Cardio & Core",
          type: "cardio",
          exercises: [
            { name: "Walk / Cycle", pattern: "conditioning", notes: "15-20 minutes" },
            { name: "Seated Knee Tucks", pattern: "core", sets: 3, reps: "11" },
            { name: "Side Leg Raises", pattern: "core", sets: 3, reps: "11", perSide: true },
            { name: "Bird-Dog", pattern: "core", sets: 3, reps: "11", perSide: true },
            { name: "Ab Crunches", pattern: "core", sets: 3, reps: "11" },
          ],
        },
        { day: 3, title: "Active Recovery", type: "recovery", exercises: [], notes: "Walking, stretching, or yoga." },
        {
          day: 4,
          title: "Upper Body Focus",
          type: "strength",
          exercises: [
            { name: "Wall Push-Ups", pattern: "push", sets: 3, reps: "11" },
            { name: "Shoulder Press (bands)", pattern: "push", sets: 3, reps: "11" },
            { name: "Tricep Dips (chair)", pattern: "push", sets: 3, reps: "11" },
            { name: "Bicep Curls (bands/light DB)", pattern: "pull", sets: 3, reps: "11" },
          ],
        },
        {
          day: 5,
          title: "Lower Body Focus",
          type: "strength",
          exercises: [
            { name: "Chair Squats", pattern: "squat", sets: 3, reps: "11" },
            { name: "Standing Calf Raises", pattern: "core", sets: 3, reps: "11" },
            { name: "Side Leg Raises", pattern: "lunge", sets: 3, reps: "12", perSide: true },
            { name: "Glute Bridges", pattern: "hinge", sets: 3, reps: "11" },
            { name: "Seated Leg Extensions", pattern: "squat", sets: 3, reps: "11", notes: "Bands or bodyweight" },
          ],
        },
        {
          day: 6,
          title: "Cardio & Core",
          type: "hiit",
          exercises: [
            { name: "Walk / Cycle", pattern: "conditioning", notes: "15-20 minutes" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 20, notes: "Knees down if needed" },
            { name: "Bicycle Crunches", pattern: "core", sets: 3, reps: "11", perSide: true },
            { name: "Heel Touches", pattern: "core", sets: 3, reps: "11", perSide: true },
            { name: "V-Sit", pattern: "core", sets: 3, durationSec: 20 },
          ],
        },
        { day: 7, title: "Active Recovery", type: "recovery", exercises: [], notes: "Walking, stretching, or yoga." },
      ],
    },
    {
      name: "Phase 2 — Strength & Endurance Building",
      weekStart: 4,
      weekEnd: 6,
      focus: "Increase intensity slightly while keeping exercises simple and effective.",
      progression: [
        "Main lifts to 4 sets",
        "Bodyweight squats 12-15, push-ups 10-12, rows 12, glute bridges 15, plank 30s",
        "Walk/cycle up to 20-30 minutes",
        "Add Russian Twists to the core work",
      ],
    },
    {
      name: "Phase 3 — Advanced Beginner",
      weekStart: 7,
      weekEnd: 9,
      focus: "Push further to build confidence, strength, and endurance.",
      keyChanges: [
        "Squats 15-20, push-ups 12-15, rows 15, glute bridges 20, plank 40-45s",
        "Walk/cycle 30-40 minutes",
        "Progress chair squats toward full squats",
      ],
    },
  ],
  nutrition: {
    note: "Moderate in protein, higher in fats, lower in carbs, no grains.",
    proteinPct: [25, 30],
    carbsPct: [20, 25],
    fatsPct: [45, 55],
  },
  recovery: ["Walking, stretching, or yoga on recovery days", "Prioritise consistency over intensity"],
};
