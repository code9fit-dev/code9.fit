import Link from "next/link";
import { Container, Eyebrow } from "./primitives";

const stats = [
  { num: "09", label: "Specialist coaches" },
  { num: "04", label: "Tiers of access" },
  { num: "01", label: "Human-reviewed safety layer" },
];

export function Hero() {
  return (
    <Container className="pb-[70px] pt-[60px]">
      <Eyebrow withRule>The C9F Coaching System</Eyebrow>

      <h1 className="mb-5 font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.5px] max-[480px]:text-[32px]">
        Elite coaching. <em className="not-italic text-accent">Systemized.</em>
      </h1>

      <p className="mb-8 max-w-[480px] text-base text-ink-dim">
        A real coach costs €80+ a session and books out weeks in advance. C9F
        gives you specialist-level programming, adaptive AI coaching, and human
        oversight — for less than one session a month.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href="/onboarding" className="btn-primary">
          Find your coach
        </Link>
        <a href="#how" className="btn-secondary">
          How it works
        </a>
      </div>

      <div className="schematic fill-panel mt-12 rounded border border-line p-7">
        <div className="mb-3.5 font-mono text-[11px] uppercase tracking-wide text-ink-dim">
          {"// System overview"}
        </div>
        <div className="flex flex-wrap gap-8 max-[480px]:gap-5">
          {stats.map((s) => (
            <div key={s.label} className="font-mono">
              <div className="text-[28px] font-medium text-accent">{s.num}</div>
              <div className="text-xs text-ink-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
