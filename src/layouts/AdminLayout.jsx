import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-brwnn-purple-dark text-white">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-heading font-extrabold">BRWNN Admin</span>
            <nav className="flex gap-4 text-sm font-medium">
              <NavLink
                to="/myadmin"
                end
                className={({ isActive }) => (isActive ? "text-white" : "text-white/60 hover:text-white")}
              >
                Users
              </NavLink>
              <NavLink
                to="/myadmin/events"
                className={({ isActive }) => (isActive ? "text-white" : "text-white/60 hover:text-white")}
              >
                Events
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/60 hidden sm:inline">{user?.email}</span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
