'use client';

import { useRef } from 'react';
import { Edit2, Upload, Download, MapPin, Globe } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface ProfileHeaderProps {
  profile: ProfileData;
  onEdit: () => void;
  onUploadResume: (file: File) => void;
}

export default function ProfileHeader({ profile, onEdit, onUploadResume }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">My Profile</h1>
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && onUploadResume(e.target.files[0])}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <Upload className="h-4 w-4" />
            {profile.resumeFileName ? 'Change Resume' : 'Upload Resume'}
          </button>
          {profile.resumeFileName && (
            <button className="flex items-center gap-2 rounded-xl bg-[#5243E0] px-4 py-2 text-xs font-bold text-white shadow-2xs hover:opacity-90 cursor-pointer">
              <Download className="h-4 w-4" />
              Download
            </button>
          )}
        </div>
      </div>

      <div className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
        <div className="flex items-start justify-between">
          <div className="flex gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#5243E0] text-xl font-bold text-white">
              {initials}
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
              <p className="text-xs font-medium text-slate-500">{profile.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{profile.location}</span>
                <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{profile.website}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.badges.map((badge, idx) => (
                  <span key={idx} className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-[#5243E0]">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Edit2 className="h-3.5 w-3.5" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}