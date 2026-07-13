import Photo from "./Photo";

const POINTS = [
  "We are a sisterhood on a mission to inspire Black women to prioritise their wellbeing through nature, community, and joy.",
  "Whether it's a woodland walk, a dance workout, or a healing retreat, you belong here.",
];

export default function Welcome() {
  return (
    <section className="px-5 py-16 sm:py-24 max-w-6xl mx-auto grid sm:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brwnn-purple-dark">
          Welcome to BRWNN 🌿
        </h2>
        <div className="mt-5 space-y-4 text-ink-soft text-base sm:text-lg">
          {POINTS.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <a
          href="/about"
          className="mt-6 inline-block rounded-full bg-brwnn-green text-white font-bold text-sm px-6 py-3 hover:bg-brwnn-green/90 transition"
        >
          ABOUT OUR STORY
        </a>
      </div>

      <Photo
        src="/images/woodland-walk.jpg"
        emoji="🌳"
        className="h-64 sm:h-80 rounded-3xl shadow-lg"
      />
    </section>
  );
}
