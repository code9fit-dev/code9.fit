-- Admin workout builder: saved workouts (partial "save day" and "full save").
-- Run once in the Supabase SQL editor. Only the server (service role) reads and writes this table.

create table if not exists admin_workouts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  program_id  text not null,
  status      text not null check (status in ('draft', 'complete')),
  draft       jsonb not null,
  saved_at    timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

alter table admin_workouts enable row level security;
