import { useEffect, useState } from "react";
import { PORTAL_EVENTS } from "../../config";
import Photo from "../../components/Photo";
import { fetchMyRsvps, addRsvp, removeRsvp } from "../../lib/dashboardData";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EVENT_DAYS = [8, 15, 22, 29];

export default function PortalEvents() {
  const [month] = useState("June 2026");
  const [rsvps, setRsvps] = useState(new Set());
  const [pending, setPending] = useState(new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyRsvps()
      .then(setRsvps)
      .catch((err) => setError(err.message));
  }, []);

  async function toggleRsvp(title) {
    const going = rsvps.has(title);
    setPending((p) => new Set(p).add(title));
    setError("");
    try {
      if (going) {
        await removeRsvp(title);
        setRsvps((r) => {
          const next = new Set(r);
          next.delete(title);
          return next;
        });
      } else {
        await addRsvp(title);
        setRsvps((r) => new Set(r).add(title));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPending((p) => {
        const next = new Set(p);
        next.delete(title);
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
          <p className="font-bold text-brwnn-purple-dark">{month}</p>
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
                EVENT_DAYS.includes(day)
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
        <div className="space-y-3">
          {PORTAL_EVENTS.map((e) => {
            const going = rsvps.has(e.title);
            const busy = pending.has(e.title);
            return (
              <div key={e.title} className="flex gap-3 items-center rounded-lg border border-black/5 p-3">
                <Photo src={e.image} emoji="🌿" className="w-16 h-16 rounded-md shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-brwnn-pink">{e.date}</p>
                  <p className="font-semibold text-brwnn-purple-dark text-sm">{e.title}</p>
                  <p className="text-xs text-ink-soft">📍 {e.location} · ⏰ {e.time}</p>
                </div>
                <button
                  onClick={() => toggleRsvp(e.title)}
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
