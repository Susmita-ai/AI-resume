import React, { useState } from "react";
import { Tag } from "./ui";
import { EmptyState } from "./UXStates";

const JOB_MATCHES = [
  {
    id: 1, title: "Software Engineer", company: "Amazon", location: "Bangalore, IN",
    match: 79, ats: 88, missing: ["Docker", "AWS", "Kubernetes"],
    matched: ["Python", "FastAPI", "SQL", "Git", "React"],
    posted: "2 days ago", type: "Full-time", level: "Mid",
  },
  {
    id: 2, title: "ML Engineer", company: "Google", location: "Hyderabad, IN",
    match: 72, ats: 81, missing: ["TensorFlow", "GCP", "MLOps"],
    matched: ["Python", "Scikit-learn", "Pandas", "ML", "SQL"],
    posted: "5 days ago", type: "Full-time", level: "Mid",
  },
  {
    id: 3, title: "Data Scientist", company: "Microsoft", location: "Remote",
    match: 68, ats: 74, missing: ["Power BI", "Azure", "R"],
    matched: ["Python", "SQL", "Data Analysis", "Pandas"],
    posted: "1 week ago", type: "Full-time", level: "Junior",
  },
  {
    id: 4, title: "Backend Engineer", company: "Flipkart", location: "Bangalore, IN",
    match: 84, ats: 91, missing: ["Kafka", "Redis"],
    matched: ["Python", "FastAPI", "SQL", "Git", "Docker", "REST APIs"],
    posted: "3 days ago", type: "Full-time", level: "Mid",
  },
];

function MatchRing({ pct, color }: { pct: number; color: string }) {
  const r = 20, circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r={r} fill="none" stroke="#f1f5f9" strokeWidth="5" />
      <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        transform="rotate(-90 26 26)" style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      <text x="26" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a"
        fontFamily="var(--font-display)">{pct}%</text>
    </svg>
  );
}

function JobMatchCard({ job, onView }: { job: typeof JOB_MATCHES[0]; onView: () => void }) {
  const matchColor = job.match >= 80 ? "#10b981" : job.match >= 70 ? "#0ea5e9" : "#f59e0b";
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-100 hover:shadow-md transition-all"
      style={{ boxShadow: "0 2px 12px -4px rgba(15,23,42,0.06)" }}>
      <div className="flex items-start gap-4">
        {/* Company avatar */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>
          {job.company[0]}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-tight" style={{ fontFamily: "var(--font-display)" }}>{job.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 flex-wrap">
                <span className="font-medium text-slate-700">{job.company}</span>
                <span>·</span><span>{job.location}</span>
                <span>·</span><span>{job.posted}</span>
              </div>
            </div>
            <MatchRing pct={job.match} color={matchColor} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 my-3">
            <Tag color="blue">{job.type}</Tag>
            <Tag color="purple">{job.level}</Tag>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
              ATS {job.ats}/100
            </span>
          </div>

          {/* Matched skills */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {job.matched.slice(0, 4).map(s => (
              <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {s}
              </span>
            ))}
            {job.matched.length > 4 && (
              <span className="text-xs text-slate-400 px-1.5 py-0.5">+{job.matched.length - 4} more</span>
            )}
          </div>

          {/* Missing skills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.missing.map(s => (
              <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><line x1="9" y1="3" x2="3" y2="9" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/><line x1="3" y1="3" x2="9" y2="9" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/></svg>
                {s}
              </span>
            ))}
          </div>

          <button onClick={onView}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 border border-blue-100 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
            View Match →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function JobMatchesPage({ onViewDashboard }: { onViewDashboard: () => void }) {
  const [filter, setFilter] = useState<"all" | "high" | "medium">("all");

  const filtered = JOB_MATCHES.filter(j =>
    filter === "all" ? true : filter === "high" ? j.match >= 80 : j.match < 80
  );

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>Job Matches</h1>
          <p className="text-sm text-slate-500">See how your resume aligns with target job roles.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shrink-0">
          {(["all", "high", "medium"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all capitalize ${
                filter === f ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}>
              {f === "all" ? "All" : f === "high" ? "80%+" : "Below 80%"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No matches in this range." subtitle="Try a different filter or analyze another resume." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map(job => <JobMatchCard key={job.id} job={job} onView={onViewDashboard} />)}
        </div>
      )}

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: "Jobs Analyzed", value: JOB_MATCHES.length },
          { label: "High Match (80%+)", value: JOB_MATCHES.filter(j => j.match >= 80).length },
          { label: "Avg Match", value: `${Math.round(JOB_MATCHES.reduce((a, j) => a + j.match, 0) / JOB_MATCHES.length)}%` },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 px-4 py-4 text-center"
            style={{ boxShadow: "0 1px 8px -2px rgba(15,23,42,0.05)" }}>
            <div className="text-xl font-extrabold text-blue-600 mb-0.5" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
            <div className="text-xs text-slate-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
