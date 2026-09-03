import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Guide {
  slug: string;
  category: string;
  title: string;
  readTime: string;
  badge?: 'Popular' | 'New';
  icon: string;
  bgColor: string;
}

const FEATURED_GUIDES: Guide[] = [
  {
    slug: 'resume-tips',
    category: 'RESUME TIPS',
    title: 'How to write a standout resume',
    readTime: '8 min read',
    badge: 'Popular',
    icon: '📝',
    bgColor: 'bg-indigo-50/80',
  },
  {
    slug: 'interview-prep',
    category: 'INTERVIEW PREP',
    title: 'Nailing your technical interview',
    readTime: '12 min read',
    badge: 'New',
    icon: '💬',
    bgColor: 'bg-purple-50/80',
  },
  {
    slug: 'salary-negotiation',
    category: 'CAREER GROWTH',
    title: 'How to negotiate your salary offer',
    readTime: '6 min read',
    icon: '💰',
    bgColor: 'bg-amber-50/80',
  },
  {
    slug: 'career-change',
    category: 'CAREER CHANGE',
    title: 'Transitioning to a tech career in 2026',
    readTime: '15 min read',
    badge: 'Popular',
    icon: '🚀',
    bgColor: 'bg-rose-50/80',
  },
  {
    slug: 'tech-internships',
    category: 'STUDENTS',
    title: 'The complete guide to tech internships',
    readTime: '10 min read',
    icon: '🎓',
    bgColor: 'bg-sky-50/80',
  },
  {
    slug: 'linkedin-branding',
    category: 'PERSONAL BRAND',
    title: 'Building a personal brand on LinkedIn',
    readTime: '7 min read',
    icon: '🌐',
    bgColor: 'bg-blue-50/80',
  },
];

export function FeaturedGuides() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
        Featured Guides
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURED_GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/resources/guides/${guide.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all min-h-[170px]"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${guide.bgColor}`}>
                  {guide.icon}
                </div>
                {guide.badge && (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
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
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5243E0]">
                  {guide.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#5243E0] transition-colors mt-0.5 leading-snug">
                  {guide.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4 text-[11px] text-slate-400 font-medium">
              <span>{guide.readTime}</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}