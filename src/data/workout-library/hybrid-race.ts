import type { Program } from "./types";

/**
 * Hybrid Race — endurance-focused hybrid for distance athletes
 * Refined from Code9 Fitness HTML program.
 */
export const hybridRace: Program = {
  meta: {
    id: "hybrid-race",
    title: "Hybrid Race",
    weeks: 9,
    level: "intermediate",
    goals: ["performance", "general-fitness"],
    equipment: "full-gym",
    primaryCategory: "Hybrid Training",
    personaTags: ["athlete-coach", "endurance-athlete"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    daysPerWeek: 5,
    refined: true,
    purchasable: true,
  },
  focus:
    "Combine strength and endurance for competitive distance athletes requiring balanced physical development.",
  goalStatement:
    "Maximize endurance capacity while maintaining strength and power to improve race performance.",
  overview:
    "A hybrid program designed for competitive endurance athletes (runners, cyclists, triathletes). Balances strength training with high-volume endurance work for optimal race preparation.",
  weeklyStructure: [
    { day: 1, focus: "Strength Maintenance" },
    { day: 2, focus: "Long Endurance Session" },
    { day: 3, focus: "Rest or Light Activity" },
    { day: 4, focus: "Speed & Power Work" },
    { day: 5, focus: "Threshold/Tempo Work" },
    { day: 6, focus: "Recovery Endurance" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Base Building",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Build aerobic base. Maintain baseline strength. Develop endurance foundation.",
      days: [
        {
          day: 1,
          title: "Strength Maintenance",
          type: "strength",
          exercises: [
            {
              name: "Barbell Back Squats",
              pattern: "squat",
              sets: 3,
              reps: "6-8",
            },
            {
              name: "Deadlifts",
              pattern: "hinge",
              sets: 3,
              reps: "6-8",
            },
            {
              name: "Bench Press",
              pattern: "push",
              sets: 3,
              reps: "6-8",
            },
            {
              name: "Barbell Rows",
              pattern: "pull",
              sets: 3,
              reps: "6-8",
            },
            {
              name: "Glute Bridges",
              pattern: "hinge",
              sets: 2,
              reps: "10-12",
            },
          ],
        },
        {
          day: 2,
          title: "Long Endurance Session",
          type: "cardio",
          exercises: [
            {
              name: "Long, Steady State Cardio (Run/Bike/Swim)",
              pattern: "conditioning",
              durationSec: 5400,
              notes: "90 minutes at comfortable aerobic pace",
            },
          ],
        },
        {
          day: 3,
          title: "Rest or Light Activity",
          type: "recovery",
          exercises: [],
          notes: "Easy walk, light stretching, or foam rolling",
        },
        {
          day: 4,
          title: "Speed & Power Work",
          type: "hiit",
          exercises: [
            {
              name: "Warm-up: 10 min easy",
              pattern: "conditioning",
            },
            {
              name: "Main Set: 6 x 3 min at 5K pace with 2 min recovery",
              pattern: "conditioning",
              durationSec: 1800,
            },
            {
              name: "Cool-down: 5 min easy",
              pattern: "conditioning",
            },
          ],
        },
        {
          day: 5,
          title: "Threshold/Tempo Work",
          type: "cardio",
          exercises: [
            {
              name: "Warm-up: 15 min easy",
              pattern: "conditioning",
            },
            {
              name: "Main: 2 x 20 min at threshold pace with 5 min recovery",
              pattern: "conditioning",
              durationSec: 2400,
            },
            {
              name: "Cool-down: 10 min easy",
              pattern: "conditioning",
            },
          ],
        },
        {
          day: 6,
          title: "Recovery Endurance",
          type: "cardio",
          exercises: [
            {
              name: "Easy Pace Cardio",
              pattern: "conditioning",
              durationSec: 2400,
              notes: "40 minutes at very easy pace (recover well)",
            },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Build & Intensity",
      weekStart: 4,
      weekEnd: 6,
      focus:
        "Increase endurance volume. Introduce higher intensity work. Maintain strength.",
      progression: [
        "Increase long endurance by 10-15 min",
        "Add more threshold/tempo work",
        "Increase speed work intensity",
      ],
      keyChanges: [
        "Long session: 100-110 minutes",
        "Speed work: higher pace ranges",
        "Threshold: longer intervals",
      ],
    },
    {
      name: "Phase 3 — Race Preparation & Peak",
      weekStart: 7,
      weekEnd: 9,
      focus:
        "Race-specific preparation. Peak endurance. Taper for competition.",
      progression: [
        "Race-simulation workouts",
        "Competition-paced intervals",
        "Strategic taper",
      ],
      keyChanges: [
        "Week 7: peak volume",
        "Week 8: reduce volume by 40-50%",
        "Week 9: race week preparation",
      ],
    },
  ],
  nutrition: {
    note: "Very high carbs for high-volume endurance training. Adequate protein.",
    proteinPct: [15, 20],
    carbsPct: [65, 75],
    fatsPct: [15, 20],
  },
  recovery: [
    "Sleep: 8-9 hours nightly",
    "Sports massage or recovery modalities",
    "Hydration: 150-180 oz daily, more on long days",
    "Caloric surplus to match training volume",
  ],
};
