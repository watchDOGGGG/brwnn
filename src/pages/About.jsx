import Photo from "../components/Photo";

const PILLARS = [
  { emoji: "🌿", text: "Connect with nature" },
  { emoji: "😄", text: "Laugh more" },
  { emoji: "🤝", text: "Build meaningful friendships" },
  { emoji: "💛", text: "Prioritise wellbeing" },
  { emoji: "✨", text: "Embrace soft life energy" },
];

export default function About() {
  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Our Story
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-4xl sm:text-6xl text-brwnn-purple-dark">
          Soft life starts here.
        </h1>
        <p className="mt-5 text-lg text-ink-soft max-w-xl mx-auto">
          The founder, the moment it began, and the movement it became.
        </p>
      </section>

      {/* Section 1: Founder */}
      <section className="px-5 py-14 sm:py-20 bg-brwnn-sand">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-10 items-center">
          <Photo
            src="/images/founder.jpg"
            emoji="👩🏾"
            className="h-72 sm:h-96 rounded-3xl shadow-lg order-1"
          />
          <div className="order-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brwnn-pink">
              Meet the Founder
            </p>
            <h2 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl text-brwnn-purple-dark">
              A woman who needed her own medicine first.
            </h2>
            <div className="mt-4 space-y-4 text-ink-soft">
              <p>
                BRWNN was founded by a Black woman who, like so many of us,
                spent years pouring into everyone else — work, family,
                community — while quietly running on empty. Burnt out and
                disconnected from herself, she started taking solo walks in
                the woods near her home just to breathe.
              </p>
              <p>
                Those walks became her therapy. She noticed how much lighter
                she felt afterwards, and how rarely she saw other Black
                women doing the same. So she invited a few friends along.
                What started as one woman reclaiming her peace became the
                seed of a whole sisterhood.
              </p>
              <p className="font-semibold text-brwnn-purple-dark">
                "I built the space I wished someone had built for me."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How it started */}
      <section className="px-5 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-10 items-center">
          <div className="order-2 sm:order-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-brwnn-pink">
              How It Started
            </p>
            <h2 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl text-brwnn-purple-dark">
              From five friends on a Saturday morning...
            </h2>
            <div className="mt-4 space-y-4 text-ink-soft">
              <p>
                It began with five women meeting at a local park for a
                simple walk — no agenda beyond fresh air and honest
                conversation. Word spread. The next walk had twelve women.
                Then came the laughter games, because someone brought music
                and nobody could keep a straight face.
              </p>
              <p>
                What made it different was the feeling: no pressure to
                perform, no judgement, just space to move, laugh and be
                fully yourselves. Black Resilient Women in Nature Network
                was officially born, and what had been an informal walking
                group became a registered community organisation with a
                mission to make that feeling accessible to every Black
                woman who needs it.
              </p>
            </div>
          </div>
          <Photo
            src="/images/dashboard-hero.jpg"
            emoji="🌳"
            className="h-72 sm:h-96 rounded-3xl shadow-lg order-1 sm:order-2"
          />
        </div>
      </section>

      {/* Section 3: The movement */}
      <section className="bg-brwnn-purple-dark text-white px-5 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            The Movement Today
          </p>
          <h2 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl">
            A sisterhood, not just a schedule of events.
          </h2>
          <p className="mt-4 text-white/80">
            BRWNN now runs weekly walks, dance therapy sessions, wacky
            laughter games, wellness workshops and retreats across Scotland
            — all rooted in the same idea that started it all: Black women
            deserve space to move, laugh and thrive without having to earn
            it.
          </p>
        </div>

        <ul className="mt-10 max-w-md mx-auto space-y-4">
          {PILLARS.map((v) => (
            <li key={v.text} className="flex items-center justify-center gap-3 text-lg">
              <span className="text-2xl" aria-hidden>
                {v.emoji}
              </span>
              {v.text}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
