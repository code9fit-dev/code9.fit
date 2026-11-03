import type { Tier } from "@/data/coaches";

export interface PaidTierConfig {
  amount: number; // in cents (EUR) — for our own price display only
  mode: "payment" | "subscription"; // display hint; the LS variant is source of truth
  blurb: string;
  /** env var holding this tier's Lemon Squeezy variant id. */
  variantEnv: string;
}

/** Purchasable tiers only — Free is never checked out. Amounts mirror the landing pricing. */
export const PAYMENT_TIERS: Partial<Record<Tier, PaidTierConfig>> = {
  "One-Time": {
    amount: 4400,
    mode: "payment",
    blurb: "A complete structured program from your coach. Yours to keep.",
    variantEnv: "LEMONSQUEEZY_VARIANT_ONE_TIME",
  },
  Subscription: {
    amount: 1900,
    mode: "subscription",
    blurb: "Your coach adapts weekly as you log progress.",
    variantEnv: "LEMONSQUEEZY_VARIANT_SUBSCRIPTION",
  },
  Premium: {
    amount: 7900,
    mode: "subscription",
    blurb: "Everything in Subscription, plus a human coach reviewing your plan.",
    variantEnv: "LEMONSQUEEZY_VARIANT_PREMIUM",
  },
};

export function isPurchasable(tier: Tier): boolean {
  return tier in PAYMENT_TIERS;
}

export function formatPrice(cfg: PaidTierConfig): string {
  const eur = (cfg.amount / 100).toFixed(0);
  return cfg.mode === "subscription" ? `€${eur} / month` : `€${eur} one-time`;
}

/** Server-only: the Lemon Squeezy variant id configured for a tier. */
export function variantIdFor(tier: Tier): string | undefined {
  const cfg = PAYMENT_TIERS[tier];
  return cfg ? process.env[cfg.variantEnv] : undefined;
}
