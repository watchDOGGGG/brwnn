import { useEffect, useMemo, useState } from "react";
import Photo from "../../components/Photo";
import { fetchEvents } from "../../lib/adminData";
import { fetchMyRsvps, addRsvp, removeRsvp } from "../../lib/dashboardData";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDateLabel(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-GB", { month: "short", day: "numeric" }).toUpperCase();
}

export default function PortalEvents() {
  const [events, setEvents] = useState([]);
  const [rsvps, setRsvps] = useState(new Set());
  const [pending, setPending] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([fetchEvents(), fetchMyRsvps()])
      .then(([evts, myRsvps]) => {
        setEvents(evts);
        setRsvps(myRsvps);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const eventDays = useMemo(
    () => new Set(events.map((e) => new Date(`${e.event_date}T00:00:00`).getDate())),
    [events]
  );
  const calendarMonth = events[0]
    ? new Date(`${events[0].event_date}T00:00:00`).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  async function toggleRsvp(id) {
    const going = rsvps.has(id);
    setPending((p) => new Set(p).add(id));
    setError("");
    try {
      if (going) {
        await removeRsvp(id);
        setRsvps((r) => {
          const next = new Set(r);
          next.delete(id);
          return next;
        });
      } else {
        await addRsvp(id);
        setRsvps((r) => new Set(r).add(id));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPending((p) => {
        const next = new Set(p);
        next.delete(id);
        return next;
      });
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
        Events Calendar
      </h1>

      {error && (
        <p className="text-sm text-brwnn-pink bg-brwnn-pink/10 rounded-lg px-4 py-2">{error}</p>
      )}

      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button className="text-ink-soft" aria-label="Previous month">‹</button>
          <p className="font-bold text-brwnn-purple-dark">{calendarMonth}</p>
          <button className="text-ink-soft" aria-label="Next month">›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-ink-soft mb-2">
          {DAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                eventDays.has(day)
                  ? "bg-brwnn-pink text-white font-bold"
                  : "text-ink-soft hover:bg-paper"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="font-bold text-brwnn-purple-dark mb-4">Upcoming Events</h2>
        {loading && <p className="text-sm text-ink-soft">Loading events…</p>}
        <div className="space-y-3">
          {!loading && events.length === 0 && (
            <p className="text-sm text-ink-soft">No events scheduled yet — check back soon.</p>
          )}
          {events.map((e) => {
            const going = rsvps.has(e.id);
            const busy = pending.has(e.id);
            return (
              <div key={e.id} className="flex gap-3 items-center rounded-lg border border-black/5 p-3">
                <Photo src={e.image_url} emoji="🌿" className="w-16 h-16 rounded-md shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-brwnn-pink">{formatDateLabel(e.event_date)}</p>
                  <p className="font-semibold text-brwnn-purple-dark text-sm">{e.title}</p>
                  <p className="text-xs text-ink-soft">
                    📍 {e.location || "TBC"} {e.event_time && `· ⏰ ${e.event_time}`}
                  </p>
                </div>
                <button
                  onClick={() => toggleRsvp(e.id)}
                  disabled={busy}
                  className={`text-xs font-semibold shrink-0 rounded-full px-3 py-1.5 transition disabled:opacity-50 ${
                    going
                      ? "bg-brwnn-green/10 text-brwnn-green"
                      : "bg-brwnn-purple-dark text-white hover:bg-brwnn-purple"
                  }`}
                >
                  {going ? "✓ Going" : "Register"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
