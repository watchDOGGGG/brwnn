import { useState } from "react";
import { NavLink } from "react-router-dom";
import Photo from "./Photo";

const LINKS_NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programmes", label: "Programmes" },
  { to: "/events", label: "Events" },
  { to: "/membership", label: "Membership" },
  { to: "/shop", label: "Shop" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Photo src="/images/logo.png" emoji="🌿" className="w-9 h-9 rounded-full" />
          <span className="font-heading font-extrabold tracking-tight text-brwnn-purple-dark">
            B.R.W.N.N.
          </span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold uppercase tracking-wide text-ink-soft">
          {LINKS_NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `pb-1 border-b-2 transition ${
                  isActive
                    ? "border-brwnn-pink text-brwnn-purple-dark"
                    : "border-transparent hover:text-brwnn-purple-dark"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <NavLink
            to="/dashboard"
            className="text-sm font-semibold text-ink-soft hover:text-brwnn-purple-dark transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/membership"
            className="rounded-full bg-brwnn-pink text-white text-sm font-semibold px-5 py-2 hover:bg-brwnn-pink/90 transition"
          >
            Join Now
          </NavLink>
        </div>

        <button
          className="lg:hidden text-2xl leading-none text-brwnn-purple-dark"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-black/5 bg-white px-5 py-4 flex flex-col gap-4 text-sm font-semibold">
          {LINKS_NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-brwnn-pink" : "text-ink-soft"
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/membership"
            onClick={() => setOpen(false)}
            className="rounded-full bg-brwnn-pink text-white text-center font-semibold px-4 py-2"
          >
            Join Now
          </NavLink>
        </nav>
      )}
    </header>
  );
}
