'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  TrendingUp,
  Briefcase,
  Mic,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  Calendar,
  Building2,
  ChevronRight,
  Eye,
  Award
} from 'lucide-react';
import Header from '@/components/Header';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const [data, setData] = useState<any>({
    user_name: 'Vignesh',
    resumes_created: 6,
    analyses_done: 14,
    best_ats_score: 87,
    interview_bank_count: 40,
    career_progress: {
      percentage: 82,
      checklist: [
        { title: 'Build a strong resume', completed: true },
        { title: 'Analyze & improve ATS match', completed: true },
        { title: 'Practice AI mock interviews', completed: true },
        { title: 'Prepare for campus placement', completed: true }
      ]
    },
    recent_activity: [
      { id: 1, title: 'Resume analyzed', description: 'Software Engineer at TCS', badge: '87%', time_ago: '2h ago' },
      { id: 2, title: 'Resume updated', description: 'Saved changes to Developer X', badge: 'Updated', time_ago: '5h ago' },
      { id: 3, title: 'Mock interview completed', description: 'Technical & System Design', badge: '9/10', time_ago: '1d ago' },
      { id: 4, title: 'Interview prep updated', description: 'Answered FastAPI Async questions', badge: 'Active', time_ago: '2d ago' }
    ],
    upcoming_interviews: [
      { id: 1, company: 'Tata Consultancy Services (TCS)', role: 'Software Engineer', date: 'Nov 5, 2026', time: '10:30 AM', status: 'Scheduled', type: 'Technical' },
      { id: 2, company: 'Infosys Limited', role: 'Full Stack Developer', date: 'Nov 8, 2026', time: '02:00 PM', status: 'Assessment', type: 'Coding Round' },
      { id: 3, company: 'Zoho Corporation', role: 'Backend Engineer', date: 'Nov 12, 2026', time: '11:00 AM', status: 'Review', type: 'System Design' }
    ],
    recent_drafts: [
      { id: 1, title: 'Vignesh Madasamy – Primary Resume', template: 'Professional Elite', score: 87, updated: 'Today' },
      { id: 2, title: 'Developer X – Tech Resume', template: 'Developer X', score: 92, updated: 'Yesterday' }
    ]
  });

  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await api.getDashboardSummary();
        if (res) {
          setData((prev: any) => ({ ...prev, ...res }));
        }
      } catch (err) {
        // Default data in state
      }
    }
    loadSummary();
  }, []);

  return (
    <div className="min-h-full flex flex-col justify-between">
      <Header
        title="Dashboard 👋"
        subtitle="Here's your career progress at a glance."
        actionText="Create New Resume"
        actionHref="/builder"
      />

      <div className="w-full px-6 lg:px-10 py-6 space-y-6 flex-1">
        {/* 4 Stat KPI Cards matching Screen 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Resumes Created */}
          <div className="p-6 rounded-2xl bg-white/90 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md flex items-center justify-between hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
            <div>
              <p className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">{data.resumes_created}</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Resumes Created</p>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* 2. Analyses Done */}
          <div className="p-6 rounded-2xl bg-white/90 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
            <div>
              <p className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">{data.analyses_done}</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Analyses Done</p>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
              <Search className="w-6 h-6" />
            </div>
          </div>

          {/* 3. Best ATS Score */}
          <div className="p-6 rounded-2xl bg-white/90 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md flex items-center justify-between hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl lg:text-4xl font-black text-emerald-600 dark:text-emerald-400">{data.best_ats_score}%</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Best ATS Score</p>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* 4. Interview Prep Bank */}
          <div className="p-6 rounded-2xl bg-white/90 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md flex items-center justify-between hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors">
            <div>
              <p className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">{data.interview_bank_count || 40}</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Mock Questions Ready</p>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
              <Mic className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Main Grid: Career Progress & Recent Activity matching Screen 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Career Progress Card (Left 5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white/90 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Career Progress</span>
                </h3>
                <Link href="/roadmap" className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-bold">
                  View Roadmap &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Circular Dial Gauge 78% */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-36 h-36 flex items-center justify-center">
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
                        className="text-emerald-500"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - (data.career_progress?.percentage || 78) / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center text-center">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        {data.career_progress?.percentage || 78}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Overall Progress</span>
                    </div>
                  </div>
                </div>

                {/* Milestone Checklist */}
                <div className="sm:col-span-7 space-y-3">
                  {data.career_progress?.checklist?.map((item: any) => (
                    <div key={item.title} className="flex items-center gap-2.5 text-xs">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                      )}
                      <span className={item.completed ? 'font-medium text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span>Next Recommended Action:</span>
              <Link href="/interview" className="font-bold text-purple-600 dark:text-purple-400 hover:underline">
                Take AI Mock Interview &rarr;
              </Link>
            </div>
          </div>

          {/* Recent Activity Card (Right 7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white/90 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Recent Activity</span>
                </h3>
                <span className="text-[11px] text-slate-400">Latest updates</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {data.recent_activity?.map((act: any) => (
                  <div key={act.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{act.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{act.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {act.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                          {act.badge}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-mono">
                        {act.time_ago}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span>View full activity logs &amp; audits in settings</span>
              <Link href="/analyzer" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Analyze Another Resume &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid matching Screen 3 */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-cyan-900/10 dark:from-purple-950/30 dark:via-indigo-950/30 dark:to-cyan-950/30 border border-purple-200/80 dark:border-purple-800/40">
          <h3 className="font-bold text-xs uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/builder"
              className="p-4 rounded-xl bg-white dark:bg-[#131533] border border-slate-200 dark:border-[#22254e] hover:border-purple-400 dark:hover:border-purple-500 transition-all flex items-center gap-3 group shadow-sm hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Create New Resume
                </p>
                <p className="text-[10px] text-slate-400">10 unique ATS templates</p>
              </div>
            </Link>

            <Link
              href="/analyzer"
              className="p-4 rounded-xl bg-white dark:bg-[#131533] border border-slate-200 dark:border-[#22254e] hover:border-purple-400 dark:hover:border-purple-500 transition-all flex items-center gap-3 group shadow-sm hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Analyze Existing Resume
                </p>
                <p className="text-[10px] text-slate-400">Upload PDF / DOCX scan</p>
              </div>
            </Link>

            <Link
              href="/analyzer"
              className="p-4 rounded-xl bg-white dark:bg-[#131533] border border-slate-200 dark:border-[#22254e] hover:border-purple-400 dark:hover:border-purple-500 transition-all flex items-center gap-3 group shadow-sm hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  Match With Job
                </p>
                <p className="text-[10px] text-slate-400">Check keyword alignment</p>
              </div>
            </Link>

            <Link
              href="/interview"
              className="p-4 rounded-xl bg-white dark:bg-[#131533] border border-slate-200 dark:border-[#22254e] hover:border-purple-400 dark:hover:border-purple-500 transition-all flex items-center gap-3 group shadow-sm hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  Prepare for Interview
                </p>
                <p className="text-[10px] text-slate-400">38+ real mock questions</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Section: Upcoming Interviews & Active Job Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
          {/* Upcoming Interviews (Left 7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white/90 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Upcoming Interviews &amp; Assessments</span>
              </h3>
              <Link href="/jobs" className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline">
                View Tracker &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {data.upcoming_interviews?.map((iv: any) => (
                <div key={iv.id} className="p-3.5 rounded-xl border border-slate-200/80 dark:border-[#20234a] bg-slate-50/50 dark:bg-[#141635]/50 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{iv.company}</p>
                    <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">{iv.role} • {iv.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">{iv.date}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-semibold">
                      {iv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Resume Drafts (Right 5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white/90 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span>Saved Resume Drafts</span>
                </h3>
                <Link href="/builder" className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline">
                  Open Studio &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {data.recent_drafts?.map((d: any) => (
                  <div key={d.id} className="p-3.5 rounded-xl border border-slate-200/80 dark:border-[#20234a] bg-slate-50/50 dark:bg-[#141635]/50 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{d.title}</p>
                      <p className="text-[10px] text-slate-400">Template: {d.template}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/40">
                        {d.score}% ATS
                      </span>
                      <Link
                        href={`/builder?template=${d.template.toLowerCase().replace(/\s+/g, '-')}`}
                        className="p-1 rounded-lg bg-white dark:bg-[#1c1f48] text-slate-600 dark:text-slate-300 hover:text-purple-600"
                        title="Edit in Builder"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500">20+ Templates available</span>
              <Link href="/templates" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                Explore Template Gallery &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
