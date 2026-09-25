import React, { useState, useRef, useEffect } from "react";
import { PrimaryButton, SecondaryButton } from "./ui";
import { useToast } from "./Toast";

// ─── Types ─────────────────────────────────────────────────────────────────────

type CopilotView =
  | "landing"
  | "workspace"
  | "bullets"
  | "keywords"
  | "optimize"
  | "chat"
  | "review"
  | "versions";

type SectionKey = "summary" | "skills" | "experience" | "projects" | "education" | "certifications";

interface Section {
  key: SectionKey;
  label: string;
  status: "good" | "warning" | "unanalyzed";
  icon: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const SECTIONS: Section[] = [
  { key: "summary", label: "Professional Summary", status: "warning", icon: "📝" },
  { key: "skills", label: "Skills", status: "good", icon: "💡" },
  { key: "experience", label: "Experience", status: "warning", icon: "💼" },
  { key: "projects", label: "Projects", status: "warning", icon: "🚀" },
  { key: "education", label: "Education", status: "good", icon: "🎓" },
  { key: "certifications", label: "Certifications", status: "unanalyzed", icon: "🏅" },
];

const SECTION_CONTENT: Record<SectionKey, { current: string; improved: string; suggestions: string[] }> = {
  summary: {
    current: "Computer science student with knowledge of programming and machine learning.",
    improved: "B.Tech CSE (AI) student specializing in machine learning and full-stack development, with hands-on experience building Python-based ML applications, FastAPI backends, and data analysis solutions. Targeting Software Engineer roles at top product companies.",
    suggestions: ["Make the summary more role-specific", "Add technical skills with proficiency", "Mention measurable impact or outcomes"],
  },
  skills: {
    current: "Python, Java, C++, Machine Learning, SQL, Git, FastAPI, Django, MongoDB",
    improved: "Python, Java, C++, Machine Learning, Pandas, NumPy, Scikit-learn, FastAPI, Django, SQL, MongoDB, Git, Docker (learning), AWS (learning)",
    suggestions: ["Add cloud skills like AWS or GCP", "Group skills by category", "Include proficiency levels"],
  },
  experience: {
    current: "Worked on various software projects during internship.",
    improved: "Developed and deployed a FastAPI-based REST service handling 500+ daily requests, reducing query latency by 30%. Collaborated with a 4-member team using Git workflows and Agile sprints.",
    suggestions: ["Add measurable impact metrics", "Use strong action verbs (built, optimized, reduced)", "Specify your individual contribution"],
  },
  projects: {
    current: "Developed a machine learning project to predict crop yield.",
    improved: "Developed AgriYield, a crop-yield prediction system using Python, Pandas, and Scikit-learn. Implemented data preprocessing, feature engineering, and ensemble models achieving 88% prediction accuracy on test data.",
    suggestions: ["Add technical implementation details", "Explain your specific contribution", "Include measurable results (accuracy, users, speed)"],
  },
  education: {
    current: "B.Tech in Computer Science from Babu Banarasi Das University.",
    improved: "B.Tech CSE (Artificial Intelligence) · Babu Banarasi Das University · 2022–2026 · CGPA: 8.4/10. Relevant coursework: Machine Learning, Data Structures, Cloud Computing, Database Systems.",
    suggestions: ["Add CGPA if strong", "List relevant coursework", "Mention academic achievements or awards"],
  },
  certifications: {
    current: "Completed some online courses in Python and data science.",
    improved: "NPTEL: Python for Data Science (Elite Certificate) · Coursera: Machine Learning Specialization (Andrew Ng) · Google: Data Analytics Professional Certificate",
    suggestions: ["Name each certification specifically", "Add the issuing organization", "Include certificate ID or link"],
  },
};

const IMPROVEMENT_OPTIONS = [
  "Make it more professional",
  "Make it concise",
  "Add measurable impact",
  "Improve ATS keywords",
  "Make it more technical",
  "Match target job",
  "Use stronger action verbs",
];

const CHAT_HISTORY = [
  { role: "user" as const, text: "How can I improve my project section?" },
  { role: "ai" as const, text: "Your projects are technically relevant, but several descriptions focus on what you built rather than the impact. I recommend adding your role, technologies used, implementation details, and measurable outcomes where available. For example, replace 'built a machine learning model' with 'developed a prediction model achieving X% accuracy using Python and Scikit-learn.'" },
];

const SUGGESTED_PROMPTS = [
  "Improve my summary",
  "Make my projects stronger",
  "Find missing keywords",
  "Optimize for Amazon SDE",
  "Make my resume ATS-friendly",
];

// ─── Shared helpers ─────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: Section["status"] }) {
  if (status === "good") return (
    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Good
    </span>
  );
  if (status === "warning") return (
    <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      Needs Improvement
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
      <span className="w-3 h-3 rounded-full border-2 border-slate-300 inline-block" />
      Not Analyzed
    </span>
  );
}

function GradBtn({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 ${className}`}
      style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>
      {children}
    </button>
  );
}

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function Spinner() {
  return <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
}

// ─── Landing ───────────────────────────────────────────────────────────────────

function CopilotLanding({ onStart, onAnalysis }: { onStart: () => void; onAnalysis: () => void }) {
  const features = [
    { icon: "✍️", title: "AI Rewrite", desc: "Rewrite any section with one click" },
    { icon: "🎯", title: "Job Targeting", desc: "Match your resume to any job description" },
    { icon: "🔑", title: "ATS Keywords", desc: "Add missing keywords automatically" },
    { icon: "📊", title: "Score Tracking", desc: "See your score improve in real-time" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Hero card */}
      <div className="rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #3b52f5 0%, #6d28d9 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%"><defs><pattern id="cp-dot" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#cp-dot)"/></svg>
        </div>
        <div className="relative px-6 sm:px-10 py-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <SparkIcon />
              </div>
              <span className="text-white/80 text-sm font-semibold">AI Resume Copilot</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Your AI-powered<br />resume assistant
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed mb-5 max-w-md">
              Select any section of your resume and get suggestions, rewrites, keywords, and improvements tailored to your target job.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={onStart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
                <SparkIcon /> Improve My Resume
              </button>
              <button onClick={onAnalysis}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
                View Resume Analysis
              </button>
            </div>
          </div>
          {/* Decorative score card */}
          <div className="shrink-0 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 w-48 hidden sm:block">
            <div className="text-xs font-bold text-white/70 mb-2">Resume Score</div>
            <div className="text-4xl font-extrabold text-white mb-1">82</div>
            <div className="text-xs text-blue-200 mb-3">→ up to 90+ with Copilot</div>
            <div className="flex flex-col gap-1.5">
              {[{ l: "ATS", v: 88 }, { l: "Match", v: 79 }, { l: "Skills", v: 85 }].map(r => (
                <div key={r.l} className="flex items-center gap-2">
                  <span className="text-white/70 text-xs w-10">{r.l}</span>
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white/70 rounded-full" style={{ width: `${r.v}%` }} /></div>
                  <span className="text-white/80 text-xs">{r.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map(f => (
          <div key={f.title} className="bg-white border border-slate-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer" onClick={onStart}>
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="text-sm font-bold text-slate-900">{f.title}</div>
            <div className="text-xs text-slate-500 mt-0.5">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Quick access tools */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5">
        <div className="text-sm font-bold text-slate-700 mb-3">Quick access tools</div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Bullet Point Generator", view: "bullets" as CopilotView },
            { label: "ATS Keyword Optimizer", view: "keywords" as CopilotView },
            { label: "Job Optimization", view: "optimize" as CopilotView },
            { label: "AI Chat Assistant", view: "chat" as CopilotView },
            { label: "Review Changes", view: "review" as CopilotView },
            { label: "Version History", view: "versions" as CopilotView },
          ].map(t => (
            <button key={t.label} onClick={onStart}
              className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all">
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Workspace ─────────────────────────────────────────────────────────────────

function ImprovementControls({ onGenerate, loading }: { onGenerate: (opts: string[]) => void; loading: boolean }) {
  const [selected, setSelected] = useState<string[]>(["Make it more professional", "Add measurable impact"]);
  const [custom, setCustom] = useState("");

  const toggle = (o: string) => setSelected(s => s.includes(o) ? s.filter(x => x !== o) : [...s, o]);

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-3">
      <div className="text-xs font-bold text-slate-600 uppercase tracking-wide">How should AI improve this section?</div>
      <div className="flex flex-wrap gap-2">
        {IMPROVEMENT_OPTIONS.map(o => {
          const sel = selected.includes(o);
          return (
            <button key={o} onClick={() => toggle(o)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${sel ? "border-transparent text-white" : "border-slate-200 text-slate-600 bg-white hover:border-blue-300"}`}
              style={sel ? { background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" } : {}}>
              {sel && "✓ "}{o}
            </button>
          );
        })}
      </div>
      <textarea value={custom} onChange={e => setCustom(e.target.value)} placeholder="Custom instruction — tell AI what you want to improve…"
        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white resize-none"
        rows={2} />
      <GradBtn onClick={() => onGenerate(selected)} className={loading ? "opacity-70 pointer-events-none" : ""}>
        {loading ? <><Spinner /> Generating…</> : <><SparkIcon /> Generate Improvement</>}
      </GradBtn>
    </div>
  );
}

function RewritePanel({ section, onApply }: { section: SectionKey; onApply: () => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const content = SECTION_CONTENT[section];

  const generate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => { setLoading(false); setGenerated(true); }, 1600);
  };

  const apply = () => {
    toast("success", "AI suggestion applied to your resume.");
    onApply();
  };

  const copy = () => toast("success", "Copied to clipboard!");

  return (
    <div className="flex flex-col gap-4">
      {/* Current version */}
      <div className="bg-white border border-slate-100 rounded-xl p-4">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Current Version</div>
        <p className="text-sm text-slate-700 leading-relaxed">{content.current}</p>
      </div>

      {/* Suggestions */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
        <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2.5">AI Suggestions</div>
        <div className="flex flex-col gap-2">
          {content.suggestions.map(s => (
            <div key={s} className="flex items-start gap-2 text-sm text-amber-800">
              <svg className="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <ImprovementControls onGenerate={generate} loading={loading} />

      {/* AI Improved version */}
      {(generated || true) && (
        <div className="bg-white border border-emerald-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-emerald-50 border-b border-emerald-100">
            <span className="text-xs font-bold text-emerald-700">AI Improved Version</span>
            {loading && <Spinner />}
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-700 leading-relaxed">{content.improved}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-100 bg-slate-50 flex-wrap">
            <GradBtn onClick={apply} className="text-xs py-2 px-3">Apply</GradBtn>
            <button onClick={copy} className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Copy</button>
            <button onClick={generate} className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
              Regenerate
            </button>
            <button className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Undo</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Workspace({ onNav }: { onNav: (v: CopilotView) => void }) {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<SectionKey>("summary");
  const [appliedSections, setAppliedSections] = useState<SectionKey[]>([]);

  const apply = () => {
    setAppliedSections(s => [...s, activeSection]);
    toast("success", "AI suggestion applied to your resume.");
  };

  const activeData = SECTIONS.find(s => s.key === activeSection)!;

  return (
    <div className="flex flex-col lg:flex-row gap-5 min-h-[600px]">
      {/* Left panel — sections */}
      <div className="lg:w-56 shrink-0">
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Resume Sections</div>
          </div>
          <div className="flex flex-col">
            {SECTIONS.map(s => {
              const applied = appliedSections.includes(s.key);
              const active = activeSection === s.key;
              return (
                <button key={s.key} onClick={() => setActiveSection(s.key)}
                  className={`flex flex-col gap-0.5 px-4 py-3 text-left border-l-2 transition-all ${active ? "border-blue-500 bg-blue-50" : "border-transparent hover:bg-slate-50"}`}>
                  <div className={`text-sm font-semibold ${active ? "text-blue-700" : "text-slate-800"}`}>{s.label}</div>
                  <StatusDot status={applied ? "good" : s.status} />
                </button>
              );
            })}
          </div>
          {/* Tool shortcuts */}
          <div className="border-t border-slate-100 p-3 flex flex-col gap-1.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Tools</div>
            {[
              { label: "Bullet Generator", view: "bullets" as CopilotView, icon: "📝" },
              { label: "ATS Keywords", view: "keywords" as CopilotView, icon: "🔑" },
              { label: "Optimize for Job", view: "optimize" as CopilotView, icon: "🎯" },
              { label: "AI Chat", view: "chat" as CopilotView, icon: "💬" },
              { label: "Review Changes", view: "review" as CopilotView, icon: "✅" },
              { label: "Versions", view: "versions" as CopilotView, icon: "🕒" },
            ].map(t => (
              <button key={t.label} onClick={() => onNav(t.view)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors text-left">
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — workspace */}
      <div className="flex-1 bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
          <div>
            <div className="text-sm font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Improve {activeData.label}
            </div>
            <StatusDot status={appliedSections.includes(activeSection) ? "good" : activeData.status} />
          </div>
          <button onClick={() => toast("success", "Changes saved successfully.")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-white transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          <RewritePanel section={activeSection} onApply={apply} />
        </div>
      </div>
    </div>
  );
}

// ─── Bullet Point Generator ────────────────────────────────────────────────────

function BulletGenerator() {
  const { toast } = useToast();
  const [role, setRole] = useState("Machine Learning Project");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [bullets, setBullets] = useState<string[]>([]);

  const SAMPLE_BULLETS = [
    "Developed a crop yield prediction ML model using Python and Scikit-learn, achieving 88% accuracy on test data.",
    "Implemented end-to-end data preprocessing pipeline reducing training time by 35%.",
    "Designed a RESTful API using FastAPI to serve model predictions to 200+ daily users.",
    "Optimized feature engineering process, improving model performance by 12% on validation set.",
    "Analyzed 10,000+ records using Pandas and NumPy to identify seasonal yield patterns.",
    "Automated model evaluation pipeline, reducing manual testing effort by 60%.",
  ];

  const generate = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setBullets(SAMPLE_BULLETS); }, 1500);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>AI Bullet Point Generator</h2>
        <p className="text-sm text-slate-500">Generate strong, action-verb-led bullet points for any role or project.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Role / Project</label>
          <input value={role} onChange={e => setRole(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="e.g. Machine Learning Project" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">What did you do?</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
            className="px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
            placeholder="Describe what you built, your role, technologies used, and any results…" />
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 mb-2">Strong action verbs</div>
          <div className="flex flex-wrap gap-1.5">
            {["Developed", "Implemented", "Designed", "Optimized", "Analyzed", "Automated", "Architected", "Deployed", "Reduced", "Increased"].map(v => (
              <span key={v} className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full">{v}</span>
            ))}
          </div>
        </div>

        <GradBtn onClick={generate} className={loading ? "opacity-70 pointer-events-none" : ""}>
          {loading ? <><Spinner /> Generating…</> : <><SparkIcon /> Generate Bullet Points</>}
        </GradBtn>
      </div>

      {bullets.length > 0 && (
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-3">
          <div className="text-sm font-bold text-slate-700">Generated Bullet Points</div>
          {bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-3.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              <p className="flex-1 text-sm text-slate-700 leading-relaxed">• {b}</p>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => toast("success", "Copied!")} className="p-1.5 rounded-lg hover:bg-white border border-slate-200 transition-colors text-slate-400 hover:text-slate-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white border border-slate-200 transition-colors text-slate-400 hover:text-slate-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => toast("success", "All bullets applied to resume!")} className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors mt-1">
            Apply All to Resume
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ATS Keyword Optimizer ────────────────────────────────────────────────────

function KeywordOptimizer() {
  const { toast } = useToast();
  const [added, setAdded] = useState<string[]>([]);
  const [ignored, setIgnored] = useState<string[]>([]);

  const present = ["Python", "SQL", "Git", "API", "Machine Learning", "Data Analysis", "FastAPI"];
  const recommended = ["Cloud", "Docker", "REST API", "Testing", "System Design", "AWS", "Microservices"];

  const remaining = recommended.filter(k => !added.includes(k) && !ignored.includes(k));

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>ATS Keyword Optimizer</h2>
        <p className="text-sm text-slate-500">Optimize your keyword coverage for the target job posting.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-5">
        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Target Role</div>
            <div className="text-sm font-bold text-slate-900">Software Engineer · Amazon</div>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <div className="text-lg font-extrabold text-blue-600">{Math.min(100, 74 + added.length * 3)}%</div>
            <div className="text-xs text-slate-500">keyword coverage</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Keywords Already Present ({present.length})</div>
          <div className="flex flex-wrap gap-1.5">
            {[...present, ...added].map(k => (
              <span key={k} className="flex items-center gap-1 text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-full">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {k}
              </span>
            ))}
          </div>
        </div>

        {remaining.length > 0 && (
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Recommended Keywords</div>
            <div className="flex flex-col gap-2">
              {remaining.map(k => (
                <div key={k} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
                  <span className="text-sm font-semibold text-slate-700">{k}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setAdded(a => [...a, k]); toast("success", `"${k}" added to your resume.`); }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
                      Add Keyword
                    </button>
                    <button onClick={() => setIgnored(i => [...i, k])}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">
                      Ignore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {remaining.length === 0 && (
          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <p className="text-sm font-semibold text-emerald-700">All recommended keywords reviewed!</p>
          </div>
        )}

        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <p className="text-xs text-amber-800">Only include keywords that accurately represent your experience.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Job Optimization ─────────────────────────────────────────────────────────

function JobOptimize() {
  const { toast } = useToast();
  const [optimizing, setOptimizing] = useState(false);
  const [done, setDone] = useState(false);

  const checks = [
    { label: "Skills aligned", ok: true },
    { label: "Education aligned", ok: true },
    { label: "Project keywords need improvement", ok: false },
    { label: "Experience section needs stronger impact", ok: false },
  ];

  const optimize = () => {
    setOptimizing(true);
    setTimeout(() => { setOptimizing(false); setDone(true); toast("success", "Resume optimized for Amazon SDE role!"); }, 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>Optimize Resume for Job</h2>
        <p className="text-sm text-slate-500">Tailor every section of your resume to a specific job posting.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-1">
            <div className="text-xs text-slate-500 font-medium">Target Role</div>
            <div className="text-sm font-bold text-slate-900">Software Engineer</div>
            <div className="text-xs text-slate-500">Amazon · Full-time</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium mb-1">Job Match</div>
            <div className="text-3xl font-extrabold" style={{ color: "#8b5cf6" }}>{done ? "86%" : "79%"}</div>
            {done && <div className="text-xs text-emerald-600 font-semibold">+7% improved!</div>}
          </div>
        </div>

        {done && (
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl px-4 py-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <div>
              <div className="text-sm font-bold text-blue-800">Optimization Complete</div>
              <div className="text-xs text-blue-600">Potential match improved from 79% → 86%</div>
            </div>
          </div>
        )}

        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Alignment Checklist</div>
          <div className="flex flex-col gap-2">
            {checks.map(c => (
              <div key={c.label} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl ${c.ok ? "bg-emerald-50 border border-emerald-100" : done ? "bg-emerald-50 border border-emerald-100" : "bg-amber-50 border border-amber-100"}`}>
                {(c.ok || done) ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                )}
                <span className={`text-sm font-medium ${(c.ok || done) ? "text-emerald-800" : "text-amber-800"}`}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {!done && (
          <GradBtn onClick={optimize} className={optimizing ? "opacity-70 pointer-events-none" : ""}>
            {optimizing ? <><Spinner /> Optimizing Resume…</> : <><SparkIcon /> Optimize Resume</>}
          </GradBtn>
        )}

        {done && (
          <div className="flex gap-3">
            <button onClick={() => toast("success", "Changes saved!")} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Save Changes</button>
            <GradBtn onClick={() => toast("info", "Opening report…")} className="flex-1 py-2.5">View Updated Score</GradBtn>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── AI Chat ──────────────────────────────────────────────────────────────────

interface ChatMessage { role: "user" | "ai"; text: string; }

const AI_RESPONSES: Record<string, string> = {
  default: "I'm analyzing your resume now. Could you tell me more about what specific section or aspect you'd like to improve?",
  summary: "Your summary is functional but quite generic. For an Amazon SDE role, lead with your AI/ML specialization, then mention 2–3 specific technologies and one project achievement. Keep it to 3–4 lines.",
  project: "Your projects are technically relevant, but several descriptions focus on what you built rather than the impact. Add your role, technologies, implementation details, and measurable outcomes where available.",
  keyword: "I found 5 high-priority keywords missing from your resume: AWS, Docker, microservices, system design, and testing. Only add those that genuinely represent your skills.",
  ats: "Your resume has a solid ATS structure with 7 passing checks. The main improvements are adding the missing keywords and quantifying your project outcomes. ATS score: 88/100.",
  job: "For the Amazon SDE role, your strongest alignment is in education (95%) and projects (88%). Your weakest areas are experience (72%) and keywords (74%). Focus on those first.",
};

function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_HISTORY);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      const response = lower.includes("summary") ? AI_RESPONSES.summary
        : lower.includes("project") ? AI_RESPONSES.project
        : lower.includes("keyword") ? AI_RESPONSES.keyword
        : lower.includes("ats") ? AI_RESPONSES.ats
        : lower.includes("job") || lower.includes("amazon") ? AI_RESPONSES.job
        : AI_RESPONSES.default;
      setMessages(m => [...m, { role: "ai", text: response }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>Resume AI Assistant</h2>
        <p className="text-sm text-slate-500">Ask anything about your resume — get instant, personalized guidance.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col" style={{ height: 480 }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "ai" && (
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-2 mt-1" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
                  <SparkIcon />
                </div>
              )}
              <div className={`max-w-xs sm:max-w-sm lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "text-white rounded-br-md"
                  : "bg-slate-100 text-slate-700 rounded-bl-md"
              }`} style={m.role === "user" ? { background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" } : {}}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-2" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
                <SparkIcon />
              </div>
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts */}
        <div className="border-t border-slate-100 px-4 py-2.5 flex gap-2 overflow-x-auto scrollbar-none">
          {SUGGESTED_PROMPTS.map(p => (
            <button key={p} onClick={() => send(p)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all whitespace-nowrap">
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-slate-100 p-3 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && send("")}
            placeholder="Ask AI anything about your resume…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white" />
          <button onClick={() => send("")} disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Changes Review ───────────────────────────────────────────────────────────

function ChangesReview() {
  const { toast } = useToast();
  const [decisions, setDecisions] = useState<Record<string, "accepted" | "rejected" | null>>({
    summary: null,
    projects: null,
    keywords: null,
    experience: null,
  });

  const changes = [
    {
      key: "summary",
      label: "Professional Summary",
      original: "Computer science student with knowledge of programming and machine learning.",
      aiVersion: "B.Tech CSE (AI) student specializing in ML and full-stack development, with hands-on experience building Python-based ML applications and data analysis solutions.",
    },
    {
      key: "projects",
      label: "Project Description",
      original: "Developed a machine learning project to predict crop yield.",
      aiVersion: "Developed AgriYield, a crop-yield prediction system using Python, Pandas, and Scikit-learn, implementing data preprocessing and ensemble models achieving 88% accuracy.",
    },
    {
      key: "keywords",
      label: "Skills Keywords",
      original: "Python, Java, C++, Machine Learning, SQL, Git, FastAPI",
      aiVersion: "Python, Java, C++, Machine Learning, Pandas, Scikit-learn, FastAPI, Django, SQL, MongoDB, Git, Docker (learning)",
    },
    {
      key: "experience",
      label: "Experience Bullet Points",
      original: "Worked on various software projects.",
      aiVersion: "Developed FastAPI-based REST service handling 500+ daily requests, reducing query latency by 30%.",
    },
  ];

  const decide = (key: string, val: "accepted" | "rejected") => {
    setDecisions(d => ({ ...d, [key]: val }));
    toast(val === "accepted" ? "success" : "info", val === "accepted" ? "Change accepted." : "Change rejected.");
  };

  const acceptAll = () => {
    setDecisions({ summary: "accepted", projects: "accepted", keywords: "accepted", experience: "accepted" });
    toast("success", "All changes accepted!");
  };

  const rejectAll = () => {
    setDecisions({ summary: "rejected", projects: "rejected", keywords: "rejected", experience: "rejected" });
    toast("info", "All changes rejected.");
  };

  const allDecided = Object.values(decisions).every(v => v !== null);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>Review AI Changes</h2>
          <p className="text-sm text-slate-500">Accept or reject each AI suggestion before saving.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={acceptAll} className="px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors">Accept All</button>
          <button onClick={rejectAll} className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Reject All</button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {changes.map(c => {
          const d = decisions[c.key];
          return (
            <div key={c.key} className={`bg-white border rounded-2xl overflow-hidden transition-all ${d === "accepted" ? "border-emerald-200" : d === "rejected" ? "border-red-100 opacity-60" : "border-slate-100"}`}>
              <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-800">{c.label}</span>
                  {d === "accepted" && <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Accepted</span>}
                  {d === "rejected" && <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Rejected</span>}
                </div>
                {!d && (
                  <div className="flex gap-2">
                    <button onClick={() => decide(c.key, "accepted")} className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors">Accept</button>
                    <button onClick={() => decide(c.key, "rejected")} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Reject</button>
                  </div>
                )}
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                <div className="p-4">
                  <div className="text-xs font-bold text-red-500 mb-2">Original</div>
                  <p className="text-sm text-slate-600 leading-relaxed bg-red-50 rounded-lg px-3 py-2">{c.original}</p>
                </div>
                <div className="p-4">
                  <div className="text-xs font-bold text-emerald-600 mb-2">AI Version</div>
                  <p className="text-sm text-slate-700 leading-relaxed bg-emerald-50 rounded-lg px-3 py-2">{c.aiVersion}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {allDecided && (
        <div className="flex gap-3">
          <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Discard All</button>
          <GradBtn onClick={() => toast("success", "Changes saved successfully.")} className="flex-1 py-2.5">Save Changes</GradBtn>
        </div>
      )}
    </div>
  );
}

// ─── Version History ──────────────────────────────────────────────────────────

function VersionHistory() {
  const { toast } = useToast();
  const [comparing, setComparing] = useState<[number, number] | null>(null);

  const versions = [
    { id: 3, label: "Version 3", sub: "Current · 3 AI improvements applied", current: true, date: "Sep 24, 2026", score: 86 },
    { id: 2, label: "Version 2", sub: "After ATS optimization", current: false, date: "Sep 20, 2026", score: 82 },
    { id: 1, label: "Version 1", sub: "Original upload", current: false, date: "Sep 10, 2026", score: 71 },
  ];

  if (comparing) {
    const v1 = versions.find(v => v.id === comparing[0])!;
    const v2 = versions.find(v => v.id === comparing[1])!;
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setComparing(null)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Versions
          </button>
          <span className="text-sm font-bold text-slate-700">Comparing {v1.label} vs {v2.label}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[v1, v2].map(v => (
            <div key={v.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">{v.label}</span>
                <span className="text-xs text-slate-500">{v.date}</span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-extrabold" style={{ color: "#4f6ef7" }}>{v.score}</div>
                  <div className="text-xs text-slate-500">Overall Score</div>
                </div>
                <div className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3 leading-relaxed">
                  {v.id === 3 ? "B.Tech CSE (AI) student specializing in ML and full-stack development…" : v.id === 2 ? "Computer Science student with AI/ML experience and multiple projects…" : "Computer science student with knowledge of programming and machine learning."}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>Resume Versions</h2>
        <p className="text-sm text-slate-500">Track every AI-improved version of your resume.</p>
      </div>

      <div className="flex flex-col gap-3">
        {versions.map(v => (
          <div key={v.id} className={`bg-white border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${v.current ? "border-blue-200" : "border-slate-100"}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm" style={{ background: v.current ? "linear-gradient(135deg,#4f6ef7,#8b5cf6)" : "#f1f5f9", color: v.current ? "white" : "#64748b" }}>
              V{v.id}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{v.label}</span>
                {v.current && <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Current</span>}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{v.sub} · {v.date}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold" style={{ color: v.score >= 85 ? "#4f6ef7" : v.score >= 80 ? "#8b5cf6" : "#f59e0b" }}>{v.score}</span>
              <span className="text-xs text-slate-400">score</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => toast("info", `Viewing ${v.label}…`)} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">View</button>
              {!v.current && <button onClick={() => toast("success", `Restored to ${v.label}.`)} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Restore</button>}
              {!v.current && <button onClick={() => setComparing([3, v.id])} className="px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors">Compare</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function ViewTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${active ? "text-blue-700 bg-blue-50 border border-blue-100" : "text-slate-600 hover:bg-slate-100 border border-transparent"}`}>
      {label}
    </button>
  );
}

// ─── CopilotPage shell ─────────────────────────────────────────────────────────

interface CopilotPageProps {
  onViewReport?: () => void;
}

export default function CopilotPage({ onViewReport }: CopilotPageProps) {
  const [view, setView] = useState<CopilotView>("landing");

  const NAV_TABS: { label: string; view: CopilotView }[] = [
    { label: "Workspace", view: "workspace" },
    { label: "Bullet Generator", view: "bullets" },
    { label: "ATS Keywords", view: "keywords" },
    { label: "Job Optimizer", view: "optimize" },
    { label: "AI Chat", view: "chat" },
    { label: "Review Changes", view: "review" },
    { label: "Versions", view: "versions" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4f6ef7,#8b5cf6)" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">AI Resume Copilot</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
          {view === "landing" ? "AI Resume Copilot" : view === "workspace" ? "Improve My Resume" : view === "bullets" ? "Bullet Point Generator" : view === "keywords" ? "ATS Keyword Optimizer" : view === "optimize" ? "Job-Specific Optimization" : view === "chat" ? "AI Chat Assistant" : view === "review" ? "Review AI Changes" : "Resume Versions"}
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">Improve every section of your resume with personalized AI suggestions.</p>
      </div>

      {/* Nav tabs (when not on landing) */}
      {view !== "landing" && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button onClick={() => setView("landing")} className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 border border-transparent transition-all whitespace-nowrap">
            ← Overview
          </button>
          <div className="w-px h-4 bg-slate-200 shrink-0" />
          {NAV_TABS.map(t => (
            <ViewTab key={t.view} label={t.label} active={view === t.view} onClick={() => setView(t.view)} />
          ))}
        </div>
      )}

      {/* Content */}
      {view === "landing" && <CopilotLanding onStart={() => setView("workspace")} onAnalysis={() => onViewReport?.()} />}
      {view === "workspace" && <Workspace onNav={setView} />}
      {view === "bullets" && <BulletGenerator />}
      {view === "keywords" && <KeywordOptimizer />}
      {view === "optimize" && <JobOptimize />}
      {view === "chat" && <ChatAssistant />}
      {view === "review" && <ChangesReview />}
      {view === "versions" && <VersionHistory />}
    </div>
  );
}
