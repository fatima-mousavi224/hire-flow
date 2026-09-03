// components/companies/IndustryGrid.tsx

interface IndustryItem {
  title: string;
  count: number;
  icon: string;
  bg: string;
}

const INDUSTRIES_GRID: IndustryItem[] = [
  { title: 'Software Development', count: 412, icon: '💻', bg: 'bg-[#EEF2FF]' },
  { title: 'Design', count: 87, icon: '🎨', bg: 'bg-[#F5F3FF]' },
  { title: 'Data & AI', count: 203, icon: '🤖', bg: 'bg-[#FEFCE8]' },
  { title: 'Marketing', count: 134, icon: '📢', bg: 'bg-[#ECFDF5]' },
  { title: 'Finance', count: 98, icon: '💰', bg: 'bg-[#F0F9FF]' },
  { title: 'E-commerce', count: 176, icon: '🛍️', bg: 'bg-[#FFF1F2]' },
  { title: 'Business', count: 156, icon: '📊', bg: 'bg-[#F8FAFC]' },
  { title: 'Operations', count: 122, icon: '⚙️', bg: 'bg-[#FFF7ED]' },
];

export function IndustryGrid() {
  return (
    <div className="space-y-6 pt-6">
      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
        Companies by industry
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INDUSTRIES_GRID.map((item) => (
          <div
            key={item.title}
            className={`flex flex-col justify-between rounded-2xl p-6 min-h-[140px] transition-all hover:opacity-90 ${item.bg}`}
          >
            {/* Top Emoji Icon */}
            <div className="text-2xl">{item.icon}</div>

            {/* Bottom Title & Count */}
            <div className="space-y-0.5 mt-6">
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 font-medium">{item.count} companies</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}