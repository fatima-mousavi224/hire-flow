// app/jobs/page.tsx
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JobSearchHeader } from '@/components/jobs/JobSearchHeader';
import { JobFiltersSidebar } from '@/components/jobs/JobFiltersSidebar';
import { ActiveFilters } from '@/components/jobs/ActiveFilters';
import { db } from '@/prisma/db';
import { JobCard } from '@/components/jobs/JobCard';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    type?: string | string[];
    workplace?: string | string[];
    experience?: string | string[];
  }>;
}

export default async function JobsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const selectedTypes = Array.isArray(params.type) ? params.type : params.type ? [params.type] : [];
  const selectedWorkplace = Array.isArray(params.workplace) ? params.workplace : params.workplace ? [params.workplace] : [];

  const rawJobs = await db.orm.public.Job.include('company').all();

  const jobs = rawJobs.filter((job) => {
    if (params.q && !job.title.toLowerCase().includes(params.q.toLowerCase())) return false;
    if (params.location && !job.location.toLowerCase().includes(params.location.toLowerCase())) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(job.jobType)) return false;
    if (selectedWorkplace.length > 0 && !selectedWorkplace.includes(job.workplaceType)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col justify-between">
      <Header />

      <main className="w-full pb-20">
        <div className='md:pt-8 '>

        <JobSearchHeader />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Filter Sidebar */}
            <JobFiltersSidebar />

            {/* Right Job Content Area */}
            <div className="flex-1 w-full space-y-4">
              
              {/* Active Filter Pills Bar & Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <ActiveFilters totalJobs={jobs.length} />

                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 shrink-0">
                  Sort by:
                  <select className="rounded-lg border border-gray-200 bg-white py-1.5 px-3 text-xs font-semibold text-gray-700 focus:outline-hidden">
                    <option>Relevance</option>
                    <option>Newest</option>
                    <option>Salary: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Job Cards */}
              <div className="space-y-4">
                {jobs.map((job) => {
                  const company = typeof job.company === 'object' && job.company !== null ? (job.company as Record<string, unknown>) : {};
                  return (
                    <JobCard
                      key={String(job.id)}
                      job={{
                        id: String(job.id),
                        title: String(job.title || 'Untitled Role'),
                        companyName: typeof company.name === 'string' ? company.name : 'Company',
                        companyLogoBg: typeof company.bgColor === 'string' ? company.bgColor : 'bg-indigo-600',
                        location: String(job.location || 'Remote'),
                        salary: typeof job.salary === 'string' ? job.salary : '$120k – $160k',
                        postedAgo: '2 days ago',
                        jobType: String(job.jobType || 'Full-time'),
                        workplaceType: String(job.workplaceType || 'Hybrid'),
                        tags: Array.isArray(job.tags) ? job.tags.map(String) : [],
                        isFeatured: Boolean(job.isFeatured),
                      }}
                    />
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}