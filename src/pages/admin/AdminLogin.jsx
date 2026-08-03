import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
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
      const user = await login(form);
      if (!user?.isAdmin) {
        setError("This account doesn't have admin access.");
        return;
      }
      navigate("/myadmin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-brwnn-purple-dark px-5">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl">
        <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark text-center">
          BRWNN Admin
        </h1>
        <p className="mt-2 text-center text-sm text-ink-soft">
          Restricted access — admin accounts only.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
      </div>
    </section>
  );
}
