// components/sections/StatsSection.tsx
import { db } from '@/prisma/db';

interface StatsSectionProps {
  title?: string;
}

export const StatsSection = async ({
  title = 'Trusted by growing teams and ambitious professionals',
}: StatsSectionProps) => {
  // Fetch dynamic record counts directly from PostgreSQL
  const [jobs, companies] = await Promise.all([
    db.orm.public.Job.all(),
    db.orm.public.Company.all(),
  ]);

  const stats = [
    { id: 1, value: '50k+', label: 'Active professionals' },
    { id: 2, value: jobs.length.toLocaleString(), label: 'Open positions' },
    { id: 3, value: companies.length.toLocaleString(), label: 'Hiring companies' },
    { id: 4, value: '92%', label: 'Placement rate' },
  ];

  return (
    <section className="w-full border-y border-slate-200 bg-slate-100/70 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 lg:flex-row lg:px-12">
        <p className="text-center text-sm font-medium text-slate-600 lg:text-left">
          {title}
        </p>

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