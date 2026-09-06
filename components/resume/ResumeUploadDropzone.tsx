'use client';

import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface Props {
  onFileUpload: (file: File) => void;
}

export default function ResumeUploadDropzone({ onFileUpload }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
        isDragging
          ? 'border-[#5243E0] bg-indigo-50/50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx"
        className="hidden"
      />

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#5243E0] transition-transform group-hover:scale-105">
        <Upload className="h-6 w-6" />
      </div>

      <h3 className="mt-3 text-sm font-bold text-slate-900">Upload your resume</h3>
      <p className="text-xs font-medium text-slate-500">Drag and drop or click to browse</p>
      <p className="mt-1 text-[11px] text-slate-400">PDF or DOCX · Max 5MB</p>
    </div>
  );
}