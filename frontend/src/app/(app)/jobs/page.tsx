'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  X
} from 'lucide-react';
import Header from '@/components/Header';
import { api } from '@/lib/api';

const STATUS_COLORS: Record<string, string> = {
  Interview: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
  Assessment: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800',
  Applied: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300 dark:border-purple-800',
  Interested: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
  Selected: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
  Rejected: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800',
};

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 12,
    in_progress: 5,
    interview: 3,
    selected: 2,
    rejected: 2
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newStatus, setNewStatus] = useState('Applied');
  const [newAppliedDate, setNewAppliedDate] = useState('Nov 1, 2026');
  const [newInterviewDate, setNewInterviewDate] = useState('-');

  useEffect(() => {
    async function loadData() {
      try {
        const [jobsList, statsData] = await Promise.all([
          api.getJobs(),
          api.getJobStats()
        ]);
        if (jobsList && jobsList.length > 0) setJobs(jobsList);
        if (statsData) setStats(statsData);
      } catch (err) {
        // Fallback initial jobs
        setJobs([
          { id: 1, company: 'TCS', role: 'Software Engineer', status: 'Interview', applied_date: 'Oct 21, 2026', interview_date: 'Nov 5, 2026' },
          { id: 2, company: 'Infosys', role: 'Full Stack Developer', status: 'Assessment', applied_date: 'Oct 18, 2026', interview_date: '-' },
          { id: 3, company: 'Zoho', role: 'Software Engineer', status: 'Applied', applied_date: 'Oct 10, 2026', interview_date: '-' },
          { id: 4, company: 'Cognizant', role: 'Java / Python Developer', status: 'Selected', applied_date: 'Sep 28, 2026', interview_date: 'Completed' },
          { id: 5, company: 'Amazon', role: 'SDE-1', status: 'Rejected', applied_date: 'Aug 15, 2026', interview_date: '-' },
        ]);
      }
    }
    loadData();
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;
    try {
      const created = await api.createJob({
        company: newCompany,
        role: newRole,
        status: newStatus,
        applied_date: newAppliedDate,
        interview_date: newInterviewDate
      });
      setJobs([created, ...jobs]);
      setShowAddModal(false);
      setNewCompany('');
      setNewRole('');
    } catch (err) {
      setJobs([
        { id: Date.now(), company: newCompany, role: newRole, status: newStatus, applied_date: newAppliedDate, interview_date: newInterviewDate },
        ...jobs
      ]);
      setShowAddModal(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    try {
      await api.deleteJob(id);
      setJobs(jobs.filter((j) => j.id !== id));
    } catch (err) {
      setJobs(jobs.filter((j) => j.id !== id));
    }
  };

  return (
    <div>
      <Header
        title="Job Application Tracker"
        subtitle="Track and manage all your job applications in one place."
        actionText="Add Application"
        actionHref="#"
        actionIcon={<Plus className="w-4 h-4 mr-1.5" />}
      />

      <div className="w-full px-6 lg:px-10 xl:px-14 py-8 space-y-8">
        {/* Header Action Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Job Application Tracker
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Track and manage all your job applications in one place.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/25 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>

        {/* 5 KPI Metric Cards matching Screen 10 */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Total', count: stats.total || 12, col: 'text-purple-600 dark:text-purple-400' },
            { label: 'In Progress', count: stats.in_progress || 5, col: 'text-blue-600 dark:text-blue-400' },
            { label: 'Interview', count: stats.interview || 3, col: 'text-amber-600 dark:text-amber-400' },
            { label: 'Selected', count: stats.selected || 2, col: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Rejected', count: stats.rejected || 2, col: 'text-rose-600 dark:text-rose-400' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl bg-white/95 dark:bg-[#101227]/90 border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md text-center"
            >
              <p className={`text-2xl font-extrabold ${item.col}`}>{item.count}</p>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Applications Table matching Screen 10 */}
        <div className="bg-white/95 dark:bg-[#101227]/90 rounded-2xl border border-slate-200/90 dark:border-[#20234a] shadow-sm backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#161838] border-b border-slate-200 dark:border-[#20234a] text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Company</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Applied On</th>
                  <th className="px-5 py-3.5">Interview</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/60 dark:hover:bg-[#161838]/40 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                      {j.company}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                      {j.role}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_COLORS[j.status] || STATUS_COLORS.Applied}`}>
                        {j.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                      {j.applied_date || '-'}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                      {j.interview_date || '-'}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => handleDeleteJob(j.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Application Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#101227] rounded-2xl border border-slate-200 dark:border-[#20234a] p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Add Job Application
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Company</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. TCS, Google, Infosys"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Job Role</label>
                  <input
                    type="text"
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                    >
                      <option value="Interested">Interested</option>
                      <option value="Applied">Applied</option>
                      <option value="Assessment">Assessment</option>
                      <option value="Interview">Interview</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Applied Date</label>
                    <input
                      type="text"
                      value={newAppliedDate}
                      onChange={(e) => setNewAppliedDate(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Interview Date</label>
                  <input
                    type="text"
                    value={newInterviewDate}
                    onChange={(e) => setNewInterviewDate(e.target.value)}
                    placeholder="e.g. Nov 15, 2026 or -"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#272b5c]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-purple-600 text-white font-semibold"
                  >
                    Save Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
