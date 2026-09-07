'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  BarChart2,
  Building2,
  Settings,
  LogOut,
  X,
  ChevronDown,
} from 'lucide-react';

interface RecruiterSidebarProps {
  onClose?: () => void;
  unreadMessagesCount?: number;
}

export default function RecruiterSidebar({
  onClose,
  unreadMessagesCount = 5,
}: RecruiterSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/recruiter-dashboard', icon: LayoutDashboard },
    { label: 'Jobs', href: '/recruiter-jops', icon: Briefcase },
    { label: 'Applicants', href: '/applicants', icon: Users },
    {
      label: 'Messages',
      href: '/messages',
      icon: MessageSquare,
      badge: unreadMessagesCount,
    },
    { label: 'Analytics', href: '/analytics', icon: BarChart2 },
    { label: 'Company Profile', href: '/company-profile', icon: Building2 },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Logo Header */}
        <div className="flex items-center justify-between px-2">
          <Link href="/recruiter-dashboard" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#5243E0] text-white font-black text-sm">
              H
            </div>
            <span className="text-base font-black tracking-tight text-slate-900">
              HireFlow
            </span>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Account Selector */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
              S
            </div>
            <div className="truncate">
              <p className="truncate text-xs font-bold text-slate-900">Stripe</p>
              <p className="truncate text-[10px] text-slate-500">Recruiter account</p>
            </div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const hasBadge = typeof item.badge === 'number' && item.badge > 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-indigo-50/80 text-[#5243E0]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {hasBadge && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5243E0] text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info */}
      <div className="border-t border-slate-100 pt-4 space-y-3 px-1">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white font-bold text-xs">
            JO
          </div>
          <div className="truncate">
            <p className="truncate text-xs font-bold text-slate-900">James Okafor</p>
            <p className="truncate text-[10px] text-slate-500">Senior Recruiter</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors w-full px-1 cursor-pointer">
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </div>
  );
}