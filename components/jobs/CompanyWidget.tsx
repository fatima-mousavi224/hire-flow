// components/jobs/CompanyWidget.tsx
import { Globe, CheckCircle } from 'lucide-react';

interface CompanyWidgetProps {
  company: {
    name?: string;
    bgColor?: string;
    industry?: string;
    size?: string;
    location?: string;
    websiteUrl?: string;
    openPositionsCount?: number;
  };
  overview?: {
    postedAgo?: string;
    employmentType?: string;
    workplace?: string;
    experienceLevel?: string;
    applicantsCount?: number;
    viewsCount?: number;
  };
}

export const CompanyWidget = ({ company, overview }: CompanyWidgetProps) => {
  const companyName = company.name || 'Stripe';
  const logoBg = company.bgColor || 'bg-[#635BFF]';
  const applicants = overview?.applicantsCount ?? 87;

  return (
    <div className="space-y-6">
      {/* 1. About Company Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900">About {companyName}</h3>
        
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-2xs ${logoBg}`}>
            {companyName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-slate-900">{companyName}</h4>
              <CheckCircle className="h-4 w-4 fill-[#635BFF] text-white" />
            </div>
            <p className="text-xs text-slate-400">{company.industry || 'Software Development'}</p>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-4 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Industry</span>
            <span className="font-semibold text-slate-900">{company.industry || 'Software Development'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Company size</span>
            <span className="font-semibold text-slate-900">{company.size || '5,000–10,000 employees'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Headquarters</span>
            <span className="font-semibold text-slate-900">{company.location || 'San Francisco, CA'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Open positions</span>
            <span className="font-semibold text-slate-900">{company.openPositionsCount ?? 28}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            View Profile
          </button>
          {company.websiteUrl ? (
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              <Globe className="h-4 w-4 text-slate-500" />
              Website
            </a>
          ) : (
            <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors">
              <Globe className="h-4 w-4 text-slate-500" />
              Website
            </button>
          )}
        </div>
      </div>

      {/* 2. Job Overview Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Job Overview</h3>
        <div className="space-y-3.5 text-xs">
          <div className="flex justify-between pb-2 border-b border-slate-50">
            <span className="text-slate-400">Job posted</span>
            <span className="font-semibold text-slate-900">{overview?.postedAgo || '2 days ago'}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-50">
            <span className="text-slate-400">Employment type</span>
            <span className="font-semibold text-slate-900">{overview?.employmentType || 'Full-time'}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-50">
            <span className="text-slate-400">Workplace</span>
            <span className="font-semibold text-slate-900">{overview?.workplace || 'Hybrid'}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-50">
            <span className="text-slate-400">Experience level</span>
            <span className="font-semibold text-slate-900">{overview?.experienceLevel || 'Mid level'}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-slate-50">
            <span className="text-slate-400">Applicants</span>
            <span className="font-semibold text-slate-900">{applicants}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Views</span>
            <span className="font-semibold text-slate-900">{(overview?.viewsCount ?? 1240).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* 3. Ready to Apply Card Banner */}
      <div className="rounded-2xl bg-[#5243E0] p-6 text-white space-y-4 shadow-xs">
        <div className="space-y-1">
          <h4 className="text-base font-bold">Ready to apply?</h4>
          <p className="text-xs text-indigo-100">
            Join {applicants} other applicants who applied to this role.
          </p>
        </div>
        
        {/* Darker Purple Apply Button */}
        <button className="w-full rounded-xl bg-[#3C2DB8] hover:bg-[#3224A0] active:bg-[#281B88] py-3 text-xs font-bold text-white shadow-xs transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
};