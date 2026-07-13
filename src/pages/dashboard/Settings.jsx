export default function Settings({ title = "Settings" }) {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
        {title}
      </h1>
      <div className="bg-white rounded-xl p-8 shadow-sm text-center text-ink-soft">
        {title} coming soon.
      </div>
    </div>
  );
}
