import { steps } from "@/data/content";
import { Container, SectionHead } from "./primitives";

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-line py-[60px]">
      <Container>
        <SectionHead
          eyebrow="Process"
          title="How the system works"
          sub="No downloads. No dashboards to learn. Just tell it your goal."
        />

        <div className="flex flex-col">
          {steps.map((step) => (
            <div
              key={step.n}
              className="flex gap-5 border-b border-line py-5 last:border-b-0"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-line font-mono text-[13px] text-accent">
                {step.n}
              </div>
              <div>
                <div className="mb-1 font-semibold">{step.title}</div>
                <div className="text-sm text-ink-dim">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
