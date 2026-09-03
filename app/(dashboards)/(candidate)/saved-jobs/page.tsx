'use client';

import { useSavedJobs } from '@/context/SavedJobsContext';
import SavedJobCard from '@/components/saved-jobs/SavedJobCard';
import { BookmarkIcon } from 'lucide-react';

export default function SavedJobsPage() {
  const { savedJobs } = useSavedJobs();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Saved Jobs</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {savedJobs.length} {savedJobs.length === 1 ? 'saved job' : 'saved jobs'}
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#5243E0]">
            <BookmarkIcon className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No saved jobs yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any job card while browsing to save opportunities here for later.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <SavedJobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}