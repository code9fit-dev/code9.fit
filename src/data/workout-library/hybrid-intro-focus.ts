import type { Program } from "./types";

const WU = "10 min light cardio + dynamic stretches";

/** Refined from ImpactShredz "Hybrid Intro Focus". */
export const hybridIntroFocus: Program = {
  meta: {
    id: "hybrid-intro-focus",
    title: "Hybrid Intro Focus",
    weeks: 9,
    level: "beginner",
    goals: ["performance"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["sports-performance-optimizer"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Strength (3 days), endurance (2 days), conditioning (1 day), daily mobility.",
  goalStatement: "New goals every 3 weeks — get accustomed to hybrid volume.",
  overview:
    "An introductory hybrid program for those new to hybrid fitness — builds strength and endurance together while adapting to the volume. Sleep 7-9 hours, daily mobility, and recovery work (massage, foam rolling, stretching).",
  weeklyStructure: [
    { day: 1, focus: "Strength (Lower Body)" },
    { day: 2, focus: "Endurance (Run/Cycle)" },
    { day: 3, focus: "Strength (Upper Body)" },
    { day: 4, focus: "Rest or Active Recovery" },
    { day: 5, focus: "Strength (Full Body)" },
    { day: 6, focus: "Endurance (Intervals)" },
    { day: 7, focus: "Rest or Active Recovery" },
  ],
  phases: [
    {
      name: "Phase 1 — Hybrid Base Builder",
      weekStart: 1,
      weekEnd: 3,
      focus: "Build a solid base in strength and endurance.",
      days: [
        {
          day: 1,
          title: "Strength (Lower Body)",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Back Squats", pattern: "squat", sets: 4, reps: "6-8" },
            { name: "Deadlifts", pattern: "hinge", sets: 3, reps: "6-8" },
            { name: "Lunges", pattern: "lunge", sets: 3, reps: "10", perSide: true },
            { name: "Leg Press", pattern: "squat", sets: 3, reps: "10-12" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 45 },
          ],
        },
        {
          day: 2,
          title: "Endurance",
          type: "cardio",
          exercises: [
            { name: "Run or cycle", pattern: "conditioning", notes: "Run 30-45 min OR cycle 45-60 min at a moderate pace" },
          ],
        },
        {
          day: 3,
          title: "Strength (Upper Body)",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Bench Press", pattern: "push", sets: 4, reps: "6-8" },
            { name: "Bent-Over Rows", pattern: "pull", sets: 3, reps: "6-8" },
            { name: "Overhead Press", pattern: "push", sets: 3, reps: "8-10" },
            { name: "Pull-Ups (or assisted)", pattern: "pull", sets: 3, reps: "8-10" },
            { name: "Hanging Leg Raises", pattern: "core", sets: 3, reps: "10-12" },
          ],
        },
        { day: 4, title: "Rest / Active Recovery", type: "recovery", exercises: [], notes: "Light cardio + mobility (15-20 min)." },
        {
          day: 5,
          title: "Strength (Full Body)",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlifts", pattern: "hinge", sets: 4, reps: "5" },
            { name: "Push Press", pattern: "push", sets: 3, reps: "6" },
            { name: "Front Squats", pattern: "squat", sets: 3, reps: "8" },
            { name: "Barbell Rows", pattern: "pull", sets: 3, reps: "8" },
            { name: "Russian Twists", pattern: "core", sets: 3, reps: "20" },
          ],
        },
        {
          day: 6,
          title: "Endurance — Intervals",
          type: "hiit",
          exercises: [
            { name: "400m intervals", pattern: "conditioning", notes: "5 min warm-up; 4x400m sprints w/ 2 min rest; 5 min cool-down" },
          ],
        },
        { day: 7, title: "Rest / Active Recovery", type: "recovery", exercises: [], notes: "Light cardio or mobility (yoga, foam rolling)." },
      ],
    },
    {
      name: "Phase 2 — Hybrid Strength & Conditioning Builder",
      weekStart: 4,
      weekEnd: 6,
      focus: "Increase intensity and volume; introduce complex movements.",
      keyChanges: [
        "Lower → Front Squats 4x5, RDLs 3x6-8, Bulgarian Split Squats, Calf Raises, Ab Wheel Rollouts",
        "Upper → Incline Bench 4x5-6, Weighted Pull-Ups 3x6, DB Shoulder Press, Dips",
        "Day 4 Conditioning circuit x3-4: 10 box jumps / 10 KB swings / 10 burpees / 200m run",
        "Full Body → Deadlifts 4x4, Overhead Squats, Power Cleans, T-Bar Rows; tempo runs",
      ],
    },
    {
      name: "Phase 3 — Hybrid Peaking Performance",
      weekStart: 7,
      weekEnd: 9,
      focus: "Peak performance, prepping for an event or challenge.",
      keyChanges: [
        "Lower → Back Squats & Deadlifts 4x3-5, Bulgarian Split Squats 3x6",
        "Upper → Bench 4x3-5, Weighted Pull-Ups 4x5, Push Press 4x5, Medicine Ball Slams",
        "High-intensity conditioning circuit x4: 10 thrusters / 15 KB swings / 10 burpees / 100m sprint",
        "Long runs 60-75 min; 5x400m interval sprints",
      ],
    },
  ],
  nutrition: {
    note: "Balanced protein, carbs, and healthy fats; hydrate well. Client-focused targets.",
    proteinPct: [30, 35],
    carbsPct: [35, 45],
    fatsPct: [20, 30],
  },
  recovery: ["7-9 hours sleep", "Daily mobility to prevent injury", "Massage, foam rolling, stretching"],
};
