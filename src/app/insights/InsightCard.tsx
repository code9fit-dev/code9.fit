'use client';

import { useState } from 'react';
import type { ClientInsightUnlocked } from '@/lib/knowledge-base/types';

interface InsightCardProps {
  insight: ClientInsightUnlocked & {
    insight?: {
      id: string;
      title: string;
      content: string;
      category: string;
      level: string;
      book?: {
        title: string;
        author: string;
        slug: string;
      };
    };
  };
  onSeen?: () => void;
}

export function InsightCard({ insight, onSeen }: InsightCardProps) {
  const [expanded, setExpanded] = useState(false);
  const insightData = insight.insight;

  if (!insightData) return null;

  const handleExpand = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (newExpanded && onSeen) {
      onSeen();
    }
  };

  return (
    <div className='rounded border border-stone-200 bg-white p-4'>
      {/* Header */}
      <div className='flex items-start justify-between gap-3'>
        <div className='flex-1'>
          <div className='text-xs font-mono uppercase tracking-wide text-stone-500'>
            {insightData.book?.title}
          </div>
          <h3 className='mt-1 text-base font-semibold text-stone-900'>
            {insightData.title}
          </h3>
          <div className='mt-1 flex gap-2'>
            <span className='inline-block rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700'>
              {insightData.category}
            </span>
            <span className='inline-block rounded bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600'>
              {insightData.level}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className='mt-4 space-y-3 border-t border-stone-100 pt-4'>
          <div className='text-sm leading-relaxed text-stone-700'>
            {insightData.content}
          </div>
          {insightData.book && (
            <div className='text-xs text-stone-500'>
              By {insightData.book.author}
            </div>
          )}
          {insight.seen_at && (
            <div className='text-xs text-green-600'>✓ Seen</div>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={handleExpand}
        className='mt-3 text-xs font-mono uppercase tracking-wide text-blue-600 hover:underline'
      >
        {expanded ? 'Hide' : 'Learn more'}
      </button>
    </div>
  );
}
