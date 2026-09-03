'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  Bookmark, 
  MessageSquare, 
  Bell, 
  User, 
  FileText, 
  Settings 
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Applications', href: '/applications', icon: Briefcase },
  { label: 'Saved Jobs', href: '/saved-jobs', icon: Bookmark },
  { label: 'Messages', href: '/messages', icon: MessageSquare, badge: 3 },
  { label: 'Notifications', href: '/notifications', icon: Bell, badge: 2 },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Resume', href: '/resume', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export default function SidebarNav({ onSelect }: { onSelect?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 px-2">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onSelect}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-colors ${
              isActive
                ? 'bg-indigo-50/80 text-[#5243E0]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`h-4 w-4 ${isActive ? 'text-[#5243E0]' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5243E0] text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}