'use client';

import { Plus } from 'lucide-react';

export default function HeaderBanner({ userName }: { userName: string }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Recruiter Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Welcome back, {userName}. Here&apos;s your hiring overview.
        </p>
      </div>
      <button className="flex items-center justify-center gap-2 rounded-xl bg-[#5243E0] px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700 transition-colors cursor-pointer">
        <Plus className="h-4 w-4" />
        Post a Job
      </button>
    </div>
  );
}