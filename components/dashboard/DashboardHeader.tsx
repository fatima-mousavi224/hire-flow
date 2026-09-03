'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, Bell, MessageSquare } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import SidebarNav from './SidebarNav';

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md md:px-8">
      {/* Mobile Hamburger Menu (Hidden on Desktop) */}
      <div className="flex items-center gap-3 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-white">
            <SheetHeader className="p-6 border-b border-slate-100 text-left">
              <SheetTitle className="flex items-center gap-2 text-lg font-black text-slate-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5243E0] text-white font-bold text-sm">
                  H
                </div>
                HireFlow
              </SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <SidebarNav onSelect={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <span className="font-extrabold text-slate-900 text-sm">HireFlow</span>
      </div>

      {/* Global Search Bar */}
      <div className="hidden sm:flex max-w-md flex-1 items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 px-3 py-2 text-xs text-slate-400">
        <Search className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          type="text"
          placeholder="Search jobs, companies..."
          className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 text-slate-500 hover:bg-slate-50">
          <Bell className="h-4 w-4" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 text-slate-500 hover:bg-slate-50">
          <MessageSquare className="h-4 w-4" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[#5243E0] font-bold text-xs">
          FM
        </div>
      </div>
    </header>
  );
}