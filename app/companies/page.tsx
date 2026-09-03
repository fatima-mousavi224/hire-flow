// app/companies/page.tsx
import { CompaniesContainer } from '@/components/companies/CompaniesContainer';
import { CompanyData } from '@/components/companies/CompanyCards';
import { IndustryGrid } from '@/components/companies/IndustryGrid';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

const COMPANIES_DATA: CompanyData[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    industry: 'Financial Technology',
    description: 'Stripe is a technology company that builds economic infrastructure for the internet. Business...',
    location: 'San Francisco, CA',
    size: '5,000–10,000 employees',
    openJobsCount: 24,
    bgColor: 'bg-[#635BFF]',
    isFollowing: false,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    industry: 'Developer Tools',
    description: 'Vercel is the platform for frontend developers, providing the speed and reliability innovators nee...',
    location: 'Remote',
    size: '500–1,000 employees',
    openJobsCount: 18,
    bgColor: 'bg-slate-900',
    isFollowing: true,
  },
  {
    id: 'linear',
    name: 'Linear',
    industry: 'Developer Tools',
    description: 'Linear is the new standard for modern software development. From idea to feature, we help teams...',
    location: 'Remote',
    size: '50–200 employees',
    openJobsCount: 8,
    bgColor: 'bg-[#5E6AD2]',
    isFollowing: false,
  },
  {
    id: 'notion',
    name: 'Notion',
    industry: 'Productivity',
    location: 'San Francisco, CA',
    openJobsCount: 12,
    bgColor: 'bg-[#1E2530]',
    isFollowing: false,
  },
  {
    id: 'figma',
    name: 'Figma',
    industry: 'Design',
    location: 'San Francisco, CA',
    openJobsCount: 14,
    bgColor: 'bg-[#EA4C1D]',
    isFollowing: false,
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    industry: 'Data & AI',
    location: 'San Francisco, CA',
    openJobsCount: 22,
    bgColor: 'bg-[#D97706]',
    isFollowing: false,
  },
  {
    id: 'shopify',
    name: 'Shopify',
    industry: 'E-commerce',
    location: 'Ottawa, Canada',
    openJobsCount: 38,
    bgColor: 'bg-[#008060]',
    isFollowing: false,
  },
  {
    id: 'planetscale',
    name: 'PlanetScale',
    industry: 'Developer Tools',
    location: 'Remote',
    openJobsCount: 9,
    bgColor: 'bg-[#10B981]',
    isFollowing: false,
  },
];

const INDUSTRIES_GRID = [
  { title: 'Software Development', count: 412, icon: '💻', bg: 'bg-[#EEF2FF]' },
  { title: 'Design', count: 87, icon: '🎨', bg: 'bg-[#FFF1F2]' },
  { title: 'Data & AI', count: 203, icon: '🤖', bg: 'bg-[#FEF3C7]' },
  { title: 'Marketing', count: 134, icon: '📢', bg: 'bg-[#ECFDF5]' },
  { title: 'Finance', count: 98, icon: '💰', bg: 'bg-[#F0F9FF]' },
  { title: 'E-commerce', count: 178, icon: '🛍️', bg: 'bg-[#FDF2F8]' },
  { title: 'Business', count: 158, icon: '📊', bg: 'bg-[#F5F3FF]' },
  { title: 'Operations', count: 122, icon: '⚙️', bg: 'bg-[#FFF7ED]' },
];

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col justify-between text-slate-900 font-sans">
      <div>
        <Header />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          {/* Hero Heading */}
          <div className="text-center space-y-3 max-w-2xl mx-auto pt-4">
            <h1 className="text-3xl font-extrabold sm:text-4xl text-slate-900 tracking-tight">
              Discover great companies
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              Explore the companies shaping the future and find the right environment for your career.
            </p>
          </div>

          {/* Dynamic Filters & Grid Container */}
          <CompaniesContainer initialCompanies={COMPANIES_DATA} />

          {/* Static Industry Grid */}
          <IndustryGrid />

        </main>
      </div>

      <Footer />
    </div>
  );
}