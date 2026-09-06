'use server';

import { revalidatePath } from 'next/cache';
import { ProfileData } from '@/types/profile';

// Mock database store
const profileStore: ProfileData = {
  name: 'Fatima Mousavi',
  title: 'Frontend Developer',
  location: 'San Francisco, CA',
  website: 'fatimamousavi.dev',
  badges: ['Open to work', 'React Developer', 'TypeScript'],
  about:
    'Frontend developer with 3+ years of experience building scalable React applications. Passionate about creating exceptional user experiences through clean, performant code and thoughtful design. I specialize in TypeScript and modern React patterns, and I am always eager to learn new technologies.',
  skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS / Tailwind', 'GraphQL', 'Node.js', 'PostgreSQL', 'Git', 'Figma', 'Agile/Scrum'],
  experiences: [
    {
      id: 'e1',
      role: 'Frontend Developer',
      company: 'TechCorp',
      period: 'Jan 2023 - Present',
      location: 'San Francisco, CA',
      description: 'Built React applications for 200k+ users. Led frontend migration from jQuery to React, improving performance by 60%.',
      skills: ['React', 'TypeScript', 'GraphQL', 'CSS'],
    },
    {
      id: 'e2',
      role: 'Junior Frontend Developer',
      company: 'StartupXYZ',
      period: 'Jun 2021 - Dec 2022',
      location: 'Remote',
      description: 'Developed UI components and features for a SaaS product. Collaborated with designers and backend engineers.',
      skills: ['React', 'JavaScript', 'REST APIs'],
    },
  ],
  education: [
    {
      id: 'ed1',
      degree: 'B.S. Computer Science',
      institution: 'UC Berkeley',
      period: '2017 - 2021',
      gpa: 'GPA: 3.8/4.0',
    },
  ],
  projects: [
    {
      id: 'p1',
      title: 'Portfolio Website',
      link: 'fatimamousavi.dev',
      description: 'Built a personal portfolio using Next.js and Tailwind CSS with interactive animations.',
      tags: ['Next.js', 'Tailwind', 'TypeScript'],
    },
    {
      id: 'p2',
      title: 'Job Tracker App',
      link: 'github.com/fatima/job-tracker',
      description: 'A personal project to track job applications, built with React and a Supabase backend.',
      tags: ['React', 'Supabase', 'PostgreSQL'],
    },
  ],
  certifications: [
    {
      id: 'c1',
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: 'March 2024',
    },
    {
      id: 'c2',
      name: 'Google Professional Cloud Developer',
      issuer: 'Google',
      date: 'November 2023',
    },
  ],
};

export async function getProfileData(): Promise<ProfileData> {
  return profileStore;
}

export async function updateAboutSection(formData: FormData) {
  const aboutText = formData.get('about') as string;
  if (aboutText) {
    profileStore.about = aboutText;
    revalidatePath('/profile');
  }
}

export async function addSkillAction(formData: FormData) {
  const newSkill = formData.get('skill') as string;
  if (newSkill && !profileStore.skills.includes(newSkill)) {
    profileStore.skills.push(newSkill);
    revalidatePath('/profile');
  }
}