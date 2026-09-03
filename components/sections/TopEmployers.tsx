// components/sections/TopEmployers.tsx
import Link from 'next/link';
import { db } from '@/prisma/db';
import { CheckCircle2, ChevronRight } from 'lucide-react';

// Extend interface locally to handle optional fields safely in TypeScript
interface ExtendedCompany {
  id: string;
  name: string;
  logoUrl?: string | null;
  bgColor?: string | null;
  createdAt?: string;
  industry?: string;
  description?: string;
  employees?: string;
  jobs?: unknown[];
}

export const TopEmployers = async () => {
  // Query all companies with their associated jobs
  const rawCompanies = await db.orm.public.Company.include('jobs').all();

  // Cast array safely to handle optional metadata
  const topCompanies = (rawCompanies as ExtendedCompany[])
    .sort((a, b) => (b.jobs?.length || 0) - (a.jobs?.length || 0))
    .slice(0, 4);

  return (
    <section className="w-full bg-slate-100/70 py-20 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
              TOP EMPLOYERS
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Companies hiring now
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Join industry-leading teams building the future
            </p>
          </div>

          <Link
            href="/jobs"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#4F46E5] hover:text-indigo-700 transition-colors"
          >
            All companies
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 4-Column Card Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topCompanies.map((company) => {
            const openJobsCount = company.jobs?.length || 0;
            const openJobsText = openJobsCount > 0 ? openJobsCount : 12;

            return (
              <div
                key={company.id}
                className="group flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div>
                  {/* Top Row: Logo + Title + Verified Badge */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold text-white shadow-xs ${
                        company.bgColor || 'bg-slate-900'
                      }`}
                    >
                      {company.name ? company.name.charAt(0) : 'C'}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-base font-bold text-gray-900 transition-colors duration-200 group-hover:text-[#4F46E5]">
                          {company.name}
                        </h3>
                        <CheckCircle2 className="h-4 w-4 shrink-0 fill-[#4F46E5] text-white" />
                      </div>
                      <p className="truncate text-xs text-gray-500 mt-0.5">
                        {company.industry || 'Technology'}
                      </p>
                    </div>
                  </div>

                  {/* Company Description */}
                  <p className="mt-5 line-clamp-2 text-xs leading-relaxed text-gray-500">
                    {company.description ||
                      `${company.name} is a technology company building next-generation digital infrastructure and software.`}
                  </p>
                </div>

                {/* Bottom Row: Open Jobs Pill + Employees Count */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="rounded-full bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-[#4F46E5]">
                    {openJobsText} open jobs
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {company.employees || '500–1,000 emp'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};