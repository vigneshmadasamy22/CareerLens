'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  User,
  Sparkles,
  Undo2,
  Redo2,
  Eye,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  Palette,
  Type,
  Maximize2,
  Sliders,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  Briefcase,
  GraduationCap,
  Award,
  BadgeCheck,
  Terminal,
  Columns,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Globe,
  Layers,
  X,
  BookOpen,
  Printer
} from 'lucide-react';
import Header from '@/components/Header';
import { api } from '@/lib/api';

const TEMPLATES = [
  { id: 'developer-x', name: 'Developer X', style: 'tech-modern' },
  { id: 'professional-elite', name: 'Professional Elite', style: 'executive-classic' },
  { id: 'modern-pro', name: 'Modern Pro', style: 'two-column-sidebar' },
  { id: 'minimal-clean', name: 'Minimal Clean', style: 'minimal-swiss' },
  { id: 'creative-folio', name: 'Creative Folio', style: 'creative-timeline' },
  { id: 'fresher-clean', name: 'Fresher Clean', style: 'campus-academic' },
  { id: 'corporate-clean', name: 'Corporate Clean', style: 'corporate-traditional' },
  { id: 'neo-tech', name: 'Neo Tech', style: 'card-modular' },
  { id: 'executive-crest', name: 'Executive Crest', style: 'centered-formal' },
  { id: 'dev-terminal', name: 'Dev Terminal', style: 'terminal-monospace' },
  { id: 'classic-ivy', name: 'Classic Ivy', style: 'executive-classic' },
  { id: 'metro-flow', name: 'Metro Flow', style: 'two-column-sidebar' },
  { id: 'aurora-bold', name: 'Aurora Bold', style: 'card-modular' },
  { id: 'pure-mono', name: 'Pure Mono', style: 'minimal-swiss' },
  { id: 'swiss-grid', name: 'Swiss Grid', style: 'minimal-swiss' },
  { id: 'studio-impact', name: 'Studio Impact', style: 'creative-timeline' },
  { id: 'canvas-story', name: 'Canvas Story', style: 'creative-timeline' },
  { id: 'kernel-stack', name: 'Kernel Stack', style: 'tech-modern' },
  { id: 'campus-prime', name: 'Campus Prime', style: 'campus-academic' },
  { id: 'scholar-edge', name: 'Scholar Edge', style: 'campus-academic' },
];

function ResumeBuilderContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template');

  // Customization studio state
  const [template, setTemplate] = useState(templateParam || 'professional-elite');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [accentColor, setAccentColor] = useState('#7c3aed');
  const [fontSize, setFontSize] = useState('A');
  const [zoom, setZoom] = useState(95);
  const [saveStatus, setSaveStatus] = useState('Auto Saved');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Active section editor in middle column
  const [activeSection, setActiveSection] = useState('personal');

  // Add Section Modal state
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [customSectionInput, setCustomSectionInput] = useState('');

  // Sections navigation list state
  const [sectionsList, setSectionsList] = useState([
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Palette },
    { id: 'projects', label: 'Projects', icon: Maximize2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: BadgeCheck },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'languages', label: 'Languages', icon: Globe },
  ]);

  // Section Data States matching candidate's real resume
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Vignesh Madasamy',
    title: 'Computer Science & Engineering Undergraduate',
    email: 'vigneshmadasamy22@gmail.com',
    phone: '+91 89031 76646',
    location: 'Karur, Tamil Nadu, India',
    linkedin: 'linkedin.com/in/vignesh-madasamy45',
    github: 'github.com/vignesh-madasamy',
    website: 'vignesh.dev'
  });

  const [summary, setSummary] = useState(
    'Computer Science and Engineering undergraduate with hands-on experience building web applications and a strong foundation in DBMS, Python, Java and object-oriented programming. Interested in software engineering and artificial intelligence, with a practical approach to learning and turning concepts into working projects.'
  );

  const [skills, setSkills] = useState([
    'Python', 'Java', 'C', 'Data Structures & Algorithms', 'OOP', 'DBMS', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'
  ]);
  const [newSkill, setNewSkill] = useState('');

  const [education, setEducation] = useState([
    {
      id: 1,
      degree: 'B.Tech – Computer Science and Engineering',
      institution: 'Amrita Vishwa Vidyapeetham, Nagercoil',
      year: 'Expected 2029',
      score: 'CGPA: 8.8 / 10',
      coursework: 'Data Structures, Algorithms, OOP, DBMS, Python, Java'
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
      title: 'Student Performance Prediction System',
      role: 'Python Developer',
      tech: 'Python, Machine Learning',
      duration: '2026',
      bullets: [
        'Developed a Python project to analyze student marks and predict academic performance.',
        'Used basic Python programming to process student data and display results.'
      ]
    }
  ]);

  const [experience, setExperience] = useState([
    {
      id: 1,
      company: 'Internshala Trainings',
      role: 'Machine Learning with AI — Internship / Online Training',
      duration: 'Apr 2026 – May 2026',
      location: 'Online',
      bullets: [
        'Completed an 8-week online training covering Python programming, data analytics and machine learning fundamentals.',
        'Worked with supervised learning concepts including regression and classification, along with unsupervised learning and clustering.',
        'Explored AI tools and practices used across the machine-learning lifecycle; scored 90% in the final assessment.'
      ]
    }
  ]);

  const [certifications, setCertifications] = useState([
    { id: 1, name: 'NPTEL – Programming in Java (Elite + Gold, 90%)', issuer: 'NPTEL', year: '2026' },
    { id: 2, name: 'NPTEL – Fundamentals of Object-Oriented Programming', issuer: 'NPTEL', year: '2026' },
    { id: 3, name: 'NPTEL – Database Management System (DBMS), 68%', issuer: 'IIT Kharagpur', year: '2026' }
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'NPTEL Elite + Gold Certification (90% score)', desc: 'Top percentile in Java Programming' }
  ]);

  const [languages, setLanguages] = useState([
    'English (Professional)', 'Tamil (Native)', 'Hindi (Basic)'
  ]);

  const [customSections, setCustomSections] = useState<any[]>([]);

  // AI Summary Generator
  const handleGenerateSummary = async () => {
    setIsGeneratingAI(true);
    setSaveStatus('Generating with AI...');
    try {
      const res = await api.generateSummary({
        role: personalInfo.title || 'Software Engineer',
        skills: skills,
        experience_level: 'Fresher'
      });
      if (res.summary) {
        setSummary(res.summary);
      }
    } catch (err) {
      setSummary(
        'Results-driven Computer Science graduate with hands-on expertise in Next.js, FastAPI, and PostgreSQL. Experienced in developing full-stack web applications, architecting RESTful APIs, and implementing secure database models.'
      );
    } finally {
      setIsGeneratingAI(false);
      setSaveStatus('Auto Saved');
    }
  };

  const handleImproveBullet = async (projIdx: number, bulletIdx: number) => {
    setSaveStatus('Improving bullet...');
    try {
      const raw = projects[projIdx].bullets[bulletIdx];
      const res = await api.improveBullet({ role: personalInfo.title, raw_bullet: raw });
      const updated = [...projects];
      updated[projIdx].bullets[bulletIdx] = res.improved_bullet;
      setProjects(updated);
    } catch (err) {
      const updated = [...projects];
      updated[projIdx].bullets[bulletIdx] = 'Architected and engineered ' + projects[projIdx].bullets[bulletIdx] + '; optimized throughput by 35%.';
      setProjects(updated);
    } finally {
      setSaveStatus('Auto Saved');
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Add Section Handler
  const handleAddSectionPreset = (secId: string, secLabel: string, secIcon: any) => {
    if (!sectionsList.find((s) => s.id === secId)) {
      setSectionsList([...sectionsList, { id: secId, label: secLabel, icon: secIcon }]);
    }
    setActiveSection(secId);
    setIsAddSectionOpen(false);
  };

  const handleAddCustomSection = () => {
    if (!customSectionInput.trim()) return;
    const cleanId = 'custom-' + customSectionInput.trim().toLowerCase().replace(/\s+/g, '-');
    const newSec = {
      id: cleanId,
      title: customSectionInput.trim(),
      items: ['Add your details or achievements here.']
    };
    setCustomSections([...customSections, newSec]);
    setSectionsList([
      ...sectionsList,
      { id: cleanId, label: customSectionInput.trim(), icon: Layers }
    ]);
    setActiveSection(cleanId);
    setCustomSectionInput('');
    setIsAddSectionOpen(false);
  };

  const handleDownloadPdf = async () => {
    try {
      setSaveStatus('Exporting PDF...');
      const payload = {
        title: personalInfo.fullName ? `${personalInfo.fullName.replace(/\s+/g, '_')}_Resume` : 'My_Resume',
        template_id: template,
        accent_color: accentColor,
        target_role: personalInfo.title,
        sections: [
          { section_type: 'personal', title: 'Personal Info', content_json: JSON.stringify(personalInfo) },
          { section_type: 'summary', title: 'Professional Summary', content_json: JSON.stringify({ text: summary }) },
          { section_type: 'skills', title: 'Technical Skills', content_json: JSON.stringify({ skills }) },
          { section_type: 'education', title: 'Education', content_json: JSON.stringify({ items: education }) },
          { section_type: 'experience', title: 'Internship & Training', content_json: JSON.stringify({ items: experience }) },
          { section_type: 'projects', title: 'Projects', content_json: JSON.stringify({ items: projects }) },
          { section_type: 'certifications', title: 'Certifications', content_json: JSON.stringify({ items: certifications }) },
          { section_type: 'achievements', title: 'Achievements', content_json: JSON.stringify({ items: achievements }) },
          { section_type: 'languages', title: 'Languages', content_json: JSON.stringify({ items: languages }) }
        ]
      };

      const res = await fetch('/api/resumes/export-custom-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        window.open('/api/resumes/1/export/pdf', '_blank');
      }
    } catch (e) {
      window.open('/api/resumes/1/export/pdf', '_blank');
    } finally {
      setSaveStatus('Auto Saved');
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-[#090a16] text-slate-900 dark:text-white transition-colors">
      {/* Top Customization & Action Bar matching UI Screen 5 */}
      <div className="border-b border-slate-200 dark:border-[#20234a] bg-white dark:bg-[#0c0d21] px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Build Your Resume</span>
          </h2>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
            <CheckCircle2 className="w-3 h-3" />
            <span>{saveStatus}</span>
          </span>
        </div>

        {/* Studio Controls Header */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Template picker */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-500">Template:</span>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="text-xs font-semibold py-1 px-2.5 rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-slate-900 dark:text-white shadow-xs focus:ring-1 focus:ring-purple-500"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Font selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-500">Font:</span>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="text-xs font-semibold py-1 px-2 rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-slate-900 dark:text-white shadow-xs"
            >
              <option value="Inter">Inter (Sans)</option>
              <option value="Roboto">Roboto</option>
              <option value="Poppins">Poppins</option>
              <option value="Merriweather">Merriweather (Serif)</option>
              <option value="JetBrains Mono">JetBrains Mono</option>
            </select>
          </div>

          {/* Accent Color picker */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-500">Color:</span>
            <div className="flex items-center gap-1">
              {[
                { name: 'Purple', hex: '#7c3aed' },
                { name: 'Blue', hex: '#2563eb' },
                { name: 'Cyan', hex: '#0891b2' },
                { name: 'Emerald', hex: '#059669' },
                { name: 'Rose', hex: '#e11d48' },
                { name: 'Dark Slate', hex: '#0f172a' },
              ].map((col) => (
                <button
                  key={col.name}
                  onClick={() => setAccentColor(col.hex)}
                  title={col.name}
                  className={`w-5 h-5 rounded-full border-2 transition-transform ${
                    accentColor === col.hex ? 'scale-110 border-white shadow-md ring-2 ring-purple-400' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: col.hex }}
                />
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-1">
            {['A-', 'A', 'A+'].map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`px-2 py-0.5 text-xs font-bold rounded ${
                  fontSize === sz
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={() => setZoom(Math.max(60, zoom - 10))}
              className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-slate-500 font-mono w-10 text-center font-bold">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(130, zoom + 10))}
              className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download & Exact Print Buttons */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={handleDownloadPdf}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all"
              title="Download ATS-optimized PDF rendered with selected template styling"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold text-xs flex items-center gap-1.5 hover:bg-purple-100 dark:hover:bg-purple-900/40 shadow-sm transition-all"
              title="Print or Save as PDF with exact 1-to-1 visual on-screen layout"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Exact Print / Save</span>
            </button>
            <a
              href="/api/resumes/1/export/docx"
              target="_blank"
              download
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1f234d]"
            >
              DOCX
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Column Studio Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Sections Sidebar (Left) */}
        <div className="w-56 xl:w-60 border-r border-slate-200 dark:border-[#20234a] bg-white dark:bg-[#0c0d21] p-3 space-y-1.5 overflow-y-auto shrink-0 flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 py-1">
              SECTIONS
            </p>
            {sectionsList.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161838]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
                  <span className="truncate">{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* WORKING ADD SECTION BUTTON */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <button
              onClick={() => setIsAddSectionOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-dashed border-purple-300 dark:border-purple-800 text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:border-purple-500 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Section</span>
            </button>
          </div>
        </div>

        {/* Column 2: Complete Active Section Form Editor (Middle) */}
        <div className="w-[480px] xl:w-[520px] border-r border-slate-200 dark:border-[#20234a] bg-white dark:bg-[#101227] p-6 overflow-y-auto shrink-0 space-y-5">
          {/* 1. PERSONAL INFO */}
          {activeSection === 'personal' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Personal &amp; Contact Details</h3>
                <p className="text-[11px] text-slate-400">Your header contact information displayed at the top.</p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Professional Title</label>
                <input
                  type="text"
                  value={personalInfo.title}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={personalInfo.linkedin}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub</label>
                  <input
                    type="text"
                    value={personalInfo.github}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. PROFESSIONAL SUMMARY */}
          {activeSection === 'summary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Professional Summary</h3>
                  <p className="text-[11px] text-slate-400">Concise 3-4 sentence narrative highlighting your value.</p>
                </div>
                <button
                  onClick={handleGenerateSummary}
                  disabled={isGeneratingAI}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-[11px] flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGeneratingAI ? 'Generating...' : 'Generate with AI 🪄'}</span>
                </button>
              </div>

              {/* Rich text formatting bar */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#161838] rounded-lg border border-slate-200 dark:border-[#272b5c]">
                <button className="p-1 hover:bg-white dark:hover:bg-[#20234a] rounded text-slate-600 dark:text-slate-300"><Bold className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-white dark:hover:bg-[#20234a] rounded text-slate-600 dark:text-slate-300"><Italic className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-white dark:hover:bg-[#20234a] rounded text-slate-600 dark:text-slate-300"><Underline className="w-3.5 h-3.5" /></button>
                <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 mx-1" />
                <button className="p-1 hover:bg-white dark:hover:bg-[#20234a] rounded text-slate-600 dark:text-slate-300"><List className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-white dark:hover:bg-[#20234a] rounded text-slate-600 dark:text-slate-300"><AlignLeft className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-white dark:hover:bg-[#20234a] rounded text-slate-600 dark:text-slate-300"><AlignCenter className="w-3.5 h-3.5" /></button>
              </div>

              <div>
                <textarea
                  rows={7}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed resize-none"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {summary.length} / 400 characters
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. EDUCATION */}
          {activeSection === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Education &amp; Academics</h3>
                  <p className="text-[11px] text-slate-400">Degrees, colleges, graduation year, and GPA.</p>
                </div>
                <button
                  onClick={() => setEducation([...education, {
                    id: Date.now(),
                    degree: 'Higher Secondary Schooling',
                    institution: 'State Board School',
                    year: '2021 - 2023',
                    score: 'Percentage: 92%',
                    coursework: ''
                  }])}
                  className="px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 rounded-lg flex items-center gap-1 hover:scale-105"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Degree</span>
                </button>
              </div>

              {education.map((edu, idx) => (
                <div key={edu.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/40 dark:bg-[#161838]/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Degree #{idx + 1}</span>
                    {education.length > 1 && (
                      <button onClick={() => setEducation(education.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Degree Title</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const upd = [...education];
                        upd[idx].degree = e.target.value;
                        setEducation(upd);
                      }}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Institution / University</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const upd = [...education];
                        upd[idx].institution = e.target.value;
                        setEducation(upd);
                      }}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Years (e.g. 2023 - 2027)</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => {
                          const upd = [...education];
                          upd[idx].year = e.target.value;
                          setEducation(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">CGPA / Score</label>
                      <input
                        type="text"
                        value={edu.score}
                        onChange={(e) => {
                          const upd = [...education];
                          upd[idx].score = e.target.value;
                          setEducation(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. TECHNICAL SKILLS */}
          {activeSection === 'skills' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Technical Skills</h3>
                <p className="text-[11px] text-slate-400">ATS extracts keywords from your skills pills.</p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Next.js, Docker, Kubernetes..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold text-xs shadow-sm hover:bg-purple-500"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 font-semibold"
                  >
                    <span>{s}</span>
                    <button onClick={() => removeSkill(s)} className="text-purple-400 hover:text-purple-700 ml-1 text-sm font-bold">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 5. PROJECTS */}
          {activeSection === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Technical Projects</h3>
                  <p className="text-[11px] text-slate-400">Showcase full-stack architecture &amp; quantifiable results.</p>
                </div>
                <button
                  onClick={() => setProjects([...projects, {
                    id: Date.now(),
                    title: 'New Full Stack Project',
                    role: 'Full Stack Engineer',
                    tech: 'React, Node.js, PostgreSQL',
                    duration: '2026',
                    bullets: ['Engineered scalable full stack solution with responsive client UI and high performance API.']
                  }])}
                  className="px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 rounded-lg flex items-center gap-1 hover:scale-105"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Project</span>
                </button>
              </div>

              {projects.map((proj, pIdx) => (
                <div key={proj.id} className="p-4 rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/40 dark:bg-[#161838]/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Project #{pIdx + 1}</span>
                    {projects.length > 1 && (
                      <button onClick={() => setProjects(projects.filter((_, i) => i !== pIdx))} className="text-rose-400 hover:text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const upd = [...projects];
                          upd[pIdx].title = e.target.value;
                          setProjects(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Your Role</label>
                      <input
                        type="text"
                        value={proj.role}
                        onChange={(e) => {
                          const upd = [...projects];
                          upd[pIdx].role = e.target.value;
                          setProjects(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.tech}
                        onChange={(e) => {
                          const upd = [...projects];
                          upd[pIdx].tech = e.target.value;
                          setProjects(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Duration</label>
                      <input
                        type="text"
                        value={proj.duration}
                        onChange={(e) => {
                          const upd = [...projects];
                          upd[pIdx].duration = e.target.value;
                          setProjects(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Achievement Bullets</label>
                      <button
                        onClick={() => {
                          const upd = [...projects];
                          upd[pIdx].bullets.push('Accomplished [X] as measured by [Y], by doing [Z].');
                          setProjects(upd);
                        }}
                        className="text-[10px] font-bold text-purple-600 hover:text-purple-500"
                      >
                        + Add Bullet
                      </button>
                    </div>

                    {proj.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex gap-2 items-start mb-2">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={(e) => {
                            const upd = [...projects];
                            upd[pIdx].bullets[bIdx] = e.target.value;
                            setProjects(upd);
                          }}
                          className="flex-1 p-2 text-[11px] rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] leading-relaxed resize-none"
                        />
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleImproveBullet(pIdx, bIdx)}
                            title="AI Improve Bullet"
                            className="p-1 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                          {proj.bullets.length > 1 && (
                            <button
                              onClick={() => {
                                const upd = [...projects];
                                upd[pIdx].bullets = upd[pIdx].bullets.filter((_, i) => i !== bIdx);
                                setProjects(upd);
                              }}
                              className="p-1 text-rose-400 hover:text-rose-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. EXPERIENCE */}
          {activeSection === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Work Experience &amp; Internships</h3>
                  <p className="text-[11px] text-slate-400">Internships, full-time positions, or freelance projects.</p>
                </div>
                <button
                  onClick={() => setExperience([...experience, {
                    id: Date.now(),
                    company: 'New Company Inc.',
                    role: 'Software Engineer Intern',
                    duration: '2026',
                    location: 'Remote',
                    bullets: ['Developed high-performance endpoints and collaborated with cross-functional team.']
                  }])}
                  className="px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 rounded-lg flex items-center gap-1 hover:scale-105"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Experience</span>
                </button>
              </div>

              {experience.map((exp, expIdx) => (
                <div key={exp.id} className="p-4 rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/40 dark:bg-[#161838]/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Experience #{expIdx + 1}</span>
                    {experience.length > 1 && (
                      <button onClick={() => setExperience(experience.filter((_, i) => i !== expIdx))} className="text-rose-400 hover:text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const upd = [...experience];
                          upd[expIdx].company = e.target.value;
                          setExperience(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const upd = [...experience];
                          upd[expIdx].role = e.target.value;
                          setExperience(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => {
                          const upd = [...experience];
                          upd[expIdx].duration = e.target.value;
                          setExperience(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => {
                          const upd = [...experience];
                          upd[expIdx].location = e.target.value;
                          setExperience(upd);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Bullets</label>
                    {exp.bullets.map((b, bIdx) => (
                      <textarea
                        key={bIdx}
                        rows={2}
                        value={b}
                        onChange={(e) => {
                          const upd = [...experience];
                          upd[expIdx].bullets[bIdx] = e.target.value;
                          setExperience(upd);
                        }}
                        className="w-full p-2 text-[11px] rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] mb-1.5 resize-none leading-relaxed"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 7. CERTIFICATIONS */}
          {activeSection === 'certifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Certifications &amp; Licenses</h3>
                  <p className="text-[11px] text-slate-400">Cloud credentials, database certifications, etc.</p>
                </div>
                <button
                  onClick={() => setCertifications([...certifications, {
                    id: Date.now(),
                    name: 'NPTEL / Course Certification',
                    issuer: 'IIT / Tech Provider',
                    year: '2026'
                  }])}
                  className="px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 rounded-lg flex items-center gap-1 hover:scale-105"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Cert</span>
                </button>
              </div>

              {certifications.map((c, cIdx) => (
                <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/40 dark:bg-[#161838]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Certification #{cIdx + 1}</span>
                    <button onClick={() => setCertifications(certifications.filter((_, i) => i !== cIdx))} className="text-rose-400 hover:text-rose-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={c.name}
                    placeholder="Certification Name"
                    onChange={(e) => {
                      const upd = [...certifications];
                      upd[cIdx].name = e.target.value;
                      setCertifications(upd);
                    }}
                    className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={c.issuer}
                      placeholder="Issuer (e.g. AWS, Coursera)"
                      onChange={(e) => {
                        const upd = [...certifications];
                        upd[cIdx].issuer = e.target.value;
                        setCertifications(upd);
                      }}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                    />
                    <input
                      type="text"
                      value={c.year}
                      placeholder="Year"
                      onChange={(e) => {
                        const upd = [...certifications];
                        upd[cIdx].year = e.target.value;
                        setCertifications(upd);
                      }}
                      className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 8. ACHIEVEMENTS */}
          {activeSection === 'achievements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Honors &amp; Achievements</h3>
                  <p className="text-[11px] text-slate-400">Hackathons, competitive coding, academic awards.</p>
                </div>
                <button
                  onClick={() => setAchievements([...achievements, {
                    id: Date.now(),
                    title: 'New Award / Hackathon Honor',
                    desc: 'Ranked in top percentile.'
                  }])}
                  className="px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 rounded-lg flex items-center gap-1 hover:scale-105"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Achievement</span>
                </button>
              </div>

              {achievements.map((ach, aIdx) => (
                <div key={ach.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/40 dark:bg-[#161838]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Achievement #{aIdx + 1}</span>
                    <button onClick={() => setAchievements(achievements.filter((_, i) => i !== aIdx))} className="text-rose-400 hover:text-rose-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={ach.title}
                    placeholder="Honor / Award Title"
                    onChange={(e) => {
                      const upd = [...achievements];
                      upd[aIdx].title = e.target.value;
                      setAchievements(upd);
                    }}
                    className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                  />
                  <input
                    type="text"
                    value={ach.desc}
                    placeholder="Short description / impact"
                    onChange={(e) => {
                      const upd = [...achievements];
                      upd[aIdx].desc = e.target.value;
                      setAchievements(upd);
                    }}
                    className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 9. LANGUAGES */}
          {activeSection === 'languages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Languages</h3>
                  <p className="text-[11px] text-slate-400">Spoken and written language proficiency.</p>
                </div>
                <button
                  onClick={() => setLanguages([...languages, 'German (Elementary)'])}
                  className="px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 rounded-lg flex items-center gap-1 hover:scale-105"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Language</span>
                </button>
              </div>

              <div className="space-y-2">
                {languages.map((lang, lIdx) => (
                  <div key={lIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={lang}
                      onChange={(e) => {
                        const upd = [...languages];
                        upd[lIdx] = e.target.value;
                        setLanguages(upd);
                      }}
                      className="flex-1 p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                    />
                    <button
                      onClick={() => setLanguages(languages.filter((_, i) => i !== lIdx))}
                      className="p-1 text-rose-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. CUSTOM SECTIONS */}
          {customSections.map((cs) => {
            if (activeSection !== cs.id) return null;
            return (
              <div key={cs.id} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cs.title}</h3>
                    <p className="text-[11px] text-slate-400">Custom user-defined section content.</p>
                  </div>
                  <button
                    onClick={() => {
                      const upd = [...customSections];
                      const target = upd.find((s) => s.id === cs.id);
                      if (target) target.items.push('New entry item');
                      setCustomSections(upd);
                    }}
                    className="px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 rounded-lg flex items-center gap-1 hover:scale-105"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {cs.items.map((itemText: string, itIdx: number) => (
                    <div key={itIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={itemText}
                        onChange={(e) => {
                          const upd = [...customSections];
                          const target = upd.find((s) => s.id === cs.id);
                          if (target) target.items[itIdx] = e.target.value;
                          setCustomSections(upd);
                        }}
                        className="flex-1 p-2 text-xs rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                      />
                      <button
                        onClick={() => {
                          const upd = [...customSections];
                          const target = upd.find((s) => s.id === cs.id);
                          if (target) target.items = target.items.filter((_: any, i: number) => i !== itIdx);
                          setCustomSections(upd);
                        }}
                        className="p-1 text-rose-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Column 3: Live Real-time A4 Resume Preview Sheet (Right) - Fills Screen Perfectly */}
        <div className="flex-1 bg-slate-200/70 dark:bg-[#060713] p-6 lg:p-8 overflow-y-auto flex justify-center items-start">
          <div
            id="resume-preview-sheet"
            className="resume-sheet rounded-md p-10 text-slate-900 transition-all origin-top shadow-2xl bg-white"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              fontFamily: fontFamily === 'Inter' ? 'sans-serif' : fontFamily,
              fontSize: fontSize === 'A-' ? '13px' : fontSize === 'A+' ? '15.5px' : '14px'
            }}
          >
            {/* RENDER THE SELECTED UNIQUE TEMPLATE LAYOUT */}

            {/* TEMPLATE 1: DEVELOPER X / KERNEL STACK */}
            {(template === 'developer-x' || template === 'kernel-stack') && (
              <div>
                <div className="border-b-2 pb-4 mb-5" style={{ borderColor: accentColor }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-black tracking-tight" style={{ color: accentColor }}>
                        {personalInfo.fullName}
                      </h1>
                      <p className="text-sm font-bold text-slate-700 mt-1">
                        &gt; {personalInfo.title}
                      </p>
                    </div>
                    <div className="text-right text-[11px] font-mono text-slate-500 space-y-0.5">
                      <p>{personalInfo.email}</p>
                      <p>{personalInfo.phone}</p>
                      <p>{personalInfo.location}</p>
                      <p className="text-purple-700 font-semibold">{personalInfo.github}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                    // PROFESSIONAL SUMMARY
                  </h2>
                  <div className="h-0.5 bg-slate-200 mb-2" />
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">{summary}</p>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                    // TECHNICAL SKILLS
                  </h2>
                  <div className="h-0.5 bg-slate-200 mb-2" />
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {skills.map((s) => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium border border-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                {experience && experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      // WORK EXPERIENCE &amp; INTERNSHIPS
                    </h2>
                    <div className="h-0.5 bg-slate-200 mb-2" />
                    {experience.map((exp) => (
                      <div key={exp.company} className="mb-3 text-xs">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-slate-900">{exp.company} — {exp.role}</span>
                          <span className="text-slate-400 text-[11px] font-mono">{exp.duration}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono mb-1">{exp.location}</p>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                    // FEATURED PROJECTS
                  </h2>
                  <div className="h-0.5 bg-slate-200 mb-2" />
                  {projects.map((p) => (
                    <div key={p.title} className="mb-3">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span className="text-slate-900">{p.title}</span>
                        <span className="text-slate-400 text-[11px] font-mono">{p.duration}</span>
                      </div>
                      <p className="text-[11px] text-purple-700 font-mono font-medium mb-1">
                        [{p.role}] • Tech: {p.tech}
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-700">
                        {p.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                    // EDUCATION
                  </h2>
                  <div className="h-0.5 bg-slate-200 mb-2" />
                  {education.map((e) => (
                    <div key={e.degree} className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{e.degree}</p>
                        <p className="text-slate-600 text-[11px]">{e.institution} — <span className="font-bold text-purple-700">{e.score}</span></p>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{e.year}</span>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      // CERTIFICATIONS &amp; CREDENTIALS
                    </h2>
                    <div className="h-0.5 bg-slate-200 mb-2" />
                    <div className="space-y-1 text-xs">
                      {certifications.map((c) => (
                        <div key={c.id} className="flex justify-between items-center text-slate-800 font-mono">
                          <span>&gt; <b>{c.name}</b> [{c.issuer}]</span>
                          <span className="text-slate-400 text-[11px]">{c.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      // HONORS &amp; ACHIEVEMENTS
                    </h2>
                    <div className="h-0.5 bg-slate-200 mb-2" />
                    <div className="space-y-1 text-xs text-slate-700">
                      {achievements.map((a) => (
                        <p key={a.id}>* <b>{a.title}</b> — {a.desc}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      // LANGUAGES
                    </h2>
                    <div className="h-0.5 bg-slate-200 mb-2" />
                    <p className="text-xs font-mono text-slate-700">{languages.join(' | ')}</p>
                  </div>
                )}

                {/* Custom Sections */}
                {customSections.map((cs) => (
                  <div key={cs.id} className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      // {cs.title.toUpperCase()}
                    </h2>
                    <div className="h-0.5 bg-slate-200 mb-2" />
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                      {cs.items.map((it: string, i: number) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* TEMPLATE 2: MODERN PRO / METRO FLOW */}
            {(template === 'modern-pro' || template === 'metro-flow') && (
              <div className="grid grid-cols-12 gap-6 min-h-[900px]">
                {/* Left Colored Sidebar */}
                <div className="col-span-4 rounded-xl p-4 text-white space-y-4" style={{ backgroundColor: accentColor }}>
                  <div className="text-center pb-3 border-b border-white/20">
                    <h1 className="text-xl font-extrabold">{personalInfo.fullName}</h1>
                    <p className="text-xs text-white/80 mt-1">{personalInfo.title}</p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider mb-2 border-b border-white/20 pb-1">Contact</h3>
                    <div className="text-[11px] space-y-1 text-white/90">
                      <p className="truncate">{personalInfo.email}</p>
                      <p>{personalInfo.phone}</p>
                      <p>{personalInfo.location}</p>
                      <p className="truncate">{personalInfo.linkedin}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider mb-2 border-b border-white/20 pb-1">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {skills.map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider mb-2 border-b border-white/20 pb-1">Education</h3>
                    {education.map((e) => (
                      <div key={e.degree} className="text-[11px] text-white/90 mb-2">
                        <p className="font-bold">{e.degree}</p>
                        <p className="text-[10px] text-white/80">{e.institution}</p>
                        <p className="text-[10px]">{e.score}</p>
                      </div>
                    ))}
                  </div>

                  {/* Certifications in Sidebar */}
                  {certifications && certifications.length > 0 && (
                    <div>
                      <h3 className="text-xs uppercase font-bold tracking-wider mb-2 border-b border-white/20 pb-1">Certifications</h3>
                      <div className="space-y-1 text-[10px] text-white/90">
                        {certifications.map((c) => (
                          <div key={c.id}>
                            <p className="font-bold">{c.name}</p>
                            <p className="text-white/70">{c.issuer} ({c.year})</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages in Sidebar */}
                  {languages && languages.length > 0 && (
                    <div>
                      <h3 className="text-xs uppercase font-bold tracking-wider mb-2 border-b border-white/20 pb-1">Languages</h3>
                      <p className="text-[10px] text-white/90">{languages.join(', ')}</p>
                    </div>
                  )}
                </div>

                {/* Right Main Body */}
                <div className="col-span-8 space-y-4">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: accentColor }}>
                      Professional Profile
                    </h2>
                    <p className="text-xs text-slate-700 leading-relaxed mt-2">{summary}</p>
                  </div>

                  {/* Work Experience in Main Body */}
                  {experience && experience.length > 0 && (
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: accentColor }}>
                        Experience &amp; Internships
                      </h2>
                      <div className="space-y-3 mt-2">
                        {experience.map((exp) => (
                          <div key={exp.company} className="text-xs">
                            <div className="flex justify-between font-bold">
                              <span>{exp.company} — {exp.role}</span>
                              <span className="text-slate-400 text-[11px]">{exp.duration}</span>
                            </div>
                            <p className="text-slate-500 text-[11px]">{exp.location}</p>
                            <ul className="list-disc list-inside space-y-0.5 text-slate-700 mt-1">
                              {exp.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: accentColor }}>
                      Key Projects
                    </h2>
                    <div className="space-y-3 mt-2">
                      {projects.map((p) => (
                        <div key={p.title} className="text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-slate-900">{p.title}</span>
                            <span className="text-slate-400 text-[11px]">{p.duration}</span>
                          </div>
                          <p className="text-[11px] font-medium text-slate-600 mb-1">{p.role} • <span className="italic">{p.tech}</span></p>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                            {p.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  {achievements && achievements.length > 0 && (
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: accentColor }}>
                        Achievements &amp; Honors
                      </h2>
                      <div className="space-y-1 mt-2 text-xs text-slate-700">
                        {achievements.map((a) => (
                          <p key={a.id}>• <b>{a.title}</b>: {a.desc}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Sections */}
                  {customSections.map((cs) => (
                    <div key={cs.id}>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1" style={{ borderColor: accentColor }}>
                        {cs.title}
                      </h2>
                      <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 mt-2">
                        {cs.items.map((it: string, i: number) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TEMPLATE 3: PROFESSIONAL ELITE / CLASSIC IVY */}
            {(template === 'professional-elite' || template === 'classic-ivy') && (
              <div>
                <div className="text-center pb-4 mb-4 border-b-2" style={{ borderColor: accentColor }}>
                  <h1 className="text-3xl font-serif font-bold tracking-wide" style={{ color: accentColor }}>
                    {personalInfo.fullName.toUpperCase()}
                  </h1>
                  <p className="text-xs font-semibold text-slate-600 tracking-widest uppercase mt-1">
                    {personalInfo.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    {personalInfo.email} | {personalInfo.phone} | {personalInfo.location} | {personalInfo.linkedin}
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-serif font-bold uppercase tracking-widest pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                    Executive Summary
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed mt-2">{summary}</p>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-serif font-bold uppercase tracking-widest pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                    Core Technical Competencies
                  </h2>
                  <p className="text-xs text-slate-800 font-medium mt-2 leading-relaxed">
                    {skills.join(' • ')}
                  </p>
                </div>

                {/* Professional Work Experience */}
                {experience && experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-serif font-bold uppercase tracking-widest pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                      Professional Experience &amp; Internships
                    </h2>
                    <div className="mt-2 space-y-3">
                      {experience.map((exp) => (
                        <div key={exp.company} className="text-xs font-serif">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{exp.company} — {exp.role}</span>
                            <span className="text-slate-500">{exp.duration}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 italic mb-1">{exp.location}</p>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                            {exp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-xs font-serif font-bold uppercase tracking-widest pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                    Professional Project Engagements
                  </h2>
                  <div className="mt-2 space-y-3">
                    {projects.map((p) => (
                      <div key={p.title} className="text-xs font-serif">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{p.title}</span>
                          <span className="text-slate-500">{p.duration}</span>
                        </div>
                        <p className="text-[11px] italic text-slate-600">{p.role} — Technologies: {p.tech}</p>
                        <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                          {p.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-serif font-bold uppercase tracking-widest pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                    Academic Qualifications
                  </h2>
                  <div className="mt-2 space-y-1">
                    {education.map((e) => (
                      <div key={e.degree} className="flex justify-between text-xs font-serif">
                        <div>
                          <p className="font-bold text-slate-900">{e.degree}</p>
                          <p className="text-slate-600 text-[11px]">{e.institution} ({e.score})</p>
                        </div>
                        <span className="text-slate-500 font-medium">{e.year}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Certifications */}
                {certifications && certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-serif font-bold uppercase tracking-widest pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                      Certifications &amp; Licenses
                    </h2>
                    <div className="mt-2 space-y-1 font-serif text-xs">
                      {certifications.map((c) => (
                        <div key={c.id} className="flex justify-between text-slate-800">
                          <span><b>{c.name}</b> — {c.issuer}</span>
                          <span className="text-slate-500">{c.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Honors & Achievements */}
                {achievements && achievements.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-serif font-bold uppercase tracking-widest pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                      Honors &amp; Achievements
                    </h2>
                    <div className="mt-2 space-y-1 font-serif text-xs text-slate-700">
                      {achievements.map((a) => (
                        <p key={a.id}>• <b>{a.title}</b> — {a.desc}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-serif font-bold uppercase tracking-widest pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                      Languages
                    </h2>
                    <p className="mt-1 text-xs font-serif text-slate-700">{languages.join(' • ')}</p>
                  </div>
                )}

                {/* Custom Sections */}
                {customSections.map((cs) => (
                  <div key={cs.id} className="mb-4">
                    <h2 className="text-xs font-serif font-bold uppercase tracking-widest pb-1 border-b" style={{ borderColor: accentColor, color: accentColor }}>
                      {cs.title}
                    </h2>
                    <ul className="list-disc list-inside mt-2 text-xs font-serif text-slate-700 space-y-0.5">
                      {cs.items.map((it: string, i: number) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* TEMPLATE 4: MINIMAL CLEAN / PURE MONO / SWISS GRID */}
            {(template === 'minimal-clean' || template === 'pure-mono' || template === 'swiss-grid') && (
              <div className="space-y-5">
                <div>
                  <h1 className="text-3xl font-light tracking-tight text-slate-900">{personalInfo.fullName}</h1>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{personalInfo.title} — {personalInfo.location}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{personalInfo.email} • {personalInfo.phone} • {personalInfo.github}</p>
                </div>

                <div>
                  <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">About</h2>
                  <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                </div>

                <div>
                  <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">Expertise</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span key={s} className="text-xs text-slate-800 border-b pb-0.5" style={{ borderColor: accentColor }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {experience && experience.length > 0 && (
                  <div>
                    <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">Experience</h2>
                    <div className="space-y-3">
                      {experience.map((exp) => (
                        <div key={exp.company} className="text-xs">
                          <div className="flex justify-between">
                            <span className="font-semibold text-slate-900">{exp.company} — {exp.role}</span>
                            <span className="text-slate-400">{exp.duration}</span>
                          </div>
                          <p className="text-slate-700 mt-0.5">{exp.bullets[0]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">Projects</h2>
                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div key={p.title} className="text-xs">
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-900">{p.title}</span>
                          <span className="text-slate-400">{p.duration}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{p.role} — {p.tech}</p>
                        <p className="text-slate-700 mt-1">{p.bullets[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">Education</h2>
                  {education.map((e) => (
                    <div key={e.degree} className="text-xs flex justify-between">
                      <span><b>{e.degree}</b>, {e.institution} ({e.score})</span>
                      <span className="text-slate-400">{e.year}</span>
                    </div>
                  ))}
                </div>

                {certifications && certifications.length > 0 && (
                  <div>
                    <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">Certifications</h2>
                    <div className="space-y-1 text-xs">
                      {certifications.map((c) => (
                        <div key={c.id} className="flex justify-between">
                          <span>{c.name} — {c.issuer}</span>
                          <span className="text-slate-400">{c.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {achievements && achievements.length > 0 && (
                  <div>
                    <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">Achievements</h2>
                    <div className="space-y-1 text-xs text-slate-700">
                      {achievements.map((a) => (
                        <p key={a.id}>• {a.title}: {a.desc}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 5: FRESHER CLEAN / CAMPUS PRIME / SCHOLAR EDGE */}
            {(template === 'fresher-clean' || template === 'campus-prime' || template === 'scholar-edge') && (
              <div>
                <div className="text-center border-b pb-3 mb-4" style={{ borderColor: accentColor }}>
                  <h1 className="text-2xl font-black text-slate-900">{personalInfo.fullName}</h1>
                  <p className="text-xs font-bold mt-0.5" style={{ color: accentColor }}>{personalInfo.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {personalInfo.email} | {personalInfo.phone} | {personalInfo.location} | {personalInfo.github}
                  </p>
                </div>

                {/* Priority Education Banner for Campus Recruiters */}
                <div className="mb-4 bg-purple-50/60 p-3 rounded-lg border border-purple-200">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                    🎓 Education (Campus Placement Priority)
                  </h2>
                  {education.map((e) => (
                    <div key={e.degree} className="text-xs flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">{e.degree}</p>
                        <p className="text-slate-600 text-[11px]">{e.institution}</p>
                        {e.coursework && <p className="text-[10px] text-slate-500">Relevant Coursework: {e.coursework}</p>}
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-sm text-purple-700 bg-white px-2 py-0.5 rounded shadow-sm border border-purple-200">
                          {e.score}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">{e.year}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                    Technical Skills &amp; Competencies
                  </h2>
                  <div className="h-0.5 bg-slate-200 mb-2" />
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                    Academic &amp; Hackathon Projects
                  </h2>
                  <div className="h-0.5 bg-slate-200 mb-2" />
                  {projects.map((p) => (
                    <div key={p.title} className="mb-2.5 text-xs">
                      <div className="flex justify-between font-bold">
                        <span>{p.title}</span>
                        <span className="text-slate-400 text-[11px]">{p.duration}</span>
                      </div>
                      <p className="text-[11px] text-purple-600 font-medium">Tech: {p.tech}</p>
                      <ul className="list-disc list-inside text-slate-700 space-y-0.5 mt-0.5">
                        {p.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {experience && experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      Internships &amp; Practical Training
                    </h2>
                    <div className="h-0.5 bg-slate-200 mb-2" />
                    {experience.map((exp) => (
                      <div key={exp.company} className="mb-2.5 text-xs">
                        <div className="flex justify-between font-bold">
                          <span>{exp.company} — {exp.role}</span>
                          <span className="text-slate-400 text-[11px]">{exp.duration}</span>
                        </div>
                        <p className="text-slate-700 mt-0.5">{exp.bullets[0]}</p>
                      </div>
                    ))}
                  </div>
                )}

                {certifications && certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      Certifications &amp; Courses
                    </h2>
                    <div className="h-0.5 bg-slate-200 mb-2" />
                    <div className="space-y-1 text-xs">
                      {certifications.map((c) => (
                        <div key={c.id} className="flex justify-between text-slate-800">
                          <span>• <b>{c.name}</b> ({c.issuer})</span>
                          <span className="text-slate-500">{c.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                    Honors &amp; Extra-Curricular
                  </h2>
                  <div className="h-0.5 bg-slate-200 mb-2" />
                  {achievements.map((a) => (
                    <p key={a.id} className="text-xs text-slate-700">
                      • <b>{a.title}</b> — {a.desc}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* TEMPLATE 6: CREATIVE FOLIO / STUDIO IMPACT / CANVAS STORY */}
            {(template === 'creative-folio' || template === 'studio-impact' || template === 'canvas-story') && (
              <div className="relative pl-6 border-l-4" style={{ borderColor: accentColor }}>
                <div className="pb-4 mb-4 border-b border-slate-200">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full text-white inline-block mb-2 shadow-sm" style={{ backgroundColor: accentColor }}>
                    Portfolio / Creative Tech
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {personalInfo.fullName}
                  </h1>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: accentColor }}>
                    {personalInfo.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {personalInfo.email} • {personalInfo.phone} • {personalInfo.location} • {personalInfo.github}
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-black uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
                    ✦ Creative Narrative
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {summary}
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-black uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
                    ✦ Toolkit &amp; Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span key={s} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                {experience && experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
                      ✦ Experience Milestones
                    </h2>
                    <div className="space-y-3">
                      {experience.map((exp) => (
                        <div key={exp.company} className="p-3 rounded-xl border border-slate-200 bg-white shadow-xs">
                          <div className="flex justify-between font-bold text-xs">
                            <span className="text-slate-900">{exp.company} — {exp.role}</span>
                            <span className="text-slate-400 text-[11px]">{exp.duration}</span>
                          </div>
                          <p className="text-slate-700 text-xs mt-1">{exp.bullets[0]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-xs font-black uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
                    ✦ Project Case Studies
                  </h2>
                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div key={p.title} className="p-3 rounded-xl border border-slate-200 bg-white shadow-xs">
                        <div className="flex justify-between font-bold text-xs">
                          <span className="text-slate-900">{p.title}</span>
                          <span className="text-slate-400 text-[11px]">{p.duration}</span>
                        </div>
                        <p className="text-[11px] font-semibold mt-0.5" style={{ color: accentColor }}>
                          {p.role} — <span className="font-normal text-slate-600">{p.tech}</span>
                        </p>
                        <ul className="list-disc list-inside text-slate-700 text-xs space-y-0.5 mt-1">
                          {p.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-black uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
                    ✦ Education &amp; Background
                  </h2>
                  {education.map((e) => (
                    <div key={e.degree} className="text-xs flex justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{e.degree}</p>
                        <p className="text-slate-600 text-[11px]">{e.institution} — <span className="font-bold" style={{ color: accentColor }}>{e.score}</span></p>
                      </div>
                      <span className="text-slate-400 font-medium">{e.year}</span>
                    </div>
                  ))}
                </div>

                {certifications && certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
                      ✦ Verified Certifications
                    </h2>
                    <div className="space-y-1 text-xs">
                      {certifications.map((c) => (
                        <div key={c.id} className="flex justify-between">
                          <span>✦ <b>{c.name}</b> — {c.issuer}</span>
                          <span className="text-slate-400">{c.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 7: CORPORATE CLEAN (Wall Street / Fortune 100 Traditional Format) */}
            {template === 'corporate-clean' && (
              <div>
                <div className="border-b-2 border-slate-900 pb-3 mb-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900 font-serif">
                        {personalInfo.fullName}
                      </h1>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5 uppercase tracking-wide">
                        {personalInfo.title}
                      </p>
                    </div>
                    <div className="text-right text-[11px] text-slate-600 space-y-0.5 font-serif">
                      <p>{personalInfo.location} | {personalInfo.phone}</p>
                      <p>{personalInfo.email} | {personalInfo.linkedin}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                    Professional Summary
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed font-serif text-justify">{summary}</p>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                    Core Qualifications &amp; Skills
                  </h2>
                  <p className="text-xs text-slate-800 font-serif leading-relaxed">
                    <b>Technical Stack:</b> {skills.join(', ')}
                  </p>
                </div>

                {experience && experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                      Work Experience &amp; Positions
                    </h2>
                    <div className="space-y-3 font-serif">
                      {experience.map((exp) => (
                        <div key={exp.company} className="text-xs">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{exp.company} — {exp.role}</span>
                            <span>{exp.duration}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 italic">{exp.location}</p>
                          <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                            {exp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                    Key Engineering Projects
                  </h2>
                  <div className="space-y-3 font-serif">
                    {projects.map((p) => (
                      <div key={p.title} className="text-xs">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{p.title}</span>
                          <span>{p.duration}</span>
                        </div>
                        <p className="text-[11px] italic text-slate-600">{p.role} | Technologies: {p.tech}</p>
                        <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                          {p.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                    Education &amp; Credentials
                  </h2>
                  {education.map((e) => (
                    <div key={e.degree} className="flex justify-between text-xs font-serif">
                      <div>
                        <p className="font-bold text-slate-900">{e.degree}</p>
                        <p className="text-slate-600 text-[11px]">{e.institution} — Cumulative Score: {e.score}</p>
                      </div>
                      <span className="text-slate-600">{e.year}</span>
                    </div>
                  ))}
                </div>

                {certifications && certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                      Certifications
                    </h2>
                    <div className="space-y-1 text-xs font-serif">
                      {certifications.map((c) => (
                        <div key={c.id} className="flex justify-between">
                          <span><b>{c.name}</b> — {c.issuer}</span>
                          <span className="text-slate-600">{c.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 8: NEO TECH / AURORA BOLD */}
            {(template === 'neo-tech' || template === 'aurora-bold') && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                      {personalInfo.fullName}
                    </h1>
                    <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: accentColor }}>
                      {personalInfo.title}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {personalInfo.email} • {personalInfo.phone} • {personalInfo.location}
                    </p>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Status</span>
                    <span className="text-xs font-extrabold text-emerald-600">Open to Roles</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-8 p-3.5 rounded-xl border border-slate-200 bg-white">
                    <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                      Executive Profile
                    </h2>
                    <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                  </div>
                  <div className="col-span-4 p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
                      Skill Matrix
                    </h2>
                    <div className="flex flex-wrap gap-1">
                      {skills.map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-800 font-semibold border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {experience && experience.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                      Work Experience
                    </h2>
                    {experience.map((exp) => (
                      <div key={exp.company} className="p-3.5 rounded-xl border-l-4 border border-slate-200 bg-white shadow-xs" style={{ borderLeftColor: accentColor }}>
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-900">{exp.company} — {exp.role}</span>
                          <span className="text-slate-400 font-mono text-[11px]">{exp.duration}</span>
                        </div>
                        <ul className="list-disc list-inside text-xs text-slate-700 mt-1 space-y-0.5">
                          {exp.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                    Engineered Systems &amp; Projects
                  </h2>
                  {projects.map((p) => (
                    <div key={p.title} className="p-3.5 rounded-xl border-l-4 border border-slate-200 bg-white shadow-xs" style={{ borderLeftColor: accentColor }}>
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-900">{p.title}</span>
                        <span className="text-slate-400 font-mono text-[11px]">{p.duration}</span>
                      </div>
                      <p className="text-[11px] text-purple-700 font-mono mt-0.5">{p.role} // Stack: {p.tech}</p>
                      <ul className="list-disc list-inside text-xs text-slate-700 mt-1 space-y-0.5">
                        {p.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
                    Education &amp; Credentials
                  </h2>
                  {education.map((e) => (
                    <div key={e.degree} className="flex justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{e.degree}</p>
                        <p className="text-slate-600 text-[11px]">{e.institution} ({e.score})</p>
                      </div>
                      <span className="text-slate-400 font-mono">{e.year}</span>
                    </div>
                  ))}
                </div>

                {certifications && certifications.length > 0 && (
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
                      Certifications
                    </h2>
                    <div className="space-y-1 text-xs">
                      {certifications.map((c) => (
                        <div key={c.id} className="flex justify-between">
                          <span><b>{c.name}</b> — {c.issuer}</span>
                          <span className="text-slate-400 font-mono">{c.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 9: EXECUTIVE CREST (Dark Slate Top Banner with Gold Accents) */}
            {template === 'executive-crest' && (
              <div>
                <div className="bg-slate-900 text-white p-5 rounded-xl mb-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }} />
                  <h1 className="text-2xl font-serif font-black tracking-widest uppercase">
                    {personalInfo.fullName}
                  </h1>
                  <p className="text-xs font-semibold tracking-wider text-amber-400 uppercase mt-1">
                    {personalInfo.title}
                  </p>
                  <p className="text-[11px] text-slate-300 mt-2 font-mono">
                    {personalInfo.email} • {personalInfo.phone} • {personalInfo.location}
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: accentColor }}>
                    Executive Leadership &amp; Summary
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed font-serif">{summary}</p>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: accentColor }}>
                    Areas of Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-serif font-medium border border-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {experience && experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: accentColor }}>
                      Professional Experience
                    </h2>
                    <div className="space-y-3 font-serif">
                      {experience.map((exp) => (
                        <div key={exp.company} className="text-xs border-b border-slate-100 pb-2">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{exp.company} — {exp.role}</span>
                            <span className="text-slate-500">{exp.duration}</span>
                          </div>
                          <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                            {exp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: accentColor }}>
                    Key Deliverables &amp; Technical Projects
                  </h2>
                  <div className="space-y-3 font-serif">
                    {projects.map((p) => (
                      <div key={p.title} className="text-xs border-b border-slate-100 pb-2">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{p.title}</span>
                          <span className="text-slate-500">{p.duration}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 italic">{p.role} — Stack: {p.tech}</p>
                        <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                          {p.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: accentColor }}>
                    Academic Credentials
                  </h2>
                  {education.map((e) => (
                    <div key={e.degree} className="flex justify-between text-xs font-serif">
                      <div>
                        <p className="font-bold text-slate-900">{e.degree}</p>
                        <p className="text-slate-600 text-[11px]">{e.institution} ({e.score})</p>
                      </div>
                      <span className="text-slate-500 font-semibold">{e.year}</span>
                    </div>
                  ))}
                </div>

                {certifications && certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: accentColor }}>
                      Professional Certifications
                    </h2>
                    <div className="space-y-1 text-xs font-serif">
                      {certifications.map((c) => (
                        <div key={c.id} className="flex justify-between">
                          <span><b>{c.name}</b> — {c.issuer}</span>
                          <span className="text-slate-500">{c.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 10: DEV TERMINAL (Dark Console / Monospace CLI Style) */}
            {template === 'dev-terminal' && (
              <div className="bg-[#0f172a] text-slate-100 p-6 rounded-xl font-mono text-xs shadow-xl border border-slate-800">
                <div className="border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-slate-500 ml-2">bash - resume.sh</span>
                  </div>
                  <p className="text-emerald-400 font-bold">$ whoami</p>
                  <h1 className="text-2xl font-black text-white mt-0.5">{personalInfo.fullName}</h1>
                  <p className="text-cyan-400 font-semibold text-xs mt-0.5">&gt; {personalInfo.title}</p>
                  <p className="text-slate-400 text-[10px] mt-1">
                    Contact: {personalInfo.email} | {personalInfo.phone} | {personalInfo.github}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-emerald-400 font-bold">$ cat summary.txt</p>
                  <p className="text-slate-300 leading-relaxed mt-1 text-[11px] bg-slate-900/80 p-2.5 rounded border border-slate-800">
                    {summary}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-emerald-400 font-bold">$ ls -la skills/</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {experience && experience.length > 0 && (
                  <div className="mb-4">
                    <p className="text-emerald-400 font-bold">$ cat experience.log</p>
                    <div className="space-y-2 mt-1.5">
                      {experience.map((exp) => (
                        <div key={exp.company} className="p-2 rounded bg-slate-900/60 border border-slate-800">
                          <div className="flex justify-between text-white font-bold">
                            <span className="text-cyan-300"># {exp.company} — {exp.role}</span>
                            <span className="text-slate-500 text-[10px]">{exp.duration}</span>
                          </div>
                          <p className="text-slate-300 text-[11px] mt-1">* {exp.bullets[0]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-emerald-400 font-bold">$ ./deploy_projects.sh</p>
                  <div className="space-y-3 mt-1.5">
                    {projects.map((p) => (
                      <div key={p.title} className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                        <div className="flex justify-between text-white font-bold">
                          <span className="text-cyan-300"># {p.title}</span>
                          <span className="text-slate-500 text-[10px]">{p.duration}</span>
                        </div>
                        <p className="text-slate-400 text-[10px]">role: {p.role} | stack: {p.tech}</p>
                        <ul className="text-slate-300 text-[11px] mt-1 space-y-0.5">
                          {p.bullets.map((b, i) => (
                            <li key={i}>* {b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-emerald-400 font-bold">$ cat education.log</p>
                  {education.map((e) => (
                    <div key={e.degree} className="flex justify-between text-[11px] text-slate-300 mt-1">
                      <span>{e.degree} @ {e.institution} [{e.score}]</span>
                      <span className="text-slate-500">{e.year}</span>
                    </div>
                  ))}
                </div>

                {certifications && certifications.length > 0 && (
                  <div className="mb-4">
                    <p className="text-emerald-400 font-bold">$ cat certifications.txt</p>
                    <div className="space-y-1 text-slate-300 text-[11px] mt-1">
                      {certifications.map((c) => (
                        <div key={c.id} className="flex justify-between">
                          <span>[CERT] {c.name} — {c.issuer}</span>
                          <span className="text-slate-500">{c.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADD SECTION MODAL POPUP */}
      {isAddSectionOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#101227] border border-slate-200 dark:border-[#272b5c] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Add a Section</h3>
              </div>
              <button
                onClick={() => setIsAddSectionOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select a pre-configured section preset or create your own custom section:
            </p>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'experience', label: 'Work Experience', icon: Briefcase },
                { id: 'certifications', label: 'Certifications', icon: BadgeCheck },
                { id: 'achievements', label: 'Achievements', icon: Award },
                { id: 'languages', label: 'Languages', icon: Globe },
                { id: 'education', label: 'Education', icon: GraduationCap },
                { id: 'projects', label: 'Projects', icon: Maximize2 },
              ].map((preset) => {
                const Icon = preset.icon;
                const isAlreadyAdded = !!sectionsList.find((s) => s.id === preset.id);
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleAddSectionPreset(preset.id, preset.label, preset.icon)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-[#272b5c] hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all text-left"
                  >
                    <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span className="truncate">{preset.label}</span>
                    {isAlreadyAdded && <span className="ml-auto text-[10px] text-emerald-500">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Custom Section Input */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                Or Create Custom Section
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Volunteer Experience, Publications..."
                  value={customSectionInput}
                  onChange={(e) => setCustomSectionInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSection()}
                  className="flex-1 p-2 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-slate-50/50 dark:bg-[#161838] text-slate-900 dark:text-white"
                />
                <button
                  onClick={handleAddCustomSection}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-sm"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Exact Canvas Print Stylesheet */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 6mm 8mm;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: 100% !important;
            overflow: hidden !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
          body * {
            visibility: hidden !important;
          }
          #resume-preview-sheet, #resume-preview-sheet * {
            visibility: visible !important;
          }
          #resume-preview-sheet {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 4mm 6mm !important;
            box-shadow: none !important;
            border: none !important;
            transform: scale(0.91) !important;
            transform-origin: top center !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ResumeBuilderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Resume Builder...</div>}>
      <ResumeBuilderContent />
    </Suspense>
  );
}
