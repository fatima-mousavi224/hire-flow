// components/jobs/JobPerks.tsx
import { DollarSign, Heart, Sparkles, Laptop, GraduationCap } from 'lucide-react';

const PERKS = [
  { icon: DollarSign, text: 'Competitive salary and equity', bg: 'bg-amber-50 text-amber-600' },
  { icon: Heart, text: 'Health, dental, and vision insurance', bg: 'bg-rose-50 text-rose-600' },
  { icon: Sparkles, text: 'Unlimited PTO', bg: 'bg-purple-50 text-purple-600' },
  { icon: Laptop, text: 'Home office stipend', bg: 'bg-blue-50 text-blue-600' },
  { icon: GraduationCap, text: '$2,000 learning budget', bg: 'bg-emerald-50 text-emerald-600' },
];

export const JobPerks = () => (
  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
    <h3 className="text-sm font-bold text-slate-900">Benefits & Perks</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {PERKS.map((perk, idx) => (
        <div key={idx} className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${perk.bg}`}>
            <perk.icon className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-slate-700">{perk.text}</span>
        </div>
      ))}
    </div>
  </div>
);