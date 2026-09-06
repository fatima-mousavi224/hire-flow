import { getNotifications } from './actions';
import NotificationHeader from '@/components/notifications/NotificationHeader';
import NotificationCard from '@/components/notifications/NotificationCard';

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-3xl space-y-6">
      <NotificationHeader unreadCount={unreadCount} />

      <div className="space-y-3">
        {notifications.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}