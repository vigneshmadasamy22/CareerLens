'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Plus, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  actionIcon?: React.ReactNode;
}

export default function Header({
  title,
  subtitle,
  actionText = 'Create New Resume',
  actionHref = '/builder',
  actionIcon = <Plus className="w-4 h-4 mr-1.5" />
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-[#20234a] bg-white/80 dark:bg-[#0c0d21]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div>
        {title && (
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              {title}
            </h1>
            {subtitle && (
              <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400">
                — {subtitle}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161838] transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161838] relative transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
        </button>

        {/* Primary CTA */}
        {actionText && (
          <Link
            href={actionHref}
            className="flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {actionIcon}
            <span>{actionText}</span>
          </Link>
        )}

        {/* User avatar */}
        <Link href="/settings" className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-medium text-xs flex items-center justify-center ring-2 ring-purple-100 dark:ring-purple-900/30">
          VM
        </Link>
      </div>
    </header>
  );
}
