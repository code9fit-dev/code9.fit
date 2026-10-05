// The four access tiers. Higher tiers add adaptive AI + human review.
// Note (architecture §2.3): not all coaches expose all 4 tiers — tier
// availability per coach is enforced later by tier-gating middleware.

export interface Tier {
  name: string;
  desc: string;
  value: string;
  featured?: boolean;
}

export const tiers: Tier[] = [
  {
    name: "Free",
    desc: "Movement patterns, form cues, and core definitions from any specialist. No plans, no numbers, no card required.",
    value: "€0 / forever",
  },
  {
    name: "One-Time",
    desc: "A complete structured program from your chosen coach. Yours to keep.",
    value: "€44 / one-time",
  },
  {
    name: "Subscription",
    desc: "Your coach adapts weekly as you log progress — the system gets sharper the longer you use it.",
    value: "From €19 / month",
    featured: true,
  },
  {
    name: "Premium",
    desc: "Everything in Subscription, plus a real coach reviewing your plan before it reaches you.",
    value: "From €79 / month",
  },
];

export const valueCompare = {
  before: "Private coach: ~€320/mo",
  after: "C9F Premium: €79/mo",
};
