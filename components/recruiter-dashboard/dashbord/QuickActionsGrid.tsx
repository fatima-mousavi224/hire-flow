interface QuickActionsProps {
  counts: {
    reviewQueue: number;
    interviewsToday: number;
    newMessages: number;
    expiringJobs: number;
  };
}

export default function QuickActionsGrid({ counts }: QuickActionsProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
      <h2 className="text-sm font-bold text-slate-900 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-amber-50/70 p-3 text-amber-900">
          <p className="text-[11px] font-semibold text-amber-700">Review Queue</p>
          <p className="text-sm font-black mt-1">{counts.reviewQueue} pending</p>
        </div>
        <div className="rounded-xl bg-emerald-50/70 p-3 text-emerald-900">
          <p className="text-[11px] font-semibold text-emerald-700">Interviews Today</p>
          <p className="text-sm font-black mt-1">{counts.interviewsToday} scheduled</p>
        </div>
        <div className="rounded-xl bg-indigo-50/70 p-3 text-indigo-900">
          <p className="text-[11px] font-semibold text-indigo-700">New Messages</p>
          <p className="text-sm font-black mt-1">{counts.newMessages} unread</p>
        </div>
        <div className="rounded-xl bg-rose-50/70 p-3 text-rose-900">
          <p className="text-[11px] font-semibold text-rose-700">Expiring Jobs</p>
          <p className="text-sm font-black mt-1">{counts.expiringJobs} this week</p>
        </div>
      </div>
    </div>
  );
}