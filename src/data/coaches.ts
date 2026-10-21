// The 9 C9F specialist coaches — authoritative data from
// C9F_9_Coach_Personas_DevHandoff_v1.md.
//
// `id` is the canonical coach number from the dev-handoff spec (Coach 1–9).
// Marketing groups them into four categories for the landing index; within a
// category they render in canonical-id order, so displayed numbers are the
// real spec IDs (intentionally non-contiguous per group).
//
// Tier availability is NOT uniform — three coaches are deliberately trimmed
// (see spec). The Coach Orchestration + tier-gating layers should read this.

export type CoachCategory = "Goal" | "Structure" | "Support" | "Safety";

export type Tier = "Free" | "One-Time" | "Subscription" | "Premium";

export const ALL_TIERS: Tier[] = ["Free", "One-Time", "Subscription", "Premium"];

export interface Coach {
  id: number;
  index: string; // zero-padded canonical id for display, e.g. "05"
  name: string;
  desc: string;
  category: CoachCategory;
  /** Tiers this coach actually offers (some are trimmed from the full 4). */
  tiers: Tier[];
  /** Bundle-pairing coach name, or a note when pairing isn't an upsell. */
  bundle: string;
  safety?: boolean;
}

export const coaches: Coach[] = [
  {
    id: 1,
    index: "01",
    name: "Fat Loss Architect",
    desc: "Structured calorie deficit strategy and fat-burning systems.",
    category: "Goal",
    tiers: ["Free", "One-Time", "Subscription", "Premium"],
    bundle: "Precision Nutrition Planner",
  },
  {
    id: 2,
    index: "02",
    name: "Muscle Gain Strategist",
    desc: "Hypertrophy-focused splits, volume progression, recovery.",
    category: "Goal",
    tiers: ["Free", "One-Time", "Subscription", "Premium"],
    bundle: "Precision Nutrition Planner",
  },
  {
    id: 3,
    index: "03",
    name: "Body Recomposition Engineer",
    desc: "Dual-phase systems to lose fat and build muscle together.",
    category: "Goal",
    tiers: ["Free", "One-Time", "Subscription", "Premium"],
    bundle: "Precision Nutrition Planner",
  },
  {
    id: 5,
    index: "05",
    name: "Sports Performance Optimizer",
    desc: "Speed, explosiveness, agility, and sport-specific conditioning.",
    category: "Goal",
    // Trimmed: no Subscription — season-based work benefits from human expertise.
    tiers: ["Free", "One-Time", "Premium"],
    bundle: "Gym Program Architect",
  },
  {
    id: 4,
    index: "04",
    name: "Gym Program Architect",
    desc: "Weekly and monthly training blueprints — strength, hypertrophy, or powerlifting mode.",
    category: "Structure",
    tiers: ["Free", "One-Time", "Subscription", "Premium"],
    bundle: "Sports Performance Optimizer",
  },
  {
    id: 6,
    index: "06",
    name: "Precision Nutrition Planner",
    desc: "Macro-based meal structures tailored to your goal and whichever coach you're paired with.",
    category: "Structure",
    tiers: ["Free", "One-Time", "Subscription", "Premium"],
    bundle: "Pairs with nearly every coach",
  },
  {
    id: 8,
    index: "08",
    name: "Home Workout Systems Builder",
    desc: "Equipment-free and minimal-equipment training — the default on-ramp for absolute beginners.",
    category: "Structure",
    tiers: ["Free", "One-Time", "Subscription", "Premium"],
    bundle: "Recovery & Resilience Coach",
  },
  {
    id: 9,
    index: "09",
    name: "Recovery & Resilience Coach",
    desc: "Sleep, stress, habit systems, and nervous system awareness that make everything else stick — build capacity to perform and recover.",
    category: "Support",
    // Merged: Lifestyle & Recovery Coach + Nervous System Coach
    tiers: ["Free", "Subscription", "Premium"],
    bundle: "Home Workout Systems Builder",
  },
  {
    id: 7,
    index: "07",
    name: "Injury-Safe Training Designer",
    desc: "Joint-friendly systems and movement correction — human-reviewed by default, never diagnostic.",
    category: "Safety",
    // Trimmed: Free / Premium only — no unsupervised AI coaching on pain/injury.
    tiers: ["Free", "Premium"],
    bundle: "Human coach review included as standard — not an upsell.",
    safety: true,
  },
];

export const coachCategoryOrder: CoachCategory[] = [
  "Goal",
  "Structure",
  "Support",
  "Safety",
];

export const coachesByCategory: Record<CoachCategory, Coach[]> =
  coachCategoryOrder.reduce(
    (acc, cat) => {
      acc[cat] = coaches
        .filter((c) => c.category === cat)
        .sort((a, b) => a.id - b.id);
      return acc;
    },
    {} as Record<CoachCategory, Coach[]>,
  );

// Stable URL slug derived from the coach name (e.g. "Fat Loss Architect" ->
// "fat-loss-architect"). Used for /coach/[slug] routes.
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const coachSlug = (coach: Coach): string => slugify(coach.name);

export function getCoachBySlug(slug: string): Coach | undefined {
  return coaches.find((c) => slugify(c.name) === slug);
}

export function getCoachByName(name: string): Coach | undefined {
  return coaches.find((c) => c.name === name);
}
