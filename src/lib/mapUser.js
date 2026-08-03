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
    isAdmin: false,
    rewardPoints: 0,
    wellbeingStreak: 0,
    eventsAttended: 0,
    coursesCompleted: 0,
  };
}

export function mergeProfile(user, profile) {
  if (!user) return user;
  if (!profile) return user;
  return {
    ...user,
    plan: profile.plan || user.plan,
    isAdmin: !!profile.is_admin,
    rewardPoints: profile.reward_points ?? 0,
    wellbeingStreak: profile.wellbeing_streak ?? 0,
    eventsAttended: profile.events_attended ?? 0,
    coursesCompleted: profile.courses_completed ?? 0,
  };
}
