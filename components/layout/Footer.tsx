// components/layout/Footer.tsx
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0B1120] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        
        {/* Main Grid Navigation */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-6 lg:grid-cols-12">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-3 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5241E2] text-white">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                HireFlow
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Connecting ambitious people with the opportunities that move their careers forward.
            </p>

            {/* Social Media Pills */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                in
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                gh
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 md:col-span-3 lg:col-span-8 sm:grid-cols-4">
            
            {/* Column 1: For Candidates */}
            <div>
              <h4 className="text-sm font-semibold text-white">For Candidates</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/jobs" className="transition-colors hover:text-white">
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/saved" className="transition-colors hover:text-white">
                    Saved Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/applications" className="transition-colors hover:text-white">
                    Applications
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="transition-colors hover:text-white">
                    Career Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: For Companies */}
            <div>
              <h4 className="text-sm font-semibold text-white">For Companies</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/post-job" className="transition-colors hover:text-white">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/candidates" className="transition-colors hover:text-white">
                    Find Candidates
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="transition-colors hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/company-resources" className="transition-colors hover:text-white">
                    Company Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="text-sm font-semibold text-white">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/about" className="transition-colors hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="transition-colors hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 className="text-sm font-semibold text-white">Legal</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="transition-colors hover:text-white">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs sm:flex-row">
          <p>© 2026 HireFlow, Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-rose-500">♥</span> for job seekers everywhere
          </p>
        </div>

      </div>
    </footer>
  );
};