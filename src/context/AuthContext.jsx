import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { mapSupabaseUser } from "../lib/mapUser";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(mapSupabaseUser(data.session?.user));
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapSupabaseUser(session?.user));
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
    setUser(mapSupabaseUser(data.user));
    return { user: mapSupabaseUser(data.user), needsEmailConfirmation: false };
  }

  async function login({ email, password }) {
    assertConfigured();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    setUser(mapSupabaseUser(data.user));
    return mapSupabaseUser(data.user);
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
    const mapped = mapSupabaseUser(data.user);
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
