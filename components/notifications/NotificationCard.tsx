import { Calendar, FileText, CheckCircle2, Briefcase, MessageSquare } from 'lucide-react';
import { NotificationItem } from '@/types/notification';
import { markAsRead } from "@/app/(dashboards)/(candidate)/notifications/actions";

export default function NotificationCard({ item }: { item: NotificationItem }) {
  const markThisAsRead = markAsRead.bind(null, item.id);

  const renderIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'interview':
        return <Calendar className="h-4 w-4 text-indigo-600" />;
      case 'viewed':
        return <FileText className="h-4 w-4 text-indigo-600" />;
      case 'shortlisted':
        return <CheckCircle2 className="h-4 w-4 text-indigo-600" />;
      case 'job':
        return <Briefcase className="h-4 w-4 text-amber-700" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
    }
  };

  return (
    <form action={markThisAsRead}>
      <button
        type="submit"
        className={`w-full text-left relative flex items-start gap-4 rounded-2xl border p-5 transition-all cursor-pointer ${
          item.isRead
            ? 'border-slate-200/80 bg-white hover:border-slate-300'
            : 'border-indigo-100 bg-[#F0F2FF] shadow-2xs'
        }`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-2xs border border-slate-100">
          {renderIcon(item.type)}
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-bold text-slate-900 leading-tight">{item.title}</h3>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">{item.description}</p>
          <p className="text-[11px] font-medium text-slate-400 pt-1">{item.timestamp}</p>
        </div>

        {!item.isRead && (
          <span className="h-2.5 w-2.5 rounded-full bg-[#5243E0] shrink-0 mt-1" />
        )}
      </button>
    </form>
  );
}