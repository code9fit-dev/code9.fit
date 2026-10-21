import type { Program } from "./types";

/**
 * Peachy Progression (5-day) — lower body focus advanced
 * Refined from Code9 Fitness HTML program.
 */
export const peachyProgression5Day: Program = {
  meta: {
    id: "peachy-progression-5day",
    title: "Peachy Progression (5-day)",
    weeks: 9,
    level: "advanced",
    goals: ["muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Glute & Lower Body",
    personaTags: ["glute-specialist", "lower-body-builder"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 5,
    refined: true,
    purchasable: true,
  },
  focus:
    "Elite glute and lower body development with 5 high-frequency training days.",
  goalStatement:
    "Achieve maximum glute and lower body development through high-frequency, volume-based training.",
  overview:
    "An advanced lower body specialization program with 5 training days per week. Provides maximum training frequency and volume for dedicated glute and lower body development. Includes multiple daily focus areas targeting different muscle groups and movement patterns.",
  weeklyStructure: [
    { day: 1, focus: "Glute & Hip Thrust Focus" },
    { day: 2, focus: "Quad & Squat Focus" },
    { day: 3, focus: "Hamstring & Deadlift Focus" },
    { day: 4, focus: "Glute & Accessory" },
    { day: 5, focus: "Full Lower Body & Conditioning" },
    { day: 6, focus: "Rest" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — High-Frequency Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build strength foundation across all movement patterns. Activate glutes. Establish work capacity.",
      days: [
        {
          day: 1,
          title: "Glute & Hip Thrust Focus",
          type: "strength",
          exercises: [
            {
              name: "Barbell Hip Thrusts",
              pattern: "hinge",
              sets: 5,
              reps: "6-8",
            },
            {
              name: "Single-Leg Hip Thrusts",
              pattern: "hinge",
              sets: 3,
              reps: "8-10",
              perSide: true,
            },
            {
              name: "Glute Bridges (Paused)",
              pattern: "hinge",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Cable Kickbacks",
              pattern: "hinge",
              sets: 3,
              reps: "12-15",
              perSide: true,
            },
            {
              name: "Smith Machine Hip Thrusts",
              pattern: "hinge",
              sets: 3,
              reps: "10-12",
            },
          ],
        },
        {
          day: 2,
          title: "Quad & Squat Focus",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Front Squats",
              pattern: "squat",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Leg Press",
              pattern: "squat",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Leg Extensions",
              pattern: "squat",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Hack Squats or Smith Squats",
              pattern: "squat",
              sets: 3,
              reps: "10-12",
            },
          ],
        },
        {
          day: 3,
          title: "Hamstring & Deadlift Focus",
          type: "strength",
          exercises: [
            {
              name: "Deadlifts or Trap Bar Deadlifts",
              pattern: "hinge",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Romanian Deadlifts",
              pattern: "hinge",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Leg Curls",
              pattern: "hinge",
              sets: 3,
              reps: "10-12",
            },
            {
              name: "Nordic Hamstring Curls",
              pattern: "hinge",
              sets: 3,
              reps: "6-8",
            },
            {
              name: "Back Extensions",
              pattern: "hinge",
              sets: 2,
              reps: "10-12",
            },
          ],
        },
        {
          day: 4,
          title: "Glute & Accessory",
          type: "strength",
          exercises: [
            {
              name: "Sumo Deadlifts",
              pattern: "hinge",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Bulgarian Split Squats",
              pattern: "lunge",
              sets: 4,
              reps: "8-10",
              perSide: true,
            },
            {
              name: "Cable Pull-Through",
              pattern: "hinge",
              sets: 3,
              reps: "12-15",
            },
            {
              name: "Abduction Machine",
              pattern: "hinge",
              sets: 3,
              reps: "15",
            },
            {
              name: "Smith Machine Glute Squats",
              pattern: "squat",
              sets: 3,
              reps: "10-12",
            },
          ],
        },
        {
          day: 5,
          title: "Full Lower Body & Conditioning",
          type: "hiit",
          exercises: [
            {
              name: "Lower Body Circuit: Lunges, Step-Ups, Jump Squats",
              pattern: "conditioning",
              sets: 4,
              notes: "10-12 reps each, minimal rest",
            },
            {
              name: "Core & Finisher: 20 min Glute-Focused Circuit",
              pattern: "core",
              notes: "High-rep glute work: 20-30 reps per set",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Volume & Density Increase",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Increase volume significantly. Higher density training. Build muscle aggressively.",
      progression: [
        "Add 1-2 sets to main compounds",
        "Increase weights by 5 lbs",
        "Add higher-rep accessory sets",
      ],
      keyChanges: [
        "Main lifts: add sets and/or reps",
        "Reduce rest periods by 15-30 seconds",
        "Increase accessory rep ranges to 15-20",
      ],
    },
    {
      name: "Phase 3 — Peak Muscle Development & Conditioning",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Maximize muscle development. Peak conditioning. Test strength and performance.",
      progression: [
        "Match or exceed Phase 2 volume",
        "Maximum density training",
        "High-rep glute finishers",
      ],
      keyChanges: [
        "Add drop sets on main lifts",
        "20-30 rep finisher sets daily",
        "Metabolic stress focus",
        "Week 8: slight deload (80% volume)",
      ],
    },
  ],
  nutrition: {
    note: "Very high protein and carbs. Moderate surplus for muscle building.",
    proteinPct: [30, 40],
    carbsPct: [45, 55],
    fatsPct: [15, 20],
  },
  recovery: [
    "Sleep: 8-9 hours nightly",
    "Daily glute-specific mobility work",
    "Hydration: 150-180 oz daily",
    "Caloric surplus: 500-750 kcal daily",
    "Consider massage or physical therapy",
  ],
};
