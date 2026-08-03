import { useEffect, useState } from "react";
import { SISTERHOOD_ACTIVITY } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { fetchPosts, createPost, timeAgo } from "../../lib/dashboardData";

const TABS = ["All Posts", "My Groups", "Events"];

export default function PortalCommunity() {
  const { user } = useAuth();
  const [tab, setTab] = useState("All Posts");
  const [draft, setDraft] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handlePost(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    setPosting(true);
    setError("");
    try {
      const created = await createPost(user?.name || "You", draft.trim());
      setPosts((p) => [created, ...p]);
      setDraft("");
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  }

  const realFeed = posts.map((p) => ({
    name: p.author_name,
    text: p.body,
    time: timeAgo(p.created_at),
  }));
  const feed = tab === "My Groups" ? [] : [...realFeed, ...SISTERHOOD_ACTIVITY];

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
        Community
      </h1>

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === t
                ? "bg-brwnn-purple-dark text-white"
                : "bg-white text-ink-soft border border-black/5"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-sm text-brwnn-pink bg-brwnn-pink/10 rounded-lg px-4 py-2">{error}</p>
      )}

      <form onSubmit={handlePost} className="bg-white rounded-xl p-4 shadow-sm">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What's on your mind?"
          rows={2}
          className="w-full resize-none outline-none text-sm"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!draft.trim() || posting}
            className="rounded-full bg-brwnn-pink text-white text-sm font-semibold px-4 py-1.5 disabled:opacity-40"
          >
            {posting ? "Posting…" : "Post"}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {loading && (
          <p className="text-sm text-ink-soft text-center py-6">Loading posts…</p>
        )}
        {!loading &&
          feed.map((a, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm text-ink-soft">
                <span className="font-semibold text-brwnn-purple-dark">{a.name}</span> {a.text}
              </p>
              <p className="text-xs text-ink-soft/70 mt-1">{a.time}</p>
            </div>
          ))}
        {!loading && feed.length === 0 && (
          <p className="text-sm text-ink-soft text-center py-6">
            No posts here yet.
          </p>
        )}
      </div>
    </div>
  );
}
