'use client';

import { useState, useEffect } from 'react';

interface DayStatus {
  day: string;
  date: string;
  status: 'completed' | 'missed' | 'pending' | 'on-hold';
}

interface RecentFeelings {
  energy: number;
  soreness: number;
  sleep: number;
}

interface ProgressData {
  week: number;
  total_weeks: number;
  workouts_completed: number;
  workouts_total: number;
  adherence_percentage: number;
  workouts_on_hold: number;
  week_status: DayStatus[];
  recent_feelings: RecentFeelings;
}

interface Lift {
  name: string;
  current_weight: number;
  previous_weight: number;
  trend: number[];
}

interface StrengthData {
  lifts: Lift[];
}

interface Summary {
  week: number;
  completed: boolean;
  completed_date?: string;
}

interface SummariesData {
  summaries: Summary[];
}

interface WorkoutProgressDashboardProps {
  clientId: string;
}

// Mini bar chart component
function MiniBarChart({ value, max = 10 }: { value: number; max?: number }) {
  const percentage = (value / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-32 bg-panel rounded overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-ink w-10">{value.toFixed(1)}</span>
    </div>
  );
}

// Simple line chart component for strength trends
function SimpleLineChart({ data, label }: { data: number[]; label: string }) {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1 || 1)) * 280;
    const y = 80 - ((value - min) / range) * 60;
    return { x, y, value };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-ink-dim">{label}</p>
      <svg className="w-full" height="100" viewBox="0 0 300 100" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="80" x2="280" y2="80" stroke="var(--line)" strokeWidth="1" />
        {/* Trend line */}
        <path d={pathData} stroke="var(--accent)" strokeWidth="2" fill="none" />
        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="var(--accent)"
          />
        ))}
      </svg>
    </div>
  );
}

// Skeleton loading state
function ProgressSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-panel border border-line rounded-lg p-6 h-40 animate-pulse"
        />
      ))}
    </div>
  );
}

// Status icon component
function StatusIcon({ status }: { status: 'completed' | 'missed' | 'pending' | 'on-hold' }) {
  const icons = {
    completed: { symbol: '✓', color: '#10b981' },
    missed: { symbol: '✗', color: '#ef4444' },
    pending: { symbol: '⏳', color: '#f59e0b' },
    'on-hold': { symbol: '🔄', color: '#3b82f6' },
  };

  const icon = icons[status];
  return <span className="text-lg" style={{ color: icon.color }}>{icon.symbol}</span>;
}

export function WorkoutProgressDashboard({ clientId }: WorkoutProgressDashboardProps) {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [strengthData, setStrengthData] = useState<StrengthData | null>(null);
  const [summariesData, setSummariesData] = useState<SummariesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [progressRes, strengthRes, summariesRes] = await Promise.all([
          fetch(`/api/workouts/client/${clientId}/progress`),
          fetch(`/api/workouts/client/${clientId}/progress`),
          fetch(`/api/workouts/client/${clientId}/summary`),
        ]);

        if (!progressRes.ok || !summariesRes.ok) {
          throw new Error('Failed to fetch workout data');
        }

        const progress = await progressRes.json();
        const summaries = await summariesRes.json();
        let strength = null;

        if (strengthRes.ok) {
          strength = await strengthRes.json();
        }

        setProgressData(progress);
        setStrengthData(strength);
        setSummariesData(summaries);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Failed to fetch workout progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Optional auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [clientId]);

  if (loading) {
    return <ProgressSkeleton />;
  }

  if (error || !progressData) {
    return (
      <div className="bg-panel border border-line rounded-lg p-6 text-center">
        <p className="text-ink-dim">{error || 'Failed to load workout progress'}</p>
      </div>
    );
  }

  const workoutPercentage = Math.round(
    (progressData.workouts_completed / progressData.workouts_total) * 100
  );
  const programPercentage = Math.round(
    ((progressData.week - 1) / progressData.total_weeks) * 100
  );

  return (
    <div className="space-y-6">
      {/* THIS WEEK SECTION */}
      <div className="bg-panel border border-line rounded-lg p-6">
        <div className="mb-6">
          <h2 className="font-display text-[28px] font-semibold text-ink mb-4">This Week</h2>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-ink-dim">
              Workouts Completed: <span className="text-ink font-semibold">{progressData.workouts_completed}/{progressData.workouts_total}</span> ({workoutPercentage}%)
            </span>
          </div>

          {/* Week overview cards */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
            {progressData.week_status.map((day, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2 sm:p-3 bg-surface border border-line rounded hover:border-accent hover:bg-panel transition-all"
              >
                <span className="text-xs text-ink-dim font-mono uppercase mb-1 text-center">{day.day.slice(0, 1)}</span>
                <StatusIcon status={day.status} />
                <span className="text-xs text-ink-dim mt-1 text-center hidden sm:block">{day.date.slice(5)}</span>
              </div>
            ))}
          </div>

          {/* Recent feelings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-ink text-sm">Recent Feelings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-ink-dim mb-2 block">Energy</label>
                <MiniBarChart value={progressData.recent_feelings.energy} max={10} />
              </div>
              <div>
                <label className="text-sm text-ink-dim mb-2 block">Soreness</label>
                <MiniBarChart value={progressData.recent_feelings.soreness} max={10} />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-ink-dim">Sleep</label>
                <span className="text-sm font-semibold text-ink">
                  {progressData.recent_feelings.sleep.toFixed(1)} hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRAM PROGRESS SECTION */}
      <div className="bg-panel border border-line rounded-lg p-6">
        <h2 className="font-display text-[28px] font-semibold text-ink mb-6">Program Progress</h2>
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-dim">
              Week <span className="text-ink font-semibold">{progressData.week}/{progressData.total_weeks}</span>
            </span>
            <span className="text-sm text-accent font-semibold">{programPercentage}%</span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${programPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-ink-dim font-mono uppercase mb-2">Adherence</p>
            <p className="text-3xl font-display font-semibold text-accent">{progressData.adherence_percentage}%</p>
          </div>
          <div>
            <p className="text-xs text-ink-dim font-mono uppercase mb-2">Workouts on Hold</p>
            <p className="text-3xl font-display font-semibold text-accent">{progressData.workouts_on_hold}</p>
          </div>
        </div>

        <button className="btn-secondary w-full">
          View All Weeks
        </button>
      </div>

      {/* STRENGTH PROGRESSION SECTION */}
      {strengthData && strengthData.lifts && strengthData.lifts.length > 0 && (
        <div className="bg-panel border border-line rounded-lg p-6">
          <h2 className="font-display text-[28px] font-semibold text-ink mb-6">Strength Progression</h2>
          <div className="space-y-6">
            {strengthData.lifts.map((lift, idx) => (
              <div key={idx} className="border-b border-line pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-semibold text-ink">{lift.name}</h3>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-ink-dim text-xs font-mono uppercase mb-1">Current</p>
                        <p className="font-semibold text-accent text-lg">{lift.current_weight} <span className="text-xs">lbs</span></p>
                      </div>
                      <div>
                        <p className="text-ink-dim text-xs font-mono uppercase mb-1">Previous</p>
                        <p className="text-ink-dim">{lift.previous_weight} <span className="text-xs">lbs</span></p>
                      </div>
                      <div>
                        <p className="text-ink-dim text-xs font-mono uppercase mb-1">Gain</p>
                        <p className={`font-semibold text-lg ${lift.current_weight > lift.previous_weight ? 'text-green-600' : 'text-ink-dim'}`}>
                          {lift.current_weight - lift.previous_weight > 0 ? '+' : ''}{lift.current_weight - lift.previous_weight} <span className="text-xs">lbs</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <SimpleLineChart data={lift.trend} label={`${lift.name} Trend`} />
              </div>
            ))}
          </div>
          <button className="btn-secondary mt-6">
            View Details
          </button>
        </div>
      )}

      {/* 3/6/9 WEEK SUMMARIES SECTION */}
      {summariesData && summariesData.summaries && summariesData.summaries.length > 0 && (
        <div className="bg-panel border border-line rounded-lg p-6">
          <h2 className="font-display text-[28px] font-semibold text-ink mb-6">Week Summaries</h2>
          <div className="space-y-3">
            {summariesData.summaries.map((summary, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-surface border border-line rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-ink">Week {summary.week}</span>
                  {summary.completed && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Completed</span>
                  )}
                </div>
                {summary.completed ? (
                  <button className="text-xs font-semibold text-accent border border-accent px-3 py-1.5 rounded transition-colors hover:bg-accent hover:text-on-accent">
                    View
                  </button>
                ) : (
                  <span className="text-xs text-ink-dim">
                    Ready in 3 weeks
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
