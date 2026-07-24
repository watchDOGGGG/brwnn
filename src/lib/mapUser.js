export function mapSupabaseUser(u) {
  if (!u) return null;
  const meta = u.user_metadata || {};
  return {
    id: u.id,
    email: u.email,
    name: meta.name || u.email?.split("@")[0] || "Sister",
    bio: meta.bio || "",
    location: meta.location || "",
    avatarUrl: meta.avatar_url || "",
    plan: meta.plan || "Community Member",
    memberSince: u.created_at
      ? new Date(u.created_at).toLocaleDateString("en-GB", {
          month: "short",
          year: "numeric",
        })
      : "—",
  };
}
