import React, { useState } from "react";
import { useToast } from "./Toast";
import { ConfirmModal, Pagination, ProgressStepper, FeedbackWidget } from "./GlobalUX";

// ─── Section wrapper ──────────────────────────────────────────────────────────

function DSSection({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-5 scroll-mt-6">
      <div className="border-b border-slate-200 pb-2">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function DSCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-4">
      {title && <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{title}</div>}
      {children}
    </div>
  );
}

// ─── Color Swatch ─────────────────────────────────────────────────────────────

function Swatch({ name, hex, text = "white" }: { name: string; hex: string; text?: "white" | "dark" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-12 rounded-xl w-full border border-slate-100/50" style={{ background: hex }} />
      <div className="text-xs font-semibold text-slate-700">{name}</div>
      <div className="text-[10px] font-mono text-slate-400">{hex}</div>
    </div>
  );
}

// ─── Type Specimen ─────────────────────────────────────────────────────────────

const TYPE_SCALE = [
  { label: "Display", cls: "text-display", size: "48px / 800", sample: "AI Resume Analyzer" },
  { label: "H1", cls: "text-h1", size: "32px / 800", sample: "Your Resume Score" },
  { label: "H2", cls: "text-h2", size: "24px / 700", sample: "Skills Analysis" },
  { label: "H3", cls: "text-h3", size: "20px / 700", sample: "Professional Summary" },
  { label: "H4", cls: "text-h4", size: "17.6px / 600", sample: "ATS Keywords Found" },
  { label: "Body Large", cls: "text-body-lg", size: "16px / 400", sample: "Upload your resume and get an instant AI-powered analysis." },
  { label: "Body", cls: "text-body", size: "14px / 400", sample: "Your resume has been analyzed. Here are the AI recommendations." },
  { label: "Body Small", cls: "text-body-sm", size: "13px / 400", sample: "Resume uploaded successfully. AI analysis will complete shortly." },
  { label: "Caption", cls: "text-caption", size: "12px / 500", sample: "September 2026 · Software Engineer" },
  { label: "Label", cls: "text-label", size: "12px / 700 uppercase", sample: "AI Match Score" },
  { label: "Button", cls: "text-btn", size: "14px / 700", sample: "Analyze Resume" },
];

// ─── Spacing scale ────────────────────────────────────────────────────────────

const SPACING = [
  { name: "space-1", val: "4px", tw: "p-1 / gap-1" },
  { name: "space-2", val: "8px", tw: "p-2 / gap-2" },
  { name: "space-3", val: "12px", tw: "p-3 / gap-3" },
  { name: "space-4", val: "16px", tw: "p-4 / gap-4" },
  { name: "space-6", val: "24px", tw: "p-6 / gap-6" },
  { name: "space-8", val: "32px", tw: "p-8 / gap-8" },
  { name: "space-10", val: "40px", tw: "p-10 / gap-10" },
  { name: "space-12", val: "48px", tw: "p-12 / gap-12" },
  { name: "space-16", val: "64px", tw: "p-16 / gap-16" },
];

// ─── Radius scale ─────────────────────────────────────────────────────────────

const RADII = [
  { name: "xs", val: "4px", cls: "rounded" },
  { name: "sm", val: "8px", cls: "rounded-lg" },
  { name: "md", val: "12px", cls: "rounded-xl" },
  { name: "lg", val: "16px", cls: "rounded-2xl" },
  { name: "xl", val: "20px", cls: "rounded-[20px]" },
  { name: "2xl", val: "24px", cls: "rounded-3xl" },
  { name: "full", val: "9999px", cls: "rounded-full" },
];

// ─── Shadow scale ─────────────────────────────────────────────────────────────

const SHADOWS = [
  { name: "xs", cls: "shadow-sm", desc: "Subtle lift" },
  { name: "sm", cls: "shadow", desc: "Default card" },
  { name: "md", cls: "shadow-md", desc: "Floating element" },
  { name: "lg", cls: "shadow-lg", desc: "Modal / popover" },
  { name: "xl", cls: "shadow-xl", desc: "Command palette" },
];

// ─── Main component ────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navItems = [
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "spacing", label: "Spacing" },
    { id: "radius", label: "Radius & Shadow" },
    { id: "buttons", label: "Buttons" },
    { id: "inputs", label: "Inputs" },
    { id: "badges", label: "Badges & Chips" },
    { id: "cards", label: "Cards" },
    { id: "feedback", label: "Feedback" },
    { id: "data", label: "Data Display" },
    { id: "breakpoints", label: "Breakpoints" },
  ];

  return (
    <div className="flex flex-col gap-1">
      {/* Header */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Design System</h1>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">v1.0</span>
          </div>
          <p className="text-sm text-slate-500">AI Resume Analyzer · React + Tailwind CSS v4 · Plus Jakarta Sans + Inter</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">React 19</span>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">Tailwind v4</span>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">TypeScript 5.7</span>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">Vite 8</span>
        </div>
      </div>

      {/* Sticky nav */}
      <div className="bg-white border border-slate-100 rounded-2xl p-2 flex gap-1 overflow-x-auto sticky top-0 z-10 scroll-x">
        {navItems.map(n => (
          <a key={n.id} href={`#${n.id}`}
            className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-300">
            {n.label}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-8 mt-2">

        {/* ── Colors ── */}
        <DSSection title="Colors" id="colors">
          <DSCard title="Brand — Primary">
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-3">
              {[
                { name: "brand-50", hex: "#f0f4ff" },
                { name: "brand-100", hex: "#e0e9ff" },
                { name: "brand-200", hex: "#c2d3ff" },
                { name: "brand-500", hex: "#4f6ef7" },
                { name: "brand-600", hex: "#3b5bf5" },
                { name: "brand-700", hex: "#2a47e8" },
                { name: "gradient", hex: "→ purple-500" },
              ].map(s => (
                s.name === "gradient" ? (
                  <div key={s.name} className="flex flex-col gap-1.5">
                    <div className="h-12 rounded-xl w-full" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }} />
                    <div className="text-xs font-semibold text-slate-700">Gradient</div>
                    <div className="text-[10px] font-mono text-slate-400">brand → purple</div>
                  </div>
                ) : <Swatch key={s.name} name={s.name} hex={s.hex} />
              ))}
            </div>
          </DSCard>

          <DSCard title="Secondary — Purple">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { name: "purple-50", hex: "#f5f0ff" },
                { name: "purple-100", hex: "#ece4ff" },
                { name: "purple-200", hex: "#d8c5ff" },
                { name: "purple-500", hex: "#8b5cf6" },
                { name: "purple-600", hex: "#7c3aed" },
                { name: "purple-700", hex: "#6d28d9" },
              ].map(s => <Swatch key={s.name} name={s.name} hex={s.hex} />)}
            </div>
          </DSCard>

          <DSCard title="Semantic / Status">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "Success", hex: "#10b981", bg: "#ecfdf5" },
                { name: "Warning", hex: "#f59e0b", bg: "#fffbeb" },
                { name: "Error", hex: "#ef4444", bg: "#fef2f2" },
                { name: "Info", hex: "#3b82f6", bg: "#eff6ff" },
              ].map(s => (
                <div key={s.name} className="flex flex-col gap-2">
                  <div className="h-10 rounded-xl" style={{ background: s.hex }} />
                  <div className="h-8 rounded-xl border" style={{ background: s.bg }} />
                  <div className="text-xs font-semibold text-slate-700">{s.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">{s.hex}</div>
                </div>
              ))}
            </div>
          </DSCard>

          <DSCard title="Surface / Background">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { name: "white", hex: "#ffffff" },
                { name: "slate-25", hex: "#fafafe" },
                { name: "slate-50", hex: "#f8fafc" },
                { name: "slate-100", hex: "#f1f5f9" },
                { name: "slate-200", hex: "#e2e8f0" },
                { name: "slate-900", hex: "#0f172a" },
              ].map(s => <Swatch key={s.name} name={s.name} hex={s.hex} />)}
            </div>
          </DSCard>
        </DSSection>

        {/* ── Typography ── */}
        <DSSection title="Typography" id="typography">
          <DSCard>
            <div className="flex flex-col gap-6">
              {TYPE_SCALE.map(t => (
                <div key={t.label} className="flex flex-col gap-1 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider w-20 shrink-0">{t.label}</span>
                    <span className="text-[10px] text-slate-300 font-mono">{t.size}</span>
                  </div>
                  <div className={t.cls + " text-slate-900"}>{t.sample}</div>
                </div>
              ))}
            </div>
          </DSCard>

          <DSCard title="Font Families">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="text-xs text-slate-500 font-mono">--font-display: Plus Jakarta Sans</div>
                <div className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Resume AI</div>
                <div className="text-sm font-medium text-slate-600" style={{ fontFamily: "var(--font-display)" }}>400 · 500 · 600 · 700 · 800</div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="text-xs text-slate-500 font-mono">--font-body: Inter</div>
                <div className="text-2xl font-semibold text-slate-900">Resume AI</div>
                <div className="text-sm font-medium text-slate-600">400 · 500 · 600</div>
              </div>
            </div>
          </DSCard>
        </DSSection>

        {/* ── Spacing ── */}
        <DSSection title="Spacing" id="spacing">
          <DSCard>
            <div className="flex flex-col gap-3">
              {SPACING.map(s => (
                <div key={s.name} className="flex items-center gap-4">
                  <div className="text-xs font-mono text-slate-500 w-16 shrink-0">{s.val}</div>
                  <div className="bg-blue-500 rounded" style={{ width: s.val, height: "16px", minWidth: "4px" }} />
                  <div className="text-xs text-slate-400 font-mono">{s.tw}</div>
                </div>
              ))}
            </div>
          </DSCard>

          <DSCard title="Page Margins">
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span>Mobile (390px)</span><span className="font-mono text-slate-400">px-4 (16px)</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span>Tablet (1024px)</span><span className="font-mono text-slate-400">px-6 (24px)</span>
              </div>
              <div className="flex justify-between">
                <span>Desktop (1440px)</span><span className="font-mono text-slate-400">px-8, max-w-5xl (1280px)</span>
              </div>
            </div>
          </DSCard>
        </DSSection>

        {/* ── Radius & Shadow ── */}
        <DSSection title="Radius & Shadow" id="radius">
          <div className="grid sm:grid-cols-2 gap-4">
            <DSCard title="Border Radius">
              <div className="flex flex-col gap-3">
                {RADII.map(r => (
                  <div key={r.name} className="flex items-center gap-4">
                    <div className="text-xs font-mono text-slate-500 w-10 shrink-0">{r.name}</div>
                    <div className="w-16 h-8 bg-blue-100 border-2 border-blue-300 shrink-0" style={{ borderRadius: r.val }} />
                    <div className="text-xs text-slate-400">{r.val}</div>
                  </div>
                ))}
              </div>
            </DSCard>

            <DSCard title="Shadows">
              <div className="flex flex-col gap-4">
                {SHADOWS.map(s => (
                  <div key={s.name} className="flex items-center gap-4">
                    <div className="text-xs font-mono text-slate-500 w-6 shrink-0">{s.name}</div>
                    <div className={`w-20 h-10 bg-white rounded-xl shrink-0 ${s.cls}`} />
                    <div className="text-xs text-slate-400">{s.desc}</div>
                  </div>
                ))}
              </div>
            </DSCard>
          </div>
        </DSSection>

        {/* ── Buttons ── */}
        <DSSection title="Buttons" id="buttons">
          <DSCard title="Variants">
            <div className="flex flex-wrap gap-3 items-center">
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>Primary</button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 bg-white">Secondary</button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-blue-600 hover:bg-blue-50 bg-transparent">Ghost</button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500">Danger</button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white opacity-50 cursor-not-allowed bg-blue-400" disabled>Disabled</button>
            </div>
          </DSCard>

          <DSCard title="Sizes">
            <div className="flex flex-wrap gap-3 items-center">
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>Small</button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>Medium</button>
              <button className="px-7 py-3.5 rounded-xl text-base font-bold text-white" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>Large</button>
            </div>
          </DSCard>

          <DSCard title="With Icons / States">
            <div className="flex flex-wrap gap-3 items-center">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>
                Analyze Resume
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                Loading…
              </button>
              <button onClick={() => toast("success", "Button clicked!")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                Click me
              </button>
            </div>
          </DSCard>
        </DSSection>

        {/* ── Inputs ── */}
        <DSSection title="Inputs & Forms" id="inputs">
          <DSCard title="Text Inputs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Default</label>
                <input type="text" placeholder="Enter text…" className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Focused</label>
                <input type="text" defaultValue="Focused state" className="px-4 py-2.5 rounded-xl border border-blue-400 ring-2 ring-blue-100 text-sm outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Error</label>
                <input type="text" defaultValue="Invalid@" className="px-4 py-2.5 rounded-xl border border-red-400 ring-2 ring-red-100 text-sm outline-none" />
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Invalid email address
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Disabled</label>
                <input type="text" disabled placeholder="Disabled" className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-slate-50 text-slate-400 cursor-not-allowed" />
              </div>
            </div>
          </DSCard>

          <DSCard title="Select & Textarea">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Select</label>
                <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 bg-white">
                  <option>Software Engineer</option>
                  <option>Data Scientist</option>
                  <option>ML Engineer</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Textarea</label>
                <textarea rows={3} placeholder="Enter description…" className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none" />
              </div>
            </div>
          </DSCard>
        </DSSection>

        {/* ── Badges ── */}
        <DSSection title="Badges & Chips" id="badges">
          <DSCard title="Status Badges">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold bg-emerald-100 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-full">Shortlisted</span>
              <span className="text-xs font-semibold bg-amber-100 border border-amber-200 text-amber-800 px-2.5 py-1 rounded-full">Under Review</span>
              <span className="text-xs font-semibold bg-red-100 border border-red-200 text-red-700 px-2.5 py-1 rounded-full">Rejected</span>
              <span className="text-xs font-semibold bg-blue-100 border border-blue-200 text-blue-700 px-2.5 py-1 rounded-full">Processing</span>
              <span className="text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">Inactive</span>
              <span className="text-xs font-semibold bg-purple-100 border border-purple-200 text-purple-700 px-2.5 py-1 rounded-full">AI Suggestion</span>
            </div>
          </DSCard>

          <DSCard title="Skill Chips">
            <div>
              <div className="text-xs text-slate-500 mb-2">Matched</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Python", "SQL", "FastAPI", "Machine Learning", "Git"].map(s => (
                  <span key={s} className="flex items-center gap-1 text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-full">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {s}
                  </span>
                ))}
              </div>
              <div className="text-xs text-slate-500 mb-2">Missing</div>
              <div className="flex flex-wrap gap-1.5">
                {["AWS", "Docker", "System Design"].map(s => (
                  <span key={s} className="text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </DSCard>

          <DSCard title="Priority Badges">
            <div className="flex flex-wrap gap-2">
              {[
                { label: "High Priority", cls: "bg-red-100 text-red-700 border-red-200" },
                { label: "Medium Priority", cls: "bg-amber-100 text-amber-700 border-amber-200" },
                { label: "Low Priority", cls: "bg-slate-100 text-slate-600 border-slate-200" },
              ].map(b => (
                <span key={b.label} className={`text-xs font-bold px-2.5 py-1 rounded-full border ${b.cls}`}>{b.label}</span>
              ))}
            </div>
          </DSCard>
        </DSSection>

        {/* ── Cards ── */}
        <DSSection title="Cards" id="cards">
          <div className="grid sm:grid-cols-2 gap-4">
            <DSCard title="Score Card">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0">
                  <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#4f6ef7" strokeWidth="6"
                      strokeDasharray={163.4} strokeDashoffset={163.4 * 0.18} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-base font-extrabold text-slate-900">82</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Resume Score</div>
                  <div className="text-xs text-slate-500">Above average</div>
                </div>
              </div>
            </DSCard>

            <DSCard title="Stat Card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-slate-900">486</div>
                  <div className="text-sm text-slate-500 mt-0.5">Total Candidates</div>
                </div>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">↑ 12 today</span>
              </div>
            </DSCard>

            <DSCard title="Recommendation Card">
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-red-100 text-red-700 border-red-200 mt-0.5 shrink-0">High</span>
                <div>
                  <div className="text-sm font-semibold text-slate-800">Add measurable impact to experience</div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">Quantify your achievements to demonstrate real-world impact.</div>
                </div>
              </div>
            </DSCard>

            <DSCard title="Resume Card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-800 truncate">Susmita_Resume_v3.pdf</div>
                  <div className="text-xs text-slate-500">September 2026 · Score: 82/100</div>
                </div>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full shrink-0">Complete</span>
              </div>
            </DSCard>
          </div>
        </DSSection>

        {/* ── Feedback ── */}
        <DSSection title="Feedback Components" id="feedback">
          <div className="grid sm:grid-cols-2 gap-4">
            <DSCard title="Toast Messages">
              <div className="flex flex-col gap-2">
                {[
                  { type: "success" as const, msg: "Resume uploaded successfully." },
                  { type: "error" as const, msg: "Something went wrong. Please try again." },
                  { type: "warning" as const, msg: "Your resume has missing information." },
                  { type: "info" as const, msg: "Analysis is being processed." },
                ].map(t => (
                  <button key={t.type} onClick={() => toast(t.type, t.msg)}
                    className={`text-left px-4 py-2.5 rounded-xl border text-xs font-semibold transition-opacity hover:opacity-80 ${
                      t.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
                      t.type === "error" ? "bg-red-50 border-red-200 text-red-700" :
                      t.type === "warning" ? "bg-amber-50 border-amber-200 text-amber-800" :
                      "bg-blue-50 border-blue-200 text-blue-700"
                    }`}>
                    {t.type.charAt(0).toUpperCase() + t.type.slice(1)}: {t.msg}
                  </button>
                ))}
                <p className="text-xs text-slate-400 mt-1">Click to preview each toast</p>
              </div>
            </DSCard>

            <DSCard title="Confirm Modal">
              <div className="flex flex-col gap-3">
                <button onClick={() => setConfirmOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors">
                  Delete Resume…
                </button>
                <div className="text-xs text-slate-400">Opens a danger confirmation modal</div>
              </div>
            </DSCard>

            <DSCard title="Feedback Widget">
              <FeedbackWidget />
            </DSCard>

            <DSCard title="Progress Stepper">
              <ProgressStepper steps={[
                { label: "Upload", state: "completed" },
                { label: "Extract", state: "completed" },
                { label: "Analyze", state: "current" },
                { label: "Match", state: "upcoming" },
                { label: "Complete", state: "upcoming" },
              ]} />
            </DSCard>
          </div>
        </DSSection>

        {/* ── Data Display ── */}
        <DSSection title="Data Display" id="data">
          <DSCard title="Horizontal Progress Bar">
            <div className="flex flex-col gap-3">
              {[
                { label: "Resume Score", pct: 82, color: "bg-blue-500" },
                { label: "ATS Score", pct: 88, color: "bg-purple-500" },
                { label: "Job Match", pct: 79, color: "bg-emerald-500" },
                { label: "Skills Match", pct: 74, color: "bg-amber-400" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 w-28 shrink-0">{b.label}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${b.color} transition-all`} style={{ width: `${b.pct}%` }} />
                  </div>
                  <span className="text-sm font-bold text-slate-800 w-10 text-right shrink-0">{b.pct}%</span>
                </div>
              ))}
            </div>
          </DSCard>

          <DSCard title="Pagination">
            <Pagination page={currentPage} total={142} perPage={10} onChange={setCurrentPage} />
          </DSCard>

          <DSCard title="Empty States">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "📄", title: "No Resumes Yet", sub: "Upload your first resume to get started." },
                { icon: "💼", title: "No Job Matches", sub: "Add a target job role to see matching positions." },
                { icon: "⭐", title: "No Shortlisted Candidates", sub: "Screen candidates and shortlist the best matches." },
              ].map(e => (
                <div key={e.title} className="flex flex-col items-center gap-2 text-center bg-slate-50 rounded-xl px-4 py-6">
                  <div className="text-3xl">{e.icon}</div>
                  <div className="text-sm font-bold text-slate-700">{e.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{e.sub}</div>
                </div>
              ))}
            </div>
          </DSCard>
        </DSSection>

        {/* ── Breakpoints ── */}
        <DSSection title="Breakpoints & Responsive" id="breakpoints">
          <DSCard>
            <div className="flex flex-col gap-4">
              {[
                { bp: "Mobile", px: "390px", tw: "default (no prefix)", notes: "Single column, stacked nav, full-width cards" },
                { bp: "Tablet", px: "768px", tw: "md:", notes: "2-column grids, hamburger menu visible" },
                { bp: "Laptop", px: "1024px", tw: "lg:", notes: "Sidebar visible, 3-column grids" },
                { bp: "Desktop", px: "1280px+", tw: "xl:", notes: "Full layout, max-w-5xl content" },
              ].map(r => (
                <div key={r.bp} className="flex flex-col sm:flex-row sm:items-start gap-2 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 shrink-0 sm:w-48">
                    <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span className="text-sm font-bold text-slate-800">{r.bp}</span>
                    <span className="text-xs font-mono text-slate-500">{r.px}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mr-2">{r.tw}</span>
                    <span className="text-xs text-slate-500">{r.notes}</span>
                  </div>
                </div>
              ))}
            </div>
          </DSCard>

          <DSCard title="Product Screen Map">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Candidate Experience</div>
                <div className="flex flex-col gap-1">
                  {["Landing Page", "Auth (Login / Sign Up / Forgot / Verify)", "Onboarding (4 steps)", "Analyze Resume (Upload)", "Dashboard", "My Resumes", "Job Matches", "Recommendations", "AI Resume Copilot (8 views)", "Analysis Report"].map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs text-slate-600 py-1 border-b border-slate-50 last:border-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Recruiter Experience</div>
                <div className="flex flex-col gap-1">
                  {["Recruiter Login", "Recruiter Dashboard", "Job Openings", "Create Job", "Candidate Screening", "Candidate Detail", "Candidate Comparison", "Shortlisted", "Recruitment Reports", "Recruiter Settings"].map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs text-slate-600 py-1 border-b border-slate-50 last:border-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DSCard>

          <DSCard title="Tech Stack Reference">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Frontend", value: "React 19 + TypeScript 5.7 + Vite 8" },
                { label: "Styling", value: "Tailwind CSS v4 + CSS custom properties" },
                { label: "Fonts", value: "Plus Jakarta Sans (display) + Inter (body)" },
                { label: "State", value: "useState / useContext (React built-in)" },
                { label: "Routing", value: "State-based routing (no react-router)" },
                { label: "Icons", value: "Inline SVG (no external icon library)" },
                { label: "Notifications", value: "ToastProvider context + useToast()" },
                { label: "Dark Mode", value: "[data-theme=dark] CSS selector on <html>" },
              ].map(r => (
                <div key={r.label} className="flex flex-col gap-0.5 bg-slate-50 rounded-xl px-3 py-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{r.label}</span>
                  <span className="text-xs font-semibold text-slate-700 font-mono">{r.value}</span>
                </div>
              ))}
            </div>
          </DSCard>
        </DSSection>

      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete this resume?"
        message="This will remove the resume and its analysis history. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        danger
        onConfirm={() => { setConfirmOpen(false); toast("success", "Resume deleted."); }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
