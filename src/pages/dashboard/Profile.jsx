import { useRef, useState } from "react";
import { PROGRESS, ACHIEVEMENTS } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { uploadImage } from "../../lib/cloudinary";
import Photo from "../../components/Photo";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    bio: user?.bio || "",
    location: user?.location || "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateProfile(form);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      await updateProfile({ avatar_url: url });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
        My Profile
      </h1>

      {error && (
        <p className="text-sm text-brwnn-pink bg-brwnn-pink/10 rounded-lg px-4 py-2">{error}</p>
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="relative shrink-0">
          <Photo
            src={user.avatarUrl || "/images/avatar.jpg"}
            emoji="👩🏾"
            className="w-24 h-24 rounded-full"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute -bottom-1 -right-1 rounded-full bg-brwnn-purple-dark text-white text-xs w-8 h-8 flex items-center justify-center shadow-md disabled:opacity-60"
            aria-label="Change photo"
          >
            {uploading ? "…" : "📷"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div className="text-center sm:text-left flex-1 w-full">
          <div className="flex items-center justify-center sm:justify-between gap-2">
            <h2 className="font-bold text-lg text-brwnn-purple-dark">{user.name}</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-sm font-semibold text-brwnn-pink"
              >
                Edit
              </button>
            )}
          </div>
          <p className="text-sm text-brwnn-pink font-semibold">{user.plan}</p>
          <p className="text-sm text-ink-soft">{user.email}</p>

          {editing ? (
            <form onSubmit={handleSave} className="mt-4 space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-brwnn-purple-dark mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brwnn-purple resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brwnn-purple-dark mb-1">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brwnn-purple"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-brwnn-purple-dark text-white text-sm font-semibold px-4 py-1.5 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-full bg-paper text-ink-soft text-sm font-semibold px-4 py-1.5"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-sm text-ink-soft mt-2">
                {user.bio || "No bio added yet."}
              </p>
              <div className="mt-3 text-sm text-ink-soft space-y-1">
                <p>Member Since: {user.memberSince}</p>
                <p>Location: {user.location || "Not set"}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-3">Progress</h2>
          <div className="space-y-3">
            {PROGRESS.map((p) => (
              <div key={p.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-soft">
                  <span aria-hidden>{p.icon}</span>
                  {p.label}
                </span>
                <span className="font-bold text-brwnn-purple-dark">{p.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-brwnn-purple-dark mb-3">Achievements</h2>
          <div className="flex gap-3 text-3xl">
            {ACHIEVEMENTS.map((a, i) => (
              <span key={i} aria-hidden>{a}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
