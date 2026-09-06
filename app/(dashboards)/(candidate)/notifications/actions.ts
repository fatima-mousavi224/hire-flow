'server action';

import { revalidatePath } from 'next/cache';
import { NotificationItem } from '@/types/notification';

// Simulated database array
let mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Interview scheduled',
    description: 'Your interview for Frontend Developer at Stripe has been scheduled for Jan 20, 2025.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'interview',
  },
  {
    id: '2',
    title: 'Application viewed',
    description: 'A recruiter at Vercel viewed your application for React Developer.',
    timestamp: '5 hours ago',
    isRead: false,
    type: 'viewed',
  },
  {
    id: '3',
    title: "You've been shortlisted",
    description: "Congratulations! You've been shortlisted for the React Developer role at Vercel.",
    timestamp: '1 day ago',
    isRead: false,
    type: 'shortlisted',
  },
  {
    id: '4',
    title: 'New matching job',
    description: 'A new Senior Frontend Engineer role at Figma matches your profile.',
    timestamp: '2 days ago',
    isRead: true,
    type: 'job',
  },
  {
    id: '5',
    title: 'New message from Sarah Chen',
    description: 'Sarah Chen (Stripe): "Hi! We\'d love to schedule your technical interview..."',
    timestamp: '3 days ago',
    isRead: true,
    type: 'message',
  },
];

export async function getNotifications(): Promise<NotificationItem[]> {
  return mockNotifications;
}

export async function markAsRead(id: string) {
  'use server';
  mockNotifications = mockNotifications.map((n) =>
    n.id === id ? { ...n, isRead: true } : n
  );
  revalidatePath('/notifications');
}

export async function markAllAsRead() {
  'use server';
  mockNotifications = mockNotifications.map((n) => ({ ...n, isRead: true }));
  revalidatePath('/notifications');
}