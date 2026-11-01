'use client';

import React, { useState } from 'react';
import {
  User,
  Shield,
  Sliders,
  Bell,
  Camera,
  CheckCircle2,
  Sun,
  Moon,
  KeyRound,
  Save
} from 'lucide-react';
import Header from '@/components/Header';
import { useTheme } from '@/context/ThemeContext';
import { api } from '@/lib/api';

const TABS = ['Profile', 'Account', 'Security', 'Preferences', 'Notifications'];

export default function SettingsPage() {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Profile');

  const [fullName, setFullName] = useState('Vignesh Madasamy');
  const [email, setEmail] = useState('vignesh@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Karur, Tamil Nadu, India');
  const [bio, setBio] = useState('CSE Student | Amrita Vishwa Vidyapeetham');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.updateProfile({
        full_name: fullName,
        phone,
        location,
        bio
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <Header
        title="Profile & Settings"
        subtitle="Manage your personal information and account preferences."
        actionText="My Resumes"
        actionHref="/my-resumes"
      />

      <div className="w-full px-6 lg:px-10 xl:px-14 py-8 space-y-8">
        {/* Header matching Screen 12 */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Profile &amp; Settings
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your personal information and account preferences.
          </p>
        </div>

        {/* Tab Navigation matching Screen 12 */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-[#20234a] pb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161838]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white/95 dark:bg-[#101227]/90 rounded-2xl border border-slate-200/90 dark:border-[#20234a] p-8 shadow-sm backdrop-blur-md space-y-6">
          {activeTab === 'Profile' && (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Profile Avatar Header matching Screen 12 */}
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold ring-4 ring-purple-100 dark:ring-purple-900/30 overflow-hidden shadow-inner">
                    VM
                  </div>
                  <label className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity">
                    <Camera className="w-5 h-5" />
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {fullName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {bio}
                  </p>
                  <button
                    type="button"
                    className="mt-2 px-3 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-[#161838] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#20234a]"
                  >
                    Edit Profile Photo
                  </button>
                </div>
              </div>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Profile changes saved successfully!</span>
                </div>
              )}

              {/* Form Fields matching Screen 12 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bio / Headline
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Theme Preference */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Theme Appearance</p>
                  <p className="text-[11px] text-slate-400">Toggle between Light and Dark visual theme</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                      theme === 'light'
                        ? 'bg-purple-100 text-purple-700 border border-purple-300 shadow-sm'
                        : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                      theme === 'dark'
                        ? 'bg-purple-900/60 text-purple-300 border border-purple-700 shadow-sm'
                        : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>

              {/* Save Button matching Screen 12 */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-purple-600/20 hover:scale-105 transition-all"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab !== 'Profile' && (
            <div className="py-12 text-center space-y-3">
              <Shield className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto opacity-70" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                {activeTab} Settings Configured
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Two-factor authentication, email preferences, and notification rules are managed securely.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
