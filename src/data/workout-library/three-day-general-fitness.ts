import type { Program } from "./types";

const WU = "8-10 min easy cardio + dynamic stretches";

/** C9F 3-day/week general-fitness program — balanced, beginner-friendly, minimal kit. */
export const threeDayGeneralFitness: Program = {
  meta: {
    id: "three-day-general-fitness",
    title: "3-Day General Fitness",
    weeks: 9,
    level: "beginner",
    goals: ["general-fitness"],
    equipment: "minimal",
    primaryCategory: "Physical Fitness",
    personaTags: ["home-workout-systems-builder", "gym-program-architect"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
    daysPerWeek: 3,
  },
  focus: "Get fit, strong, and healthy on three simple sessions a week.",
  goalStatement: "Build all-round fitness and a consistent habit — no gym required.",
  overview:
    "A balanced, beginner-friendly 3-day plan: two full-body strength days and one cardio + core day. Needs only dumbbells or bands and a bit of space. Focus on form and consistency across three gentle phases over 9 weeks.",
  weeklyStructure: [
    { day: 1, focus: "Full Body Strength" },
    { day: 2, focus: "Rest / walk" },
    { day: 3, focus: "Cardio + Core" },
    { day: 4, focus: "Rest" },
    { day: 5, focus: "Full Body Strength" },
    { day: 6, focus: "Active recovery" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundations (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Master the basics; build the routine.",
      days: [
        {
          day: 1,
          title: "Full Body Strength",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Goblet or Bodyweight Squat", pattern: "squat", sets: 3, reps: "12" },
            { name: "Push-Ups", pattern: "push", sets: 3, reps: "10" },
            { name: "Dumbbell or Band Row", pattern: "pull", sets: 3, reps: "12" },
            { name: "Glute Bridge", pattern: "hinge", sets: 3, reps: "15" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 30 },
          ],
        },
        {
          day: 3,
          title: "Cardio + Core",
          type: "cardio",
          warmup: WU,
          exercises: [
            { name: "Moderate cardio", pattern: "conditioning", notes: "20-30 min brisk walk, cycle, or jog" },
            { name: "Dead Bug", pattern: "core", sets: 3, reps: "10", perSide: true },
            { name: "Bird-Dog", pattern: "core", sets: 3, reps: "10", perSide: true },
            { name: "Side Plank", pattern: "core", sets: 3, durationSec: 20, perSide: true },
          ],
        },
        {
          day: 5,
          title: "Full Body Strength",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Reverse Lunge", pattern: "lunge", sets: 3, reps: "10", perSide: true },
            { name: "Dumbbell Shoulder Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Lat Pulldown or Band Pull-Down", pattern: "pull", sets: 3, reps: "12" },
            { name: "Romanian Deadlift (DB)", pattern: "hinge", sets: 3, reps: "12" },
            { name: "Bicycle Crunches", pattern: "core", sets: 3, reps: "15" },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Progress (Weeks 4-6)",
      weekStart: 4,
      weekEnd: 6,
      focus: "Add reps and a little load; build endurance.",
      keyChanges: [
        "Add 1-2 reps per set before adding load",
        "Progress push-ups from incline toward full",
        "Extend cardio to 30-35 min or add intervals",
      ],
    },
    {
      name: "Phase 3 — Build (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Confident, stronger, fitter sessions.",
      keyChanges: [
        "Add a set to two lifts per session",
        "Introduce tempo (slow lowers) for control",
        "Longer or faster intervals as fitness improves",
      ],
    },
  ],
  nutrition: {
    note: "Eat balanced whole foods; enough protein and plenty of vegetables.",
    proteinPct: [25, 30],
    carbsPct: [40, 45],
    fatsPct: [25, 30],
  },
  recovery: ["A daily walk helps recovery and the habit", "Sleep 7-9 hours"],
};
