import {
  compareColumns,
  compareRows,
  trustPillars,
} from "@/data/content";
import { Container, Eyebrow, SectionHead } from "./primitives";
import Image from "next/image";

export function Trust() {
  return (
    <section id="trust" className="border-t border-line py-[60px]">
      <Container>
        <div className="flex gap-12 items-start mb-12">
          <div className="flex-shrink-0 w-[300px]">
            <Image
              src="/c9f-hero.png"
              alt="C9F Coach"
              width={300}
              height={400}
              className="rounded-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <SectionHead
              eyebrow="Why C9F"
              title="Built on real coaching. Not just a prompt."
              sub="Every specialist in this system runs on methodology developed and tested through ImpactShredz — years of real training and high-level sport, turned into structured programming, not generated from a generic model with no coaching background behind it."
            />

            <div className="flex flex-col gap-4">
              {trustPillars.map((pillar) => (
                <div
                  key={pillar.mark}
                  className="fill-panel flex items-start gap-5 rounded border border-line p-7"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent font-mono text-[11px] text-accent">
                    {pillar.mark}
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-display text-base">{pillar.title}</h3>
                    <p className="text-sm text-ink-dim">{pillar.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NOTE: fabricated testimonials are a launch blocker — real client
            results go here once collected (see mockup placeholder). */}
        <div className="mt-5 rounded border border-dashed border-safety px-3.5 py-2.5 font-mono text-[11px] text-safety">
          ⚠ PLACEHOLDER — real client testimonials/results to be added here once
          collected. Do not launch with fabricated quotes.
        </div>

        <div className="mt-12">
          <Eyebrow>Comparison</Eyebrow>
          <h3 className="mb-2 font-display text-[22px] font-semibold">
            C9F vs. the alternatives
          </h3>
          <div className="overflow-x-auto">
            <table className="mt-2 w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-line px-2.5 py-3" />
                  {compareColumns.map((col, i) => (
                    <th
                      key={col}
                      className={`border-b border-line px-2.5 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-wide ${
                        i === compareColumns.length - 1
                          ? "text-accent"
                          : "text-ink-dim"
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.feature}>
                    <td className="border-b border-line px-2.5 py-3 text-[13px]">
                      {row.feature}
                    </td>
                    <td className="border-b border-line px-2.5 py-3 text-[13px] text-ink-dim">
                      {row.chatbots}
                    </td>
                    <td className="border-b border-line px-2.5 py-3 text-[13px] text-ink-dim">
                      {row.logging}
                    </td>
                    <td className="border-b border-line px-2.5 py-3 text-[13px] font-semibold text-accent">
                      {row.c9f}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
