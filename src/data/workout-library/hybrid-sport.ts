import type { Program } from "./types";

/**
 * Hybrid Sport — advanced sport-specific hybrid training
 * Refined from Code9 Fitness HTML program.
 */
export const hybridSport: Program = {
  meta: {
    id: "hybrid-sport",
    title: "Hybrid Sport",
    weeks: 9,
    level: "advanced",
    goals: ["performance", "muscle-gain"],
    equipment: "full-gym",
    primaryCategory: "Hybrid Training",
    personaTags: ["athlete-coach", "sport-specific-trainer"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 6,
    refined: true,
    purchasable: true,
  },
  focus:
    "Advanced sport-specific hybrid training integrating strength, conditioning, and sport-specific skills.",
  goalStatement:
    "Achieve peak sport-specific performance through integrated strength, conditioning, and tactical training.",
  overview:
    "An advanced program for competitive team and individual sport athletes. Balances strength and power with high-intensity sport-specific conditioning and skills. Requires existing team practices to supplement.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Strength" },
    { day: 2, focus: "Upper Body Strength & Skills" },
    { day: 3, focus: "High-Intensity Sport Practice" },
    { day: 4, focus: "Power & Speed Development" },
    { day: 5, focus: "Upper Body & Core" },
    { day: 6, focus: "Sport-Specific Conditioning" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Strength & Technical Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build strength foundation. Master movement patterns. Establish baseline power and speed.",
      days: [
        {
          day: 1,
          title: "Lower Body Strength",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Deadlifts",
              pattern: "hinge",
              sets: 4,
              reps: "5-6",
            },
            {
              name: "Single-Leg Work (Bulgarian Split Squat or Step-Up)",
              pattern: "lunge",
              sets: 3,
              reps: "8-10",
              perSide: true,
            },
            {
              name: "Leg Curl or Hamstring Focus",
              pattern: "hinge",
              sets: 3,
              reps: "10-12",
            },
          ],
        },
        {
          day: 2,
          title: "Upper Body Strength & Skills",
          type: "strength",
          exercises: [
            {
              name: "Barbell Bench Press",
              pattern: "push",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Barbell Rows",
              pattern: "pull",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Weighted Pull-Ups",
              pattern: "pull",
              sets: 3,
              reps: "6-8",
            },
            {
              name: "Sport-Specific Technical Work",
              pattern: "conditioning",
              notes: "Agility ladder, coordination drills",
            },
          ],
        },
        {
          day: 3,
          title: "High-Intensity Sport Practice",
          type: "hiit",
          exercises: [
            {
              name: "Sport-Specific Game Simulation",
              pattern: "conditioning",
              durationSec: 1800,
              notes: "Full intensity sport-specific practice",
            },
          ],
        },
        {
          day: 4,
          title: "Power & Speed Development",
          type: "hiit",
          exercises: [
            {
              name: "Box Jumps",
              pattern: "squat",
              sets: 5,
              reps: "5-6",
            },
            {
              name: "Sprint Work (10-30 meters)",
              pattern: "conditioning",
              sets: 6,
              durationSec: 20,
            },
            {
              name: "Lateral Movement Work",
              pattern: "conditioning",
              sets: 4,
              reps: "10",
              perSide: true,
            },
            {
              name: "Agility Work (T-drill, shuttle run)",
              pattern: "conditioning",
              sets: 3,
              notes: "Sport-specific patterns",
            },
          ],
        },
        {
          day: 5,
          title: "Upper Body & Core",
          type: "strength",
          exercises: [
            {
              name: "Dumbbell Bench Press",
              pattern: "push",
              sets: 4,
              reps: "8-10",
            },
            {
              name: "Weighted Chin-Ups",
              pattern: "pull",
              sets: 4,
              reps: "6-8",
            },
            {
              name: "Shoulder Press (Dumbbell)",
              pattern: "push",
              sets: 3,
              reps: "8-10",
            },
            {
              name: "Cable Woodchops",
              pattern: "core",
              sets: 3,
              reps: "10",
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
              name: "EMOM 30 min: Sport-Specific Movement Pattern",
              pattern: "conditioning",
              durationSec: 1800,
              notes: "Alternating high and moderate intensity",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Performance Enhancement",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Increase strength loads, power output, and sport-specific intensity. Build work capacity.",
      progression: [
        "Increase strength loads by 5-10 lbs",
        "Add power-specific sets",
        "Increase sport-specific intensity",
      ],
      keyChanges: [
        "Main lifts: heavier loads, focus on speed",
        "Power: more sets, higher intensity",
        "Sport-specific: game-speed work",
      ],
    },
    {
      name: "Phase 3 — Competition Preparation",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Peak all athletic qualities. Maximize sport-specific performance. Competition preparation.",
      progression: [
        "Test maxes or peak volume",
        "Competition-paced sport training",
        "Peak work capacity",
      ],
      keyChanges: [
        "Week 7: peak training volume",
        "Week 8: deload 40-50%",
        "Week 9: competition week taper",
      ],
    },
  ],
  nutrition: {
    note: "Balanced macros for strength and conditioning. Higher carbs for high-frequency training.",
    proteinPct: [25, 35],
    carbsPct: [48, 58],
    fatsPct: [15, 20],
  },
  recovery: [
    "Sleep: 8-9 hours nightly",
    "Sport-specific recovery modalities",
    "Hydration: 150-180 oz daily",
    "Nutrition: slight surplus for performance development",
  ],
};
