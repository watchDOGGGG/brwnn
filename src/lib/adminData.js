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
