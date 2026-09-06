import Link from 'next/link';
import { Plus } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  applicantsCount: number;
  status: string;
}

export default function ActiveJobsList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-900">Active Jobs</h2>
        <Link href="/jobs" className="text-xs font-bold text-[#5243E0] hover:underline">
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 hover:border-slate-200">
            <div>
              <p className="text-xs font-bold text-slate-900">{job.title}</p>
              <p className="text-[10px] text-slate-400">{job.applicantsCount} applicants</p>
            </div>
            <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              {job.status}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
        <Plus className="h-4 w-4" /> Post New Job
      </button>
    </div>
  );
}