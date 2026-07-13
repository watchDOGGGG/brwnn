import { useState } from "react";
import { Link } from "react-router-dom";
import { LINKS, PROGRAMMES } from "../config";
import Photo from "./Photo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <footer className="bg-brwnn-purple-dark text-white">
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <Photo src="/images/logo.png" emoji="🌿" className="w-12 h-12 rounded-full" />
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Empowering Black women to move together, laugh freely and thrive
            daily through nature, community and joy.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide mb-3">
            Quick Links
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/programmes" className="hover:text-white transition">Programmes</Link></li>
            <li><Link to="/membership" className="hover:text-white transition">Membership</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide mb-3">
            Programmes
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            {PROGRAMMES.map((p) => (
              <li key={p.title}>
                <Link to="/programmes" className="hover:text-white transition">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide mb-3">
            Resources
          </p>
          <ul className="space-y-2 text-sm text-white/70 mb-6">
            <li><Link to="/resources" className="hover:text-white transition">Blog</Link></li>
            <li><Link to="/resources" className="hover:text-white transition">Wellbeing Tips</Link></li>
            <li><Link to="/resources" className="hover:text-white transition">Guides &amp; Tools</Link></li>
            <li><Link to="/resources" className="hover:text-white transition">Videos</Link></li>
            <li><Link to="/resources" className="hover:text-white transition">FAQ</Link></li>
          </ul>

          <p className="text-sm font-bold uppercase tracking-wide mb-3">
            Get Connected
          </p>
          <div className="flex gap-3 mb-4 text-sm">
            <a href={LINKS.facebook} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition">FB</a>
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition">IG</a>
            <a href={LINKS.tiktok} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition">TikTok</a>
            <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition">WhatsApp</a>
          </div>
          <p className="text-xs text-white/60 mb-2">Subscribe to our newsletter</p>
          <form onSubmit={handleSubmit} className="flex gap-1.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-md px-3 py-2 text-xs text-brwnn-purple-dark outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-brwnn-pink text-white text-xs font-bold px-3"
            >
              SUBSCRIBE
            </button>
          </form>
          {submitted && (
            <p className="mt-2 text-xs text-white/60">Thanks for subscribing! 💜</p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <p>© {new Date().getFullYear()} BRWNN CIC. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
            <span>Website by BRWNN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
