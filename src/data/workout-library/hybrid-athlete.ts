import type { Program } from "./types";

/**
 * Hybrid Athlete — advanced multi-sport athletic development
 * Refined from Code9 Fitness HTML program.
 */
export const hybridAthlete: Program = {
  meta: {
    id: "hybrid-athlete",
    title: "Hybrid Athlete",
    weeks: 9,
    level: "advanced",
    goals: ["performance", "muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Hybrid Training",
    personaTags: ["athlete-coach", "advanced-athlete"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 6,
    refined: true,
    purchasable: true,
  },
  focus:
    "Advanced athletic development for competitive multi-sport athletes requiring diverse physical qualities.",
  goalStatement:
    "Develop elite-level athletic capabilities combining maximal strength, explosive power, speed, and sport-specific endurance.",
  overview:
    "An advanced program for competitive athletes. Integrates strength, power, speed, agility, and sport-specific conditioning. Requires advanced training experience and high commitment.",
  weeklyStructure: [
    { day: 1, focus: "Maximal Strength Lower" },
    { day: 2, focus: "Explosive Power Upper" },
    { day: 3, focus: "Speed & Agility" },
    { day: 4, focus: "Maximal Strength Upper" },
    { day: 5, focus: "Explosive Power Lower" },
    { day: 6, focus: "Sport-Specific Conditioning" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Strength Foundation & Movement Mastery",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build maximal strength foundation. Master all movement patterns under load. Develop baseline power.",
      days: [
        {
          day: 1,
          title: "Maximal Strength Lower",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats (Competition Depth)",
              pattern: "squat",
              sets: 6,
              reps: "2-3",
            },
            {
              name: "Deadlifts",
              pattern: "hinge",
              sets: 6,
              reps: "2-3",
            },
            {
              name: "Leg Press",
              pattern: "squat",
              sets: 3,
              reps: "8-10",
            },
          ],
        },
        {
          day: 2,
          title: "Explosive Power Upper",
          type: "hiit",
          exercises: [
            {
              name: "Box Push-Ups",
              pattern: "push",
              sets: 5,
              reps: "5",
            },
            {
              name: "Medicine Ball Slam",
              pattern: "push",
              sets: 4,
              reps: "6",
            },
            {
              name: "Explosive Dumbbell Row",
              pattern: "pull",
              sets: 4,
              reps: "6",
            },
            {
              name: "Plyometric Push-Ups",
              pattern: "push",
              sets: 3,
              reps: "5",
            },
          ],
        },
        {
          day: 3,
          title: "Speed & Agility",
          type: "cardio",
          exercises: [
            {
              name: "Sprint Work: 10 x 40 meters",
              pattern: "conditioning",
              notes: "Full recovery between sprints",
            },
            {
              name: "Agility Ladder Drills",
              pattern: "conditioning",
              sets: 4,
              durationSec: 60,
            },
            {
              name: "Lateral Movement Drills",
              pattern: "conditioning",
              sets: 3,
              reps: "10",
              perSide: true,
            },
          ],
        },
        {
          day: 4,
          title: "Maximal Strength Upper",
          type: "strength",
          exercises: [
            {
              name: "Barbell Bench Press",
              pattern: "push",
              sets: 6,
              reps: "2-3",
            },
            {
              name: "Weighted Pull-Ups",
              pattern: "pull",
              sets: 6,
              reps: "2-3",
            },
            {
              name: "Weighted Dips",
              pattern: "push",
              sets: 4,
              reps: "5-6",
            },
          ],
        },
        {
          day: 5,
          title: "Explosive Power Lower",
          type: "hiit",
          exercises: [
            {
              name: "Box Jumps",
              pattern: "squat",
              sets: 6,
              reps: "3-4",
            },
            {
              name: "Broad Jump",
              pattern: "squat",
              sets: 4,
              reps: "5",
            },
            {
              name: "Bounding",
              pattern: "lunge",
              sets: 4,
              reps: "8",
            },
            {
              name: "Single-Leg Hop",
              pattern: "lunge",
              sets: 3,
              reps: "6",
              perSide: true,
            },
          ],
        },
        {
          day: 6,
          title: "Sport-Specific Conditioning",
          type: "hiit",
          exercises: [
            {
              name: "Sport-Specific High-Intensity Work",
              pattern: "conditioning",
              durationSec: 2400,
              notes: "40 minutes game-paced with varying intensity",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Power Refinement & Sport Integration",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Refine power expression. Integrate multiple qualities in complex movements. Build sport-specific endurance.",
      progression: [
        "Increase power output while maintaining strength",
        "Add complex combinations",
        "Increase competition-paced work",
      ],
      keyChanges: [
        "Complex training: strength + power combinations",
        "Sport-specific power demands",
        "Increased competition simulation",
      ],
    },
    {
      name: "Phase 3 — Elite Performance & Competition Ready",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Peak all qualities for competition. Express maximal power and sport-specific capabilities.",
      progression: [
        "Test 1-rep maxes",
        "Maximum velocity power work",
        "Competition-preparation phase",
      ],
      keyChanges: [
        "Deload week 8",
        "Competition-simulation intensity and volume",
        "Sport-specific tactical work",
      ],
    },
  ],
  nutrition: {
    note: "High carbs for multiple daily sessions. High protein for recovery.",
    proteinPct: [25, 35],
    carbsPct: [55, 65],
    fatsPct: [15, 20],
  },
  recovery: [
    "Sleep: 9+ hours nightly",
    "Multiple recovery modalities daily",
    "Hydration: 180-200+ oz daily",
    "Nutrition: caloric surplus for performance and recovery",
  ],
};
