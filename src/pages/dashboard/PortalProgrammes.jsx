import { PROGRAMMES } from "../../config";
import Photo from "../../components/Photo";

export default function PortalProgrammes() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
        Programmes
      </h1>

      <div className="grid sm:grid-cols-3 gap-4">
        {PROGRAMMES.map((p) => (
          <div key={p.title} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <Photo src={p.image} emoji="🌿" className="h-28" />
            <div className="p-4">
              <h2 className="font-semibold text-sm text-brwnn-purple-dark">{p.title}</h2>
              <p className="text-xs text-ink-soft mt-1">{p.text}</p>
              <button className="mt-3 w-full rounded-full bg-brwnn-purple-dark text-white text-xs font-bold py-2">
                Book a Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
