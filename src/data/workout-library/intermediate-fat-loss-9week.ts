import type { Program } from "./types";

/**
 * Refined from `11_Intermediate_Fat_Loss_9Week` (ImpactShredz) into the canonical
 * schema. Reference example for the consistency pass.
 */
export const intermediateFatLoss9Week: Program = {
  meta: {
    id: "intermediate-fat-loss-9week",
    title: "Intermediate Fat Loss — 9-Week Progressive Program",
    weeks: 9,
    level: "intermediate",
    goals: ["fat-loss", "recomposition"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["fat-loss-architect", "body-recomposition-engineer"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Progressive overload, balanced nutrition, and adequate recovery.",
  goalStatement: "Fat loss, muscle gain, and improved overall fitness.",
  overview:
    "A 9-week intermediate program for those with some training experience looking to lose fat while maintaining or building muscle. Combines strength training, cardio, and HIIT for optimal fat loss.",
  weeklyStructure: [
    { day: 1, focus: "Full-Body Strength Training" },
    { day: 2, focus: "High-Intensity Interval Training (HIIT)" },
    { day: 3, focus: "Active Recovery (Walking, Yoga)" },
    { day: 4, focus: "Upper Body Strength Training" },
    { day: 5, focus: "Lower Body Strength Training" },
    { day: 6, focus: "Cardio (Steady State or HIIT)" },
    { day: 7, focus: "Rest or Light Active Recovery" },
  ],
  phases: [
    {
      name: "Phase 1 — Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus: "Build a base level of strength and cardiovascular fitness.",
      days: [
        {
          day: 1,
          title: "Full-Body Strength Training",
          type: "strength",
          warmup: "10 min treadmill, incline 10%, speed 4 km/hr",
          exercises: [
            { name: "Squats", pattern: "squat", sets: 3, reps: "11" },
            {
              name: "Push-Ups",
              pattern: "push",
              sets: 3,
              reps: "11",
              notes: "Modify as needed",
            },
            { name: "Bent-Over Rows", pattern: "pull", sets: 3, reps: "11" },
            { name: "Plank", pattern: "core", sets: 3, durationSec: 30 },
          ],
        },
        {
          day: 2,
          title: "Cardio / HIIT",
          type: "hiit",
          warmup: "10 min treadmill, incline 10%, speed 4 km/hr",
          exercises: [
            {
              name: "Assault bike intervals",
              pattern: "conditioning",
              sets: 8,
              reps: "20 sec all-out",
              notes: "10 sec rest between rounds; 8–10 rounds total",
            },
          ],
          cooldown: "5 min light cardio",
        },
        {
          day: 3,
          title: "Active Recovery",
          type: "recovery",
          exercises: [],
          notes: "Walking and/or yoga.",
        },
        {
          day: 4,
          title: "Upper Body Strength",
          type: "strength",
          exercises: [
            { name: "Push-Ups", pattern: "push", sets: 3, reps: "11" },
            { name: "Bent-Over Rows", pattern: "pull", sets: 3, reps: "11" },
            { name: "Shoulder Presses", pattern: "push", sets: 3, reps: "11" },
            { name: "Lateral Raises", pattern: "push", sets: 3, reps: "12" },
          ],
        },
        {
          day: 5,
          title: "Lower Body Strength",
          type: "strength",
          exercises: [
            { name: "Squats", pattern: "squat", sets: 3, reps: "11" },
            {
              name: "Lunges",
              pattern: "lunge",
              sets: 3,
              reps: "11",
              perSide: true,
            },
            { name: "Glute Bridges", pattern: "hinge", sets: 3, reps: "12" },
            { name: "Calf Raises", pattern: "core", sets: 3, reps: "12" },
          ],
        },
        {
          day: 6,
          title: "Cardio",
          type: "cardio",
          exercises: [
            {
              name: "Steady-state cardio",
              pattern: "conditioning",
              notes:
                "30–40 min at moderate intensity, or 3–4 rounds of a HIIT circuit.",
            },
          ],
        },
        {
          day: 7,
          title: "Rest",
          type: "rest",
          exercises: [],
          notes: "Rest or light active recovery.",
        },
      ],
    },
    {
      name: "Phase 2 — Strength & Intensity Build",
      weekStart: 4,
      weekEnd: 6,
      focus: "Increase weight and intensity while maintaining form.",
      progression: [
        "Increase weight by 5–10%",
        "Increase reps to 12–13 per set",
        "Reduce rest periods to 60 seconds",
        "Add one additional set to main lifts (4 sets instead of 3)",
      ],
    },
    {
      name: "Phase 3 — Peak Performance & Conditioning",
      weekStart: 7,
      weekEnd: 9,
      focus: "Maximize fat loss with high intensity and volume.",
      keyChanges: [
        "Add drop sets or supersets for increased intensity",
        "Increase HIIT rounds to 10–12",
        "Add plyometrics (box jumps, burpees)",
        "Reduce rest periods to 45 seconds",
      ],
    },
  ],
  nutrition: {
    note: "Maintain a moderate caloric deficit while preserving muscle.",
    proteinPct: [30, 35],
    carbsPct: [35, 40],
    fatsPct: [25, 30],
  },
  recovery: [
    "Sleep: 7.5–9 hours nightly",
    "Active recovery on rest days",
    "Stretching: 10–15 minutes post-workout",
    "Hydration: 3+ litres daily",
  ],
};
