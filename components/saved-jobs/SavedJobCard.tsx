'use client';

import Link from 'next/link';
import { MapPin, Trash2, Clock } from 'lucide-react';
import { useSavedJobs, SavedJob } from '@/context/SavedJobsContext';

export default function SavedJobCard({ job }: { job: SavedJob }) {
  const { removeSavedJob } = useSavedJobs();

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white font-bold text-base ${job.companyBg}`}>
            {job.companyInitials}
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 leading-tight">{job.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{job.company}</p>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {job.location}
              </span>
              <span className="font-semibold text-slate-700">{job.salary}</span>
              <span>Saved {job.savedDate}</span>
            </div>
          </div>
        </div>

        {/* Top Trash Icon Action */}
        <button
          onClick={() => removeSavedJob(job.id)}
          className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer"
          title="Remove Job"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Tags Row */}
      <div className="flex flex-wrap items-center gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${
              tag.toLowerCase() === 'remote'
                ? 'bg-indigo-50 text-indigo-600'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Card Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        {job.deadline ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500">
            <Clock className="h-3.5 w-3.5" />
            Deadline: {job.deadline}
          </span>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={() => removeSavedJob(job.id)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Remove
          </button>
          <Link
            href={`/jobs/${job.id}`}
            className="rounded-xl bg-[#5243E0] px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}