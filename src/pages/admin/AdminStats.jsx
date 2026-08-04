import { useEffect, useState } from "react";
import { fetchAllProfiles, fetchAllRsvps, fetchEvents } from "../../lib/adminData";

function monthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key) {
  const [y, m] = key.split("-");
  return new Date(`${y}-${m}-01T00:00:00`).toLocaleDateString("en-GB", { month: "short" });
}

function StatTile({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <span className="text-2xl" aria-hidden>{icon}</span>
      <p className="mt-2 text-xs text-ink-soft">{label}</p>
      <p className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">{value}</p>
    </div>
  );
}

function LineChart({ points, labels, color = "#4a1e78" }) {
  const width = 100;
  const height = 100;
  const max = Math.max(1, ...points);
  const stepX = points.length > 1 ? width / (points.length - 1) : 0;
  const coords = points.map((v, i) => ({
    x: points.length > 1 ? i * stepX : width / 2,
    y: height - (v / max) * (height - 16) - 8,
  }));
  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const area = `${path} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32" preserveAspectRatio="none">
        <path d={area} fill={color} opacity="0.12" />
        <path d={path} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="2.2" fill={color} vectorEffect="non-scaling-stroke">
            <title>{`${labels[i]}: ${points[i]}`}</title>
          </circle>
        ))}
      </svg>
      <div className="flex mt-1">
        {labels.map((l, i) => (
          <span key={i} className="flex-1 text-center text-xs text-ink-soft">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function HBar({ label, value, max, color }) {
  const pct = max > 0 ? Math.max((value / max) * 100, value > 0 ? 4 : 0) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm mb-1">
        <span className="font-medium text-ink-soft">{label}</span>
        <span className="font-semibold text-brwnn-purple-dark tabular-nums">{value}</span>
      </div>
      <div className="h-2.5 rounded-full bg-paper overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function AdminStats() {
  const [profiles, setProfiles] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([fetchAllProfiles(), fetchAllRsvps(), fetchEvents()])
      .then(([p, r, e]) => {
        setProfiles(p);
        setRsvps(r);
        setEvents(e);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-ink-soft">Loading statistics…</p>;
  if (error) return <p className="text-sm text-brwnn-pink bg-brwnn-pink/10 rounded-lg px-4 py-2">{error}</p>;

  const totalMembers = profiles.length;
  const totalPoints = profiles.reduce((sum, p) => sum + (p.reward_points || 0), 0);
  const totalAttended = rsvps.filter((r) => r.attended).length;
  const premiumCount = profiles.filter((p) => p.plan === "Premium Sister").length;
  const communityCount = totalMembers - premiumCount;

  // Signups per month, last 6 months present in the data.
  const byMonth = {};
  for (const p of profiles) {
    const key = monthKey(p.created_at);
    byMonth[key] = (byMonth[key] || 0) + 1;
  }
  const months = Object.keys(byMonth).sort().slice(-6);

  const topByPoints = [...profiles]
    .sort((a, b) => (b.reward_points || 0) - (a.reward_points || 0))
    .slice(0, 8);
  const maxPoints = Math.max(1, ...topByPoints.map((p) => p.reward_points || 0));

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
        Statistics
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatTile label="Total Members" value={totalMembers} icon="👥" />
        <StatTile label="Total Reward Points" value={totalPoints.toLocaleString()} icon="🏆" />
        <StatTile label="Events Attended" value={totalAttended} icon="📅" />
        <StatTile label="Events Created" value={events.length} icon="🌿" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-4">Members by Plan</h2>
          <div className="space-y-4">
            <HBar label="Community Member" value={communityCount} max={totalMembers} color="#4a1e78" />
            <HBar label="Premium Sister" value={premiumCount} max={totalMembers} color="#e91e63" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-4">Signups (last 6 months)</h2>
          {months.length === 0 ? (
            <p className="text-sm text-ink-soft">No signups yet.</p>
          ) : (
            <LineChart
              points={months.map((m) => byMonth[m])}
              labels={months.map(monthLabel)}
              color="#4a1e78"
            />
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="font-bold text-brwnn-purple-dark mb-4">Top Members by Reward Points</h2>
        {topByPoints.length === 0 ? (
          <p className="text-sm text-ink-soft">No members yet.</p>
        ) : (
          <div className="space-y-3">
            {topByPoints.map((p) => (
              <HBar
                key={p.id}
                label={p.name || p.email}
                value={p.reward_points || 0}
                max={maxPoints}
                color="#4a1e78"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
