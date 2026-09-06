'use client';

import { Plus, Edit2 } from 'lucide-react';

interface ProfileSectionCardProps {
  title: string;
  onAdd?: () => void;
  onEdit?: () => void;
  children: React.ReactNode;
}

export default function ProfileSectionCard({ title, onAdd, onEdit, children }: ProfileSectionCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#5243E0] cursor-pointer"
            >
              <Edit2 className="h-3.5 w-3.5" /> Edit
            </button>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#5243E0] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}