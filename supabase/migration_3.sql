-- Incremental migration — run in the SQL Editor. Adds admin-only member
-- deletion. Safe to run on your existing database (adds only).

-- Deleting an auth user normally requires the service_role key (never put
-- that in frontend code). This function does it via SECURITY DEFINER
-- instead — it runs with the privileges of whoever created it (you, via
-- the SQL Editor, i.e. the postgres role), but the body itself checks
-- the CALLER is an admin before doing anything, so a non-admin calling
-- this from the app gets rejected.
create or replace function public.delete_member(target_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Only admins can delete members.';
  end if;
  if target_id = auth.uid() then
    raise exception 'You cannot delete your own admin account.';
  end if;
  delete from auth.users where id = target_id;
end;
$$;

grant execute on function public.delete_member(uuid) to authenticated;
