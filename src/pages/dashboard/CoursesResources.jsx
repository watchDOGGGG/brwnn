import { useState } from "react";
import { COURSES } from "../../config";

const TABS = ["All Courses", "In Progress", "Completed"];

export default function CoursesResources() {
  const [tab, setTab] = useState("All Courses");

  const filtered = COURSES.filter((c) => {
    if (tab === "Completed") return c.progress === 100;
    if (tab === "In Progress") return c.progress > 0 && c.progress < 100;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
        Courses &amp; Resources
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

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((c) => (
          <div key={c.title} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="h-24 rounded-lg bg-gradient-to-br from-brwnn-purple/20 to-brwnn-green/20" />
            <h2 className="font-semibold text-brwnn-purple-dark mt-3">{c.title}</h2>
            <div className="mt-3 h-1.5 rounded-full bg-paper overflow-hidden">
              <div className="h-full bg-brwnn-pink" style={{ width: `${c.progress}%` }} />
            </div>
            <p className="text-xs text-ink-soft mt-1">{c.progress}% Complete</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-ink-soft">No courses in this category yet.</p>
        )}
      </div>
    </div>
  );
}
