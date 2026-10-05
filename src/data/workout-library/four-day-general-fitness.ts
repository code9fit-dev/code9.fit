import type { Program } from "./types";

const WU = "8-10 min easy cardio + dynamic stretches";

/** C9F 4-day/week, 9-week progressive general-fitness program. */
export const fourDayGeneralFitness: Program = {
  meta: {
    id: "four-day-general-fitness",
    title: "4-Day General Fitness (9-Week)",
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
    daysPerWeek: 4,
  },
  focus: "Two full-body strength days and two cardio/core days — balanced and doable.",
  goalStatement: "Build all-round fitness and a lasting habit across 9 weeks.",
  overview:
    "A beginner-friendly 4-day plan alternating full-body strength with cardio + core. Needs only dumbbells or bands. Progresses gently from foundations to confident, stronger sessions.",
  weeklyStructure: [
    { day: 1, focus: "Full Body Strength A" },
    { day: 2, focus: "Cardio + Core" },
    { day: 3, focus: "Rest" },
    { day: 4, focus: "Full Body Strength B" },
    { day: 5, focus: "Cardio + Core" },
    { day: 6, focus: "Active recovery / walk" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundations (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Learn the basics; build the routine.",
      days: [
        {
          day: 1,
          title: "Full Body Strength A",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Goblet Squat", pattern: "squat", sets: 3, reps: "12" },
            { name: "Push-Ups", pattern: "push", sets: 3, reps: "10" },
            { name: "Dumbbell / Band Row", pattern: "pull", sets: 3, reps: "12" },
            { name: "Glute Bridge", pattern: "hinge", sets: 3, reps: "15" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 30 },
          ],
        },
        {
          day: 2,
          title: "Cardio + Core",
          type: "cardio",
          warmup: WU,
          exercises: [
            { name: "Moderate cardio", pattern: "conditioning", notes: "20-30 min brisk walk, cycle, or jog" },
            { name: "Dead Bug", pattern: "core", sets: 3, reps: "10", perSide: true },
            { name: "Side Plank", pattern: "core", sets: 3, durationSec: 20, perSide: true },
          ],
        },
        {
          day: 4,
          title: "Full Body Strength B",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Reverse Lunge", pattern: "lunge", sets: 3, reps: "10", perSide: true },
            { name: "Dumbbell Shoulder Press", pattern: "push", sets: 3, reps: "12" },
            { name: "Lat Pulldown / Band Pull-Down", pattern: "pull", sets: 3, reps: "12" },
            { name: "Romanian Deadlift (DB)", pattern: "hinge", sets: 3, reps: "12" },
            { name: "Bird-Dog", pattern: "core", sets: 3, reps: "10", perSide: true },
          ],
        },
        {
          day: 5,
          title: "Cardio + Core",
          type: "cardio",
          warmup: WU,
          exercises: [
            { name: "Intervals", pattern: "conditioning", notes: "10 rounds: 1 min brisk / 1 min easy" },
            { name: "Bicycle Crunches", pattern: "core", sets: 3, reps: "15" },
            { name: "Superman Hold", pattern: "core", sets: 3, durationSec: 20 },
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
        "Add 1-2 reps per set, then a little load",
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
        "Add a 4th set to two lifts per day",
        "Introduce tempo (slow lowers) for control",
        "Longer or faster intervals as fitness improves",
      ],
    },
  ],
  nutrition: {
    note: "Balanced whole foods, enough protein, plenty of vegetables.",
    proteinPct: [25, 30],
    carbsPct: [40, 45],
    fatsPct: [25, 30],
  },
  recovery: ["A daily walk helps recovery and the habit", "Sleep 7-9 hours"],
};
