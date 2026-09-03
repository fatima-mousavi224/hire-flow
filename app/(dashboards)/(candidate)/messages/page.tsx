'use client';

import { useState, useEffect } from 'react';
import { Conversation, Message } from '@/types/chat';
import ChatSidebar from '@/components/messages/ChatSidebar';
import ActiveChatHeader from '@/components/messages/ActiveChatHeader';
import ChatFeed from '@/components/messages/ChatFeed';
import ChatInput from '@/components/messages/ChatInput';

const LOCAL_STORAGE_KEY = 'hireflow_conversations_v1';

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Recruiter',
    company: 'Stripe',
    jobTitle: 'Frontend Developer',
    avatarBg: 'bg-indigo-600',
    avatarText: 'S',
    isOnline: true,
    unreadCount: 0,
    lastTime: '2h ago',
    messages: [
      {
        id: 'm1',
        senderId: '1',
        text: "Hi! I'm Sarah from Stripe's recruiting team. I reviewed your application for the Frontend Developer position and I'm very impressed with your background.",
        timestamp: 'Jan 13, 2:30 PM',
      },
      {
        id: 'm2',
        senderId: 'user',
        text: "Hi Sarah! Thank you so much for reaching out. I'm really excited about the opportunity at Stripe.",
        timestamp: 'Jan 13, 3:00 PM',
      },
      {
        id: 'm3',
        senderId: '1',
        text: "Great! We'd love to schedule a technical interview. Are you available this week? We're thinking about a 90-minute session with two engineers from our payments team.",
        timestamp: 'Jan 13, 3:15 PM',
      },
      {
        id: 'm4',
        senderId: 'user',
        text: "Absolutely! I'm available Thursday or Friday afternoon. Does either of those work?",
        timestamp: 'Jan 13, 3:45 PM',
      },
      {
        id: 'm5',
        senderId: '1',
        text: "Friday at 2 PM PST works perfectly. I'll send you a calendar invite with the Zoom link. Looking forward to connecting with you tomorrow!",
        timestamp: 'Jan 13, 4:00 PM',
      },
    ],
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Lead Recruiter',
    company: 'Vercel',
    jobTitle: 'React Developer',
    avatarBg: 'bg-slate-900',
    avatarText: 'V',
    isOnline: false,
    unreadCount: 1,
    lastTime: '1d ago',
    messages: [
      {
        id: 'm10',
        senderId: '2',
        text: 'Your profile caught our attention for the React Developer position!',
        timestamp: 'Jan 12, 10:15 AM',
      },
    ],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Talent Lead',
    company: 'Linear',
    jobTitle: 'Product Designer',
    avatarBg: 'bg-[#5243E0]',
    avatarText: 'L',
    isOnline: true,
    unreadCount: 0,
    lastTime: '3d ago',
    messages: [
      {
        id: 'm20',
        senderId: '3',
        text: 'Thank you for your interest in Linear!',
        timestamp: 'Jan 10, 11:00 AM',
      },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (typeof window === 'undefined') return INITIAL_CONVERSATIONS;

    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedData) return INITIAL_CONVERSATIONS;

    try {
      return JSON.parse(savedData) as Conversation[];
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });
  const [activeId, setActiveId] = useState<string>('1');

  // Save changes to LocalStorage whenever conversations state updates
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  const activeConv =
    conversations.find((c) => c.id === activeId) || conversations[0] || INITIAL_CONVERSATIONS[0];

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (text: string, fileUrl?: string, fileType?: 'image' | 'file') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text,
      fileUrl,
      fileType,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastTime: 'Just now',
              messages: [...c.messages, newMessage],
            }
          : c
      )
    );
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelectConversation={handleSelectConversation}
      />
      <div className="flex flex-1 flex-col bg-slate-50/30">
        <ActiveChatHeader conversation={activeConv} />
        <ChatFeed conversation={activeConv} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}