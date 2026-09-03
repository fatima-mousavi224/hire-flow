// components/jobs/JobSearchHeader.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';

export const JobSearchHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) params.set('q', query.trim());
    else params.delete('q');

    if (location.trim()) params.set('location', location.trim());
    else params.delete('location');

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Main Keyword Search Input (Takes ~65% width) */}
          <div className="relative flex-[3] w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Job title, skills, or keywords"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:outline-hidden transition-colors shadow-2xs"
            />
          </div>

          {/* Location Input (Takes ~25% width) */}
          <div className="relative flex-[1.2] w-full">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="City or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:outline-hidden transition-colors shadow-2xs"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto rounded-xl bg-[#5243E0] px-8 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-indigo-700 shrink-0"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};