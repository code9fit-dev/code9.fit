import type { Program } from "./types";

/**
 * Fat-to-Fit Foundations (Gym) — beginner-friendly gym-based variant
 * Refined from Code9 Fitness HTML program.
 */
export const fatToFitFoundationsGym: Program = {
  meta: {
    id: "fat-to-fit-foundations-gym",
    title: "Fat-to-Fit Foundations (Gym)",
    weeks: 9,
    level: "beginner",
    goals: ["fat-loss", "general-fitness"],
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
    "Build a solid foundation with gym equipment, focusing on movement quality, strength, and fat loss.",
  goalStatement:
    "Master fundamental movement patterns with proper form and equipment while establishing consistent training habits.",
  overview:
    "A beginner-friendly program designed for full gym environments. Focuses on compound lifts, movement quality, and building confidence with weights. Perfect for those new to gyms or returning after a long break.",
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
      name: "Phase 1 — Foundational Strength",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Learn proper form on compound lifts. Build work capacity and establish baseline strength.",
      days: [
        {
          day: 1,
          title: "Full-Body Strength",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 3,
              reps: "8-10",
              notes: "Warm up thoroughly",
            },
            {
              name: "Barbell Bench Press",
              pattern: "push",
              sets: 3,
              reps: "8-10",
            },
            {
              name: "Barbell Bent-Over Rows",
              pattern: "pull",
              sets: 3,
              reps: "8-10",
            },
            {
              name: "Dumbbell Goblet Squats",
              pattern: "squat",
              sets: 3,
              reps: "12-15",
            },
            { name: "Ab Wheel Rollout", pattern: "core", sets: 3, reps: "8" },
          ],
        },
        {
          day: 2,
          title: "Cardio & Core",
          type: "cardio",
          exercises: [
            {
              name: "Treadmill or Elliptical",
              pattern: "conditioning",
              durationSec: 1200,
              notes: "20 minutes steady pace",
            },
            {
              name: "Cable Woodchops",
              pattern: "core",
              sets: 3,
              reps: "12",
              perSide: true,
            },
            {
              name: "Hanging Leg Raises",
              pattern: "core",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Machine Ab Crunch",
              pattern: "core",
              sets: 3,
              reps: "15",
            },
          ],
        },
        {
          day: 3,
          title: "Active Recovery",
          type: "recovery",
          exercises: [],
          notes: "Light walk on treadmill or stretching",
        },
        {
          day: 4,
          title: "Upper Body Focus",
          type: "strength",
          exercises: [
            {
              name: "Dumbbell Bench Press",
              pattern: "push",
              sets: 4,
              reps: "8-12",
            },
            {
              name: "Barbell Bent-Over Rows",
              pattern: "pull",
              sets: 4,
              reps: "8-10",
            },
            {
              name: "Dumbbell Shoulder Press",
              pattern: "push",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Lat Pulldown",
              pattern: "pull",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Dumbbell Bicep Curls",
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
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 4,
              reps: "8-10",
            },
            {
              name: "Romanian Deadlifts",
              pattern: "hinge",
              sets: 3,
              reps: "8-10",
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
          day: 6,
          title: "HIIT & Conditioning",
          type: "hiit",
          exercises: [
            {
              name: "Rowing Machine Sprints",
              pattern: "conditioning",
              sets: 6,
              durationSec: 30,
              notes: "30 sec hard : 90 sec easy",
            },
            {
              name: "Battle Ropes",
              pattern: "conditioning",
              sets: 3,
              durationSec: 30,
            },
            {
              name: "Box Jumps",
              pattern: "squat",
              sets: 3,
              reps: "8",
            },
            {
              name: "Medicine Ball Slams",
              pattern: "conditioning",
              sets: 3,
              reps: "10",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Progressive Loading",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Increase weight or reps. Add more volume. Build strength and muscle with better work capacity.",
      progression: [
        "Increase weight by 5-10 lbs on compound lifts",
        "Add 1-2 extra sets to main exercises",
        "Reduce rest periods by 15-30 seconds",
      ],
      keyChanges: [
        "Main lifts: rest 90 seconds (down from 120)",
        "Add more accessory exercises",
        "Increase cardio intensity",
      ],
    },
    {
      name: "Phase 3 — Peak Performance",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Maximize strength gains and conditioning. Test new maxes or higher volume targets.",
      progression: [
        "Continue adding weight when form stays perfect",
        "Maintain or exceed Phase 2 volume",
        "Focus on explosive movements",
      ],
      keyChanges: [
        "Add power-based exercises (box jumps, cleans if trained)",
        "Increase HIIT complexity",
        "Deload final week before testing maxes",
      ],
    },
  ],
  nutrition: {
    note: "Moderate protein for muscle preservation. Slight caloric deficit for fat loss.",
    proteinPct: [25, 35],
    carbsPct: [30, 40],
    fatsPct: [30, 40],
  },
  recovery: [
    "Sleep: 7-9 hours nightly",
    "Foam rolling after workouts",
    "Hydration: 100-120 oz water daily",
    "Nutrition: caloric deficit of 300-500 kcal daily",
  ],
};
