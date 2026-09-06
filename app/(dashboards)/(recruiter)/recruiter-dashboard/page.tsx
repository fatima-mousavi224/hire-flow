import ActiveJobsList from "@/components/recruiter-dashboard/dashbord/ActiveJobsList";
import ApplicationFunnel from "@/components/recruiter-dashboard/dashbord/ApplicationFunnel";
import ApplicationsChart from "@/components/recruiter-dashboard/dashbord/ApplicationsChart";
import HeaderBanner from "@/components/recruiter-dashboard/dashbord/HeaderBanner";
import QuickActionsGrid from "@/components/recruiter-dashboard/dashbord/QuickActionsGrid";
import RecentApplicantsTable from "@/components/recruiter-dashboard/dashbord/RecentApplicantsTable";
import StatsGrid from "@/components/recruiter-dashboard/dashbord/StatsGrid";

// Database query function (connect to your database instance here)
async function getRecruiterDashboardData() {
  // Example real database fetch pattern:
  // const jobs = await db.job.findMany({ where: { status: 'ACTIVE' } });

  return {
    user: { name: 'James' },
    stats: {
      activeJobs: 24,
      totalApplications: 438,
      shortlisted: 62,
      interviews: 18,
    },
    weeklyApplications: [
      { day: 'Mon', count: 12 },
      { day: 'Tue', count: 19 },
      { day: 'Wed', count: 8 },
      { day: 'Thu', count: 24 },
      { day: 'Fri', count: 32 },
      { day: 'Sat', count: 7 },
      { day: 'Sun', count: 3 },
    ],
    funnel: [
      { label: 'Applied', count: 438, percentage: 64 },
      { label: 'Reviewed', count: 280, percentage: 22 },
      { label: 'Shortlisted', count: 62, percentage: 29 },
      { label: 'Interview', count: 18, percentage: 28 },
      { label: 'Hired', count: 5, percentage: null },
    ],
    recentApplicants: [
      { id: '1', name: 'Fatima Mousavi', avatar: 'FM', avatarBg: 'bg-indigo-600', role: 'Frontend Developer', experience: '3 years', status: 'Shortlisted' },
      { id: '2', name: 'James Chen', avatar: 'JC', avatarBg: 'bg-sky-500', role: 'Frontend Developer', experience: '5 years', status: 'Reviewing' },
      { id: '3', name: 'Priya Sharma', avatar: 'PS', avatarBg: 'bg-emerald-500', role: 'React Developer', experience: '2 years', status: 'Applied' },
      { id: '4', name: 'Carlos Ortiz', avatar: 'CO', avatarBg: 'bg-amber-500', role: 'Frontend Developer', experience: '4 years', status: 'Interview' },
    ],
    activeJobs: [
      { id: '1', title: 'Frontend Developer', applicantsCount: 87, status: 'Active' },
      { id: '2', title: 'React Developer', applicantsCount: 143, status: 'Active' },
      { id: '3', title: 'Next.js Intern', applicantsCount: 234, status: 'Active' },
      { id: '4', title: 'Product Designer', applicantsCount: 56, status: 'Active' },
    ],
    quickActions: {
      reviewQueue: 14,
      interviewsToday: 2,
      newMessages: 5,
      expiringJobs: 3,
    },
  };
}

export default async function RecruiterDashboardPage() {
  const data = await getRecruiterDashboardData();

  return (
    <div className="space-y-6">
      <HeaderBanner userName={data.user.name} />
      <StatsGrid stats={data.stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ApplicationsChart weeklyApplications={data.weeklyApplications} />
        </div>
        <div>
          <ApplicationFunnel funnel={data.funnel} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentApplicantsTable applicants={data.recentApplicants} />
        </div>
        <div className="space-y-6">
          <ActiveJobsList jobs={data.activeJobs} />
          <QuickActionsGrid counts={data.quickActions} />
        </div>
      </div>
    </div>
  );
}