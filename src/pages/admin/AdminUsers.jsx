import { useEffect, useState } from "react";
import { fetchAllProfiles, fetchAllRsvps, updateProfileAsAdmin } from "../../lib/adminData";

const PLANS = ["Community Member", "Premium Sister"];

function isBirthdaySoon(birthday) {
  if (!birthday) return false;
  const today = new Date();
  const bday = new Date(`${birthday}T00:00:00`);
  bday.setFullYear(today.getFullYear());
  if (bday < new Date(today.toDateString())) bday.setFullYear(today.getFullYear() + 1);
  const days = Math.round((bday - new Date(today.toDateString())) / 86400000);
  return days >= 0 && days <= 7;
}

function formatBirthday(birthday) {
  if (!birthday) return "—";
  return new Date(`${birthday}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function EditableRow({ profile, eventsAttended, onSaved }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    plan: profile.plan,
    reward_points: profile.reward_points,
    wellbeing_streak: profile.wellbeing_streak,
    courses_completed: profile.courses_completed,
    is_admin: profile.is_admin,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const updated = await updateProfileAsAdmin(profile.id, form);
      onSaved(updated);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!editing) {
    return (
      <tr className="border-b border-black/5">
        <td className="py-3 pr-4 pl-4">
          <p className="font-semibold text-brwnn-purple-dark">{profile.name || "—"}</p>
          <p className="text-xs text-ink-soft">{profile.email}</p>
        </td>
        <td className="py-3 pr-4">{profile.plan}</td>
        <td className="py-3 pr-4 text-center">{profile.reward_points}</td>
        <td className="py-3 pr-4 text-center">{profile.wellbeing_streak}</td>
        <td className="py-3 pr-4 text-center">{eventsAttended}</td>
        <td className="py-3 pr-4 text-center">{profile.courses_completed}</td>
        <td className="py-3 pr-4 text-center">
          {formatBirthday(profile.birthday)}
          {isBirthdaySoon(profile.birthday) && <span className="ml-1" title="Birthday within 7 days">🎂</span>}
        </td>
        <td className="py-3 pr-4 text-center">{profile.is_admin ? "✓" : ""}</td>
        <td className="py-3">
          <button onClick={() => setEditing(true)} className="text-sm font-semibold text-brwnn-pink">
            Edit
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-black/5 bg-brwnn-sand/40">
      <td className="py-3 pr-4 pl-4">
        <p className="font-semibold text-brwnn-purple-dark">{profile.name || "—"}</p>
        <p className="text-xs text-ink-soft">{profile.email}</p>
      </td>
      <td className="py-3 pr-4">
        <select name="plan" value={form.plan} onChange={handleChange} className="rounded border border-black/10 px-2 py-1 text-sm">
          {PLANS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </td>
      <td className="py-3 pr-4">
        <input type="number" name="reward_points" value={form.reward_points} onChange={handleChange} className="w-20 rounded border border-black/10 px-2 py-1 text-sm text-center" />
      </td>
      <td className="py-3 pr-4">
        <input type="number" name="wellbeing_streak" value={form.wellbeing_streak} onChange={handleChange} className="w-16 rounded border border-black/10 px-2 py-1 text-sm text-center" />
      </td>
      <td className="py-3 pr-4 text-center text-ink-soft" title="Computed from ticked attendance on the Events page">
        {eventsAttended}
      </td>
      <td className="py-3 pr-4">
        <input type="number" name="courses_completed" value={form.courses_completed} onChange={handleChange} className="w-16 rounded border border-black/10 px-2 py-1 text-sm text-center" />
      </td>
      <td className="py-3 pr-4 text-center text-ink-soft">{formatBirthday(profile.birthday)}</td>
      <td className="py-3 pr-4 text-center">
        <input type="checkbox" name="is_admin" checked={form.is_admin} onChange={handleChange} />
      </td>
      <td className="py-3">
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-sm font-semibold text-brwnn-green disabled:opacity-50"
          >
            {saving ? "…" : "Save"}
          </button>
          <button onClick={() => setEditing(false)} className="text-sm text-ink-soft">
            Cancel
          </button>
        </div>
        {error && <p className="text-xs text-brwnn-pink mt-1">{error}</p>}
      </td>
    </tr>
  );
}

export default function AdminUsers() {
  const [profiles, setProfiles] = useState([]);
  const [attendanceCounts, setAttendanceCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([fetchAllProfiles(), fetchAllRsvps()])
      .then(([profileRows, rsvps]) => {
        setProfiles(profileRows);
        const counts = {};
        for (const r of rsvps) {
          if (r.attended) counts[r.user_id] = (counts[r.user_id] || 0) + 1;
        }
        setAttendanceCounts(counts);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleSaved(updated) {
    setProfiles((ps) => ps.map((p) => (p.id === updated.id ? updated : p)));
  }

  const upcomingBirthdays = profiles.filter((p) => isBirthdaySoon(p.birthday));

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark mb-6">
        Users ({profiles.length})
      </h1>

      {error && (
        <p className="text-sm text-brwnn-pink bg-brwnn-pink/10 rounded-lg px-4 py-2 mb-4">{error}</p>
      )}

      {!loading && upcomingBirthdays.length > 0 && (
        <div className="bg-brwnn-pink/10 text-brwnn-pink rounded-lg px-4 py-2 mb-4 text-sm">
          🎂 Upcoming birthdays (next 7 days):{" "}
          {upcomingBirthdays.map((p) => `${p.name || p.email} (${formatBirthday(p.birthday)})`).join(", ")}
        </div>
      )}

      {loading ? (
        <p className="text-ink-soft">Loading…</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-ink-soft">
                <th className="py-3 pr-4 pl-4">Member</th>
                <th className="py-3 pr-4">Plan</th>
                <th className="py-3 pr-4">Points</th>
                <th className="py-3 pr-4">Streak</th>
                <th className="py-3 pr-4">Events</th>
                <th className="py-3 pr-4">Courses</th>
                <th className="py-3 pr-4">Birthday</th>
                <th className="py-3 pr-4">Admin</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <EditableRow
                  key={p.id}
                  profile={p}
                  eventsAttended={attendanceCounts[p.id] || 0}
                  onSaved={handleSaved}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
