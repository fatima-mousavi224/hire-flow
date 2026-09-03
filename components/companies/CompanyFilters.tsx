'use client';

import { Search } from 'lucide-react';

interface CompanyFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedFilter: string;
  onFilterChange: (category: string) => void;
  totalCount: number;
  categories: string[];
}

export function CompanyFilters({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  totalCount,
  categories,
}: CompanyFiltersProps) {
  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-xs border border-slate-200/90 max-w-xl mx-auto">
        <div className="flex flex-1 items-center gap-2 px-3 text-slate-400">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search companies by name or industry..."
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none"
          />
        </div>
        <button
          type="button"
          className="rounded-xl bg-[#5243E0] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1">Filter:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedFilter === category
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-400">{totalCount} companies</span>
      </div>
    </div>
  );
}