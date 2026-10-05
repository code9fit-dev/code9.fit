"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ThemeController } from "@/components/ThemeController";
import { getCoachBySlug, ALL_TIERS, type Tier } from "@/data/coaches";
import { setTier } from "@/lib/store/store";

function SuccessInner() {
  const params = useSearchParams();
  const slug = params.get("coach") ?? "";
  const tierParam = params.get("tier") ?? "";
  const coach = getCoachBySlug(slug);

  const valid =
    !!coach &&
    ALL_TIERS.includes(tierParam as Tier) &&
    coach.tiers.includes(tierParam as Tier);
  const unlocked: Tier | null = valid ? (tierParam as Tier) : null;
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current || !valid) return;
    ran.current = true;
    // Lemon Squeezy redirects here after a completed checkout — persist the
    // unlock to the local store. The webhook is the durable source of truth
    // once the auth + DB phase exists.
    setTier(slug, tierParam as Tier);
  }, [valid, slug, tierParam]);

  if (!coach || !unlocked) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-ink-dim">
          Payment received. Finalising your access…
        </p>
        <Link href="/#coaches" className="btn-primary">
          See coaches
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="fill-accent schematic rounded border border-accent p-6">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-accent">
          Payment complete — {unlocked} unlocked
        </div>
        <div className="mb-2 font-display text-xl font-semibold">
          You&rsquo;re in.
        </div>
        <p className="mb-4 text-sm text-ink-dim">
          {coach.name} is now unlocked at the {unlocked} tier. Any purchased
          document is delivered to your email by Lemon Squeezy.
        </p>
        <Link href={`/coach/${slug}`} className="btn-primary">
          Go to {coach.name}
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-[560px] px-6">
      <ThemeController theme="signature" />
      <Suspense
        fallback={<div className="py-20 text-center text-ink-dim">Loading…</div>}
      >
        <SuccessInner />
      </Suspense>
    </div>
  );
}
