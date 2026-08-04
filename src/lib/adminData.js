import { supabase } from "./supabaseClient";

// Profiles / users --------------------------------------------------------

export async function fetchMyProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function fetchAllProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function updateProfileAsAdmin(userId, patch) {
  const { data, error } = await supabase
    .from("profiles")
    .update(patch)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteMember(userId) {
  const { error } = await supabase.rpc("delete_member", { target_id: userId });
  if (error) throw new Error(error.message);
}

// Events (admin-managed) --------------------------------------------------

export async function fetchEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function createEvent(event) {
  const { data, error } = await supabase.from("events").insert(event).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateEvent(id, patch) {
  const { data, error } = await supabase
    .from("events")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteEvent(id) {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// Attendance (admin-managed) ------------------------------------------------
// event_rsvps.user_id references auth.users, not public.profiles directly,
// so PostgREST can't auto-embed a join between the two — fetch separately
// and merge in JS instead.

// Every RSVP across every event — used to compute each user's real
// "events attended" count on the Users page.
export async function fetchAllRsvps() {
  const { data, error } = await supabase
    .from("event_rsvps")
    .select("id, user_id, event_id, attended");
  if (error) throw new Error(error.message);
  return data;
}

export async function fetchRsvpsForEvent(eventId) {
  const [{ data: rsvps, error: rsvpError }, profiles] = await Promise.all([
    supabase.from("event_rsvps").select("id, user_id, attended").eq("event_id", eventId),
    fetchAllProfiles(),
  ]);
  if (rsvpError) throw new Error(rsvpError.message);
  const byId = new Map(profiles.map((p) => [p.id, p]));
  return rsvps.map((r) => ({ ...r, profile: byId.get(r.user_id) || null }));
}

export async function setAttended(rsvpId, attended) {
  const { data, error } = await supabase
    .from("event_rsvps")
    .update({ attended })
    .eq("id", rsvpId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}
