import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProfiles, fetchAllRsvps, updateProfileAsAdmin, deleteMember } from "../../lib/adminData";

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

function EditableRow({ profile, eventsAttended, selected, onToggleSelect, onSaved, onDeleted }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    plan: profile.plan,
    reward_points: profile.reward_points,
    wellbeing_streak: profile.wellbeing_streak,
    courses_completed: profile.courses_completed,
    is_admin: profile.is_admin,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  async function handleDelete() {
    if (!window.confirm(`Delete ${profile.name || profile.email}? This can't be undone.`)) return;
    setDeleting(true);
    setError("");
    try {
      await deleteMember(profile.id);
      onDeleted(profile.id);
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  const checkbox = (
    <input
      type="checkbox"
      checked={selected}
      onChange={() => onToggleSelect(profile.id)}
      disabled={profile.is_admin}
      title={profile.is_admin ? "Admin accounts can't be bulk-selected" : undefined}
    />
  );

  if (!editing) {
    return (
      <tr className="border-b border-black/5">
        <td className="py-3 pl-4 pr-2">{checkbox}</td>
        <td className="py-3 pr-4">
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
          <div className="flex gap-2 items-center">
            <button onClick={() => setEditing(true)} className="text-sm font-semibold text-brwnn-pink">
              Edit
            </button>
            {!profile.is_admin && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-sm font-semibold text-ink-soft hover:text-brwnn-pink disabled:opacity-50"
              >
                {deleting ? "…" : "Delete"}
              </button>
            )}
          </div>
          {error && <p className="text-xs text-brwnn-pink mt-1">{error}</p>}
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-black/5 bg-brwnn-sand/40">
      <td className="py-3 pl-4 pr-2">{checkbox}</td>
      <td className="py-3 pr-4">
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
  const [selected, setSelected] = useState(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
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
  }

  function handleSaved(updated) {
    setProfiles((ps) => ps.map((p) => (p.id === updated.id ? updated : p)));
  }

  function handleDeleted(id) {
    setProfiles((ps) => ps.filter((p) => p.id !== id));
    setSelected((s) => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
  }

  function toggleSelect(id) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectableIds = profiles.filter((p) => !p.is_admin).map((p) => p.id);
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selected.has(id));

  function toggleSelectAll() {
    setSelected(allSelected ? new Set() : new Set(selectableIds));
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    if (!window.confirm(`Delete ${selected.size} selected member${selected.size === 1 ? "" : "s"}? This can't be undone.`)) return;
    setBulkDeleting(true);
    setError("");
    const ids = [...selected];
    const results = await Promise.allSettled(ids.map((id) => deleteMember(id)));
    const failed = results
      .map((r, i) => (r.status === "rejected" ? ids[i] : null))
      .filter(Boolean);
    setProfiles((ps) => ps.filter((p) => !ids.includes(p.id) || failed.includes(p.id)));
    setSelected(new Set());
    if (failed.length) setError(`${failed.length} deletion(s) failed.`);
    setBulkDeleting(false);
  }

  const upcomingBirthdays = profiles.filter((p) => isBirthdaySoon(p.birthday));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
          Users ({profiles.length})
        </h1>
        <Link to="/myadmin/stats" className="text-sm font-semibold text-brwnn-pink">
          View Statistics →
        </Link>
      </div>

      {error && (
        <p className="text-sm text-brwnn-pink bg-brwnn-pink/10 rounded-lg px-4 py-2 mb-4">{error}</p>
      )}

      {!loading && upcomingBirthdays.length > 0 && (
        <div className="bg-brwnn-pink/10 text-brwnn-pink rounded-lg px-4 py-2 mb-4 text-sm">
          🎂 Upcoming birthdays (next 7 days):{" "}
          {upcomingBirthdays.map((p) => `${p.name || p.email} (${formatBirthday(p.birthday)})`).join(", ")}
        </div>
      )}

      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-2.5 mb-4">
          <span className="text-sm text-ink-soft">{selected.size} selected</span>
          <button
            onClick={handleBulkDelete}
            disabled={bulkDeleting}
            className="text-sm font-semibold text-white bg-brwnn-pink rounded-full px-4 py-1.5 disabled:opacity-50"
          >
            {bulkDeleting ? "Deleting…" : "Delete Selected"}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-ink-soft">Loading…</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-ink-soft">
                <th className="py-3 pl-4 pr-2">
                  <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                </th>
                <th className="py-3 pr-4">Member</th>
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
                  selected={selected.has(p.id)}
                  onToggleSelect={toggleSelect}
                  onSaved={handleSaved}
                  onDeleted={handleDeleted}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
