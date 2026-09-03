'use client';

import { useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';
import Image from 'next/image';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  fileUrl?: string;
  fileType?: 'image' | 'file';
}

export interface Conversation {
  id: string;
  name: string;
  avatarBg: string;
  avatarText: string;
  messages: Message[];
}

export default function ChatFeed({ conversation }: { conversation: Conversation }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
      {conversation.messages.map((msg) => {
        const isMe = msg.senderId === 'user';

        return (
          <div
            key={msg.id}
            className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
          >
            {!isMe && (
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${conversation.avatarBg}`}
              >
                {conversation.avatarText}
              </div>
            )}

            <div className={`max-w-md space-y-1 ${isMe ? 'items-end text-right' : 'items-start'}`}>
              <div
                className={`rounded-2xl p-4 text-xs font-medium leading-relaxed ${
                  isMe
                    ? 'bg-[#5243E0] text-white rounded-br-none shadow-2xs'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-2xs'
                }`}
              >
                {/* Render Attached Image */}
                {msg.fileUrl && msg.fileType === 'image' && (
                  <Image
                    src={msg.fileUrl}
                    alt="Attachment"
                    width={600}
                    height={240}
                    className="mb-2 max-h-60 w-full rounded-xl object-cover"
                  />
                )}

                {/* Render Attached Document */}
                {msg.fileUrl && msg.fileType === 'file' && (
                  <a
                    href={msg.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mb-2 flex items-center gap-2 rounded-xl p-2.5 text-xs font-semibold ${
                      isMe ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">Download Attached File</span>
                  </a>
                )}

                {/* Message Body */}
                {msg.text && <p>{msg.text}</p>}
              </div>

              <p className="text-[10px] font-medium text-slate-400 px-1">
                {msg.timestamp}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}