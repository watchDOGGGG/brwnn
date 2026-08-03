export default function ComingSoon({ label = "Coming soon" }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 text-ink-soft">
      <span className="text-3xl mb-2" aria-hidden>🚧</span>
      <p className="font-semibold text-brwnn-purple-dark">{label}</p>
      <p className="text-xs mt-1">We're still building this one out.</p>
    </div>
  );
}
