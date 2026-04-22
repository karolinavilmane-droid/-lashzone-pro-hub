-- ─────────────────────────────────────────────────────────────────────────────
-- LashZone Pro Hub — initial Supabase schema
--
-- Run this in: Supabase dashboard → SQL Editor → New query → Run
-- ─────────────────────────────────────────────────────────────────────────────


-- ── user_access ───────────────────────────────────────────────────────────────
-- One row per (user, resource) pair that has been granted.
-- Populated by:
--   • Admin: insert manually via Supabase dashboard
--   • Stripe: your webhook handler inserts after successful payment
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.user_access (
  id               uuid        default gen_random_uuid() primary key,
  user_id          uuid        not null references auth.users(id) on delete cascade,
  resource_id      text        not null,   -- matches Resource.id in products.ts
  granted_at       timestamptz default now() not null,
  granted_by       text        not null default 'admin',  -- 'admin' | 'stripe' | 'manual'
  stripe_session_id text,                  -- Stripe Checkout session ID (optional)
  unique (user_id, resource_id)
);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Users can only read their own access rows.
-- Inserts are done server-side (admin panel or webhook) — never from the client.
alter table public.user_access enable row level security;

create policy "Users can read own access"
  on public.user_access
  for select
  using (auth.uid() = user_id);


-- ─────────────────────────────────────────────────────────────────────────────
-- STRIPE WEBHOOK — how to grant access after payment
--
-- When a Stripe Checkout session completes, your webhook handler should run:
--
--   insert into public.user_access (user_id, resource_id, granted_by, stripe_session_id)
--   values (
--     '<supabase-user-uuid>',      -- look up by customer email
--     '<resource-id>',             -- e.g. 'checklist'
--     'stripe',
--     '<stripe-session-id>'
--   )
--   on conflict (user_id, resource_id) do nothing;
--
-- You can do this from:
--   • A Supabase Edge Function (recommended — serverless, no infra needed)
--   • Your existing Express server (src/server.ts)
--   • A third-party tool like Zapier or Make
--
-- Use the Supabase service-role key (not anon) for the insert so RLS is bypassed.
-- ─────────────────────────────────────────────────────────────────────────────


-- ─────────────────────────────────────────────────────────────────────────────
-- MANUAL GRANT — give a specific client access via dashboard
--
-- In Supabase dashboard → Table Editor → user_access → Insert row:
--   user_id     = <uuid from auth.users>
--   resource_id = 'checklist'          (or any Resource.id)
--   granted_by  = 'admin'
-- ─────────────────────────────────────────────────────────────────────────────


-- ─────────────────────────────────────────────────────────────────────────────
-- SUPABASE STORAGE — private-documents bucket
--
-- Create in: Supabase dashboard → Storage → New bucket
--   Name:    private-documents
--   Public:  OFF  (private — requires signed URL)
--
-- Upload paid PDFs into folders matching storageKey in products.ts:
--   consultation/checklist.pdf
--   consultation/step-by-step-structure.pdf
--   consultation/consultation-form.pdf
--   allergy-safety/safety-protocols.pdf
--   allergy-safety/ingredient-reference.pdf
--   allergy-safety/client-health-form.pdf
--
-- The app generates a 60-second signed URL per download request.
-- Signed URLs cannot be shared to bypass access control.
-- ─────────────────────────────────────────────────────────────────────────────
