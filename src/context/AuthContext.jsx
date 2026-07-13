import { createContext, useContext, useState } from "react";
import * as authLib from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authLib.getCurrentUser());

  function signup(fields) {
    const u = authLib.signup(fields);
    setUser(u);
    return u;
  }

  function login(fields) {
    const u = authLib.login(fields);
    setUser(u);
    return u;
  }

  function logout() {
    authLib.logout();
    setUser(null);
  }

  function updateProfile(patch) {
    const u = authLib.updateCurrentUser(patch);
    setUser(u);
    return u;
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
