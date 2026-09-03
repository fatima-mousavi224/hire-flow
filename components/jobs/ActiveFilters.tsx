// components/jobs/ActiveFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  totalJobs: number;
}

export const ActiveFilters = ({ totalJobs }: ActiveFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeParams: { key: string; value: string }[] = [];
  
  searchParams.forEach((value, key) => {
    if (key !== 'q' && key !== 'location') {
      activeParams.push({ key, value });
    }
  });

  const removeFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);
    const updatedValues = currentValues.filter((v) => v !== value);

    params.delete(key);
    updatedValues.forEach((v) => params.append(key, v));

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-sm font-bold text-gray-900">
        {totalJobs} <span className="font-normal text-gray-500">jobs found</span>
      </p>

      {/* Selected Box / Option Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {activeParams.map(({ key, value }) => (
          <span
            key={`${key}-${value}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-[#4F46E5] border border-indigo-100"
          >
            {value}
            <button
              onClick={() => removeFilter(key, value)}
              className="text-indigo-400 hover:text-indigo-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};