'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  className?: string;
}

export default function HeroShowcase({ className = '' }: Props) {
  return (
    <div className={`relative w-full max-w-[560px] mx-auto select-none ${className}`}>
      {/* Outer Multi-color Cosmic Glows */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-600/30 dark:bg-purple-600/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-400/30 dark:bg-cyan-500/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main 3D Perspective Stage Container matching Screen 1 */}
      <div className="relative w-full min-h-[380px] sm:min-h-[420px] flex items-center justify-center p-4">
        
        {/* Glowing Orbital Cosmic Neon Rings (passing behind & around the cards) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
          {/* Orbital Ellipse 1 (Cyan Neon Ring) */}
          <div className="w-[115%] h-[68%] rounded-[100%] border-2 border-cyan-400/40 dark:border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.4)] transform -rotate-[22deg] scale-95" />
          {/* Orbital Ellipse 2 (Magenta / Purple Neon Ring) */}
          <div className="absolute w-[125%] h-[75%] rounded-[100%] border border-purple-500/40 dark:border-purple-400/60 shadow-[0_0_30px_rgba(192,132,252,0.4)] transform rotate-[18deg] scale-90" />
        </div>

        {/* 1. Tilted Main Resume Sheet (Back Layer) */}
        <div className="relative w-[78%] sm:w-[74%] rounded-3xl p-6 sm:p-7 shadow-2xl transition-all duration-500 transform -rotate-[3deg] hover:rotate-0 backdrop-blur-xl border bg-white/95 border-purple-200/90 shadow-[0_20px_50px_rgba(124,58,237,0.15)] text-slate-900 dark:bg-[#151736]/90 dark:border-purple-500/30 dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] dark:text-white">
          {/* Top Header of Resume Card */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-200/40 dark:border-purple-800/40">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-base tracking-wide bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Resume
              </span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </div>

          {/* Placeholder lines representing candidate resume content */}
          <div className="py-4 space-y-2.5">
            <div className="h-3 rounded-full w-2/5 bg-purple-100 dark:bg-purple-400/30" />
            <div className="h-2 rounded-full w-full bg-slate-100 dark:bg-slate-700/60" />
            <div className="h-2 rounded-full w-5/6 bg-slate-100 dark:bg-slate-700/60" />
            <div className="h-2 rounded-full w-4/6 bg-slate-100 dark:bg-slate-700/60" />

            <div className="pt-2 h-3 rounded-full w-1/3 bg-indigo-100 dark:bg-indigo-400/30" />
            <div className="h-2 rounded-full w-full bg-slate-100 dark:bg-slate-700/60" />
            <div className="h-2 rounded-full w-4/5 bg-slate-100 dark:bg-slate-700/60" />

            <div className="pt-2 h-3 rounded-full w-1/4 bg-cyan-100 dark:bg-cyan-400/30" />
            <div className="h-2 rounded-full w-3/4 bg-slate-100 dark:bg-slate-700/60" />
          </div>
        </div>

        {/* 2. Floating Circular ATS Score Gauge (matching 92/100 from Screen 1) */}
        <div className="absolute top-4 sm:top-6 right-2 sm:right-6 w-36 h-36 sm:w-40 sm:h-40 rounded-full p-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 transform hover:scale-105 bg-white/95 border-2 border-purple-300 shadow-[0_15px_35px_rgba(124,58,237,0.25)] dark:bg-[#10122e]/95 dark:border-purple-400/50 dark:shadow-[0_0_35px_rgba(168,85,247,0.45)]">
          {/* Conic Gradient Ring */}
          <div className="relative w-full h-full rounded-full flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-purple-100 dark:text-purple-950/80"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Neon Active Arc (92%) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#atsScoreGradient)"
                strokeWidth="7"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - 0.92)}
                strokeLinecap="round"
                fill="transparent"
              />
              <defs>
                <linearGradient id="atsScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Score Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="flex items-baseline">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  92
                </span>
                <span className="text-[11px] font-bold text-slate-400">/100</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                ATS Score
              </span>
            </div>
          </div>
        </div>

        {/* 3. Floating Front Glassmorphic Checklist Pill (matching Screen 1 bottom-right card) */}
        <div className="absolute bottom-2 sm:bottom-4 right-1 sm:right-4 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl border transition-all duration-300 transform hover:scale-[1.02] bg-white/95 border-purple-200/90 shadow-[0_15px_40px_rgba(124,58,237,0.18)] text-slate-800 dark:bg-[#121430]/95 dark:border-cyan-500/40 dark:shadow-[0_15px_40px_rgba(0,0,0,0.7)] dark:text-slate-100">
          <div className="space-y-2">
            {[
              'ATS Friendly Format',
              'Keyword Optimized',
              'Skill Matched',
              'Well Structured'
            ].map((label) => (
              <div key={label} className="flex items-center gap-2.5 text-xs font-bold">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-slate-800 dark:text-slate-200">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
