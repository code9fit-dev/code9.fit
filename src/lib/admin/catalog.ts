import type { Program } from '@/data/workout-library/types';

export interface CatalogProgram {
  id: string;
  title: string;
  focus: string;
  level: string;
  weeks: number;
  daysPerWeek: number | null;
  equipment: string;
  series: string;
  hasHtml: boolean;
}

export interface CatalogSeries {
  key: string;
  title: string;
  programs: CatalogProgram[];
}

const SERIES: { key: string; title: string; match: (id: string) => boolean }[] = [
  { key: 'fat-to-fit', title: 'Fat-to-Fit', match: (id) => id.startsWith('fat-to-fit') },
  { key: 'hybrid', title: 'Hybrid Training', match: (id) => id.startsWith('hybrid') },
  { key: 'peachy', title: 'Peachy', match: (id) => id.startsWith('peachy') },
  { key: 'lean-bulk', title: 'Lean Bulk', match: (id) => id.startsWith('lean-bulk') },
  { key: 'other', title: 'Other programs', match: () => true },
];

export function buildCatalog(library: Program[], htmlIds: Set<string>): CatalogSeries[] {
  const programs: CatalogProgram[] = library.map((p) => {
    const series = SERIES.find((s) => s.match(p.meta.id))!;
    return {
      id: p.meta.id,
      title: p.meta.title,
      focus: p.focus,
      level: p.meta.level,
      weeks: p.meta.weeks,
      daysPerWeek: p.meta.daysPerWeek ?? null,
      equipment: p.meta.equipment,
      series: series.key,
      hasHtml: htmlIds.has(`code9-${p.meta.id}.html`),
    };
  });

  return SERIES.map((s) => ({
    key: s.key,
    title: s.title,
    programs: programs.filter((p) => p.series === s.key),
  })).filter((s) => s.programs.length > 0);
}
