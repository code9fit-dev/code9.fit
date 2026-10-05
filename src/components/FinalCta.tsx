import Link from "next/link";
import { Container, Eyebrow } from "./primitives";

export function FinalCta() {
  return (
    <section className="border-t border-line pb-[90px] pt-[70px]">
      <Container>
        <Eyebrow>Get started</Eyebrow>
        <h2 className="mb-3 font-display text-[32px] font-semibold leading-tight">
          You&rsquo;ve seen what a real coach costs.
          <br />
          This is the smarter way in.
        </h2>
        <p className="mb-9 max-w-[500px] text-ink-dim">
          Pick your specialist. Start free, or go straight to the tier that fits
          your goal.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/onboarding" className="btn-primary">
            Find your coach
          </Link>
          <a href="#pricing" className="btn-secondary">
            See plans
          </a>
        </div>
      </Container>
    </section>
  );
}
