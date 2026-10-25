import { createClient } from '@supabase/supabase-js';
import { getClientUnlockedInsights, markInsightAsSeen } from '@/lib/knowledge-base/retrieve';
import { InsightCard } from './InsightCard';
import { redirect } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function markSeen(insightId: string, userId: string) {
  'use server';
  try {
    await markInsightAsSeen(supabase as any, userId, insightId);
  } catch (error) {
    console.error('Failed to mark insight as seen:', error);
  }
}

export default async function InsightsPage() {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isDev = process.env.NODE_ENV === 'development';

  if (!user && !isDev) {
    redirect('/login');
  }

  const userId = user?.id || 'dev-user';

  // Get client's unlocked insights
  const insights = await getClientUnlockedInsights(supabase as any, userId);

  const groupedByCategory = insights.reduce(
    (acc, insight) => {
      const category = insight.insight?.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(insight);
      return acc;
    },
    {} as Record<string, typeof insights>
  );

  const categories = [
    'sleep',
    'nutrition',
    'training',
    'recovery',
    'mindset',
  ];

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-stone-900'>Your Insights</h1>
        <p className='mt-2 text-stone-600'>
          Curated wisdom from fitness and wellness books to guide your journey
        </p>
      </div>

      {insights.length === 0 ? (
        <div className='rounded border border-amber-200 bg-amber-50 p-4'>
          <p className='text-sm text-amber-900'>
            No insights unlocked yet. Complete your onboarding or reach out to your coach to unlock insights.
          </p>
        </div>
      ) : (
        <div className='space-y-8'>
          {categories.map((category) => {
            const categoryInsights = groupedByCategory[category] || [];
            if (categoryInsights.length === 0) return null;

            return (
              <div key={category}>
                <h2 className='mb-4 text-xl font-semibold capitalize text-stone-900'>
                  {category}
                </h2>
                <div className='space-y-3'>
                  {categoryInsights.map((insight: any) => (
                    <InsightCard
                      key={insight.id}
                      insight={insight}
                      onSeen={() => markSeen(insight.insight_id, user.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
