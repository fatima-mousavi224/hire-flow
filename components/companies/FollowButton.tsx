'use client';

import { useOptimistic, useTransition } from 'react';
import { Check } from 'lucide-react';

interface FollowButtonProps {
  companyId: string;
  initialIsFollowing?: boolean;
}

export function FollowButton({ companyId, initialIsFollowing = false }: FollowButtonProps) {
  const [isPending, startTransition] = useTransition();

  // Optimistic UI update: instantly toggles UI while network request completes
  const [optimisticFollowing, setOptimisticFollowing] = useOptimistic(
    initialIsFollowing,
    (state) => !state
  );

  const handleToggle = () => {
    startTransition(async () => {
      setOptimisticFollowing(!optimisticFollowing);
      try {
        await fetch(`/api/companies/${companyId}/follow`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ follow: !optimisticFollowing }),
        });
      } catch (err) {
        // Fallback or error logging
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex items-center justify-center gap-1 rounded-xl px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
        optimisticFollowing
          ? 'bg-indigo-50 text-[#5243E0] hover:bg-indigo-100'
          : 'border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      {optimisticFollowing && <Check className="h-3 w-3 text-[#5243E0]" />}
      {optimisticFollowing ? 'Following' : 'Follow'}
    </button>
  );
}