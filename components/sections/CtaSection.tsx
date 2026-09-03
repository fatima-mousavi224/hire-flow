// components/sections/CtaSection.tsx
import Link from 'next/link';
import { Briefcase, Users } from 'lucide-react';

export const CtaSection = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Candidate CTA Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#5241E2] p-8 text-white shadow-lg sm:p-10">
            {/* Background Circle Decorative Overlay */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-white/10" />

            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-xs">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  For candidates
                </h3>
                <p className="mt-3 max-w-md text-sm text-indigo-100/90 leading-relaxed">
                  Your next opportunity is waiting. Join 50,000+ professionals who found their dream job through HireFlow.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/jobs"
                  className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-gray-900 shadow-xs transition-colors hover:bg-slate-100"
                >
                  Browse jobs
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/20 backdrop-blur-xs"
                >
                  Create profile
                </Link>
              </div>
            </div>
          </div>

          {/* Employer CTA Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0B1120] p-8 text-white shadow-lg sm:p-10">
            {/* Background Circle Decorative Overlay */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-white/5" />

            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-xs">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  For companies
                </h3>
                <p className="mt-3 max-w-md text-sm text-slate-300 leading-relaxed">
                  Find your next great hire. Reach thousands of qualified candidates actively looking for roles like yours.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/post-job"
                  className="rounded-xl bg-[#5241E2] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-indigo-600"
                >
                  Post a job
                </Link>
                <Link
                  href="/employers"
                  className="rounded-xl bg-slate-800/80 px-5 py-2.5 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-800"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};