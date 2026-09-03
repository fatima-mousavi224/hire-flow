import { Conversation } from "@/types/chat";

export default function ActiveChatHeader({
  conversation,
}: {
  conversation: Conversation;
}) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-100 bg-white px-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold text-white ${conversation.avatarBg}`}
          >
            {conversation.avatarText}
          </div>
          {conversation.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          )}
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">
            {conversation.name}
          </h2>
          <p className="text-xs text-slate-400">
            {conversation.role} · {conversation.company} ·{" "}
            <span
              className={
                conversation.isOnline ? "text-emerald-600 font-semibold" : ""
              }
            >
              {conversation.isOnline ? "Online" : "Offline"}
            </span>
          </p>
        </div>
      </div>

      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#5243E0]">
        {conversation.jobTitle}
      </span>
    </div>
  );
}
