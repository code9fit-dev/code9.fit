import type { Program } from "./types";

const WU = "10 min mobility drills + dynamic stretches";

/** C9F 3-day/week performance program — strength, power, and conditioning. */
export const threeDayPerformance: Program = {
  meta: {
    id: "three-day-performance",
    title: "3-Day Performance",
    weeks: 9,
    level: "intermediate",
    goals: ["performance"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["sports-performance-optimizer", "gym-program-architect"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
    daysPerWeek: 3,
  },
  focus: "Strength, explosive power, and conditioning in three athletic sessions.",
  goalStatement: "Build speed, power, and work capacity for sport on a 3-day week.",
  overview:
    "A hybrid-lite performance plan: a lower-power day, an upper-power day, and a full-body/conditioning day. Lift explosively, keep quality high, and progress across three phases over 9 weeks.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Power" },
    { day: 2, focus: "Rest / mobility" },
    { day: 3, focus: "Upper Body Power + conditioning" },
    { day: 4, focus: "Rest" },
    { day: 5, focus: "Full Body + conditioning" },
    { day: 6, focus: "Active recovery" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Strength Base (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Build the strength platform; move well and fast.",
      days: [
        {
          day: 1,
          title: "Lower Body Power",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Back Squat", pattern: "squat", sets: 4, reps: "5", notes: "Controlled down, fast up" },
            { name: "Power Clean", pattern: "hinge", sets: 4, reps: "3" },
            { name: "Walking Lunge", pattern: "lunge", sets: 3, reps: "10", perSide: true },
            { name: "Box Jumps", pattern: "conditioning", sets: 4, reps: "5" },
            { name: "Hanging Leg Raises", pattern: "core", sets: 3, reps: "12" },
          ],
        },
        {
          day: 3,
          title: "Upper Body Power + conditioning",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Bench Press", pattern: "push", sets: 4, reps: "5" },
            { name: "Weighted Pull-Ups", pattern: "pull", sets: 4, reps: "5" },
            { name: "Push Press", pattern: "push", sets: 4, reps: "5" },
            { name: "Barbell Row", pattern: "pull", sets: 3, reps: "8" },
            { name: "Finisher — 5 rounds", pattern: "conditioning", notes: "10 burpees / 200m run" },
          ],
        },
        {
          day: 5,
          title: "Full Body + conditioning",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlift", pattern: "hinge", sets: 4, reps: "4" },
            { name: "Dumbbell Snatch", pattern: "hinge", sets: 4, reps: "5", perSide: true },
            { name: "Farmer's Walk", pattern: "carry", sets: 3, reps: "40m" },
            { name: "Sled Push", pattern: "carry", sets: 3, reps: "30m" },
            { name: "Cable Woodchoppers", pattern: "core", sets: 3, reps: "10", perSide: true },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Power Development (Weeks 4-6)",
      weekStart: 4,
      weekEnd: 6,
      focus: "Convert strength to power.",
      keyChanges: [
        "Add load to the power lifts while keeping bar speed high",
        "Add plyometrics / jumps",
        "Progress carries and conditioning loads",
      ],
    },
    {
      name: "Phase 3 — Peak Output (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Peak power and output.",
      keyChanges: [
        "Heavy triples/doubles (80-90%) on the main lifts",
        "Contrast sets (heavy lift → explosive movement)",
        "Sport-specific conditioning; deload in week 9 if needed",
      ],
    },
  ],
  nutrition: {
    note: "Eat to fuel performance — enough carbs around training, adequate protein.",
    proteinPct: [30, 35],
    carbsPct: [40, 50],
    fatsPct: [20, 25],
  },
  recovery: ["Mobility on off days", "Don't train power fatigued — quality over grind"],
};
