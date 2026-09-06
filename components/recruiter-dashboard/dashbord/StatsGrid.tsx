import { Briefcase, Users, UserCheck, Calendar } from 'lucide-react';

interface StatsProps {
  stats: {
    activeJobs: number;
    totalApplications: number;
    shortlisted: number;
    interviews: number;
  };
}

export default function StatsGrid({ stats }: StatsProps) {
  const items = [
    { title: 'Active Jobs', value: stats.activeJobs, change: '+2 this week', icon: Briefcase, bg: 'bg-indigo-50 text-[#5243E0]' },
    { title: 'Total Applications', value: stats.totalApplications, change: '+47 this week', icon: Users, bg: 'bg-purple-50 text-purple-600' },
    { title: 'Shortlisted', value: stats.shortlisted, change: null, icon: UserCheck, bg: 'bg-amber-50 text-amber-600' },
    { title: 'Interviews', value: stats.interviews, change: '+3 this week', icon: Calendar, bg: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500">{stat.title}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              {stat.change && <p className="text-[11px] font-bold text-emerald-600">{stat.change}</p>}
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.bg}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}