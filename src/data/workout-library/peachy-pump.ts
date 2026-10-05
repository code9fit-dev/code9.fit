import type { Program } from "./types";

/** Refined from ImpactShredz "Peachy Pump" — glute-focused physique program. */
export const peachyPump: Program = {
  meta: {
    id: "peachy-pump",
    title: "Peachy Pump — 9-Week Progression",
    weeks: 9,
    level: "intermediate",
    goals: ["muscle-gain", "recomposition"],
    equipment: "full-gym",
    primaryCategory: "Physical Fitness",
    personaTags: ["muscle-gain-strategist", "gym-program-architect"],
    source: "ImpactShredz",
    copyright: "© Code9 Fitness (C9F)",
    refined: true,
    purchasable: true,
  },
  focus: "Strong, rounded glutes; capped shoulders/back taper; toned arms; defined core.",
  goalStatement: 'A fit, sculpted "hourglass" physique.',
  overview:
    "A glute-focused upper/lower split over 9 weeks. Weeks 1-3 build the mind-muscle connection and clean movement; weeks 4-6 overload the compounds; weeks 7-9 specialise with drop sets and high-rep finishers.",
  weeklyStructure: [
    { day: 1, focus: "Rest / Active Recovery / Cardio" },
    { day: 2, focus: "Upper (Back / Shoulders / Arms / Core)" },
    { day: 3, focus: "HIIT (cardio + conditioning)" },
    { day: 4, focus: "Lower (Glute Max + tie-in)" },
    { day: 5, focus: "Rest" },
    { day: 6, focus: "Upper (Shoulder roundness + Arms / Core)" },
    { day: 7, focus: "Lower (Glute roundness + pump)" },
  ],
  phases: [
    {
      name: "Weeks 1-3 — Foundation",
      weekStart: 1,
      weekEnd: 3,
      focus:
        "Glute mind-muscle connection and shoulder activation. Reps 8-12 at RPE 6-7 — don't chase failure yet.",
      days: [
        { day: 1, title: "Rest / Active Recovery", type: "rest", exercises: [] },
        {
          day: 2,
          title: "Upper — Back / Shoulders / Arms / Core",
          type: "strength",
          exercises: [
            { name: "Pull-ups or Lat Pulldown", pattern: "pull", sets: 4, reps: "8-12" },
            { name: "Dumbbell Overhead Press", pattern: "push", sets: 4, reps: "8-10" },
            { name: "Dumbbell Lateral Raises", pattern: "push", sets: 4, reps: "12-15" },
            { name: "Dumbbell / Cable Row", pattern: "pull", sets: 3, reps: "8-10" },
            { name: "Barbell Curl", pattern: "pull", sets: 3, reps: "8-10" },
            { name: "Hammer Curl", pattern: "pull", sets: 3, reps: "12-15" },
            { name: "Overhead Tricep Extension", pattern: "push", sets: 3, reps: "10-12" },
            { name: "Hanging Knee Raises", pattern: "core", sets: 3, reps: "12" },
          ],
        },
        {
          day: 3,
          title: "HIIT / Cardio",
          type: "hiit",
          exercises: [
            { name: "Incline walk + cycle intervals", pattern: "conditioning", notes: "15 min incline walk, then 20 min cycle (5 min slow / 5 min pace x2)" },
          ],
        },
        {
          day: 4,
          title: "Lower — Glute Max + tie-in",
          type: "strength",
          exercises: [
            { name: "Barbell Hip Thrust", pattern: "hinge", sets: 4, reps: "8-10" },
            { name: "Romanian Deadlift", pattern: "hinge", sets: 4, reps: "8-10" },
            { name: "Deficit Reverse Lunge", pattern: "lunge", sets: 3, reps: "10-12", perSide: true },
            { name: "45° Hyperextension (glute focus)", pattern: "hinge", sets: 3, reps: "12-15" },
            { name: "Cable Kickbacks (diagonal)", pattern: "hinge", sets: 3, reps: "12-15" },
          ],
        },
        { day: 5, title: "Rest", type: "rest", exercises: [] },
        {
          day: 6,
          title: "Upper — Shoulders / Arms / Core",
          type: "strength",
          exercises: [
            { name: "Arnold Press", pattern: "push", sets: 4, reps: "8-10" },
            { name: "Upright Row", pattern: "pull", sets: 3, reps: "10-12" },
            { name: "Cable Lateral Raises (1.5 reps)", pattern: "push", sets: 4, reps: "12-15" },
            { name: "Face Pulls", pattern: "pull", sets: 3, reps: "12-15" },
            { name: "Incline Dumbbell Curl", pattern: "pull", sets: 3, reps: "12" },
            { name: "Rope Tricep Pushdowns", pattern: "push", sets: 3, reps: "12-15" },
            { name: "Core (ab wheel / leg raises / ankle taps)", pattern: "core", sets: 3, reps: "9-15" },
          ],
        },
        {
          day: 7,
          title: "Lower — Glute Roundness",
          type: "strength",
          exercises: [
            { name: "Squat or Hack Squat (glute-bias stance)", pattern: "squat", sets: 4, reps: "8-10" },
            { name: "DB Sumo Squat", pattern: "squat", sets: 3, reps: "10-12" },
            { name: "Hip Thrust superset Curtsy Lunge", pattern: "hinge", sets: 3, reps: "9-11" },
            { name: "Step-ups (high box, glute drive)", pattern: "lunge", sets: 3, reps: "10-12", perSide: true },
            { name: "Seated Band Abductions", pattern: "hinge", sets: 3, reps: "20-30" },
            { name: "Frog Pumps (burnout)", pattern: "hinge", sets: 2, reps: "30" },
            { name: "Plank Variations (front + side)", pattern: "core", sets: 4, durationSec: 45 },
          ],
        },
      ],
    },
    {
      name: "Weeks 4-6 — Overload",
      weekStart: 4,
      weekEnd: 6,
      focus: "Go heavier with clean form; same split with a few new movements to grow more broadly.",
      progression: [
        "Compounds (hip thrust, RDL, squat): 6-10 reps, heavier",
        "Add +1 set to hip thrusts & RDLs",
        "Arms + delts: progress weight slowly, stay 10-15 reps",
      ],
    },
    {
      name: "Weeks 7-9 — Specialisation & Sculpting",
      weekStart: 7,
      weekEnd: 9,
      focus: "Peak intensity and shaping.",
      keyChanges: [
        '"Burn it" sets: drop sets on hip thrusts and abductions',
        "Keep squats + RDLs heavy",
        "High-rep shoulder finishers (20-rep lateral raises)",
        "More and longer plank holds for the core",
      ],
    },
  ],
  recovery: ["Monday & Friday rest", "Keep the Wednesday conditioning session in for tone"],
};
