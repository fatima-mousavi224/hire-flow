// app/page.tsx
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { StatsSection } from '@/components/sections/StatsSection';
import { CompanyLogos } from '@/components/sections/CompanyLogos';
import { CategorySection } from '@/components/sections/CategorySection';
import { FeaturedJobs } from '@/components/sections/FeaturedJobs';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { TopEmployers } from '@/components/sections/TopEmployers';
import { InternshipsSection } from '@/components/sections/InternshipsSection';
import { SuccessStories } from '@/components/sections/SuccessStories';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="w-full">
        <Hero />
        <StatsSection />
        <CompanyLogos />
        <FeaturedJobs />
        <CategorySection />
        <HowItWorks />
        <TopEmployers />
        <InternshipsSection />
        <SuccessStories />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}