// components/sections/HeroSearchForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';

const TRENDING_TAGS = [
  'React Developer',
  'Next.js',
  'Frontend Developer',
  'Python',
  'UI/UX Designer',
  'Internship',
  'Remote',
  'TypeScript',
];

export const HeroSearchForm = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (location.trim()) params.set('location', location.trim());

    router.push(`/jobs?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/jobs?q=${encodeURIComponent(tag)}`);
  };

  return (
    <>
      {/* Search Input Container */}
      <div className="mt-8 mx-auto max-w-4xl rounded-2xl bg-white p-2.5 shadow-[0_15px_35px_-5px_rgba(79,70,229,0.09)] border border-gray-100">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
          
          <div className="flex flex-1 items-center gap-3 px-4 py-2.5 w-full">
            <Search className="h-5 w-5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, skills, or keywords"
              className="w-full bg-transparent text-base text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="hidden sm:block h-8 w-px bg-gray-200" />

          <div className="flex flex-1 items-center gap-3 px-4 py-2.5 w-full">
            <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or Remote"
              className="w-full bg-transparent text-base text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-[#4F46E5] px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#4338CA] transition-colors shrink-0 cursor-pointer"
          >
            Search Jobs
          </button>
        </form>
      </div>

      {/* Trending Tags */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-sm">
        <span className="font-semibold text-gray-400 mr-1">Trending:</span>
        {TRENDING_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className="rounded-full border border-gray-100 bg-white px-4 py-1.5 font-medium text-gray-600 hover:border-indigo-200 hover:text-[#4F46E5] transition-colors shadow-xs cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  );
};