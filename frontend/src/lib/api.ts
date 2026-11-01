const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('careerlens-token');
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('careerlens-token', token);
  }
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('careerlens-token');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorDetail = 'An error occurred';
    try {
      const errJson = await res.json();
      errorDetail = errJson.detail || errJson.message || errorDetail;
    } catch {}
    throw new Error(errorDetail);
  }

  return res.json();
}

export const api = {
  // Auth
  login: (data: any) => request<any>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: any) => request<any>('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => request<any>('/api/auth/me'),
  updateProfile: (data: any) => request<any>('/api/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),
  uploadAvatar: (formData: FormData) => request<any>('/api/auth/avatar', { method: 'POST', body: formData }),

  // Dashboard
  getDashboardSummary: () => request<any>('/api/dashboard/summary'),

  // Resumes
  getResumes: () => request<any[]>('/api/resumes'),
  getResume: (id: string | number) => request<any>(`/api/resumes/${id}`),
  createResume: (data: any) => request<any>('/api/resumes', { method: 'POST', body: JSON.stringify(data) }),
  updateResume: (id: string | number, data: any) => request<any>(`/api/resumes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteResume: (id: string | number) => request<any>(`/api/resumes/${id}`, { method: 'DELETE' }),
  exportPdfUrl: (id: string | number) => `/api/resumes/${id}/export/pdf`,
  exportDocxUrl: (id: string | number) => `/api/resumes/${id}/export/docx`,

  // Analyzer
  getAnalyses: () => request<any[]>('/api/analyzer'),
  getAnalysis: (id: string | number) => request<any>(`/api/analyzer/${id}`),
  uploadAndAnalyze: (formData: FormData) => request<any>('/api/analyzer/upload-and-analyze', { method: 'POST', body: formData }),
  downloadReportUrl: (id: string | number) => `/api/analyzer/${id}/download-report`,
  applySuggestion: (analysisId: string | number, data: any) =>
    request<any>(`/api/analyzer/${analysisId}/apply-suggestion`, { method: 'POST', body: JSON.stringify(data) }),
  downloadImprovedPdfUrl: (analysisId: string | number) => `/api/analyzer/${analysisId}/download-improved-pdf`,

  // Job Tracker
  getJobs: () => request<any[]>('/api/jobs'),
  getJobStats: () => request<any>('/api/jobs/stats'),
  createJob: (data: any) => request<any>('/api/jobs', { method: 'POST', body: JSON.stringify(data) }),
  updateJob: (id: string | number, data: any) => request<any>(`/api/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteJob: (id: string | number) => request<any>(`/api/jobs/${id}`, { method: 'DELETE' }),

  // Mock Interviews
  getInterviewQuestions: (role: string = 'Software Engineer', category: string = 'Technical') =>
    request<any[]>(`/api/interviews/questions?role=${encodeURIComponent(role)}&category=${encodeURIComponent(category)}`),
  evaluateAnswer: (data: any) => request<any>('/api/interviews/evaluate', { method: 'POST', body: JSON.stringify(data) }),

  // Roadmap
  getRoadmap: () => request<any>('/api/roadmap'),

  // Templates
  getTemplates: (category?: string) => request<any[]>(`/api/templates${category ? `?category=${category}` : ''}`),
  getTemplate: (id: string) => request<any>(`/api/templates/${id}`),

  // AI Assistant
  generateSummary: (data: any) => request<any>('/api/ai/generate-summary', { method: 'POST', body: JSON.stringify(data) }),
  improveBullet: (data: any) => request<any>('/api/ai/improve-bullet', { method: 'POST', body: JSON.stringify(data) }),
  recommendSkills: (data: any) => request<any>('/api/ai/recommend-skills', { method: 'POST', body: JSON.stringify(data) }),
  truthChecker: (data: any) => request<any>('/api/ai/truth-checker', { method: 'POST', body: JSON.stringify(data) }),
  projectAnalyzer: (data: any) => request<any>('/api/ai/project-analyzer', { method: 'POST', body: JSON.stringify(data) }),
  recruiterPerspective: (data: any) => request<any>('/api/ai/recruiter-perspective', { method: 'POST', body: JSON.stringify(data) }),
};
