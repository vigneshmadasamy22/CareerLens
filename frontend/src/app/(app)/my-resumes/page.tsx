'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Download,
  Edit2,
  Trash2,
  Copy,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Header from '@/components/Header';
import { api } from '@/lib/api';

export default function MyResumesPage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResumes() {
      try {
        const list = await api.getResumes();
        if (list && list.length > 0) {
          setResumes(list);
        } else {
          setResumes([
            {
              id: 1,
              title: 'Vignesh_Developer_Resume',
              template_id: 'developer-x',
              target_role: 'Software Engineer',
              version_number: 1,
              is_primary: true,
              updated_at: '2 hours ago'
            },
            {
              id: 2,
              title: 'FullStack_Application_Resume',
              template_id: 'modern-pro',
              target_role: 'Full Stack Developer',
              version_number: 2,
              is_primary: false,
              updated_at: '1 day ago'
            }
          ]);
        }
      } catch (err) {
        setResumes([
          {
            id: 1,
            title: 'Vignesh_Developer_Resume',
            template_id: 'developer-x',
            target_role: 'Software Engineer',
            version_number: 1,
            is_primary: true,
            updated_at: '2 hours ago'
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadResumes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.deleteResume(id);
      setResumes(resumes.filter((r) => r.id !== id));
    } catch (err) {
      setResumes(resumes.filter((r) => r.id !== id));
    }
  };

  return (
    <div>
      <Header
        title="My Resumes"
        subtitle="Manage, duplicate, and export your tailored resume versions."
        actionText="Create New Resume"
        actionHref="/builder"
      />

      <div className="w-full px-6 lg:px-10 xl:px-14 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              My Saved Resumes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              All your resume drafts and target-tailored versions in one place.
            </p>
          </div>

          <Link
            href="/builder"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/25 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create New</span>
          </Link>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl bg-white/95 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] p-5 shadow-sm backdrop-blur-md flex flex-col justify-between hover:border-purple-400 dark:hover:border-purple-600 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  {r.is_primary && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      Primary
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Target: {r.target_role || 'Software Engineer'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Template: {r.template_id || 'Developer X'} • v{r.version_number || 1}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href="/builder"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#161838] hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>

                <div className="flex items-center gap-2">
                  <a
                    href={`/api/resumes/${r.id}/export/pdf`}
                    target="_blank"
                    download
                    className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-slate-100 dark:hover:bg-[#161838]"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
