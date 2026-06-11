import { useEffect, useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { fetchUsers } from "../services/userService";
import type { User } from "../types/user";

export function Welcome() {
  const [users, setUsers] = useState<User[]>([]);
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

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Loading profiles...
            </div>
          ) : null}
          
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => {
              const fullName = `${user.name.first} ${user.name.last}`;
              const locationText = `${user.location.city}, ${user.location.country}`;

              return (
                <article
                  key={user.id.value}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.picture.medium}
                        alt={fullName}
                        className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/10"
                      />
                      <div>
                        <h3 className="font-semibold text-slate-900">{fullName}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <FiMail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="h-4 w-4" />
                      <span>{locationText}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <FiPhone className="h-4 w-4" />
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
