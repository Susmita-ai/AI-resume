import React, { useState } from "react";
import { IconLogo, PrimaryButton, SecondaryButton } from "./ui";
import { useToast } from "./Toast";

// ─── Types ─────────────────────────────────────────────────────────────────────

type RecruiterView =
  | "auth"
  | "dashboard"
  | "jobs"
  | "create-job"
  | "candidates"
  | "candidate-detail"
  | "compare"
  | "shortlisted"
  | "reports"
  | "notifications"
  | "settings";

// ─── Sample data ───────────────────────────────────────────────────────────────

const JOBS = [
  { id: 1, title: "Software Engineer", company: "Example Company", location: "Hyderabad", type: "Full-time", applicants: 124, screened: 82, shortlisted: 18, threshold: 75 },
  { id: 2, title: "Data Scientist", company: "Example Company", location: "Bangalore", type: "Full-time", applicants: 86, screened: 60, shortlisted: 12, threshold: 80 },
  { id: 3, title: "ML Engineer", company: "Example Company", location: "Remote", type: "Full-time", applicants: 54, screened: 38, shortlisted: 8, threshold: 78 },
];

const CANDIDATES = [
  { id: 1, name: "Candidate A", role: "Software Engineer", match: 92, ats: 94, experience: "2 Years", skillsMatch: 90, status: "shortlisted" as const, skills: ["Python", "SQL", "FastAPI", "ML", "Git"], missing: ["AWS", "Docker", "System Design"] },
  { id: 2, name: "Candidate B", role: "Software Engineer", match: 85, ats: 88, experience: "1 Year", skillsMatch: 82, status: "review" as const, skills: ["Python", "React", "Node.js", "SQL"], missing: ["ML", "Docker", "AWS"] },
  { id: 3, name: "Candidate C", role: "Software Engineer", match: 78, ats: 80, experience: "Fresher", skillsMatch: 74, status: "review" as const, skills: ["Java", "Spring Boot", "SQL"], missing: ["Python", "ML", "Cloud"] },
  { id: 4, name: "Candidate D", role: "Software Engineer", match: 71, ats: 75, experience: "6 Months", skillsMatch: 68, status: "rejected" as const, skills: ["JavaScript", "React"], missing: ["Python", "ML", "System Design", "SQL"] },
  { id: 5, name: "Candidate E", role: "Software Engineer", match: 88, ats: 91, experience: "3 Years", skillsMatch: 86, status: "shortlisted" as const, skills: ["Python", "Django", "PostgreSQL", "Git", "Docker"], missing: ["AWS", "ML", "System Design"] },
];

type CandStatus = "shortlisted" | "review" | "rejected";
const STATUS_META: Record<CandStatus, { label: string; cls: string }> = {
  shortlisted: { label: "Shortlisted", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  review: { label: "Under Review", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  rejected: { label: "Rejected", cls: "bg-red-100 text-red-600 border-red-200" },
};

// ─── Shared helpers ─────────────────────────────────────────────────────────────

function MatchRing({ pct, size = 52 }: { pct: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const color = pct >= 85 ? "#4f6ef7" : pct >= 75 ? "#8b5cf6" : pct >= 65 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-extrabold text-slate-800">{pct}%</span>
      </div>
    </div>
  );
}

function Bar({ pct, color = "bg-blue-500" }: { pct: number; color?: string }) {
  return (
    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendUp }: { icon: React.ReactNode; label: string; value: string | number; trend?: string; trendUp?: boolean }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">{icon}</div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trendUp ? "text-emerald-700 bg-emerald-100" : "text-red-600 bg-red-100"}`}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-extrabold text-slate-900">{value}</div>
        <div className="text-xs text-slate-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder, value, onChange }: { label: string; type?: string; placeholder?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white" />
    </div>
  );
}

// ─── Auth ──────────────────────────────────────────────────────────────────────

function RecruiterAuth({ onSuccess, onCandidateLogin }: { onSuccess: () => void; onCandidateLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const submit = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Brand side */}
      <div className="hidden lg:flex flex-col justify-between p-10 lg:w-[420px] shrink-0 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="flex items-center gap-2.5 relative z-10">
          <IconLogo />
          <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>ResumeAI</span>
          <span className="text-xs font-semibold bg-white/10 border border-white/20 text-white/70 px-2 py-0.5 rounded-full ml-1">Recruiter</span>
        </div>

        <div className="relative z-10 flex flex-col gap-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
            <div className="text-xs font-bold text-white/50 uppercase tracking-wide">Screening Overview</div>
            {[
              { label: "Candidates Screened", val: 142 },
              { label: "Avg Match Score", val: "78%" },
              { label: "Shortlisted", val: 38 },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-sm text-white/70">{r.label}</span>
                <span className="text-sm font-bold text-white">{r.val}</span>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-white font-extrabold text-2xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Screen candidates faster<br />with AI-powered analysis.
            </h2>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">
              Upload job descriptions and let AI rank candidates by match, skills, and ATS compatibility.
            </p>
          </div>
        </div>

        <p className="relative z-10 text-white/30 text-xs">© 2025 ResumeAI. Recruiter Edition.</p>
      </div>

      {/* Form side */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        <div className="flex items-center justify-between px-6 py-4 lg:px-10 border-b border-slate-100">
          <div className="flex items-center gap-2 lg:hidden">
            <IconLogo />
            <span className="font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>ResumeAI</span>
          </div>
          <button onClick={onCandidateLogin} className="ml-auto text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Candidate Login →
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-md flex flex-col gap-7">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Recruiter Sign In</h2>
              <p className="text-sm text-slate-500 mt-1">Screen candidates faster with AI-powered resume analysis.</p>
            </div>

            <div className="flex flex-col gap-4">
              <Field label="Work Email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot Password?</button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <PrimaryButton onClick={submit} className="w-full py-3.5 rounded-xl text-sm font-bold">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    Signing In…
                  </span>
                ) : "Sign In"}
              </PrimaryButton>
              <button className="w-full flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>
            </div>

            <div className="border-t border-slate-100 pt-4 text-center">
              <p className="text-sm text-slate-500">
                Are you a candidate?{" "}
                <button onClick={onCandidateLogin} className="font-bold text-blue-600 hover:text-blue-700">Candidate Login</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────

const NAV_ITEMS: { icon: React.ReactNode; label: string; view: RecruiterView }[] = [
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    label: "Dashboard", view: "dashboard",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    label: "Jobs", view: "jobs",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    label: "Candidates", view: "candidates",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M9 13h6"/><path d="M9 17h3"/></svg>,
    label: "Resume Screening", view: "candidates",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    label: "Shortlisted", view: "shortlisted",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    label: "Reports", view: "reports",
  },
  {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
    label: "Settings", view: "settings",
  },
];

function RecruiterSidebar({ active, onNav, onSignOut }: { active: RecruiterView; onNav: (v: RecruiterView) => void; onSignOut: () => void }) {
  return (
    <div className="hidden lg:flex flex-col w-56 shrink-0 min-h-screen bg-white border-r border-slate-100">
      <div className="px-4 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <IconLogo />
          <div>
            <div className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>ResumeAI</div>
            <div className="text-xs text-slate-400 font-medium">Recruiter Edition</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {NAV_ITEMS.map(n => {
          const isActive = active === n.view;
          return (
            <button key={n.label} onClick={() => onNav(n.view)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${isActive ? "text-blue-700 font-semibold bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}>
              <span className={isActive ? "text-blue-600" : "text-slate-400"}>{n.icon}</span>
              {n.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-slate-100">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>HR</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-700 truncate">HR Manager</div>
            <div className="text-xs text-slate-400 truncate">hr@company.com</div>
          </div>
          <button onClick={onSignOut} className="text-slate-400 hover:text-slate-600 transition-colors shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Topbar ────────────────────────────────────────────────────────────────────

function RecruiterTopbar({ title, onNotifications, onNav }: { title: string; onNotifications: () => void; onNav: (v: RecruiterView) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 bg-white px-4 sm:px-6 py-3.5 flex items-center gap-3">
      {/* Mobile menu */}
      <button onClick={() => setMenuOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-700">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-60 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2"><IconLogo /><span className="font-bold text-sm text-slate-900">ResumeAI Recruiter</span></div>
              <button onClick={() => setMenuOpen(false)} className="text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <nav className="flex-1 p-3 flex flex-col gap-0.5">
              {NAV_ITEMS.map(n => (
                <button key={n.label} onClick={() => { onNav(n.view); setMenuOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all w-full text-left">
                  <span className="text-slate-400">{n.icon}</span>{n.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <h1 className="flex-1 text-base font-extrabold text-slate-900 truncate" style={{ fontFamily: "var(--font-display)" }}>{title}</h1>

      <div className="flex items-center gap-2">
        <button onClick={onNotifications} className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>HR</div>
      </div>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────

function DashboardView({ onNav }: { onNav: (v: RecruiterView) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Recruiter Dashboard</h2>
        <p className="text-sm text-slate-500 mt-0.5">Overview of your recruitment activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>} label="Active Jobs" value={24} trend="4 new" trendUp />
        <StatCard icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} label="Candidates" value={486} trend="12 today" trendUp />
        <StatCard icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>} label="Resumes Screened" value={142} trend="8 new" trendUp />
        <StatCard icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>} label="Shortlisted" value={38} trend="3 today" trendUp />
      </div>

      {/* Screening + Jobs */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Candidate Screening */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
          <div className="font-extrabold text-slate-900 text-base" style={{ fontFamily: "var(--font-display)" }}>Candidate Screening</div>
          {/* Donut-style visual */}
          <div className="flex items-center gap-5">
            <div className="relative w-28 h-28 shrink-0">
              <svg width="112" height="112" viewBox="0 0 112 112" style={{ transform: "rotate(-90deg)" }}>
                {[
                  { pct: 38, offset: 0, color: "#4f6ef7" },
                  { pct: 64, offset: 38, color: "#f59e0b" },
                  { pct: 40, offset: 102, color: "#ef4444" },
                ].map((seg, i) => {
                  const r = 42; const circ = 2 * Math.PI * r;
                  const total = 142;
                  const segCirc = (seg.pct / total) * circ;
                  const dashOffset = circ - (seg.offset / total) * circ;
                  return (
                    <circle key={i} cx="56" cy="56" r={r} fill="none" stroke={seg.color} strokeWidth="16"
                      strokeDasharray={`${segCirc} ${circ - segCirc}`}
                      strokeDashoffset={dashOffset} />
                  );
                })}
                <circle cx="56" cy="56" r="34" fill="white" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-slate-900">142</span>
                <span className="text-xs text-slate-500">screened</span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Shortlisted", val: 38, color: "bg-blue-500" },
                { label: "Under Review", val: 64, color: "bg-amber-400" },
                { label: "Rejected", val: 40, color: "bg-red-400" },
              ].map(r => (
                <div key={r.label} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${r.color} shrink-0`} />
                  <span className="text-xs text-slate-600 flex-1">{r.label}</span>
                  <span className="text-xs font-bold text-slate-800">{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active jobs */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="font-extrabold text-slate-900 text-base" style={{ fontFamily: "var(--font-display)" }}>Active Job Openings</div>
            <button onClick={() => onNav("create-job")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
              + New Job
            </button>
          </div>
          {JOBS.slice(0, 2).map(job => (
            <div key={job.id} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900">{job.title}</div>
                <div className="text-xs text-slate-500">{job.location} · {job.applicants} applicants</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-center hidden sm:block">
                  <div className="text-sm font-bold text-slate-800">{job.shortlisted}</div>
                  <div className="text-xs text-slate-500">shortlisted</div>
                </div>
                <button onClick={() => onNav("candidates")}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
                  View
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => onNav("jobs")} className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors text-center mt-1">
            View all {JOBS.length} jobs →
          </button>
        </div>
      </div>

      {/* AI screening insights */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="font-extrabold text-slate-900 text-base" style={{ fontFamily: "var(--font-display)" }}>AI Screening Insights</div>
          <button onClick={() => onNav("candidates")} className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {["Candidate", "Match", "ATS", "Experience", "Skills", "Status"].map(h => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 pb-2.5 pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CANDIDATES.slice(0, 3).map(c => (
                <tr key={c.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 pr-4 font-semibold text-slate-800 whitespace-nowrap">{c.name}</td>
                  <td className="py-2.5 pr-4"><span className="font-bold" style={{ color: c.match >= 85 ? "#4f6ef7" : "#8b5cf6" }}>{c.match}%</span></td>
                  <td className="py-2.5 pr-4 text-slate-600">{c.ats}%</td>
                  <td className="py-2.5 pr-4 text-slate-600 whitespace-nowrap">{c.experience}</td>
                  <td className="py-2.5 pr-4 text-slate-600">{c.skillsMatch}%</td>
                  <td className="py-2.5"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_META[c.status].cls}`}>{STATUS_META[c.status].label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-start gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
          <svg className="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <p className="text-xs text-slate-500">AI scores are screening assistance only. Review candidate information before making hiring decisions.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Jobs ──────────────────────────────────────────────────────────────────────

function JobsView({ onNav, onCreateJob }: { onNav: (v: RecruiterView) => void; onCreateJob: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Active Job Openings</h2>
          <p className="text-sm text-slate-500 mt-0.5">{JOBS.length} open positions</p>
        </div>
        <button onClick={onCreateJob}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
          + Create New Job
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {JOBS.map(job => (
          <div key={job.id} className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-900">{job.title}</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">Active</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{job.company} · {job.location} · {job.type}</div>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                {[
                  { label: "Applicants", val: job.applicants },
                  { label: "Screened", val: job.screened },
                  { label: "Shortlisted", val: job.shortlisted },
                  { label: "Threshold", val: `${job.threshold}%` },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-1">
                    <span className="text-xs text-slate-500">{s.label}:</span>
                    <span className="text-xs font-bold text-slate-800">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Edit</button>
              <button onClick={() => onNav("candidates")}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
                View Candidates
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Create Job ────────────────────────────────────────────────────────────────

function CreateJobView({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", company: "", location: "", type: "Full-time", level: "", skills: "", preferred: "", description: "" });
  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const create = () => {
    if (!form.title || !form.description) { toast("error", "Job title and description are required."); return; }
    toast("success", "Job opening created successfully!");
    setTimeout(onSuccess, 500);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Jobs
        </button>
      </div>
      <div>
        <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Create Job Opening</h2>
        <p className="text-sm text-slate-500 mt-0.5">Set up a job and start screening candidates with AI.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Job Title" value={form.title} onChange={set("title")} placeholder="e.g. Software Engineer" />
          <Field label="Company" value={form.company} onChange={set("company")} placeholder="e.g. Acme Corp" />
          <Field label="Location" value={form.location} onChange={set("location")} placeholder="e.g. Hyderabad / Remote" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Employment Type</label>
            <select value={form.type} onChange={e => set("type")(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 bg-white">
              {["Full-time", "Part-time", "Contract", "Internship"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Experience Level</label>
            <select value={form.level} onChange={e => set("level")(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 bg-white">
              {["Fresher", "0–1 Years", "1–3 Years", "3–5 Years", "5+ Years"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <Field label="Required Skills" value={form.skills} onChange={set("skills")} placeholder="Python, SQL, Machine Learning…" />
        </div>
        <Field label="Preferred Skills" value={form.preferred} onChange={set("preferred")} placeholder="AWS, Docker, React…" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Job Description</label>
          <textarea value={form.description} onChange={e => set("description")(e.target.value)} rows={6}
            placeholder="Paste job description here… AI will use this to screen and rank candidates."
            className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none" />
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={() => toast("info", "Draft saved.")} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Save Draft</button>
          <button onClick={create} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>Create Job</button>
        </div>
      </div>
    </div>
  );
}

// ─── Candidates ────────────────────────────────────────────────────────────────

function CandidatesView({ onView, onCompare }: { onView: (id: number) => void; onCompare: () => void }) {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("match");
  const [search, setSearch] = useState("");
  const [statuses, setStatuses] = useState<Record<number, CandStatus>>({});

  const getStatus = (c: typeof CANDIDATES[0]) => statuses[c.id] ?? c.status;

  const filtered = CANDIDATES
    .filter(c => {
      const st = getStatus(c);
      if (filter === "high") return c.match >= 85;
      if (filter === "shortlisted") return st === "shortlisted";
      if (filter === "review") return st === "review";
      if (filter === "rejected") return st === "rejected";
      return true;
    })
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === "match" ? b.match - a.match : sort === "experience" ? 0 : b.ats - a.ats);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Candidates — Software Engineer</h2>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} candidates · AI-ranked by match score</p>
        </div>
        <button onClick={onCompare} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0">
          Compare Candidates
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[{ k: "all", l: "All" }, { k: "high", l: "High Match" }, { k: "shortlisted", l: "Shortlisted" }, { k: "review", l: "Under Review" }, { k: "rejected", l: "Rejected" }].map(f => (
            <button key={f.k} onClick={() => setFilter(f.k)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${filter === f.k ? "text-blue-700 bg-blue-50 border-blue-200" : "text-slate-600 bg-white border-slate-200 hover:border-slate-300"}`}>
              {f.l}
            </button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 outline-none bg-white">
          <option value="match">Sort: Match Score</option>
          <option value="ats">Sort: ATS Score</option>
          <option value="recent">Sort: Most Recent</option>
        </select>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {["Candidate", "Match Score", "ATS Score", "Experience", "Skills Match", "Status", "Actions"].map(h => (
                <th key={h} className="text-left text-xs font-bold text-slate-500 px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const st = getStatus(c);
              return (
                <tr key={c.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>{c.name[0]}{c.name.split(" ")[1]?.[0] ?? ""}</div>
                      <span className="font-semibold text-slate-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><MatchRing pct={c.match} size={44} /></td>
                  <td className="px-4 py-3 font-semibold text-slate-700">{c.ats}%</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{c.experience}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Bar pct={c.skillsMatch} />
                      <span className="text-xs font-semibold text-slate-600 w-8">{c.skillsMatch}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_META[st].cls}`}>{STATUS_META[st].label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => onView(c.id)} className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">View</button>
                      {st !== "shortlisted" && (
                        <button onClick={() => { setStatuses(s => ({ ...s, [c.id]: "shortlisted" })); toast("success", `${c.name} shortlisted!`); }}
                          className="px-2.5 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors">
                          Shortlist
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map(c => {
          const st = getStatus(c);
          return (
            <div key={c.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>{c.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-800 text-sm">{c.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_META[st].cls}`}>{STATUS_META[st].label}</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="text-xs text-slate-500">Match: <strong className="text-slate-800">{c.match}%</strong></span>
                  <span className="text-xs text-slate-500">ATS: <strong className="text-slate-800">{c.ats}%</strong></span>
                  <span className="text-xs text-slate-500">{c.experience}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => onView(c.id)} className="flex-1 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">View</button>
                  {st !== "shortlisted" && (
                    <button onClick={() => { setStatuses(s => ({ ...s, [c.id]: "shortlisted" })); toast("success", `${c.name} shortlisted!`); }}
                      className="flex-1 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 transition-colors">
                      Shortlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
        <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <p className="text-xs text-slate-500">AI scores are screening assistance only. Review candidate information before making hiring decisions.</p>
      </div>
    </div>
  );
}

// ─── Candidate Detail ─────────────────────────────────────────────────────────

function CandidateDetailView({ candidateId, onBack }: { candidateId: number; onBack: () => void }) {
  const { toast } = useToast();
  const c = CANDIDATES.find(x => x.id === candidateId) ?? CANDIDATES[0];
  const [status, setStatus] = useState<CandStatus>(c.status);

  const breakdown = [
    { label: "Skills", val: 94, color: "bg-blue-500" },
    { label: "Experience", val: 88, color: "bg-purple-500" },
    { label: "Education", val: 90, color: "bg-emerald-500" },
    { label: "Keywords", val: 91, color: "bg-amber-400" },
    { label: "Projects", val: 86, color: "bg-teal-500" },
  ];

  const action = (s: CandStatus, msg: string) => { setStatus(s); toast("success", msg); };

  return (
    <div className="flex flex-col gap-5">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors self-start">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Candidates
      </button>

      {/* Header */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>{c.name[0]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{c.name}</h2>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_META[status].cls}`}>{STATUS_META[status].label}</span>
          </div>
          <div className="text-sm text-slate-500 mt-0.5">{c.role} · {c.experience}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500">AI Match:</span>
            <span className="text-sm font-extrabold text-blue-600">{c.match}%</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button onClick={() => action("shortlisted", `${c.name} shortlisted.`)} disabled={status === "shortlisted"}
            className="px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-bold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Shortlist
          </button>
          <button onClick={() => action("review", `${c.name} moved to review.`)} disabled={status === "review"}
            className="px-3 py-2 rounded-xl border border-amber-200 bg-amber-50 text-xs font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-50 transition-colors">
            Move to Review
          </button>
          <button onClick={() => action("rejected", `${c.name} rejected.`)} disabled={status === "rejected"}
            className="px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors">
            Reject
          </button>
          <button onClick={() => toast("info", "Downloading resume…")}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Download Resume
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* AI Match Breakdown */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <div className="text-sm font-bold text-slate-700 mb-4">AI Screening Insights</div>
          <div className="flex items-center gap-4 mb-4">
            <MatchRing pct={c.match} size={72} />
            <div>
              <div className="text-2xl font-extrabold text-slate-900">{c.match}%</div>
              <div className="text-xs text-slate-500">Overall AI Match</div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {breakdown.map(b => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="text-sm text-slate-600 w-24 shrink-0">{b.label}</span>
                <Bar pct={b.val} color={b.color} />
                <span className="text-sm font-semibold text-slate-700 w-10 text-right shrink-0">{b.val}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-slate-50 rounded-xl px-3 py-2.5">
            <p className="text-xs text-slate-500">AI scores are screening assistance only. Review candidate information before making hiring decisions.</p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <div className="text-sm font-bold text-slate-700 mb-3">Matching Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {c.skills.map(s => (
                <span key={s} className="flex items-center gap-1 text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-full">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <div className="text-sm font-bold text-slate-700 mb-3">Missing / Not Detected Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {c.missing.map(s => (
                <span key={s} className="text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <div className="text-sm font-bold text-slate-700 mb-3">Areas to Review</div>
            <div className="flex flex-col gap-2">
              {["Cloud experience", "System design experience"].map(a => (
                <div key={a} className="flex items-center gap-2 text-sm text-amber-800 bg-amber-50 rounded-lg px-3 py-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Compare ──────────────────────────────────────────────────────────────────

function CompareView({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number[]>([1, 2, 3]);
  const shown = CANDIDATES.filter(c => selected.includes(c.id));

  const toggle = (id: number) => {
    if (selected.includes(id)) { if (selected.length > 2) setSelected(s => s.filter(x => x !== id)); }
    else if (selected.length < 4) setSelected(s => [...s, id]);
  };

  const cols = ["AI Match", "ATS Score", "Skills Match", "Experience", "Education", "Projects", "Matching Skills", "Missing Skills"];
  const vals = (c: typeof CANDIDATES[0]) => [
    `${c.match}%`, `${c.ats}%`, `${c.skillsMatch}%`, c.experience, "B.Tech CSE", "3 projects",
    c.skills.join(", "), c.missing.join(", "),
  ];

  return (
    <div className="flex flex-col gap-5">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors self-start">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Candidates
      </button>
      <div>
        <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Compare Candidates</h2>
        <p className="text-sm text-slate-500 mt-0.5">Select 2–4 candidates to compare side by side.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CANDIDATES.map(c => (
          <button key={c.id} onClick={() => toggle(c.id)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${selected.includes(c.id) ? "border-transparent text-white" : "border-slate-200 text-slate-600 hover:border-blue-300"}`}
            style={selected.includes(c.id) ? { background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" } : {}}>
            {selected.includes(c.id) && "✓ "}{c.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-xs font-bold text-slate-500 py-2.5 pr-4 w-32">Category</th>
              {shown.map(c => (
                <th key={c.id} className="text-center py-2.5 px-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>{c.name[0]}</div>
                    <span className="text-xs font-bold text-slate-800">{c.name}</span>
                    <span className="text-xs font-extrabold text-blue-600">{c.match}%</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cols.map((col, i) => (
              <tr key={col} className={`border-b border-slate-50 ${i % 2 === 0 ? "bg-slate-50/50" : ""}`}>
                <td className="py-2.5 pr-4 text-xs font-bold text-slate-500 whitespace-nowrap">{col}</td>
                {shown.map(c => (
                  <td key={c.id} className="py-2.5 px-3 text-center text-xs text-slate-700">
                    {i <= 2 ? (
                      <span className="font-bold text-slate-800">{vals(c)[i]}</span>
                    ) : i >= 6 ? (
                      <span className="text-slate-500 leading-relaxed">{vals(c)[i]}</span>
                    ) : (
                      <span>{vals(c)[i]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="py-3 text-xs font-bold text-slate-500">Actions</td>
              {shown.map(c => (
                <td key={c.id} className="py-3 text-center">
                  <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">View</button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Shortlisted ──────────────────────────────────────────────────────────────

function ShortlistedView({ onView }: { onView: (id: number) => void }) {
  const { toast } = useToast();
  const shortlisted = CANDIDATES.filter(c => c.status === "shortlisted");

  if (shortlisted.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-16">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div>
          <p className="text-base font-bold text-slate-700">No candidates have been shortlisted yet.</p>
          <p className="text-sm text-slate-500 mt-1">Screen candidates and shortlist the best matches.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Shortlisted Candidates</h2>
        <p className="text-sm text-slate-500 mt-0.5">{shortlisted.length} candidates shortlisted</p>
      </div>
      <div className="flex flex-col gap-3">
        {shortlisted.map(c => (
          <div key={c.id} className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>{c.name[0]}</div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                <div className="text-xs text-slate-500">{c.role} · {c.experience}</div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {c.skills.slice(0, 4).map(s => <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{s}</span>)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <MatchRing pct={c.match} size={44} />
              <div className="flex gap-2">
                <button onClick={() => onView(c.id)} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">View Profile</button>
                <button onClick={() => toast("info", "Downloading resume…")} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Download</button>
                <button onClick={() => toast("success", "Moved to review.")} className="px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 text-xs font-semibold text-amber-700 hover:bg-amber-100 transition-colors">Review</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────

function ReportsView() {
  const { toast } = useToast();
  const stats = [
    { label: "Total Candidates", val: 486 },
    { label: "Average Match Score", val: "78%" },
    { label: "Screened Candidates", val: 142 },
    { label: "Shortlisted", val: 38 },
  ];
  const matchDist = [
    { label: "90–100%", count: 8, color: "bg-emerald-500" },
    { label: "80–89%", count: 22, color: "bg-blue-500" },
    { label: "70–79%", count: 45, color: "bg-purple-500" },
    { label: "60–69%", count: 38, color: "bg-amber-400" },
    { label: "Below 60%", count: 29, color: "bg-red-400" },
  ];
  const maxCount = Math.max(...matchDist.map(d => d.count));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Recruitment Reports</h2>
          <p className="text-sm text-slate-500 mt-0.5">Screening analytics for all active jobs.</p>
        </div>
        <button onClick={() => toast("info", "Generating report PDF…")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-4 text-center">
            <div className="text-2xl font-extrabold text-slate-900">{s.val}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Candidate distribution */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <div className="text-sm font-bold text-slate-700 mb-4">Candidate Distribution</div>
          <div className="flex items-end gap-2 h-32">
            {[
              { label: "Shortlisted", val: 38, color: "bg-emerald-500" },
              { label: "Review", val: 64, color: "bg-amber-400" },
              { label: "Rejected", val: 40, color: "bg-red-400" },
            ].map(b => (
              <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-slate-700">{b.val}</span>
                <div className={`w-full rounded-t-lg ${b.color}`} style={{ height: `${(b.val / 142) * 100}px` }} />
                <span className="text-xs text-slate-500 text-center">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Match score distribution */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <div className="text-sm font-bold text-slate-700 mb-4">Match Score Distribution</div>
          <div className="flex flex-col gap-2">
            {matchDist.map(d => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-20 shrink-0">{d.label}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${d.color}`} style={{ width: `${(d.count / maxCount) * 100}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-700 w-6 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────

function NotificationsView() {
  const notifs = [
    { icon: "👥", title: "12 new candidates added", sub: "Software Engineer · 2 hours ago", unread: true },
    { icon: "🎯", title: "8 candidates matched above 75% threshold", sub: "Software Engineer · 3 hours ago", unread: true },
    { icon: "⭐", title: "3 candidates were shortlisted", sub: "Data Scientist · 5 hours ago", unread: true },
    { icon: "📄", title: "New job application received", sub: "ML Engineer · Yesterday", unread: false },
    { icon: "✅", title: "Resume screening completed", sub: "Software Engineer · 48 resumes screened · Yesterday", unread: false },
  ];
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Notifications</h2>
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col divide-y divide-slate-100">
        {notifs.map((n, i) => (
          <div key={i} className={`flex items-start gap-3 px-5 py-4 transition-colors ${n.unread ? "bg-blue-50/30" : ""}`}>
            <div className="text-xl shrink-0 mt-0.5">{n.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${n.unread ? "text-slate-900" : "text-slate-700"}`}>{n.title}</span>
                {n.unread && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{n.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} className={`relative w-10 h-5.5 rounded-full transition-colors shrink-0 ${value ? "bg-blue-600" : "bg-slate-200"}`} style={{ height: "22px" }}>
      <div className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} style={{ width: "18px", height: "18px" }} />
    </button>
  );
}

function RecruiterSettings() {
  const { toast } = useToast();
  const [prefs, setPrefs] = useState({ threshold: 75, ats: true, skills: true, experience: true, keywords: true });
  const [notifs, setNotifs] = useState({ email: true, newCandidates: true, screeningDone: false, shortlist: true });
  const setPref = (k: keyof typeof prefs) => (v: boolean | number) => setPrefs(p => ({ ...p, [k]: v }));
  const setNotif = (k: keyof typeof notifs) => (v: boolean) => setNotifs(n => ({ ...n, [k]: v }));

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Recruiter Settings</h2>

      {/* Account */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
        <div className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-3">Account</div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name" value="HR Manager" onChange={() => {}} placeholder="Your name" />
          <Field label="Work Email" type="email" value="hr@company.com" onChange={() => {}} placeholder="Work email" />
          <Field label="Company" value="Example Company" onChange={() => {}} placeholder="Company name" />
          <Field label="Role" value="Hiring Manager" onChange={() => {}} placeholder="Your role" />
        </div>
        <button onClick={() => toast("success", "Account updated.")}
          className="self-start px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
          Save Changes
        </button>
      </div>

      {/* Screening Preferences */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
        <div className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-3">Screening Preferences</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-700">Match Threshold</div>
            <div className="text-xs text-slate-500">Highlight candidates above this score</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPref("threshold")(Math.max(50, prefs.threshold - 5))} className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-sm">−</button>
            <span className="w-12 text-center text-sm font-bold text-slate-900">{prefs.threshold}%</span>
            <button onClick={() => setPref("threshold")(Math.min(95, prefs.threshold + 5))} className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-sm">+</button>
          </div>
        </div>
        {([
          { key: "ats", label: "ATS Analysis", sub: "Include ATS score in screening" },
          { key: "skills", label: "Skills Matching", sub: "Match against required skills" },
          { key: "experience", label: "Experience Matching", sub: "Consider experience level" },
          { key: "keywords", label: "Keyword Matching", sub: "Match job description keywords" },
        ] as const).map(s => (
          <div key={s.key} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-700">{s.label}</div>
              <div className="text-xs text-slate-500">{s.sub}</div>
            </div>
            <Toggle value={prefs[s.key] as boolean} onChange={v => setPref(s.key)(v)} />
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
        <div className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-3">Notifications</div>
        {([
          { key: "email", label: "Email Notifications", sub: "Receive updates via email" },
          { key: "newCandidates", label: "New Candidates", sub: "Alert when new applications arrive" },
          { key: "screeningDone", label: "Screening Completed", sub: "Alert when AI screening finishes" },
          { key: "shortlist", label: "Shortlist Updates", sub: "Notify on shortlist changes" },
        ] as const).map(s => (
          <div key={s.key} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-700">{s.label}</div>
              <div className="text-xs text-slate-500">{s.sub}</div>
            </div>
            <Toggle value={notifs[s.key]} onChange={setNotif(s.key)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RecruiterPage shell ───────────────────────────────────────────────────────

interface RecruiterPageProps {
  onCandidateLogin: () => void;
}

export default function RecruiterPage({ onCandidateLogin }: RecruiterPageProps) {
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState<RecruiterView>("dashboard");
  const [detailId, setDetailId] = useState(1);

  if (!authed) {
    return <RecruiterAuth onSuccess={() => setAuthed(true)} onCandidateLogin={onCandidateLogin} />;
  }

  const VIEW_TITLES: Partial<Record<RecruiterView, string>> = {
    dashboard: "Recruiter Dashboard",
    jobs: "Job Openings",
    "create-job": "Create Job Opening",
    candidates: "Candidates",
    "candidate-detail": "Candidate Profile",
    compare: "Compare Candidates",
    shortlisted: "Shortlisted Candidates",
    reports: "Recruitment Reports",
    notifications: "Notifications",
    settings: "Settings",
  };

  const nav = (v: RecruiterView) => { setView(v); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <RecruiterSidebar active={view} onNav={nav} onSignOut={() => setAuthed(false)} />

      <div className="flex-1 flex flex-col lg:ml-0 min-w-0">
        <RecruiterTopbar title={VIEW_TITLES[view] ?? "Recruiter"} onNotifications={() => nav("notifications")} onNav={nav} />

        <main className="flex-1 px-4 sm:px-6 py-6 max-w-6xl w-full mx-auto">
          {view === "dashboard" && <DashboardView onNav={nav} />}
          {view === "jobs" && <JobsView onNav={nav} onCreateJob={() => nav("create-job")} />}
          {view === "create-job" && <CreateJobView onBack={() => nav("jobs")} onSuccess={() => nav("jobs")} />}
          {view === "candidates" && <CandidatesView onView={(id) => { setDetailId(id); nav("candidate-detail"); }} onCompare={() => nav("compare")} />}
          {view === "candidate-detail" && <CandidateDetailView candidateId={detailId} onBack={() => nav("candidates")} />}
          {view === "compare" && <CompareView onBack={() => nav("candidates")} />}
          {view === "shortlisted" && <ShortlistedView onView={(id) => { setDetailId(id); nav("candidate-detail"); }} />}
          {view === "reports" && <ReportsView />}
          {view === "notifications" && <NotificationsView />}
          {view === "settings" && <RecruiterSettings />}
        </main>
      </div>
    </div>
  );
}
