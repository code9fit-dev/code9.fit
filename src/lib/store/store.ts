"use client";

/**
 * Client-side persistence, first pass. Everything lives in one localStorage
 * blob and is exposed through a useSyncExternalStore hook. This is the stand-in
 * until the auth + DB phase — swap the read/write internals for API calls then;
 * the hook + mutator surface can stay the same.
 */

import { useSyncExternalStore } from "react";
import { ALL_TIERS, getCoachBySlug, type Tier } from "@/data/coaches";
import type { IntakeState } from "@/data/onboarding";
import {
  EMPTY_STATE,
  type AdRequest,
  type Advert,
  type AppState,
  type ChatMessage,
  type HandoffContext,
  type Plan,
  type Role,
} from "./types";

function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id_${Math.random().toString(36).slice(2)}`;
}

const KEY = "c9f_state_v1";
const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "code9.fit@proton.me";

let memory: AppState = EMPTY_STATE;
let hydrated = false;
const listeners = new Set<() => void>();

function read(): AppState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY_STATE;
    return { ...EMPTY_STATE, ...(JSON.parse(raw) as AppState) };
  } catch {
    return EMPTY_STATE;
  }
}

function ensureHydrated() {
  if (!hydrated && typeof window !== "undefined") {
    memory = read();
    hydrated = true;
  }
}

function commit(next: AppState) {
  memory = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* quota / private mode — keep in-memory */
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void): () => void {
  ensureHydrated();
  listeners.add(cb);
  // Cross-tab sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      memory = read();
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): AppState {
  ensureHydrated();
  return memory;
}

function getServerSnapshot(): AppState {
  return EMPTY_STATE;
}

export function useStore(): AppState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---------- mutators ---------- */

function update(fn: (s: AppState) => AppState) {
  ensureHydrated();
  commit(fn(memory));
}

export function signIn(email: string) {
  const normalized = email.trim().toLowerCase();
  const role: Role =
    normalized === ADMIN_EMAIL.toLowerCase() ? "admin" : "client";
  update((s) => ({ ...s, identity: { email: normalized, role } }));
}

export function signOut() {
  update((s) => ({ ...s, identity: null }));
}

export function isAdmin(state: AppState): boolean {
  return (
    state.identity?.role === "admin" ||
    state.identity?.email === ADMIN_EMAIL.toLowerCase()
  );
}

export function saveProfile(profile: IntakeState) {
  update((s) => ({ ...s, profile }));
}

export function setTier(coachSlug: string, tier: Tier) {
  update((s) => ({ ...s, tiers: { ...s.tiers, [coachSlug]: tier } }));
}

/** Highest tier a coach offers, by ALL_TIERS rank. */
function highestTier(tiers: Tier[]): Tier {
  return tiers.reduce(
    (best, t) => (ALL_TIERS.indexOf(t) > ALL_TIERS.indexOf(best) ? t : best),
    tiers[0] ?? "Free",
  );
}

export function getTier(state: AppState, coachSlug: string): Tier {
  // An explicit tier (a real purchase, or an admin impersonating a tier to
  // test gating) always wins.
  const explicit = state.tiers[coachSlug];
  if (explicit) return explicit;
  // Otherwise the admin gets full access — the top tier the coach offers — so
  // they can exercise every command and coach as if on Premium.
  if (isAdmin(state)) {
    const coach = getCoachBySlug(coachSlug);
    return coach ? highestTier(coach.tiers) : "Premium";
  }
  return "Free";
}

export function saveChat(coachSlug: string, messages: ChatMessage[]) {
  update((s) => ({ ...s, chats: { ...s.chats, [coachSlug]: messages } }));
}

export function setPlan(plan: Plan) {
  update((s) => ({ ...s, plans: { ...s.plans, [plan.coachSlug]: plan } }));
}

export function toggleExercise(
  coachSlug: string,
  workoutId: string,
  exerciseId: string,
) {
  update((s) => {
    const plan = s.plans[coachSlug];
    if (!plan) return s;
    const schedule = plan.schedule.map((wk) => ({
      ...wk,
      workouts: wk.workouts.map((w) =>
        w.id !== workoutId
          ? w
          : {
              ...w,
              exercises: w.exercises.map((e) =>
                e.id === exerciseId ? { ...e, done: !e.done } : e,
              ),
            },
      ),
    }));
    return { ...s, plans: { ...s.plans, [coachSlug]: { ...plan, schedule } } };
  });
}

export function advanceWeek(coachSlug: string, dir: 1 | -1) {
  update((s) => {
    const plan = s.plans[coachSlug];
    if (!plan) return s;
    const currentWeek = Math.min(
      plan.weeks,
      Math.max(1, plan.currentWeek + dir),
    );
    return { ...s, plans: { ...s.plans, [coachSlug]: { ...plan, currentWeek } } };
  });
}

export function startHandoff(handoff: HandoffContext) {
  update((s) => ({ ...s, handoff }));
}

export function clearHandoff() {
  update((s) => (s.handoff ? { ...s, handoff: null } : s));
}

/** Best-effort display name until a real name field exists (auth phase). */
export function displayName(state: AppState): string {
  const local = state.identity?.email?.split("@")[0] ?? "";
  return local;
}

/* ---------- coach adverts + client requests ---------- */

export function addAdvert(
  advert: Omit<Advert, "id" | "createdAt" | "active"> & { active?: boolean },
) {
  const full: Advert = {
    ...advert,
    active: advert.active ?? true,
    id: uid(),
    createdAt: Date.now(),
  };
  update((s) => ({ ...s, adverts: [full, ...s.adverts] }));
}

export function toggleAdvert(id: string) {
  update((s) => ({
    ...s,
    adverts: s.adverts.map((a) =>
      a.id === id ? { ...a, active: !a.active } : a,
    ),
  }));
}

export function removeAdvert(id: string) {
  update((s) => ({ ...s, adverts: s.adverts.filter((a) => a.id !== id) }));
}

export function addAdRequest(req: Omit<AdRequest, "id" | "createdAt" | "status">) {
  const full: AdRequest = {
    ...req,
    id: uid(),
    status: "pending",
    createdAt: Date.now(),
  };
  update((s) => ({ ...s, adRequests: [full, ...s.adRequests] }));
}

export function setAdRequestStatus(id: string, status: AdRequest["status"]) {
  update((s) => ({
    ...s,
    adRequests: s.adRequests.map((r) => (r.id === id ? { ...r, status } : r)),
  }));
}

export function resetAll() {
  commit(EMPTY_STATE);
}

export { ADMIN_EMAIL };
