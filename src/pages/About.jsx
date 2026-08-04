import { Link } from "react-router-dom";
import Photo from "../components/Photo";

const WHY_LIST = [
  "Stress became lighter.",
  "Laughter became louder.",
  "Friendships grew naturally.",
  "Confidence returned.",
  "Joy reappeared.",
];

const LIFESTYLE = [
  { emoji: "🌿", title: "Nature", text: "Reconnect with yourself through Scotland's beautiful outdoor spaces." },
  { emoji: "💛", title: "Wellbeing", text: "Wellbeing should become a lifestyle — not an occasional event." },
  { emoji: "🤝", title: "Sisterhood", text: "Meaningful friendships transform lives." },
  { emoji: "😄", title: "Joy", text: "Laughter is part of healing." },
  { emoji: "🌱", title: "Growth", text: "Every walk is another step towards becoming your best self." },
  { emoji: "🏡", title: "Community", text: "Everyone deserves somewhere they truly belong." },
];

export default function About() {
  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Meet Our Founder
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-4xl sm:text-6xl text-brwnn-purple-dark">
          Building a lifestyle movement where Black women thrive.
        </h1>
        <p className="mt-5 text-lg text-ink-soft max-w-xl mx-auto">
          "I believe every Black woman deserves a place where she can
          reconnect with nature, discover genuine sisterhood and experience
          wellbeing as a way of life."
        </p>
        <Link
          to="/signup"
          className="mt-7 inline-block rounded-full bg-brwnn-pink text-white font-bold px-7 py-3 hover:bg-brwnn-pink/90 transition"
        >
          Join the Movement
        </Link>
      </section>

      {/* Meet the founder */}
      <section className="px-5 py-14 sm:py-20 bg-brwnn-sand">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-10 items-center">
          <Photo
            src="/images/founder.jpg"
            emoji="👩🏾"
            className="h-72 sm:h-96 rounded-3xl shadow-lg order-1"
          />
          <div className="order-2">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brwnn-purple-dark">
              Welcome...
            </h2>
            <div className="mt-4 space-y-4 text-ink-soft">
              <p>
                My name is <strong className="text-brwnn-purple-dark">Ugo Iwegbu</strong>,
                Founder of BRWNN (Black Resilient Women in Nature Network).
              </p>
              <p>I didn't create BRWNN simply to organise events.</p>
              <p>
                I created BRWNN because I believe Black women deserve spaces
                where they can laugh without pressure, move without
                judgement, reconnect with nature, build genuine friendships
                and leave feeling stronger than when they arrived.
              </p>
              <p>
                Every BRWNN experience is intentionally designed around joy,
                wellbeing, movement, community and belonging.
              </p>
              <p>Our vision is simple:</p>
              <p className="font-heading font-extrabold text-xl text-brwnn-pink">
                Come As You Are.
                <br />
                Leave Better.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brwnn-purple-dark text-white px-5 py-16 sm:py-24 text-center">
        <p className="max-w-2xl mx-auto text-xl sm:text-2xl italic">
          "Nature doesn't ask us to become someone else. It simply reminds us
          who we've always been."
        </p>
        <p className="mt-4 font-semibold text-white/70">— Ugo Iwegbu</p>
      </section>

      {/* Why BRWNN exists */}
      <section className="px-5 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brwnn-pink">
              Why BRWNN Exists
            </p>
            <div className="mt-4 space-y-4 text-ink-soft">
              <p>
                Throughout my journey I met many incredible women carrying
                enormous responsibilities.
              </p>
              <p>
                Many were caring for families, building careers and
                supporting communities while placing their own wellbeing
                last. Yet something remarkable happened whenever women spent
                time together outdoors:
              </p>
              <ul className="space-y-2">
                {WHY_LIST.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brwnn-pink shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-semibold text-brwnn-purple-dark">
                Those moments inspired BRWNN.
              </p>
            </div>
          </div>
          <Photo
            src="/images/dashboard-hero.jpg"
            emoji="😄"
            className="h-72 sm:h-96 rounded-3xl shadow-lg"
          />
        </div>
      </section>

      {/* The BRWNN lifestyle */}
      <section className="bg-brwnn-sand px-5 py-14 sm:py-20">
        <h2 className="text-center font-heading font-extrabold text-2xl sm:text-4xl text-brwnn-purple-dark">
          The BRWNN Lifestyle
        </h2>
        <div className="mt-10 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
          {LIFESTYLE.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
              <span className="text-2xl sm:text-3xl" aria-hidden>{v.emoji}</span>
              <h3 className="mt-2 font-heading font-bold text-brwnn-purple-dark">{v.title}</h3>
              <p className="mt-1 text-xs sm:text-sm text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brwnn-purple-dark text-white px-5 py-16 sm:py-24 text-center">
        <p className="max-w-2xl mx-auto text-xl sm:text-2xl italic">
          "My dream is for thousands of Black women across Scotland to
          discover that nature belongs to them too — and that together we are
          stronger."
        </p>
      </section>

      {/* Personal invitation */}
      <section className="px-5 py-14 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brwnn-purple-dark">
            A Personal Invitation
          </h2>
          <div className="mt-4 space-y-2 text-ink-soft">
            <p>Whether this is your first woodland walk...</p>
            <p>Your first dance...</p>
            <p>Your first volunteer experience...</p>
            <p>Or your first time meeting women who understand your journey...</p>
          </div>
          <p className="mt-4 font-semibold text-brwnn-purple-dark">
            There is a place for you here.
          </p>
          <p className="mt-2 text-ink-soft">
            I would be honoured to welcome you into the BRWNN family.
          </p>
          <p className="mt-6 font-heading font-extrabold text-2xl text-brwnn-pink">
            Move.
            <br />
            Laugh.
            <br />
            Thrive.
          </p>
          <p className="mt-6 text-ink-soft">
            <strong className="text-brwnn-purple-dark">Ugo Iwegbu</strong>
            <br />
            Founder, BRWNN
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-block rounded-full bg-brwnn-purple-dark text-white font-bold px-7 py-3 hover:bg-brwnn-purple transition"
          >
            Become a Member
          </Link>
        </div>
      </section>
    </>
  );
}
