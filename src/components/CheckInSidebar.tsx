'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { getCheckInHistory } from '@/lib/check-ins/service';
import { ClientCheckIn } from '@/lib/check-ins/types';

interface CheckInSidebarProps {
  coachId: string;
  clientId: string;
  onSelectCheckIn?: (checkIn: ClientCheckIn) => void;
}

export function CheckInSidebar({ coachId, clientId, onSelectCheckIn }: CheckInSidebarProps) {
  const supabase = getSupabaseBrowserClient();
  const [isOpen, setIsOpen] = useState(false);
  const [checkIns, setCheckIns] = useState<ClientCheckIn[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen || !supabase) return;

    setLoading(true);
    getCheckInHistory(supabase, coachId, clientId, 52) // Last year
      .then(setCheckIns)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen, supabase, coachId, clientId]);

  const toggleYear = (year: number) => {
    const updated = new Set(expandedYears);
    if (updated.has(year)) {
      updated.delete(year);
    } else {
      updated.add(year);
    }
    setExpandedYears(updated);
  };

  const toggleMonth = (yearMonth: string) => {
    const updated = new Set(expandedMonths);
    if (updated.has(yearMonth)) {
      updated.delete(yearMonth);
    } else {
      updated.add(yearMonth);
    }
    setExpandedMonths(updated);
  };

  // Group check-ins by year and month
  const grouped = checkIns.reduce((acc, checkIn) => {
    const date = new Date(checkIn.week_of);
    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const yearMonth = `${year}-${month}`;

    if (!acc[year]) acc[year] = {};
    if (!acc[yearMonth]) acc[yearMonth] = [];
    acc[yearMonth].push(checkIn);

    return acc;
  }, {} as Record<string, any>);

  const years = Object.keys(grouped)
    .filter((k) => !isNaN(Number(k)))
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="border-r border-stone-200">
      {/* Header button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-stone-50 border-b border-stone-200"
      >
        <span className="text-sm font-semibold text-stone-900">Check-Ins</span>
        <span className="text-xs bg-accent text-white rounded-full px-2 py-0.5 ml-auto">{checkIns.length}</span>
        <span className="text-stone-400">{isOpen ? '▼' : '▶'}</span>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-xs text-stone-600">Loading...</div>
          ) : checkIns.length === 0 ? (
            <div className="p-4 text-xs text-stone-600">No check-ins yet</div>
          ) : (
            <div className="space-y-1 p-2">
              {years.map((year) => (
                <div key={year}>
                  {/* Year header */}
                  <button
                    onClick={() => toggleYear(year)}
                    className="w-full flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-stone-900 hover:bg-stone-100 rounded"
                  >
                    <span>{expandedYears.has(year) ? '▼' : '▶'}</span>
                    <span>{year}</span>
                    <span className="text-xs text-stone-500 ml-auto">
                      ({Object.keys(grouped).filter((k) => k.startsWith(`${year}-`)).length})
                    </span>
                  </button>

                  {/* Months */}
                  {expandedYears.has(year) && (
                    <div className="ml-2 space-y-1 py-1">
                      {Object.keys(grouped)
                        .filter((k) => k.startsWith(`${year}-`))
                        .sort((a, b) => {
                          const monthA = new Date(`${a}-01`).getMonth();
                          const monthB = new Date(`${b}-01`).getMonth();
                          return monthB - monthA;
                        })
                        .map((yearMonth) => {
                          const monthCheckIns = grouped[yearMonth];
                          const [, monthName] = yearMonth.split('-');

                          return (
                            <div key={yearMonth}>
                              {/* Month header */}
                              <button
                                onClick={() => toggleMonth(yearMonth)}
                                className="w-full flex items-center gap-1 px-3 py-1 text-xs text-stone-700 hover:bg-stone-100 rounded"
                              >
                                <span>{expandedMonths.has(yearMonth) ? '▼' : '▶'}</span>
                                <span>{monthName}</span>
                                <span className="text-xs text-stone-500 ml-auto">({monthCheckIns.length})</span>
                              </button>

                              {/* Check-ins */}
                              {expandedMonths.has(yearMonth) && (
                                <div className="ml-2 space-y-1 py-1">
                                  {monthCheckIns
                                    .sort((a: any, b: any) => new Date(b.week_of).getTime() - new Date(a.week_of).getTime())
                                    .map((checkIn: any) => (
                                      <button
                                        key={checkIn.id}
                                        onClick={() => onSelectCheckIn?.(checkIn)}
                                        className="w-full text-left px-3 py-1.5 text-xs rounded hover:bg-accent hover:text-white transition-colors group"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-medium">
                                            {new Date(checkIn.week_of).toLocaleDateString('en-US', {
                                              month: 'short',
                                              day: 'numeric',
                                            })}
                                          </span>
                                          <span className="text-xs opacity-75 group-hover:opacity-100">
                                            {checkIn.sessions_completed}s
                                          </span>
                                        </div>
                                        <div className="text-xs opacity-75 group-hover:opacity-100">
                                          {checkIn.mood ? `Mood: ${checkIn.mood}` : 'No mood logged'}
                                        </div>
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
