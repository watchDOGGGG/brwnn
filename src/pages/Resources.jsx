const RESOURCES = [
  { title: "5 Ways to Reconnect With Nature This Week", tag: "Blog" },
  { title: "A Beginner's Guide to Wellness Walking", tag: "Guide" },
  { title: "Why Laughter Is Medicine", tag: "Wellbeing Tips" },
  { title: "Building Sisterhood: A BRWNN Story", tag: "Blog" },
];

export default function Resources() {
  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Resources
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-4xl sm:text-6xl text-brwnn-purple-dark">
          Tools for your wellbeing journey.
        </h1>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-3xl mx-auto space-y-4">
          {RESOURCES.map((r) => (
            <div
              key={r.title}
              className="flex items-center justify-between bg-brwnn-sand rounded-xl px-5 py-4"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brwnn-pink">
                  {r.tag}
                </p>
                <h2 className="font-heading font-semibold text-brwnn-purple-dark mt-1">
                  {r.title}
                </h2>
              </div>
              <span className="text-brwnn-purple-dark font-bold">›</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
