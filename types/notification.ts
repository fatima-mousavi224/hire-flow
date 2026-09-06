export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  type: 'interview' | 'viewed' | 'shortlisted' | 'job' | 'message';
}