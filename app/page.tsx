// app/page.tsx
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { StatsSection, StatItem } from '@/components/sections/StatsSection';
import { CompanyLogos, Company } from '@/components/sections/CompanyLogos';

async function getHiringCompanies(): Promise<Company[]> {
  // Database Query Example (e.g. Prisma / Supabase):
  // const topCompanies = await db.company.findMany({ take: 8, where: { activeJobsCount: { gt: 0 } } });

  return [
    { id: '1', name: 'Stripe', color: 'text-[#635BFF]' },
    { id: '2', name: 'Vercel', color: 'text-[#000000]' },
    { id: '3', name: 'Linear', color: 'text-[#5E6AD2]' },
    { id: '4', name: 'Notion', color: 'text-[#000000]' },
    { id: '5', name: 'Shopify', color: 'text-[#96BF48]' },
    { id: '6', name: 'Anthropic', color: 'text-[#D97706]' },
    { id: '7', name: 'Figma', color: 'text-[#F24E1E]' },
    { id: '8', name: 'PlanetScale', color: 'text-[#00C48C]' },
  ];
}

export default async function Home() {
  const companies = await getHiringCompanies();

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="w-full">
        <Hero />
        <StatsSection />
        <CompanyLogos companies={companies} />
      </main>
    </div>
  );
}