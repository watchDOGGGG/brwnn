import { useEffect, useState } from "react";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../../lib/adminData";
import { uploadImage } from "../../lib/cloudinary";
import Photo from "../../components/Photo";
import AttendeesPanel from "./AttendeesPanel";

const EMPTY_FORM = {
  title: "",
  description: "",
  location: "",
  event_date: "",
  event_time: "",
  image_url: "",
};

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    fetchEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, image_url: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function startEdit(event) {
    setEditingId(event.id);
    setForm({
      title: event.title,
      description: event.description,
      location: event.location,
      event_date: event.event_date,
      event_time: event.event_time,
      image_url: event.image_url,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        const updated = await updateEvent(editingId, form);
        setEvents((evts) => evts.map((ev) => (ev.id === editingId ? updated : ev)));
      } else {
        const created = await createEvent(form);
        setEvents((evts) => [...evts, created].sort((a, b) => a.event_date.localeCompare(b.event_date)));
      }
      cancelEdit();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setError("");
    try {
      await deleteEvent(id);
      setEvents((evts) => evts.filter((ev) => ev.id !== id));
      if (editingId === id) cancelEdit();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-6">
      <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
        <h2 className="font-bold text-brwnn-purple-dark mb-4">
          {editingId ? "Edit Event" : "Create Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="Event title"
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brwnn-purple"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brwnn-purple resize-none"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brwnn-purple"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="event_date"
              required
              value={form.event_date}
              onChange={handleChange}
              className="rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brwnn-purple"
            />
            <input
              name="event_time"
              value={form.event_time}
              onChange={handleChange}
              placeholder="e.g. 10:00 AM"
              className="rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brwnn-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brwnn-purple-dark mb-1">Photo</label>
            {form.image_url && (
              <Photo src={form.image_url} emoji="🌿" className="h-28 rounded-lg mb-2" />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-xs" />
            {uploading && <p className="text-xs text-ink-soft mt-1">Uploading…</p>}
          </div>

          {error && <p className="text-sm text-brwnn-pink">{error}</p>}

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-full bg-brwnn-purple-dark text-white text-sm font-semibold px-5 py-2 disabled:opacity-50"
            >
              {saving ? "Saving…" : editingId ? "Update Event" : "Create Event"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-full bg-paper text-ink-soft text-sm font-semibold px-5 py-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-bold text-brwnn-purple-dark mb-4">
          All Events ({events.length})
        </h2>
        {loading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : (
          <div className="space-y-3">
            {events.map((ev) => (
              <div key={ev.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 flex gap-4 items-center">
                  <Photo src={ev.image_url} emoji="🌿" className="w-20 h-20 rounded-lg shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-brwnn-purple-dark">{ev.title}</p>
                    <p className="text-xs text-ink-soft">
                      📅 {ev.event_date} · ⏰ {ev.event_time || "—"} · 📍 {ev.location || "—"}
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => setExpandedId(expandedId === ev.id ? null : ev.id)}
                      className="text-sm font-semibold text-brwnn-purple-dark"
                    >
                      {expandedId === ev.id ? "Hide" : "Attendees"}
                    </button>
                    <button onClick={() => startEdit(ev)} className="text-sm font-semibold text-brwnn-pink">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(ev.id)} className="text-sm font-semibold text-ink-soft">
                      Delete
                    </button>
                  </div>
                </div>
                {expandedId === ev.id && <AttendeesPanel eventId={ev.id} />}
              </div>
            ))}
            {events.length === 0 && (
              <p className="text-sm text-ink-soft">No events yet — create one on the left.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
