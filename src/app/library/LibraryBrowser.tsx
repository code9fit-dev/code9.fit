"use client";

import { useState } from "react";
import Link from "next/link";
import type { Goal, Level, Program } from "@/data/workout-library/types";
import { goalLabels } from "@/data/workout-library/document";

const GOALS: { value: Goal; label: string }[] = [
  { value: "fat-loss", label: "Fat Loss" },
  { value: "muscle-gain", label: "Muscle Gain" },
  { value: "recomposition", label: "Recomposition" },
  { value: "performance", label: "Performance" },
  { value: "general-fitness", label: "General Fitness" },
  { value: "mobility", label: "Mobility" },
];

const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];
type Freq = "3" | "4" | "5+";
const FREQS: Freq[] = ["3", "4", "5+"];

/** Training days per week (explicit, or derived from the weekly structure). */
function trainingDays(p: Program): number {
  if (p.meta.daysPerWeek) return p.meta.daysPerWeek;
  return p.weeklyStructure.filter((d) => !/rest|recovery/i.test(d.focus)).length;
}
function freqBucket(p: Program): Freq {
  const n = trainingDays(p);
  return n <= 3 ? "3" : n === 4 ? "4" : "5+";
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="c9-chip capitalize"
      data-selected={active}
    >
      {children}
    </button>
  );
}

export function LibraryBrowser({ programs }: { programs: Program[] }) {
  const [goal, setGoal] = useState<Goal | "all">("all");
  const [freq, setFreq] = useState<Freq | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");

  const filtered = programs.filter(
    (p) =>
      (goal === "all" || p.meta.goals.includes(goal)) &&
      (freq === "all" || freqBucket(p) === freq) &&
      (level === "all" || p.meta.level === level),
  );

  return (
    <div>
      {/* Selection menu */}
      <div className="mb-8 space-y-3 rounded border border-line fill-panel p-5">
        <div className="font-mono text-[11px] uppercase tracking-wide text-accent">
          Find your program
        </div>

        <FilterRow label="Goal">
          <Chip active={goal === "all"} onClick={() => setGoal("all")}>
            All
          </Chip>
          {GOALS.map((g) => (
            <Chip key={g.value} active={goal === g.value} onClick={() => setGoal(g.value)}>
              {g.label}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Days / week">
          <Chip active={freq === "all"} onClick={() => setFreq("all")}>
            All
          </Chip>
          {FREQS.map((f) => (
            <Chip key={f} active={freq === f} onClick={() => setFreq(f)}>
              {f === "5+" ? "5+ day" : `${f}-day`}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Level">
          <Chip active={level === "all"} onClick={() => setLevel("all")}>
            All
          </Chip>
          {LEVELS.map((l) => (
            <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
              {l}
            </Chip>
          ))}
        </FilterRow>
      </div>

      <div className="mb-4 font-mono text-[11px] text-ink-dim">
        Showing {filtered.length} of {programs.length} programs
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink-dim">
          No programs match that combination — try widening the filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <Link
              key={p.meta.id}
              href={`/library/${p.meta.id}`}
              className="fill-panel schematic rounded border border-line p-5 transition-colors hover:border-accent"
            >
              <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-accent">
                {p.meta.level} · {p.meta.weeks} weeks · {trainingDays(p)}-day/week
              </div>
              <div className="font-display text-base font-semibold">
                {p.meta.title}
              </div>
              <div className="mt-1 text-sm text-ink-dim">{p.focus}</div>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-wide text-ink-dim">
                <span>{goalLabels(p)}</span>
                <span>·</span>
                <span>{p.meta.equipment}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-20 shrink-0 font-mono text-[10px] uppercase tracking-wide text-ink-dim">
        {label}
      </span>
      {children}
    </div>
  );
}
