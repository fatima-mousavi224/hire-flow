import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, Bookmark, Share2, ThumbsUp } from 'lucide-react';
import { GUIDES_DATA } from '@/lib/guidesData';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = GUIDES_DATA[slug];

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col justify-between text-slate-900 font-sans">
      <div>
        <Header />

        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <div className="space-y-4 border-b border-slate-200/80 pb-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#5243E0]">
                {guide.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                {guide.readTime}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold sm:text-4xl text-slate-900 tracking-tight leading-tight">
              {guide.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg">
                  {guide.author.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{guide.author.name}</h4>
                  <p className="text-[11px] text-slate-400">{guide.author.role} • {guide.publishedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <Bookmark className="h-3.5 w-3.5" /> Save
                </button>
                <button className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-3 space-y-8">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5243E0]">
                  Key Takeaway
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {guide.keyTakeaway}
                </p>
              </div>

              {guide.sections.map((section) => (
                <div key={section.id} id={section.id} className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">{section.content}</p>
                </div>
              ))}

              <div className="flex items-center justify-between border-t border-slate-200/60 pt-6">
                <span className="text-xs font-semibold text-slate-500">Was this guide helpful?</span>
                <button className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                  <ThumbsUp className="h-3.5 w-3.5" /> Helpful
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="sticky top-6 space-y-3 rounded-2xl border border-slate-200/80 bg-white p-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  On this page
                </h3>
                <nav className="flex flex-col space-y-2 text-xs text-slate-500">
                  {guide.sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="hover:text-[#5243E0] transition-colors">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}