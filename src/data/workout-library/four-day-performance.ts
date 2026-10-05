import type { Program } from "./types";

const WU = "10 min mobility drills + dynamic stretches";

/** C9F 4-day/week, 9-week progressive performance program. */
export const fourDayPerformance: Program = {
  meta: {
    id: "four-day-performance",
    title: "4-Day Performance (9-Week)",
    weeks: 9,
    level: "advanced",
    goals: ["performance"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["sports-performance-optimizer", "gym-program-architect"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
    daysPerWeek: 4,
  },
  focus: "Lower power, upper power, full-body strength, and dedicated conditioning.",
  goalStatement: "Develop strength, power, and work capacity for sport over 9 weeks.",
  overview:
    "A hybrid 4-day plan: two power-focused strength days, a full-body strength day, and a conditioning/speed day. Progresses from base strength to peak power and output.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Power" },
    { day: 2, focus: "Upper Body Power" },
    { day: 3, focus: "Rest / mobility" },
    { day: 4, focus: "Full Body Strength" },
    { day: 5, focus: "Conditioning / Speed" },
    { day: 6, focus: "Active recovery" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Strength Base (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Build the strength platform power is expressed from.",
      days: [
        {
          day: 1,
          title: "Lower Body Power",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Back Squat", pattern: "squat", sets: 4, reps: "5" },
            { name: "Power Clean", pattern: "hinge", sets: 4, reps: "3" },
            { name: "Walking Lunge", pattern: "lunge", sets: 3, reps: "10", perSide: true },
            { name: "Box Jumps", pattern: "conditioning", sets: 4, reps: "5" },
            { name: "Hanging Leg Raises", pattern: "core", sets: 3, reps: "12" },
          ],
        },
        {
          day: 2,
          title: "Upper Body Power",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Bench Press", pattern: "push", sets: 4, reps: "5" },
            { name: "Weighted Pull-Ups", pattern: "pull", sets: 4, reps: "5" },
            { name: "Push Press", pattern: "push", sets: 4, reps: "5" },
            { name: "Barbell Row", pattern: "pull", sets: 3, reps: "8" },
            { name: "Medicine Ball Slams", pattern: "conditioning", sets: 3, reps: "10" },
          ],
        },
        {
          day: 4,
          title: "Full Body Strength",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlift", pattern: "hinge", sets: 4, reps: "4" },
            { name: "Front Squat", pattern: "squat", sets: 3, reps: "6" },
            { name: "Overhead Press", pattern: "push", sets: 3, reps: "6" },
            { name: "T-Bar Row", pattern: "pull", sets: 3, reps: "8" },
            { name: "Cable Woodchoppers", pattern: "core", sets: 3, reps: "10", perSide: true },
          ],
        },
        {
          day: 5,
          title: "Conditioning / Speed",
          type: "hiit",
          warmup: WU,
          exercises: [
            { name: "Sprint intervals", pattern: "conditioning", notes: "6-8x 100-200m at 90% w/ full recovery" },
            { name: "Farmer's Walk", pattern: "carry", sets: 3, reps: "40m" },
            { name: "Sled Push", pattern: "carry", sets: 3, reps: "30m" },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Power Development (Weeks 4-6)",
      weekStart: 4,
      weekEnd: 6,
      focus: "Convert strength to power; add speed under control.",
      keyChanges: [
        "Reduce main-lift reps, add load (e.g. 5→3-4) while keeping bar speed high",
        "Add plyometrics/jumps and heavier throws",
        "Interval distances/loads progress; keep full recovery for quality",
      ],
    },
    {
      name: "Phase 3 — Peak Output (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Peak power, speed, and work capacity.",
      keyChanges: [
        "Heavy triples/doubles on the main lifts (80-90%)",
        "Contrast sets (heavy lift → explosive movement)",
        "Sport-specific conditioning circuits; deload if needed in week 9",
      ],
    },
  ],
  nutrition: {
    note: "Fuel performance — carbs around training, adequate protein.",
    proteinPct: [30, 35],
    carbsPct: [40, 50],
    fatsPct: [20, 25],
  },
  recovery: ["Never train power fatigued — quality over grind", "Mobility on off days"],
};
