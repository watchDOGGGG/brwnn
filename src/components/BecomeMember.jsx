import { Link } from "react-router-dom";
import { MEMBER_BENEFITS } from "../config";
import Photo from "./Photo";

export default function BecomeMember() {
  return (
    <section className="bg-brwnn-purple-dark px-5 py-16 sm:py-24 text-white">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl">
            Become a Member
          </h2>
          <p className="mt-4 text-white/80">
            Join our exclusive membership and enjoy access to:
          </p>
          <ul className="mt-5 space-y-3">
            {MEMBER_BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/90">
                <span className="w-6 h-6 rounded-full bg-brwnn-green flex items-center justify-center text-xs shrink-0">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
          <Link
            to="/signup"
            className="mt-8 inline-block rounded-full bg-brwnn-pink text-white font-bold text-sm px-6 py-3 hover:bg-brwnn-pink/90 transition"
          >
            JOIN NOW
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="w-56 sm:w-64 rounded-[2rem] border-4 border-white/20 bg-brwnn-purple shadow-2xl p-3">
            <Photo src="/images/app-preview.jpg" emoji="📱" className="h-96 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
