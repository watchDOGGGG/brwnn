import { useState } from "react";
import { LINKS } from "../config";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Contact
        </p>
        <h1 className="mt-2 font-extrabold section-tight text-4xl sm:text-6xl">
          Let's stay connected.
        </h1>
        <p className="mt-5 text-lg text-ink-soft max-w-xl mx-auto">
          Join our mailing list for events and updates, or reach us directly.
        </p>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-full border border-black/10 px-5 py-3 outline-none focus:border-brwnn-purple"
            />
            <button
              type="submit"
              className="rounded-full bg-ink text-white font-semibold px-6 py-3 hover:bg-brwnn-purple transition"
            >
              Subscribe
            </button>
          </form>
          {submitted && (
            <p className="mt-3 text-center text-sm text-ink-soft">
              Thanks for subscribing — welcome to the sisterhood 💜
            </p>
          )}

          <div className="mt-14 space-y-4 text-center">
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-[#25D366] text-white font-semibold px-6 py-3 hover:opacity-90 transition"
            >
              💬 Join WhatsApp Community
            </a>
            <div className="flex justify-center gap-6 text-sm text-ink-soft pt-2">
              <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="hover:text-ink transition">
                Instagram
              </a>
              <a href={LINKS.facebook} target="_blank" rel="noreferrer" className="hover:text-ink transition">
                Facebook
              </a>
              <a href={LINKS.tiktok} target="_blank" rel="noreferrer" className="hover:text-ink transition">
                TikTok
              </a>
            </div>
            <div className="pt-4 text-sm text-ink-soft space-y-1">
              <p>
                <a href={`mailto:${LINKS.email}`} className="hover:text-ink transition">
                  {LINKS.email}
                </a>
              </p>
              <p>{LINKS.website}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
