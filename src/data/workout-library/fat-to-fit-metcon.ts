import type { Program } from "./types";

const WU = "10 min treadmill, incline 10%, speed 6 km/hr";

/** Refined from ImpactShredz "Fat-to-Fit (Adv. MetCon)". */
export const fatToFitMetcon: Program = {
  meta: {
    id: "fat-to-fit-metcon",
    title: "Fat-to-Fit (Advanced — MetCon)",
    weeks: 9,
    level: "advanced",
    goals: ["fat-loss", "performance"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["fat-loss-architect", "sports-performance-optimizer"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Strength, endurance, and metabolic conditioning (MetCon).",
  goalStatement: "Build lean muscle, increase endurance, and burn fat.",
  overview:
    "The advanced Fat-to-Fit track — heavy compound strength paired with demanding metabolic conditioning. Diet: moderate protein, high fats, low carbs, no grains.",
  weeklyStructure: [
    { day: 1, focus: "Upper Body Strength" },
    { day: 2, focus: "Lower Body Strength" },
    { day: 3, focus: "Metabolic Conditioning (MetCon)" },
    { day: 4, focus: "Active Recovery" },
    { day: 5, focus: "Full-Body Strength & Power" },
    { day: 6, focus: "Cardio (Steady State or HIIT)" },
    { day: 7, focus: "Rest or Light Active Recovery" },
  ],
  phases: [
    {
      name: "Phase 1 — Strength Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus: "Build a solid strength base with basic compound movements.",
      days: [
        {
          day: 1,
          title: "Upper Body",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Bench Press", pattern: "push", sets: 4, reps: "11" },
            { name: "Bent-Over Rows", pattern: "pull", sets: 4, reps: "11" },
            { name: "Overhead Press", pattern: "push", sets: 4, reps: "11" },
            { name: "Dumbbell Curls", pattern: "pull", sets: 4, reps: "11" },
            { name: "Tricep Pushdowns", pattern: "push", sets: 4, reps: "11" },
          ],
        },
        {
          day: 2,
          title: "Lower Body",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Back Squats", pattern: "squat", sets: 4, reps: "11" },
            { name: "Deadlifts", pattern: "hinge", sets: 4, reps: "9" },
            { name: "Leg Press", pattern: "squat", sets: 3, reps: "11" },
            { name: "Bulgarian Split Squats", pattern: "lunge", sets: 3, reps: "11", perSide: true },
            { name: "Calf Raises", pattern: "core", sets: 3, reps: "22" },
          ],
        },
        {
          day: 3,
          title: "Metabolic Conditioning",
          type: "hiit",
          warmup: WU,
          exercises: [
            { name: "Burpees", pattern: "conditioning", reps: "22" },
            { name: "Kettlebell Swings", pattern: "hinge", reps: "22" },
            { name: "Box Jumps", pattern: "conditioning", reps: "11" },
            { name: "Push-Ups", pattern: "push", reps: "22" },
            { name: "Mountain Climbers", pattern: "conditioning", durationSec: 30 },
            { name: "Finisher", pattern: "conditioning", notes: "500m row as fast as possible" },
          ],
        },
        { day: 4, title: "Active Rest", type: "recovery", exercises: [], notes: "Mobility work, yoga, or a light walk." },
        {
          day: 5,
          title: "Full-Body Strength & Power",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Power Clean", pattern: "hinge", sets: 4, reps: "6" },
            { name: "Push Press", pattern: "push", sets: 4, reps: "9" },
            { name: "Front Squat", pattern: "squat", sets: 4, reps: "9" },
            { name: "Kettlebell Swings", pattern: "hinge", sets: 3, reps: "22" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 45 },
          ],
        },
        {
          day: 6,
          title: "Cardio / Core",
          type: "cardio",
          warmup: WU,
          exercises: [
            { name: "Interval run", pattern: "conditioning", notes: "1 min fast / 1 min walk, 30 min total" },
            { name: "Russian Twists", pattern: "core", sets: 3, reps: "20", perSide: true },
            { name: "Leg Raises", pattern: "core", sets: 3, reps: "15" },
            { name: "Bicycle Crunches", pattern: "core", sets: 3, reps: "20", perSide: true },
            { name: "Superman Hold", pattern: "core", sets: 3, durationSec: 30 },
          ],
        },
        { day: 7, title: "Light Active Recovery", type: "recovery", exercises: [], notes: "Yoga, stretching, or a gentle walk." },
      ],
    },
    {
      name: "Phase 2 — Strength & MetCon",
      weekStart: 4,
      weekEnd: 6,
      focus: "Heavier lifting and more complex MetCon.",
      keyChanges: [
        "Upper → Incline Bench 4x8, Pull-Ups 4x8, DB Shoulder Press 4x10, Hammer Curls, Skull Crushers",
        "Lower → Deadlifts 4x6 heavy, Front Squats 4x8, Walking Lunges, RDLs, Seated Calf Raises",
        "MetCon circuit x4: DB Snatch, Burpee Box Jumps, Wall Balls, Battle Ropes → finisher 1000m row",
        "Day 5 → Deadlift-to-Press, Clean & Jerk, Thrusters, Box Jumps",
      ],
    },
    {
      name: "Phase 3 — Peak Performance & Conditioning",
      weekStart: 7,
      weekEnd: 9,
      focus: "Lift heavy, advanced conditioning, explosive power.",
      keyChanges: [
        "Upper/Lower to heavy 5x5 (Bench, Back Squat, Deadlift), Weighted Pull-Ups, Arnold Press",
        "MetCon circuit x5: Barbell Thrusters, Box Jumps x22, Row 250m, Push-Ups, Jump Rope → finisher 1500m row",
        "Day 5 → Snatch 5x5, Push Press 5x5, Deadlift-to-High-Pull, Medicine Ball Slams",
      ],
    },
  ],
  nutrition: {
    note: "Moderate in protein, high in fats, low in carbs, no grains.",
    proteinPct: [30, 35],
    carbsPct: [15, 20],
    fatsPct: [45, 50],
  },
  recovery: ["Mobility, yoga, or a light walk on active-rest days", "Gentle walk / stretching on recovery days"],
};
