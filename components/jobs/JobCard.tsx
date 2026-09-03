'use client';

import { Bookmark, MapPin, Star } from 'lucide-react';
import { useSavedJobs } from '@/context/SavedJobsContext';

export interface JobCardProps {
  job: {
    id: string;
    title: string;
    companyName: string;
    companyLogoBg?: string;
    location: string;
    salary?: string;
    postedAgo: string;
    jobType: string;
    workplaceType: string;
    experienceLevel?: string;
    tags: string[];
    isFeatured?: boolean;
    isSaved?: boolean;
  };
}

export const JobCard = ({ job }: JobCardProps) => {
  const { toggleSaveJob, isJobSaved } = useSavedJobs();

  // Read saved status dynamically from context
  const isSaved = isJobSaved(job.id);

  const companyName = job.companyName || 'Company';
  const logoBg = job.companyLogoBg || 'bg-indigo-600';

  // Combine workplace type, experience level, and tech tags into a single pill row
  const allTags = [
    job.jobType,
    job.workplaceType,
    job.experienceLevel,
    ...job.tags,
  ].filter(Boolean) as string[];

  // Handler to sync toggle with global state
  const handleToggleSave = () => {
    toggleSaveJob({
      id: String(job.id),
      title: job.title,
      company: companyName,
      location: job.location,
      salary: job.salary || '',
      savedDate: job.postedAgo,
      tags: job.tags,
      companyInitials: companyName.charAt(0),
      companyBg: logoBg,
    });
  };

  return (
    <div className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-xs">
      {/* Top Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Avatar Icon */}
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-2xs ${logoBg}`}
          >
            {companyName.charAt(0)}
          </div>

          {/* Details Column */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">{companyName}</p>
            <a href={`/jobs/${job.id}`}>
              <h3 className="text-base font-bold text-slate-900 transition-colors hover:text-[#5243E0]">
                {job.title}
              </h3>
            </a>

            {/* Location, Salary, & Date Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{job.location}</span>
              </div>
              {job.salary && (
                <span className="font-semibold text-slate-800">{job.salary}</span>
              )}
              <span>{job.postedAgo}</span>
            </div>

            {/* Pill Tags Row */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              {allTags.map((tag) => {
                const isPurpleAccent =
                  tag === 'Hybrid' || tag === 'Remote' || tag === 'Full-time';

                return (
                  <span
                    key={tag}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      isPurpleAccent
                        ? 'bg-indigo-50/80 text-[#5243E0] border border-indigo-100/50'
                        : 'bg-slate-100/80 text-slate-600'
                    }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bookmark Icon Button */}
        <button
          onClick={handleToggleSave}
          className="text-slate-300 hover:text-indigo-600 transition-colors focus:outline-hidden cursor-pointer"
          aria-label={isSaved ? 'Remove from saved' : 'Save job'}
        >
          <Bookmark
            className={`h-5 w-5 ${
              isSaved ? 'fill-[#5243E0] text-[#5243E0]' : ''
            }`}
          />
        </button>
      </div>

      {/* Featured Footer Line */}
      {job.isFeatured && (
        <div className="mt-5 border-t border-slate-100 pt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50/60 px-2.5 py-0.5 text-xs font-semibold text-[#5243E0]">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            Featured
          </span>
        </div>
      )}
    </div>
  );
};