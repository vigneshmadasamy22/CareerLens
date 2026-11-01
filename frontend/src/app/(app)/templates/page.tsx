'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  FileText,
  Terminal,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkle
} from 'lucide-react';
import Header from '@/components/Header';
import { api } from '@/lib/api';

const CATEGORIES = [
  { name: 'All', count: 20 },
  { name: 'Professional', count: 4 },
  { name: 'Modern', count: 4 },
  { name: 'Minimal', count: 3 },
  { name: 'Creative', count: 3 },
  { name: 'Developer', count: 3 },
  { name: 'Fresher', count: 3 },
];

const DEFAULT_TEMPLATES = [
  // 1. PROFESSIONAL (4)
  {
    id: 'professional-elite',
    name: 'Professional Elite',
    category: 'Professional',
    description: 'Executive single-column layout with colored section underline bars, serif headings, and structured corporate hierarchy.',
    is_ats_friendly: true,
    layout_type: 'executive-classic',
    accent: '#7c3aed'
  },
  {
    id: 'corporate-clean',
    name: 'Corporate Clean',
    category: 'Professional',
    description: 'Universally recognized classic resume format preferred by traditional enterprise HR and Fortune 100 ATS systems.',
    is_ats_friendly: true,
    layout_type: 'corporate-traditional',
    accent: '#1e293b'
  },
  {
    id: 'executive-crest',
    name: 'Executive Crest',
    category: 'Professional',
    description: 'Distinguished centered header with ornamental border accents, formal typography, and leadership focus.',
    is_ats_friendly: true,
    layout_type: 'centered-formal',
    accent: '#0f172a'
  },
  {
    id: 'classic-ivy',
    name: 'Classic Ivy',
    category: 'Professional',
    description: 'Traditional academic & executive standard with justified sections, roman numerals, and crisp hierarchy.',
    is_ats_friendly: true,
    layout_type: 'executive-classic',
    accent: '#1e3a8a'
  },

  // 2. MODERN (4)
  {
    id: 'modern-pro',
    name: 'Modern Pro',
    category: 'Modern',
    description: 'Two-column split layout with a prominent left sidebar for contact & skills, and spacious right canvas for achievements.',
    is_ats_friendly: true,
    layout_type: 'two-column-sidebar',
    accent: '#6366f1'
  },
  {
    id: 'neo-tech',
    name: 'Neo Tech',
    category: 'Modern',
    description: 'High-contrast geometric card layout with left-bordered project sections and modular skill matrix boxes.',
    is_ats_friendly: true,
    layout_type: 'card-modular',
    accent: '#0284c7'
  },
  {
    id: 'metro-flow',
    name: 'Metro Flow',
    category: 'Modern',
    description: 'Clean horizontal progress blocks with modern sans-serif typography, ideal for high-growth tech startups.',
    is_ats_friendly: true,
    layout_type: 'two-column-sidebar',
    accent: '#0d9488'
  },
  {
    id: 'aurora-bold',
    name: 'Aurora Bold',
    category: 'Modern',
    description: 'Vibrant gradient headers with clean data pills and modular achievement highlights.',
    is_ats_friendly: true,
    layout_type: 'card-modular',
    accent: '#9333ea'
  },

  // 3. MINIMAL (3)
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    category: 'Minimal',
    description: 'Pure typography and generous whitespace inspired by Swiss graphic design, optimal for high-speed algorithmic parsing.',
    is_ats_friendly: true,
    layout_type: 'minimal-swiss',
    accent: '#334155'
  },
  {
    id: 'pure-mono',
    name: 'Pure Mono',
    category: 'Minimal',
    description: 'Zero distractions, hyper-legible line spacing and clear section divisions for 100% ATS score consistency.',
    is_ats_friendly: true,
    layout_type: 'minimal-swiss',
    accent: '#18181b'
  },
  {
    id: 'swiss-grid',
    name: 'Swiss Grid',
    category: 'Minimal',
    description: 'Precision typographic grid layout with understated divider rules and structured data columns.',
    is_ats_friendly: true,
    layout_type: 'minimal-swiss',
    accent: '#475569'
  },

  // 4. CREATIVE (3)
  {
    id: 'creative-folio',
    name: 'Creative Folio',
    category: 'Creative',
    description: 'Bold banner header with vibrant accent chips, timeline milestone dots, and styled project cards.',
    is_ats_friendly: true,
    layout_type: 'creative-timeline',
    accent: '#ec4899'
  },
  {
    id: 'studio-impact',
    name: 'Studio Impact',
    category: 'Creative',
    description: 'Dynamic left accent border with colored role badges and standout technical milestone capsules.',
    is_ats_friendly: true,
    layout_type: 'creative-timeline',
    accent: '#f43f5e'
  },
  {
    id: 'canvas-story',
    name: 'Canvas Story',
    category: 'Creative',
    description: 'Narrative-driven career journey format showcasing major project launches and key impacts.',
    is_ats_friendly: true,
    layout_type: 'creative-timeline',
    accent: '#8b5cf6'
  },

  // 5. DEVELOPER / TECHNICAL (3)
  {
    id: 'developer-x',
    name: 'Developer X',
    category: 'Developer',
    description: 'Tech-first layout with monospace accents, terminal style badges, and prominent GitHub/project architecture highlights.',
    is_ats_friendly: true,
    layout_type: 'tech-modern',
    accent: '#10b981'
  },
  {
    id: 'dev-terminal',
    name: 'Dev Terminal',
    category: 'Developer',
    description: 'Developer console aesthetic featuring CLI command headings, code badges, and system-level contribution logs.',
    is_ats_friendly: true,
    layout_type: 'terminal-monospace',
    accent: '#06b6d4'
  },
  {
    id: 'kernel-stack',
    name: 'Kernel Stack',
    category: 'Developer',
    description: 'Engineered for DevOps and Cloud Architects, emphasizing CI/CD pipelines, Docker, Kubernetes, and API design.',
    is_ats_friendly: true,
    layout_type: 'tech-modern',
    accent: '#22c55e'
  },

  // 6. FRESHER / STUDENT (3)
  {
    id: 'fresher-clean',
    name: 'Fresher Clean',
    category: 'Fresher',
    description: 'Campus placement optimized format placing Education, CGPA, coursework, and academic hackathons before work history.',
    is_ats_friendly: true,
    layout_type: 'campus-academic',
    accent: '#8b5cf6'
  },
  {
    id: 'campus-prime',
    name: 'Campus Prime',
    category: 'Fresher',
    description: 'Tailored for university graduates highlighting coursework, engineering internships, and NPTEL certifications.',
    is_ats_friendly: true,
    layout_type: 'campus-academic',
    accent: '#6366f1'
  },
  {
    id: 'scholar-edge',
    name: 'Scholar Edge',
    category: 'Fresher',
    description: 'Academic excellence layout prioritizing thesis, project implementations, GPA, and competitive coding rank.',
    is_ats_friendly: true,
    layout_type: 'campus-academic',
    accent: '#3b82f6'
  }
];

export default function TemplatesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize with DEFAULT_TEMPLATES so templates are 100% visible immediately!
  const [templates, setTemplates] = useState<any[]>(DEFAULT_TEMPLATES);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const data = await api.getTemplates(activeCategory === 'All' ? undefined : activeCategory);
        if (data && Array.isArray(data) && data.length > 0) {
          setTemplates(data);
        } else {
          // Filter locally from DEFAULT_TEMPLATES
          if (activeCategory === 'All') {
            setTemplates(DEFAULT_TEMPLATES);
          } else {
            setTemplates(DEFAULT_TEMPLATES.filter((t) => t.category.toLowerCase() === activeCategory.toLowerCase()));
          }
        }
      } catch (err) {
        if (activeCategory === 'All') {
          setTemplates(DEFAULT_TEMPLATES);
        } else {
          setTemplates(DEFAULT_TEMPLATES.filter((t) => t.category.toLowerCase() === activeCategory.toLowerCase()));
        }
      }
    }
    fetchTemplates();
  }, [activeCategory]);

  const filtered = templates.filter((t) => {
    const matchesCategory =
      activeCategory === 'All' || t.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      <Header
        title="Resume Templates"
        subtitle="20 ATS-friendly, professionally designed templates across 6 distinct categories"
        actionText="Open Builder"
        actionHref="/builder"
      />

      <div className="w-full px-6 lg:px-10 xl:px-14 py-8 space-y-8">
        {/* Search & Header matching Screen 4 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Choose a Resume Template
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              20 unique, ATS-optimized layouts for engineering, campus placements &amp; corporate roles
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 20 templates..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Category Tabs matching Screen 4 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-[#20234a]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.name
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                  : 'bg-white dark:bg-[#12142e] text-slate-600 dark:text-slate-400 border border-slate-200/90 dark:border-[#20234a] hover:bg-slate-100 dark:hover:bg-[#181a38]'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Templates Grid matching Screen 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              onClick={() => router.push(`/builder?template=${t.id}`)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-[#101227] border border-slate-200/90 dark:border-[#20234a] hover:border-purple-500 dark:hover:border-purple-500 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Miniature Realistic Resume Canvas Card */}
              <div className="h-64 bg-slate-50 dark:bg-[#0c0d21] p-4 flex items-center justify-center relative overflow-hidden border-b border-slate-100 dark:border-[#1a1c3d] group-hover:bg-purple-50/20 dark:group-hover:bg-purple-950/20 transition-colors">
                {/* Simulated Paper with Unique Miniature Layout */}
                <div className="w-40 h-56 bg-white dark:bg-[#17193b] rounded shadow-md border border-slate-200/80 dark:border-[#282c5e] p-2 space-y-1 transform group-hover:scale-105 transition-transform duration-300 overflow-hidden text-[5px]">
                  {/* TWO-COLUMN SIDEBAR TEMPLATES (Modern Pro, Metro Flow) */}
                  {(t.id === 'modern-pro' || t.id === 'metro-flow') && (
                    <div className="grid grid-cols-12 h-full gap-1">
                      <div className="col-span-4 bg-purple-600 dark:bg-purple-800 text-white p-1 rounded-sm flex flex-col justify-between">
                        <div>
                          <p className="font-extrabold text-[6px]">VM</p>
                          <div className="h-0.5 bg-white/40 my-1" />
                          <div className="space-y-0.5">
                            <div className="h-0.5 bg-white/60 rounded w-full" />
                            <div className="h-0.5 bg-white/60 rounded w-3/4" />
                          </div>
                        </div>
                        <div className="space-y-0.5 pb-1">
                          <p className="text-[4px] font-bold">SKILLS</p>
                          <div className="h-0.5 bg-white/50 rounded w-full" />
                          <div className="h-0.5 bg-white/50 rounded w-2/3" />
                        </div>
                      </div>
                      <div className="col-span-8 p-0.5 space-y-1">
                        <p className="text-[6px] font-bold text-slate-800 dark:text-slate-200">Vignesh Madasamy</p>
                        <p className="text-[4.5px] text-purple-600">Software Engineer</p>
                        <div className="h-0.5 bg-slate-200 dark:bg-slate-700 w-full" />
                        <div className="space-y-0.5">
                          <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-full" />
                          <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                        </div>
                        <div className="h-0.5 bg-purple-200 dark:bg-purple-900 rounded w-1/2 mt-1" />
                        <div className="space-y-0.5">
                          <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                          <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded w-4/6" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EXECUTIVE CREST & CLASSIC IVY TEMPLATES */}
                  {(t.id === 'executive-crest' || t.id === 'classic-ivy') && (
                    <div className="h-full space-y-1">
                      <div className="bg-slate-900 text-white p-1 rounded-t text-center">
                        <p className="text-[6px] font-serif font-bold uppercase tracking-wider">Vignesh Madasamy</p>
                        <p className="text-[4px] text-amber-400">Executive Technical Lead</p>
                      </div>
                      <div className="p-1 space-y-1">
                        <div className="h-0.5 bg-amber-400 w-1/3 mx-auto" />
                        <div className="h-0.5 bg-slate-200 dark:bg-slate-700 w-full" />
                        <div className="h-0.5 bg-slate-200 dark:bg-slate-700 w-5/6" />
                        <div className="h-1 bg-slate-300 dark:bg-slate-700 rounded w-1/4 mt-1" />
                        <div className="h-0.5 bg-slate-200 dark:bg-slate-700 w-full" />
                        <div className="h-0.5 bg-slate-200 dark:bg-slate-700 w-4/6" />
                      </div>
                    </div>
                  )}

                  {/* DEV TERMINAL & KERNEL STACK */}
                  {(t.id === 'dev-terminal' || t.id === 'kernel-stack') && (
                    <div className="h-full bg-slate-900 text-slate-100 p-1.5 rounded font-mono space-y-1">
                      <div className="flex gap-0.5 pb-0.5 border-b border-slate-800">
                        <span className="w-1 h-1 rounded-full bg-rose-500" />
                        <span className="w-1 h-1 rounded-full bg-amber-500" />
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-emerald-400 text-[5px]">$ whoami</p>
                      <p className="text-white text-[6px] font-bold">vignesh.dev</p>
                      <p className="text-cyan-400 text-[4px]">&gt; fullstack_engineer</p>
                      <p className="text-emerald-400 text-[5px] mt-1">$ cat skills.json</p>
                      <p className="text-slate-400 text-[4px]">[React, FastAPI, Docker]</p>
                    </div>
                  )}

                  {/* CREATIVE FOLIO, STUDIO IMPACT, CANVAS STORY */}
                  {(t.id === 'creative-folio' || t.id === 'studio-impact' || t.id === 'canvas-story') && (
                    <div className="h-full border-l-2 border-purple-500 pl-1 space-y-1">
                      <p className="text-[6px] font-bold text-slate-900 dark:text-white">Vignesh Madasamy</p>
                      <span className="text-[4px] bg-purple-100 text-purple-700 px-1 py-0.2 rounded font-bold">{t.name}</span>
                      <div className="h-0.5 bg-slate-200 w-full my-0.5" />
                      <div className="p-1 rounded bg-slate-50 dark:bg-slate-800 space-y-0.5 border border-slate-200">
                        <div className="h-0.5 bg-purple-400 rounded w-1/2" />
                        <div className="h-0.5 bg-slate-300 rounded w-full" />
                      </div>
                    </div>
                  )}

                  {/* FRESHER CLEAN, CAMPUS PRIME, SCHOLAR EDGE */}
                  {(t.id === 'fresher-clean' || t.id === 'campus-prime' || t.id === 'scholar-edge') && (
                    <div className="h-full space-y-1">
                      <div className="text-center pb-0.5 border-b border-purple-300">
                        <p className="text-[6px] font-bold text-slate-900 dark:text-white">Vignesh Madasamy</p>
                        <p className="text-[4px] text-purple-600">Computer Science Graduate</p>
                      </div>
                      <div className="p-1 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 space-y-0.5">
                        <p className="text-[4.5px] font-bold text-purple-700">🎓 Education Priority</p>
                        <div className="flex justify-between text-[4px]">
                          <span>B.Tech CSE</span>
                          <span className="font-bold text-purple-600">8.8 CGPA</span>
                        </div>
                      </div>
                      <div className="space-y-0.5 pt-0.5">
                        <div className="h-0.5 bg-slate-200 rounded w-full" />
                        <div className="h-0.5 bg-slate-200 rounded w-3/4" />
                      </div>
                    </div>
                  )}

                  {/* ALL OTHER PROFESSIONAL / MODERN / MINIMAL / DEVELOPER TEMPLATES */}
                  {![
                    'modern-pro', 'metro-flow',
                    'executive-crest', 'classic-ivy',
                    'dev-terminal', 'kernel-stack',
                    'creative-folio', 'studio-impact', 'canvas-story',
                    'fresher-clean', 'campus-prime', 'scholar-edge'
                  ].includes(t.id) && (
                    <div className="space-y-1">
                      <div className="text-center pb-1 border-b border-slate-200 dark:border-slate-700">
                        <p className="text-[7px] font-bold text-slate-800 dark:text-slate-200">Vignesh Madasamy</p>
                        <p className="text-[5px] text-purple-600 dark:text-purple-400">{t.name}</p>
                      </div>
                      <div className="space-y-1 pt-0.5">
                        <div className="h-1 bg-purple-100 dark:bg-purple-900/60 rounded w-1/3" />
                        <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                        <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                        <div className="h-1 bg-purple-100 dark:bg-purple-900/60 rounded w-1/4 mt-1" />
                        <div className="flex gap-0.5 flex-wrap">
                          <span className="text-[4px] px-1 bg-slate-100 dark:bg-slate-800 rounded">Python</span>
                          <span className="text-[4px] px-1 bg-slate-100 dark:bg-slate-800 rounded">React</span>
                          <span className="text-[4px] px-1 bg-slate-100 dark:bg-slate-800 rounded">FastAPI</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover overlay button */}
                <div className="absolute inset-0 bg-purple-900/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] flex items-center justify-center transition-opacity">
                  <span className="px-3.5 py-1.5 rounded-lg bg-white text-purple-700 font-bold text-xs shadow-lg flex items-center gap-1.5">
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Footer matching Screen 4 */}
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{t.category}</p>
                </div>

                {t.is_ats_friendly && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/40">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>ATS Friendly</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
