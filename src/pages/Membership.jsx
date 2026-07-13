import BecomeMember from "../components/BecomeMember";
import { LINKS } from "../config";

const TIERS = [
  {
    name: "Community",
    price: "Free",
    perks: ["Access to public events", "WhatsApp community", "Monthly newsletter"],
  },
  {
    name: "Premium Sister",
    price: "£12/mo",
    perks: ["Everything in Community", "Member-only retreats", "Merch & programme discounts", "Priority event booking"],
    highlight: true,
  },
];

export default function Membership() {
  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Membership
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-4xl sm:text-6xl text-brwnn-purple-dark">
          Choose your sisterhood tier.
        </h1>
      </section>

      <section className="pb-20 px-5">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-7 ${
                t.highlight
                  ? "bg-brwnn-purple-dark text-white shadow-lg"
                  : "bg-brwnn-sand text-brwnn-purple-dark"
              }`}
            >
              <h2 className="font-heading font-bold text-xl">{t.name}</h2>
              <p className="mt-2 text-2xl font-extrabold">{t.price}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                        t.highlight ? "bg-brwnn-green" : "bg-brwnn-green text-white"
                      }`}
                    >
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 inline-block rounded-full font-bold text-sm px-6 py-3 transition ${
                  t.highlight
                    ? "bg-brwnn-pink text-white hover:bg-brwnn-pink/90"
                    : "bg-brwnn-purple-dark text-white hover:bg-brwnn-purple"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      <BecomeMember />
    </>
  );
}
