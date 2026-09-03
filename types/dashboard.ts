export interface CandidateUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials: string;
}

export interface ApplicationStat {
  label: string;
  value: number;
  changeText?: string;
}

export interface ApplicationItem {
  id: string;
  role: string;
  company: string;
  appliedDate: string;
  status: 'Interview' | 'Shortlisted' | 'Reviewing' | 'Rejected' | 'Applied';
  companyLogoBg: string;
  companyInitials: string;
}

export interface UpcomingInterview {
  id: string;
  role: string;
  company: string;
  dateText: string;
  interviewerName: string;
  companyInitials: string;
}

export interface CandidateDashboardData {
  user: CandidateUser;
  stats: {
    applications: ApplicationStat;
    interviews: ApplicationStat;
    savedJobs: ApplicationStat;
    profileViews: ApplicationStat;
  };
  profileStrengthPercentage: number;
  recentApplications: ApplicationItem[];
  upcomingInterview?: UpcomingInterview;
}