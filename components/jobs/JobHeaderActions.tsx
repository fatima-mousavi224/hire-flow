// components/jobs/JobHeaderActions.tsx
'use client';

import { useState } from 'react';
import { Bookmark, Share2 } from 'lucide-react';

interface JobHeaderActionsProps {
  jobId: string;
}

export const JobHeaderActions = ({ jobId }: JobHeaderActionsProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Job Opportunity',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share cancelled', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
      <button className="rounded-xl bg-[#5243E0] px-6 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-indigo-700 transition-colors">
        Apply Now
      </button>
      <button
        onClick={() => setIsSaved(!isSaved)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <Bookmark
          className={`h-3.5 w-3.5 ${
            isSaved ? 'fill-[#5243E0] text-[#5243E0]' : 'text-slate-400'
          }`}
        />
        {isSaved ? 'Saved' : 'Save Job'}
      </button>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <Share2 className="h-3.5 w-3.5 text-slate-400" />
        Share
      </button>
    </div>
  );
};