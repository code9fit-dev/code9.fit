// Onboarding intake options + goal→coach routing.
// Routing mirrors C9F_Onboarding_Data_Schema_v1.md §4 (the authoritative
// version — it includes the beginner+home branch the HTML mockup omitted).

export const onboardingSteps = [
  { n: 1, name: "Account", eyebrow: "01 — Account" },
  { n: 2, name: "Privacy", eyebrow: "02 — Data & Privacy" },
  { n: 3, name: "Profile", eyebrow: "03 — Your Profile" },
  { n: 4, name: "Confirm", eyebrow: "04 — Confirm" },
  { n: 5, name: "Matched", eyebrow: "05 — Matched" },
] as const;

export const TOTAL_STEPS = onboardingSteps.length;

export const experienceOptions = ["Beginner", "Intermediate", "Advanced"] as const;

export const goalOptions = [
  "Fat loss",
  "Muscle gain",
  "Both / recomposition",
  "Sport performance",
  "General fitness",
] as const;

export const environmentOptions = [
  "Home — no equipment",
  "Home — some equipment",
  "Full gym access",
] as const;

export const medicalOptions = [
  { value: "None flagged", label: "None" },
  {
    value: "Flagged — see note",
    label: "Yes — surgery, joint replacement, or major injury",
  },
] as const;

export type Experience = (typeof experienceOptions)[number];
export type Goal = (typeof goalOptions)[number];
export type Environment = (typeof environmentOptions)[number];

export interface IntakeState {
  email: string;
  password: string;
  ageGate: boolean;
  consentHealth: boolean;
  age: string;
  sex: string;
  height: string;
  weight: string;
  experience: Experience | "";
  goal: Goal | "";
  environment: Environment | "";
  medical: string;
}

export const emptyIntake: IntakeState = {
  email: "",
  password: "",
  ageGate: false,
  consentHealth: false,
  age: "",
  sex: "",
  height: "",
  weight: "",
  experience: "",
  goal: "",
  environment: "",
  medical: "",
};

export interface CoachMatch {
  tag: string;
  name: string;
  desc: string;
  /** Bundle suggestion, or null when a match should not be framed as an upsell. */
  bundleNote: string;
  /** Safety-driven route: human review is standard, never a sales moment. */
  safety?: boolean;
}

const goalRouting: Record<Goal, CoachMatch> = {
  "Fat loss": {
    tag: "GOAL — FAT LOSS",
    name: "Fat Loss Architect",
    desc: "Builds your calorie deficit strategy, fat-burning workout system, and tracks your metabolic progress week to week.",
    bundleNote: "Precision Nutrition Planner",
  },
  "Muscle gain": {
    tag: "GOAL — MUSCLE GAIN",
    name: "Muscle Gain Strategist",
    desc: "Designs your hypertrophy-focused training split, volume progression, and recovery plan.",
    bundleNote: "Precision Nutrition Planner",
  },
  "Both / recomposition": {
    tag: "GOAL — RECOMPOSITION",
    name: "Body Recomposition Engineer",
    desc: "Runs a dual-phase system to build muscle and lose fat together — with realistic pacing built in.",
    bundleNote: "Precision Nutrition Planner",
  },
  "Sport performance": {
    tag: "GOAL — PERFORMANCE",
    name: "Sports Performance Optimizer",
    desc: "Builds your speed, agility, and conditioning program around your training/competition calendar.",
    bundleNote: "Gym Program Architect",
  },
  "General fitness": {
    tag: "GOAL — STRUCTURE",
    name: "Gym Program Architect",
    desc: "Builds your structured weekly and monthly training blueprint.",
    bundleNote: "Sports Performance Optimizer",
  },
};

const homeEnvironments: Environment[] = [
  "Home — no equipment",
  "Home — some equipment",
];

/**
 * Resolve the primary coach from intake data, following schema §4 priority:
 * medical flag > beginner-at-home > goal routing.
 */
export function resolveMatch(state: IntakeState): CoachMatch {
  if (state.medical === "Flagged — see note") {
    return {
      tag: "SAFETY — PRIORITY REVIEW",
      name: "Injury-Safe Training Designer",
      desc: "Based on the medical history you flagged, we're routing you here first — this coach is human-reviewed by default before any other programming begins.",
      bundleNote:
        "This isn't a bundle suggestion — a human coach review is included as standard here, not an upsell.",
      safety: true,
    };
  }

  if (
    state.experience === "Beginner" &&
    homeEnvironments.includes(state.environment as Environment)
  ) {
    return {
      tag: "STRUCTURE — BEGINNER",
      name: "Home Workout Systems Builder",
      desc: "You're starting out and training at home, so we're routing you here — equipment-free and minimal-equipment systems built to get the fundamentals right first.",
      bundleNote: "Lifestyle & Recovery Coach",
    };
  }

  return goalRouting[(state.goal || "General fitness") as Goal];
}
