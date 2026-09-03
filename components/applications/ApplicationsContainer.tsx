'use client';

import { useState } from 'react';
import { Application } from '@/types/application';
import ApplicationCard from './ApplicationCard';

const FILTER_TABS = ['All', 'Applied', 'Reviewing', 'Shortlisted', 'Interview', 'Rejected', 'Accepted'];

export default function ApplicationsContainer({ initialData }: { initialData: Application[] }) {
  const [applications, setApplications] = useState<Application[]>(initialData);
  const [activeTab, setActiveTab] = useState<string>('All');

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 'All') return true;
    return app.status.toLowerCase() === activeTab.toLowerCase();
  });

  const getCount = (tabName: string) => {
    if (tabName === 'All') return applications.length;
    return applications.filter((a) => a.status.toLowerCase() === tabName.toLowerCase()).length;
  };

  const handleWithdraw = (id: string) => {
    if (confirm('Are you sure you want to withdraw this application?')) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs Bar */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto no-scrollbar">
        {FILTER_TABS.map((tab) => {
          const isActive = activeTab === tab;
          const count = getCount(tab);
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex items-center gap-2 px-4 py-3 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                isActive ? 'text-[#5243E0]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                  isActive ? 'bg-indigo-100 text-[#5243E0]' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5243E0] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 rounded-2xl border border-slate-200/80 bg-white text-center">
            <p className="text-sm font-semibold text-slate-700">No applications found</p>
            <p className="text-xs text-slate-400 mt-1">There are no applications matching the &quot;{activeTab}&quot; filter.</p>
          </div>
        ) : (
          filteredApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} onWithdraw={handleWithdraw} />
          ))
        )}
      </div>
    </div>
  );
}