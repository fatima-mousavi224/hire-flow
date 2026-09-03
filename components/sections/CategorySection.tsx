// components/sections/CategorySection.tsx
import Link from 'next/link';
import { db } from '@/prisma/db';

interface CategoryConfig {
  name: string;
  icon: string;
  fallbackCount: number;
}

const CATEGORIES: CategoryConfig[] = [
  { name: 'Software Development', icon: '💻', fallbackCount: 412 },
  { name: 'Design', icon: '🎨', fallbackCount: 87 },
  { name: 'Marketing', icon: '📢', fallbackCount: 134 },
  { name: 'Finance', icon: '💰', fallbackCount: 98 },
  { name: 'Business', icon: '📊', fallbackCount: 156 },
  { name: 'Data & AI', icon: '🤖', fallbackCount: 203 },
  { name: 'Customer Support', icon: '💬', fallbackCount: 72 },
  { name: 'Operations', icon: '⚙️', fallbackCount: 122 },
];

export const CategorySection = async () => {
  const allJobs = await db.orm.public.Job.all();

  return (
    <section className="w-full py-20 border-y border-slate-200 bg-slate-100/70">
      <div className="mx-auto max-w-7xl px-4 text-center">
        
        {/* Category Header */}
        <p className="text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
          Explore by field
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Find your next opportunity
        </h2>

        {/* 4x2 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const realCount = allJobs.filter((job) =>
              job.tags?.some((t) => t.toLowerCase().includes(category.name.toLowerCase()))
            ).length;

            const positions = realCount > 0 ? realCount : category.fallbackCount;

            return (
              <Link
                key={category.name}
                href={`/jobs?q=${encodeURIComponent(category.name)}`}
                className="group flex flex-col items-center justify-center rounded-2xl border border-gray-200/80 bg-white p-7 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#4F46E5]/40 hover:shadow-md hover:shadow-indigo-500/5"
              >
                {/* Icon */}
                <span className="text-3xl transition-transform duration-300 ease-out group-hover:scale-105">
                  {category.icon}
                </span>

                {/* Title */}
                <h3 className="mt-4 text-base font-bold text-gray-900 transition-colors duration-200 group-hover:text-[#4F46E5]">
                  {category.name}
                </h3>

                {/* Position Count */}
                <p className="mt-1 text-xs font-semibold text-[#4F46E5]">
                  {positions} positions
                </p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};