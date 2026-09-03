// components/sections/HowItWorks.tsx

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const STEPS: StepItem[] = [
  {
    number: 'STEP 01',
    title: 'Discover',
    description: 'Search thousands of curated opportunities and filter by role, location, salary, and more.',
    icon: '🔍',
  },
  {
    number: 'STEP 02',
    title: 'Apply',
    description: 'Submit your application in minutes with your saved profile. No repetitive forms.',
    icon: '✉️',
  },
  {
    number: 'STEP 03',
    title: 'Get hired',
    description: 'Track applications, schedule interviews, and accept your offer — all in one place.',
    icon: '🎉',
  },
];

export const HowItWorks = () => {
  return (
    <section className="w-full bg-slate-50/50 py-20 border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <p className="text-xs font-bold tracking-widest text-[#4F46E5] uppercase">
          SIMPLE PROCESS
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Your next opportunity is three steps away
        </h2>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => {
            const isMiddle = index === 1;

            return (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                
                {/* Icon Container Card - Middle card scaled larger */}
                <div 
                  className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-200/80 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] transition-transform duration-200 ${
                    isMiddle ? 'scale-110 shadow-md' : ''
                  }`}
                >
                  <span className="text-3xl">{step.icon}</span>

                  {/* Lines attached directly to the left and right edges of the 2nd card */}
                  {isMiddle && (
                    <>
                      {/* Connected to Left Edge */}
                      <div 
                        className="absolute top-1/2 right-full hidden h-[1.5px] w-28 -translate-y-1/2 bg-indigo-100 md:block" 
                        aria-hidden="true" 
                      />

                      {/* Connected to Right Edge */}
                      <div 
                        className="absolute top-1/2 left-full hidden h-[1.5px] w-28 -translate-y-1/2 bg-indigo-100 md:block" 
                        aria-hidden="true" 
                      />
                    </>
                  )}
                </div>

                {/* Step Tag */}
                <span className="mt-6 text-[11px] font-bold tracking-widest text-[#4F46E5] uppercase">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
                  {step.description}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};