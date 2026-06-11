import { useEffect, useMemo, useState } from "react";
import { FiAlertCircle, FiLoader, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { fetchUsers } from "../services/userService";
import type { User } from "../types/user";

export function Welcome() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "online" | "recent">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedUsers = await fetchUsers();
        if (isMounted) {
          setUsers(fetchedUsers);
        }
      } catch {
        if (isMounted) {
          setError("Could not load users. Please try again later.");
          setUsers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  const uniqueUsers = useMemo(() => {
    const seen = new Set<string>();

    return users.filter((user) => {
      const key = user.login?.uuid || user.id?.value || user.email;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }, [users]);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return uniqueUsers.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      const username = user.login?.username?.toLowerCase() ?? "";
      const searchableText = [
        fullName,
        email,
        username,
        user.location.city,
        user.location.country,
        user.location.state,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      const matchesFilter =
        filter === "all" ||
        (filter === "online" && user.dob.age >= 30) ||
        (filter === "recent" && user.registered.age <= 10);

      return matchesSearch && matchesFilter;
    });
  }, [filter, searchTerm, uniqueUsers]);

  const stats = useMemo(() => {
    const organizations = new Set(filteredUsers.map((user) => user.location.state || "Independent")).size;
    const countries = new Set(filteredUsers.map((user) => user.location.country)).size;

    return [
      { label: "Total users", value: filteredUsers.length },
      { label: "Active sessions", value: filteredUsers.filter((user) => user.dob.age >= 30).length },
      { label: "Organizations", value: organizations },
      { label: "Countries", value: countries },
    ];
  }, [filteredUsers]);

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-4 text-slate-700 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-6">
          <div className="mb-4 grid gap-3 sm:mb-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-1 text-xl font-semibold text-slate-900 sm:mt-2 sm:text-2xl">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-slate-700" htmlFor="user-search">
              Search users
            </label>
            <input
              id="user-search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, email, or city"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none ring-0 sm:px-4 sm:py-3"
            />
          </div>

          <div className="mb-4 flex flex-wrap gap-2 sm:mb-6">
            {[
              { key: "all", label: "All Users" },
              { key: "online", label: "Online Only" },
              { key: "recent", label: "Recently Added" },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setFilter(option.key as "all" | "online" | "recent")}
                className={`rounded-full px-3 py-2 text-sm font-medium sm:px-4 ${
                  filter === option.key
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              <div
                className="col-span-full flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                aria-live="polite"
              >
                <FiLoader className="h-4 w-4 animate-spin text-slate-500" />
                <span>Loading profiles...</span>
              </div>
            ) : null}

            {error ? (
              <div
                className="col-span-full flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
                role="alert"
              >
                <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">We couldn’t load the directory right now.</p>
                  <p className="mt-1">Please check your connection and try again in a moment.</p>
                </div>
              </div>
            ) : null}

            {!loading && !error && filteredUsers.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
                No users match your search. Try a different keyword or filter.
              </div>
            ) : null}

            {filteredUsers.map((user) => {
              const fullName = `${user.name.first} ${user.name.last}`;
              const locationText = `${user.location.city}, ${user.location.country}`;
              const online = user.dob.age >= 30;
              const avatarEmoji = user.gender === "female" ? "👩" : "👨";
              const company = user.location.state || "Independent";
              const cardKey = user.login?.uuid || user.id?.value || user.email;

              return (
                <article
                  key={cardKey}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm sm:h-14 sm:w-14 sm:text-2xl">
                        {avatarEmoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-slate-900">{fullName}</h3>
                        <p className="truncate text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                        online ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                      }`}
                    >
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
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
