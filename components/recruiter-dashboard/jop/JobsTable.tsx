'use client';

import { useState } from 'react';
import { Plus, Eye, Edit3, MoreVertical } from 'lucide-react';
import JobModal from './JobModal';

export interface FormattedJob {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  salary: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT';
  workplaceType: 'REMOTE' | 'HYBRID' | 'ON_SITE';
  tags: string[];
  dueDate: string;
  applicationsCount: number;
  createdAt: string;
}

interface JobsTableProps {
  initialJobs: FormattedJob[];
  companies: { id: string; name: string }[];
}

export default function JobsTable({ initialJobs, companies }: JobsTableProps) {
  const [jobs, setJobs] = useState<FormattedJob[]>(initialJobs);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<FormattedJob | null>(null);

  const filteredJobs =
    activeTab === 'ALL'
      ? jobs
      : jobs.filter((job) => job.jobType === activeTab);

  const formatEnumText = (str: string) =>
    str.replace('_', '-').toLowerCase();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Job Listings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your active and draft job postings from database
          </p>
        </div>
        <button
          onClick={() => {
            setEditingJob(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#5243E0] px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Post a Job
        </button>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 text-xs font-bold overflow-x-auto">
        {['ALL', 'FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT'].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === tab
                  ? 'border-b-2 border-[#5243E0] text-[#5243E0]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>{tab === 'ALL' ? 'All Jobs' : formatEnumText(tab)}</span>
            </button>
          )
        )}
      </div>

      {/* Job Data Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold">
              <th className="pb-3 font-semibold">Job Title</th>
              <th className="pb-3 font-semibold">Company</th>
              <th className="pb-3 font-semibold">Location</th>
              <th className="pb-3 font-semibold">Applications</th>
              <th className="pb-3 font-semibold">Created</th>
              <th className="pb-3 font-semibold">Due Date</th>
              <th className="pb-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/50">
                <td className="py-4">
                  <p className="font-bold text-slate-900">{job.title}</p>
                  <div className="mt-1 flex gap-1.5 flex-wrap">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 font-medium capitalize">
                      {formatEnumText(job.jobType)}
                    </span>
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] text-indigo-600 font-medium capitalize">
                      {formatEnumText(job.workplaceType)}
                    </span>
                  </div>
                </td>
                <td className="py-4 font-semibold text-slate-700">
                  {job.companyName}
                </td>
                <td className="py-4 text-slate-500">{job.location}</td>
                <td className="py-4 font-bold text-[#5243E0]">
                  {job.applicationsCount}
                </td>
                <td className="py-4 text-slate-500">{job.createdAt}</td>
                <td className="py-4 text-slate-500">{job.dueDate}</td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-400">
                    <button className="p-1 hover:text-[#5243E0] cursor-pointer">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingJob(job);
                        setIsModalOpen(true);
                      }}
                      className="p-1 hover:text-[#5243E0] cursor-pointer"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:text-slate-600 cursor-pointer">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <JobModal
          job={editingJob}
          companies={companies}
          onClose={() => setIsModalOpen(false)}
          onRefresh={(updatedJob) => {
            if (editingJob) {
              setJobs((prev) =>
                prev.map((item) =>
                  item.id === updatedJob.id ? { ...item, ...updatedJob } : item
                )
              );
            } else {
              setJobs((prev) => [updatedJob, ...prev]);
            }
          }}
        />
      )}
    </div>
  );
}