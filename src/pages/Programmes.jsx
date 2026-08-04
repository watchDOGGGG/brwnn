import { PROGRAMMES, PROGRAMME_PHILOSOPHY } from "../config";
import Photo from "../components/Photo";

export default function Programmes() {
  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Programmes
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-4xl sm:text-6xl text-brwnn-purple-dark">
          Experience the power of nature and sisterhood.
        </h1>
      </section>

      <section className="pb-20 px-5">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          {PROGRAMMES.map((p) => (
            <div
              key={p.title}
              className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-4 bg-brwnn-sand rounded-2xl overflow-hidden"
            >
              <Photo src={p.image} emoji={p.emoji} className="h-full min-h-32" />
              <div className="py-5 pr-5">
                <h2 className="font-heading font-bold text-lg text-brwnn-purple-dark">
                  <span className="mr-1" aria-hidden>{p.emoji}</span>
                  {p.title}
                </h2>
                <p className="mt-1 text-sm font-semibold text-brwnn-pink">{p.tagline}</p>
                <p className="mt-2 text-sm text-ink-soft">{p.text}</p>
                <a
                  href="/events"
                  className="mt-3 inline-block text-sm font-bold text-brwnn-pink"
                >
                  Find a session ›
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brwnn-purple-dark text-white px-5 py-14 sm:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            {PROGRAMME_PHILOSOPHY.heading}
          </p>
          <p className="mt-4 text-lg text-white/85">{PROGRAMME_PHILOSOPHY.text}</p>
          <p className="mt-6 font-heading font-extrabold text-2xl">
            {PROGRAMME_PHILOSOPHY.tagline}
          </p>
        </div>
      </section>
    </>
  );
}
