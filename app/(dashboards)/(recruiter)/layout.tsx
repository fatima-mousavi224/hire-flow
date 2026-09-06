'use client';

import RecruiterHeader from '@/components/recruiter-dashboard/dashbord/RecruiterHeader';
import RecruiterSidebar from '@/components/recruiter-dashboard/dashbord/RecruiterSidebar';
import { useState } from 'react';

export default function RecruiterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop Navigation Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col border-r border-slate-200/80 bg-white">
        <RecruiterSidebar />
      </aside>

      {/* Mobile Drawer Navigation */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white p-4 shadow-xl">
            <RecruiterSidebar onClose={() => setIsMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Page Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <RecruiterHeader onOpenMobile={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}