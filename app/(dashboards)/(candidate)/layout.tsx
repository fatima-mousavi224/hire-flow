import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SidebarNav from '@/components/dashboard/SidebarNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        {/* Desktop Permanent Sidebar (Hidden on Mobile) */}
        <aside className="hidden md:flex w-64 shrink-0 flex-col justify-between border-r border-slate-200/80 bg-white p-4">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5243E0] text-white font-bold text-sm">
                H
              </div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">HireFlow</span>
            </div>
            <SidebarNav />
          </div>

          {/* User Profile Summary */}
          <div className="flex items-center gap-3 border-t border-slate-100 pt-4 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[#5243E0] font-bold text-xs">
              FM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Fatima Mousavi</p>
              <p className="text-[10px] text-slate-400 truncate">fatima@gmail.com</p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}