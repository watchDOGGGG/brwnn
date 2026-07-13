import { MEMBER, PROGRESS, ACHIEVEMENTS } from "../../config";
import Photo from "../../components/Photo";

export default function Profile() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl text-brwnn-purple-dark">
        My Profile
      </h1>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <Photo src="/images/avatar.jpg" emoji="👩🏾" className="w-24 h-24 rounded-full shrink-0" />
        <div className="text-center sm:text-left">
          <h2 className="font-bold text-lg text-brwnn-purple-dark">{MEMBER.name}</h2>
          <p className="text-sm text-brwnn-pink font-semibold">{MEMBER.plan}</p>
          <p className="text-sm text-ink-soft mt-2">{MEMBER.bio}</p>
          <div className="mt-3 text-sm text-ink-soft space-y-1">
            <p>Member Since: {MEMBER.memberSince}</p>
            <p>Location: {MEMBER.location}</p>
          </div>
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
