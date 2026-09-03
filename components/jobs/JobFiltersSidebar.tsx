// components/jobs/JobFiltersSidebar.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'radio';
  options: string[];
}

const SECTIONS: FilterSection[] = [
  {
    id: 'type',
    title: 'Job Type',
    type: 'checkbox',
    options: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'],
  },
  {
    id: 'workplace',
    title: 'Workplace',
    type: 'checkbox',
    options: ['Remote', 'Hybrid', 'On-site'],
  },
  {
    id: 'experience',
    title: 'Experience Level',
    type: 'checkbox',
    options: ['Entry level', 'Mid level', 'Senior', 'Internship'],
  },
  {
    id: 'datePosted',
    title: 'Date Posted',
    type: 'radio',
    options: ['Last 24 hours', 'Last 3 days', 'Last 7 days', 'Last 30 days'],
  },
  {
    id: 'salary',
    title: 'Salary Range',
    type: 'radio',
    options: ['< $50k', '$50k – $100k', '$100k – $150k', '$150k+'],
  },
];

export const JobFiltersSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // All accordion dropdowns start closed by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    type: false,
    workplace: false,
    experience: false,
    datePosted: false,
    salary: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOptionSelect = (paramKey: string, optionValue: string, inputType: 'checkbox' | 'radio') => {
    const params = new URLSearchParams(searchParams.toString());

    if (inputType === 'radio') {
      const currentValue = params.get(paramKey);
      if (currentValue === optionValue) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, optionValue);
      }
    } else {
      const currentValues = params.getAll(paramKey);
      if (currentValues.includes(optionValue)) {
        const updatedValues = currentValues.filter((v) => v !== optionValue);
        params.delete(paramKey);
        updatedValues.forEach((v) => params.append(paramKey, v));
      } else {
        params.append(paramKey, optionValue);
      }
    }

    // Auto-close section after picking an option
    setOpenSections((prev) => ({ ...prev, [paramKey]: false }));

    router.push(`/jobs?${params.toString()}`);
  };

  const clearAll = () => {
    setOpenSections({
      type: false,
      workplace: false,
      experience: false,
      datePosted: false,
      salary: false,
    });
    router.push('/jobs');
  };

  const appliedCount = Array.from(searchParams.keys()).filter(
    (k) => k !== 'q' && k !== 'location'
  ).length;

  return (
    /* sticky top-6 keeps the filter fixed on screen while the job cards scroll */
    <aside className="sticky top-6 w-full lg:w-80 shrink-0 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Filters</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {appliedCount} {appliedCount === 1 ? 'filter applied' : 'filters applied'}
          </p>
        </div>
        {appliedCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-semibold text-[#5243E0] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Categories */}
      {SECTIONS.map((section) => {
        const activeValues = searchParams.getAll(section.id);
        const isOpen = openSections[section.id];

        return (
          <div key={section.id} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
            {/* Header Trigger */}
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between py-1 text-left group"
            >
              <h4 className="text-xs font-bold text-slate-800 tracking-wider uppercase transition-colors group-hover:text-slate-900">
                {section.title}
              </h4>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600" />
              )}
            </button>

            {/* Expandable Options */}
            {isOpen && (
              <div className="mt-3 space-y-3 pt-1">
                {section.options.map((option) => {
                  const isChecked = activeValues.includes(option);

                  return (
                    <label
                      key={option}
                      className="flex items-center gap-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
                    >
                      <input
                        type={section.type}
                        name={section.type === 'radio' ? section.id : undefined}
                        checked={isChecked}
                        onChange={() => handleOptionSelect(section.id, option, section.type)}
                        className={`h-4 w-4 border-slate-300 text-[#5243E0] focus:ring-indigo-500 cursor-pointer ${
                          section.type === 'radio' ? 'rounded-full' : 'rounded-sm'
                        }`}
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};