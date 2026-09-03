"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Conversation } from "@/types/chat";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string;
  onSelectConversation: (id: string) => void;
}

export default function ChatSidebar({
  conversations,
  activeId,
  onSelectConversation,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex w-80 shrink-0 flex-col border-r border-slate-100 bg-white">
      {/* Search Header */}
      <div className="p-4 border-b border-slate-100">
        <h1 className="text-xl font-black text-slate-900 tracking-tight mb-3">
          Messages
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-50 pl-9 pr-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* List Item Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
        {filteredConversations.map((conv) => {
          const isSelected = conv.id === activeId;
          const lastMsg = conv.messages[conv.messages.length - 1];

          return (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`flex w-full items-center gap-3 p-4 text-left transition-colors cursor-pointer ${
                isSelected ? "bg-indigo-50/50" : "hover:bg-slate-50"
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold text-white ${conv.avatarBg}`}
                >
                  {conv.avatarText}
                </div>
                {conv.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-xs font-bold text-slate-900 truncate">
                    {conv.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {conv.lastTime}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-400 truncate">
                  {conv.company} · {conv.jobTitle}
                </p>
                <p className="text-xs text-slate-500 truncate pt-0.5">
                  {lastMsg?.text || "No messages yet"}
                </p>
              </div>

              {conv.unreadCount > 0 && !isSelected && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5243E0] text-[10px] font-bold text-white">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
