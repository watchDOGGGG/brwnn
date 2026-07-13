import { useState } from "react";
import { SISTERHOOD_ACTIVITY } from "../../config";

const TABS = ["All Posts", "My Groups", "Events"];

export default function PortalCommunity() {
  const [tab, setTab] = useState("All Posts");
  const [post, setPost] = useState("");

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

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="What's on your mind?"
          rows={2}
          className="w-full resize-none outline-none text-sm"
        />
        <div className="flex justify-end">
          <button
            disabled={!post}
            className="rounded-full bg-brwnn-pink text-white text-sm font-semibold px-4 py-1.5 disabled:opacity-40"
          >
            Post
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {SISTERHOOD_ACTIVITY.map((a) => (
          <div key={a.text} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-brwnn-purple-dark">{a.name}</span> {a.text}
            </p>
            <p className="text-xs text-ink-soft/70 mt-1">{a.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
