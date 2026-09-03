// components/sections/Hero.tsx
import { db } from '@/prisma/db';
import { HeroSearchForm } from './HeroSearchForm';

export const Hero = async () => {
  // Query total job count directly from DB
  const jobs = await db.orm.public.Job.all();
  const totalJobsCount = jobs.length;

  return (
    <section className="relative flex h-[calc(100vh-73px)] w-full items-center justify-center overflow-hidden bg-white py-6">
      <div 
        className="absolute inset-0 bg-grid-pattern mask-[radial-gradient(ellipse_at_top,black_50%,transparent_90%)] pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-62.5 bg-[#4F46E5]/10 blur-[100px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center my-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/60 px-5 py-2 text-sm font-medium text-[#4F46E5] backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
          {totalJobsCount > 0
            ? `${totalJobsCount.toLocaleString()} open positions live — find yours`
            : '1,284 new jobs posted this week — find yours'}
        </div>

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl sm:leading-[1.1]">
          Find opportunities that <br className="hidden sm:inline" />
          <span className="relative inline-block text-[#4F46E5]">
            move your career forward
            <svg
              className="absolute -bottom-2 left-0 w-full text-[#4F46E5]/30"
              height="10"
              viewBox="0 0 300 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7C50 2.5 150 2.5 299 7"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 sm:text-xl lg:text-2xl max-w-2xl mx-auto font-normal leading-relaxed">
          Discover jobs, internships, and companies that match your skills,
          goals, and ambitions.
        </p>

        {/* Embedded Interactive Form */}
        <HeroSearchForm />
      </div>
    </section>
  );
};