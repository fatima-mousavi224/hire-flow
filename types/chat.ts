export interface Message {
  id: string;
  senderId: 'user' | string;
  text: string;
  timestamp: string;
  fileUrl?: string;
  fileType?: 'image' | 'file';
}

export interface Conversation {
  id: string;
  name: string;
  role: string;
  company: string;
  jobTitle: string;
  avatarBg: string;
  avatarText: string;
  isOnline: boolean;
  unreadCount: number;
  lastTime: string;
  messages: Message[];
}