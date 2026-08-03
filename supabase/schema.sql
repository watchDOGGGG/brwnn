-- Run this once in the Supabase SQL Editor (SQL Editor -> New query -> Run).
-- Creates the tables backing the member dashboard's RSVPs, programme
-- bookings, and community posts, with Row Level Security so users can
-- only ever read/write their own rows (posts are readable by all
-- logged-in members, writable only by their author).

create extension if not exists "pgcrypto";

-- Event RSVPs ----------------------------------------------------------
create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_title text not null,
  created_at timestamptz not null default now(),
  unique (user_id, event_title)
);

alter table public.event_rsvps enable row level security;

drop policy if exists "rsvps_select_own" on public.event_rsvps;
create policy "rsvps_select_own" on public.event_rsvps
  for select using (auth.uid() = user_id);

drop policy if exists "rsvps_insert_own" on public.event_rsvps;
create policy "rsvps_insert_own" on public.event_rsvps
  for insert with check (auth.uid() = user_id);

drop policy if exists "rsvps_delete_own" on public.event_rsvps;
create policy "rsvps_delete_own" on public.event_rsvps
  for delete using (auth.uid() = user_id);

-- Programme bookings -----------------------------------------------------
create table if not exists public.programme_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  programme_title text not null,
  created_at timestamptz not null default now(),
  unique (user_id, programme_title)
);

alter table public.programme_bookings enable row level security;

drop policy if exists "bookings_select_own" on public.programme_bookings;
create policy "bookings_select_own" on public.programme_bookings
  for select using (auth.uid() = user_id);

drop policy if exists "bookings_insert_own" on public.programme_bookings;
create policy "bookings_insert_own" on public.programme_bookings
  for insert with check (auth.uid() = user_id);

drop policy if exists "bookings_delete_own" on public.programme_bookings;
create policy "bookings_delete_own" on public.programme_bookings
  for delete using (auth.uid() = user_id);

-- Community posts ---------------------------------------------------------
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.community_posts enable row level security;

drop policy if exists "posts_select_all" on public.community_posts;
create policy "posts_select_all" on public.community_posts
  for select to authenticated using (true);

drop policy if exists "posts_insert_own" on public.community_posts;
create policy "posts_insert_own" on public.community_posts
  for insert with check (auth.uid() = user_id);
