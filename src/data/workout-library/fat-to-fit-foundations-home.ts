import type { Program } from "./types";

/**
 * Fat-to-Fit Foundations (Home) — beginner-friendly home-based variant
 * Refined from Code9 Fitness HTML program.
 */
export const fatToFitFoundationsHome: Program = {
  meta: {
    id: "fat-to-fit-foundations-home",
    title: "Fat-to-Fit Foundations (Home)",
    weeks: 9,
    level: "beginner",
    goals: ["fat-loss", "general-fitness"],
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
    "Build a solid foundation with bodyweight-only home exercises, focusing on movement quality and fat loss.",
  goalStatement:
    "Master fundamental movement patterns at home with minimal equipment while establishing consistent training habits.",
  overview:
    "A beginner-friendly program designed for home environments requiring no equipment. Focuses on bodyweight mastery, movement quality, and building confidence. Perfect for those just starting their fitness journey or returning after a long break.",
  weeklyStructure: [
    { day: 1, focus: "Full-Body Strength" },
    { day: 2, focus: "Cardio & Core" },
    { day: 3, focus: "Rest or Active Recovery" },
    { day: 4, focus: "Upper Body Focus" },
    { day: 5, focus: "Lower Body Focus" },
    { day: 6, focus: "HIIT & Conditioning" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundational Movement",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Learn proper form and movement quality with bodyweight exercises. Build work capacity and movement confidence.",
      days: [
        {
          day: 1,
          title: "Full-Body Strength",
          type: "strength",
          exercises: [
            {
              name: "Bodyweight Squats",
              pattern: "squat",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Push-Ups",
              pattern: "push",
              sets: 3,
              reps: "8-12",
              notes: "Modified on knees if needed",
            },
            {
              name: "Glute Bridges",
              pattern: "hinge",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Pike Push-Ups",
              pattern: "push",
              sets: 3,
              reps: "8-10",
              notes: "Targets shoulders",
            },
            {
              name: "Plank Hold",
              pattern: "core",
              sets: 3,
              durationSec: 30,
            },
          ],
        },
        {
          day: 2,
          title: "Cardio & Core",
          type: "cardio",
          exercises: [
            {
              name: "Jump Rope or Jumping Jacks",
              pattern: "conditioning",
              durationSec: 300,
              notes: "15-20 minutes steady pace",
            },
            {
              name: "Mountain Climbers",
              pattern: "conditioning",
              sets: 3,
              reps: "20",
            },
            {
              name: "Bicycle Crunches",
              pattern: "core",
              sets: 3,
              reps: "15",
            },
            {
              name: "Dead Bug",
              pattern: "core",
              sets: 3,
              reps: "12",
              perSide: true,
            },
          ],
        },
        {
          day: 3,
          title: "Active Recovery",
          type: "recovery",
          exercises: [],
          notes: "Light walking, stretching, or yoga",
        },
        {
          day: 4,
          title: "Upper Body Focus",
          type: "strength",
          exercises: [
            {
              name: "Push-Up Variations",
              pattern: "push",
              sets: 4,
              reps: "8-12",
              notes: "Wide grip or diamond grip",
            },
            {
              name: "Pike Push-Ups",
              pattern: "push",
              sets: 3,
              reps: "8-10",
            },
            {
              name: "Tricep Dips (chair)",
              pattern: "push",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Reverse Snow Angels",
              pattern: "pull",
              sets: 3,
              reps: "12",
            },
          ],
        },
        {
          day: 5,
          title: "Lower Body Focus",
          type: "strength",
          exercises: [
            {
              name: "Bodyweight Squats",
              pattern: "squat",
              sets: 4,
              reps: "12-15",
            },
            {
              name: "Glute Bridges",
              pattern: "hinge",
              sets: 4,
              reps: "12-15",
            },
            {
              name: "Walking Lunges",
              pattern: "lunge",
              sets: 3,
              reps: "10",
              perSide: true,
            },
            {
              name: "Single-Leg Glute Bridge",
              pattern: "hinge",
              sets: 3,
              reps: "8-10",
              perSide: true,
            },
          ],
        },
        {
          day: 6,
          title: "HIIT & Conditioning",
          type: "hiit",
          exercises: [
            {
              name: "Burpees",
              pattern: "conditioning",
              sets: 3,
              reps: "10",
              notes: "30 sec work : 30 sec rest",
            },
            {
              name: "High Knees",
              pattern: "conditioning",
              sets: 3,
              durationSec: 30,
              notes: "As fast as possible",
            },
            {
              name: "Jump Squats",
              pattern: "squat",
              sets: 3,
              reps: "12",
            },
            {
              name: "Mountain Climbers",
              pattern: "conditioning",
              sets: 3,
              reps: "20",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Progressive Overload",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Increase reps and sets. Add exercise variations. Build muscular endurance and work capacity.",
      progression: [
        "Increase reps by 2-3 per set",
        "Add 1-2 extra sets to main exercises",
        "Reduce rest periods by 15 seconds",
        "Try harder variations of exercises",
      ],
      keyChanges: [
        "Rest: 60 seconds between sets (down from 90)",
        "Add pistol squat progression",
        "Increase HIIT intensity",
      ],
    },
    {
      name: "Phase 3 — Performance & Conditioning",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Maximize work capacity and conditioning. Achieve peak performance and consistency.",
      progression: [
        "Match or exceed Phase 2 reps and sets",
        "Reduce rest periods to 45 seconds",
        "Combine phases with metabolic finishers",
      ],
      keyChanges: [
        "Add power-based training (plyometrics)",
        "Increase HIIT frequency",
        "Perform 2-3 minute circuits with minimal rest",
      ],
    },
  ],
  nutrition: {
    note: "Moderate protein intake to preserve muscle during fat loss. Higher fats for satiety.",
    proteinPct: [25, 35],
    carbsPct: [30, 40],
    fatsPct: [30, 40],
  },
  recovery: [
    "Sleep: 7-9 hours nightly",
    "Active recovery: light stretching on rest days",
    "Hydration: 80-100 oz water daily",
    "Nutrition: eat in a slight caloric deficit (300-500 kcal)",
  ],
};
