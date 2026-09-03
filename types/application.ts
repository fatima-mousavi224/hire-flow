export type ApplicationStatus =
  | 'Applied'
  | 'Reviewing'
  | 'Shortlisted'
  | 'Interview'
  | 'Rejected'
  | 'Accepted';

export interface Application {
  id: string;
  role: string;
  company: string;
  location: string;
  appliedDate: string;
  updatedDate: string;
  salary: string;
  type: string;
  workplaceType: string;
  status: ApplicationStatus;
  companyInitials: string;
  companyBg: string;
  interviewDetails?: {
    date: string;
    time: string;
  };
}