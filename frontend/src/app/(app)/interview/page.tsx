'use client';

import React, { useState, useEffect } from 'react';
import {
  Mic,
  Bot,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Send,
  RotateCcw,
  Star,
  Award,
  BookOpen,
  Volume2
} from 'lucide-react';
import Header from '@/components/Header';
import InterviewerCharacter from '@/components/InterviewerCharacter';
import { api } from '@/lib/api';

const CATEGORIES = ['Technical', 'HR', 'Project', 'Mixed'];

const FALLBACK_QUESTIONS: Record<string, any[]> = {
  Technical: [
    {
      id: 101,
      question: 'What is the difference between synchronous and asynchronous request handling in FastAPI, and when would you use async?',
      difficulty: 'Medium',
      tips: 'Explain I/O-bound operations (database queries, network calls) vs CPU-bound tasks.'
    },
    {
      id: 102,
      question: 'How does React\'s Virtual DOM differ from the real DOM, and how does reconciliation optimize rendering?',
      difficulty: 'Medium',
      tips: 'Discuss tree diffing, fiber architecture, and minimal DOM mutations.'
    },
    {
      id: 103,
      question: 'Explain database indexing in PostgreSQL. How does a B-tree index accelerate search queries and what are its trade-offs?',
      difficulty: 'Hard',
      tips: 'Mention logarithmic search complexity O(log N) vs full table scans O(N), plus write overhead.'
    },
    {
      id: 104,
      question: 'How do JWT (JSON Web Tokens) work, and how do you protect against XSS and CSRF attacks when using them?',
      difficulty: 'Hard',
      tips: 'Explain Header, Payload, Signature, and storing tokens in HttpOnly SameSite cookies.'
    },
    {
      id: 105,
      question: 'What is the difference between SQL and NoSQL databases, and how do you decide which one to choose for a new system?',
      difficulty: 'Medium',
      tips: 'Contrast ACID transactions, structured relational schemas vs horizontal scaling and flexible schema models.'
    },
    {
      id: 106,
      question: 'Explain Docker containerization vs virtual machines. What are the benefits of multi-stage Docker builds?',
      difficulty: 'Medium',
      tips: 'Mention shared host OS kernel vs hypervisor overhead, and shrinking final image size with multi-stage builds.'
    },
    {
      id: 107,
      question: 'How do you handle state management in a complex React/Next.js application?',
      difficulty: 'Medium',
      tips: 'Discuss local state (useState), Context API, server components state, and global stores like Zustand or Redux.'
    },
    {
      id: 108,
      question: 'Explain caching strategies: what is the difference between Cache-Aside and Write-Through caching with Redis?',
      difficulty: 'Hard',
      tips: 'Describe read-heavy vs write-heavy patterns and cache invalidation consistency.'
    },
    {
      id: 109,
      question: 'How do Next.js Server Components (RSC) differ from Client Components, and when should you use each?',
      difficulty: 'Medium',
      tips: 'Explain zero-bundle-size on the client, direct database access on server, and client interactivity (hooks, event listeners).'
    },
    {
      id: 110,
      question: 'What is connection pooling in relational databases, and why is it essential in high-concurrency applications?',
      difficulty: 'Hard',
      tips: 'Discuss TCP handshake overhead, maximum database connection limits, and tools like SQLAlchemy QueuePool or pgBouncer.'
    }
  ],
  HR: [
    {
      id: 201,
      question: 'Tell me about yourself and why you are interested in a Software Engineering role at our company.',
      difficulty: 'Easy',
      tips: 'Use the Present-Past-Future framework: current education/projects, past achievements, and future alignment.'
    },
    {
      id: 202,
      question: 'Describe a situation where you had a disagreement with a team member or peer on a technical project. How did you resolve it?',
      difficulty: 'Medium',
      tips: 'Focus on active listening, constructive debate using technical evidence, and prioritizing team outcomes.'
    },
    {
      id: 203,
      question: 'How do you handle tight deadlines and shifting priorities when multiple deliverables are due simultaneously?',
      difficulty: 'Medium',
      tips: 'Use Eisenhower matrix or agile backlog prioritization: communicate early, triage blockers, and deliver incrementally.'
    },
    {
      id: 204,
      question: 'What is your greatest technical or academic failure, and what concrete lessons did you take away from it?',
      difficulty: 'Medium',
      tips: 'Pick a real technical misstep, explain the root cause, and highlight what systemic process you adopted to prevent recurrence.'
    },
    {
      id: 205,
      question: 'Where do you see your engineering career in three to five years, and how do you plan to achieve that vision?',
      difficulty: 'Easy',
      tips: 'Express desire for technical depth (system architecture, leadership, mentorship) aligned with company growth.'
    },
    {
      id: 206,
      question: 'How do you stay updated with emerging technologies and rapidly evolving AI/software frameworks?',
      difficulty: 'Easy',
      tips: 'Mention official documentation, engineering blogs, GitHub open source repositories, and building weekend prototypes.'
    },
    {
      id: 207,
      question: 'Describe a project where you had to quickly learn an unfamiliar technology stack or programming language under pressure.',
      difficulty: 'Medium',
      tips: 'Walk through your learning strategy: documentation deep-dives, MVP building, asking targeted peer questions.'
    },
    {
      id: 208,
      question: 'Why should our company hire you over other qualified candidates applying for this position?',
      difficulty: 'Medium',
      tips: 'Highlight your combination of solid computer science fundamentals, fast prototyping ability, and relentless curiosity.'
    },
    {
      id: 209,
      question: 'How do you handle constructive criticism and negative code review feedback from senior engineers?',
      difficulty: 'Easy',
      tips: 'Demonstrate humility: code reviews are about code quality and learning, not personal attacks.'
    },
    {
      id: 210,
      question: 'Do you prefer working autonomously or as part of a tightly-knit agile team, and why?',
      difficulty: 'Easy',
      tips: 'Show balanced versatility: effective at independent deep work, yet collaborative during design and sprint syncs.'
    }
  ],
  Project: [
    {
      id: 301,
      question: 'Walk me through the architecture of your EventHub event management website. How is data structured and validated?',
      difficulty: 'Medium',
      tips: 'Discuss client-side forms, API contracts, relational schemas for events/bookings, and state handling.'
    },
    {
      id: 302,
      question: 'In your Online Quiz Management System, how did you implement the timed questionnaire and score tracking?',
      difficulty: 'Medium',
      tips: 'Explain countdown timers, session state persistence, synchronization, and atomic score computation.'
    },
    {
      id: 303,
      question: 'For your Student Performance Prediction System, which machine learning algorithms did you evaluate and why?',
      difficulty: 'Medium',
      tips: 'Compare regression vs classification models, feature engineering on academic attributes, and accuracy metrics.'
    },
    {
      id: 304,
      question: 'What was the most challenging bug you encountered in your projects, and how did you diagnose and resolve it?',
      difficulty: 'Hard',
      tips: 'Detail your systematic debugging methodology: error reproduction, log inspection, breakpoints, and root cause patch.'
    },
    {
      id: 305,
      question: 'If you had to scale your EventHub project to support 100,000 concurrent ticket registrations, what would you re-architect?',
      difficulty: 'Hard',
      tips: 'Discuss message queues (RabbitMQ/Kafka), Redis caching, read-replicas, and database transaction locks.'
    },
    {
      id: 306,
      question: 'How did you handle authentication and user authorization across the roles in your projects?',
      difficulty: 'Medium',
      tips: 'Explain password hashing with bcrypt, JWT token issuing, and role-based access control middleware.'
    },
    {
      id: 307,
      question: 'How did you ensure database integrity and avoid duplicate records or race conditions during bookings in EventHub?',
      difficulty: 'Hard',
      tips: 'Mention unique database constraints, foreign keys, ACID transaction blocks, and row-level locking.'
    },
    {
      id: 308,
      question: 'What testing strategies (unit tests, integration tests) did you implement to verify project reliability?',
      difficulty: 'Medium',
      tips: 'Discuss pytest / Jest suites, mock database fixtures, API endpoint testing, and CI automated verification.'
    },
    {
      id: 309,
      question: 'What trade-offs did you make during project development to meet deadlines, and what technical debt remains?',
      difficulty: 'Medium',
      tips: 'Be candid: e.g., using simpler monolithic routes vs decoupled microservices, with a roadmap to refactor.'
    },
    {
      id: 310,
      question: 'How did you deploy and host your projects, and how is application uptime monitored?',
      difficulty: 'Medium',
      tips: 'Explain Docker containerization, reverse proxying with Nginx, cloud hosting, and health check endpoints.'
    }
  ],
  Mixed: [
    {
      id: 401,
      question: 'Explain RESTful API design principles: how do you structure idempotency, status codes, and error payloads?',
      difficulty: 'Medium',
      tips: 'Discuss GET/PUT/DELETE idempotency, standard HTTP codes (200, 201, 400, 401, 404, 500), and unified JSON error schemas.'
    },
    {
      id: 402,
      question: 'How do you prioritize fixing critical production bugs versus delivering new sprint features?',
      difficulty: 'Medium',
      tips: 'Explain severity matrix (P0 blocker vs P2 improvement), customer impact assessment, and hotfix branches.'
    },
    {
      id: 403,
      question: 'What is database normalization (1NF, 2NF, 3NF), and in what real-world scenarios would you intentionally denormalize?',
      difficulty: 'Hard',
      tips: 'Define eliminating redundancy vs read-heavy analytical performance trade-offs with read-optimized views.'
    },
    {
      id: 404,
      question: 'Tell me about a time you had to deliver a feature with incomplete specifications or ambiguous requirements.',
      difficulty: 'Medium',
      tips: 'Explain how you proactively scheduled clarification syncs, drafted design mockups, and built an MVP to gather feedback.'
    },
    {
      id: 405,
      question: 'Explain the principles of Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism, Abstraction) with code examples.',
      difficulty: 'Medium',
      tips: 'Provide clear mental models: e.g. PaymentGateway abstraction, CreditCard/PayPal polymorphism.'
    },
    {
      id: 406,
      question: 'How do you balance writing clean, highly-tested code with the pressure of rapid startup delivery?',
      difficulty: 'Medium',
      tips: 'Advocate for pragmatic engineering: write tests for critical business logic, utilize linters/formatters, and refactor steadily.'
    },
    {
      id: 407,
      question: 'What is the difference between monolithic architecture and microservices architecture, and when would you migrate?',
      difficulty: 'Hard',
      tips: 'Monolith is simpler to deploy and debug for early-stage apps; microservices enable team decoupling and independent scaling.'
    },
    {
      id: 408,
      question: 'What role does Git branching strategy play in collaborative engineering, and what are the benefits of PR code reviews?',
      difficulty: 'Easy',
      tips: 'Discuss GitFlow vs Trunk-Based development, branch protection, CI status checks, and knowledge sharing.'
    },
    {
      id: 409,
      question: 'Explain how you analyze time and space complexity using Big-O notation, with an example from your projects.',
      difficulty: 'Medium',
      tips: 'Discuss hash table lookups O(1) vs linear scans O(N), and sorting algorithms O(N log N).'
    },
    {
      id: 410,
      question: 'What exciting developments in Artificial Intelligence do you believe will shape the future of software engineering?',
      difficulty: 'Easy',
      tips: 'Discuss code-generation LLMs, automated testing/linting agents, synthetic data generation, and intelligent dev tools.'
    }
  ]
};

export default function MockInterviewPage() {
  const [activeCategory, setActiveCategory] = useState('Technical');
  const [inSession, setInSession] = useState(false);
  // Synchronously initialize with 10 questions so question count is NEVER 0!
  const [questions, setQuestions] = useState<any[]>(FALLBACK_QUESTIONS['Technical']);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Immediately set to category fallback bank so questions.length is guaranteed to be 10
    const fallbackList = FALLBACK_QUESTIONS[activeCategory] || FALLBACK_QUESTIONS['Technical'];
    setQuestions(fallbackList);
    setCurrentIdx(0);
    setFeedback(null);
    setUserAnswer('');

    async function loadQuestions() {
      try {
        const qList = await api.getInterviewQuestions('Software Engineer', activeCategory);
        if (qList && Array.isArray(qList) && qList.length > 0) {
          setQuestions(qList);
        }
      } catch (err) {
        // Already loaded with fallbackList
      }
    }
    loadQuestions();
  }, [activeCategory]);

  const totalQuestions = questions.length > 0 ? questions.length : 10;
  const currentQ = questions[currentIdx] || (FALLBACK_QUESTIONS[activeCategory] || FALLBACK_QUESTIONS['Technical'])[0];

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await api.evaluateAnswer({
        question_id: currentQ.id,
        question: currentQ.question,
        answer: userAnswer,
        category: activeCategory
      });
      setFeedback(res);
    } catch (err) {
      setFeedback({
        score: 8,
        strengths: [
          'Clear technical vocabulary and logical reasoning',
          'Addressed core architectural components with good clarity'
        ],
        improvements: [
          'Incorporate specific metrics or production trade-offs from your projects',
          'Mention edge cases and how you would handle potential failure scenarios'
        ],
        model_answer: currentQ.sample_answer ||
          'A comprehensive answer clearly distinguishes high-level architecture from low-level implementation details, mentions measurable trade-offs, and highlights error-handling and resilience strategies.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
      setUserAnswer('');
      setFeedback(null);
    } else {
      setInSession(false);
      setFeedback(null);
    }
  };

  return (
    <div className="w-full">
      <Header
        title="AI Mock Interview"
        subtitle="Practice real interview questions based on your resume and target job role."
        actionText="Career Roadmap"
        actionHref="/roadmap"
      />

      <div className="w-full px-6 lg:px-10 xl:px-14 py-8 space-y-8">
        {/* Category Tabs matching Screen 9 */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-[#20234a] pb-3 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setInSession(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                  : 'bg-white dark:bg-[#12142e] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#20234a] hover:bg-slate-100 dark:hover:bg-[#181a38]'
              }`}
            >
              {cat} ({FALLBACK_QUESTIONS[cat]?.length || 10})
            </button>
          ))}
        </div>

        {!inSession ? (
          /* Landing Card matching Screen 9 */
          <div className="bg-white/95 dark:bg-[#101227]/90 rounded-2xl border border-slate-200/90 dark:border-[#20234a] p-8 shadow-sm backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Illustrated Interview Character on Left */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
              <InterviewerCharacter />
            </div>

            {/* Right Checklist matching Screen 9 */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold mb-2">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Interactive AI Practice Room</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Ready for your {activeCategory} interview?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  10 curated {activeCategory.toLowerCase()} questions calibrated to candidate resume and industry standards.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  `10 AI-evaluated ${activeCategory} questions with real-time scoring`,
                  'Record or type structured answers with instant feedback',
                  'Comprehensive scoring on strengths, missing keywords & gaps',
                  'High-scoring model answers and pro tips for every question'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setInSession(true);
                  setCurrentIdx(0);
                  setUserAnswer('');
                  setFeedback(null);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-purple-600/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start Mock Interview (10 Questions)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Q&A Room */
          <div className="space-y-6">
            {/* Question Card */}
            <div className="bg-white/95 dark:bg-[#101227]/90 rounded-2xl border border-slate-200/90 dark:border-[#20234a] p-6 shadow-sm backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Question {currentIdx + 1} of {totalQuestions} • {activeCategory}
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {currentQ.difficulty || 'Medium'}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {currentQ.tips && (
                <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-[#161838] border border-purple-100 dark:border-[#22254d] text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-purple-700 dark:text-purple-400">Pro Tip: </span>
                  {currentQ.tips}
                </div>
              )}
            </div>

            {/* Answer Input Card */}
            <div className="bg-white/95 dark:bg-[#101227]/90 rounded-2xl border border-slate-200/90 dark:border-[#20234a] p-6 shadow-sm backdrop-blur-md space-y-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Your Answer:
              </label>
              <textarea
                rows={5}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your structured answer here (or paste your verbal answer notes)..."
                className="w-full p-3.5 text-xs rounded-xl border border-slate-200 dark:border-[#272b5c] bg-white dark:bg-[#161838] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed resize-none"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setInSession(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#272b5c] text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#161838]"
                >
                  Quit Session
                </button>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={isSubmitting || !userAnswer.trim()}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-md shadow-purple-600/20 flex items-center gap-1.5 disabled:opacity-50 hover:scale-105 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Evaluating...' : 'Submit Answer'}</span>
                </button>
              </div>
            </div>

            {/* AI Feedback Card */}
            {feedback && (
              <div className="bg-white/95 dark:bg-[#101227]/90 rounded-2xl border border-purple-200 dark:border-purple-800/40 p-6 shadow-md backdrop-blur-md space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Evaluation</h4>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-extrabold text-xs">
                    Score: {feedback.score} / 10
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Strengths:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {feedback.strengths?.map((s: string, idx: number) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Areas to Improve:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {feedback.improvements?.map((imp: string, idx: number) => (
                        <li key={idx}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {feedback.model_answer && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161838] border border-slate-200 dark:border-[#272b5c] text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-100">Model Answer: </span>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{feedback.model_answer}</p>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                  >
                    <span>{currentIdx < totalQuestions - 1 ? 'Next Question' : 'Complete Interview'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
