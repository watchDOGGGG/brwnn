import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form);
      const from = location.state?.from || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-heading font-extrabold text-3xl text-brwnn-purple-dark text-center">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-ink-soft">
          Log in to your BRWNN member portal.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-brwnn-purple-dark mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brwnn-purple"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brwnn-purple-dark mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brwnn-purple"
            />
          </div>

          {error && <p className="text-sm text-brwnn-pink">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brwnn-purple-dark text-white font-bold py-3 hover:bg-brwnn-purple transition disabled:opacity-60"
          >
            {submitting ? "Logging in…" : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Not a member yet?{" "}
          <Link to="/signup" className="text-brwnn-pink font-semibold">
            Join now
          </Link>
        </p>
      </div>
    </section>
  );
}
