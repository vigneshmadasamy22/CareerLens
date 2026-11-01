'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Search,
  Mic,
  Briefcase,
  Compass,
  LayoutTemplate,
  FolderClosed,
  Settings,
  Sparkles,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Resume Builder', href: '/builder', icon: FileText },
  { name: 'Resume Analyzer', href: '/analyzer', icon: Search },
  { name: 'Mock Interview', href: '/interview', icon: Mic },
  { name: 'Career Roadmap', href: '/roadmap', icon: Compass },
  { name: 'Templates', href: '/templates', icon: LayoutTemplate },
  { name: 'My Resumes', href: '/my-resumes', icon: FolderClosed },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-[#20234a] bg-white/95 dark:bg-[#0c0d21]/95 backdrop-blur-md flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 transition-colors">
      <div>
        {/* Logo matching screenshot */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-[#1a1c3d]">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              C
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Career<span className="text-purple-600 dark:text-purple-400">Lens</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 dark:border dark:border-purple-800/40 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-[#161838]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.name}</span>
                {item.name === 'Mock Interview' && (
                  <span className="ml-auto text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300 font-semibold px-1.5 py-0.5 rounded-md">
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User info and Theme Toggle footer */}
      <div className="p-3 border-t border-slate-100 dark:border-[#1a1c3d] bg-slate-50/50 dark:bg-[#090a18]/70">
        <div className="flex items-center justify-between px-2 py-1">
          <Link href="/settings" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-medium text-xs flex items-center justify-center shrink-0 shadow-inner">
              VM
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">Vignesh Madasamy</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">vignesh@example.com</p>
            </div>
          </Link>

          {/* Theme toggle switch */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#1c1f44] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
