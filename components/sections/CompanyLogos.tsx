// components/sections/CompanyLogos.tsx
import Image from 'next/image';

export interface Company {
  id: string | number;
  name: string;
  logoUrl?: string; // Optional SVG/PNG logo
  color?: string;   // Optional custom color matching brand (e.g., "#635BFF" for Stripe)
}

interface CompanyLogosProps {
  companies?: Company[];
  title?: string;
}

// Fallback dynamic data matching your Figma screenshot
const defaultCompanies: Company[] = [
  { id: 1, name: 'Stripe', color: 'text-indigo-500' },
  { id: 2, name: 'Vercel', color: 'text-slate-800' },
  { id: 3, name: 'Linear', color: 'text-indigo-400' },
  { id: 4, name: 'Notion', color: 'text-slate-600' },
  { id: 5, name: 'Shopify', color: 'text-emerald-500' },
  { id: 6, name: 'Anthropic', color: 'text-amber-600' },
  { id: 7, name: 'Figma', color: 'text-rose-500' },
  { id: 8, name: 'PlanetScale', color: 'text-emerald-400' },
];

export const CompanyLogos = ({
  companies = defaultCompanies,
  title = 'COMPANIES ACTIVELY HIRING ON HIREFLOW',
}: CompanyLogosProps) => {
  return (
    <section className="w-full bg-white py-12 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 text-center">
        
        {/* Section Title */}
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {title}
        </p>

        {/* Company Logos/Names Flex Container */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-center transition-opacity hover:opacity-80"
            >
              {company.logoUrl ? (
                /* Render Image Logo if database provides logoUrl */
                <Image
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  width={110}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
              ) : (
                /* Render Styled Brand Name Text matching Figma */
                <span
                  className={`text-lg sm:text-xl font-bold tracking-tight ${
                    company.color || 'text-slate-700'
                  }`}
                >
                  {company.name}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};