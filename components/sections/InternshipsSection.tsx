// components/sections/InternshipsSection.tsx
import Link from 'next/link';
import { db } from '@/prisma/db';
import { ChevronRight } from 'lucide-react';

interface InternshipJob {
  id: string;
  title: string;
  location?: string | null;
  salary?: string | null;
  jobType?: string | null;
  workplaceType?: string | null;
  dueDate?: string | null;
  tags?: readonly string[] | string[] | null;
  company?: {
    name?: string | null;
    bgColor?: string | null;
    [key: string]: unknown;
  } | null;
}

export const InternshipsSection = async () => {
  // Query jobs from database with company relations
  const rawJobs = await db.orm.public.Job.include('company').all();

  // Cast safely using the updated schema-aligned interface
  const jobs = rawJobs as unknown as InternshipJob[];

  // Filter for internships & grab the top 2
  const internships = jobs
    .filter(
      (job) =>
        job.jobType === 'INTERNSHIP' ||
        job.title?.toLowerCase().includes('intern')
    )
    .slice(0, 2);

  return (
    <section className="w-full bg-white py-20 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
              FOR STUDENTS & GRADS
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Start your career with the right internship
            </h2>
          </div>

          <Link
            href="/jobs?type=internship"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#4F46E5] hover:text-indigo-700 transition-colors"
          >
            All internships
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 2-Column Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {internships.map((job) => {
            const tagsArray = Array.isArray(job.tags)
              ? job.tags
              : ['React', 'Next.js', 'TypeScript'];

            const companyName = job.company?.name || 'Partner Company';
            const companyBg = job.company?.bgColor || 'bg-slate-900';

            return (
              <div
                key={job.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-indigo-200/80 bg-white p-6 shadow-[0_2px_12px_-4px_rgba(79,70,229,0.06)] transition-all duration-300 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div>
                  {/* Top Row: Logo + Job Title + Intern Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold text-white shadow-xs ${companyBg}`}
                      >
                        {companyName.charAt(0)}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-[#4F46E5]">
                          {job.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-500">
                          {companyName}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#4F46E5]">
                      Intern
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-y-2 text-xs font-medium text-slate-600 sm:ml-16">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {job.workplaceType ? job.workplaceType.toLowerCase() : 'Hybrid'}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      {job.salary || '$35/hr'}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      {job.location || 'San Francisco, CA'}
                    </div>

                    <div className="flex items-center gap-2 text-rose-500 font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      Due {job.dueDate || '2025-01-30'}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-6 flex flex-wrap gap-2 sm:ml-16">
                    {tagsArray.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-slate-100/80 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="mt-8 flex justify-end">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="rounded-xl bg-[#4F46E5] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-indigo-700"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};