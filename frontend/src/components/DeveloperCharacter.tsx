'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { Sparkles, FileText, BarChart3, CheckCircle2 } from 'lucide-react';

interface Props {
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export default function DeveloperCharacter({ className = '', theme: forcedTheme = 'auto' }: Props) {
  const { theme: currentTheme } = useTheme();
  const effectiveTheme = forcedTheme === 'auto' ? currentTheme : forcedTheme;
  const isDark = effectiveTheme === 'dark';

  return (
    <div className={`relative w-full max-w-md mx-auto flex flex-col items-center justify-center select-none ${className}`}>
      {/* Dynamic ambient backdrop glow */}
      <div
        className={`absolute -inset-6 rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-tr from-purple-900/50 via-indigo-900/40 to-pink-900/30'
            : 'bg-gradient-to-tr from-purple-400/30 via-indigo-300/25 to-pink-300/20'
        }`}
      />

      {/* Main Glassmorphic Illustration Card matching Screen 2 */}
      <div
        className={`relative w-full rounded-3xl p-3 shadow-2xl border transition-all duration-300 hover:scale-[1.01] ${
          isDark
            ? 'bg-[#12142e]/90 border-purple-500/30 shadow-purple-950/50'
            : 'bg-white/90 border-purple-200/80 shadow-purple-200/50'
        }`}
      >
        {/* Exact Cropped 3D Illustration matching Screen 2 for Light and Dark */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
          <Image
            src={isDark ? '/images/login-character-dark.png' : '/images/login-character-light.png'}
            alt="CareerLens AI Developer Character"
            width={600}
            height={450}
            priority
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Floating Glassmorphic Pill Badges over image */}
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-md flex items-center gap-1.5 border ${
              isDark
                ? 'bg-purple-950/80 text-purple-200 border-purple-700/60'
                : 'bg-white/85 text-purple-800 border-purple-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>AI Career Studio</span>
          </div>

          <div
            className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-md flex items-center gap-1.5 border ${
              isDark
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                : 'bg-white/90 text-emerald-700 border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>ATS Optimized</span>
          </div>
        </div>

        {/* Caption below matching Screen 2 */}
        <div className="p-3 text-center">
          <p
            className={`text-xs font-bold ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            AI-Powered Career Intelligence
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Build ATS resumes, analyze job alignment &amp; prepare for interviews
          </p>
        </div>
      </div>
    </div>
  );
}
