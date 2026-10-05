import { createClient } from '@supabase/supabase-js';
import type { Book, BookInsight } from './types';
import { BOOKS, INSIGHTS } from './seed-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a service-level client (uses service key if available)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function seedKnowledgeBase() {
  console.log('🌱 Seeding knowledge base...');

  try {
    // 1. Insert books
    console.log(`📚 Inserting ${BOOKS.length} books...`);
    const { data: insertedBooks, error: booksError } = await supabase
      .from('books')
      .insert(BOOKS)
      .select();

    if (booksError) throw booksError;
    if (!insertedBooks) throw new Error('No books inserted');

    console.log(`✅ Inserted ${insertedBooks.length} books`);

    // Create a map of book slugs to IDs
    const bookSlugToId = new Map(
      insertedBooks.map((book: Book) => [book.slug, book.id])
    );

    // 2. Insert insights (replace book_id slugs with actual IDs)
    console.log(`💡 Inserting ${INSIGHTS.length} insights...`);
    const insightsWithIds = INSIGHTS.map((insight) => ({
      ...insight,
      book_id: bookSlugToId.get(insight.book_id),
    }));

    const { data: insertedInsights, error: insightsError } = await supabase
      .from('book_insights')
      .insert(insightsWithIds)
      .select();

    if (insightsError) throw insightsError;
    if (!insertedInsights) throw new Error('No insights inserted');

    console.log(`✅ Inserted ${insertedInsights.length} insights`);

    // 3. Set up coach knowledge map (map insights to coaches with priorities)
    console.log('🎯 Setting up coach knowledge mappings...');
    const coachMappings = generateCoachMappings(insertedInsights);

    const { error: mappingError } = await supabase
      .from('coach_knowledge_map')
      .insert(coachMappings);

    if (mappingError) throw mappingError;
    console.log(`✅ Mapped ${coachMappings.length} insight-coach relationships`);

    console.log('✨ Knowledge base seeded successfully!');
    return { success: true, booksCount: insertedBooks.length, insightsCount: insertedInsights.length };
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

/**
 * Generate coach-to-insight mappings based on coach personas and insight categories.
 * This maps which coaches have access to which insights at which priority levels.
 */
function generateCoachMappings(
  insights: (BookInsight & { id: string })[]
): any[] {
  const coachPersonas = [
    'lifestyle-recovery-coach',
    'muscle-gain-strategist',
    'fat-loss-strategist',
    'nutrition-optimizer',
    'strength-coach',
    'endurance-coach',
    'injury-prevention-coach',
    'longevity-optimizer',
  ];

  const mappings: any[] = [];

  // Define which insights are most relevant to each coach
  const coachInsightPreferences: Record<string, { categories: string[]; tiers: string[] }> = {
    'lifestyle-recovery-coach': {
      categories: ['sleep', 'recovery', 'mindset'],
      tiers: ['Free', 'One-Time', 'Subscription', 'Premium'],
    },
    'muscle-gain-strategist': {
      categories: ['training', 'nutrition', 'recovery'],
      tiers: ['One-Time', 'Subscription', 'Premium'],
    },
    'fat-loss-strategist': {
      categories: ['nutrition', 'training', 'mindset'],
      tiers: ['One-Time', 'Subscription', 'Premium'],
    },
    'nutrition-optimizer': {
      categories: ['nutrition', 'recovery', 'mindset'],
      tiers: ['One-Time', 'Subscription', 'Premium'],
    },
    'strength-coach': {
      categories: ['training', 'recovery', 'mindset'],
      tiers: ['One-Time', 'Subscription', 'Premium'],
    },
    'endurance-coach': {
      categories: ['training', 'recovery', 'mindset'],
      tiers: ['One-Time', 'Subscription', 'Premium'],
    },
    'injury-prevention-coach': {
      categories: ['training', 'recovery', 'mindset'],
      tiers: ['One-Time', 'Subscription', 'Premium'],
    },
    'longevity-optimizer': {
      categories: ['sleep', 'nutrition', 'training', 'recovery', 'mindset'],
      tiers: ['Subscription', 'Premium'],
    },
  };

  insights.forEach((insight) => {
    coachPersonas.forEach((coach) => {
      const prefs = coachInsightPreferences[coach];
      if (prefs && prefs.categories.includes(insight.category)) {
        // Determine priority based on relevance
        let priorityRank = 3; // default: low
        if (insight.level === 'beginner') priorityRank = 1; // high priority for beginner content
        if (insight.level === 'intermediate') priorityRank = 2; // medium priority
        if (insight.level === 'advanced') priorityRank = 3; // advanced insights lower priority

        prefs.tiers.forEach((tier) => {
          mappings.push({
            coach_slug: coach,
            insight_id: insight.id,
            tier_minimum: tier,
            priority_rank: priorityRank,
            notes: `Primary insight for ${coach} with ${insight.category} category`,
          });
        });
      }
    });
  });

  return mappings;
}
