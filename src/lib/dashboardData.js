import { supabase } from "./supabaseClient";

async function getUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in.");
  return user.id;
}

// Event RSVPs ---------------------------------------------------------------

export async function fetchMyRsvps() {
  const { data, error } = await supabase.from("event_rsvps").select("event_id");
  if (error) throw new Error(error.message);
  return new Set(data.map((r) => r.event_id));
}

export async function addRsvp(eventId) {
  const userId = await getUserId();
  const { error } = await supabase
    .from("event_rsvps")
    .insert({ user_id: userId, event_id: eventId });
  if (error) throw new Error(error.message);
}

export async function removeRsvp(eventId) {
  const userId = await getUserId();
  const { error } = await supabase
    .from("event_rsvps")
    .delete()
    .eq("user_id", userId)
    .eq("event_id", eventId);
  if (error) throw new Error(error.message);
}

// Programme bookings ---------------------------------------------------------

export async function fetchMyBookings() {
  const { data, error } = await supabase.from("programme_bookings").select("programme_title");
  if (error) throw new Error(error.message);
  return new Set(data.map((r) => r.programme_title));
}

export async function addBooking(programmeTitle) {
  const userId = await getUserId();
  const { error } = await supabase
    .from("programme_bookings")
    .insert({ user_id: userId, programme_title: programmeTitle });
  if (error) throw new Error(error.message);
}

export async function removeBooking(programmeTitle) {
  const userId = await getUserId();
  const { error } = await supabase
    .from("programme_bookings")
    .delete()
    .eq("user_id", userId)
    .eq("programme_title", programmeTitle);
  if (error) throw new Error(error.message);
}

// Community posts ---------------------------------------------------------

export async function fetchPosts(limit = 50) {
  const { data, error } = await supabase
    .from("community_posts")
    .select("id, author_name, body, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data;
}

export async function createPost(authorName, body) {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("community_posts")
    .insert({ user_id: userId, author_name: authorName, body })
    .select("id, author_name, body, created_at")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Helpers ---------------------------------------------------------------

export function timeAgo(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
