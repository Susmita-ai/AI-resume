import React, { useState, useEffect } from "react";
import { IconLogo, PrimaryButton, SecondaryButton } from "./ui";
import { useToast } from "./Toast";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CANDIDATE = {
  name: "Susmita Yadav",
  role: "Software Engineer",
  company: "Amazon",
  resume: "Susmita_Yadav_Resume.pdf",
  date: "September 2026",
};

// ─── Small helpers ─────────────────────────────────────────────────────────────

function ScoreRingSmall({ score, max = 100, size = 72, color = "#4f6ef7" }: {
  score: number; max?: number; size?: number; color?: string;
}) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / max) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={circ - fill} strokeLinecap="round" />
    </svg>
  );
}

function Bar({ pct, color = "bg-blue-500" }: { pct: number; color?: string }) {
  return (
    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%`, transition: "width 0.8s ease" }} />
    </div>
  );
}

function Badge({ label, variant }: { label: string; variant: "high" | "medium" | "low" }) {
  const cls = variant === "high"
    ? "bg-red-100 text-red-700 border-red-200"
    : variant === "medium"
    ? "bg-amber-100 text-amber-700 border-amber-200"
    : "bg-slate-100 text-slate-600 border-slate-200";
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cls}`}>{label}</span>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-extrabold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
      {children}
    </h2>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}

// ─── Loading state ─────────────────────────────────────────────────────────────

function ReportLoading() {
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState(0);
  const steps = ["Parsing resume…", "Analyzing ATS compatibility…", "Matching skills to job description…", "Generating AI recommendations…", "Finalizing report…"];

  useEffect(() => {
    const iv = setInterval(() => setPct(p => Math.min(p + 2, 97)), 60);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-8 px-6">
      <div className="flex items-center gap-2.5">
        <IconLogo />
        <span className="font-bold text-slate-900 text-lg" style={{ fontFamily: "var(--font-display)" }}>ResumeAI</span>
      </div>
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>
          <svg className="animate-spin" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Generating Your Report</h2>
          <p className="text-sm text-slate-500 mt-1">{steps[step]}</p>
        </div>
        <div className="w-64 flex flex-col gap-2">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-200" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #4f6ef7, #8b5cf6)" }} />
          </div>
          <span className="text-xs text-slate-400">{pct}% complete</span>
        </div>
      </div>
    </div>
  );
}

// ─── Report header ─────────────────────────────────────────────────────────────

function ReportHeader({ onBack, onPrint }: { onBack: () => void; onPrint: () => void }) {
  const { toast } = useToast();
  const [sharing, setSharing] = useState(false);
  const [pdfState, setPdfState] = useState<"idle" | "generating" | "ready">("idle");

  const handleDownload = () => {
    setPdfState("generating");
    toast("info", "Generating PDF report…");
    setTimeout(() => {
      setPdfState("ready");
      toast("success", "PDF is ready to download!");
      setTimeout(() => setPdfState("idle"), 3000);
    }, 2200);
  };

  const handleShare = () => {
    setSharing(true);
    setTimeout(() => {
      setSharing(false);
      toast("success", "Report link copied to clipboard!");
    }, 1000);
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm print:hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          <span className="hidden sm:inline">Dashboard</span>
        </button>
        <div className="flex-1 hidden sm:block">
          <span className="text-sm font-semibold text-slate-700">AI Resume Analysis Report</span>
          <span className="text-xs text-slate-400 ml-2">· {CANDIDATE.name} · {CANDIDATE.date}</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={handleShare} disabled={sharing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60">
            {sharing ? (
              <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            )}
            <span className="hidden sm:inline">Share</span>
          </button>
          <button onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            <span className="hidden sm:inline">Print</span>
          </button>
          <button onClick={handleDownload} disabled={pdfState === "generating"}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white transition-all disabled:opacity-70"
            style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>
            {pdfState === "generating" ? (
              <>
                <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                <span className="hidden sm:inline">Generating…</span>
              </>
            ) : pdfState === "ready" ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="hidden sm:inline">Download PDF</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span className="hidden sm:inline">Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section 1: Executive Summary ─────────────────────────────────────────────

function ExecutiveSummary() {
  const scores = [
    { label: "Resume Score", val: 82, max: 100, color: "#4f6ef7", sub: "Good" },
    { label: "ATS Compatibility", val: 88, max: 100, color: "#10b981", sub: "Strong" },
    { label: "Job Match", val: 79, max: 100, color: "#8b5cf6", sub: "Good Fit" },
    { label: "Skills Match", val: 85, max: 100, color: "#f59e0b", sub: "Strong" },
  ];

  return (
    <Card>
      {/* Report identity */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <IconLogo />
            <span className="text-sm font-bold text-slate-500">AI Resume Analysis Report</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Resume Performance Summary
          </h1>
        </div>
        <div className="text-sm text-slate-500 shrink-0">
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <span className="font-semibold text-slate-700">Candidate:</span><span>{CANDIDATE.name}</span>
            <span className="font-semibold text-slate-700">Target Role:</span><span>{CANDIDATE.role}</span>
            <span className="font-semibold text-slate-700">Company:</span><span>{CANDIDATE.company}</span>
            <span className="font-semibold text-slate-700">Date:</span><span>{CANDIDATE.date}</span>
          </div>
        </div>
      </div>

      {/* Score rings */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {scores.map(s => (
          <div key={s.label} className="flex flex-col items-center gap-2 bg-slate-50 rounded-xl p-4">
            <div className="relative">
              <ScoreRingSmall score={s.val} max={s.max} size={72} color={s.color} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-extrabold text-slate-900">{s.val}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-slate-700">{s.label}</div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: s.color }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* AI summary */}
      <div className="flex gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <div>
          <div className="text-xs font-bold text-blue-700 mb-1">AI Summary</div>
          <p className="text-sm text-slate-700 leading-relaxed">
            "Your resume demonstrates strong technical skills and relevant projects. Improving keyword coverage, measurable project achievements, and cloud-related skills could strengthen alignment with the target role."
          </p>
        </div>
      </div>
    </Card>
  );
}

// ─── Section 2: Score Breakdown ────────────────────────────────────────────────

function ScoreBreakdown() {
  const items = [
    { label: "Resume Quality", score: 82, desc: "Well-structured with clear sections. Minor formatting improvements suggested.", color: "bg-blue-500" },
    { label: "ATS Compatibility", score: 88, desc: "Passes most ATS filters. Missing a few high-value keywords.", color: "bg-emerald-500" },
    { label: "Job Match", score: 79, desc: "Strong alignment with the role. Cloud and system design gaps noted.", color: "bg-purple-500" },
    { label: "Skills Match", score: 85, desc: "Core technical skills present. Add AWS, Docker for full coverage.", color: "bg-amber-500" },
    { label: "Experience Relevance", score: 76, desc: "Projects are relevant; work experience context could be strengthened.", color: "bg-rose-500" },
    { label: "Project Relevance", score: 86, desc: "AI/ML projects are highly relevant to the target role.", color: "bg-teal-500" },
  ];

  return (
    <Card>
      <SectionHeading>Score Breakdown</SectionHeading>
      <div className="flex flex-col gap-4">
        {items.map(item => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-slate-700">{item.label}</span>
              <span className="text-sm font-extrabold text-slate-900">{item.score}/100</span>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <Bar pct={item.score} color={item.color} />
            </div>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Section 3: ATS Analysis ───────────────────────────────────────────────────

function ATSAnalysis() {
  const passed = [
    "Standard section headings",
    "Contact information detected",
    "Skills detected",
    "Education detected",
    "Projects detected",
    "Relevant keywords detected",
    "Readable formatting",
  ];
  const warnings = [
    "Some target keywords are missing",
    "Some project descriptions lack measurable outcomes",
  ];
  const tips = [
    { title: "Add target keywords", desc: "Include 'AWS', 'Docker', 'system design', 'microservices' in your skills or project descriptions where accurate." },
    { title: "Quantify your work", desc: "Replace vague descriptions with numbers: accuracy %, performance gain, users served, etc." },
    { title: "Mirror the job description", desc: "Use exact phrases from the Amazon job posting in your bullet points to boost ATS ranking." },
  ];

  return (
    <Card>
      <div className="flex items-start justify-between mb-5">
        <SectionHeading>ATS Compatibility Analysis</SectionHeading>
        <div className="text-right shrink-0">
          <div className="text-3xl font-extrabold" style={{ color: "#10b981" }}>88</div>
          <div className="text-xs text-slate-500 font-medium">out of 100</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="text-xs font-bold text-emerald-700 mb-2.5">Passed Checks</div>
          <div className="flex flex-col gap-2">
            {passed.map(p => (
              <div key={p} className="flex items-center gap-2 text-sm text-emerald-800">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="text-xs font-bold text-amber-700 mb-2.5">Warnings</div>
          <div className="flex flex-col gap-2">
            {warnings.map(w => (
              <div key={w} className="flex items-start gap-2 text-sm text-amber-800">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-bold text-slate-700 mb-3">How to Improve ATS Score</div>
        <div className="flex flex-col gap-2.5">
          {tips.map((t, i) => (
            <div key={t.title} className="flex gap-3 bg-slate-50 rounded-xl p-3.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>{i + 1}</div>
              <div>
                <div className="text-sm font-semibold text-slate-800">{t.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── Section 4: Job Match Analysis ────────────────────────────────────────────

function JobMatchAnalysis() {
  const breakdown = [
    { label: "Technical Skills", val: 85, color: "bg-blue-500" },
    { label: "Experience", val: 72, color: "bg-purple-500" },
    { label: "Education", val: 95, color: "bg-emerald-500" },
    { label: "Projects", val: 88, color: "bg-amber-500" },
    { label: "Keywords", val: 74, color: "bg-rose-400" },
  ];
  const matching = ["Python", "SQL", "Machine Learning", "Pandas", "Scikit-learn", "FastAPI", "Git"];
  const missing = ["AWS", "Docker", "React", "System Design"];

  return (
    <Card>
      <div className="flex items-start justify-between mb-5">
        <SectionHeading>Job Match Analysis</SectionHeading>
        <div className="text-right shrink-0">
          <div className="text-3xl font-extrabold" style={{ color: "#8b5cf6" }}>79%</div>
          <div className="text-xs text-slate-500 font-medium">Overall Match</div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {breakdown.map(b => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="text-sm text-slate-600 w-36 shrink-0">{b.label}</span>
            <Bar pct={b.val} color={b.color} />
            <span className="text-sm font-bold text-slate-800 w-10 text-right shrink-0">{b.val}%</span>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="text-xs font-bold text-emerald-700 mb-2.5">Matching Skills</div>
          <div className="flex flex-wrap gap-1.5">
            {matching.map(s => (
              <span key={s} className="flex items-center gap-1 text-xs font-semibold bg-white border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-full">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="text-xs font-bold text-red-700 mb-2.5">Missing Skills</div>
          <div className="flex flex-wrap gap-1.5">
            {missing.map(s => (
              <span key={s} className="flex items-center gap-1 text-xs font-semibold bg-white border border-red-200 text-red-700 px-2.5 py-1 rounded-full">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Section 5: Keyword Analysis ──────────────────────────────────────────────

function KeywordAnalysis() {
  const matched = ["software development", "Python", "SQL", "API", "machine learning", "Git", "data analysis"];
  const missing = ["cloud", "AWS", "Docker", "microservices", "system design"];

  return (
    <Card>
      <SectionHeading>Keyword Analysis</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Matched Keywords</div>
          <div className="flex flex-wrap gap-1.5">
            {matched.map(k => (
              <span key={k} className="text-xs font-medium bg-blue-50 border border-blue-200 text-blue-800 px-2.5 py-1 rounded-full">{k}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Missing Keywords</div>
          <div className="flex flex-wrap gap-1.5">
            {missing.map(k => (
              <span key={k} className="text-xs font-medium bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">{k}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
        <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <p className="text-xs text-amber-800">Only add keywords that accurately represent your skills or experience.</p>
      </div>
    </Card>
  );
}

// ─── Section 6: Skills Analysis ───────────────────────────────────────────────

function SkillsAnalysis() {
  const groups = [
    { label: "Programming", color: "text-blue-700 bg-blue-50 border-blue-200", skills: [{ name: "Python", pct: 90 }, { name: "Java", pct: 72 }, { name: "C++", pct: 65 }] },
    { label: "Data & AI", color: "text-purple-700 bg-purple-50 border-purple-200", skills: [{ name: "Machine Learning", pct: 85 }, { name: "Pandas", pct: 88 }, { name: "NumPy", pct: 80 }, { name: "Scikit-learn", pct: 82 }] },
    { label: "Backend", color: "text-emerald-700 bg-emerald-50 border-emerald-200", skills: [{ name: "FastAPI", pct: 78 }, { name: "Django", pct: 70 }] },
    { label: "Database", color: "text-amber-700 bg-amber-50 border-amber-200", skills: [{ name: "SQL", pct: 85 }, { name: "MongoDB", pct: 68 }] },
    { label: "Tools", color: "text-slate-700 bg-slate-50 border-slate-200", skills: [{ name: "Git", pct: 92 }, { name: "Jupyter", pct: 88 }, { name: "VS Code", pct: 90 }] },
  ];

  return (
    <Card>
      <SectionHeading>Skills Detected</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-5">
        {groups.map(g => (
          <div key={g.label}>
            <div className={`text-xs font-bold px-2.5 py-1 rounded-full border inline-block mb-3 ${g.color}`}>{g.label}</div>
            <div className="flex flex-col gap-2.5">
              {g.skills.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-700 font-medium">{s.name}</span>
                    <span className="text-xs font-semibold text-slate-500">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: "linear-gradient(90deg, #4f6ef7, #8b5cf6)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Section 7: Resume Content Analysis ──────────────────────────────────────

function ResumeContentAnalysis() {
  const projects = [
    { name: "AI Resume Analyzer", relevance: 94, desc: "NLP-powered resume scoring system using Python, FastAPI, and ML models." },
    { name: "AgriYield", relevance: 88, desc: "Crop yield prediction using machine learning with Pandas and Scikit-learn." },
    { name: "GestureX", relevance: 74, desc: "Real-time hand gesture recognition using OpenCV and MediaPipe." },
  ];
  const certs = ["NPTEL: Python for Data Science", "Coursera: Machine Learning Specialization", "Google: Data Analytics Certificate"];

  return (
    <Card>
      <SectionHeading>Resume Content Analysis</SectionHeading>
      <div className="flex flex-col gap-5">
        {/* Education */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Education</div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">B.Tech CSE (AI)</div>
              <div className="text-sm text-slate-600">Babu Banarasi Das University</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">Detected ✓</span>
                <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">Relevance: 95%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Experience</div>
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            No formal work experience listed. Project experience is strong.
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Projects</div>
          <div className="flex flex-col gap-2.5">
            {projects.map(p => (
              <div key={p.name} className="flex items-start gap-3 bg-slate-50 rounded-xl p-3.5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-900">{p.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: p.relevance >= 90 ? "#dcfce7" : p.relevance >= 80 ? "#dbeafe" : "#fef3c7", color: p.relevance >= 90 ? "#15803d" : p.relevance >= 80 ? "#1d4ed8" : "#92400e" }}>
                      {p.relevance}% Relevant
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Certifications</div>
          <div className="flex flex-col gap-2">
            {certs.map(c => (
              <div key={c} className="flex items-center gap-2.5 text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Section 8: AI Recommendations ────────────────────────────────────────────

function AIRecommendations() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const recs = [
    {
      id: "metrics",
      priority: "high" as const,
      title: "Improve measurable achievements",
      desc: "Add metrics, percentages, performance improvements, or measurable outcomes to project descriptions where accurate.",
      action: "Add Metrics to Projects",
    },
    {
      id: "keywords",
      priority: "high" as const,
      title: "Improve keyword coverage",
      desc: "Add relevant target-job keywords when they accurately represent your skills. Focus on: AWS, Docker, microservices, system design.",
      action: "Review Keywords",
    },
    {
      id: "summary",
      priority: "medium" as const,
      title: "Strengthen professional summary",
      desc: "Your summary should mention the specific role, company, and 2–3 quantified achievements within the first sentence.",
      action: "Edit Summary",
    },
    {
      id: "projects",
      priority: "medium" as const,
      title: "Improve project descriptions",
      desc: "Replace generic verbs (worked on, built) with impact verbs (developed, architected, optimized). Each project should have a measurable outcome.",
      action: "Edit Projects",
    },
    {
      id: "skills",
      priority: "medium" as const,
      title: "Add relevant technical skills",
      desc: "Consider learning and adding: AWS (EC2, S3, Lambda), Docker, basic React, and system design fundamentals.",
      action: "Update Skills",
    },
  ];

  return (
    <Card>
      <SectionHeading>Personalized AI Recommendations</SectionHeading>
      <div className="flex flex-col gap-3">
        {recs.map(r => (
          <div key={r.id} className={`border rounded-xl transition-all ${expanded === r.id ? "border-blue-200 bg-blue-50/40" : "border-slate-100 bg-white hover:border-slate-200"}`}>
            <button className="w-full flex items-center gap-3 p-4 text-left" onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
              <div className="shrink-0"><Badge label={r.priority === "high" ? "High" : "Medium"} variant={r.priority} /></div>
              <span className="flex-1 text-sm font-semibold text-slate-800">{r.title}</span>
              <svg className={`shrink-0 transition-transform ${expanded === r.id ? "rotate-180" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {expanded === r.id && (
              <div className="px-4 pb-4 flex flex-col gap-3">
                <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                <button className="self-start flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  {r.action}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Section 9: Before & After ────────────────────────────────────────────────

function BeforeAfter() {
  const { toast } = useToast();

  const examples = [
    {
      label: "Project Description",
      before: "Worked on a machine learning project.",
      after: "Developed a machine learning prediction system using Python and Scikit-learn, implementing data preprocessing, feature engineering, and model evaluation achieving 92% accuracy on the test dataset.",
    },
    {
      label: "Professional Summary",
      before: "Computer science student with interest in AI and machine learning.",
      after: "B.Tech CSE (AI) student with hands-on experience building ML systems using Python, Scikit-learn, and FastAPI. Delivered 3 end-to-end projects achieving measurable results. Targeting Software Engineer roles at top tech companies.",
    },
  ];

  return (
    <Card>
      <SectionHeading>AI Resume Improvement Examples</SectionHeading>
      <div className="flex flex-col gap-5">
        {examples.map(e => (
          <div key={e.label} className="border border-slate-100 rounded-xl overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5">
              <span className="text-xs font-bold text-slate-600">{e.label}</span>
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  <span className="text-xs font-bold text-red-600">Before</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed bg-red-50 rounded-lg px-3 py-2.5">"{e.before}"</p>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-xs font-bold text-emerald-600">After</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed bg-emerald-50 rounded-lg px-3 py-2.5">"{e.after}"</p>
                <button
                  onClick={() => toast("success", "Copied to clipboard!")}
                  className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Copy Improved Version
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Section 10: Improvement Roadmap ─────────────────────────────────────────

function ImprovementRoadmap() {
  const steps = [
    { num: 1, title: "Fix ATS Issues", desc: "Ensure all headings, contact info, and formatting pass ATS filters.", color: "#4f6ef7", done: true },
    { num: 2, title: "Improve Keywords", desc: "Add missing high-value keywords from the job description.", color: "#8b5cf6", done: false },
    { num: 3, title: "Strengthen Projects", desc: "Add measurable outcomes to all project descriptions.", color: "#10b981", done: false },
    { num: 4, title: "Optimize for Target Job", desc: "Tailor your resume specifically for Amazon's SDE role.", color: "#f59e0b", done: false },
  ];

  return (
    <Card>
      <SectionHeading>Your Resume Improvement Roadmap</SectionHeading>
      <div className="relative">
        <div className="absolute left-5 top-6 bottom-6 w-px bg-slate-200" />
        <div className="flex flex-col gap-5">
          {steps.map((s, i) => (
            <div key={s.num} className="flex gap-4 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${s.done ? "border-emerald-400 bg-emerald-400" : "border-slate-200 bg-white"}`}
                style={!s.done ? { borderColor: s.color } : {}}>
                {s.done ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <span className="text-sm font-extrabold" style={{ color: s.color }}>{s.num}</span>
                )}
              </div>
              <div className={`flex-1 bg-slate-50 rounded-xl p-4 ${i < steps.length - 1 ? "mb-0" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-slate-900">Step {s.num}: {s.title}</span>
                  {s.done && <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Done</span>}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── Section 11: Final AI Summary ─────────────────────────────────────────────

function FinalSummary() {
  const strengths = [
    "Strong technical skills",
    "Relevant AI/ML projects",
    "Good educational background",
    "Good ATS structure",
  ];
  const improve = [
    "Keyword coverage",
    "Measurable achievements",
    "Cloud skills",
    "Project descriptions",
  ];

  return (
    <Card>
      <SectionHeading>AI Summary</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="text-xs font-bold text-emerald-700 mb-2.5">Strengths</div>
          <div className="flex flex-col gap-2">
            {strengths.map(s => (
              <div key={s} className="flex items-center gap-2 text-sm text-emerald-800">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="text-xs font-bold text-amber-700 mb-2.5">Areas to Improve</div>
          <div className="flex flex-col gap-2">
            {improve.map(s => (
              <div key={s} className="flex items-center gap-2 text-sm text-amber-800">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          "Your resume is a strong starting point. Apply the recommended improvements and analyze it again to track your progress."
        </p>
      </div>
    </Card>
  );
}

// ─── Bottom Actions ────────────────────────────────────────────────────────────

function BottomActions({ onAnalyzeAgain }: { onAnalyzeAgain: () => void }) {
  const { toast } = useToast();
  return (
    <Card className="print:hidden">
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div>
          <div className="text-base font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Ready to improve your resume?</div>
          <div className="text-sm text-slate-500 mt-0.5">Apply these recommendations and analyze again.</div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center">
          <button onClick={() => toast("info", "Generating PDF…")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF
          </button>
          <button onClick={() => toast("info", "Opening print dialog…")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print Report
          </button>
          <button onClick={() => toast("success", "Report link copied!")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share Report
          </button>
          <PrimaryButton onClick={onAnalyzeAgain} className="px-5 py-2.5 rounded-xl text-sm font-bold">
            Analyze Another Resume
          </PrimaryButton>
        </div>
      </div>
    </Card>
  );
}

// ─── Report print footer ───────────────────────────────────────────────────────

function PrintFooter({ page, total }: { page: number; total: number }) {
  return (
    <div className="hidden print:flex items-center justify-between text-xs text-slate-400 border-t border-slate-200 pt-3 mt-4">
      <span>AI Resume Analysis Report · {CANDIDATE.name} · {CANDIDATE.date}</span>
      <span>Page {page} of {total}</span>
    </div>
  );
}

// ─── ReportPage shell ─────────────────────────────────────────────────────────

interface ReportPageProps {
  onBack: () => void;
  onAnalyzeAgain: () => void;
}

export default function ReportPage({ onBack, onAnalyzeAgain }: ReportPageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3200);
    return () => clearTimeout(t);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <ReportLoading />;

  return (
    <div className="min-h-screen bg-slate-50">
      <ReportHeader onBack={onBack} onPrint={handlePrint} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
        {/* Report title bar (print only) */}
        <div className="hidden print:block border-b border-slate-200 pb-4 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconLogo />
              <span className="font-bold text-slate-700 text-sm" style={{ fontFamily: "var(--font-display)" }}>ResumeAI · AI Resume Analysis Report</span>
            </div>
            <span className="text-xs text-slate-400">{CANDIDATE.date}</span>
          </div>
        </div>

        {/* Page 1: Executive Summary + Score Breakdown */}
        <div className="print:break-after-page flex flex-col gap-5">
          <ExecutiveSummary />
          <ScoreBreakdown />
          <PrintFooter page={1} total={6} />
        </div>

        {/* Page 2: ATS + Job Match */}
        <div className="print:break-after-page flex flex-col gap-5">
          <ATSAnalysis />
          <JobMatchAnalysis />
          <PrintFooter page={2} total={6} />
        </div>

        {/* Page 3: Keywords + Skills */}
        <div className="print:break-after-page flex flex-col gap-5">
          <KeywordAnalysis />
          <SkillsAnalysis />
          <PrintFooter page={3} total={6} />
        </div>

        {/* Page 4: Resume Content */}
        <div className="print:break-after-page flex flex-col gap-5">
          <ResumeContentAnalysis />
          <PrintFooter page={4} total={6} />
        </div>

        {/* Page 5: AI Recommendations + Before/After */}
        <div className="print:break-after-page flex flex-col gap-5">
          <AIRecommendations />
          <BeforeAfter />
          <PrintFooter page={5} total={6} />
        </div>

        {/* Page 6: Roadmap + Final Summary */}
        <div className="print:break-after-page flex flex-col gap-5">
          <ImprovementRoadmap />
          <FinalSummary />
          <PrintFooter page={6} total={6} />
        </div>

        {/* Bottom actions (screen only) */}
        <BottomActions onAnalyzeAgain={onAnalyzeAgain} />
      </div>
    </div>
  );
}
