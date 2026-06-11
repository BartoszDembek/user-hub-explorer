type Stat = {
  label: string;
  value: number;
};

type StatsTilesProps = {
  stats: Stat[];
};

export function StatsTiles({ stats }: StatsTilesProps) {
  return (
    <div className="mb-4 grid gap-3 sm:mb-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const tileStyles = [
          "border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50",
          "border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50",
          "border-emerald-200 bg-gradient-to-br from-emerald-50 to-lime-50",
          "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50",
        ];

        return (
          <div
            key={stat.label}
            className={`rounded-2xl border p-3 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4 ${tileStyles[index % tileStyles.length]}`}
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-1 text-xl font-semibold text-slate-900 sm:mt-2 sm:text-2xl">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
