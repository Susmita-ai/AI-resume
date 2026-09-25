import React, { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "./Toast";

// ─── Confirm Modal ─────────────────────────────────────────────────────────────

export interface ConfirmModalProps {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ open, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", danger = false, onConfirm, onCancel }: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 w-full max-w-sm flex flex-col gap-4 animate-[modal-in_0.18s_ease-out]">
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${danger ? "bg-red-50" : "bg-blue-50"}`}>
            {danger ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
            {message && <p className="text-sm text-slate-500 mt-1 leading-relaxed">{message}</p>}
          </div>
        </div>
        <div className="flex gap-2.5 pt-1">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">
            {cancelLabel}
          </button>
          <button onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-1 ${danger ? "bg-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
            style={danger ? {} : { background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Command Palette ──────────────────────────────────────────────────────────

type Action = { label: string; icon: React.ReactNode; shortcut?: string; onSelect: () => void; group?: string };

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  actions: Action[];
}

export function CommandPalette({ open, onClose, actions }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
    : actions;

  useEffect(() => { if (open) { setQuery(""); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50); } }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === "Enter") { e.preventDefault(); filtered[selected]?.onSelect(); onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, onClose]);

  useEffect(() => { setSelected(0); }, [query]);

  if (!open) return null;

  const groups = Array.from(new Set(filtered.map(a => a.group ?? "Actions")));

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[3px]" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <svg className="text-slate-400 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search resumes, jobs, or candidates..."
            className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent" />
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto py-1.5">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <div className="text-sm font-semibold text-slate-600">No matching results found.</div>
              <div className="text-xs text-slate-400 mt-1">Try a different keyword.</div>
            </div>
          ) : groups.map(group => (
            <div key={group}>
              <div className="px-4 pt-2 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wide">{group}</div>
              {filtered.filter(a => (a.group ?? "Actions") === group).map((action, i) => {
                const globalIdx = filtered.indexOf(action);
                return (
                  <button key={i} onClick={() => { action.onSelect(); onClose(); }}
                    onMouseEnter={() => setSelected(globalIdx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${globalIdx === selected ? "bg-blue-50" : "hover:bg-slate-50"}`}>
                    <span className={`shrink-0 ${globalIdx === selected ? "text-blue-600" : "text-slate-400"}`}>{action.icon}</span>
                    <span className={`flex-1 text-sm font-medium ${globalIdx === selected ? "text-blue-700" : "text-slate-700"}`}>{action.label}</span>
                    {action.shortcut && (
                      <kbd className="hidden sm:block text-[10px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{action.shortcut}</kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 px-4 py-2.5 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <kbd className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">↑↓</kbd> navigate
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <kbd className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">↵</kbd> select
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <kbd className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">Esc</kbd> close
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── User Menu ─────────────────────────────────────────────────────────────────

interface UserMenuProps {
  name: string;
  email: string;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export function UserMenu({ name, email, onNavigate, onSignOut, isDark, onToggleDark }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const items = [
    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label: "Profile", page: "profile" },
    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, label: "Settings", page: "settings" },
    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>, label: "My Resumes", page: "my-resumes" },
    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>, label: "Help", page: "help" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-opacity hover:opacity-90"
        style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}
        aria-label={`User menu for ${name}`}
        aria-expanded={open}>
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100]">
          {/* User info */}
          <div className="px-4 py-3.5 border-b border-slate-100">
            <div className="text-sm font-bold text-slate-900">{name}</div>
            <div className="text-xs text-slate-500 mt-0.5 truncate">{email}</div>
          </div>

          {/* Nav items */}
          <div className="py-1">
            {items.map(item => (
              <button key={item.label} onClick={() => { onNavigate(item.page); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left focus:outline-none focus:bg-blue-50 focus:text-blue-700">
                <span className="text-slate-400">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Dark mode toggle */}
          {onToggleDark !== undefined && (
            <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-slate-700 font-medium">Dark Mode</span>
              <button onClick={() => { onToggleDark(); }}
                className={`relative w-10 rounded-full transition-colors shrink-0 ${isDark ? "bg-blue-600" : "bg-slate-200"}`}
                style={{ height: "22px" }}>
                <div className={`absolute top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${isDark ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          )}

          {/* Sign out */}
          <div className="border-t border-slate-100 py-1">
            <button onClick={() => { onSignOut(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left focus:outline-none focus:bg-red-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Help Panel ────────────────────────────────────────────────────────────────

interface HelpPanelProps {
  open: boolean;
  onClose: () => void;
}

export function HelpPanel({ open, onClose }: HelpPanelProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const categories = [
    { label: "Getting Started", icon: "🚀" },
    { label: "Resume Analysis", icon: "📊" },
    { label: "ATS Score", icon: "🎯" },
    { label: "Job Matching", icon: "💼" },
    { label: "AI Copilot", icon: "✨" },
    { label: "Reports", icon: "📄" },
    { label: "Account", icon: "👤" },
  ];

  const articles: Record<string, { title: string; summary: string }[]> = {
    "Getting Started": [
      { title: "How to upload your resume", summary: "Drag and drop or click to upload a PDF or DOCX file." },
      { title: "Understanding your analysis report", summary: "Your report covers ATS score, job match, skills, and recommendations." },
    ],
    "Resume Analysis": [
      { title: "What does the AI analyze?", summary: "The AI reads your resume content and compares it against best practices and job requirements." },
      { title: "How accurate is the AI?", summary: "Scores are generated from your resume text and should be used as guidance, not a guarantee." },
    ],
    "ATS Score": [
      { title: "What is an ATS score?", summary: "ATS (Applicant Tracking System) score measures how well your resume is formatted for automated screening." },
      { title: "How to improve your ATS score", summary: "Use standard headings, avoid tables or graphics, and include relevant keywords." },
    ],
    "AI Copilot": [
      { title: "Using the AI Copilot", summary: "Select any resume section and click Generate Improvement to get AI suggestions." },
      { title: "Applying AI suggestions", summary: "Review the suggested change and click Apply to update your resume." },
    ],
  };

  const cat = activeCategory || "Getting Started";
  const catArticles = articles[cat] ?? [];

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[250] flex">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-base font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>How can we help?</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Close help panel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b border-slate-100">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search help articles..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Categories */}
          <div className="px-5 py-3 grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <button key={cat.label} onClick={() => setActiveCategory(cat.label)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all text-sm border ${activeCategory === cat.label ? "border-transparent text-white font-semibold" : "border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50"}`}
                style={activeCategory === cat.label ? { background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" } : {}}>
                <span>{cat.icon}</span>
                <span className="text-xs font-medium leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Articles */}
          {catArticles.length > 0 && (
            <div className="px-5 pb-3 flex flex-col gap-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{cat}</div>
              {catArticles.map(a => (
                <button key={a.title} className="text-left bg-slate-50 rounded-xl px-4 py-3 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <div className="text-sm font-semibold text-slate-800">{a.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{a.summary}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-5 py-4 flex flex-col gap-2">
          {!feedbackSent ? (
            <button onClick={() => setFeedbackSent(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Contact Support
            </button>
          ) : (
            <div className="text-center text-sm text-emerald-600 font-semibold py-1">✓ Message sent! We'll get back to you soon.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Feedback Widget ───────────────────────────────────────────────────────────

export function FeedbackWidget() {
  const { toast } = useToast();
  const [state, setState] = useState<"idle" | "negative" | "done">("idle");
  const [comment, setComment] = useState("");

  const submit = () => {
    toast("success", "Thank you for your feedback!");
    setState("done");
  };

  if (state === "done") {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold py-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Thanks for your feedback!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-slate-700">Was this analysis helpful?</p>
      {state === "idle" && (
        <div className="flex gap-2">
          <button onClick={() => { toast("success", "Thank you! We're glad it was helpful."); setState("done"); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300">
            👍 Yes
          </button>
          <button onClick={() => setState("negative")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300">
            👎 No
          </button>
        </div>
      )}
      {state === "negative" && (
        <div className="flex flex-col gap-2">
          <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3}
            placeholder="Tell us what could be improved..."
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none" />
          <div className="flex gap-2">
            <button onClick={() => setState("idle")} className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={submit}
              className="flex-1 py-2 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Error Pages ──────────────────────────────────────────────────────────────

type ErrorPageType = "404" | "500" | "offline";

interface ErrorPageProps {
  type?: ErrorPageType;
  onBack: () => void;
  onRetry?: () => void;
}

export function ErrorPage({ type = "404", onBack, onRetry }: ErrorPageProps) {
  const config = {
    "404": {
      emoji: "🔍",
      title: "Page Not Found",
      message: "The page you're looking for doesn't exist.",
      showRetry: false,
    },
    "500": {
      emoji: "⚡",
      title: "Something Went Wrong",
      message: "Something unexpected happened. Please try again.",
      showRetry: true,
    },
    offline: {
      emoji: "📡",
      title: "You're Offline",
      message: "Check your internet connection and try again.",
      showRetry: true,
    },
  };

  const { emoji, title, message, showRetry } = config[type];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-5 text-center max-w-sm">
        <div className="text-6xl">{emoji}</div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{title}</h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3">
          {showRetry && onRetry && (
            <button onClick={onRetry}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
              Try Again
            </button>
          )}
          <button onClick={onBack}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-white transition-colors">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface PaginationProps {
  page: number;
  total: number;
  perPage?: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, total, perPage = 10, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-xs text-slate-500">Showing {from}–{to} of {total} results</p>
      <div className="flex items-center gap-1">
        <button onClick={() => onChange(page - 1)} disabled={page === 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Previous
        </button>
        {pages.map((p, i) => (
          p === "…" ? (
            <span key={i} className="w-8 text-center text-xs text-slate-400">…</span>
          ) : (
            <button key={i} onClick={() => onChange(p as number)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 ${p === page ? "text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              style={p === page ? { background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" } : {}}>
              {p}
            </button>
          )
        ))}
        <button onClick={() => onChange(page + 1)} disabled={page === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-300">
          Next
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Progress Stepper ─────────────────────────────────────────────────────────

type StepState = "completed" | "current" | "upcoming" | "failed";

interface Step { label: string; state: StepState }

export function ProgressStepper({ steps }: { steps: Step[] }) {
  return (
    <div className="flex items-center gap-0 w-full overflow-x-auto">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              step.state === "completed" ? "bg-emerald-500" :
              step.state === "current" ? "bg-blue-600 ring-4 ring-blue-100" :
              step.state === "failed" ? "bg-red-500" :
              "bg-slate-200"
            }`}>
              {step.state === "completed" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : step.state === "failed" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : step.state === "current" ? (
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              ) : (
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full" />
              )}
            </div>
            <span className={`text-[10px] font-semibold whitespace-nowrap ${
              step.state === "completed" ? "text-emerald-600" :
              step.state === "current" ? "text-blue-600" :
              step.state === "failed" ? "text-red-500" :
              "text-slate-400"
            }`}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-1 mb-4 transition-colors ${
              step.state === "completed" ? "bg-emerald-400" :
              step.state === "failed" ? "bg-red-300" : "bg-slate-200"
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Cmd+K hook ───────────────────────────────────────────────────────────────

export function useCmdK(onOpen: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); onOpen(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpen]);
}
