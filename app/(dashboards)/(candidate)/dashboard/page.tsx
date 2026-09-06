import Link from 'next/link';
import ActivityChart from '@/components/dashboard/ActivityChart';
import { 
  Briefcase, 
  Calendar, 
  Bookmark, 
  Eye, 
  Video, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import { getCandidateDashboardData } from '@/lib/getCandidateDashboardData';

export default async function CandidateDashboardPage() {
  const data = await getCandidateDashboardData('user-current-id');
  const { user, stats, profileStrengthPercentage, recentApplications, upcomingInterview } = data;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Interview': return 'bg-emerald-50 text-emerald-700';
      case 'Shortlisted': return 'bg-purple-50 text-purple-700';
      case 'Reviewing': return 'bg-amber-50 text-amber-700';
      case 'Rejected': return 'bg-rose-50 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden ">
      {/* Responsive Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 ">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Here&apos;s what&apos;s happening with your job search.
          </p>
        </div>
        <Link
          href="/jobs"
          className="w-full sm:w-auto text-center rounded-xl bg-[#5243E0] px-4 py-2.5 sm:py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
        >
          Browse Jobs
        </Link>
      </div>

      {/* Adaptive 4-Column Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400">{stats.applications.label}</span>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{stats.applications.value}</p>
            {stats.applications.changeText && (
              <p className="text-[11px] font-semibold text-emerald-600">{stats.applications.changeText}</p>
            )}
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#5243E0]">
            <Briefcase className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400">{stats.interviews.label}</span>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{stats.interviews.value}</p>
            {stats.interviews.changeText && (
              <p className="text-[11px] font-semibold text-emerald-600">{stats.interviews.changeText}</p>
            )}
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Calendar className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400">{stats.savedJobs.label}</span>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{stats.savedJobs.value}</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Bookmark className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400">{stats.profileViews.label}</span>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{stats.profileViews.value}</p>
            {stats.profileViews.changeText && (
              <p className="text-[11px] font-semibold text-emerald-600">{stats.profileViews.changeText}</p>
            )}
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Eye className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Left Column - Chart & Recent Applications */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-2xs">
            <ActivityChart />
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Recent Applications</h3>
              <Link href="/applications" className="text-xs font-semibold text-[#5243E0] hover:underline flex items-center gap-0.5">
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors gap-3 sm:gap-0">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white font-bold text-xs ${app.companyLogoBg}`}>
                      {app.companyInitials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{app.role}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{app.company} • {app.appliedDate}</p>
                    </div>
                  </div>
                  <span className={`self-start sm:self-center rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-4 sm:space-y-6">
          {upcomingInterview && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Upcoming Interviews</h3>
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                    {upcomingInterview.companyInitials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{upcomingInterview.role}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{upcomingInterview.company}</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">📅 {upcomingInterview.dateText}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Video className="h-3.5 w-3.5 text-slate-400 shrink-0" /> Video Interview with {upcomingInterview.interviewerName}
                </div>
                <button className="w-full rounded-xl bg-[#5243E0] py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer">
                  Join Interview
                </button>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Profile Strength</h3>
              <span className="text-xs font-extrabold text-[#5243E0]">{profileStrengthPercentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-[#5243E0] rounded-full transition-all duration-300" 
                style={{ width: `${profileStrengthPercentage}%` }} 
              />
            </div>
            <ul className="space-y-1.5 text-[11px] font-medium text-slate-600">
              <li className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> Work experience</li>
              <li className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> Education</li>
              <li className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> Skills</li>
              <li className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> Profile photo</li>
            </ul>
            <button className="w-full rounded-xl border border-slate-200/80 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
              Complete Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}