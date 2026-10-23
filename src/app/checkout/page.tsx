"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ThemeController } from "@/components/ThemeController";
import { ALL_TIERS, getCoachBySlug, type Tier } from "@/data/coaches";
import { getProgram } from "@/data/workout-library";
import { PAYMENT_TIERS, formatPrice } from "@/lib/payments/tiers";

function CheckoutInner() {
  const params = useSearchParams();
  const coachSlug = params.get("coach") ?? "";
  const programSlug = params.get("program") ?? "";
  const canceled = params.get("canceled") === "1";
  const coach = getCoachBySlug(coachSlug);
  const program = programSlug ? getProgram(programSlug) : null;
  const [busy, setBusy] = useState<Tier | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function pay(tier: Tier) {
    setBusy(tier);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coachSlug, tier, programSlug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.error ?? "Could not start checkout.");
    } catch {
      setError("Network error starting checkout.");
    } finally {
      setBusy(null);
    }
  }

  // If program is provided, show program-specific checkout
  if (program) {
    const programData = program as any;
    return (
      <div className="py-8">
        <Link href={`/program/${programSlug}`} className="font-mono text-xs text-ink-dim">
          ← Back to program
        </Link>
        <h1 className="mt-4 font-display text-2xl font-semibold">
          {programData.meta.title}
        </h1>
        <p className="mb-2 mt-1 text-sm text-ink-dim">
          {programData.focus}
        </p>
        <p className="mb-6 text-sm text-ink-dim">
          Secure checkout by Lemon Squeezy (tax handled for you). In test mode use
          card 4242 4242 4242 4242, any future expiry, any CVC.
        </p>

        {canceled && (
          <div className="mb-5 rounded border border-line fill-panel px-4 py-3 text-sm text-ink-dim">
            Checkout canceled — no charge was made.
          </div>
        )}
        {error && (
          <div className="mb-5 rounded border border-safety bg-safety/10 px-4 py-3 text-sm text-ink">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {["Basic", "Premium", "Pro"].map((tier) => {
            const cfg = PAYMENT_TIERS[tier as Tier];
            if (!cfg) return null;
            return (
              <div
                key={tier}
                className="fill-panel flex items-center justify-between rounded border border-line p-5"
              >
                <div>
                  <div className="font-display font-semibold">{tier}</div>
                  <div className="mb-1 text-sm text-ink-dim">{cfg.blurb}</div>
                  <div className="font-mono text-sm text-accent">
                    {formatPrice(cfg as any)}
                  </div>
                </div>
                <button
                  className="btn-primary disabled:opacity-40"
                  onClick={() => pay(tier as Tier)}
                  disabled={busy !== null}
                >
                  {busy === tier ? "…" : "Pay"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Otherwise show coach-based checkout
  if (!coach) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-ink-dim">Pick a coach or program first.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/#coaches" className="btn-primary">
            See all coaches
          </Link>
          <Link href="/library" className="btn-primary">
            See all programs
          </Link>
        </div>
      </div>
    );
  }

  const purchasable = ALL_TIERS.filter(
    (t) => t !== "Free" && coach.tiers.includes(t) && PAYMENT_TIERS[t],
  );

  return (
    <div className="py-8">
      <Link href={`/coach/${coachSlug}`} className="font-mono text-xs text-ink-dim">
        ← Back to {coach.name}
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold">
        Unlock {coach.name}
      </h1>
      <p className="mb-6 mt-1 text-sm text-ink-dim">
        Secure checkout by Lemon Squeezy (tax handled for you). In test mode use
        card 4242 4242 4242 4242, any future expiry, any CVC.
      </p>

      {canceled && (
        <div className="mb-5 rounded border border-line fill-panel px-4 py-3 text-sm text-ink-dim">
          Checkout canceled — no charge was made.
        </div>
      )}
      {error && (
        <div className="mb-5 rounded border border-safety bg-safety/10 px-4 py-3 text-sm text-ink">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {purchasable.map((tier) => {
          const cfg = PAYMENT_TIERS[tier]!;
          return (
            <div
              key={tier}
              className="fill-panel flex items-center justify-between rounded border border-line p-5"
            >
              <div>
                <div className="font-display font-semibold">{tier}</div>
                <div className="mb-1 text-sm text-ink-dim">{cfg.blurb}</div>
                <div className="font-mono text-sm text-accent">
                  {formatPrice(cfg)}
                </div>
              </div>
              <button
                className="btn-primary disabled:opacity-40"
                onClick={() => pay(tier)}
                disabled={busy !== null}
              >
                {busy === tier ? "…" : "Pay"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[560px] px-6">
      <ThemeController theme="signature" />
      <Suspense fallback={<div className="py-20 text-center text-ink-dim">Loading…</div>}>
        <CheckoutInner />
      </Suspense>
    </div>
  );
}
