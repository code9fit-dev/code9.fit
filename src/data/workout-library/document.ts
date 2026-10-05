import type { ExercisePrescription, Program } from "./types";

/** One-line prescription, e.g. "Squats — 3 x 11" or "Plank — 3 x 45s". */
export function formatPrescription(e: ExercisePrescription): string {
  const load = e.durationSec ? `${e.durationSec}s` : e.reps;
  let line = e.name;
  if (e.sets && load) line += ` — ${e.sets} x ${load}`;
  else if (load) line += ` — ${load}`;
  if (e.perSide) line += " per side";
  if (e.notes) line += ` (${e.notes})`;
  return line;
}

export function goalLabels(program: Program): string {
  return program.meta.goals
    .map((g) => g.replace(/-/g, " "))
    .join(", ");
}

/** Renders a program to a branded, downloadable markdown "package" (© C9F). */
export function programToMarkdown(p: Program): string {
  const out: string[] = [];
  out.push(`# ${p.meta.title}`);
  out.push(`${p.meta.copyright} · Source: ${p.meta.source}`);
  out.push("");
  out.push(`_${p.focus}_`);
  out.push(`**Goal:** ${p.goalStatement}`);
  out.push(
    `**${p.meta.level}** · ${goalLabels(p)} · ${p.meta.equipment} equipment · ${p.meta.weeks} weeks`,
  );
  out.push("");
  out.push("## Overview");
  out.push(p.overview);

  if (p.weeklyStructure.length) {
    out.push("");
    out.push("## Weekly structure");
    p.weeklyStructure.forEach((d) => out.push(`- Day ${d.day}: ${d.focus}`));
  }

  p.phases.forEach((ph) => {
    out.push("");
    out.push(`## ${ph.name}`);
    out.push(`_${ph.focus}_`);
    ph.days?.forEach((day) => {
      out.push("");
      out.push(`### Day ${day.day} — ${day.title} (${day.type})`);
      if (day.warmup) out.push(`Warm-up: ${day.warmup}`);
      day.exercises.forEach((e) => out.push(`- ${formatPrescription(e)}`));
      if (day.cooldown) out.push(`Cool-down: ${day.cooldown}`);
      if (day.notes) out.push(`_${day.notes}_`);
    });
    if (ph.progression?.length) {
      out.push("**Progression:**");
      ph.progression.forEach((x) => out.push(`- ${x}`));
    }
    if (ph.keyChanges?.length) {
      out.push("**Key changes:**");
      ph.keyChanges.forEach((x) => out.push(`- ${x}`));
    }
  });

  if (p.nutrition) {
    out.push("");
    out.push("## Nutrition");
    if (p.nutrition.note) out.push(p.nutrition.note);
    const n = p.nutrition;
    const pct = (r?: [number, number]) => (r ? `${r[0]}-${r[1]}%` : "—");
    out.push(
      `- Protein ${pct(n.proteinPct)} · Carbs ${pct(n.carbsPct)} · Fats ${pct(n.fatsPct)}`,
    );
  }

  if (p.recovery?.length) {
    out.push("");
    out.push("## Recovery");
    p.recovery.forEach((x) => out.push(`- ${x}`));
  }

  out.push("");
  out.push(`---`);
  out.push(`${p.meta.copyright}. All rights reserved.`);
  return out.join("\n");
}
