import { useEffect, useMemo, useState } from "react";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { SearchAndFilters } from "../components/SearchAndFilters";
import { StatsTiles } from "../components/StatsTiles";
import { UserCard } from "../components/UserCard";
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
        <section className="rounded-[28px] border border-white/70 bg-white/70 p-3 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-6">
          <StatsTiles stats={stats} />

          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
          />

          <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              <div
                className="col-span-full flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur-md"
                aria-live="polite"
              >
                <FiLoader className="h-4 w-4 animate-spin text-slate-500" />
                <span>Loading profiles...</span>
              </div>
            ) : null}

            {error ? (
              <div
                className="col-span-full flex items-start gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-sm text-amber-700 shadow-sm backdrop-blur-md"
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
              <div className="col-span-full rounded-2xl border border-dashed border-slate-200/80 bg-white/60 px-4 py-8 text-center text-sm text-slate-600 shadow-sm backdrop-blur-md">
                No users match your search. Try a different keyword or filter.
              </div>
            ) : null}

            {filteredUsers.map((user, index) => {
              const cardKey = user.login?.uuid || user.id?.value || user.email;
              return <UserCard key={cardKey} user={user} index={index} />;
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
