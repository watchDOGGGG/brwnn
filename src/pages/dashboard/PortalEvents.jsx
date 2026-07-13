import { useState } from "react";
import { PORTAL_EVENTS } from "../../config";
import Photo from "../../components/Photo";
import { useLocalStorage } from "../../lib/useLocalStorage";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EVENT_DAYS = [8, 15, 22, 29];

export default function PortalEvents() {
  const [month] = useState("June 2026");
  const [rsvps, setRsvps] = useLocalStorage("brwnn_rsvps", {});

  function toggleRsvp(title) {
    setRsvps((r) => ({ ...r, [title]: !r[title] }));
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
        Events Calendar
      </h1>

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
            const going = !!rsvps[e.title];
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
                  className={`text-xs font-semibold shrink-0 rounded-full px-3 py-1.5 transition ${
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
