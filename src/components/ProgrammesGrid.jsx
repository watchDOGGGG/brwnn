import { PROGRAMMES } from "../config";
import Photo from "./Photo";

export default function ProgrammesGrid() {
  return (
    <section className="bg-brwnn-sand px-5 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brwnn-purple-dark">
          Our Programmes
        </h2>
        <p className="mt-2 text-ink-soft">
          Experience the power of nature and sisterhood.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5 text-left">
          {PROGRAMMES.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <Photo src={p.image} emoji="🌿" className="h-32 sm:h-36" />
              <div className="p-4">
                <h3 className="font-heading font-bold text-sm sm:text-base text-brwnn-purple-dark">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-ink-soft">{p.text}</p>
                <a
                  href="/programmes"
                  className="mt-2 inline-block text-xs sm:text-sm font-bold text-brwnn-pink"
                >
                  LEARN MORE ›
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
