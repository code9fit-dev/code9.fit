'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CatalogSeries } from '@/lib/admin/catalog';

const DAY_OPTIONS = [3, 4, 5, 6];

const chip = 'rounded-full px-3 py-1 text-sm font-semibold';
const chipOn = { background: 'var(--accent)', color: 'var(--on-accent)' };
const chipOff = { border: '1px solid var(--line)', color: 'var(--ink)', background: 'transparent' };

export function ProgramCatalog({ series }: { series: CatalogSeries[] }) {
  const [seriesFilter, setSeriesFilter] = useState<string>('all');
  const [dayFilter, setDayFilter] = useState<number | 'all'>('all');

  const visible = series
    .filter((s) => seriesFilter === 'all' || s.key === seriesFilter)
    .map((s) => ({
      ...s,
      programs: s.programs.filter((p) => dayFilter === 'all' || p.daysPerWeek === dayFilter),
    }))
    .filter((s) => s.programs.length > 0);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button className={chip} style={seriesFilter === 'all' ? chipOn : chipOff} onClick={() => setSeriesFilter('all')}>
            All series
          </button>
          {series.map((s) => (
            <button
              key={s.key}
              className={chip}
              style={seriesFilter === s.key ? chipOn : chipOff}
              onClick={() => setSeriesFilter(s.key)}
            >
              {s.title}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--ink-dim)' }}>Days a week</span>
          <button className={chip} style={dayFilter === 'all' ? chipOn : chipOff} onClick={() => setDayFilter('all')}>
            Any
          </button>
          {DAY_OPTIONS.map((d) => (
            <button key={d} className={chip} style={dayFilter === d ? chipOn : chipOff} onClick={() => setDayFilter(d)}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 && (
        <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>No programs match these filters.</p>
      )}

      {visible.map((s) => (
        <section key={s.key} className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <span className="text-sm" style={{ color: 'var(--ink-dim)' }}>
              {s.programs.length} {s.programs.length === 1 ? 'program' : 'programs'}
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {s.programs.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-3 rounded-lg border p-5"
                style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}
              >
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                  {p.level}
                </span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
                    {p.daysPerWeek ?? '—'} days · {p.equipment} · {p.weeks} weeks
                  </p>
                </div>
                <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>{p.focus}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <Link href={`/admin/program/${p.id}`} className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                    View program →
                  </Link>
                  {p.hasHtml && (
                    <Link href={`/admin/workout-viewer/${p.id}`} className="text-xs font-semibold" style={{ color: 'var(--ink-dim)' }}>
                      HTML breakdown
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
