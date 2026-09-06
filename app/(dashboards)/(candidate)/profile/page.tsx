import ProfileContainer from '@/components/profile/ProfileContainer';
import { ProfileData } from '@/types/profile';

// Mock initial data (replace with actual fetch/database call)
const initialProfileData: ProfileData = {
  name: 'Alex Johnson',
  title: 'Senior Software Engineer',
  location: 'San Francisco, CA',
  website: 'https://alexjohnson.dev',
  resumeFileName: 'Alex_Johnson_CV.pdf',
  badges: ['Full Stack', 'Open Source Contributor', 'React Specialist'],
  about: 'Passionate software engineer with over 5 years of experience building modern web applications using React, Next.js, and TypeScript. Focused on performance, accessibility, and user-centric design.',
  skills: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL', 'PostgreSQL'],
  experiences: [
    {
      id: '1',
      role: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      description: 'Leading the frontend team in rebuilding the core SaaS platform using Next.js and Tailwind CSS, improving load performance by 40%.',
      skills: ['React', 'Next.js', 'TypeScript']
    },
    {
      id: '2',
      role: 'Software Engineer',
      company: 'Innovate Labs',
      period: '2020 - 2022',
      location: 'Austin, TX',
      description: 'Developed responsive user interfaces and integrated RESTful APIs for client dashboard products.',
      skills: ['JavaScript', 'React', 'CSS']
    }
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      period: '2016 - 2020',
      gpa: '3.8 GPA'
    }
  ],
  projects: [
    {
      id: '1',
      title: 'DevMetrics Dashboard',
      link: 'github.com/alexj/devmetrics',
      description: 'An open-source analytics dashboard for tracking GitHub developer repository metrics in real time.',
      tags: ['React', 'Chart.js', 'Tailwind']
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'March 2023'
    }
  ]
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 flex justify-center">
      <ProfileContainer initialProfile={initialProfileData} />
    </main>
  );
}