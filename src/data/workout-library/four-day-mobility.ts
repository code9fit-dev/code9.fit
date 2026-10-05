import type { Program } from "./types";

/** C9F 4-day/week, 9-week progressive mobility & joint-health program — general movement, not rehab. */
export const fourDayMobility: Program = {
  meta: {
    id: "four-day-mobility",
    title: "4-Day Mobility & Joint Health (9-Week)",
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
    daysPerWeek: 4,
  },
  focus: "Four short flows a week — lower, upper/spine, full-body, and balance/control.",
  goalStatement: "Progressively improve range of motion and joint resilience over 9 weeks.",
  overview:
    "Four ~25-minute sessions: lower-body, upper-body/spine, a full-body flow, and a balance/control day. General mobility education for healthy people — not injury rehab. With pain or a diagnosed condition, work with a professional first.",
  weeklyStructure: [
    { day: 1, focus: "Lower Body Mobility" },
    { day: 2, focus: "Upper Body & Spine Mobility" },
    { day: 3, focus: "Rest / gentle walk" },
    { day: 4, focus: "Full-Body Flow" },
    { day: 5, focus: "Balance & Control" },
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
          title: "Lower Body Mobility",
          type: "mobility",
          exercises: [
            { name: "Hip CARs", pattern: "core", sets: 2, reps: "5", perSide: true },
            { name: "90/90 Hip Transitions", pattern: "core", sets: 2, reps: "8" },
            { name: "Deep Squat Hold", pattern: "squat", sets: 3, durationSec: 30 },
            { name: "Cossack Squats", pattern: "lunge", sets: 2, reps: "8", perSide: true },
            { name: "Ankle Rocks", pattern: "core", sets: 2, reps: "10", perSide: true },
          ],
        },
        {
          day: 2,
          title: "Upper Body & Spine Mobility",
          type: "mobility",
          exercises: [
            { name: "Cat-Cow", pattern: "core", sets: 2, reps: "8" },
            { name: "Thoracic Rotations", pattern: "core", sets: 2, reps: "8", perSide: true },
            { name: "Band/Towel Shoulder Dislocates", pattern: "push", sets: 2, reps: "10" },
            { name: "Wall Slides", pattern: "push", sets: 2, reps: "10" },
            { name: "Dead Hang", pattern: "pull", sets: 3, durationSec: 20 },
          ],
        },
        {
          day: 4,
          title: "Full-Body Flow",
          type: "mobility",
          exercises: [
            { name: "World's Greatest Stretch", pattern: "core", sets: 2, reps: "5", perSide: true },
            { name: "Flow (cat-cow → down dog → cobra)", pattern: "core", sets: 3, reps: "5" },
            { name: "Deep Squat to Stand", pattern: "squat", sets: 2, reps: "10" },
            { name: "Scapular Push-Ups", pattern: "push", sets: 2, reps: "12" },
          ],
        },
        {
          day: 5,
          title: "Balance & Control",
          type: "mobility",
          exercises: [
            { name: "Single-Leg Balance", pattern: "core", sets: 2, durationSec: 30, perSide: true },
            { name: "Bird-Dog (slow)", pattern: "core", sets: 3, reps: "10", perSide: true },
            { name: "Half-Kneeling Anti-Rotation Hold", pattern: "core", sets: 2, durationSec: 20, perSide: true },
            { name: "Slow Tempo Bodyweight Squat", pattern: "squat", sets: 3, reps: "8" },
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
        "Add tempo/eccentric control to build strength at end range",
        "Progress single-leg balance to eyes-closed or unstable surface",
        "Longer flows; combine drills into continuous sequences",
      ],
    },
  ],
  recovery: [
    "Practise gently — never force through pain",
    "General mobility only; see a professional for injuries or diagnosed conditions",
  ],
};
