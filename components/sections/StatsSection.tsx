// components/sections/StatsSection.tsx

export interface StatItem {
  id: string | number;
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats?: StatItem[];
  title?: string;
}

const defaultStats: StatItem[] = [
  { id: 1, value: '50k+', label: 'Active professionals' },
  { id: 2, value: '1,284', label: 'New jobs this week' },
  { id: 3, value: '284', label: 'Hiring companies' },
  { id: 4, value: '92%', label: 'Placement rate' },
];

export const StatsSection = ({
  stats = defaultStats,
  title = 'Trusted by growing teams and ambitious professionals',
}: StatsSectionProps) => {
  return (
    <section className="w-full border-y border-slate-200 bg-slate-100/70 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 lg:flex-row lg:px-12">
        
        {/* Left Label */}
        <p className="text-center text-sm font-medium text-slate-600 lg:text-left">
          {title}
        </p>

        {/* Right Numbers Row */}
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 lg:justify-end">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center">
              <span className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-medium text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};