import Link from 'next/link';

export interface CareerPath {
  id: string;
  title: string;
  salaryRange: string;
  growthTag: 'Strong growth' | 'Very Strong growth';
  icon: string;
  bgColor: string;
}

const CAREER_PATHS: CareerPath[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    salaryRange: '$80k–$180k',
    growthTag: 'Strong growth',
    icon: '💻',
    bgColor: 'bg-sky-50/80',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    salaryRange: '$90k–$170k',
    growthTag: 'Strong growth',
    icon: '🎨',
    bgColor: 'bg-rose-50/80',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    salaryRange: '$100k–$200k',
    growthTag: 'Very Strong growth',
    icon: '📊',
    bgColor: 'bg-purple-50/80',
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    salaryRange: '$110k–$210k',
    growthTag: 'Strong growth',
    icon: '🗺️',
    bgColor: 'bg-indigo-50/80',
  },
];

export function CareerPaths() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
        Explore Career Paths
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAREER_PATHS.map((path) => (
          <Link
            key={path.id}
            href={`/resources/paths/${path.id}`}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:border-slate-300 transition-all min-h-37.5"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${path.bgColor}`}>
              {path.icon}
            </div>

            <div className="space-y-1 mt-4">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#5243E0] transition-colors">
                {path.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{path.salaryRange}</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold text-emerald-600">
                  {path.growthTag}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}