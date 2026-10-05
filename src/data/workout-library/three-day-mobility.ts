import type { Program } from "./types";

/** C9F 3-day/week mobility & joint-health program — general movement, not rehab. */
export const threeDayMobility: Program = {
  meta: {
    id: "three-day-mobility",
    title: "3-Day Mobility & Joint Health",
    weeks: 9,
    level: "beginner",
    goals: ["mobility"],
    equipment: "none",
    primaryCategory: "Physical Fitness",
    personaTags: ["injury-safe-training-designer", "lifestyle-recovery-coach"],
    source: "Code9 Fitness",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
    daysPerWeek: 3,
  },
  focus: "Move better — mobility, flexibility, and joint health in three short flows.",
  goalStatement: "Improve range of motion and joint resilience with gentle, consistent practice.",
  overview:
    "Three ~25-minute flows a week: lower body, upper body/spine, and a full-body balance session. General mobility education for healthy people — not injury rehab. If you have pain or a diagnosed condition, work with a professional first.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Mobility Flow" },
    { day: 2, focus: "Rest / gentle walk" },
    { day: 3, focus: "Upper Body & Spine Mobility" },
    { day: 4, focus: "Rest" },
    { day: 5, focus: "Full-Body Flow + Balance" },
    { day: 6, focus: "Rest / gentle walk" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Phase 1 — Groove the Ranges (Weeks 1-3)",
      weekStart: 1,
      weekEnd: 3,
      focus: "Slow, controlled range of motion; learn the positions.",
      days: [
        {
          day: 1,
          title: "Lower Body Mobility Flow",
          type: "mobility",
          exercises: [
            { name: "Hip CARs (controlled circles)", pattern: "core", sets: 2, reps: "5", perSide: true },
            { name: "90/90 Hip Transitions", pattern: "core", sets: 2, reps: "8" },
            { name: "Deep Squat Hold", pattern: "squat", sets: 3, durationSec: 30 },
            { name: "Cossack Squats (bodyweight)", pattern: "lunge", sets: 2, reps: "8", perSide: true },
            { name: "Glute Bridge (slow)", pattern: "hinge", sets: 2, reps: "12" },
            { name: "Ankle Rocks", pattern: "core", sets: 2, reps: "10", perSide: true },
          ],
        },
        {
          day: 3,
          title: "Upper Body & Spine Mobility",
          type: "mobility",
          exercises: [
            { name: "Cat-Cow", pattern: "core", sets: 2, reps: "8" },
            { name: "Thoracic Rotations", pattern: "core", sets: 2, reps: "8", perSide: true },
            { name: "Band or Towel Shoulder Dislocates", pattern: "push", sets: 2, reps: "10" },
            { name: "Wall Slides", pattern: "push", sets: 2, reps: "10" },
            { name: "Scapular Push-Ups", pattern: "push", sets: 2, reps: "12" },
            { name: "Dead Hang", pattern: "pull", sets: 3, durationSec: 20 },
          ],
        },
        {
          day: 5,
          title: "Full-Body Flow + Balance",
          type: "mobility",
          exercises: [
            { name: "World's Greatest Stretch", pattern: "core", sets: 2, reps: "5", perSide: true },
            { name: "Flow (cat-cow → down dog → cobra)", pattern: "core", sets: 3, reps: "5" },
            { name: "Single-Leg Balance", pattern: "core", sets: 2, durationSec: 30, perSide: true },
            { name: "Bird-Dog (slow)", pattern: "core", sets: 2, reps: "10", perSide: true },
            { name: "Deep Squat to Stand", pattern: "squat", sets: 2, reps: "10" },
          ],
        },
      ],
    },
    {
      name: "Phase 2 — Add Range (Weeks 4-6)",
      weekStart: 4,
      weekEnd: 6,
      focus: "Increase depth and hold times within a pain-free zone.",
      keyChanges: [
        "Add depth/range gradually on the squat and hip work",
        "Lengthen end-range holds by ~10 seconds",
        "Add a light load (band/light DB) to controlled ranges",
      ],
    },
    {
      name: "Phase 3 — Own the Range (Weeks 7-9)",
      weekStart: 7,
      weekEnd: 9,
      focus: "Strength through range and steadier balance.",
      keyChanges: [
        "Add tempo/eccentric control for end-range strength",
        "Progress single-leg balance (eyes closed / unstable surface)",
        "Combine drills into continuous flows",
      ],
    },
  ],
  recovery: [
    "Practise gently — never force through pain",
    "General mobility only; see a professional for injuries or diagnosed conditions",
  ],
};
