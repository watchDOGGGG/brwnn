import { useEffect, useState } from "react";
import { PROGRAMMES } from "../../config";
import Photo from "../../components/Photo";
import { fetchMyBookings, addBooking, removeBooking } from "../../lib/dashboardData";

export default function PortalProgrammes() {
  const [bookings, setBookings] = useState(new Set());
  const [pending, setPending] = useState(new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyBookings()
      .then(setBookings)
      .catch((err) => setError(err.message));
  }, []);

  async function toggleBooking(title) {
    const booked = bookings.has(title);
    setPending((p) => new Set(p).add(title));
    setError("");
    try {
      if (booked) {
        await removeBooking(title);
        setBookings((b) => {
          const next = new Set(b);
          next.delete(title);
          return next;
        });
      } else {
        await addBooking(title);
        setBookings((b) => new Set(b).add(title));
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
        Programmes
      </h1>

      {error && (
        <p className="text-sm text-brwnn-pink bg-brwnn-pink/10 rounded-lg px-4 py-2">{error}</p>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        {PROGRAMMES.map((p) => {
          const booked = bookings.has(p.title);
          const busy = pending.has(p.title);
          return (
            <div key={p.title} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <Photo src={p.image} emoji={p.emoji} className="h-28" />
              <div className="p-4">
                <h2 className="font-semibold text-sm text-brwnn-purple-dark">
                  <span className="mr-1" aria-hidden>{p.emoji}</span>
                  {p.title}
                </h2>
                <p className="text-xs font-semibold text-brwnn-pink mt-1">{p.tagline}</p>
                <button
                  onClick={() => toggleBooking(p.title)}
                  disabled={busy}
                  className={`mt-3 w-full rounded-full text-xs font-bold py-2 transition disabled:opacity-50 ${
                    booked
                      ? "bg-brwnn-green/10 text-brwnn-green"
                      : "bg-brwnn-purple-dark text-white hover:bg-brwnn-purple"
                  }`}
                >
                  {booked ? "✓ Booked" : "Book a Session"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
