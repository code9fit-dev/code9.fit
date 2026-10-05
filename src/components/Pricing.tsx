import Link from "next/link";
import { tiers, valueCompare } from "@/data/pricing";
import { Container, SectionHead } from "./primitives";

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-line py-[60px]">
      <Container>
        <SectionHead
          eyebrow="Access"
          title="Priced below what one session costs."
          sub="Every tier includes real specialist coaching. Higher tiers add adaptive AI and human review — the kind of oversight that normally comes with a private coach's monthly retainer."
        />

        <div className="flex flex-col gap-3.5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded border p-[22px] ${
                tier.featured
                  ? "fill-accent border-accent"
                  : "fill-panel border-line"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-2.5 left-[22px] rounded-sm bg-accent px-2.5 py-[3px] font-mono text-[10px] font-semibold uppercase tracking-wide text-on-accent">
                  Most chosen
                </span>
              )}
              <div className="mb-1 font-display text-base font-semibold">
                {tier.name}
              </div>
              <div className="mb-3.5 text-[13px] text-ink-dim">{tier.desc}</div>
              <div className="mb-4 font-mono text-[13px] text-accent">
                {tier.value}
              </div>
              <Link
                href={`/onboarding?tier=${encodeURIComponent(tier.name)}`}
                className={tier.featured ? "btn-primary" : "btn-secondary"}
              >
                {tier.name === "Free" ? "Start free" : `Choose ${tier.name}`}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-baseline gap-2.5 border-t border-line pt-7">
          <span className="font-mono text-[15px] text-ink-dim line-through">
            {valueCompare.before}
          </span>
          <span className="text-accent">→</span>
          <span className="font-mono text-[15px] font-semibold text-accent">
            {valueCompare.after}
          </span>
        </div>
      </Container>
    </section>
  );
}
