import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { adminFrom } from '@/lib/admin/session';
import { COMMON_EXERCISES } from '@/lib/exercises/database';
import { DAY_TYPES, type DraftDay } from '@/lib/workout-builder/draft';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MODEL = 'claude-sonnet-5';
const MAX_EXERCISES_PER_DAY = 10;
const MAX_DAYS = 7;

const SYSTEM = `You write training programs for the CODE9 Fitness library. Output JSON only, no prose.

Schema: {"days":[{"day":number,"title":string,"type":"strength"|"hiit"|"cardio"|"recovery"|"rest"|"mobility","exercises":[{"name":string,"sets":number,"reps":string,"notes":string}]}]}

Rules:
- Use the house exercise names listed below when they fit; otherwise use a clear standard name.
- "reps" is text: "8-10", "12", "AMRAP", "30s" for timed work.
- Strength days lead with the main compound lift, then accessories. HIIT days use rounds in notes.
- Rest and recovery days have an empty exercises array or light mobility.
- Keep sets between 1 and 6 and no more than ${MAX_EXERCISES_PER_DAY} exercises per day.
- Match the level, goals, equipment and number of days requested.

House exercises: `;

interface AiRequest {
  prompt: string;
  level: string;
  goals: string[];
  equipment: string;
  daysPerWeek: number;
}

function parseDays(text: string): DraftDay[] {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < 0) throw new Error('No JSON in model output');
  const raw = JSON.parse(text.slice(start, end + 1));
  if (!Array.isArray(raw?.days)) throw new Error('Missing days array');

  return raw.days.slice(0, MAX_DAYS).map((d: any, i: number): DraftDay => ({
    day: i + 1,
    title: String(d?.title ?? `Day ${i + 1}`).slice(0, 80),
    type: DAY_TYPES.includes(d?.type) ? d.type : 'strength',
    exercises: (Array.isArray(d?.exercises) ? d.exercises : [])
      .slice(0, MAX_EXERCISES_PER_DAY)
      .filter((e: any) => typeof e?.name === 'string' && e.name.trim())
      .map((e: any) => ({
        name: String(e.name).slice(0, 120),
        sets: Math.min(6, Math.max(1, Number(e.sets) || 3)),
        reps: String(e.reps ?? '8-10').slice(0, 30),
        ...(e.notes ? { notes: String(e.notes).slice(0, 200) } : {}),
      })),
  }));
}

export async function POST(req: NextRequest) {
  if (!adminFrom(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not set' }, { status: 500 });
  }

  const body = (await req.json().catch(() => null)) as AiRequest | null;
  if (!body?.prompt?.trim()) return NextResponse.json({ error: 'Describe the program first' }, { status: 400 });
  const daysPerWeek = Math.min(7, Math.max(1, Number(body.daysPerWeek) || 3));

  const names = COMMON_EXERCISES.map((e) => e.name).join(', ');
  const client = new Anthropic();
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 3000,
    system: SYSTEM + names,
    messages: [
      {
        role: 'user',
        content: `Program request: ${body.prompt}\nLevel: ${body.level}\nGoals: ${body.goals.join(', ')}\nEquipment: ${body.equipment}\nTraining days per week: ${daysPerWeek} (if the request names a different number of days, follow the request)`,
      },
    ],
  });

  const text = message.content.map((c) => (c.type === 'text' ? c.text : '')).join('');
  try {
    return NextResponse.json({ days: parseDays(text) });
  } catch {
    return NextResponse.json({ error: 'The AI reply could not be read. Try again or reword the request.' }, { status: 502 });
  }
}
