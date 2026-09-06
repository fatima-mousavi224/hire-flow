'use client';

import { X } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  type: string;
  title: string;
  initialData?: Record<string, string>;
  onClose: () => void;
  onSave: (fields: Record<string, string>) => void;
}

export default function EditModal({ isOpen, type, title, initialData = {}, onClose, onSave }: EditModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave(Object.fromEntries(formData.entries()) as Record<string, string>);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {type === 'header' && (
            <>
              <input name="name" defaultValue={initialData.name} placeholder="Full Name" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="title" defaultValue={initialData.title} placeholder="Professional Title" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="location" defaultValue={initialData.location} placeholder="Location" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="website" defaultValue={initialData.website} placeholder="Website URL" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="badges" defaultValue={initialData.badges} placeholder="Badges (comma-separated)" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" />
            </>
          )}

          {type === 'about' && (
            <textarea name="about" defaultValue={initialData.about} rows={4} className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
          )}

          {type === 'skill' && (
            <input name="skill" placeholder="Skill name" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
          )}

          {type === 'experience' && (
            <>
              <input name="role" defaultValue={initialData.role} placeholder="Role / Job Title" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="company" defaultValue={initialData.company} placeholder="Company Name" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="period" defaultValue={initialData.period} placeholder="Period" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="location" defaultValue={initialData.location} placeholder="Location" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <textarea name="description" defaultValue={initialData.description} rows={3} placeholder="Description" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
            </>
          )}

          {type === 'education' && (
            <>
              <input name="degree" defaultValue={initialData.degree} placeholder="Degree" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="institution" defaultValue={initialData.institution} placeholder="Institution" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="period" defaultValue={initialData.period} placeholder="Period" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="gpa" defaultValue={initialData.gpa} placeholder="GPA" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" />
            </>
          )}

          {type === 'project' && (
            <>
              <input name="title" defaultValue={initialData.title} placeholder="Project Title" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="link" defaultValue={initialData.link} placeholder="Project Link" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <textarea name="description" defaultValue={initialData.description} rows={3} placeholder="Description" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
            </>
          )}

          {type === 'certification' && (
            <>
              <input name="name" defaultValue={initialData.name} placeholder="Certification Name" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="issuer" defaultValue={initialData.issuer} placeholder="Issuer" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
              <input name="date" defaultValue={initialData.date} placeholder="Date" className="w-full rounded-xl border border-slate-200 p-2.5 text-xs" required />
            </>
          )}

          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-[#5243E0] px-4 py-2 text-xs font-bold text-white hover:opacity-90 cursor-pointer">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}