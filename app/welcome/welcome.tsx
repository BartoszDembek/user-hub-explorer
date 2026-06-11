import { useEffect, useMemo, useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
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
      const key = user.id?.value || user.email;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }, [users]);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return uniqueUsers.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      const searchableText = [
        fullName,
        email,
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

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Loading profiles...
            </div>
          ) : null}

          {error ? (
            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {error}
            </div>
          ) : null}

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700" htmlFor="user-search">
              Search users
            </label>
            <input
              id="user-search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, email, or city"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-0"
            />
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { key: "all", label: "All Users" },
              { key: "online", label: "Online Only" },
              { key: "recent", label: "Recently Added" },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setFilter(option.key as "all" | "online" | "recent")}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  filter === option.key
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredUsers.map((user) => {
              const fullName = `${user.name.first} ${user.name.last}`;
              const locationText = `${user.location.city}, ${user.location.country}`;

              return (
                <article
                  key={user.id.value}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.picture.medium}
                      alt={fullName}
                      className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-900">{fullName}</h3>
                      <p className="text-sm text-slate-500">{user.location.city}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <FiMail className="h-4 w-4 shrink-0" />
                      <span className="break-all">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="h-4 w-4 shrink-0" />
                      <span>{locationText}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <FiPhone className="h-4 w-4 shrink-0" />
                      <span>{user.phone}</span>
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
