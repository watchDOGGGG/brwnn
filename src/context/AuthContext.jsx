import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { mapSupabaseUser, mergeProfile } from "../lib/mapUser";
import { fetchMyProfile } from "../lib/adminData";

const AuthContext = createContext(null);

async function withProfile(baseUser) {
  if (!baseUser) return null;
  try {
    const profile = await fetchMyProfile(baseUser.id);
    return mergeProfile(baseUser, profile);
  } catch {
    // Profile row may not exist yet (e.g. trigger hasn't run) — fall back
    // to the base auth-derived user rather than blocking login.
    return baseUser;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data }) => {
      setUser(await withProfile(mapSupabaseUser(data.session?.user)));
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(await withProfile(mapSupabaseUser(session?.user)));
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  function assertConfigured() {
    if (!isSupabaseConfigured) {
      throw new Error(
        "Supabase isn't configured yet — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to a .env file."
      );
    }
  }

  async function signup({ name, email, password }) {
    assertConfigured();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(error.message);

    if (!data.session) {
      // Email confirmation is required before a session exists.
      return { user: null, needsEmailConfirmation: true };
    }
    const mapped = await withProfile(mapSupabaseUser(data.user));
    setUser(mapped);
    return { user: mapped, needsEmailConfirmation: false };
  }

  async function login({ email, password }) {
    assertConfigured();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    const mapped = await withProfile(mapSupabaseUser(data.user));
    setUser(mapped);
    return mapped;
  }

  async function logout() {
    assertConfigured();
    await supabase.auth.signOut();
    setUser(null);
  }

  async function updateProfile(patch) {
    assertConfigured();
    const { data, error } = await supabase.auth.updateUser({ data: patch });
    if (error) throw new Error(error.message);
    const mapped = await withProfile(mapSupabaseUser(data.user));
    setUser(mapped);
    return mapped;
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout, updateProfile, isSupabaseConfigured }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
