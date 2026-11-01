'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  Code2,
  Sparkles,
  Calendar,
  Layers,
  Award,
  Zap,
  ExternalLink,
  Target,
  Clock,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import { api } from '@/lib/api';

export default function CareerRoadmapPage() {
  const [data, setData] = useState<any>({
    target_role: 'Software Engineer',
    duration: '3 Months',
    current_level: 'Intermediate',
    progress_percentage: 68,
    phases: [
      {
        id: 1,
        title: 'Phase 1: Strengthen Fundamentals (2 Weeks)',
        duration: '2 Weeks',
        status: 'Completed',
        badge: 'Completed',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800',
        items: [
          { text: 'Revise DSA and problem solving (Arrays, HashMaps, Trees)', done: true },
          { text: 'Master core CS concepts (OS process scheduling, DBMS normalization, Networking protocols)', done: true },
          { text: 'Solve 30 top interview LeetCode problems in Python/Java', done: true }
        ],
        resources: ['Amrita CS Core Curriculum', 'NPTEL Java Elite Series']
      },
      {
        id: 2,
        title: 'Phase 2: Build Relevant Modern Skills (6 Weeks)',
        duration: '6 Weeks',
        status: 'In Progress',
        badge: 'In Progress',
        badgeColor: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
        items: [
          { text: 'Learn Next.js 14 App Router, Server Components, and SSR hydration', done: true },
          { text: 'Build asynchronous RESTful APIs with FastAPI & SQLAlchemy', done: true },
          { text: 'Master PostgreSQL query optimization and indexing strategies', done: false },
          { text: 'Implement Redis caching for high-throughput endpoint latency reduction', done: false }
        ],
        resources: ['FastAPI Official Docs', 'Next.js App Router Mastery', 'PostgreSQL Internals']
      },
      {
        id: 3,
        title: 'Phase 3: Build Real-World Production Projects (2 Weeks)',
        duration: '2 Weeks',
        status: 'Upcoming',
        badge: 'Upcoming',
        badgeColor: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        items: [
          { text: 'Build EventHub – Event Management Platform with token auth and booking workflows', done: true },
          { text: 'Develop Student Performance Prediction System with scikit-learn & pandas', done: true },
          { text: 'Containerize full stack with Docker Compose and set up GitHub Actions CI/CD', done: false }
        ],
        resources: ['Docker Compose Production Setup', 'GitHub Actions CI Guide']
      },
      {
        id: 4,
        title: 'Phase 4: Placement & Interview Readiness (2 Weeks)',
        duration: '2 Weeks',
        status: 'Upcoming',
        badge: 'Upcoming',
        badgeColor: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        items: [
          { text: 'Practice AI mock interviews for Technical, HR, and System Design questions', done: false },
          { text: 'Target campus drives (TCS, Infosys, Zoho) with tailored ATS single-page resumes', done: false },
          { text: 'Complete behavioral STAR storytelling for all project achievements', done: false }
        ],
        resources: ['CareerLens Mock Interview Studio', 'TCS / Zoho Placement Patterns']
      }
    ]
  });

  const toggleItem = (phaseIndex: number, itemIndex: number) => {
    setData((prev: any) => {
      const newPhases = [...prev.phases];
      const items = [...newPhases[phaseIndex].items];
      items[itemIndex] = { ...items[itemIndex], done: !items[itemIndex].done };
      newPhases[phaseIndex] = { ...newPhases[phaseIndex], items };

      // Calculate total progress
      const totalItems = newPhases.reduce((acc, p) => acc + p.items.length, 0);
      const doneItems = newPhases.reduce((acc, p) => acc + p.items.filter((i: any) => i.done).length, 0);
      const pct = Math.round((doneItems / totalItems) * 100);

      return { ...prev, phases: newPhases, progress_percentage: pct };
    });
  };

  return (
    <div className="flex-1 w-full bg-[#f8f9ff] dark:bg-[#090a16] text-slate-900 dark:text-white transition-colors">
      <Header
        title="Personalized Career Roadmap"
        subtitle="A step-by-step plan to bridge your skill gaps and reach your career goal."
        actionText="Launch Mock Interview"
        actionHref="/interview"
      />

      <div className="w-full px-6 lg:px-10 xl:px-14 py-8 space-y-8">
        {/* Header & Target Role Controls matching Screen 11 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span>Your Personalized Career Roadmap</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              A step-by-step plan to bridge your skill gaps and reach your target career goal.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Target Role:</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-extrabold text-purple-700 dark:text-purple-300 shadow-xs">
              {data.target_role}
            </span>
          </div>
        </div>

        {/* Progress Dial Banner matching Screen 11 */}
        <div className="bg-white/95 dark:bg-[#101227]/90 rounded-3xl border border-slate-200/90 dark:border-[#20234a] p-6 lg:p-8 shadow-sm backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-emerald-500 dark:text-emerald-400 transition-all duration-700"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 * (1 - (data.progress_percentage || 68) / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {data.progress_percentage || 68}%
                </span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-wider">
                  Progress
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Roadmap Completion Status
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md leading-relaxed">
                You are on track! Complete Phase 2 full-stack projects to reach interview readiness for TCS and product companies.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/interview"
              className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Phase Cards Timeline matching Screen 11 */}
        <div className="space-y-5">
          {data.phases?.map((phase: any, pIdx: number) => {
            const isCompleted = phase.status === 'Completed';
            const isInProgress = phase.status === 'In Progress';
            return (
              <div
                key={phase.id}
                className={`p-6 rounded-3xl border transition-all duration-300 backdrop-blur-xl ${
                  isInProgress
                    ? 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-400 dark:border-purple-800 shadow-md ring-1 ring-purple-500/20'
                    : isCompleted
                    ? 'bg-white/95 dark:bg-[#101227]/90 border-slate-200/90 dark:border-[#20234a] shadow-xs'
                    : 'bg-white/60 dark:bg-[#0c0d21]/60 border-slate-200/60 dark:border-[#1a1c3d]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400'
                          : isInProgress
                          ? 'bg-purple-600 text-white shadow-purple-600/30'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {pIdx + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {phase.title}
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Estimated Duration: {phase.duration}</span>
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${phase.badgeColor} self-start sm:self-auto`}>
                    {phase.status}
                  </span>
                </div>

                {/* Milestone Checklist items */}
                <div className="pt-4 space-y-2.5">
                  {phase.items?.map((item: any, iIdx: number) => {
                    const isDone = typeof item === 'object' ? item.done : isCompleted;
                    const text = typeof item === 'object' ? item.text : item;
                    return (
                      <div
                        key={iIdx}
                        onClick={() => toggleItem(pIdx, iIdx)}
                        className="flex items-center gap-3 text-xs p-2.5 rounded-xl hover:bg-slate-100/60 dark:hover:bg-[#161838]/60 cursor-pointer transition-colors"
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                        )}
                        <span className={isDone ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-slate-200 font-semibold'}>
                          {text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Recommended Resources strip */}
                {phase.resources && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recommended:</span>
                    {phase.resources.map((res: string) => (
                      <span key={res} className="text-[11px] px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 font-medium">
                        {res}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Skill Mastery & Verification Dock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-white/95 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-xs space-y-2">
            <Award className="w-6 h-6 text-amber-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">NPTEL Certified Track</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Java programming Elite + Gold credential verified for campus eligibility cutoffs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-xs space-y-2">
            <Code2 className="w-6 h-6 text-cyan-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Full-Stack Portfolio</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              EventHub &amp; Student Prediction projects ready for live demonstration to technical panels.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/95 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-xs space-y-2">
            <Zap className="w-6 h-6 text-emerald-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Day-1 IT Placement Match</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Resume tailored specifically for Software Engineer roles at TCS, Infosys, and Zoho.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
