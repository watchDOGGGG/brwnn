import { Link } from "react-router-dom";
import {
  PORTAL_EVENTS,
  PROGRESS,
  COURSES,
  SISTERHOOD_ACTIVITY,
} from "../../config";
import Photo from "../../components/Photo";
import { useAuth } from "../../context/AuthContext";
import { useLocalStorage } from "../../lib/useLocalStorage";

export default function DashboardHome() {
  const { user } = useAuth();
  const [rsvps] = useLocalStorage("brwnn_rsvps", {});
  const [posts] = useLocalStorage("brwnn_posts", []);

  const stats = [
    { label: "Membership Plan", value: user?.plan || "Community Member", icon: "💜" },
    { label: "Member Since", value: user?.memberSince || "—", icon: "📅" },
    { label: "Upcoming Events", value: String(PORTAL_EVENTS.length), icon: "📆" },
    { label: "Reward Points", value: "320", icon: "🏆" },
  ];

  const activity = [...posts, ...SISTERHOOD_ACTIVITY].slice(0, 3);

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
            {PORTAL_EVENTS.map((e) => {
              const going = !!rsvps[e.title];
              return (
                <div key={e.title} className="rounded-lg overflow-hidden border border-black/5">
                  <Photo src={e.image} emoji="🌿" className="h-20" />
                  <div className="p-2">
                    <p className="text-[10px] font-bold text-brwnn-pink">{e.date}</p>
                    <p className="text-xs font-semibold text-brwnn-purple-dark leading-tight mt-0.5">
                      {e.title}
                    </p>
                    <p className="text-[10px] text-ink-soft mt-1">📍 {e.location}</p>
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
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-3">Your Progress</h2>
          <div className="space-y-3">
            {PROGRESS.map((p) => (
              <div key={p.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-soft">
                  <span aria-hidden>{p.icon}</span>
                  {p.label}
                </span>
                <span className="font-bold text-brwnn-purple-dark">{p.value}</span>
              </div>
            ))}
          </div>
          <Link to="/dashboard/profile" className="mt-4 inline-block text-sm text-brwnn-pink font-semibold">
            View full progress
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-[1fr_280px] gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-4">Continue Learning</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COURSES.map((c) => (
              <div key={c.title}>
                <div className="h-16 rounded-lg bg-gradient-to-br from-brwnn-purple/20 to-brwnn-green/20" />
                <p className="text-xs font-semibold text-brwnn-purple-dark mt-2 leading-tight">
                  {c.title}
                </p>
                <div className="mt-2 h-1.5 rounded-full bg-paper overflow-hidden">
                  <div
                    className="h-full bg-brwnn-pink"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-ink-soft mt-1">{c.progress}% Complete</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-3">Sisterhood Corner</h2>
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
