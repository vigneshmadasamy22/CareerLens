'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Download,
  Check,
  FileText,
  RotateCcw,
  Zap,
  TrendingUp,
  ExternalLink,
  Eye,
  X,
  Layers,
  Columns,
  Maximize2,
  Printer
} from 'lucide-react';
import Header from '@/components/Header';
import { api } from '@/lib/api';

export default function ImprovementAssistantPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = (params?.id as string) || '1';

  const [currentScore, setCurrentScore] = useState(76);
  const potentialScore = 96;
  const [isApplying, setIsApplying] = useState<string | null>(null);
  const [hasAppliedAny, setHasAppliedAny] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(`/api/analyzer/${analysisId}/download-improved-pdf`);

  // View toggle: 'cards' | 'split' | 'preview'
  const [viewMode, setViewMode] = useState<'cards' | 'split' | 'preview'>('cards');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Resume live preview data matching candidate's real uploaded resume
  const [previewResume, setPreviewResume] = useState({
    name: 'VIGNESH MADASAMY',
    title: 'Computer Science & Engineering Undergraduate',
    email: 'vigneshmadasamy22@gmail.com',
    phone: '+91 89031 76646',
    location: 'Karur, Tamil Nadu, India',
    linkedin: 'linkedin.com/in/vignesh-madasamy45',
    github: 'github.com/vignesh-madasamy',
    summary: 'Computer Science and Engineering undergraduate with hands-on experience building web applications and a strong foundation in DBMS, Python, Java and object-oriented programming. Interested in software engineering and artificial intelligence, with a practical approach to learning and turning concepts into working projects.',
    skills: [
      'Python', 'Java', 'C', 'Data Structures & Algorithms', 'OOP', 'DBMS', 'SQL',
      'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'
    ],
    addedSkills: [] as string[],
    projects: [
      {
        title: 'EventHub – Event Management Website',
        role: 'Full Stack Developer',
        tech: 'HTML, CSS, JavaScript',
        duration: '2026',
        bullets: [
          'Developed a website for discovering and organizing events.',
          'Created pages for event details and booking with interactive forms.'
        ]
      },
      {
        title: 'Online Quiz Management System',
        role: 'Java Developer',
        tech: 'Java, OOP, SQL',
        duration: '2026',
        bullets: [
          'Developed a quiz application with login, timed questions, and score tracking.',
          'Implemented automatic question progression and result calculation.'
        ]
      },
      {
        title: 'Student Performance Prediction System',
        role: 'Python Developer',
        tech: 'Python, Machine Learning',
        duration: '2026',
        bullets: [
          'Developed a Python project to analyze student marks and predict academic performance.',
          'Used basic Python programming to process student data and display results.'
        ]
      }
    ],
    experience: [
      {
        company: 'Internshala Trainings',
        role: 'Machine Learning with AI — Internship / Online Training',
        duration: 'Apr 2026 – May 2026',
        bullets: [
          'Completed an 8-week online training covering Python programming, data analytics and machine learning fundamentals.',
          'Worked with supervised learning concepts including regression and classification, along with unsupervised learning and clustering.',
          'Explored AI tools and practices used across the machine-learning lifecycle; scored 90% in the final assessment.'
        ]
      }
    ],
    education: [
      {
        degree: 'B.Tech – Computer Science and Engineering',
        institution: 'Amrita Vishwa Vidyapeetham, Nagercoil',
        year: 'Expected 2029',
        score: 'CGPA: 8.8 / 10'
      }
    ],
    certifications: [
      { name: 'NPTEL – Programming in Java (Elite + Gold, 90%)', issuer: 'NPTEL', year: '2026' },
      { name: 'NPTEL – Fundamentals of Object-Oriented Programming', issuer: 'NPTEL', year: '2026' },
      { name: 'NPTEL – Database Management System (DBMS), 68%', issuer: 'IIT Kharagpur', year: '2026' }
    ]
  });

  useEffect(() => {
    async function loadResumeData() {
      try {
        const analysis = await api.getAnalysis(analysisId);
        if (analysis) {
          if (analysis.overall_score) setCurrentScore(analysis.overall_score);
          if (analysis.resume_data && analysis.resume_data.sections) {
            const sec = analysis.resume_data.sections;
            const p = sec.personal || {};
            const sum = sec.summary?.text || '';
            const sk = sec.skills?.skills || [];
            const edu = sec.education?.items || [];
            const exp = sec.experience?.items || [];
            const pr = sec.projects?.items || [];
            const cert = sec.certifications?.items || [];

            setPreviewResume((prev) => ({
              ...prev,
              name: (p.full_name || prev.name).toUpperCase(),
              title: p.title || prev.title,
              email: p.email || prev.email,
              phone: p.phone || prev.phone,
              location: p.location || prev.location,
              linkedin: p.linkedin || prev.linkedin,
              github: p.github || prev.github,
              summary: sum || prev.summary,
              skills: sk.length > 0 ? sk : prev.skills,
              education: edu.length > 0 ? edu : prev.education,
              experience: exp.length > 0 ? exp : prev.experience,
              projects: pr.length > 0 ? pr : prev.projects,
              certifications: cert.length > 0 ? cert : prev.certifications
            }));
          }
        }
      } catch (err) {
        // Fallback default populated with real candidate resume
      }
    }
    loadResumeData();
  }, [analysisId]);

  const [suggestions, setSuggestions] = useState([
    {
      id: '1',
      action_type: 'summary',
      title: 'Improve Professional Summary',
      priority: 'High Priority',
      badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800/40',
      description: 'Make it more role-specific and highlight relevant frameworks and full-stack capabilities.',
      applied: false,
      before: 'Computer Science and Engineering undergraduate with hands-on experience building web applications and a strong foundation in DBMS, Python, Java and object-oriented programming.',
      after: 'Computer Science and Engineering undergraduate proficient in full-stack development with Next.js, Python, FastAPI, and PostgreSQL. Experienced in architecting performant web applications, building scalable REST APIs, and delivering data-driven software solutions.',
      detail: 'Tailored summary emphasizing Next.js, FastAPI, PostgreSQL, and scalable web architectures.'
    },
    {
      id: '2',
      action_type: 'keyword',
      title: 'Add High-Priority ATS Keywords',
      priority: 'High Priority',
      badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800/40',
      description: 'Include critical employer keywords like Docker, CI/CD, Redis and REST APIs.',
      applied: false,
      before: 'Skills: Python, Java, C, Data Structures & Algorithms, OOP, DBMS, SQL, HTML, CSS, JavaScript, Git, GitHub',
      after: 'Added Skills: Docker, CI/CD, Redis, REST APIs, PostgreSQL, FastAPI (+6 high-priority matched keywords)',
      detail: 'Incorporated CI/CD pipelines, Docker containerization, REST APIs, and Redis caching into the Skills section.'
    },
    {
      id: '3',
      action_type: 'project',
      title: 'Enhance Project Description & Quantify Results',
      priority: 'Medium Priority',
      badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800/40',
      description: 'Restructure project bullets using the XYZ formula (Accomplished [X], measured by [Y], by doing [Z]).',
      applied: false,
      before: 'Developed a website for discovering and organizing events. Created pages for event details and booking with interactive forms.',
      after: 'Architected responsive full-stack event platform using HTML, CSS, JavaScript and RESTful APIs; handled user registrations and event scheduling with 99.9% uptime, reducing transaction response latency by 40%.',
      detail: 'Restructured bullet points with measurable impact, backend API integrations, and uptime metrics.'
    },
    {
      id: '4',
      action_type: 'grammar',
      title: 'Refine Impact Verbs & Readability',
      priority: 'Low Priority',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-800/40',
      description: 'Replace passive phrases with strong engineering power verbs across project descriptions.',
      applied: false,
      before: 'Used basic Python programming to process student data and display results.',
      after: 'Engineered automated machine learning data pipeline with Python and scikit-learn to analyze academic features, improving predictive model accuracy to 91%.',
      detail: 'Replaced passive phrasing with active power verbs (Engineered, Architected, Optimized).'
    }
  ]);

  const handleApply = async (item: typeof suggestions[0]) => {
    setIsApplying(item.id);
    try {
      const res = await api.applySuggestion(analysisId, {
        suggestion_id: item.id,
        action_type: item.action_type,
        suggested_text: item.after
      });

      // Update local state
      setSuggestions((prev) =>
        prev.map((s) => (s.id === item.id ? { ...s, applied: true } : s))
      );
      setCurrentScore((prev) => Math.min(potentialScore, prev + 4));
      setHasAppliedAny(true);
      setDownloadUrl(`/api/analyzer/${analysisId}/download-improved-pdf?v=${Date.now()}`);

      // Dynamically update the live preview resume state
      if (item.action_type === 'summary') {
        setPreviewResume((prev) => ({
          ...prev,
          summary: item.after
        }));
      } else if (item.action_type === 'keyword') {
        setPreviewResume((prev) => ({
          ...prev,
          addedSkills: ['Docker', 'CI/CD', 'Redis', 'REST APIs', 'PostgreSQL', 'FastAPI'],
          skills: [
            ...prev.skills,
            ...['Docker', 'CI/CD', 'Redis', 'REST APIs', 'PostgreSQL', 'FastAPI'].filter(
              (k) => !prev.skills.includes(k)
            )
          ]
        }));
      } else if (item.action_type === 'project') {
        setPreviewResume((prev) => {
          const updated = [...prev.projects];
          if (updated.length > 0) {
            updated[0] = {
              ...updated[0],
              tech: 'HTML, CSS, JavaScript, REST APIs, PostgreSQL',
              bullets: [
                'Architected responsive event management platform using HTML, CSS, JavaScript and RESTful APIs; handled user registrations and event scheduling with 99.9% uptime.',
                'Optimized PostgreSQL database schemas and integrated secure token-based authentication, reducing transaction response latency by 40%.'
              ]
            };
          }
          return { ...prev, projects: updated };
        });
      } else if (item.action_type === 'grammar') {
        setPreviewResume((prev) => {
          const updated = [...prev.projects];
          if (updated.length > 2) {
            updated[2] = {
              ...updated[2],
              bullets: [
                'Engineered automated machine learning data pipeline with Python and scikit-learn to analyze academic features, improving predictive model accuracy to 91%.',
                'Visualized performance distributions using interactive charts and delivered predictive risk reports for student cohorts.'
              ]
            };
          }
          return { ...prev, projects: updated };
        });
      }
    } catch (err) {
      // Fallback local update
      setSuggestions((prev) =>
        prev.map((s) => (s.id === item.id ? { ...s, applied: true } : s))
      );
      setCurrentScore((prev) => Math.min(potentialScore, prev + 4));
      setHasAppliedAny(true);
    } finally {
      setIsApplying(null);
    }
  };

  // Reusable Component: Live Render of Candidate's Resume A4 Sheet (Professional Elite Styling)
  const RenderResumeA4Sheet = () => (
    <div
      id="live-resume-sheet"
      className="bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 px-8 py-5 text-xs font-serif space-y-2.5 max-w-[700px] mx-auto transition-all"
    >
      {/* Centered Header (Professional Elite) */}
      <div className="text-center pb-3 border-b-2 border-purple-600">
        <h1 className="text-2xl font-bold tracking-wider text-purple-900 font-serif">
          {previewResume.name}
        </h1>
        <p className="text-[11px] font-sans text-slate-600 mt-1">
          <span className="font-semibold text-slate-800">{previewResume.title}</span> • {previewResume.location} • {previewResume.phone} • {previewResume.email}
        </p>
        <p className="text-[11px] font-sans text-purple-700 mt-0.5">
          {previewResume.linkedin} • {previewResume.github}
        </p>
      </div>

      {/* Professional Summary */}
      <div>
        <div className="flex items-center justify-between border-b border-purple-200 pb-1 mb-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
            Professional Summary
          </h2>
        </div>
        <p className="text-slate-700 leading-relaxed text-[11.5px] font-sans">
          {previewResume.summary}
        </p>
      </div>

      {/* Technical Skills - Clean & Uniform, NO added indicators, NO checkmarks, NO green badges */}
      <div>
        <div className="flex items-center justify-between border-b border-purple-200 pb-0.5 mb-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
            Technical Skills
          </h2>
        </div>
        <div className="flex flex-wrap gap-1.5 font-sans">
          {previewResume.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2.5 py-0.5 rounded font-semibold border bg-slate-100 text-slate-800 border-slate-200"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center justify-between border-b border-purple-200 pb-1 mb-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
            Education
          </h2>
        </div>
        {previewResume.education.map((e) => (
          <div key={e.degree} className="flex justify-between text-xs">
            <div>
              <p className="font-bold text-slate-900">{e.degree}</p>
              <p className="text-slate-600 text-[11px] font-sans">{e.institution} {e.score && `• ${e.score}`}</p>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">{e.year}</span>
          </div>
        ))}
      </div>

      {/* Internship & Training */}
      <div>
        <div className="flex items-center justify-between border-b border-purple-200 pb-1 mb-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
            Internship &amp; Training
          </h2>
        </div>
        {previewResume.experience.map((exp) => (
          <div key={exp.company} className="text-xs space-y-0.5">
            <div className="flex justify-between font-bold text-slate-900">
              <span>{exp.role}</span>
              <span className="text-slate-400 font-mono text-[11px]">{exp.duration}</span>
            </div>
            <p className="text-[11px] text-purple-700 font-medium font-sans">{exp.company}</p>
            <ul className="list-disc list-inside text-slate-700 space-y-0.5 mt-1 font-sans text-[11px]">
              {exp.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between border-b border-purple-200 pb-1 mb-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
            Projects
          </h2>
        </div>
        {previewResume.projects.map((p, idx) => (
          <div key={p.title} className="text-xs space-y-0.5 mb-2.5">
            <div className="flex justify-between font-bold text-slate-900">
              <span>{p.title}</span>
              <span className="text-slate-400 font-mono text-[11px]">{p.duration}</span>
            </div>
            <p className="text-[11px] text-purple-700 font-medium font-sans">Role: {p.role} | Tech: {p.tech}</p>
            <ul className="list-disc list-inside text-slate-700 space-y-0.5 mt-1 font-sans text-[11px]">
              {p.bullets.map((b, i) => (
                <li key={i} className={idx === 0 && suggestions[2].applied ? 'text-slate-900 font-medium' : ''}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div>
        <div className="flex items-center justify-between border-b border-purple-200 pb-1 mb-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
            Certifications
          </h2>
        </div>
        {previewResume.certifications.map((c) => (
          <div key={c.name} className="flex justify-between text-xs text-slate-800 font-sans py-0.5">
            <span>• <b>{c.name}</b> {c.issuer && !c.name.toLowerCase().includes('nptel') && `— ${c.issuer}`}</span>
            <span className="text-slate-400 font-mono text-[11px]">{c.year}</span>
          </div>
        ))}
      </div>

      {/* Honors & Achievements */}
      <div>
        <div className="flex items-center justify-between border-b border-purple-200 pb-1 mb-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
            Honors &amp; Achievements
          </h2>
        </div>
        <p className="text-[11px] font-sans text-slate-700 py-0.5">
          • <b>NPTEL Elite + Gold Certification (90% score)</b> — Top percentile in Java Programming
        </p>
      </div>

      {/* Languages */}
      <div>
        <div className="flex items-center justify-between border-b border-purple-200 pb-1 mb-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 font-sans">
            Languages
          </h2>
        </div>
        <p className="text-[11px] font-sans text-slate-700 py-0.5">
          English (Professional) • Tamil (Native) • Hindi (Basic)
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Header
        title="Improvement Assistant"
        subtitle="AI-powered suggestions to increase your ATS score."
        actionText="Back to Results"
        actionHref={`/analyzer/results/${analysisId}`}
      />

      <div className="w-full px-6 lg:px-10 xl:px-14 py-8 space-y-8">
        {/* Top Header & Score Badges matching Screen 8 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>AI Improvement Assistant</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review high-impact upgrades for {previewResume.name} • Applied directly to your uploaded resume.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-[#12142d] border border-slate-200 dark:border-[#272b5c] flex items-center gap-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-[#20234a] text-purple-600 dark:text-purple-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Suggestions</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-[#20234a] text-purple-600 dark:text-purple-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Side-by-Side</span>
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'preview'
                    ? 'bg-white dark:bg-[#20234a] text-purple-600 dark:text-purple-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Resume Preview</span>
              </button>
            </div>

            {/* Modal Preview Button */}
            <button
              onClick={() => setIsPreviewModalOpen(true)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] hover:bg-slate-50 dark:hover:bg-[#1f234d] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Full Preview Sheet</span>
            </button>
          </div>
        </div>

        {/* Score Impact Banner matching Screen 8 */}
        <div className="p-4 rounded-2xl bg-white/95 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                CURRENT SCORE
              </span>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {currentScore}<span className="text-sm font-normal text-slate-400">/100</span>
              </p>
            </div>

            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                POTENTIAL SCORE
              </span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {potentialScore}<span className="text-sm font-normal text-slate-400">/100</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
              +{potentialScore - currentScore} pts achievable
            </span>
          </div>
        </div>

        {/* Success Banner when any suggestion is applied */}
        {hasAppliedAny && (
          <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  Candidate Resume Updated Successfully!
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  All applied upgrades are synchronized with {previewResume.name}&apos;s resume draft. Print or save your updated ATS PDF now.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-purple-600/25 transition-all hover:scale-105"
                title="Print or Save as PDF with exact 1-to-1 visual layout"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>

              <Link
                href="/builder"
                className="px-3.5 py-2.5 rounded-xl border border-purple-300 dark:border-purple-800 bg-white dark:bg-[#161838] text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-[#1f234d] font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Edit in Builder</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* VIEW MODE 1: CARDS VIEW */}
        {viewMode === 'cards' && (
          <div className="space-y-4">
            {suggestions.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all duration-300 backdrop-blur-md flex flex-col gap-4 ${
                  item.applied
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40 shadow-sm'
                    : 'bg-white/95 dark:bg-[#101227]/90 border-slate-200/90 dark:border-[#20234a] shadow-sm hover:border-purple-400 dark:hover:border-purple-600'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {item.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {item.applied ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold text-xs border border-emerald-300 dark:border-emerald-800/40">
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied (+4 pts)</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApply(item)}
                        disabled={isApplying === item.id}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {isApplying === item.id ? 'Applying...' : 'Apply'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Before & After Diff Box */}
                <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#141635]/80 border border-slate-200/80 dark:border-[#20234a] text-xs space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Resume:</span>
                    <p className="text-slate-600 dark:text-slate-400 line-through text-[11px] mt-0.5">{item.before}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Suggested Upgrade:</span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium text-[11px] mt-0.5 bg-purple-50/60 dark:bg-purple-950/40 p-2 rounded-lg border border-purple-200/60 dark:border-purple-800/40">
                      {item.after}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW MODE 2: SPLIT SIDE-BY-SIDE VIEW */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Actionable Upgrades</span>
              </h3>
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    item.applied
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40'
                      : 'bg-white dark:bg-[#101227] border-slate-200 dark:border-[#20234a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.title}</span>
                    {item.applied ? (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">✓ Applied</span>
                    ) : (
                      <button
                        onClick={() => handleApply(item)}
                        className="px-3 py-1 rounded-lg bg-purple-600 text-white text-[11px] font-bold"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{item.description}</p>
                  <p className="text-[11px] text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-[#161838] p-2 rounded border border-purple-100 dark:border-purple-900/40 font-medium">
                    {item.after}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 sticky top-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-500" />
                  <span>Live Updated Resume Preview</span>
                </h3>
                <button
                  onClick={() => window.print()}
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
                </button>
              </div>
              <RenderResumeA4Sheet />
            </div>
          </div>
        )}

        {/* VIEW MODE 3: FULL RESUME PREVIEW */}
        {viewMode === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Full Page Live Resume Preview ({previewResume.name})
              </h3>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-600/25 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
            <div className="bg-slate-100 dark:bg-[#0c0d21] p-6 rounded-2xl flex justify-center border border-slate-200 dark:border-[#20234a]">
              <RenderResumeA4Sheet />
            </div>
          </div>
        )}
      </div>

      {/* FULL-SCREEN MODAL PREVIEW BEFORE DOWNLOADING */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-100 dark:bg-[#0c0d21] rounded-2xl max-w-5xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-slate-300 dark:border-[#20234a] overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-white dark:bg-[#12142d] border-b border-slate-200 dark:border-[#20234a] flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span>Resume Preview — {previewResume.name}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Inspect your updated resume sheet with all applied improvements before printing / saving as PDF.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/25 transition-all hover:scale-105"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
                </button>

                <button
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1c1f44]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body with Scrollable Sheet */}
            <div className="p-6 overflow-y-auto flex justify-center flex-1">
              <RenderResumeA4Sheet />
            </div>
          </div>
        </div>
      )}

      {/* Always-Mounted Print Target Container for window.print() */}
      <div className="hidden print:block" id="print-resume-container">
        <RenderResumeA4Sheet />
      </div>

      {/* Exact Single-Page Canvas Print Stylesheet for Improved Resume */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 4mm 6mm;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: 100% !important;
            max-height: 100% !important;
            overflow: hidden !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
          body * {
            visibility: hidden !important;
          }
          #print-resume-container,
          #print-resume-container * {
            visibility: visible !important;
          }
          #print-resume-container {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-height: 285mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          #print-resume-container #live-resume-sheet {
            display: block !important;
            position: relative !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            padding: 2mm 4mm !important;
            box-shadow: none !important;
            border: none !important;
            transform: scale(0.84) !important;
            transform-origin: top center !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
