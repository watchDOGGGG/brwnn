import { EVENTS } from "../config";

export default function Events() {
  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Events
        </p>
        <h1 className="mt-2 font-extrabold section-tight text-4xl sm:text-6xl">
          Show up. Move together.
        </h1>
        <p className="mt-5 text-lg text-ink-soft max-w-xl mx-auto">
          Every walk, dance and gathering is a chance to reconnect — with
          nature, and with each other.
        </p>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-4xl mx-auto space-y-6">
          {EVENTS.map((e) => (
            <div
              key={e.title}
              className="grid sm:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-sm border border-black/5"
            >
              <div
                className="h-56 sm:h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${e.image})` }}
              />
              <div className="bg-white p-8 flex flex-col justify-center">
                <p className="text-sm font-semibold text-brwnn-purple uppercase tracking-wide">
                  {e.date} · {e.time}
                </p>
                <h2 className="mt-2 font-extrabold text-2xl section-tight">
                  {e.title}
                </h2>
                <p className="mt-2 text-ink-soft">📍 {e.location}</p>
                <button className="mt-6 self-start rounded-full bg-ink text-white font-semibold px-6 py-2.5 hover:bg-brwnn-purple transition">
                  Reserve Your Spot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
