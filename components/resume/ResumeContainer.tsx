'use client';

import { useState } from 'react';
import { ResumeFile } from '@/types/resume';
import ResumeUploadDropzone from './ResumeUploadDropzone';
import ResumeCard from './ResumeCard';
import ResumeTipsCard from './ResumeTipsCard';
import PdfPreviewModal from './PdfPreviewModal';

export default function ResumeContainer({ initialResumes }: { initialResumes: ResumeFile[] }) {
  const [resumes, setResumes] = useState<ResumeFile[]>(initialResumes);
  const [previewResume, setPreviewResume] = useState<ResumeFile | null>(null);

  const handleFileUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);

    const newResume: ResumeFile = {
      id: Date.now().toString(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isDefault: resumes.length === 0,
      file,
      url: objectUrl,
    };

    setResumes((prev) => [newResume, ...prev]);
  };

  const handleSetDefault = (id: string) => {
    setResumes((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Resume Management</h1>
        <p className="text-xs font-medium text-slate-500 mt-1">
          Upload and manage your resumes for job applications.
        </p>
      </div>

      <ResumeUploadDropzone onFileUpload={handleFileUpload} />

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900">
          Your Resumes ({resumes.length})
        </h2>
        <div className="space-y-3">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onSetDefault={handleSetDefault}
              onDelete={handleDelete}
              onPreview={(selected) => setPreviewResume(selected)}
            />
          ))}
        </div>
      </div>

      <ResumeTipsCard />

      {/* PDF Modal Viewer */}
      <PdfPreviewModal
        isOpen={!!previewResume}
        fileUrl={previewResume?.url || null}
        fileName={previewResume?.name || ''}
        onClose={() => setPreviewResume(null)}
      />
    </div>
  );
}