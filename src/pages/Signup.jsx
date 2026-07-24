import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmEmailSent, setConfirmEmailSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { needsEmailConfirmation } = await signup(form);
      if (needsEmailConfirmation) {
        setConfirmEmailSent(true);
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmEmailSent) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5 py-16 text-center">
        <div className="max-w-sm">
          <h1 className="font-heading font-extrabold text-3xl text-brwnn-purple-dark">
            Check your email 💌
          </h1>
          <p className="mt-3 text-ink-soft">
            We sent a confirmation link to <strong>{form.email}</strong>.
            Click it to activate your account, then log in.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block rounded-full bg-brwnn-purple-dark text-white font-bold px-6 py-3"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-heading font-extrabold text-3xl text-brwnn-purple-dark text-center">
          Join the Movement
        </h1>
        <p className="mt-2 text-center text-ink-soft">
          Create your BRWNN membership account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-brwnn-purple-dark mb-1">
              Full name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brwnn-purple"
            />
          </div>
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
              minLength={6}
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-brwnn-purple"
            />
          </div>

          {error && <p className="text-sm text-brwnn-pink">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brwnn-pink text-white font-bold py-3 hover:bg-brwnn-pink/90 transition disabled:opacity-60"
          >
            {submitting ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Already a member?{" "}
          <Link to="/login" className="text-brwnn-pink font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
