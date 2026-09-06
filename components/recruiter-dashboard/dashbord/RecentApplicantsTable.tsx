import Link from 'next/link';
import { Eye } from 'lucide-react';

interface Applicant {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  role: string;
  experience: string;
  status: string;
}

export default function RecentApplicantsTable({ applicants }: { applicants: Applicant[] }) {
  const getBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'shortlisted': return 'bg-purple-50 text-purple-600';
      case 'reviewing': return 'bg-amber-50 text-amber-600';
      case 'applied': return 'bg-blue-50 text-blue-600';
      case 'interview': return 'bg-emerald-50 text-emerald-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-900">Recent Applicants</h2>
        <Link href="/applicants" className="text-xs font-bold text-[#5243E0] hover:underline">
          View all &gt;
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold">
              <th className="pb-3 font-semibold">Candidate</th>
              <th className="pb-3 font-semibold">Role</th>
              <th className="pb-3 font-semibold">Experience</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applicants.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white font-bold text-[11px] ${item.avatarBg}`}>
                      {item.avatar}
                    </div>
                    <span className="font-bold text-slate-900">{item.name}</span>
                  </div>
                </td>
                <td className="py-3 text-slate-600 font-medium">{item.role}</td>
                <td className="py-3 text-slate-500">{item.experience}</td>
                <td className="py-3">
                  <span className={`inline-block rounded-lg px-2.5 py-1 text-[10px] font-bold ${getBadgeStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <Link href={`/applicants/${item.id}`} className="inline-flex items-center gap-1 text-slate-500 hover:text-[#5243E0] font-semibold">
                    <Eye className="h-3.5 w-3.5" /> View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}