// components/sections/SuccessStories.tsx

interface TestimonialRecord {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompanyOrSchool: string;
  rating: number;
  avatarColor: string;
}

const TESTIMONIALS: TestimonialRecord[] = [
  {
    id: '1',
    quote:
      '"HireFlow helped me land my first internship at a top startup within three weeks. The application process was so much smoother than anything I\'d tried before."',
    authorName: 'Priya Sharma',
    authorRole: 'Computer Science Student',
    authorCompanyOrSchool: 'UT Austin',
    rating: 5,
    avatarColor: 'bg-indigo-600',
  },
  {
    id: '2',
    quote:
      '"After graduating, I was overwhelmed by the job market. HireFlow\'s matching surfaced jobs that actually fit my skills. I got hired in 6 weeks."',
    authorName: 'Alex Chen',
    authorRole: 'Junior Frontend Developer',
    authorCompanyOrSchool: 'Currently at Vercel',
    rating: 5,
    avatarColor: 'bg-sky-500',
  },
  {
    id: '3',
    quote:
      '"We\'ve reduced our time-to-hire by 40% since using HireFlow. The quality of candidates and the ease of managing applicants is unmatched."',
    authorName: 'Sarah Mitchell',
    authorRole: 'Senior Recruiter',
    authorCompanyOrSchool: 'Vercel',
    rating: 5,
    avatarColor: 'bg-emerald-500',
  },
];

export const SuccessStories = () => {
  return (
    <section className="w-full bg-[#0B1120] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
          SUCCESS STORIES
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Real people, real results
        </h2>

        {/* 3-Column Testimonial Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {TESTIMONIALS.map((item) => {
            const initials = item.authorName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#131C31] p-8 shadow-xl transition-all duration-300 hover:border-slate-700"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>

                  {/* Quote Body */}
                  <p className="mt-6 text-sm leading-relaxed text-slate-300">
                    {item.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-8 flex items-center gap-3.5 border-t border-slate-800/80 pt-6">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${item.avatarColor}`}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-white">
                      {item.authorName}
                    </h3>
                    <p className="truncate text-xs text-slate-400">
                      {item.authorRole} · {item.authorCompanyOrSchool}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};