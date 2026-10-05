import type { Program } from "./types";

const WU = "10 min mobility drills + dynamic stretches";

/** Refined from ImpactShredz "Hybrid Focus (INTRMED)". */
export const hybridFocusIntermediate: Program = {
  meta: {
    id: "hybrid-focus-intermediate",
    title: "Hybrid Focus (Intermediate)",
    weeks: 9,
    level: "intermediate",
    goals: ["performance", "recomposition"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["sports-performance-optimizer", "gym-program-architect"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Strength (3 days), endurance (3 days), integrated conditioning; recovery & mobility critical.",
  goalStatement:
    "Build on a strength + endurance base with higher volume, intensity, and more complex movements.",
  overview:
    "An intermediate hybrid-athlete program assuming an existing base in both strength and endurance. Integrates compound lifts, threshold/interval/LSD endurance, and functional conditioning (Hyrox-style). Track strength and endurance benchmarks across the 9 weeks.",
  weeklyStructure: [
    { day: 1, focus: "Strength (Lower Body) + Conditioning" },
    { day: 2, focus: "Endurance (Threshold)" },
    { day: 3, focus: "Strength (Upper Body)" },
    { day: 4, focus: "Endurance (Intervals)" },
    { day: 5, focus: "Strength (Full Body) + Conditioning" },
    { day: 6, focus: "Endurance (Long Slow Distance)" },
    { day: 7, focus: "Rest or Active Recovery" },
  ],
  phases: [
    {
      name: "Phase 1 — Strength & Volume Build",
      weekStart: 1,
      weekEnd: 3,
      focus: "Increase volume and intensity with compound lifts; build aerobic endurance.",
      days: [
        {
          day: 1,
          title: "Strength (Lower Body) + Conditioning",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Back Squats", pattern: "squat", sets: 4, reps: "6", notes: "70-80% 1RM" },
            { name: "Romanian Deadlifts", pattern: "hinge", sets: 4, reps: "9-11" },
            { name: "Walking Lunges", pattern: "lunge", sets: 3, reps: "11", perSide: true },
            { name: "Step-Ups with Dumbbell", pattern: "lunge", sets: 3, reps: "11", perSide: true },
            { name: "Sled Push or Farmer's Walk", pattern: "carry", sets: 3, reps: "50m" },
            { name: "Hanging Leg Raises", pattern: "core", sets: 3, reps: "15" },
          ],
        },
        {
          day: 2,
          title: "Endurance — Threshold",
          type: "cardio",
          exercises: [
            { name: "Threshold run", pattern: "conditioning", notes: "Jog 5 min; run 20 min at threshold (80-85%); jog 5 min. Alt: 45 min cycle" },
          ],
        },
        {
          day: 3,
          title: "Strength (Upper Body)",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Bench Press", pattern: "push", sets: 4, reps: "6", notes: "70-80% 1RM" },
            { name: "Weighted Pull-Ups", pattern: "pull", sets: 4, reps: "6" },
            { name: "Overhead Press", pattern: "push", sets: 4, reps: "9-11" },
            { name: "Barbell Rows", pattern: "pull", sets: 4, reps: "9-11" },
            { name: "Side Plank", pattern: "core", sets: 3, durationSec: 30, perSide: true },
          ],
        },
        {
          day: 4,
          title: "Endurance — Intervals",
          type: "hiit",
          exercises: [
            { name: "800m intervals", pattern: "conditioning", notes: "5x800m at 90% w/ 2-3 min rest; 5 min cool-down (~35-40 min). Alt: 8x400m" },
          ],
        },
        {
          day: 5,
          title: "Strength (Full Body) + Conditioning",
          type: "strength",
          warmup: WU,
          exercises: [
            { name: "Deadlifts", pattern: "hinge", sets: 5, reps: "3-6", notes: "75-85% 1RM" },
            { name: "Military Press", pattern: "push", sets: 4, reps: "6" },
            { name: "Front Squats", pattern: "squat", sets: 4, reps: "9-11" },
            { name: "T-Bar Rows", pattern: "pull", sets: 4, reps: "9-11" },
            { name: "AMRAP finisher (10 min)", pattern: "conditioning", notes: "10 burpees / 10 KB swings / 100m run" },
          ],
        },
        {
          day: 6,
          title: "Endurance — Long Slow Distance",
          type: "cardio",
          exercises: [
            { name: "LSD run", pattern: "conditioning", notes: "60-75 min conversational (60-70%). Alt: 90 min cycle or 45-60 min swim" },
          ],
        },
        { day: 7, title: "Rest / Active Recovery", type: "recovery", exercises: [], notes: "Light mobility, stretching, or yoga." },
      ],
    },
    {
      name: "Phase 2 — Intensity & Skill Development",
      weekStart: 4,
      weekEnd: 6,
      focus: "Increase intensity, reduce reps, work functional power and endurance.",
      keyChanges: [
        "Lower → Back Squats 5x5 (75-85%), Deadlifts 4x5, Bulgarian Split Squats; 3x50m sprints",
        "Upper → Weighted Dips 4x6, Pull-Ups 4x8, Push Press 4x6; functional 5 rounds (box jumps / KB swings / row)",
        "Full Body → Power Cleans 5x3, Front Squats 4x5, Deadlifts 4x4",
        "Endurance → tempo runs (25 min @ 85%), 5x1000m intervals, 75-90 min LSD",
      ],
    },
    {
      name: "Phase 3 — Peak Performance & Power",
      weekStart: 7,
      weekEnd: 9,
      focus: "Maximise power, speed, and endurance for competition/event.",
      keyChanges: [
        "Lower → Back Squats & Deadlifts 4x4 (80-85%), Jump Squats, Farmer's Walk",
        "Upper → Bench 5x3 (85%), Weighted Pull-Ups 4x4-6, Push Press; functional 5 rounds (DB snatch / burpees / sprint)",
        "Full Body → Deadlifts 4x3, Power Cleans 5x3, Front Squats; 5-round conditioning (box jumps / KB swings / 200m sprint)",
        "Endurance → mile repeats @ 85-90%, 6x800m, 90-min zone-2 runs",
      ],
    },
  ],
  nutrition: {
    note: "Fuel with adequate protein, carbs, and fats to support recovery and performance.",
    proteinPct: [30, 35],
    carbsPct: [40, 45],
    fatsPct: [20, 25],
  },
  recovery: ["Prioritise sleep, mobility, and hydration", "Track strength + endurance benchmarks over 9 weeks"],
};
