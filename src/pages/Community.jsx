import { useState } from "react";
import { TESTIMONIALS, ANTHEM_LINES, LINKS } from "../config";

const GALLERY = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
];

function AnthemPoll() {
  const [voted, setVoted] = useState(null);
  return (
    <div className="max-w-sm mx-auto space-y-2">
      {ANTHEM_LINES.map((line) => {
        const isSelected = voted === line;
        return (
          <button
            key={line}
            onClick={() => setVoted(line)}
            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 border text-left transition ${
              isSelected
                ? "bg-white/15 border-white text-white font-semibold"
                : "border-white/25 text-white/80 hover:bg-white/10"
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${
                isSelected ? "bg-white border-white" : "border-white/50"
              }`}
            />
            {line}
          </button>
        );
      })}
      {voted && (
        <p className="text-center text-sm text-white/60 pt-1">
          Thanks for voting — "{voted}" it is! 💚
        </p>
      )}
    </div>
  );
}

export default function Community() {
  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Community
        </p>
        <h1 className="mt-2 font-extrabold section-tight text-4xl sm:text-6xl">
          You belong here.
        </h1>
        <p className="mt-5 text-lg text-ink-soft max-w-xl mx-auto">
          Real women, real stories — and the anthem that brings us together.
        </p>
      </section>

      <section className="px-5 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((quote) => (
            <blockquote
              key={quote}
              className="bg-paper rounded-2xl p-6 text-ink-soft italic text-lg"
            >
              “{quote}”
            </blockquote>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1">
        {GALLERY.map((src) => (
          <div
            key={src}
            className="aspect-square bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      <section className="bg-ink text-white py-20 sm:py-28 px-5 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
          🎵 The BRWNN Anthem
        </p>
        <h2 className="mt-2 font-extrabold section-tight text-3xl sm:text-5xl">
          Shake Body
        </h2>
        <p className="mt-4 max-w-md mx-auto text-white/75">
          Our community anthem. Created to make you smile before you even
          realise you're smiling.
        </p>

        <div className="mt-8 max-w-md mx-auto rounded-2xl bg-white/10 p-4">
          <audio controls className="w-full">
            <source src="/audio/shake-body.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        <p className="mt-10 font-semibold">Which line is your favourite?</p>
        <div className="mt-4">
          <AnthemPoll />
        </div>

        <a
          href={LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-block rounded-full bg-white text-ink font-semibold px-7 py-3 hover:bg-white/90 transition"
        >
          Join the WhatsApp Community
        </a>
      </section>
    </>
  );
}
