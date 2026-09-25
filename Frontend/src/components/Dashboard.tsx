import React, { useState } from "react";
import { useToast } from "./Toast";
import {
  IconSparkles, IconArrowRight, IconCheck, IconX, IconArrowLeft,
  PrimaryButton, SecondaryButton, Tag,
} from "./ui";

// ─── Sidebar Icons ────────────────────────────────────────────────────────────

function IcoGrid() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
}
function IcoSearch() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
}
function IcoFolder() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
}
function IcoTarget() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}
function IcoStars() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2-3.09 6.26L2 9.27l5 4.87-1.18 6.88L12 17.77l6.18 3.25L17 14.14 22 9.27l-6.91-1.01z"/></svg>;
}
function IcoUser() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function IcoSettings() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function IcoBell() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
}
function IcoDownload() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
}
function IcoRefresh() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>;
}
function IcoAlertTriangle() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
}
function IcoPlus() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
}

// ─── Reusable primitives ──────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 ${className}`}
      style={{ boxShadow: "0 2px 16px -4px rgba(15,23,42,0.07)" }}>
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h3 className="font-bold text-slate-900 text-base" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function ProgressBar({ value, color = "#4f6ef7", bg = "#f1f5f9", height = 6 }: {
  value: number; color?: string; bg?: string; height?: number;
}) {
  return (
    <div className="rounded-full overflow-hidden" style={{ height, background: bg }}>
      <div className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function SkillChip({ label, matched = true }: { label: string; matched?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
      matched
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-red-50 text-red-600 border-red-200"
    }`}>
      {matched
        ? <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        : <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><line x1="9" y1="3" x2="3" y2="9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="3" x2="9" y2="9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/></svg>
      }
      {label}
    </span>
  );
}

// ─── Circular Score ────────────────────────────────────────────────────────────

function CircularScore({ score, max = 100, size = 120, strokeWidth = 8, color = "#4f6ef7" }: {
  score: number; max?: number; size?: number; strokeWidth?: number; color?: string;
}) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / max);
  const cx = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cx})`}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
    </svg>
  );
}

// ─── Inner page imports ───────────────────────────────────────────────────────

import MyResumesPage from "./MyResumesPage";
import JobMatchesPage from "./JobMatchesPage";
import RecommendationsPage from "./RecommendationsPage";
import { ProfilePage, SettingsPage } from "./ProfileSettingsPage";
import CopilotPage from "./CopilotPage";
import { CommandPalette, UserMenu, HelpPanel, ConfirmModal, useCmdK } from "./GlobalUX";
import DesignSystemPage from "./DesignSystemPage";

type DashPage = "dashboard" | "my-resumes" | "job-matches" | "recommendations" | "copilot" | "profile" | "settings" | "design-system";

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function SidebarLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="url(#sb-logo2)"/>
      <path d="M8 20L12 8L16 16L18 12L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="9" r="2.5" fill="white" fillOpacity="0.9"/>
      <defs>
        <linearGradient id="sb-logo2" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f6ef7"/><stop offset="1" stopColor="#8b5cf6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function NavItems({ activePage, onNavigate }: { activePage: DashPage; onNavigate: (p: DashPage) => void }) {
  const items: { icon: React.ReactNode; label: string; page: DashPage | null }[] = [
    { icon: <IcoGrid />, label: "Dashboard", page: "dashboard" },
    { icon: <IcoSearch />, label: "Analyze Resume", page: null },
    { icon: <IcoFolder />, label: "My Resumes", page: "my-resumes" },
    { icon: <IcoTarget />, label: "Job Matches", page: "job-matches" },
    { icon: <IcoStars />, label: "Recommendations", page: "recommendations" },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, label: "AI Copilot", page: "copilot" },
    { icon: <IcoUser />, label: "Profile", page: "profile" },
    { icon: <IcoSettings />, label: "Settings", page: "settings" },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, label: "Design System", page: "design-system" },
  ];
  return (
    <>
      {items.map(({ icon, label, page }) => {
        const active = page === activePage;
        return (
          <button key={label}
            onClick={() => page && onNavigate(page)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
              active ? "text-blue-700 font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            } ${!page ? "opacity-50 cursor-default" : ""}`}
            style={active ? { background: "linear-gradient(135deg, #eff3ff, #f0e8ff)" } : {}}
          >
            <span className={active ? "text-blue-600" : "text-slate-400"}>{icon}</span>
            {label}
            {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
          </button>
        );
      })}
    </>
  );
}

function Sidebar({ onBack, activePage, onNavigate }: { onBack: () => void; activePage: DashPage; onNavigate: (p: DashPage) => void }) {
  return (
    <aside aria-label="Main navigation"
      className="fixed top-0 left-0 h-screen w-56 flex flex-col bg-white border-r border-slate-100 z-40"
      style={{ boxShadow: "2px 0 12px -4px rgba(15,23,42,0.06)" }}>
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100 shrink-0">
        <SidebarLogo />
        <span className="font-extrabold text-slate-900 text-sm leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          AI Resume<br />Analyzer
        </span>
      </div>

      <nav aria-label="Site navigation" className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
        <NavItems activePage={activePage} onNavigate={onNavigate} />
      </nav>

      <div className="px-3 pb-2">
        <button onClick={onBack}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-blue-600 transition-colors px-3 py-2 w-full rounded-xl hover:bg-slate-50">
          <IcoGrid /><span>← Back to Home</span>
        </button>
      </div>

      <div className="border-t border-slate-100 px-4 py-4 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>SY</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-800 truncate" style={{ fontFamily: "var(--font-display)" }}>Susmita Yadav</p>
          <button className="text-[10px] text-blue-500 hover:underline font-medium">View Profile</button>
        </div>
      </div>
    </aside>
  );
}

// ─── Mobile Nav ───────────────────────────────────────────────────────────────

function MobileNav({ activePage, onNavigate, onBack }: { activePage: DashPage; onNavigate: (p: DashPage) => void; onBack: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 h-14 flex items-center justify-between px-4"
        style={{ boxShadow: "0 1px 8px -2px rgba(15,23,42,0.08)" }}>
        <button onClick={onBack} className="flex items-center gap-2">
          <SidebarLogo />
          <span className="font-extrabold text-slate-900 text-sm" style={{ fontFamily: "var(--font-display)" }}>AI Resume Analyzer</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 relative">
            <IcoBell />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-white" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>SY</button>
          <button onClick={() => setOpen(!open)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100">
            {open
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 flex" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative ml-auto w-64 h-full bg-white shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-4 py-5 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Navigation</p>
            </div>
            <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5">
              <NavItems activePage={activePage} onNavigate={p => { onNavigate(p); setOpen(false); }} />
            </nav>
            <div className="px-4 py-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>SY</div>
              <div>
                <p className="text-xs font-bold text-slate-800">Susmita Yadav</p>
                <button className="text-[10px] text-blue-500 font-medium">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Section 1 — Hero Score ───────────────────────────────────────────────────

function HeroScoreCard() {
  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Circle + score */}
        <div className="relative shrink-0">
          <CircularScore score={82} size={140} strokeWidth={10} color="#4f6ef7" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-slate-900 leading-none" style={{ fontFamily: "var(--font-display)" }}>82</span>
            <span className="text-xs text-slate-400 font-medium">/ 100</span>
          </div>
        </div>

        {/* Score detail */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>AI Resume Score</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">Good</span>
          </div>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            Your resume is strong, but there are a few areas you can improve to make it stand out.
          </p>

          {/* +8 points possible */}
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50/50 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <IconSparkles size={14} />
            </div>
            <div>
              <span className="text-sm font-bold text-blue-800">+8 points possible</span>
              <span className="text-xs text-slate-500 ml-1.5">with recommended improvements</span>
            </div>
          </div>

          {/* Mini score bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "ATS", v: 88, color: "#8b5cf6" },
              { label: "Job Match", v: 79, color: "#0ea5e9" },
              { label: "Skills", v: 85, color: "#10b981" },
              { label: "Quality", v: 82, color: "#f59e0b" },
            ].map(s => (
              <div key={s.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-500 font-medium">{s.label}</span>
                  <span className="text-xs font-bold" style={{ color: s.color }}>{s.v}%</span>
                </div>
                <ProgressBar value={s.v} color={s.color} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Section 2 — Key Score Cards ─────────────────────────────────────────────

const KEY_SCORES = [
  { label: "ATS Compatibility", score: 88, unit: "/100", sub: "Strong ATS readability", color: "#8b5cf6", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> },
  { label: "Job Match", score: 79, unit: "%", sub: "Good alignment with target role", color: "#0ea5e9", icon: <IcoTarget /> },
  { label: "Skills Match", score: 85, unit: "%", sub: "Most required skills detected", color: "#10b981", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { label: "Resume Quality", score: 82, unit: "/100", sub: "Strong overall structure", color: "#f59e0b", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg> },
];

function KeyScoreCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {KEY_SCORES.map(s => (
        <Card key={s.label} className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100">{s.icon}</div>
            <div className="text-right">
              <div className="flex items-end gap-0.5">
                <span className="text-2xl font-extrabold" style={{ color: s.color, fontFamily: "var(--font-display)" }}>{s.score}</span>
                <span className="text-xs text-slate-400 mb-0.5 font-medium">{s.unit}</span>
              </div>
            </div>
          </div>
          <ProgressBar value={s.score} color={s.color} height={5} />
          <p className="text-xs font-semibold text-slate-800 mt-2.5 mb-0.5" style={{ fontFamily: "var(--font-display)" }}>{s.label}</p>
          <p className="text-xs text-slate-400 leading-relaxed">{s.sub}</p>
        </Card>
      ))}
    </div>
  );
}

// ─── Section 3 — Job Match Analysis ──────────────────────────────────────────

const MATCHED_SKILLS = ["Python", "Machine Learning", "SQL", "Pandas", "Scikit-learn", "FastAPI", "Git", "Data Analysis"];
const MISSING_SKILLS = ["Docker", "AWS", "React", "System Design"];
const MATCHED_KW = ["software engineer", "data pipeline", "model deployment", "API development", "version control"];
const MISSING_KW = ["cloud infrastructure", "containerization", "distributed systems", "CI/CD"];

function JobMatchCard() {
  return (
    <Card className="p-6">
      <CardHeader title="Job Match Analysis" subtitle="How well your resume aligns with the target role"
        action={
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors">
            View Full Job Match <IconArrowRight size={13} />
          </button>
        }
      />

      {/* Big match indicator */}
      <div className="flex items-center gap-5 mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
        <div className="relative shrink-0">
          <CircularScore score={79} size={80} strokeWidth={7} color="#0ea5e9" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>79%</span>
          </div>
        </div>
        <div>
          <div className="text-base font-bold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-display)" }}>Job Match Score</div>
          <div className="text-sm text-slate-500">Good alignment with Software Engineer at Amazon</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">{MATCHED_SKILLS.length} skills matched</span>
            <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">{MISSING_SKILLS.length} skills missing</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Matching skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><IconCheck size={11} /></div>
            <span className="text-sm font-bold text-slate-800" style={{ fontFamily: "var(--font-display)" }}>Matching Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {MATCHED_SKILLS.map(s => <SkillChip key={s} label={s} matched />)}
          </div>
        </div>

        {/* Missing skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500"><IconX size={11} /></div>
            <span className="text-sm font-bold text-slate-800" style={{ fontFamily: "var(--font-display)" }}>Missing Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {MISSING_SKILLS.map(s => <SkillChip key={s} label={s} matched={false} />)}
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="mt-5 pt-5 border-t border-slate-100 grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Matched Keywords</p>
          <div className="flex flex-wrap gap-1.5">
            {MATCHED_KW.map(k => <span key={k} className="inline-block px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">{k}</span>)}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Missing Keywords</p>
          <div className="flex flex-wrap gap-1.5">
            {MISSING_KW.map(k => <span key={k} className="inline-block px-2 py-0.5 rounded-md text-xs font-medium bg-orange-50 text-orange-600 border border-orange-200">{k}</span>)}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Section 4 — Skills Analysis ─────────────────────────────────────────────

const SKILL_BARS = [
  { name: "Python", value: 90, category: "Technical" },
  { name: "Machine Learning", value: 88, category: "Technical" },
  { name: "Pandas", value: 85, category: "Technical" },
  { name: "SQL", value: 82, category: "Technical" },
  { name: "FastAPI", value: 75, category: "Frameworks" },
  { name: "React", value: 60, category: "Frameworks" },
  { name: "Git", value: 88, category: "Tools" },
  { name: "Scikit-learn", value: 80, category: "Frameworks" },
];

const SKILL_TABS = ["All", "Technical", "Tools", "Frameworks", "Soft Skills"];

function SkillBar({ name, value, color }: { name: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-700 font-medium w-32 shrink-0 truncate">{name}</span>
      <div className="flex-1">
        <ProgressBar value={value} color={color} height={8} bg="#f1f5f9" />
      </div>
      <span className="text-xs font-bold w-10 text-right" style={{ color }}>{value}%</span>
    </div>
  );
}

function SkillsAnalysisCard() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? SKILL_BARS
    : SKILL_BARS.filter(s => s.category === activeTab);

  const barColors = ["#4f6ef7", "#8b5cf6", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"];

  return (
    <Card className="p-6">
      <CardHeader title="Skills Analysis" subtitle="Proficiency levels detected from your resume" />

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-slate-100 p-1 rounded-xl w-fit">
        {SKILL_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-4 mb-6">
        {filtered.map((s, i) => <SkillBar key={s.name} name={s.name} value={s.value} color={barColors[i % barColors.length]} />)}
      </div>

      {/* Top detected skills */}
      <div className="pt-5 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Top Skills Detected</p>
        <div className="flex flex-wrap gap-1.5">
          {["Python", "Machine Learning", "SQL", "Pandas", "FastAPI", "Git", "Scikit-learn", "Data Analysis"].map(s => (
            <span key={s} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">{s}</span>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── Section 5 — Resume Breakdown ─────────────────────────────────────────────

function BreakdownCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Education */}
      <Card className="p-5">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Education</h4>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">Detected</span>
        </div>
        <p className="text-xs font-semibold text-slate-700 mb-0.5">B.Tech CSE (AI)</p>
        <p className="text-xs text-slate-400 leading-snug">Babu Banarasi Das University</p>
        <div className="mt-3 pt-3 border-t border-slate-100">
          <ProgressBar value={90} color="#4f6ef7" height={4} />
          <p className="text-[10px] text-slate-400 mt-1">Relevance score</p>
        </div>
      </Card>

      {/* Experience */}
      <Card className="p-5">
        <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" x2="12" y1="12" y2="12"/><path d="M8 12h.01M16 12h.01"/></svg>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h4 className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Experience</h4>
          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-200">Good</span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {["Experience detected", "Relevant keywords", "Action verbs used"].map(item => (
            <li key={item} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="text-emerald-500 shrink-0"><IconCheck size={11} /></span>{item}
            </li>
          ))}
          <li className="flex items-center gap-1.5 text-xs text-orange-500">
            <IcoAlertTriangle /> Missing measurable achievements
          </li>
        </ul>
      </Card>

      {/* Projects */}
      <Card className="p-5">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h4 className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Projects</h4>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">7 found</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {["AI Resume Analyzer", "AgriYield", "GestureX", "Car Price Prediction"].map(p => (
            <span key={p} className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{p}</span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Project Relevance</span>
          <span className="font-bold text-emerald-600">86%</span>
        </div>
        <ProgressBar value={86} color="#10b981" height={4} />
      </Card>

      {/* Certifications — empty state */}
      <Card className="p-5 flex flex-col">
        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
        </div>
        <h4 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>Certifications</h4>
        <div className="flex-1 flex flex-col items-center justify-center py-3 text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6m-3-3v6"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">Add relevant certifications to strengthen your profile.</p>
          <button className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
            <IcoPlus /> Add Certification
          </button>
        </div>
      </Card>
    </div>
  );
}

// ─── Section 6 — AI Recommendations ──────────────────────────────────────────

const RECOMMENDATIONS = [
  { priority: "High", title: "Add measurable achievements", desc: "Your project descriptions explain what you built but could include measurable results — e.g. 'improved accuracy by 18%'.", color: "red" },
  { priority: "High", title: "Add missing job keywords", desc: "Several keywords from the target job description are missing from your resume, affecting keyword match score.", color: "red" },
  { priority: "Medium", title: "Strengthen project descriptions", desc: "Use action verbs and measurable outcomes when describing your projects to signal greater impact.", color: "orange" },
  { priority: "Medium", title: "Improve professional summary", desc: "Make your summary more specific to the target Software Engineer role at Amazon.", color: "orange" },
];

function RecommendationCard({ item }: { item: typeof RECOMMENDATIONS[0] }) {
  const isHigh = item.priority === "High";
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-100 hover:shadow-sm transition-all">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${isHigh ? "bg-red-50 text-red-500" : "bg-orange-50 text-orange-500"}`}>
        <IconSparkles size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h4 className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h4>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isHigh ? "bg-red-50 text-red-600 border-red-200" : "bg-orange-50 text-orange-600 border-orange-200"
          }`}>{item.priority}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-2">{item.desc}</p>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View Suggestion <IconArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

function RecommendationsSection() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-0.5" style={{ fontFamily: "var(--font-display)" }}>AI Recommendations</h3>
          <p className="text-xs text-slate-500">Personalized suggestions to improve your resume.</p>
        </div>
        <button className="text-xs font-semibold text-blue-600 border border-blue-100 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
          View All <IconArrowRight size={12} />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {RECOMMENDATIONS.map((r, i) => <RecommendationCard key={i} item={r} />)}
      </div>
    </Card>
  );
}

// ─── Section 7 — Quality Checklist ───────────────────────────────────────────

const CHECKLIST = [
  { ok: true, label: "Contact information detected" },
  { ok: true, label: "Education section detected" },
  { ok: true, label: "Skills section detected" },
  { ok: true, label: "Projects section detected" },
  { ok: true, label: "Standard section headings" },
  { ok: true, label: "Relevant keywords detected" },
  { ok: false, label: "Add more measurable achievements" },
  { ok: false, label: "Improve keyword coverage" },
];

function QualityChecklist() {
  const passed = CHECKLIST.filter(c => c.ok).length;
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-0.5" style={{ fontFamily: "var(--font-display)" }}>Resume Quality</h3>
          <p className="text-xs text-slate-500">Checklist of detected resume elements</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-extrabold text-emerald-600" style={{ fontFamily: "var(--font-display)" }}>{passed}/{CHECKLIST.length}</div>
          <div className="text-[10px] text-slate-400">passed</div>
        </div>
      </div>
      <ProgressBar value={(passed / CHECKLIST.length) * 100} color="#10b981" height={6} />
      <div className="flex flex-col gap-2.5 mt-4">
        {CHECKLIST.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
              item.ok ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-500"
            }`}>
              {item.ok
                ? <IconCheck size={11} />
                : <IcoAlertTriangle />
              }
            </div>
            <span className={`text-sm ${item.ok ? "text-slate-700" : "text-amber-700"}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Section 8 — Before & After ───────────────────────────────────────────────

function BeforeAfterCard() {
  return (
    <Card className="p-6">
      <CardHeader title="See How AI Can Improve Your Resume"
        subtitle="Real example of AI-powered improvement on your resume content" />
      <div className="grid md:grid-cols-2 gap-4">
        {/* Before */}
        <div className="rounded-xl border-2 border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center"><IconX size={10} /></div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Before</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed italic">
            "Worked on a machine learning project."
          </p>
        </div>

        {/* After */}
        <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-blue-50/30 p-4 relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><IconCheck size={10} /></div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">AI Improved Version</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            "Developed a machine learning prediction model using Scikit-learn and optimized the data preprocessing pipeline to improve model performance."
          </p>
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <IconSparkles size={10} /> AI
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>
          <IconCheck size={14} /> Apply Suggestion
        </button>
      </div>
    </Card>
  );
}

// ─── Top Header ───────────────────────────────────────────────────────────────

function DashboardHeader({ onAnalyzeAgain }: { onAnalyzeAgain: () => void }) {
  return (
    <div className="mb-6">
      {/* Title row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
            Resume Analysis
          </h1>
          <p className="text-sm text-slate-500">AI-powered insights for your resume and target job.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors relative bg-white">
            <IcoBell />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
          </button>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>SY</div>
          <SecondaryButton className="gap-1.5 text-xs py-2 hidden sm:inline-flex" onClick={onAnalyzeAgain}>
            <IcoRefresh /> Analyze Again
          </SecondaryButton>
          <PrimaryButton className="gap-1.5 text-xs py-2 hidden sm:inline-flex">
            <IcoDownload /> Download Report
          </PrimaryButton>
        </div>
      </div>

      {/* Resume info pill */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100"
        style={{ boxShadow: "0 1px 8px -2px rgba(15,23,42,0.06)" }}>
        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
        <div>
          <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Susmita_Yadav_Resume.pdf</span>
          <span className="text-slate-300 mx-2">·</span>
          <span className="text-xs text-slate-500">1.8 MB</span>
        </div>
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <span className="hidden sm:inline text-xs text-slate-400">Target role:</span>
          <Tag color="blue">Software Engineer</Tag>
          <span className="hidden sm:inline text-xs text-slate-400">at</span>
          <Tag color="purple">Amazon</Tag>
          <span className="hidden sm:inline text-xs text-slate-400">· Sep 2026</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Complete</span>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────

function BottomCTA({ onAnalyzeAgain, onViewReport }: { onAnalyzeAgain: () => void; onViewReport?: () => void }) {
  return (
    <div className="mt-8 relative rounded-2xl overflow-hidden px-8 py-10 text-center"
      style={{ background: "linear-gradient(135deg, #3b52f5 0%, #6d28d9 100%)" }}>
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%"><defs><pattern id="cta-dot" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="white"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#cta-dot)"/>
        </svg>
      </div>
      <div className="relative">
        <h3 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Ready to improve your resume?
        </h3>
        <p className="text-blue-100 text-sm mb-5">Apply AI suggestions and boost your score to 90+.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {onViewReport && (
            <button onClick={onViewReport}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
              <IconSparkles size={16} /> View Full Report
            </button>
          )}
          <button onClick={onAnalyzeAgain}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
            <IcoRefresh /> Analyze Another Resume
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Home ───────────────────────────────────────────────────────────

function DashboardHome({ onAnalyzeAgain, onNavigate, onViewReport }: { onAnalyzeAgain: () => void; onNavigate: (p: DashPage) => void; onViewReport?: () => void }) {
  return (
    <>
      <DashboardHeader onAnalyzeAgain={onAnalyzeAgain} />
      <HeroScoreCard />
      <div className="mt-5"><KeyScoreCards /></div>
      <div className="mt-5"><JobMatchCard /></div>
      <div className="mt-5 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><SkillsAnalysisCard /></div>
        <div><QualityChecklist /></div>
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Resume Breakdown</h3>
        <BreakdownCards />
      </div>
      <div className="mt-5"><RecommendationsSection /></div>
      <div className="mt-5"><BeforeAfterCard /></div>
      <BottomCTA onAnalyzeAgain={onAnalyzeAgain} onViewReport={onViewReport} />
    </>
  );
}

// ─── Dashboard Shell ──────────────────────────────────────────────────────────

export default function Dashboard({ onBack, onAnalyzeAgain, onViewReport, isDark, onToggleDark }: {
  onBack: () => void;
  onAnalyzeAgain: () => void;
  onViewReport?: () => void;
  isDark?: boolean;
  onToggleDark?: () => void;
}) {
  const [activePage, setActivePage] = React.useState<DashPage>("dashboard");
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [helpOpen, setHelpOpen] = React.useState(false);
  const [signOutOpen, setSignOutOpen] = React.useState(false);
  const { toast } = useToast();

  useCmdK(() => setCmdOpen(true));

  const navigate = (p: DashPage) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const CMD_ACTIONS = [
    { group: "Navigation", label: "Analyze Resume", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>, shortcut: "⌘A", onSelect: onAnalyzeAgain },
    { group: "Navigation", label: "View Dashboard", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, onSelect: () => navigate("dashboard") },
    { group: "Navigation", label: "My Resumes", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>, onSelect: () => navigate("my-resumes") },
    { group: "Navigation", label: "Job Matches", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, onSelect: () => navigate("job-matches") },
    { group: "Navigation", label: "Recommendations", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, onSelect: () => navigate("recommendations") },
    { group: "Navigation", label: "AI Copilot", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, shortcut: "⌘C", onSelect: () => navigate("copilot") },
    { group: "Account", label: "Download Latest Report", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>, onSelect: () => toast("info", "Preparing your latest report…") },
    { group: "Account", label: "Profile", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, onSelect: () => navigate("profile") },
    { group: "Account", label: "Settings", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, shortcut: "⌘,", onSelect: () => navigate("settings") },
    { group: "Account", label: "Design System", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, onSelect: () => navigate("design-system") },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Skip to main content — accessible keyboard shortcut */}
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[500] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-blue-600 focus:text-white focus:text-sm focus:font-bold focus:shadow-lg">
        Skip to main content
      </a>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar onBack={onBack} activePage={activePage} onNavigate={navigate} />
      </div>

      {/* Mobile nav */}
      <div className="lg:hidden">
        <MobileNav activePage={activePage} onNavigate={navigate} onBack={onBack} />
      </div>

      {/* Main content */}
      <main id="main-content" className="flex-1 lg:ml-56 min-h-screen overflow-y-auto">
        {/* Topbar with user menu */}
        <div className="sticky top-0 z-40 hidden lg:flex items-center justify-end gap-2 px-6 py-3 bg-white border-b border-slate-100">
          <button onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Quick search</span>
            <kbd className="ml-1 bg-slate-100 text-slate-400 text-[10px] px-1.5 py-0.5 rounded font-semibold">⌘K</kbd>
          </button>
          <button onClick={() => setHelpOpen(true)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Help">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          </button>
          <UserMenu
            name="Susmita Yadav"
            email="susmita@example.com"
            onNavigate={p => navigate(p as DashPage)}
            onSignOut={() => setSignOutOpen(true)}
            isDark={isDark}
            onToggleDark={onToggleDark}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 lg:py-8 pt-20 lg:pt-6">
          {activePage === "dashboard" && (
            <DashboardHome onAnalyzeAgain={onAnalyzeAgain} onNavigate={navigate} onViewReport={onViewReport} />
          )}
          {activePage === "my-resumes" && (
            <MyResumesPage onViewDashboard={() => navigate("dashboard")} />
          )}
          {activePage === "job-matches" && (
            <JobMatchesPage onViewDashboard={() => navigate("dashboard")} />
          )}
          {activePage === "recommendations" && (
            <RecommendationsPage />
          )}
          {activePage === "copilot" && (
            <CopilotPage onViewReport={onViewReport} />
          )}
          {activePage === "profile" && <ProfilePage />}
          {activePage === "settings" && <SettingsPage isDark={isDark} onToggleDark={onToggleDark} />}
          {activePage === "design-system" && <DesignSystemPage />}
        </div>
      </main>

      {/* Global overlays */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} actions={CMD_ACTIONS} />
      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
      <ConfirmModal
        open={signOutOpen}
        title="Are you sure you want to sign out?"
        message="You'll need to log in again to access your dashboard."
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
        danger
        onConfirm={() => { setSignOutOpen(false); onBack(); }}
        onCancel={() => setSignOutOpen(false)}
      />
    </div>
  );
}
