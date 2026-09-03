/* eslint-disable @typescript-eslint/no-explicit-any */
// components/sections/FeaturedJobs.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, MapPin, ArrowRight, Loader2 } from 'lucide-react';

export interface JobCardData {
  id: string;
  title: string;
  location: string;
  salary: string;
  jobType: string;
  workplaceType: string;
  tags: string[];
  createdAt: string;
  company: {
    name: string;
    bgColor?: string;
  };
}

interface FeaturedJobsProps {
  userId?: number; // Pass log-in user ID when auth is integrated
}

export const FeaturedJobs = ({ userId = 1 }: FeaturedJobsProps) => {
  const [jobs, setJobs] = useState<JobCardData[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch Featured Jobs
        const jobsRes = await fetch('/api/jobs?isFeatured=true&limit=6');
        const jobsJson = await jobsRes.json();

        if (!jobsJson.success) throw new Error(jobsJson.error || 'Failed to load jobs');
        setJobs(jobsJson.data);

        // 2. Fetch User's Saved Jobs
        const savedRes = await fetch(`/api/saved-jobs?userId=${userId}`);
        const savedJson = await savedRes.json();

        if (savedJson.success) {
          const ids = new Set<string>(savedJson.data.map((item: any) => item.jobId));
          setSavedJobIds(ids);
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  // Handle Bookmarking dynamic save/unsave
  const toggleSaveJob = async (jobId: string) => {
    const isSaved = savedJobIds.has(jobId);

    // Optimistic UI Update
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (isSaved) next.delete(jobId);
      else next.add(jobId);
      return next;
    });

    try {
      if (isSaved) {
        // Unsave (Find SavedJob item ID or endpoint logic)
        await fetch(`/api/saved-jobs?userId=${userId}`, { method: 'GET' });
      } else {
        // Save
        await fetch('/api/saved-jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, jobId }),
        });
      }
    } catch (err) {
      console.error('Failed to toggle bookmark state', err);
    }
  };

  return (
    <section className="w-full bg-slate-50/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
              FEATURED OPPORTUNITIES
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Handpicked for you
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Curated roles from companies that move fast and work on hard problems
            </p>
          </div>

          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="mt-12 flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <span className="ml-3 text-sm font-medium text-gray-500">Loading opportunities...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mt-10 rounded-xl bg-red-50 p-6 text-center text-red-600">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && jobs.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900">No featured jobs found</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later or explore all open listings.</p>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && jobs.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => {
              const isSaved = savedJobIds.has(job.id);

              return (
                <div
                  key={job.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all"
                >
                  <div>
                    {/* Header: Company & Bookmark */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold text-white ${
                            job.company?.bgColor || 'bg-indigo-600'
                          }`}
                        >
                          {job.company?.name ? job.company.name.charAt(0) : 'C'}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">{job.company?.name}</p>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {job.title}
                          </h3>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSaveJob(job.id)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                        aria-label="Save Job"
                      >
                        <Bookmark
                          className={`h-5 w-5 ${
                            isSaved ? 'fill-indigo-600 text-indigo-600' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Meta: Location & Salary */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        {job.location}
                      </span>
                      <span className="font-semibold text-gray-900">{job.salary}</span>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                        {job.jobType.replace('_', ' ')}
                      </span>
                      <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                        {job.workplaceType}
                      </span>
                      {job.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-medium text-gray-400">
                    <span>Recently posted</span>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="rounded-lg border border-gray-200 px-3.5 py-1.5 font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};