'use client';

import { Eye, Download, Trash2 } from 'lucide-react';
import { ResumeFile } from '@/types/resume';

interface Props {
  resume: ResumeFile;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (resume: ResumeFile) => void;
}

export default function ResumeCard({ resume, onSetDefault, onDelete, onPreview }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xs font-bold text-red-500">
            PDF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">{resume.name}</h4>
              {resume.isDefault && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                  Default
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {resume.size} · Updated {resume.updatedAt}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            onClick={() => onPreview(resume)}
            title="Preview Resume"
            className="rounded-lg p-2 hover:bg-slate-50 hover:text-slate-600 cursor-pointer"
          >
            <Eye className="h-4 w-4" />
          </button>
          <a
            href={resume.url}
            download={resume.name}
            title="Download"
            className="rounded-lg p-2 hover:bg-slate-50 hover:text-slate-600 cursor-pointer"
          >
            <Download className="h-4 w-4" />
          </a>
          {!resume.isDefault && (
            <button
              onClick={() => onDelete(resume.id)}
              title="Delete"
              className="rounded-lg p-2 hover:bg-slate-50 hover:text-red-500 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {!resume.isDefault && (
        <div className="flex justify-end pt-1">
          <button
            onClick={() => onSetDefault(resume.id)}
            className="text-xs font-bold text-[#5243E0] hover:underline cursor-pointer"
          >
            Set as default
          </button>
        </div>
      )}
    </div>
  );
}