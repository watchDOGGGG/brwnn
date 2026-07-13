const WHAT_WE_DO = [
  { emoji: "🚶🏾‍♀️", title: "Walk", text: "Explore beautiful outdoor spaces together." },
  { emoji: "😂", title: "Laugh", text: "Because joy is wellness too." },
  { emoji: "🤝", title: "Connect", text: "Build friendships and support networks." },
  { emoji: "🌿", title: "Thrive", text: "Relax. Recharge. Reset." },
];

const VALUES = [
  { emoji: "🌿", text: "Connect with nature" },
  { emoji: "😄", text: "Laugh more" },
  { emoji: "🤝", text: "Build meaningful friendships" },
  { emoji: "💛", text: "Prioritise wellbeing" },
  { emoji: "✨", text: "Embrace soft life energy" },
];

export default function About() {
  return (
    <>
      <section className="pt-16 pb-16 sm:pt-24 sm:pb-24 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          About BRWNN
        </p>
        <h1 className="mt-2 font-extrabold section-tight text-4xl sm:text-6xl">
          Wellness, nature and sisterhood — together.
        </h1>
        <p className="mt-5 text-lg text-ink-soft max-w-xl mx-auto">
          We create uplifting experiences that help Black women reconnect
          with nature, wellbeing and each other.
        </p>
      </section>

      <div
        className="h-[50vh] sm:h-[65vh] bg-cover bg-center"
        style={{ backgroundImage: "url(/images/woodland-walk.jpg)" }}
      />

      <section className="py-16 sm:py-24 px-5 max-w-2xl mx-auto text-center">
        <h2 className="font-extrabold section-tight text-2xl sm:text-3xl">
          What we believe in
        </h2>
        <ul className="mt-8 space-y-4">
          {VALUES.map((v) => (
            <li
              key={v.text}
              className="flex items-center justify-center gap-3 text-lg text-ink-soft"
            >
              <span className="text-2xl" aria-hidden>
                {v.emoji}
              </span>
              {v.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-paper py-16 sm:py-24 px-5">
        <h2 className="text-center font-extrabold section-tight text-2xl sm:text-3xl">
          What we do
        </h2>
        <div className="mt-10 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {WHAT_WE_DO.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-2xl p-6 text-center shadow-sm"
            >
              <span className="text-3xl" aria-hidden>
                {c.emoji}
              </span>
              <h3 className="mt-3 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
