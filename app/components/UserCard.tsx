import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { User } from "../types/user";

type UserCardProps = {
  user: User;
  index: number;
};

export function UserCard({ user, index }: UserCardProps) {
  const fullName = `${user.name.first} ${user.name.last}`;
  const locationText = `${user.location.city}, ${user.location.country}`;
  const online = user.dob.age >= 30;
  const avatarEmoji = user.gender === "female" ? "👩" : "👨";
  const company = user.location.state || "Independent";
  const avatarGradients = [
    "from-sky-500 to-cyan-400",
    "from-violet-500 to-fuchsia-400",
    "from-emerald-500 to-lime-400",
    "from-amber-500 to-orange-400",
    "from-rose-500 to-pink-400",
  ];
  const avatarGradient = avatarGradients[index % avatarGradients.length];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-4 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.3)] backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_-18px_rgba(15,23,42,0.35)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${avatarGradient} text-xl text-white shadow-sm ring-1 ring-white/70 sm:h-14 sm:w-14 sm:text-2xl`}>
            {avatarEmoji}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-slate-900">{fullName}</h3>
            <p className="truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            online
              ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-slate-200 text-slate-700 ring-1 ring-slate-300"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-slate-500"}`} />
          {online ? "Online" : "Offline"}
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-2 text-sm text-slate-600 sm:mt-5">
        <div className="flex min-w-0 items-start gap-2">
          <FiPhone className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="min-w-0 break-all">{user.phone}</span>
        </div>
        <div className="flex min-w-0 items-start gap-2">
          <FiMail className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="min-w-0 break-all">{company}</span>
        </div>
        <div className="flex min-w-0 items-start gap-2">
          <FiMapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="min-w-0 break-all">{locationText}</span>
        </div>
      </div>
    </article>
  );
}
