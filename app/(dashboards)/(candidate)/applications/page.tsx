import { Application } from '@/types/application';
import ApplicationsContainer from '@/components/applications/ApplicationsContainer';

async function getApplications(): Promise<Application[]> {
  return [
    {
      id: 'app-1',
      role: 'Frontend Developer',
      company: 'Stripe',
      location: 'San Francisco, CA',
      appliedDate: 'Jan 10, 2025',
      updatedDate: 'Jan 14, 2025',
      salary: '$120k – $160k',
      type: 'Full-time',
      workplaceType: 'Hybrid',
      status: 'Interview',
      companyInitials: 'S',
      companyBg: 'bg-indigo-600',
      interviewDetails: { date: 'Jan 20, 2025', time: '2:00 PM' },
    },
    {
      id: 'app-2',
      role: 'React Developer',
      company: 'Vercel',
      location: 'Remote',
      appliedDate: 'Jan 8, 2025',
      updatedDate: 'Jan 12, 2025',
      salary: '$150k – $200k',
      type: 'Full-time',
      workplaceType: 'Remote',
      status: 'Shortlisted',
      companyInitials: 'V',
      companyBg: 'bg-slate-900',
    },
    {
      id: 'app-3',
      role: 'Data Scientist',
      company: 'Anthropic',
      location: 'San Francisco, CA',
      appliedDate: 'Jan 12, 2025',
      updatedDate: 'Jan 13, 2025',
      salary: '$140k – $180k',
      type: 'Full-time',
      workplaceType: 'Hybrid',
      status: 'Applied',
      companyInitials: 'A',
      companyBg: 'bg-amber-600',
    },
    {
      id: 'app-4',
      role: 'Product Designer',
      company: 'Linear',
      location: 'Remote',
      appliedDate: 'Jan 5, 2025',
      updatedDate: 'Jan 10, 2025',
      salary: '$110k – $140k',
      type: 'Full-time',
      workplaceType: 'Remote',
      status: 'Reviewing',
      companyInitials: 'L',
      companyBg: 'bg-[#5243E0]',
    },
    {
      id: 'app-5',
      role: 'Marketing Intern',
      company: 'Notion',
      location: 'San Francisco, CA',
      appliedDate: 'Dec 28, 2024',
      updatedDate: 'Jan 2, 2025',
      salary: '$30/hr',
      type: 'Internship',
      workplaceType: 'Hybrid',
      status: 'Rejected',
      companyInitials: 'N',
      companyBg: 'bg-slate-800',
    },
    {
      id: 'app-6',
      role: 'Next.js Intern',
      company: 'Shopify',
      location: 'Toronto, Canada',
      appliedDate: 'Dec 15, 2024',
      updatedDate: 'Dec 30, 2024',
      salary: '$35/hr',
      type: 'Internship',
      workplaceType: 'Hybrid',
      status: 'Accepted',
      companyInitials: 'S',
      companyBg: 'bg-lime-600',
    },
  ];
}

export default async function ApplicationsPage() {
  const initialApplications = await getApplications();

  return (
    <div className="space-y-6">
      {/* Header rendered on server */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Applications</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Track and manage all your job applications
        </p>
      </div>

      {/* Dynamic interactive list container */}
      <ApplicationsContainer initialData={initialApplications} />
    </div>
  );
}