import type { User } from "../types/user";

const API_URL = "https://randomuser.me/api/?results=12";

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = (await response.json()) as { results?: User[] };

  return data.results && data.results.length > 0 ? data.results : [];
}
