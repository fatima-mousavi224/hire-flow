import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface FeaturedGuide {
  id: string;
  category: string;
  title: string;
  readTime: string;
  badge?: 'Popular' | 'New';
  icon: string;
  bgColor?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  salaryRange: string;
  growthTag: 'Strong growth' | 'Very Strong growth';
  icon: string;
  bgColor?: string;
}

export function FeaturedGuideCard({ guide }: { guide: FeaturedGuide }) {
  const iconBg = guide.bgColor || 'bg-slate-100';

  return (
    <Link
      href={`/resources/guides/${guide.id}`}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:border-slate-300 transition-all"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${iconBg}`}>
            {guide.icon}
          </div>
          {guide.badge && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                guide.badge === 'Popular'
                  ? 'bg-indigo-50 text-[#5243E0]'
                  : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              {guide.badge}
            </span>
          )}
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
            {guide.category}
          </span>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#5243E0] transition-colors mt-0.5">
            {guide.title}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4 text-[11px] text-slate-400">
        <span>{guide.readTime}</span>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

export function CareerPathCard({ path }: { path: CareerPath }) {
  const iconBg = path.bgColor || 'bg-sky-50';

  return (
    <Link
      href={`/resources/paths/${path.id}`}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:border-slate-300 transition-all min-h-[140px]"
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${iconBg}`}>
        {path.icon}
      </div>

      <div className="space-y-1 mt-4">
        <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#5243E0] transition-colors">
          {path.title}
        </h3>
        <p className="text-xs text-slate-500 font-medium">{path.salaryRange}</p>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-semibold text-emerald-600">
            {path.growthTag}
          </span>
        </div>
      </div>
    </Link>
  );
}