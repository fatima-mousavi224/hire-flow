export interface GuideDetail {
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: { name: string; role: string; avatar: string };
  keyTakeaway: string;
  sections: { id: string; title: string; content: string }[];
}

export const GUIDES_DATA: Record<string, GuideDetail> = {
  'resume-tips': {
    title: 'How to write a standout resume',
    category: 'Resume Tips',
    readTime: '8 min read',
    publishedDate: 'September 2026',
    author: { name: 'Sarah Jenkins', role: 'Senior Career Coach', avatar: '👩‍💼' },
    keyTakeaway: 'Tailor your resume for every application using keywords directly from the job description to pass ATS filters.',
    sections: [
      { id: 'structure', title: '1. Master the standard layout', content: 'Recruiters spend an average of 6 seconds reviewing a resume. Keep your sections structured cleanly.' },
    ],
  },
  'interview-prep': {
    title: 'Nailing your technical interview',
    category: 'Interview Prep',
    readTime: '12 min read',
    publishedDate: 'August 2026',
    author: { name: 'David Chen', role: 'Staff Engineer', avatar: '👨‍💻' },
    keyTakeaway: 'Always talk through your reasoning aloud while solving coding problems.',
    sections: [
      { id: 'communication', title: '1. Think out loud', content: 'Interviewers evaluate your problem-solving process, not just the final code.' },
    ],
  },
  'salary-negotiation': {
    title: 'How to negotiate your salary offer',
    category: 'Career Growth',
    readTime: '6 min read',
    publishedDate: 'September 2026',
    author: { name: 'Elena Rostova', role: 'Talent Acquisition Director', avatar: '💼' },
    keyTakeaway: 'Never give the first number during initial recruiter screens.',
    sections: [
      { id: 'research', title: '1. Know your market value', content: 'Gather data from multiple sources to establish your salary floor before negotiating.' },
    ],
  },
  'career-change': {
    title: 'Transitioning to a tech career in 2026',
    category: 'Career Change',
    readTime: '15 min read',
    publishedDate: 'July 2026',
    author: { name: 'Marcus Vance', role: 'Career Switch Specialist', avatar: '🚀' },
    keyTakeaway: 'Focus on building 2-3 high-quality portfolio projects.',
    sections: [
      { id: 'portfolio', title: '1. Build real projects', content: 'Shipping end-to-end applications demonstrates practical capabilities.' },
    ],
  },
  'tech-internships': {
    title: 'The complete guide to tech internships',
    category: 'Students',
    readTime: '10 min read',
    publishedDate: 'August 2026',
    author: { name: 'Jessica Taylor', role: 'University Recruiter', avatar: '🎓' },
    keyTakeaway: 'Apply early in the recruiting cycle (August to October).',
    sections: [
      { id: 'timeline', title: '1. Apply early', content: 'Tech companies recruit for summer internships almost a full year in advance.' },
    ],
  },
  'linkedin-branding': {
    title: 'Building a personal brand on LinkedIn',
    category: 'Personal Brand',
    readTime: '7 min read',
    publishedDate: 'September 2026',
    author: { name: 'Alex Rivera', role: 'Growth Strategist', avatar: '🌐' },
    keyTakeaway: 'Consistency matters more than length. Post twice a week sharing what you learned.',
    sections: [
      { id: 'headline', title: '1. Optimize your headline', content: 'Use your headline to explain the specific value you deliver.' },
    ],
  },
};