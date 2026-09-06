'use client';

import { X, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  fileUrl: string | null;
  fileName: string;
  onClose: () => void;
}

export default function PdfPreviewModal({ isOpen, fileUrl, fileName, onClose }: Props) {
  if (!isOpen || !fileUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 md:p-10">
      <div className="flex h-full w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-slate-900">{fileName}</h3>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-[#5243E0] hover:underline"
            >
              Open in new tab <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-slate-100 p-2">
          <iframe
            src={`${fileUrl}#toolbar=0`}
            className="h-full w-full rounded-xl border-0 bg-white shadow-inner"
            title={`Preview of ${fileName}`}
          />
        </div>
      </div>
    </div>
  );
}