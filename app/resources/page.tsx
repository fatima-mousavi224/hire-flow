import { FeaturedGuides } from '@/components/resources/FeaturedGuides';
import { CareerPaths } from '@/components/resources/CareerPaths';
import { NewsletterForm } from '@/components/resources/NewsletterForm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CareerResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col justify-between text-slate-900 font-sans">
      <div>
        <Header />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          
          {/* Hero Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto pt-4">
            <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#5243E0]">
              Career Resources
            </span>
            <h1 className="text-3xl font-extrabold sm:text-4xl text-slate-900 tracking-tight">
              Tools and guides to advance your career
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              From writing your first resume to negotiating your next offer — expert advice for every stage of your career.
            </p>
          </div>

          {/* Featured Guides Section */}
          <FeaturedGuides />

          {/* Career Paths Section */}
          <CareerPaths />

          {/* Newsletter Banner */}
          <div className="rounded-3xl bg-[#5243E0] p-8 sm:p-12 text-center text-white space-y-4 shadow-sm">
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Get weekly career tips
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100">
                Join 10,000+ professionals who get our weekly career newsletter.
              </p>
            </div>

            <NewsletterForm />
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}