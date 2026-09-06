import { markAllAsRead } from "@/app/(dashboards)/(candidate)/notifications/actions";
interface NotificationHeaderProps {
  unreadCount: number;
}

export default function NotificationHeader({ unreadCount }: NotificationHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notifications</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
        </p>
      </div>

      <form action={markAllAsRead}>
        <button
          type="submit"
          disabled={unreadCount === 0}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
        >
          Mark all as read
        </button>
      </form>
    </div>
  );
}