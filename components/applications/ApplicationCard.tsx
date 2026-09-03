'use client';

import Link from 'next/link';
import { Eye, Calendar, X } from 'lucide-react';
import { Application, ApplicationStatus } from '@/types/application';
import StatusStepper from './StatusStepper';

interface ApplicationCardProps {
  application: Application;
  onWithdraw: (id: string) => void;
}

const getBadgeStyle = (status: ApplicationStatus) => {
  switch (status) {
    case 'Applied': return 'bg-indigo-50 text-indigo-600';
    case 'Reviewing': return 'bg-amber-50/80 text-amber-700';
    case 'Shortlisted': return 'bg-purple-50 text-purple-700';
    case 'Interview': return 'bg-emerald-50 text-emerald-700';
    case 'Accepted': return 'bg-emerald-50 text-emerald-600';
    case 'Rejected': return 'bg-rose-50 text-rose-600';
    default: return 'bg-slate-100 text-slate-700';
  }
};

export default function ApplicationCard({ application: app, onWithdraw }: ApplicationCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-2xs space-y-5">
      {/* Top Header Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          {/* Logo Square */}
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white font-bold text-base ${app.companyBg}`}>
            {app.companyInitials}
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 leading-tight">{app.role}</h3>
            <p className="text-xs text-slate-500 font-medium">
              {app.company} · {app.location}
            </p>

            {/* Dates & Salary Row */}
            <div className="flex items-center gap-3 text-xs text-slate-400 font-normal pt-0.5">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                Applied {app.appliedDate}
              </span>
              <span>Updated {app.updatedDate}</span>
              <span className="font-semibold text-slate-800">{app.salary}</span>
            </div>
          </div>
        </div>

        {/* Top Status Pill */}
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeStyle(app.status)}`}>
          {app.status}
        </span>
      </div>

      {/* Custom Stepper Row */}
      <div className="pl-16">
        <StatusStepper status={app.status} />
      </div>

      {/* Scheduled Interview Banner (if present) */}
      {app.status === 'Interview' && app.interviewDetails && (
        <div className="ml-16 flex items-center gap-2 rounded-xl bg-emerald-50/70 px-4 py-2.5 text-xs text-emerald-800 font-medium border border-emerald-100/60">
          <Calendar className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Interview: {app.interviewDetails.date} at {app.interviewDetails.time}</span>
        </div>
      )}

      {/* Card Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100/80">
        <div className="flex items-center gap-3">
          <Link
            href={`/jobs/${app.id}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Eye className="h-3.5 w-3.5 text-slate-600" />
            View Job
          </Link>

          {app.status !== 'Rejected' && app.status !== 'Accepted' && (
            <button
              onClick={() => onWithdraw(app.id)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer px-2 py-1"
            >
              <X className="h-3.5 w-3.5" />
              Withdraw
            </button>
          )}
        </div>

        <span className="text-xs font-medium text-slate-400">
          {app.type} · {app.workplaceType}
        </span>
      </div>
    </div>
  );
}