'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  GitCompare,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Users,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  Sliders,
  Award,
  Zap,
  Target,
  FileCheck
} from 'lucide-react';
import Header from '@/components/Header';

export default function ExploreFeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<'ab-testing' | 'truth-checker' | 'project-analyzer' | 'skill-gap' | 'recruiter-sim' | 'campus-mode'>('ab-testing');
  const [activeProject, setActiveProject] = useState('EventHub');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setAppliedNotification(msg);
    setTimeout(() => setAppliedNotification(null), 3500);
  };

  return (
    <div className="flex-1 w-full bg-[#f8f9ff] dark:bg-[#090a16] text-slate-900 dark:text-white transition-colors">
      <Header
        title="Explore Advanced AI Features"
        subtitle="Specialized evaluation tools for competitive tech recruitment."
        actionText="Back to Dashboard"
        actionHref="/dashboard"
      />

      <div className="w-full px-6 lg:px-10 xl:px-14 py-8 space-y-8">
        {/* Top Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span>Explore More Features</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Advanced career analytics, simulated hiring perspectives, and placement accelerators.
            </p>
          </div>

          {appliedNotification && (
            <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
              <Check className="w-4 h-4" />
              <span>{appliedNotification}</span>
            </div>
          )}
        </div>

        {/* 6 Feature Cards Grid matching Screen 13 of Dark Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Resume A/B Testing */}
          <div
            onClick={() => setSelectedFeature('ab-testing')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
              selectedFeature === 'ab-testing'
                ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30 shadow-lg'
                : 'bg-white/95 dark:bg-[#101227]/90 border-slate-200/90 dark:border-[#20234a] hover:border-purple-400 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GitCompare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Resume A/B Testing
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Compare two resumes against the same job description and find the better one.
            </p>
          </div>

          {/* 2. Truth Checker */}
          <div
            onClick={() => setSelectedFeature('truth-checker')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
              selectedFeature === 'truth-checker'
                ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/30 shadow-lg'
                : 'bg-white/95 dark:bg-[#101227]/90 border-slate-200/90 dark:border-[#20234a] hover:border-rose-400 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              Truth Checker
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Detect unsupported claims, buzzwords, or exaggerated metrics needing evidence.
            </p>
          </div>

          {/* 3. Project Analyzer */}
          <div
            onClick={() => setSelectedFeature('project-analyzer')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
              selectedFeature === 'project-analyzer'
                ? 'bg-cyan-50/80 dark:bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/30 shadow-lg'
                : 'bg-white/95 dark:bg-[#101227]/90 border-slate-200/90 dark:border-[#20234a] hover:border-cyan-400 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Project Analyzer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Evaluate project quality, engineering depth, impact, and relevancy to target roles.
            </p>
          </div>

          {/* 4. Skill Gap Analyzer */}
          <div
            onClick={() => setSelectedFeature('skill-gap')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
              selectedFeature === 'skill-gap'
                ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                : 'bg-white/95 dark:bg-[#101227]/90 border-slate-200/90 dark:border-[#20234a] hover:border-amber-400 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Skill Gap Analyzer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Identify missing skills required for your target role and get learning steps.
            </p>
          </div>

          {/* 5. Recruiter Perspective */}
          <div
            onClick={() => setSelectedFeature('recruiter-sim')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
              selectedFeature === 'recruiter-sim'
                ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg'
                : 'bg-white/95 dark:bg-[#101227]/90 border-slate-200/90 dark:border-[#20234a] hover:border-indigo-400 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Recruiter Perspective
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              See how recruiters, technical interviewers, and hiring managers view your profile.
            </p>
          </div>

          {/* 6. Campus Placement Mode */}
          <div
            onClick={() => setSelectedFeature('campus-mode')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
              selectedFeature === 'campus-mode'
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg'
                : 'bg-white/95 dark:bg-[#101227]/90 border-slate-200/90 dark:border-[#20234a] hover:border-emerald-400 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Campus Placement Mode
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Special tools for freshers, college seniors, and internship applicants.
            </p>
          </div>
        </div>

        {/* INTERACTIVE FEATURE WORKSPACE AREA (Replacing raw JSON with actual functional UI) */}
        <div className="p-6 lg:p-8 rounded-3xl bg-white/95 dark:bg-[#101227]/90 border border-slate-200 dark:border-[#20234a] shadow-xl backdrop-blur-xl space-y-6">
          {/* Header of Workspace */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                  {selectedFeature.replace('-', ' ')} Studio
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target Candidate: Vignesh Madasamy • Software Engineer at TCS
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                AI Engine Active
              </span>
            </div>
          </div>

          {/* 1. RESUME A/B TESTING MODULE */}
          {selectedFeature === 'ab-testing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Version A Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Version A (Base Resume)
                    </span>
                    <span className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
                      87/100 ATS
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    Vignesh_Developer_Resume (v1)
                  </h4>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full" style={{ width: '87%' }} />
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                    <li>Standard CS fundamentals and coursework</li>
                    <li>Python, Java, HTML, CSS, JavaScript listed</li>
                    <li>Missing cloud containerization keywords</li>
                  </ul>
                  <button
                    onClick={() => showNotification('Version A selected as primary draft.')}
                    className="w-full py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-[#161838] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    Select Version A
                  </button>
                </div>

                {/* Version B Card (Winner) */}
                <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border-2 border-purple-500 dark:border-purple-600 space-y-4 relative">
                  <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                    Recommended Winner (+5%)
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                      Version B (AI Tailored)
                    </span>
                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                      92/100 ATS
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-purple-900 dark:text-purple-200">
                    Vignesh_FullStack_Resume (v2)
                  </h4>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <ul className="text-xs text-purple-900 dark:text-purple-200 space-y-1.5 list-disc list-inside">
                    <li>Docker, CI/CD, Redis, PostgreSQL incorporated naturally</li>
                    <li>Quantified XYZ formula on EventHub project</li>
                    <li>Matches TCS Software Engineer requirement profile</li>
                  </ul>
                  <button
                    onClick={() => showNotification('Version B activated! Synced to Live Builder and Exporter.')}
                    className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/25 transition-all"
                  >
                    Activate Version B as Primary
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-[#0c0d21]/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">
                  <b>AI Comparison Insight:</b> Version B increases recruiter search visibility by <b>28%</b> for Full Stack &amp; Software Engineer roles.
                </span>
                <Link href="/builder" className="font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                  <span>Open in Builder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 2. TRUTH CHECKER MODULE */}
          {selectedFeature === 'truth-checker' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    88%
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      Overall Credibility Score: High Trust
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">
                      9 Verified statements, 1 statement flagged for quantitative clarification.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => showNotification('Truth Checker audit report generated!')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-xs hover:bg-emerald-500 transition-colors"
                >
                  Download Audit
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200">
                      VERIFIED FACT
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                      B.Tech in Computer Science and Engineering at Amrita Vishwa Vidyapeetham (CGPA: 8.8 / 10)
                    </p>
                    <p className="text-[11px] text-slate-500">Cross-verified with academic institution format and scoring standards.</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200">
                      VERIFIED FACT
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                      NPTEL Elite + Gold Certification (90% score) in Programming in Java
                    </p>
                    <p className="text-[11px] text-slate-500">Directly aligns with official NPTEL/IIT scoring criteria for top percentile achievement.</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 dark:bg-amber-900 px-2 py-0.5 rounded border border-amber-300">
                      NEEDS EVIDENCE METRIC
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                      &quot;Handled event scheduling with 99.9% uptime.&quot;
                    </p>
                    <p className="text-[11px] text-amber-800 dark:text-amber-300">
                      <b>Advice:</b> Mention hosting infrastructure (e.g. Docker containerized on AWS EC2 or Render with automated health checks) to justify the 99.9% uptime claim.
                    </p>
                  </div>
                  <button
                    onClick={() => showNotification('Claim updated with verified infrastructure metrics!')}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shrink-0"
                  >
                    Auto-Refine
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. PROJECT ANALYZER MODULE */}
          {selectedFeature === 'project-analyzer' && (
            <div className="space-y-5">
              <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                {['EventHub', 'Online Quiz Management', 'Student Performance'].map((proj) => (
                  <button
                    key={proj}
                    onClick={() => setActiveProject(proj)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeProject === proj
                        ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25'
                        : 'bg-slate-100 dark:bg-[#12142d] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {proj}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Engineering Depth</span>
                  <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1">94%</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">High algorithmic &amp; architectural rigor</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Action Verb Strength</span>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">96%</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Engineered, Architected, Optimized</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Measurable Impact</span>
                  <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">91%</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Quantified 40% latency reduction</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-300 dark:border-cyan-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-cyan-900 dark:text-cyan-200 uppercase tracking-wider">
                    Recommended XYZ Rewrite for {activeProject}
                  </h4>
                  <button
                    onClick={() => showNotification(`Project bullets for ${activeProject} enhanced in resume!`)}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-xs"
                  >
                    Apply to Resume
                  </button>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-white dark:bg-[#0c0d21] p-3 rounded-xl border border-cyan-200 dark:border-cyan-900">
                  &quot;Architected responsive event management platform using HTML, CSS, JavaScript and RESTful APIs; handled user registrations and event scheduling with 99.9% uptime. Optimized PostgreSQL database schemas and integrated secure token-based authentication, reducing transaction response latency by 40%.&quot;
                </p>
              </div>
            </div>
          )}

          {/* 4. SKILL GAP ANALYZER MODULE */}
          {selectedFeature === 'skill-gap' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Target Role Skill Alignment
                  </h4>
                  <p className="text-xs text-slate-500">
                    Candidate demonstrated 12 / 16 high-frequency keywords for {targetRole}.
                  </p>
                </div>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <option value="Software Engineer">Software Engineer (TCS / Infosys)</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Backend Developer">Backend Python/FastAPI Developer</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Demonstrated Skills (12 Matched)
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'Java', 'C', 'Data Structures & Algorithms', 'OOP', 'DBMS', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'].map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-semibold">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2.5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    High-Value Skill Gaps (4 Missing)
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {['Docker', 'CI/CD Pipelines', 'Redis Caching', 'PostgreSQL Optimization'].map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-semibold">
                        + {s}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => showNotification('Missing skills added to Personalized Career Roadmap!')}
                    className="mt-2 w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Add Gaps to Career Roadmap
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. RECRUITER PERSPECTIVE MODULE */}
          {selectedFeature === 'recruiter-sim' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Tech Lead */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Tech Lead / Architect</span>
                    <span className="text-sm font-extrabold text-purple-600">90%</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Technical Depth Verdict
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    &quot;Strong command of core CS fundamentals (OOP, DBMS, DSA) backed by NPTEL Gold in Java. EventHub and ML training show hands-on implementation capabilities.&quot;
                  </p>
                </div>

                {/* HR Recruiter */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">HR Talent Partner</span>
                    <span className="text-sm font-extrabold text-emerald-600">95%</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Screening &amp; ATS Score
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    &quot;Clean, single-page A4 format with prominent contact details, GitHub, and LinkedIn. 8.8 CGPA at Amrita ensures immediate eligibility for campus placement drives.&quot;
                  </p>
                </div>

                {/* Hiring Manager */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Engineering Manager</span>
                    <span className="text-sm font-extrabold text-indigo-600">88%</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Hiring Decision
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    &quot;Fast track candidate to technical interview. Recommend testing asynchronous backend patterns and database transaction isolation.&quot;
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 flex items-center justify-between text-xs">
                <span className="text-purple-900 dark:text-purple-300">
                  Ready to test your responses with the AI Mock Interviewer?
                </span>
                <Link href="/interview" className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors shadow-xs">
                  Launch Mock Interview
                </Link>
              </div>
            </div>
          )}

          {/* 6. CAMPUS PLACEMENT MODE MODULE */}
          {selectedFeature === 'campus-mode' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/40 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Campus Placement Readiness Index
                  </span>
                  <h4 className="text-2xl font-black text-white">94% — Placement Ready</h4>
                  <p className="text-xs text-purple-200">
                    Optimized for Day-1 IT Services (TCS, Infosys, Cognizant, Wipro) &amp; Product firms (Zoho, Freshworks).
                  </p>
                </div>
                <button
                  onClick={() => showNotification('Campus Placement Kit exported!')}
                  className="px-5 py-2.5 rounded-xl bg-white text-purple-900 font-extrabold text-xs hover:bg-slate-100 transition-all shadow-md"
                >
                  Download Placement Kit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] space-y-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Academic Standing</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">CGPA 8.8 / 10 is in the top 10% bracket, passing all company eligibility cutoffs.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] space-y-2">
                  <FileCheck className="w-5 h-5 text-emerald-500" />
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Single Page A4 Strict ATS</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Formatted cleanly for on-campus recruiters with 0 page spillover.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c0d21] border border-slate-200 dark:border-[#20234a] space-y-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">NPTEL Credential</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Elite + Gold percentile certification showcased as key technical proof.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
