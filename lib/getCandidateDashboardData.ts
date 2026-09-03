import { CandidateDashboardData } from '@/types/dashboard';

export async function getCandidateDashboardData(userId: string): Promise<CandidateDashboardData> {
  // Simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Replace this object with your Database ORM query (Prisma, Drizzle, Supabase)
  return {
    user: {
      id: userId,
      name: 'Fatima Mousavi',
      email: 'fatima@gmail.com',
      initials: 'FM',
    },
    stats: {
      applications: { label: 'Applications', value: 12, changeText: '+3 this week' },
      interviews: { label: 'Interviews', value: 4, changeText: '+1 this week' },
      savedJobs: { label: 'Saved Jobs', value: 18 },
      profileViews: { label: 'Profile Views', value: 27, changeText: '+8 this week' },
    },
    profileStrengthPercentage: 80,
    upcomingInterview: {
      id: 'int-1',
      role: 'Frontend Developer',
      company: 'Stripe',
      dateText: 'Jan 20, 2025 • 2:00 PM PST',
      interviewerName: 'Sarah Chen',
      companyInitials: 'S',
    },
    recentApplications: [
      { id: 'app-1', role: 'Frontend Developer', company: 'Stripe', appliedDate: 'Jan 10, 2025', status: 'Interview', companyInitials: 'S', companyLogoBg: 'bg-indigo-600' },
      { id: 'app-2', role: 'React Developer', company: 'Vercel', appliedDate: 'Jan 8, 2025', status: 'Shortlisted', companyInitials: 'V', companyLogoBg: 'bg-black' },
      { id: 'app-3', role: 'Product Designer', company: 'Linear', appliedDate: 'Jan 5, 2025', status: 'Reviewing', companyInitials: 'L', companyLogoBg: 'bg-blue-600' },
      { id: 'app-4', role: 'Marketing Intern', company: 'Notion', appliedDate: 'Dec 28, 2024', status: 'Rejected', companyInitials: 'N', companyLogoBg: 'bg-slate-800' },
    ],
  };
}