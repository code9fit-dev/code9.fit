import type { Program } from "./types";

/**
 * Hybrid Explosive — power and explosive development specialist program
 * Refined from Code9 Fitness HTML program.
 */
export const hybridExplosive: Program = {
  meta: {
    id: "hybrid-explosive",
    title: "Hybrid Explosive",
    weeks: 9,
    level: "advanced",
    goals: ["performance", "muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Hybrid Training",
    personaTags: ["athlete-coach", "explosive-specialist"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 5,
    refined: true,
    purchasable: true,
  },
  focus:
    "Maximize explosive power and velocity development for sports requiring high-speed strength.",
  goalStatement:
    "Develop elite-level explosive power, rate of force development, and speed-strength capabilities.",
  overview:
    "An advanced, power-specialist program for athletes in sports demanding explosive movements (sprinting, jumping, throwing, combat sports). Emphasizes velocity, power, and high-speed strength development.",
  weeklyStructure: [
    { day: 1, focus: "Maximal Strength Base Lower" },
    { day: 2, focus: "Explosive Power Upper" },
    { day: 3, focus: "Rest or Mobility" },
    { day: 4, focus: "Speed-Strength Lower" },
    { day: 5, focus: "Maximal Strength Base Upper" },
    { day: 6, focus: "Power-Endurance Conditioning" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Maximal Strength Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build high-force baseline. Develop strength foundation for subsequent power expression.",
      days: [
        {
          day: 1,
          title: "Maximal Strength Base Lower",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 6,
              reps: "2-4",
            },
            {
              name: "Deadlifts",
              pattern: "hinge",
              sets: 5,
              reps: "3-5",
            },
            {
              name: "Bulgarian Split Squats (Loaded)",
              pattern: "lunge",
              sets: 3,
              reps: "5-6",
              perSide: true,
            },
          ],
        },
        {
          day: 2,
          title: "Explosive Power Upper",
          type: "hiit",
          exercises: [
            {
              name: "Box Push-Ups (Explosive, 3-4 inch height)",
              pattern: "push",
              sets: 6,
              reps: "5-6",
            },
            {
              name: "Explosive Pull-Ups (Add weight for resistance)",
              pattern: "pull",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Medicine Ball Chest Pass",
              pattern: "push",
              sets: 4,
              reps: "8",
            },
            {
              name: "Plyometric Row (explosive upward)",
              pattern: "pull",
              sets: 3,
              reps: "6",
            },
          ],
        },
        {
          day: 3,
          title: "Rest or Mobility",
          type: "recovery",
          exercises: [],
          notes: "Yoga, mobility work, light stretching",
        },
        {
          day: 4,
          title: "Speed-Strength Lower",
          type: "hiit",
          exercises: [
            {
              name: "Box Jumps (Maximum height)",
              pattern: "squat",
              sets: 8,
              reps: "3-4",
              notes: "Full recovery between sets",
            },
            {
              name: "Broad Jumps",
              pattern: "squat",
              sets: 5,
              reps: "3-4",
            },
            {
              name: "Reactive Drop Jumps",
              pattern: "squat",
              sets: 4,
              reps: "5",
            },
            {
              name: "Medicine Ball Slam",
              pattern: "conditioning",
              sets: 3,
              reps: "8",
            },
          ],
        },
        {
          day: 5,
          title: "Maximal Strength Base Upper",
          type: "strength",
          exercises: [
            {
              name: "Barbell Bench Press",
              pattern: "push",
              sets: 6,
              reps: "2-4",
            },
            {
              name: "Weighted Pull-Ups (Heavy)",
              pattern: "pull",
              sets: 5,
              reps: "3-5",
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
          day: 6,
          title: "Power-Endurance Conditioning",
          type: "hiit",
          exercises: [
            {
              name: "Complex Circuit: Burpee + Box Jump + Medicine Ball Slam",
              pattern: "conditioning",
              sets: 5,
              reps: "8 total",
              notes: "45 sec work : 60 sec rest",
            },
            {
              name: "Sprint Work",
              pattern: "conditioning",
              sets: 6,
              durationSec: 30,
              notes: "30 sec sprint : 90 sec recovery",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Explosive Power Development",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Express power at higher velocities. Reduce loads, increase speed. Maintain strength base.",
      progression: [
        "Increase speed/explosive intent while reducing loads",
        "Add complexity to power movements",
        "Increase power-endurance volume",
      ],
      keyChanges: [
        "Strength loads: maintain, focus on speed",
        "Power movements: higher reps, more sets",
        "Add complex movement combinations",
      ],
    },
    {
      name: "Phase 3 — Peak Power Expression & Competition",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Express maximal power and velocity. Sport-specific power application.",
      progression: [
        "Maximum velocity work",
        "Sport-specific power drills",
        "Peak power testing",
      ],
      keyChanges: [
        "Low-load, high-velocity training",
        "Complex training: strength + immediate power",
        "Sport-specific competition simulation",
      ],
    },
  ],
  nutrition: {
    note: "Moderate-high carbs for power work. High protein for muscle development.",
    proteinPct: [25, 35],
    carbsPct: [45, 55],
    fatsPct: [15, 25],
  },
  recovery: [
    "Sleep: 8-9 hours nightly",
    "Complete CNS recovery between hard sessions",
    "Hydration: 120-150 oz daily",
    "Nutrition: slight surplus for power and muscle development",
  ],
};
