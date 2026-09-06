import ResumeContainer from '@/components/resume/ResumeContainer';
import { ResumeFile } from '@/types/resume';

const initialResumes: ResumeFile[] = [
  {
    id: '1',
    name: 'Fatima-Mousavi-Resume.pdf',
    size: '142 KB',
    updatedAt: 'Jan 10, 2025',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Fatima-Mousavi-Design-Resume.pdf',
    size: '198 KB',
    updatedAt: 'Dec 5, 2024',
    isDefault: false,
  },
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <ResumeContainer initialResumes={initialResumes} />
    </main>
  );
}