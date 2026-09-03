// components/sections/CompanyLogos.tsx
import { db } from '@/prisma/db';

interface CompanyLogosProps {
  title?: string;
}

// Fallback tailwind color spectrum for dynamic branding
const BRAND_COLORS = [
  'text-indigo-500',
  'text-slate-800',
  'text-indigo-400',
  'text-slate-600',
  'text-emerald-500',
  'text-amber-600',
  'text-rose-500',
  'text-emerald-400',
  'text-violet-500',
  'text-sky-500',
];

export const CompanyLogos = async ({
  title = 'COMPANIES ACTIVELY HIRING ON HIREFLOW',
}: CompanyLogosProps) => {
  // Query exactly 10 companies directly from PostgreSQL
  const companies = await db.orm.public.Company.limit(10).all();

  if (!companies || companies.length === 0) return null;

  return (
    <section className="w-full border-b border-gray-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 text-center">
        
        {/* Section Header */}
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {title}
        </p>

        {/* Dynamic Colorful Brand Names Grid */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {companies.map((company, index) => {
            const colorClass = company.bgColor && company.bgColor.includes('text-')
              ? company.bgColor
              : BRAND_COLORS[index % BRAND_COLORS.length];

            return (
              <div
                key={company.id}
                className="flex items-center justify-center transition-opacity hover:opacity-80"
              >
                <span className={`text-lg sm:text-xl font-bold tracking-tight ${colorClass}`}>
                  {company.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};