import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../../components/Photo";
import ComingSoon from "../../components/ComingSoon";
import { useAuth } from "../../context/AuthContext";
import { fetchMyRsvps, fetchPosts, timeAgo } from "../../lib/dashboardData";
import { fetchEvents } from "../../lib/adminData";

function formatDateLabel(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-GB", { month: "short", day: "numeric" }).toUpperCase();
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [rsvps, setRsvps] = useState(new Set());
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(() => {});
    fetchMyRsvps().then(setRsvps).catch(() => {});
    fetchPosts(3).then(setPosts).catch(() => {});
  }, []);

  const stats = [
    { label: "Membership Plan", value: user?.plan || "Community Member", icon: "💜" },
    { label: "Member Since", value: user?.memberSince || "—", icon: "📅" },
    { label: "Upcoming Events", value: String(events.length), icon: "📆" },
    { label: "Reward Points", value: String(user?.rewardPoints ?? 0), icon: "🏆" },
  ];

  const activity = posts.map((p) => ({
    name: p.author_name,
    text: p.body,
    time: timeAgo(p.created_at),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-brwnn-purple-dark">
          Welcome back, {user?.name?.split(" ")[0] || "Sister"}! 🎉
        </h1>
        <p className="text-ink-soft mt-1">
          You are amazing! Let's keep thriving together.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl" aria-hidden>{s.icon}</span>
            <p className="mt-2 text-xs text-ink-soft">{s.label}</p>
            <p className="font-bold text-brwnn-purple-dark">{s.value}</p>
            {s.label === "Membership Plan" && (
              <p className="mt-1 text-[10px] text-ink-soft/70">Upgrade — coming soon</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-[1fr_280px] gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-brwnn-purple-dark">Upcoming Events</h2>
            <Link to="/dashboard/events" className="text-sm text-brwnn-pink font-semibold">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {events.slice(0, 4).map((e) => {
              const going = rsvps.has(e.id);
              return (
                <div key={e.id} className="rounded-lg overflow-hidden border border-black/5">
                  <Photo src={e.image_url} emoji="🌿" className="h-20" />
                  <div className="p-2">
                    <p className="text-[10px] font-bold text-brwnn-pink">{formatDateLabel(e.event_date)}</p>
                    <p className="text-xs font-semibold text-brwnn-purple-dark leading-tight mt-0.5">
                      {e.title}
                    </p>
                    <p className="text-[10px] text-ink-soft mt-1">📍 {e.location || "TBC"}</p>
                    <p
                      className={`mt-1 text-[10px] font-semibold ${
                        going ? "text-brwnn-green" : "text-brwnn-purple"
                      }`}
                    >
                      {going ? "✓ You're going" : "Register"}
                    </p>
                  </div>
                </div>
              );
            })}
            {events.length === 0 && (
              <p className="col-span-full text-sm text-ink-soft">No events scheduled yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-3">Your Progress</h2>
          <ComingSoon label="Wellbeing streak & event stats" />
        </div>
      </div>

      <div className="grid sm:grid-cols-[1fr_280px] gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-3">Continue Learning</h2>
          <ComingSoon label="Courses & learning content" />
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-3">Sisterhood Corner</h2>
          {activity.length === 0 ? (
            <p className="text-sm text-ink-soft">No community activity yet.</p>
          ) : (
            <div className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="text-sm">
                  <p className="text-ink-soft">
                    <span className="font-semibold text-brwnn-purple-dark">{a.name}</span> {a.text}
                  </p>
                  <p className="text-[10px] text-ink-soft/70">{a.time}</p>
                </div>
              ))}
            </div>
          )}
          <Link to="/dashboard/community" className="mt-4 inline-block text-sm text-brwnn-pink font-semibold">
            Go to Community
          </Link>
        </div>
      </div>

      <div className="rounded-xl bg-brwnn-purple-dark text-white text-center py-8 px-5">
        <p className="font-heading font-extrabold">
          MOVE TOGETHER. LAUGH FREELY. THRIVE DAILY.
        </p>
        <p className="text-sm text-white/70 mt-1">
          You're not just a member, you're family.
        </p>
      </div>
    </div>
  );
}
