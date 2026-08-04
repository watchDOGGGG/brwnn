-- Incremental migration — run this in the SQL Editor. Safe to run on your
-- existing database: it only ADDS columns/functions/policies, it does not
-- drop or wipe anything (unlike schema.sql, which is a from-scratch script).

-- ---------------------------------------------------------------------
-- Birthdays: users can set their own; only reachable through this narrow
-- function so they can't touch reward_points/is_admin/etc via the same path.
-- ---------------------------------------------------------------------
alter table public.profiles add column if not exists birthday date;

create or replace function public.update_my_birthday(new_birthday date)
returns void
language plpgsql
security definer
as $$
begin
  update public.profiles set birthday = new_birthday where id = auth.uid();
end;
$$;

grant execute on function public.update_my_birthday(date) to authenticated;

-- ---------------------------------------------------------------------
-- Event attendance: admin ticks who actually showed up. events_attended
-- on the Users page is now computed from this instead of typed in by hand.
-- ---------------------------------------------------------------------
alter table public.event_rsvps add column if not exists attended boolean not null default false;

drop policy if exists "rsvps_admin_select_all" on public.event_rsvps;
create policy "rsvps_admin_select_all" on public.event_rsvps
  for select using (public.is_admin(auth.uid()));

drop policy if exists "rsvps_admin_update_attended" on public.event_rsvps;
create policy "rsvps_admin_update_attended" on public.event_rsvps
  for update using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
