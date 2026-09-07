'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { FormattedJob } from './JobsTable';
import { createJob, updateJob } from '@/app/actions/jobs';

interface JobModalProps {
  job: FormattedJob | null;
  companies: { id: string; name: string }[];
  onClose: () => void;
  onRefresh: (updatedJob: FormattedJob) => void;
}

export default function JobModal({
  job,
  companies,
  onClose,
  onRefresh,
}: JobModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: job?.title || '',
    companyId: job?.companyId || companies[0]?.id || '',
    location: job?.location || '',
    salary: job?.salary !== 'N/A' ? job?.salary : '',
    jobType: job?.jobType || 'FULL_TIME',
    workplaceType: job?.workplaceType || 'HYBRID',
    dueDate: job?.dueDate !== 'N/A' ? job?.dueDate : '',
    tags: job?.tags?.join(', ') || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const parsedTags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (job) {
      const res = await updateJob(job.id, {
        title: formData.title,
        location: formData.location,
        salary: formData.salary,
        jobType: formData.jobType as FormattedJob['jobType'],
        workplaceType: formData.workplaceType as FormattedJob['workplaceType'],
        dueDate: formData.dueDate,
        tags: parsedTags,
      });

      if (res.success && res.data) {
        onRefresh({
          ...job,
          ...res.data,
          salary: res.data.salary || 'N/A',
          dueDate: res.data.dueDate || 'N/A',
        });
      }
    } else {
      const res = await createJob({
        title: formData.title,
        companyId: formData.companyId,
        location: formData.location,
        salary: formData.salary,
        jobType: formData.jobType as FormattedJob['jobType'],
        workplaceType: formData.workplaceType as FormattedJob['workplaceType'],
        dueDate: formData.dueDate,
        tags: parsedTags,
      });

      if (res.success && res.data) {
        const selectedCompany = companies.find(
          (c) => c.id === formData.companyId
        );
        onRefresh({
          id: res.data.id,
          title: res.data.title,
          companyId: res.data.companyId,
          companyName: selectedCompany?.name || 'Company',
          location: res.data.location,
          salary: res.data.salary || 'N/A',
          jobType: res.data.jobType,
          workplaceType: res.data.workplaceType,
          tags: res.data.tags,
          dueDate: res.data.dueDate || 'N/A',
          applicationsCount: 0,
          createdAt: new Date().toLocaleDateString(),
        });
      }
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">
            {job ? 'Edit Job Posting' : 'Create New Job Listing'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-[#5243E0] focus:outline-none"
            />
          </div>

          {!job && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Company
              </label>
              <select
                value={formData.companyId}
                onChange={(e) =>
                  setFormData({ ...formData, companyId: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-[#5243E0] focus:outline-none"
              >
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g. San Francisco, CA"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-[#5243E0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Salary Range
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: e.target.value })
                }
                placeholder="e.g. $100k - $120k"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-[#5243E0] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Job Type
              </label>
              <select
                value={formData.jobType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jobType: e.target.value as FormattedJob['jobType'],
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-[#5243E0] focus:outline-none"
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Workplace Type
              </label>
              <select
                value={formData.workplaceType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workplaceType: e.target
                      .value as FormattedJob['workplaceType'],
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-[#5243E0] focus:outline-none"
              >
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ON_SITE">On Site</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-[#5243E0] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="e.g. React, Next.js, Tailwind"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-[#5243E0] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#5243E0] px-4 py-2 font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Saving...' : job ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}