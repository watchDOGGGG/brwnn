import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Photo from "../components/Photo";
import { useAuth } from "../context/AuthContext";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠", end: true },
  { to: "/dashboard/profile", label: "My Profile", icon: "👤" },
  { to: "/dashboard/events", label: "Events", icon: "📅" },
  { to: "/dashboard/programmes", label: "Programmes", icon: "🌿" },
  { to: "/dashboard/courses", label: "Courses & Resources", icon: "📚" },
  { to: "/dashboard/community", label: "Community", icon: "💬" },
  { to: "/dashboard/wellbeing", label: "Wellbeing Tracker", icon: "📈" },
  { to: "/dashboard/shop", label: "Shop & Discounts", icon: "🛍️" },
  { to: "/dashboard/messages", label: "Messages", icon: "✉️", badge: 1 },
  { to: "/dashboard/announcements", label: "Announcements", icon: "📢" },
  { to: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

function SidebarContent({ onNavigate }) {
  const { logout } = useAuth();
  return (
    <>
      <NavLink to="/" className="flex items-center gap-2 px-5 pt-6 pb-4" onClick={onNavigate}>
        <Photo src="/images/logo.png" emoji="🌿" className="w-9 h-9 rounded-full" />
        <div>
          <p className="font-heading font-extrabold text-white leading-tight">B.R.W.N.N.</p>
          <p className="text-[9px] text-white/50 uppercase tracking-wide leading-tight">
            Black Resilient Women in Nature
          </p>
        </div>
      </NavLink>

      <nav className="mt-2 flex-1 overflow-y-auto px-3 space-y-0.5">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span aria-hidden>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="rounded-full bg-brwnn-pink text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center px-1.5">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => {
          onNavigate?.();
          logout();
        }}
        className="m-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
      >
        <span aria-hidden>↩️</span> Logout
      </button>
    </>
  );
}

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-paper">
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-brwnn-purple-dark">
        <SidebarContent />
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 flex flex-col bg-brwnn-purple-dark">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
          <button
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-black/5 h-14 flex items-center justify-between px-4">
          <span className="font-heading font-extrabold text-brwnn-purple-dark">
            B.R.W.N.N. Portal
          </span>
          <button onClick={() => setOpen(true)} className="text-2xl leading-none" aria-label="Open menu">
            ☰
          </button>
        </header>

        <main className="p-4 sm:p-8 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
