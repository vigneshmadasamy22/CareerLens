'use client';

import React from 'react';
import { Bot, Mic, Sparkles, Volume2 } from 'lucide-react';

interface Props {
  className?: string;
}

export default function InterviewerCharacter({ className = '' }: Props) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Radiant Aura */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-purple-500/25 via-pink-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* SVG Character */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72">
        <svg
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xl"
        >
          <defs>
            <radialGradient id="interviewBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#6366F1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#3730A3" />
            </linearGradient>
            <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="skinInterviewer" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="hairInterviewer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#451A03" />
              <stop offset="50%" stopColor="#290E02" />
              <stop offset="100%" stopColor="#1B0901" />
            </linearGradient>
            <linearGradient id="headsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Background Ambient Circle */}
          <circle cx="180" cy="180" r="145" fill="url(#interviewBg)" />

          {/* Pulsing Audio Waveform Rings */}
          <circle cx="180" cy="180" r="130" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.6" />
          <circle cx="180" cy="180" r="115" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

          {/* Sound waves floating on sides */}
          <path d="M50 160 Q55 170 50 180" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 152 Q48 170 40 188" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" />
          <path d="M310 160 Q305 170 310 180" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
          <path d="M320 152 Q312 170 320 188" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />

          {/* INTERVIEWER TORSO & PROFESSIONAL BLAZER */}
          <path
            d="M90 340 C90 260 130 230 180 230 C230 230 270 260 270 340 Z"
            fill="url(#blazerGrad)"
          />

          {/* Inner Collared Shirt */}
          <path d="M155 230 L180 280 L205 230 Z" fill="url(#shirtGrad)" />
          {/* Blazer Lapels */}
          <path d="M140 230 L170 300 L155 340 L115 340 Z" fill="#4338CA" />
          <path d="M220 230 L190 300 L205 340 L245 340 Z" fill="#3730A3" />

          {/* NECK */}
          <rect x="165" y="200" width="30" height="34" rx="6" fill="#FBBF24" />

          {/* HEAD & FACE */}
          {/* Ears */}
          <circle cx="136" cy="170" r="10" fill="#FBBF24" />
          <circle cx="224" cy="170" r="10" fill="#FBBF24" />

          {/* Face Oval */}
          <path
            d="M142 150 C142 120 218 120 218 150 C218 190 205 210 180 210 C155 210 142 190 142 150 Z"
            fill="url(#skinInterviewer)"
          />

          {/* Eyes & Warm Expression */}
          <ellipse cx="162" cy="162" rx="4" ry="4.5" fill="#1E293B" />
          <circle cx="163.5" cy="160.5" r="1.5" fill="#FFFFFF" />
          <path d="M155 154 Q163 150 170 154" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />

          <ellipse cx="198" cy="162" rx="4" ry="4.5" fill="#1E293B" />
          <circle cx="199.5" cy="160.5" r="1.5" fill="#FFFFFF" />
          <path d="M190 154 Q197 150 205 154" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />

          {/* Soft Nose */}
          <path d="M179 164 L177 174 L183 174" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Friendly Smile with Teeth */}
          <path d="M168 184 Q180 196 192 184" fill="#FFFFFF" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />

          {/* HAIR (Chic Long Dark Hair with Soft Curls) */}
          <path
            d="M135 155 C132 120 145 96 180 96 C215 96 228 120 225 155 C232 165 235 190 230 220 C226 240 218 250 215 250 C215 230 222 195 218 175 C215 130 145 130 142 175 C138 195 145 230 145 250 C142 250 134 240 130 220 C125 190 128 165 135 155 Z"
            fill="url(#hairInterviewer)"
          />

          {/* HEADSET & BOOM MICROPHONE */}
          {/* Headset Over-Head Arch */}
          <path
            d="M132 170 C130 100 230 100 228 170"
            stroke="url(#headsetGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Earpiece (Chic Modern Teal/Cyan) */}
          <rect x="124" y="155" width="12" height="28" rx="6" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
          {/* Right Earpiece */}
          <rect x="224" y="155" width="12" height="28" rx="6" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />

          {/* Boom Microphone extending towards mouth */}
          <path
            d="M128 175 Q135 200 166 194"
            stroke="#0284C7"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Glowing Mic Tip */}
          <circle cx="168" cy="194" r="5" fill="#38BDF8" />
          <circle cx="168" cy="194" r="2.5" fill="#FFFFFF" />

          {/* Laptop Base in Front */}
          <path d="M120 315 L240 315 L255 340 L105 340 Z" fill="#1E293B" stroke="#475569" strokeWidth="2" rx="3" />
          <circle cx="180" cy="326" r="4" fill="#38BDF8" />
        </svg>
      </div>

      {/* Floating Badge */}
      <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-xs font-bold shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-purple-500" />
        <span>AI Senior Tech Interviewer Online</span>
      </div>
    </div>
  );
}
