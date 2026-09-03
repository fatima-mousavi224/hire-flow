import Link from 'next/link';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { FollowButton } from './FollowButton';

export interface CompanyData {
  id: string;
  name: string;
  industry: string;
  description?: string;
  location?: string;
  size?: string;
  openJobsCount: number;
  bgColor?: string;
  isFollowing?: boolean;
}

export function FeaturedCompanyCard({ company }: { company: CompanyData }) {
  const logoBg = company.bgColor || 'bg-[#5243E0]';

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs hover:border-slate-300 transition-all">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white ${logoBg}`}>
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900">{company.name}</h3>
                <CheckCircle2 className="h-4 w-4 fill-[#635BFF] text-white" />
              </div>
              <p className="text-xs text-slate-400">{company.industry}</p>
            </div>
          </div>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold text-[#5243E0]">
            Featured
          </span>
        </div>

        {company.description && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {company.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          {company.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {company.location}
            </span>
          )}
          {company.size && <span>• {company.size}</span>}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
        <Link href={`/companies/${company.id}`} className="text-xs font-bold text-emerald-600 hover:underline">
          {company.openJobsCount} open jobs
        </Link>
        <FollowButton companyId={company.id} initialIsFollowing={company.isFollowing} />
      </div>
    </div>
  );
}

export function StandardCompanyCard({ company }: { company: CompanyData }) {
  const logoBg = company.bgColor || 'bg-slate-900';

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:border-slate-300 transition-all">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white ${logoBg}`}>
            {company.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-slate-900">{company.name}</h3>
              <CheckCircle2 className="h-4 w-4 fill-[#635BFF] text-white" />
            </div>
            <p className="text-xs text-slate-400">{company.industry}</p>
          </div>
        </div>

        {company.location && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span>{company.location}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-4">
        <Link href={`/companies/${company.id}`} className="text-xs font-bold text-[#5243E0] hover:underline">
          {company.openJobsCount} open jobs
        </Link>
        <FollowButton companyId={company.id} initialIsFollowing={company.isFollowing} />
      </div>
    </div>
  );
}