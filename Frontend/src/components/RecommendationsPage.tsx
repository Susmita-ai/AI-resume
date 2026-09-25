import React, { useState } from "react";
import { Tag } from "./ui";
import { IconSparkles, IconArrowRight, IconCheck } from "./ui";

const ALL_RECS = [
  {
    id: 1, priority: "High", impact: "+6 pts", category: "Achievements",
    title: "Add measurable achievements",
    desc: "Your project descriptions explain what you built but don't quantify results. Adding metrics like 'improved accuracy by 18%' or 'reduced latency by 40%' signals real impact to recruiters.",
    example: { before: "Built a machine learning model for price prediction.", after: "Developed an XGBoost price prediction model achieving 94% accuracy on a 50K-row dataset, deployed via FastAPI." },
    tags: ["Projects", "Experience"], done: false,
  },
  {
    id: 2, priority: "High", impact: "+5 pts", category: "Keywords",
    title: "Add missing job keywords",
    desc: "Several high-frequency keywords from the Amazon Software Engineer job description are absent from your resume. This reduces both ATS score and recruiter visibility.",
    example: { before: "Worked on backend services.", after: "Designed and deployed scalable RESTful microservices using FastAPI and Docker, integrated with AWS Lambda for serverless execution." },
    tags: ["ATS", "Job Match"], done: false,
  },
  {
    id: 3, priority: "Medium", impact: "+3 pts", category: "Projects",
    title: "Strengthen project descriptions",
    desc: "Use STAR-format (Situation, Task, Action, Result) action verbs and measurable outcomes when describing your projects to signal greater scope and ownership.",
    example: null, tags: ["Projects"], done: false,
  },
  {
    id: 4, priority: "Medium", impact: "+2 pts", category: "Summary",
    title: "Improve professional summary",
    desc: "Your summary is generic. Tailoring it to the specific target role (Software Engineer at Amazon) increases relevance and makes a stronger first impression.",
    example: { before: "I am a passionate developer with experience in Python and ML.", after: "Software Engineer with 3+ years building ML-powered APIs using Python and FastAPI. Seeking to drive impact at Amazon through scalable, data-driven systems." },
    tags: ["Summary", "Job Match"], done: false,
  },
  {
    id: 5, priority: "Low", impact: "+1 pt", category: "Skills",
    title: "List Docker and AWS in Skills section",
    desc: "Even basic familiarity with Docker (containerization) and AWS S3/Lambda should appear in your Skills section to pass ATS keyword filters.",
    example: null, tags: ["ATS", "Skills"], done: true,
  },
  {
    id: 6, priority: "Low", impact: "+1 pt", category: "Format",
    title: "Use consistent date formatting",
    desc: "Some date entries use 'MM/YYYY' while others use 'Month YYYY'. Consistent formatting improves ATS parsing and looks more professional.",
    example: null, tags: ["Format", "ATS"], done: false,
  },
];

type Priority = "All" | "High" | "Medium" | "Low";

const priorityColor: Record<string, string> = {
  High: "#dc2626", Medium: "#d97706", Low: "#0ea5e9",
};
const priorityBg: Record<string, string> = {
  High: "bg-red-50 text-red-600 border-red-200",
  Medium: "bg-orange-50 text-orange-600 border-orange-200",
  Low: "bg-sky-50 text-sky-600 border-sky-200",
};

function RecCard({ rec, onToggle }: { rec: typeof ALL_RECS[0]; onToggle: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-2xl border transition-all ${rec.done ? "border-emerald-200 bg-emerald-50/30" : "border-slate-100 hover:border-blue-100"}`}
      style={{ boxShadow: "0 2px 12px -4px rgba(15,23,42,0.06)" }}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${rec.done ? "bg-emerald-100 text-emerald-600" : "bg-blue-50 text-blue-500"}`}>
            {rec.done ? <IconCheck size={16} /> : <IconSparkles size={16} />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className={`text-sm font-bold leading-snug ${rec.done ? "text-slate-400 line-through" : "text-slate-900"}`}
                style={{ fontFamily: "var(--font-display)" }}>{rec.title}</h3>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">{rec.impact}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityBg[rec.priority]}`}>{rec.priority}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-3">{rec.desc}</p>

            <div className="flex flex-wrap items-center gap-2">
              {rec.tags.map(t => <Tag key={t} color="blue">{t}</Tag>)}
              <div className="ml-auto flex items-center gap-2">
                <button onClick={() => setExpanded(!expanded)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  {expanded ? "Hide" : "View"} Improvement <IconArrowRight size={12} />
                </button>
                <button onClick={() => onToggle(rec.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                    rec.done
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}>
                  {rec.done ? "✓ Applied" : "Mark done"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After */}
        {expanded && rec.example && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border-2 border-slate-200 p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Before</p>
              <p className="text-xs text-slate-500 italic leading-relaxed">"{rec.example.before}"</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-3 relative">
              <div className="flex items-center gap-1.5 mb-2">
                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">AI Improved</p>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-full">AI</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">"{rec.example.after}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  const [recs, setRecs] = useState(ALL_RECS);
  const [filter, setFilter] = useState<Priority>("All");

  const toggle = (id: number) => setRecs(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r));

  const filtered = filter === "All" ? recs : recs.filter(r => r.priority === filter);
  const applied = recs.filter(r => r.done).length;
  const totalImpact = recs.filter(r => !r.done).reduce((a, r) => a + parseInt(r.impact), 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>AI Recommendations</h1>
          <p className="text-sm text-slate-500">Personalized suggestions to improve your resume and score.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-500">{applied}/{recs.length} applied</div>
            <div className="text-xs text-emerald-600 font-semibold">+{totalImpact} pts potential</div>
          </div>
        </div>
      </div>

      {/* Impact banner */}
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-6 border border-blue-100"
        style={{ background: "linear-gradient(135deg, #eff3ff, #f5f0ff)" }}>
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <IconSparkles size={18} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Apply all suggestions to gain up to +{recs.reduce((a, r) => a + parseInt(r.impact), 0)} points on your resume score.
          </p>
          <p className="text-xs text-slate-500">Start with High priority items for the biggest improvement.</p>
        </div>
        <div className="shrink-0">
          <div className="text-2xl font-extrabold text-blue-600" style={{ fontFamily: "var(--font-display)" }}>82→90+</div>
          <div className="text-xs text-slate-400 text-right">potential</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 bg-slate-100 p-1 rounded-xl w-fit">
        {(["All", "High", "Medium", "Low"] as Priority[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === f ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}>
            {f}
            {f !== "All" && (
              <span className={`ml-1.5 text-[10px] font-bold px-1 rounded-full ${
                f === "High" ? "bg-red-100 text-red-600" : f === "Medium" ? "bg-orange-100 text-orange-600" : "bg-sky-100 text-sky-600"
              }`}>
                {recs.filter(r => r.priority === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map(rec => <RecCard key={rec.id} rec={rec} onToggle={toggle} />)}
      </div>
    </div>
  );
}
