export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpa: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  website: string;
  resumeFileName?: string;
  badges: string[];
  about: string;
  skills: string[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
}