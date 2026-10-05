# Supabase setup — C9F auth + data layer

The app runs on a localStorage store today. Point it at Supabase to get real
accounts, durable + cross-device data, GDPR-grade consent, and the multi-role
foundation for the human-coach marketplace. Until the keys below are set, the
app keeps using localStorage (nothing breaks).

## 1. Create the project
1. Go to https://supabase.com → **New project**. Pick a region close to your users.
2. Wait for it to provision.

## 2. Create the schema
1. Open **SQL Editor** → paste the contents of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
2. This creates the tables (profiles, consent, coach_tiers, chats, plans, logs,
   coaches_human, availability, bookings), row-level-security policies, and a
   trigger that auto-creates a `profiles` row on sign-up.

## 3. Copy the keys
**Project Settings → API**, then put these in `c9f-web/.env.local`:

| .env.local var | Where |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project API keys → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Project API keys → `service_role` (server-only, keep secret) |

## 4. Restart
`npm run dev -- -p 9099` (env is read at boot). Check `/admin` → the **Supabase**
key light turns green.

## What's next (once keys are in)
- Auth screens (sign up / sign in) wired to Supabase, replacing the email-only
  identity — admin role recognised via `profiles.role`.
- Swap the store's internals (`src/lib/store/store.ts`) from localStorage reads/
  writes to Supabase queries — the hook + mutator surface stays the same, so
  every screen keeps working.
- Wire the Lemon Squeezy webhook to persist tier unlocks into `coach_tiers`.

## Admin
The admin email (`code9.fit@proton.me`) will map to `profiles.role = 'admin'`.
Set that role on your row after first sign-in:
`update profiles set role = 'admin' where email = 'code9.fit@proton.me';`
