'use client';

import React, { createContext, useContext, useState } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  unread: boolean;
}

export interface MessageItem {
  id: string;
  sender: string;
  unread: boolean;
}

interface BadgeContextType {
  notifications: NotificationItem[];
  messages: MessageItem[];
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  markAllNotificationsAsRead: () => void;
  markAllMessagesAsRead: () => void;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

export function BadgeProvider({ children }: { children: React.ReactNode }) {
  // Mock Data (Set unread to false to test hidden badges)
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', title: 'New job match found for React Developer', unread: true },
    { id: '2', title: 'TechCorp viewed your profile', unread: true },
  ]);

  const [messages, setMessages] = useState<MessageItem[]>([
    { id: '1', sender: 'Sarah Recruiter', unread: true },
    { id: '2', sender: 'Alex Manager', unread: true },
    { id: '3', sender: 'HireFlow Team', unread: true },
  ]);

  // Calculate live counts dynamically
  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;
  const unreadMessagesCount = messages.filter((m) => m.unread).length;

  // Actions to clear counts
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const markAllMessagesAsRead = () => {
    setMessages((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  return (
    <BadgeContext.Provider
      value={{
        notifications,
        messages,
        unreadNotificationsCount,
        unreadMessagesCount,
        markAllNotificationsAsRead,
        markAllMessagesAsRead,
      }}
    >
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadges() {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error('useBadges must be used within a BadgeProvider');
  }
  return context;
}