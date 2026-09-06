'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SidebarNav from '@/components/dashboard/SidebarNav';
import { BadgeProvider } from '@/context/BadgeContext';
import { LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50/50">
        {/* Desktop Permanent Sidebar */}
        <aside className="hidden md:flex w-64 shrink-0 flex-col justify-between border-r border-slate-200/80 bg-white p-4 h-full">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5243E0] text-white font-bold text-sm">
                H
              </div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">HireFlow</span>
            </div>
            <SidebarNav />
          </div>

          <div className="border-t border-slate-100 pt-4 px-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[#5243E0] font-bold text-xs">
                FM
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">Fatima Mousavi</p>
                <p className="text-[10px] text-slate-400 truncate">fatima@gmail.com</p>
              </div>
            </div>

            <button
              onClick={() => alert('Logged out successfully')}
              className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main View Area */}
        <div className="flex flex-1 flex-col h-full overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </BadgeProvider>
  );
}