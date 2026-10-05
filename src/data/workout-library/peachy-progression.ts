import type { Program } from "./types";

/** Refined from ImpactShredz "Peachy Progression" — the continuation block after Peachy Pump. */
export const peachyProgression: Program = {
  meta: {
    id: "peachy-progression",
    title: "Peachy Progression",
    weeks: 9,
    level: "intermediate",
    goals: ["muscle-gain", "general-fitness"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["muscle-gain-strategist", "gym-program-architect"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Continue developing glutes, shoulder roundness, arms, and core.",
  goalStatement: "Keep progressing the hourglass physique after Peachy Pump.",
  overview:
    "The progression block following Peachy Pump — heavier compounds and refined shaping work across a glute-focused upper/lower split, run as a weekly template you progress across nine weeks.",
  weeklyStructure: [
    { day: 1, focus: "Lower (Glute Max + tie-in)" },
    { day: 2, focus: "Upper (Back / Shoulders / Arms / Core)" },
    { day: 3, focus: "HIIT + hip mobility" },
    { day: 4, focus: "Upper (Shoulders / Arms / Core)" },
    { day: 5, focus: "Lower (Glute roundness + pump)" },
    { day: 6, focus: "Cardio + Core" },
    { day: 7, focus: "Rest" },
  ],
  phases: [
    {
      name: "Weekly Template (Weeks 1-9)",
      weekStart: 1,
      weekEnd: 9,
      focus: "Progress load week to week; keep compounds heavy, shaping work high-rep.",
      days: [
        {
          day: 1,
          title: "Lower — Glute Max + tie-in",
          type: "strength",
          exercises: [
            { name: "Barbell Hip Thrust", pattern: "hinge", sets: 4, reps: "8-10" },
            { name: "Romanian Deadlift", pattern: "hinge", sets: 4, reps: "8-10" },
            { name: "Deficit Reverse Lunge", pattern: "lunge", sets: 3, reps: "10-12", perSide: true },
            { name: "45° Hyperextension (glute focus)", pattern: "hinge", sets: 3, reps: "12-15" },
            { name: "Cable Kickbacks (diagonal)", pattern: "hinge", sets: 3, reps: "12-15" },
            { name: "Weighted Cable Side Bends", pattern: "core", sets: 3, reps: "12-15", perSide: true },
          ],
        },
        {
          day: 2,
          title: "Upper — Back / Shoulders / Arms / Core",
          type: "strength",
          exercises: [
            { name: "Pull-ups or Lat Pulldown", pattern: "pull", sets: 4, reps: "6-11" },
            { name: "Dumbbell Overhead Press", pattern: "push", sets: 4, reps: "6-11" },
            { name: "Dumbbell Lateral Raises", pattern: "push", sets: 4, reps: "6-11" },
            { name: "Single-Arm Dumbbell Row", pattern: "pull", sets: 3, reps: "6-11", perSide: true },
            { name: "Barbell Curl", pattern: "pull", sets: 3, reps: "6-11" },
            { name: "Hammer Curl", pattern: "pull", sets: 3, reps: "6-11" },
            { name: "Overhead Tricep Extension", pattern: "push", sets: 3, reps: "6-11" },
            { name: "Hanging Knee Raises", pattern: "core", sets: 3, reps: "6-11" },
          ],
        },
        {
          day: 3,
          title: "HIIT + hip mobility",
          type: "hiit",
          exercises: [
            { name: "HIIT (TRIB3 or gym conditioning)", pattern: "conditioning", notes: "Plus stretching + hip mobility drills" },
          ],
        },
        {
          day: 4,
          title: "Upper — Shoulders / Arms / Core",
          type: "strength",
          exercises: [
            { name: "Arnold Press", pattern: "push", sets: 4, reps: "8-10" },
            { name: "Upright Row", pattern: "pull", sets: 3, reps: "10-12" },
            { name: "Cable Lateral Raises (1.5 reps)", pattern: "push", sets: 4, reps: "12-15" },
            { name: "Face Pulls", pattern: "pull", sets: 3, reps: "12-15" },
            { name: "Incline Dumbbell Curl", pattern: "pull", sets: 3, reps: "12" },
            { name: "Rope Tricep Pushdowns", pattern: "push", sets: 3, reps: "12-15" },
            { name: "Ab Wheel Rollouts", pattern: "core", sets: 3, reps: "8-12" },
          ],
        },
        {
          day: 5,
          title: "Lower — Glute Roundness + Pump",
          type: "strength",
          exercises: [
            { name: "Squat or Hack Squat (glute bias)", pattern: "squat", sets: 4, reps: "8-10" },
            { name: "B-Stance Hip Thrust", pattern: "hinge", sets: 3, reps: "10-12", perSide: true },
            { name: "Step-ups (high box)", pattern: "lunge", sets: 3, reps: "10-12", perSide: true },
            { name: "Curtsy Lunge", pattern: "lunge", sets: 3, reps: "12-15", perSide: true },
            { name: "Seated Band Hip Abductions", pattern: "hinge", sets: 3, reps: "20-30" },
            { name: "Frog Pumps (burn finisher)", pattern: "hinge", sets: 2, reps: "30" },
            { name: "Plank Variations", pattern: "core", sets: 3, durationSec: 45 },
          ],
        },
        {
          day: 6,
          title: "Cardio + Core",
          type: "cardio",
          exercises: [
            { name: "Incline Walk", pattern: "conditioning", notes: "15 min, 3-4 mph, 8-12% incline" },
            { name: "Ab Wheel Rollouts", pattern: "core", sets: 3, reps: "8-12" },
            { name: "Side Plank Hip Lifts", pattern: "core", sets: 3, reps: "10-12", perSide: true },
          ],
        },
        { day: 7, title: "Rest", type: "rest", exercises: [] },
      ],
      progression: [
        "Rinse & repeat weekly; push the hip thrust, RDL, and squat loads across the block",
        "Keep shaping work (lateral raises, abductions, kickbacks) high-rep",
      ],
    },
  ],
  recovery: ["Wednesday HIIT + hip mobility", "Sunday full rest"],
};
