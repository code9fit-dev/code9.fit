import type { Plan, Workout } from "@/lib/store/types";

const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function todayLabel(): string {
  return WEEKDAY[new Date().getDay()];
}

export function workoutComplete(w: Workout): boolean {
  return w.exercises.length > 0 && w.exercises.every((e) => e.done);
}

export function workoutPct(w: Workout): number {
  if (w.exercises.length === 0) return 0;
  return Math.round(
    (w.exercises.filter((e) => e.done).length / w.exercises.length) * 100,
  );
}

export function currentWeek(plan: Plan) {
  return plan.schedule.find((w) => w.week === plan.currentWeek);
}

export function weeklyProgress(plan: Plan): {
  done: number;
  total: number;
  pct: number;
} {
  const wk = currentWeek(plan);
  const workouts = wk?.workouts ?? [];
  const done = workouts.filter(workoutComplete).length;
  const total = workouts.length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

/** Today's scheduled workout in the current week, or the next incomplete one. */
export function todaysWorkout(plan: Plan): Workout | null {
  const wk = currentWeek(plan);
  if (!wk) return null;
  const today = todayLabel();
  return (
    wk.workouts.find((w) => w.day === today) ??
    wk.workouts.find((w) => !workoutComplete(w)) ??
    wk.workouts[0] ??
    null
  );
}

/** Short one-line summary of the active plan, injected into the coach prompt. */
export function planContextLine(plan: Plan): string {
  const wk = weeklyProgress(plan);
  const today = todaysWorkout(plan);
  return [
    `Active plan: "${plan.title}". The client is on week ${plan.currentWeek} of ${plan.weeks}.`,
    `This week's completion: ${wk.done}/${wk.total} workouts (${wk.pct}%).`,
    today
      ? `Today's session is "${today.focus}" (${workoutPct(today)}% done).`
      : "",
    "Reference this plan when the client asks about their program, progress, or what's next. Do not invent a different plan.",
  ]
    .filter(Boolean)
    .join(" ");
}
