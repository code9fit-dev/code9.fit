import type { Tier } from "@/data/coaches";
import type { IntakeState } from "@/data/onboarding";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  /** Hidden from the UI but still sent to the model (e.g. referral hand-off context). */
  hidden?: boolean;
}

/** Set when one coach refers the client to another; consumed by the target coach on arrival. */
export interface HandoffContext {
  fromSlug: string;
  fromName: string;
  toSlug: string;
  reason: string;
}

/** A human coach's topic-targeted advert. The AI surfaces it when a client raises a matching topic. */
export interface Advert {
  id: string;
  coach: string; // human coach display name
  specialty: string; // e.g. "Precision Nutrition"
  headline: string;
  offer: string; // coach-authored offer text (app renders it; AI never quotes it)
  topics: string[]; // targeting topics/keywords
  active: boolean;
  createdAt: number;
}

/** A client's request to a coach, raised from a surfaced advert. The coach reviews it. */
export interface AdRequest {
  id: string;
  advertId: string;
  coach: string;
  clientEmail: string;
  clientMessage: string;
  context: string; // short transcript excerpt for the coach to review
  status: "pending" | "accepted" | "declined";
  createdAt: number;
}

export interface Exercise {
  id: string;
  name: string;
  detail: string; // e.g. "4 x 8-10 @ RPE 8"
  done: boolean;
}

export interface Workout {
  id: string;
  day: string; // "Mon" | "Tue" | ... — maps to weekday for "today"
  title: string;
  focus: string;
  exercises: Exercise[];
}

export interface PlanWeek {
  week: number;
  workouts: Workout[];
}

export interface Plan {
  coachSlug: string;
  coachName: string;
  title: string;
  createdAt: number;
  weeks: number;
  currentWeek: number;
  schedule: PlanWeek[];
}

export type Role = "client" | "human_coach" | "admin";

export interface Identity {
  email: string;
  role?: Role;
}

export interface AppState {
  identity: Identity | null;
  profile: IntakeState | null;
  /** coachSlug -> current tier (purchased or admin-impersonated). */
  tiers: Record<string, Tier>;
  /** coachSlug -> saved conversation. */
  chats: Record<string, ChatMessage[]>;
  /** coachSlug -> active plan. */
  plans: Record<string, Plan>;
  /** Pending referral hand-off, if the client is mid-transfer between coaches. */
  handoff: HandoffContext | null;
  /** Coach adverts (created via admin until the coach portal ships). */
  adverts: Advert[];
  /** Client requests raised from surfaced adverts, for coach review. */
  adRequests: AdRequest[];
}

export const EMPTY_STATE: AppState = {
  identity: null,
  profile: null,
  tiers: {},
  chats: {},
  plans: {},
  handoff: null,
  adverts: [],
  adRequests: [],
};
