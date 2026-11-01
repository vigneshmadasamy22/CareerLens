'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  FileText,
  Search,
  Mic,
  Compass,
  GraduationCap,
  Sun,
  Moon,
  ChevronRight,
  ShieldCheck,
  Zap,
  Award,
  Layers,
  BarChart3,
  Bot,
  Laptop,
  Check
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import HeroShowcase from '@/components/HeroShowcase';

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff] dark:bg-[#090a16] text-slate-900 dark:text-white transition-colors overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Decorative cosmic background glows matching Screen 1 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-purple-500/20 via-indigo-500/15 to-transparent dark:from-purple-600/30 dark:via-indigo-600/20 dark:to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-28 right-0 w-[550px] h-[550px] bg-cyan-400/20 dark:bg-cyan-500/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 left-0 w-[500px] h-[500px] bg-purple-600/15 dark:bg-purple-800/20 blur-3xl pointer-events-none -z-10" />

      {/* Top Navbar matching Screen 1 - True Full Width */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/85 dark:bg-[#090a16]/85 border-b border-slate-200/70 dark:border-[#1d2047]/70 w-full">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              Career<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-400">Lens</span>
            </span>
          </Link>

          {/* Center Navigation matching Screen 1 */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link href="/" className="text-purple-600 dark:text-purple-400">Home</Link>
            <Link href="#features" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Features</Link>
            <Link href="/templates" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Templates</Link>
            <Link href="/analyzer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Analyzer</Link>
            <Link href="/interview" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Interview</Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-[#181a38] transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
            </button>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - True Full-Screen Responsive Container that fits computer monitors */}
      <section className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-20 pt-8 pb-12 lg:py-14 min-h-[calc(100vh-80px)] flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center flex-1 my-auto">
          {/* Left Column matching Screen 1 exact phrasing */}
          <div className="lg:col-span-7 space-y-7 xl:pr-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800/80 text-purple-700 dark:text-purple-300 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>AI-Powered Career Platform</span>
            </div>

            {/* Headline matching Screen 1 exact title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white">
              Build the Perfect <br />
              Resume, Get ATS Insights <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 dark:from-purple-400 dark:via-indigo-300 dark:to-pink-400">
                &amp; Accelerate Your Career
              </span>
            </h1>

            {/* Subtitle matching Screen 1 */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
              Create professional resumes, analyze them with AI, match with job roles, practice interviews and manage your entire career journey — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/builder"
                className="px-7 py-4 rounded-xl bg-white/95 dark:bg-[#12142d]/90 hover:bg-slate-50 dark:hover:bg-[#1a1d3f] border border-slate-200 dark:border-[#272b5c] text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 shadow-xs backdrop-blur-md"
              >
                <Play className="w-4 h-4 text-purple-600 dark:text-purple-400 fill-purple-600 dark:fill-purple-400" />
                <span>Try Resume Builder</span>
              </Link>
            </div>

            {/* 4 Feature Capsules row directly under Hero matching Screen 1 (Job Tracker removed) */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5">
              {[
                { name: '20+ Resume Templates', icon: FileText, href: '/templates' },
                { name: 'AI Resume Analysis', icon: Search, href: '/analyzer' },
                { name: 'Mock Interviews', icon: Mic, href: '/interview' },
                { name: 'Career Roadmap', icon: Compass, href: '/roadmap' },
              ].map((pill) => (
                <Link
                  key={pill.name}
                  href={pill.href}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-[#12142d]/80 border border-slate-200/90 dark:border-[#272b5c] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-purple-400 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-300 transition-all shadow-xs backdrop-blur-md hover:scale-105"
                >
                  <pill.icon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>{pill.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Vector Isometric Showcase (Crystal-Clear 4K Vector Resolution) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroShowcase />
          </div>
        </div>

        {/* Bottom Feature Strip matching Screen 1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/70 dark:border-[#1d2047] w-full">
          {[
            { title: '20+ Resume Templates', desc: 'ATS-optimized professional layouts', icon: FileText, href: '/templates' },
            { title: 'AI-Powered Analysis', desc: 'Explainable match scores & insights', icon: Search, href: '/analyzer' },
            { title: 'Interview Preparation', desc: 'Mock interviews with AI feedback', icon: Mic, href: '/interview' },
            { title: 'Career Roadmap', desc: 'Step-by-step personalized skill plan', icon: Compass, href: '/roadmap' },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group p-5 rounded-2xl bg-white/70 dark:bg-[#101227]/70 hover:bg-white dark:hover:bg-[#161836] border border-slate-200/80 dark:border-[#20234a] hover:border-purple-300 dark:hover:border-purple-700/60 transition-all shadow-xs hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {feature.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Feature Showcase Grid Section - Full Width */}
      <section id="features" className="py-20 border-t border-slate-200/60 dark:border-[#1d2047]/60 bg-white/50 dark:bg-[#070814]/50 backdrop-blur-sm w-full">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Integrated Modules</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Everything You Need to Get Hired
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              A complete AI suite engineered to optimize every milestone of your career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0f1126] border border-slate-200/80 dark:border-[#20234a] shadow-sm hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Live AI Resume Studio
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Create beautiful, single-page ATS-ready resumes with 20 professional templates, live real-time canvas preview, and instant selectable PDF and DOCX export.
              </p>
              <Link href="/builder" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:gap-2.5 transition-all">
                <span>Launch Studio</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0f1126] border border-slate-200/80 dark:border-[#20234a] shadow-sm hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Deep ATS Scoring &amp; Analyzer
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Evaluate your resume against specific target roles (TCS, Infosys, Zoho), identify keyword gaps, and apply AI rewrites with one-click synchronization.
              </p>
              <Link href="/analyzer" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:gap-2.5 transition-all">
                <span>Analyze Resume</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#0f1126] border border-slate-200/80 dark:border-[#20234a] shadow-sm hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                AI Mock Interviewer
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Practice technical, HR, and project questions tailored to your resume with real-time AI answer analysis, scoring, and confidence feedback.
              </p>
              <Link href="/interview" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:gap-2.5 transition-all">
                <span>Start Practice</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Full Width */}
      <footer className="border-t border-slate-200/60 dark:border-[#1d2047]/60 py-10 bg-white dark:bg-[#080918] w-full">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              C
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-200">
              CareerLens Platform
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            © 2026 CareerLens. All rights reserved. Built for professional career acceleration.
          </p>

          <div className="flex items-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link href="/builder" className="hover:text-purple-600 dark:hover:text-purple-400">Builder</Link>
            <Link href="/analyzer" className="hover:text-purple-600 dark:hover:text-purple-400">Analyzer</Link>
            <Link href="/interview" className="hover:text-purple-600 dark:hover:text-purple-400">Interview</Link>
            <Link href="/dashboard" className="hover:text-purple-600 dark:hover:text-purple-400">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
