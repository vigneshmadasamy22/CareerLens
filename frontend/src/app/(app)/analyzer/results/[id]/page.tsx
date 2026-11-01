'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Download,
  GitCompare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileText
} from 'lucide-react';
import Header from '@/components/Header';
import { api } from '@/lib/api';

export default function ATSAnalysisResultsPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params?.id || '1';

  const [data, setData] = useState<any>({
    job_title: 'Software Engineer',
    company: 'TCS',
    overall_score: 87,
    skills_score: 90,
    experience_score: 82,
    project_score: 88,
    keyword_score: 86,
    readability_score: 92,
    matched_keywords: [
      { name: 'Python', category: 'Language' },
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Full Stack' },
      { name: 'FastAPI', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Git', category: 'Tools' },
      { name: 'Docker', category: 'DevOps' },
      { name: 'REST API', category: 'Architecture' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Problem Solving', category: 'Soft Skill' },
      { name: 'SQL', category: 'Database' },
      { name: 'JavaScript', category: 'Language' },
      { name: 'Data Structures', category: 'Core CS' },
      { name: 'Collaboration', category: 'Soft Skill' }
    ],
    missing_keywords: [
      { name: 'Kubernetes', category: 'Cloud' },
      { name: 'CI/CD Pipelines', category: 'DevOps' },
      { name: 'Redis Caching', category: 'Storage' },
      { name: 'AWS Lambda', category: 'Cloud' },
      { name: 'Unit Testing (pytest)', category: 'QA' },
      { name: 'System Design', category: 'Architecture' }
    ],
    partial_keywords: [
      { name: 'Microservices', category: 'Architecture' },
      { name: 'Agile / Scrum', category: 'Process' },
      { name: 'Cloud Deployment', category: 'Cloud' },
      { name: 'API Documentation', category: 'Docs' }
    ],
    created_at: 'Nov 1, 2026'
  });

  const [activeKeywordTab, setActiveKeywordTab] = useState<'matched' | 'missing' | 'partial'>('matched');

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const res = await api.getAnalysis(analysisId as string);
        if (res) setData(res);
      } catch (err) {
        // Fallback demo data already set
      }
    }
    loadAnalysis();
  }, [analysisId]);

  return (
    <div>
      <Header
        title="ATS Analysis Report"
        subtitle={`Analysis for ${data.job_title} at ${data.company} • ${data.created_at || 'Nov 1, 2026'}`}
        actionText="Improve Resume"
        actionHref={`/analyzer/improve/${analysisId}`}
        actionIcon={<Sparkles className="w-4 h-4 mr-1.5" />}
      />

      <div className="w-full px-6 lg:px-10 xl:px-14 py-8 space-y-8">
        {/* Top Action Bar matching Screen 7 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              ATS Analysis Report
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Analysis for {data.job_title} at {data.company} • {data.created_at || 'Nov 1, 2026'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/builder"
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] hover:bg-slate-50 dark:hover:bg-[#1e214a] text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume Studio</span>
            </Link>

            <a
              href={`/api/analyzer/${analysisId}/download-report`}
              target="_blank"
              download
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </a>
          </div>
        </div>

        {/* 2-Column Score Grid matching Screen 7 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: 87/100 Circular ATS Match Score Gauge */}
          <div className="lg:col-span-5 bg-white/95 dark:bg-[#101227]/90 rounded-2xl border border-slate-200/90 dark:border-[#20234a] p-8 shadow-sm backdrop-blur-md flex flex-col items-center justify-center text-center">
            <div className="relative w-44 h-44 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-emerald-500 dark:text-emerald-400"
                  strokeWidth="8"
                  strokeDasharray={263.8}
                  strokeDashoffset={263.8 * (1 - (data.overall_score || 87) / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {data.overall_score || 87}
                  <span className="text-lg font-bold text-slate-400">/100</span>
                </span>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-0.5">
                  ATS Match Score
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 max-w-sm">
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Great Match! Your resume is well aligned with the job description.
              </p>
            </div>
          </div>

          {/* Right Card: Category-wise Scores Progress Bars matching Screen 7 */}
          <div className="lg:col-span-7 bg-white/95 dark:bg-[#101227]/90 rounded-2xl border border-slate-200/90 dark:border-[#20234a] p-6 shadow-sm backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Category Scores
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'Skills Match', val: data.skills_score || 90 },
                  { label: 'Experience Relevance', val: data.experience_score || 82 },
                  { label: 'Project Relevance', val: data.project_score || 88 },
                  { label: 'Keyword Coverage', val: data.keyword_score || 86 },
                  { label: 'Resume Readability', val: data.readability_score || 92 },
                ].map((cat) => (
                  <div key={cat.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{cat.label}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{cat.val}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-500"
                        style={{ width: `${cat.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jump to Improvement Assistant */}
            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Want to reach a 95+ score?
              </span>
              <Link
                href={`/analyzer/improve/${analysisId}`}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 hover:scale-105 transition-all"
              >
                <span>Improvement Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Keyword Analysis Pills matching Screen 7 */}
        <div className="bg-white/95 dark:bg-[#101227]/90 rounded-2xl border border-slate-200/90 dark:border-[#20234a] p-6 shadow-sm backdrop-blur-md space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveKeywordTab('matched')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeKeywordTab === 'matched'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161838]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Matched Keywords ({data.matched_keywords?.length || 14})</span>
            </button>

            <button
              onClick={() => setActiveKeywordTab('missing')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeKeywordTab === 'missing'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161838]'
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Missing Keywords ({data.missing_keywords?.length || 6})</span>
            </button>

            <button
              onClick={() => setActiveKeywordTab('partial')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeKeywordTab === 'partial'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161838]'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Partial Match ({data.partial_keywords?.length || 4})</span>
            </button>
          </div>

          {/* Keywords Tag Grid */}
          <div className="pt-2 flex flex-wrap gap-2">
            {(activeKeywordTab === 'matched'
              ? data.matched_keywords
              : activeKeywordTab === 'missing'
              ? data.missing_keywords
              : data.partial_keywords
            )?.map((kw: any) => (
              <div
                key={kw.name}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 ${
                  activeKeywordTab === 'matched'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40'
                    : activeKeywordTab === 'missing'
                    ? 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40'
                    : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40'
                }`}
              >
                <span>{kw.name}</span>
                {kw.category && (
                  <span className="text-[10px] opacity-70">({kw.category})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
