import { useEffect, useState } from "react";
import { fetchRsvpsForEvent, setAttended } from "../../lib/adminData";

export default function AttendeesPanel({ eventId }) {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(new Set());

  useEffect(() => {
    fetchRsvpsForEvent(eventId)
      .then(setRsvps)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [eventId]);

  async function toggle(rsvp) {
    setBusy((b) => new Set(b).add(rsvp.id));
    setError("");
    try {
      const updated = await setAttended(rsvp.id, !rsvp.attended);
      setRsvps((rs) => rs.map((r) => (r.id === rsvp.id ? { ...r, attended: updated.attended } : r)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy((b) => {
        const next = new Set(b);
        next.delete(rsvp.id);
        return next;
      });
    }
  }

  if (loading) return <p className="text-xs text-ink-soft px-4 pb-4">Loading attendees…</p>;

  return (
    <div className="px-4 pb-4">
      {error && <p className="text-xs text-brwnn-pink mb-2">{error}</p>}
      {rsvps.length === 0 ? (
        <p className="text-xs text-ink-soft">No RSVPs yet for this event.</p>
      ) : (
        <div className="space-y-1.5">
          {rsvps.map((r) => (
            <label
              key={r.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-paper px-3 py-2 text-sm cursor-pointer"
            >
              <span className="min-w-0 truncate">
                <span className="font-medium text-brwnn-purple-dark">
                  {r.profile?.name || "—"}
                </span>{" "}
                <span className="text-xs text-ink-soft">{r.profile?.email}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-ink-soft">{r.attended ? "Attended" : "Registered"}</span>
                <input
                  type="checkbox"
                  checked={r.attended}
                  disabled={busy.has(r.id)}
                  onChange={() => toggle(r)}
                />
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
