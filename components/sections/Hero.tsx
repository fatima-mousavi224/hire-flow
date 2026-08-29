// components/sections/Hero.tsx
import { Search, MapPin } from 'lucide-react';

export const Hero = () => {
  const trendingTags = [
    'React Developer',
    'Next.js',
    'Frontend Developer',
    'Python',
    'UI/UX Designer',
    'Internship',
    'Remote',
    'TypeScript',
  ];

  return (
    <section className="relative flex h-[calc(100vh-73px)] w-full items-center justify-center overflow-hidden bg-white py-6">
      {/* Grid Background with Radial Fade Mask */}
      <div 
        className="absolute inset-0 bg-grid-pattern mask-[radial-gradient(ellipse_at_top,black_50%,transparent_90%)] pointer-events-none" 
        aria-hidden="true"
      />

      {/* Ambient Purple Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-62.5 bg-[#4F46E5]/10 blur-[100px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center my-auto">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/60 px-5 py-2 text-sm font-medium text-[#4F46E5] backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
          1,284 new jobs posted this week — find yours
        </div>

        {/* Main Heading */}
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl sm:leading-[1.1]">
          Find opportunities that <br className="hidden sm:inline" />
          <span className="relative inline-block text-[#4F46E5]">
            move your career forward
            <svg
              className="absolute -bottom-2 left-0 w-full text-[#4F46E5]/30"
              height="10"
              viewBox="0 0 300 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7C50 2.5 150 2.5 299 7"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 sm:text-xl lg:text-2xl max-w-2xl mx-auto font-normal leading-relaxed">
          Discover jobs, internships, and companies that match your skills,
          goals, and ambitions.
        </p>

        {/* Search Bar Container */}
        <div className="mt-8 mx-auto max-w-4xl rounded-2xl bg-white p-2.5 shadow-[0_15px_35px_-5px_rgba(79,70,229,0.09)] border border-gray-100">
          <form className="flex flex-col sm:flex-row items-center gap-2">
            
            {/* Keyword Input */}
            <div className="flex flex-1 items-center gap-3 px-4 py-2.5 w-full">
              <Search className="h-5 w-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title, skills, or keywords"
                className="w-full bg-transparent text-base text-gray-900 placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div className="hidden sm:block h-8 w-[1px] bg-gray-200" />

            {/* Location Input */}
            <div className="flex flex-1 items-center gap-3 px-4 py-2.5 w-full">
              <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="City or Remote"
                className="w-full bg-transparent text-base text-gray-900 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-[#4F46E5] px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#4338CA] transition-colors shrink-0"
            >
              Search Jobs
            </button>
          </form>
        </div>

        {/* Trending Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-sm">
          <span className="font-semibold text-gray-400 mr-1">Trending:</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="rounded-full border border-gray-100 bg-white px-4 py-1.5 font-medium text-gray-600 hover:border-indigo-200 hover:text-[#4F46E5] transition-colors shadow-xs"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};