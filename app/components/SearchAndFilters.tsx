type SearchAndFiltersProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: "all" | "online" | "recent";
  onFilterChange: (value: "all" | "online" | "recent") => void;
};

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}: SearchAndFiltersProps) {
  return (
    <>
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium text-slate-700" htmlFor="user-search">
          Search users
        </label>
        <input
          id="user-search"
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
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
            onClick={() => onFilterChange(option.key as "all" | "online" | "recent")}
            className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
              filter === option.key
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </>
  );
}
