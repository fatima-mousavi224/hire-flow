'use client';

import { useState, useMemo } from 'react';
import { CompanyData, FeaturedCompanyCard, StandardCompanyCard } from './CompanyCards';
import { CompanyFilters } from './CompanyFilters';

const FILTER_CATEGORIES = ['All', 'Financial Technology', 'Developer Tools', 'Productivity', 'E-commerce'];

export function CompaniesContainer({ initialCompanies }: { initialCompanies: CompanyData[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredCompanies = useMemo(() => {
    return initialCompanies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedFilter === 'All' || company.industry === selectedFilter;

      return matchesSearch && matchesCategory;
    });
  }, [initialCompanies, searchQuery, selectedFilter]);

  const featuredCompanies = useMemo(() => {
    return filteredCompanies.filter((c) => c.description && c.size);
  }, [filteredCompanies]);

  return (
    <div className="space-y-10">
      <CompanyFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        totalCount={filteredCompanies.length}
        categories={FILTER_CATEGORIES}
      />

      {/* Featured Companies Section */}
      {featuredCompanies.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#5243E0]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Featured Companies
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompanies.map((company) => (
              <FeaturedCompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      )}

      {/* All Companies Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            All Companies
          </h2>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
            <p className="text-xs text-slate-500">No companies found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map((company) => (
              <StandardCompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}