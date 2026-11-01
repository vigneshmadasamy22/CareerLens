import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScoreColor(score: number): string {
  if (score >= 85) return "text-emerald-500 border-emerald-500 bg-emerald-500/10";
  if (score >= 70) return "text-amber-500 border-amber-500 bg-amber-500/10";
  return "text-rose-500 border-rose-500 bg-rose-500/10";
}
