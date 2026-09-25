import React, { useState } from "react";
import { PrimaryButton, SecondaryButton, Tag } from "./ui";
import { EmptyState } from "./UXStates";

const RESUMES = [
  { id: 1, name: "Susmita_Yadav_Resume.pdf", role: "Software Engineer", company: "Amazon", ats: 88, match: 79, score: 82, date: "Sep 2026", size: "1.8 MB", active: true },
  { id: 2, name: "Susmita_Yadav_ML_Resume.pdf", role: "ML Engineer", company: "Google", ats: 81, match: 72, score: 76, date: "Aug 2026", size: "2.1 MB", active: false },
  { id: 3, name: "Resume_DataScience_v2.pdf", role: "Data Scientist", company: "Microsoft", ats: 74, match: 68, score: 71, date: "Jul 2026", size: "1.4 MB", active: false },
];

function ScoreBadge({ value, color }: { value: number | string; color: string }) {
  return (
    <span className="inline-flex items-center font-bold text-xs px-2 py-0.5 rounded-full border"
      style={{ color, borderColor: `${color}33`, background: `${color}12` }}>
      {value}
    </span>
  );
}

function ThreeDotMenu({ resumeId }: { resumeId: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-20 w-40 bg-white rounded-xl border border-slate-100 shadow-lg py-1"
          onBlur={() => setOpen(false)}>
          {["Rename", "Duplicate", "Delete"].map(action => (
            <button key={action} onClick={() => setOpen(false)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${action === "Delete" ? "text-red-500 hover:bg-red-50" : "text-slate-700 hover:bg-slate-50"}`}>
              {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Desktop table row
function ResumeTableRow({ r, onView }: { r: typeof RESUMES[0]; onView: () => void }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">{r.name}</p>
            <p className="text-xs text-slate-400">{r.size}</p>
          </div>
          {r.active && <Tag color="green">Active</Tag>}
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="text-sm font-medium text-slate-700">{r.role}</p>
        <p className="text-xs text-slate-400">{r.company}</p>
      </td>
      <td className="px-4 py-4"><ScoreBadge value={`${r.ats}/100`} color="#8b5cf6" /></td>
      <td className="px-4 py-4"><ScoreBadge value={`${r.match}%`} color="#0ea5e9" /></td>
      <td className="px-4 py-4"><ScoreBadge value={`${r.score}/100`} color="#4f6ef7" /></td>
      <td className="px-4 py-4 text-xs text-slate-400">{r.date}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onView} className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2.5 py-1 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors">View</button>
          <button className="text-xs font-semibold text-slate-600 hover:text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">Download</button>
          <ThreeDotMenu resumeId={r.id} />
        </div>
      </td>
    </tr>
  );
}

// Mobile card
function ResumeMobileCard({ r, onView }: { r: typeof RESUMES[0]; onView: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4" style={{ boxShadow: "0 1px 8px -2px rgba(15,23,42,0.06)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-display)" }}>{r.name}</p>
            <p className="text-xs text-slate-400">{r.role} · {r.company}</p>
          </div>
        </div>
        <ThreeDotMenu resumeId={r.id} />
      </div>
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {r.active && <Tag color="green">Active</Tag>}
        <ScoreBadge value={`ATS ${r.ats}`} color="#8b5cf6" />
        <ScoreBadge value={`Match ${r.match}%`} color="#0ea5e9" />
        <ScoreBadge value={`Score ${r.score}`} color="#4f6ef7" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{r.date} · {r.size}</span>
        <div className="flex gap-2">
          <button onClick={onView} className="text-xs font-semibold text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors">View</button>
          <button className="text-xs font-semibold text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">Download</button>
        </div>
      </div>
    </div>
  );
}

export default function MyResumesPage({ onViewDashboard }: { onViewDashboard: () => void }) {
  const [showEmpty] = useState(false);

  if (showEmpty) {
    return (
      <EmptyState
        title="No resumes analyzed yet."
        subtitle="Upload your resume to receive an AI-powered score, ATS check, and job match analysis."
        ctaLabel="Analyze Your Resume"
        onCta={onViewDashboard}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>My Resumes</h1>
          <p className="text-sm text-slate-500">All analyzed resume versions and their scores.</p>
        </div>
        <PrimaryButton className="shrink-0 text-xs py-2 gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
          Upload Resume
        </PrimaryButton>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 overflow-hidden" style={{ boxShadow: "0 2px 16px -4px rgba(15,23,42,0.07)" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {["Resume", "Target Role", "ATS", "Job Match", "Score", "Date", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {RESUMES.map(r => <ResumeTableRow key={r.id} r={r} onView={onViewDashboard} />)}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {RESUMES.map(r => <ResumeMobileCard key={r.id} r={r} onView={onViewDashboard} />)}
      </div>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: "Total Resumes", value: "3" },
          { label: "Best Score", value: "82/100" },
          { label: "Best ATS", value: "88/100" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 px-4 py-4 text-center" style={{ boxShadow: "0 1px 8px -2px rgba(15,23,42,0.05)" }}>
            <div className="text-xl font-extrabold text-blue-600 mb-0.5" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
            <div className="text-xs text-slate-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
