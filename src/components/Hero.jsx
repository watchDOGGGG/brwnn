import { useState } from "react";
import { Link } from "react-router-dom";

const PILLARS = [
  { label: "Move", emoji: "🏃🏾‍♀️", color: "bg-brwnn-green", text: "text-brwnn-green" },
  { label: "Laugh", emoji: "😄", color: "bg-brwnn-orange", text: "text-brwnn-orange" },
  { label: "Thrive", emoji: "🌿", color: "bg-brwnn-purple", text: "text-purple-300" },
  { label: "Connect", emoji: "🤝", color: "bg-brwnn-green", text: "text-brwnn-green" },
  { label: "Lead", emoji: "✨", color: "bg-brwnn-orange", text: "text-brwnn-orange" },
  { label: "Live Well", emoji: "💛", color: "bg-brwnn-purple", text: "text-purple-300" },
];

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brwnn-purple-dark via-brwnn-purple to-brwnn-green">
      {!imgFailed && (
        <img
          src="/images/hero-walk.jpg"
          alt=""
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <h1 className="font-heading font-black leading-[1.05] tracking-tight text-4xl sm:text-6xl">
          <span className="block text-white">MOVE TOGETHER.</span>
          <span className="block text-brwnn-green">LAUGH FREELY.</span>
          <span className="block text-fuchsia-400">THRIVE DAILY.</span>
        </h1>

        <p className="mt-6 max-w-lg text-white/90 text-base sm:text-lg">
          A lifestyle movement empowering Black women to reconnect with
          nature, build resilience, and live well together.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/membership"
            className="rounded-full bg-brwnn-pink text-white font-bold text-sm px-6 py-3.5 hover:bg-brwnn-pink/90 transition"
          >
            JOIN THE MOVEMENT
          </Link>
          <Link
            to="/about"
            className="rounded-full border-2 border-white/70 text-white font-bold text-sm px-6 py-3.5 hover:bg-white/10 transition"
          >
            LEARN MORE
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-2xl">
          {PILLARS.map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-2 text-center">
              <div
                className={`w-14 h-14 rounded-full ${p.color} flex items-center justify-center text-2xl shadow-md`}
              >
                <span aria-hidden>{p.emoji}</span>
              </div>
              <p className={`text-xs font-bold uppercase tracking-wide ${p.text}`}>
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
