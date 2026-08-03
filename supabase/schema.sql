-- Run this in the Supabase SQL Editor (SQL Editor -> New query -> Run).
-- This is the full, current schema for the BRWNN member portal + admin panel.
-- Safe to re-run: it drops and recreates the app's tables/policies each time.
-- (Only run this on a project with no real user data you need to keep —
-- it wipes the event_rsvps/programme_bookings/community_posts tables.)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Profiles: one row per auth user, holding everything the app needs
-- that shouldn't live in user-editable auth.user_metadata (reward
-- points, admin flag, plan, stats) — only admins can write these.
-- ---------------------------------------------------------------------
drop table if exists public.profiles cascade;
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null default '',
  is_admin boolean not null default false,
  plan text not null default 'Community Member',
  reward_points integer not null default 0,
  wellbeing_streak integer not null default 0,
  events_attended integer not null default 0,
  courses_completed integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Security-definer helper so RLS policies can check "is this uid an
-- admin?" without recursively re-triggering RLS on profiles.
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
stable
as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = uid), false);
$$;

create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin(auth.uid()));

create policy "profiles_update_admin_only" on public.profiles
  for update using (public.is_admin(auth.uid()));

-- Auto-create a profile row whenever someone signs up, and keep
-- name/email in sync if they change their auth metadata later.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', ''))
  on conflict (id) do update
    set email = excluded.email,
        name = excluded.name;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for any users who already exist.
insert into public.profiles (id, email, name)
select id, email, coalesce(raw_user_meta_data->>'name', '')
from auth.users
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- Events: admin-managed event catalog.
-- ---------------------------------------------------------------------
drop table if exists public.events cascade;
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  location text not null default '',
  event_date date not null,
  event_time text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "events_select_all" on public.events
  for select to authenticated using (true);

create policy "events_admin_write" on public.events
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ---------------------------------------------------------------------
-- Event RSVPs — now references a real event row instead of a title string.
-- ---------------------------------------------------------------------
drop table if exists public.event_rsvps cascade;
create table public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, event_id)
);

alter table public.event_rsvps enable row level security;

create policy "rsvps_select_own" on public.event_rsvps
  for select using (auth.uid() = user_id);

create policy "rsvps_insert_own" on public.event_rsvps
  for insert with check (auth.uid() = user_id);

create policy "rsvps_delete_own" on public.event_rsvps
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- Programme bookings (unchanged — programmes are still static content).
-- ---------------------------------------------------------------------
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

-- ---------------------------------------------------------------------
-- Community posts (unchanged).
-- ---------------------------------------------------------------------
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

-- ---------------------------------------------------------------------
-- Make yourself an admin so you can access /myadmin. Replace the email
-- below with your own account's email, then run just this statement
-- (safe to re-run any time to promote another account).
-- ---------------------------------------------------------------------
-- update public.profiles set is_admin = true where email = 'you@example.com';
