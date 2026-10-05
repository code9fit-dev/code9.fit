export type BookCategory = 'habits' | 'nutrition' | 'training' | 'sleep' | 'longevity' | 'mental-health' | 'women-health';
export type ProgressionLevel = 'beginner' | 'intermediate' | 'advanced';
export type InsightCategory = 'sleep' | 'nutrition' | 'training' | 'recovery' | 'mindset';
export type UnlockReason = 'progression-level' | 'focus-area-selected' | 'coach-recommended';
export type Tier = 'Free' | 'One-Time' | 'Subscription' | 'Premium';

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: BookCategory;
  description?: string | null;
  source: string;
  use_case?: string | null;
  key_concepts: string[];
  coach_persona_tags: string[];
  published_year?: number | null;
  created_at: string;
}

export interface BookInsight {
  id: string;
  book_id: string;
  level: ProgressionLevel;
  category: InsightCategory;
  title: string;
  content: string;
  coaching_prompt?: string | null;
  example_question?: string | null;
  follow_up_actions?: string[] | null;
  created_at: string;
  book?: Book;
}

export interface CoachKnowledgeMap {
  id: string;
  coach_slug: string;
  insight_id: string;
  tier_minimum: Tier;
  priority_rank: number;
  notes?: string | null;
}

export interface ClientInsightUnlocked {
  id: string;
  user_id: string;
  insight_id: string;
  unlocked_at: string;
  unlocked_reason: UnlockReason;
  seen_at?: string | null;
  insight?: BookInsight;
}

export interface ClientFocusArea {
  id: string;
  user_id: string;
  coach_slug: string;
  focus_category: InsightCategory;
  selected_by?: string | null;
  selected_at: string;
  expires_at?: string | null;
}

export interface CoachKnowledgeContext {
  coachSlug: string;
  clientProgressionLevel: ProgressionLevel;
  clientFocusAreas: InsightCategory[];
  applicableInsights: BookInsight[];
  coachingFramework: {
    topInsight: BookInsight | null;
    alternativeAngles: BookInsight[];
    questionsToAsk: string[];
  };
}
