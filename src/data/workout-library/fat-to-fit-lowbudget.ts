import type { Program } from "./types";

const WU = "Incline walk, 10 minutes";

/** Refined from ImpactShredz "Fat-to-Fit (L.Bud)" — low-budget / minimal equipment. */
export const fatToFitLowBudget: Program = {
  meta: {
    id: "fat-to-fit-lowbudget",
    title: "Fat-to-Fit (L.Bud — Bodyweight)",
    weeks: 9,
    level: "beginner",
    goals: ["fat-loss", "general-fitness"],
    equipment: "none",
    primaryCategory: "Physical Fitness",
    personaTags: ["home-workout-systems-builder", "fat-loss-architect"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Full-body conditioning, fat loss, and lean muscle gain.",
  goalStatement: "Transform your body using minimal equipment and a low-cost diet.",
  overview:
    "Bodyweight-first fat loss for home or minimal gym access. Equipment: resistance bands, an optional pair of dumbbells, a jump rope, and a sturdy chair or bench. Diet: moderate protein, higher fats, low carbs, no grains.",
  weeklyStructure: [
    { day: 1, focus: "Full-Body Strength" },
    { day: 2, focus: "Cardio & Core" },
    { day: 3, focus: "Upper Body Focus" },
    { day: 4, focus: "Active Rest: Mobility / Yoga / Walk" },
    { day: 5, focus: "Lower Body Focus" },
    { day: 6, focus: "HIIT" },
    { day: 7, focus: "Rest or Light Active Recovery" },
  ],
  phases: [
    {
      name: "Phase 1 — Bodyweight Basics",
      weekStart: 1,
      weekEnd: 3,
      focus: "Build foundational strength with bodyweight and light resistance.",
      days: [
        {
          day: 1,
          title: "Full-Body Strength",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Push-Ups", pattern: "push", sets: 3, reps: "12-15" },
            { name: "Bodyweight Squats", pattern: "squat", sets: 3, reps: "15-20" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 30 },
            { name: "Glute Bridges", pattern: "hinge", sets: 3, reps: "15" },
            { name: "Inverted Rows", pattern: "pull", sets: 3, reps: "10-12" },
            { name: "Resistance Band Pull-Aparts", pattern: "pull", sets: 3, reps: "15" },
          ],
        },
        {
          day: 2,
          title: "Cardio & Core",
          type: "cardio",
          warmup: WU,
          exercises: [
            { name: "Jump Rope", pattern: "conditioning", sets: 3, reps: "60 sec" },
            { name: "Bicycle Crunches", pattern: "core", sets: 3, reps: "22" },
            { name: "Leg Raises", pattern: "core", sets: 3, reps: "22" },
            { name: "Side Plank", pattern: "core", sets: 3, durationSec: 22, perSide: true },
            { name: "Mountain Climbers", pattern: "conditioning", sets: 3, durationSec: 30 },
          ],
        },
        {
          day: 3,
          title: "Upper Body Focus",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Varied Push-Ups", pattern: "push", sets: 4, reps: "12-15" },
            { name: "Resistance Band Rows", pattern: "pull", sets: 4, reps: "12-15" },
            { name: "Chair Dips", pattern: "push", sets: 3, reps: "12-15" },
            { name: "Band Bicep Curls", pattern: "pull", sets: 3, reps: "15" },
            { name: "Tricep Extensions", pattern: "push", sets: 3, reps: "15" },
          ],
        },
        { day: 4, title: "Active Rest", type: "recovery", exercises: [], notes: "Mobility / yoga / walk." },
        {
          day: 5,
          title: "Lower Body Focus",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Bodyweight Squats", pattern: "squat", sets: 4, reps: "15-20" },
            { name: "Lunges", pattern: "lunge", sets: 4, reps: "10", perSide: true },
            { name: "Step-Ups", pattern: "lunge", sets: 3, reps: "12", perSide: true },
            { name: "Glute Bridges", pattern: "hinge", sets: 3, reps: "15-20" },
            { name: "Calf Raises", pattern: "core", sets: 3, reps: "20" },
          ],
        },
        {
          day: 6,
          title: "Cardio Circuit (4-6 rounds)",
          type: "hiit",
          warmup: WU,
          exercises: [
            { name: "Jump Squats", pattern: "conditioning", durationSec: 30 },
            { name: "Push-Ups", pattern: "push", durationSec: 30 },
            { name: "Burpees", pattern: "conditioning", durationSec: 30 },
            { name: "High Knees", pattern: "conditioning", durationSec: 30 },
          ],
        },
        { day: 7, title: "Light Active Recovery", type: "recovery", exercises: [], notes: "Light activity or stretching." },
      ],
    },
    {
      name: "Phase 2 — Increased Intensity",
      weekStart: 4,
      weekEnd: 6,
      focus: "Progress with heavier bodyweight and resistance work.",
      keyChanges: [
        "Full body → Goblet Squats 4x12-15, Plank w/ Shoulder Taps, Single-Leg Glute Bridges, band Face Pulls",
        "Cardio & Core → Jump Rope 30 min, Plank 4x45s, Russian Twists, Flutter Kicks, Reverse Crunches",
        "Lower → Split Squats, Lateral Lunges, Single-Leg Deadlifts (all 4x11/leg)",
        "Cardio Circuit to 5-7 rounds (jump lunges, burpees, skaters)",
      ],
    },
    {
      name: "Phase 3 — Advanced Bodyweight & Resistance",
      weekStart: 7,
      weekEnd: 9,
      focus: "Maximise performance with challenging, explosive movements.",
      keyChanges: [
        "Full body → Bulgarian Split Squats, Plank-to-Push-Up, Glute Bridge March, Pull-Ups/Inverted Rows",
        "Upper → Decline Push-Ups 4x20, Weighted Chair Dips, Band Hammer Curls",
        "Lower → Single-Leg Squats to a chair, Weighted Step-Ups, Single-Leg Glute Bridges",
        "HIIT to 6-8 rounds at 45 sec work",
      ],
    },
  ],
  nutrition: {
    note: "Moderate in protein, higher in fats, low in carbs, no grains — affordable staples.",
    proteinPct: [25, 30],
    carbsPct: [20, 25],
    fatsPct: [45, 55],
  },
  recovery: ["Mobility / yoga / walk on rest days", "Keep it consistent and low-cost"],
};
