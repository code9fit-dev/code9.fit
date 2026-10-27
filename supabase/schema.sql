-- Code9 Fitness — data layer schema (v1)
-- Run in the Supabase SQL editor. Multi-role from day one (client / human_coach
-- / admin) so the human-coach marketplace layers on without a migration.
-- Everything is row-level-security protected: a user sees only their own rows;
-- admins see all; bookings are visible to the two parties involved.

-- ─── enums ───────────────────────────────────────────────────────────────
create type user_role as enum ('client', 'human_coach', 'admin');
create type coach_status as enum ('pending', 'active', 'suspended');
create type booking_status as enum ('proposed', 'confirmed', 'completed', 'cancelled');

-- ─── profiles (1:1 with auth.users) ──────────────────────────────────────
create table profiles (
  id           uuid primary key references auth.users on delete cascade,
  email        text,
  display_name text,
  role         user_role not null default 'client',
  created_at   timestamptz not null default now()
);

-- helper: is the current user an admin?
create or replace function is_admin() returns boolean
  language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin');
$$;

-- ─── GDPR consent, per category (§2.1) ───────────────────────────────────
create table consent (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  category   text not null,            -- 'health_data' | 'body_scan' | ...
  granted    boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, category)
);

-- ─── per-coach tier (source of truth; webhook writes here) ───────────────
create table coach_tiers (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  coach_slug  text not null,
  tier        text not null,           -- Free | One-Time | Subscription | Premium
  unlocked_at timestamptz not null default now(),
  unique (user_id, coach_slug)
);

-- ─── chats (jsonb mirrors the client store shape) ────────────────────────
create table chats (
  user_id    uuid not null references auth.users on delete cascade,
  coach_slug text not null,
  messages   jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, coach_slug)
);

-- ─── plans + progress ────────────────────────────────────────────────────
create table plans (
  user_id    uuid not null references auth.users on delete cascade,
  coach_slug text not null,
  plan       jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, coach_slug)
);

-- ─── logs (weigh-ins / check-ins → feeds Subscription adaptation, §2.7) ───
create table logs (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  type       text not null,
  payload    jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ─── human coach marketplace ─────────────────────────────────────────────
create table coaches_human (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null unique references auth.users on delete cascade,
  specialty_slug     text not null,       -- maps to one of the 9 AI personas
  bio                text,
  credentials        text,
  insurance_verified boolean not null default false,
  stripe_connect_id  text,                -- payouts via Stripe Connect
  status             coach_status not null default 'pending',
  created_at         timestamptz not null default now()
);

create table availability (
  id            uuid primary key default gen_random_uuid(),
  coach_user_id uuid not null references auth.users on delete cascade,
  weekday       smallint not null,        -- 0=Sun .. 6=Sat
  start_minute  smallint not null,        -- minutes from midnight
  end_minute    smallint not null
);

-- GodFather books these; disclosure snapshot is captured for both parties.
create table bookings (
  id               uuid primary key default gen_random_uuid(),
  client_user_id   uuid not null references auth.users on delete cascade,
  coach_user_id    uuid not null references auth.users on delete cascade,
  coach_slug       text not null,
  status           booking_status not null default 'proposed',
  service_fee_cents integer not null default 0,
  finder_fee_cents  integer not null default 0,   -- GodFather's take (both sides)
  disclosure       jsonb not null default '{}'::jsonb,
  scheduled_at     timestamptz,
  created_at       timestamptz not null default now()
);

-- ─── free download signups (for email marketing follow-ups) ───────────────
create table free_download_signups (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  package_id text not null,                -- 'bundle-3x4' | 'bundle-4x4' | 'session-tracker'
  created_at timestamptz not null default now()
);

-- ─── row-level security ──────────────────────────────────────────────────
alter table profiles              enable row level security;
alter table consent               enable row level security;
alter table coach_tiers           enable row level security;
alter table chats                 enable row level security;
alter table plans                 enable row level security;
alter table logs                  enable row level security;
alter table coaches_human         enable row level security;
alter table availability          enable row level security;
alter table bookings              enable row level security;
alter table free_download_signups enable row level security;

-- profiles: read/update your own; admins read all
create policy "own profile"     on profiles for select using (id = auth.uid() or is_admin());
create policy "update own profile" on profiles for update using (id = auth.uid());
create policy "insert own profile" on profiles for insert with check (id = auth.uid());

-- owner-only tables (client's own data); admins may read
create policy "own consent"      on consent      for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own tiers"        on coach_tiers  for all using (user_id = auth.uid() or is_admin()) with check (user_id = auth.uid());
create policy "own chats"        on chats        for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own plans"        on plans        for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own logs"         on logs         for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- coach profiles: the coach manages their own; anyone signed-in can read ACTIVE coaches (for matching)
create policy "own coach row"    on coaches_human for all using (user_id = auth.uid() or is_admin()) with check (user_id = auth.uid());
create policy "read active coaches" on coaches_human for select using (status = 'active' or user_id = auth.uid() or is_admin());
create policy "own availability" on availability for all using (coach_user_id = auth.uid() or is_admin()) with check (coach_user_id = auth.uid());

-- bookings: visible to the client and the coach on the booking (and admins)
create policy "booking parties" on bookings for select
  using (client_user_id = auth.uid() or coach_user_id = auth.uid() or is_admin());
create policy "client creates booking" on bookings for insert with check (client_user_id = auth.uid());
create policy "parties update booking" on bookings for update
  using (client_user_id = auth.uid() or coach_user_id = auth.uid() or is_admin());

-- free download signups: admins can view for follow-ups, service can insert
create policy "read free downloads" on free_download_signups for select using (is_admin());
create policy "insert free downloads" on free_download_signups for insert with check (true);

-- auto-create a profile row on sign-up
create or replace function handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ─── v3.0 knowledge base: fitness books + curated insights ───────────────

-- books: catalog of 30+ wellness books from multiple sources
create table books (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  author           text not null,
  category         text not null,        -- 'habits' | 'nutrition' | 'training' | 'sleep' | 'longevity' | 'mental-health' | 'women-health'
  description      text,
  source           text,                  -- "Forbes Wellness List" | "healthynexercise.com"
  use_case         text,                  -- e.g. "Best for clients who don't get 8 hours of sleep"
  key_concepts     text[],               -- tags for retrieval
  coach_persona_tags text[],             -- which coaches benefit most
  published_year   integer,
  created_at       timestamptz not null default now()
);

-- book_insights: curated insights at different progression levels
create table book_insights (
  id               uuid primary key default gen_random_uuid(),
  book_id          uuid not null references books on delete cascade,
  level            text not null,        -- 'beginner' | 'intermediate' | 'advanced'
  category         text not null,        -- 'sleep' | 'nutrition' | 'training' | 'recovery' | 'mindset'
  title            text not null,
  content          text not null,        -- curated insight (150-300 words)
  coaching_prompt  text,                 -- how coaches should approach this topic
  example_question text,                 -- concrete question coaches can ask
  follow_up_actions text[],              -- actionable next steps
  created_at       timestamptz not null default now()
);

-- coach_knowledge_map: which insights are available to which coaches
create table coach_knowledge_map (
  id               uuid primary key default gen_random_uuid(),
  coach_slug       text not null,        -- e.g. "lifestyle-recovery-coach"
  insight_id       uuid not null references book_insights on delete cascade,
  tier_minimum     text not null,        -- Free | One-Time | Subscription | Premium
  priority_rank    smallint not null default 3, -- 1 = high, 3 = low
  notes            text,                 -- context-specific notes
  unique (coach_slug, insight_id)
);

-- client_insights_unlocked: tracks what each client has unlocked
create table client_insights_unlocked (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  insight_id       uuid not null references book_insights on delete cascade,
  unlocked_at      timestamptz not null default now(),
  unlocked_reason  text,                 -- 'progression-level' | 'focus-area-selected' | 'coach-recommended'
  seen_at          timestamptz,          -- when client actually viewed it
  unique (user_id, insight_id)
);

-- client_focus_areas: trainer selects what a client should focus on
create table client_focus_areas (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  coach_slug       text not null,
  focus_category   text not null,        -- 'sleep' | 'nutrition' | 'training' | 'recovery' | 'mindset'
  selected_by      uuid,                 -- trainer/admin who selected it
  selected_at      timestamptz not null default now(),
  expires_at       timestamptz,
  unique (user_id, coach_slug, focus_category)
);

-- ─── row-level security for knowledge base tables ────────────────────────
alter table books                    enable row level security;
alter table book_insights            enable row level security;
alter table coach_knowledge_map       enable row level security;
alter table client_insights_unlocked  enable row level security;
alter table client_focus_areas        enable row level security;

-- books & insights: publicly readable; admins can write
create policy "read books"           on books for select using (true);
create policy "admin books"          on books for all using (is_admin());

create policy "read insights"        on book_insights for select using (true);
create policy "admin insights"       on book_insights for all using (is_admin());

create policy "read coach map"       on coach_knowledge_map for select using (true);
create policy "admin coach map"      on coach_knowledge_map for all using (is_admin());

-- client unlocked: see own; admins see all
create policy "own unlocked insights" on client_insights_unlocked for all using (user_id = auth.uid() or is_admin());

-- focus areas: see own; admins see all
create policy "own focus areas"      on client_focus_areas for all using (user_id = auth.uid() or is_admin());
create policy "admin focus areas"    on client_focus_areas for all using (is_admin());

-- ─── v3.0 client check-ins: weekly tracking for coach assessment ──────────
-- coach_client_relationships: track which coaches work with which clients
create table coach_client_relationships (
  id            uuid primary key default gen_random_uuid(),
  coach_id      uuid not null references auth.users on delete cascade,
  client_id     uuid not null references auth.users on delete cascade,
  coach_slug    text not null,
  created_at    timestamptz not null default now(),
  unique (coach_id, client_id, coach_slug)
);

-- client_check_ins: weekly check-in submitted via coach chat
create table client_check_ins (
  id                uuid primary key default gen_random_uuid(),
  coach_id          uuid not null references auth.users on delete cascade,
  client_id         uuid not null references auth.users on delete cascade,
  coach_slug        text not null,
  week_of           date not null,                    -- week starting date
  sessions_completed integer not null,                -- 0-4+
  missed_reason     text,                             -- 'no time' | 'no energy' | etc
  mood              text,                             -- one word
  sleep_hours       float,
  physical_issues   text,                             -- pain/soreness/dizziness notes
  next_week_plan    jsonb not null default '[]'::jsonb, -- [{day: "Mon", type: "Strength"}, ...]
  notes             text,                             -- life context
  submitted_at      timestamptz not null default now(),
  created_at        timestamptz not null default now(),
  unique (client_id, coach_id, week_of)
);

-- client_session_logs: individual session tracking
create table client_session_logs (
  id                uuid primary key default gen_random_uuid(),
  coach_id          uuid not null references auth.users on delete cascade,
  client_id         uuid not null references auth.users on delete cascade,
  coach_slug        text not null,
  session_date      date not null,
  session_type      text not null,                    -- 'Strength' | 'Cardio' | 'Mobility' | 'Rest-active'
  exercises         jsonb not null default '[]'::jsonb, -- [{name, sets: [{weight, reps, rpe}]}]
  overall_effort    integer,                          -- 1-10
  win_of_day        text,
  next_time_beat    text,
  notes             text,
  submitted_at      timestamptz not null default now(),
  created_at        timestamptz not null default now()
);

-- ─── RLS for check-in tables ──────────────────────────────────────────────
alter table coach_client_relationships enable row level security;
alter table client_check_ins          enable row level security;
alter table client_session_logs       enable row level security;

-- coach_client: coaches see their own relationships; clients see theirs; admins see all
create policy "coach sees own clients" on coach_client_relationships
  for select using (coach_id = auth.uid() or client_id = auth.uid() or is_admin());

-- check-ins: coach sees own clients' check-ins; clients see their own; admins see all
create policy "coach sees client check-ins" on client_check_ins
  for select using (coach_id = auth.uid() or client_id = auth.uid() or is_admin());
create policy "client submits own check-in" on client_check_ins
  for insert with check (client_id = auth.uid());
create policy "client updates own check-in" on client_check_ins
  for update using (client_id = auth.uid());

-- session logs: same as check-ins
create policy "coach sees session logs" on client_session_logs
  for select using (coach_id = auth.uid() or client_id = auth.uid() or is_admin());
create policy "client submits session log" on client_session_logs
  for insert with check (client_id = auth.uid());
create policy "client updates session log" on client_session_logs
  for update using (client_id = auth.uid());

-- ─── v3.0 program/package gating ───────────────────────────────────────
-- coach_grants: coaches can grant clients access to specific packages
create table coach_grants (
  id            uuid primary key default gen_random_uuid(),
  coach_id      uuid not null references auth.users on delete cascade,
  client_id     uuid not null references auth.users on delete cascade,
  package_id    text not null,                        -- e.g. "hybrid-intro-focus"
  granted_at    timestamptz not null default now(),
  expires_at    timestamptz,                          -- null = lifetime access
  created_at    timestamptz not null default now(),
  unique (client_id, package_id, coach_id)
);

alter table coach_grants enable row level security;

-- coaches manage their grants; clients see grants to them; admins see all
create policy "coach grants own" on coach_grants
  for all using (coach_id = auth.uid() or is_admin()) with check (coach_id = auth.uid());
create policy "client sees own grants" on coach_grants
  for select using (client_id = auth.uid());

-- ─── Phase 1: Workout logging & session tracking ─────────────────────────
-- workout_sessions: main tracking for each workout day
create table workout_sessions (
  id               uuid primary key default gen_random_uuid(),
  client_id        uuid not null references auth.users on delete cascade,
  program_id       text not null,               -- e.g. "hybrid-focus-intermediate"
  week             integer,                     -- week of program
  day              integer,                     -- day within week (1-7)
  planned_date     date not null,
  status           text not null default 'pending', -- pending | completed | missed | on_hold
  completed_date   timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- session_exercises: individual exercise logs per session
create table session_exercises (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null references workout_sessions on delete cascade,
  name             text not null,
  planned_sets     integer,
  planned_reps     integer,
  planned_weight   decimal,
  actual_sets      integer,
  actual_reps      integer,
  actual_weight    decimal,
  notes            text,
  created_at       timestamptz not null default now()
);

-- session_missed: captures reason when workout is skipped
create table session_missed (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null unique references workout_sessions on delete cascade,
  reason           text,                       -- sick | tired | busy | injury | other
  details          text,
  on_hold_until    date,                       -- when resuming
  created_at       timestamptz not null default now()
);

-- session_feelings: post-workout metrics
create table session_feelings (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null unique references workout_sessions on delete cascade,
  energy_level     integer,                    -- 1-10
  soreness         integer,                    -- 1-10
  mood             integer,                    -- 1-10
  sleep_hours      decimal,
  sleep_quality    integer,                    -- 1-10
  created_at       timestamptz not null default now()
);

-- session_ai_summaries: AI-generated insights (optional)
create table session_ai_summaries (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null unique references workout_sessions on delete cascade,
  summary          text,
  generated_at     timestamptz not null default now()
);

-- ─── Row-level security for workout tables ────────────────────────────────
alter table workout_sessions     enable row level security;
alter table session_exercises    enable row level security;
alter table session_missed       enable row level security;
alter table session_feelings     enable row level security;
alter table session_ai_summaries enable row level security;

-- workout_sessions: client sees own; admins see all
create policy "client sessions"  on workout_sessions
  for all using (client_id = auth.uid() or is_admin()) with check (client_id = auth.uid());

-- related tables: visible through session ownership
create policy "session exercises" on session_exercises
  for all using (
    exists (select 1 from workout_sessions ws where ws.id = session_exercises.session_id and ws.client_id = auth.uid())
    or is_admin()
  );

create policy "session missed"    on session_missed
  for all using (
    exists (select 1 from workout_sessions ws where ws.id = session_missed.session_id and ws.client_id = auth.uid())
    or is_admin()
  );

create policy "session feelings"  on session_feelings
  for all using (
    exists (select 1 from workout_sessions ws where ws.id = session_feelings.session_id and ws.client_id = auth.uid())
    or is_admin()
  );

create policy "session summaries" on session_ai_summaries
  for all using (
    exists (select 1 from workout_sessions ws where ws.id = session_ai_summaries.session_id and ws.client_id = auth.uid())
    or is_admin()
  );
