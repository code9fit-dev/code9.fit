import { createClient } from '@supabase/supabase-js';
import type {
  BookInsight,
  ClientFocusArea,
  CoachKnowledgeContext,
  ProgressionLevel,
  Tier,
  UnlockReason,
} from './types';

/**
 * Get insights that apply to a coach + client combination.
 * Called when assembling the coach's system prompt to inject relevant knowledge.
 */
export async function getCoachKnowledgeContext(
  supabase: ReturnType<typeof createClient>,
  coachSlug: string,
  userId: string,
  clientTier: Tier,
  clientProgressionLevel: ProgressionLevel
): Promise<CoachKnowledgeContext> {
  // 1. Get client's active focus areas (e.g. "sleep focus")
  const { data: focusAreas } = await supabase
    .from('client_focus_areas')
    .select('focus_category')
    .eq('user_id', userId)
    .eq('coach_slug', coachSlug)
    .or(`expires_at.is.null,expires_at.gt.now()`);

  // 2. Get insights this coach can access, filtered by tier
  const { data: coachMap } = await supabase
    .from('coach_knowledge_map')
    .select('insight_id, priority_rank')
    .eq('coach_slug', coachSlug)
    .lte('tier_minimum', tierToRank(clientTier));

  if (!coachMap || coachMap.length === 0) {
    return {
      coachSlug,
      clientProgressionLevel,
      clientFocusAreas: (focusAreas as any)?.map((fa: any) => fa.focus_category) || [],
      applicableInsights: [],
      coachingFramework: {
        topInsight: null,
        alternativeAngles: [],
        questionsToAsk: [],
      },
    };
  }

  // 3. Fetch full insights, filter by level, join with books
  const insightIds = (coachMap as any).map((cm: any) => cm.insight_id);
  const { data: insights } = await supabase
    .from('book_insights')
    .select(
      `
      id,
      book_id,
      level,
      category,
      title,
      content,
      coaching_prompt,
      example_question,
      follow_up_actions,
      created_at,
      books:book_id(
        id,
        slug,
        title,
        author,
        category,
        description,
        source,
        use_case,
        key_concepts,
        coach_persona_tags,
        published_year
      )
    `
    )
    .in('id', insightIds)
    .eq('level', clientProgressionLevel);

  // 4. Filter by focus areas (if any are set)
  let filtered: any = insights || [];
  if (focusAreas && focusAreas.length > 0) {
    const focusCategories = (focusAreas as any).map((fa: any) => fa.focus_category);
    filtered = filtered.filter((i: any) => focusCategories.includes(i.category));
  }

  // 5. Sort by priority rank
  const sorted = filtered.sort((a: any, b: any) => {
    const rankA = (coachMap as any).find((cm: any) => cm.insight_id === a.id)?.priority_rank || 3;
    const rankB = (coachMap as any).find((cm: any) => cm.insight_id === b.id)?.priority_rank || 3;
    return rankA - rankB;
  });

  // Transform to include book relationship
  const transformedInsights: BookInsight[] = sorted.map((i: any) => ({
    ...i,
    book: i.books,
  }));

  return {
    coachSlug,
    clientProgressionLevel,
    clientFocusAreas: (focusAreas as any)?.map((fa: any) => fa.focus_category) || [],
    applicableInsights: transformedInsights,
    coachingFramework: {
      topInsight: transformedInsights[0] || null,
      alternativeAngles: transformedInsights.slice(1, 4),
      questionsToAsk: transformedInsights
        .slice(0, 3)
        .map((i) => i.example_question)
        .filter(Boolean) as string[],
    },
  };
}

/**
 * Unlock insights for a client at a given progression level.
 * Called when: (1) client completes onboarding, (2) trainer selects focus area,
 * (3) coach recommends a topic.
 */
export async function unlockInsightsForProgress(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  progressionLevel: ProgressionLevel,
  reason: UnlockReason
): Promise<number> {
  // Get all insights at this level
  const { data: insights } = await supabase
    .from('book_insights')
    .select('id')
    .eq('level', progressionLevel);

  if (!insights || insights.length === 0) return 0;

  // Check which are already unlocked
  const { data: unlocked } = await supabase
    .from('client_insights_unlocked')
    .select('insight_id')
    .eq('user_id', userId)
    .in(
      'insight_id',
      (insights as any).map((i: any) => i.id)
    );

  const unlockedIds = new Set((unlocked as any)?.map((u: any) => u.insight_id) || []);
  const toUnlock = (insights as any).filter((i: any) => !unlockedIds.has(i.id));

  if (toUnlock.length === 0) return 0;

  const { error } = await supabase.from('client_insights_unlocked').insert(
    toUnlock.map((i: any) => ({
      user_id: userId,
      insight_id: i.id,
      unlocked_reason: reason,
    }))
  );

  if (error) throw error;
  return toUnlock.length;
}

/**
 * When a trainer selects a focus area (e.g. "sleep focus") for a client,
 * unlock all insights in that category.
 */
export async function setClientFocusArea(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  coachSlug: string,
  focusCategory: string,
  adminId?: string,
  expiresAt?: Date
): Promise<void> {
  // Upsert the focus area
  await (supabase as any).from('client_focus_areas').upsert(
    {
      user_id: userId,
      coach_slug: coachSlug,
      focus_category: focusCategory,
      selected_by: adminId,
      selected_at: new Date().toISOString(),
      expires_at: expiresAt?.toISOString(),
    },
    { onConflict: 'user_id,coach_slug,focus_category' }
  );

  // Unlock all insights in this category
  const { data: insights } = await supabase
    .from('book_insights')
    .select('id')
    .eq('category', focusCategory);

  if (!insights || insights.length === 0) return;

  const { data: unlockedRows } = await supabase
    .from('client_insights_unlocked')
    .select('insight_id')
    .eq('user_id', userId)
    .in(
      'insight_id',
      (insights as any).map((i: any) => i.id)
    );

  const unlockedIds = new Set((unlockedRows as any)?.map((u: any) => u.insight_id) || []);
  const toUnlock = (insights as any).filter((i: any) => !unlockedIds.has(i.id));

  if (toUnlock.length > 0) {
    await supabase.from('client_insights_unlocked').insert(
      toUnlock.map((i: any) => ({
        user_id: userId,
        insight_id: i.id,
        unlocked_reason: 'focus-area-selected',
      }))
    );
  }
}

/**
 * Get all unlocked insights for a client, optionally filtered by category.
 */
export async function getClientUnlockedInsights(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  category?: string
): Promise<any[]> {
  let query = supabase
    .from('client_insights_unlocked')
    .select(
      `
      id,
      user_id,
      insight_id,
      unlocked_at,
      unlocked_reason,
      seen_at,
      book_insights:insight_id(
        id,
        book_id,
        level,
        category,
        title,
        content,
        coaching_prompt,
        example_question,
        follow_up_actions,
        created_at,
        books:book_id(
          id,
          slug,
          title,
          author,
          category,
          description,
          source,
          use_case,
          key_concepts,
          coach_persona_tags,
          published_year
        )
      )
    `
    )
    .eq('user_id', userId);

  if (category) {
    query = query.eq('book_insights.category', category);
  }

  const { data, error } = await query;

  if (error) throw error;

  return (data || []).map((row: any) => ({
    ...row,
    insight: row.book_insights,
  }));
}

/**
 * Mark an insight as seen by the client.
 */
export async function markInsightAsSeen(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  insightId: string
): Promise<void> {
  const { error } = await (supabase as any)
    .from('client_insights_unlocked')
    .update({ seen_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('insight_id', insightId);

  if (error) throw error;
}

// Helper: map Tier string to numeric rank for comparison
function tierToRank(tier: Tier): string {
  const ranks: Record<Tier, string> = {
    Free: 'Free',
    'One-Time': 'One-Time',
    Subscription: 'Subscription',
    Premium: 'Premium',
  };
  return ranks[tier];
}
