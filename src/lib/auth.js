const USERS_KEY = "brwnn_users";
const SESSION_KEY = "brwnn_current_user_email";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublicUser(user) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

export function getCurrentUser() {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  const user = readUsers().find((u) => u.email === email);
  return toPublicUser(user);
}

export function signup({ name, email, password }) {
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }
  const user = {
    name,
    email,
    password,
    plan: "Community Member",
    memberSince: new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    location: "",
    bio: "",
  };
  users.push(user);
  writeUsers(users);
  localStorage.setItem(SESSION_KEY, email);
  return toPublicUser(user);
}

export function login({ email, password }) {
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password.");
  }
  localStorage.setItem(SESSION_KEY, email);
  return toPublicUser(user);
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function updateCurrentUser(patch) {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  const users = readUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch };
  writeUsers(users);
  return toPublicUser(users[idx]);
}
