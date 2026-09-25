import React, { useState } from "react";
import { IconLogo, PrimaryButton, SecondaryButton } from "./ui";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OnboardingData {
  roles: string[];
  experience: string;
  skills: string[];
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${i < step ? "flex-1" : "flex-1"}`}
          style={{
            background: i < step
              ? "linear-gradient(90deg, #4f6ef7, #8b5cf6)"
              : "#e2e8f0",
          }}
        />
      ))}
    </div>
  );
}

// ─── Step 1: Target Role ──────────────────────────────────────────────────────

const ROLES = [
  "Software Engineer",
  "Data Scientist",
  "Data Analyst",
  "ML Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Other",
];

function Step1({ data, onChange, onNext }: {
  data: string[]; onChange: (v: string[]) => void; onNext: () => void;
}) {
  const toggle = (r: string) => {
    onChange(data.includes(r) ? data.filter(x => x !== r) : [...data, r]);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold text-blue-600 mb-2">Step 1 of 4</p>
        <h2 className="text-2xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          Let's personalize<br />your experience.
        </h2>
        <p className="text-slate-500 text-sm mt-2">What type of opportunity are you targeting?</p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {ROLES.map(role => {
          const selected = data.includes(role);
          return (
            <button
              key={role}
              onClick={() => toggle(role)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                selected
                  ? "border-transparent text-white shadow-sm"
                  : "border-slate-200 text-slate-700 bg-white hover:border-blue-300 hover:bg-blue-50"
              }`}
              style={selected ? { background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" } : {}}
            >
              {selected && <span className="mr-1.5">✓</span>}
              {role}
            </button>
          );
        })}
      </div>

      <PrimaryButton onClick={onNext} disabled={data.length === 0} className="w-full py-3.5 rounded-xl text-sm font-bold">
        Continue
      </PrimaryButton>
    </div>
  );
}

// ─── Step 2: Experience Level ─────────────────────────────────────────────────

const LEVELS = [
  { label: "Student", desc: "Currently in school or college", icon: "🎓" },
  { label: "Fresher", desc: "Just graduated, no work experience", icon: "🌱" },
  { label: "0–1 Years", desc: "Less than 1 year of experience", icon: "💼" },
  { label: "1–3 Years", desc: "Early career professional", icon: "📈" },
  { label: "3+ Years", desc: "Experienced professional", icon: "⭐" },
];

function Step2({ data, onChange, onNext, onBack }: {
  data: string; onChange: (v: string) => void; onNext: () => void; onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold text-blue-600 mb-2">Step 2 of 4</p>
        <h2 className="text-2xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          Tell us about<br />your experience.
        </h2>
        <p className="text-slate-500 text-sm mt-2">Select the option that best describes you.</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {LEVELS.map(lvl => {
          const selected = data === lvl.label;
          return (
            <button
              key={lvl.label}
              onClick={() => onChange(lvl.label)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all ${
                selected
                  ? "border-blue-400 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-2xl">{lvl.icon}</span>
              <div className="flex-1">
                <div className={`text-sm font-bold ${selected ? "text-blue-700" : "text-slate-800"}`}>{lvl.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{lvl.desc}</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                selected ? "border-blue-500 bg-blue-500" : "border-slate-300"
              }`}>
                {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} className="px-5 py-3.5 rounded-xl text-sm font-semibold">Back</SecondaryButton>
        <PrimaryButton onClick={onNext} disabled={!data} className="flex-1 py-3.5 rounded-xl text-sm font-bold">Continue</PrimaryButton>
      </div>
    </div>
  );
}

// ─── Step 3: Skills ───────────────────────────────────────────────────────────

const DEFAULT_SKILLS = [
  "Python", "SQL", "Java", "C++", "JavaScript", "TypeScript",
  "React", "Machine Learning", "FastAPI", "Django", "AWS",
  "Git", "Docker", "Node.js", "TensorFlow", "PyTorch",
  "Kubernetes", "PostgreSQL", "MongoDB", "Redis",
];

function Step3({ data, onChange, onNext, onBack }: {
  data: string[]; onChange: (v: string[]) => void; onNext: () => void; onBack: () => void;
}) {
  const [search, setSearch] = useState("");
  const [custom, setCustom] = useState("");

  const toggle = (s: string) => {
    onChange(data.includes(s) ? data.filter(x => x !== s) : [...data, s]);
  };

  const addCustom = () => {
    const trimmed = custom.trim();
    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed]);
      setCustom("");
    }
  };

  const filtered = DEFAULT_SKILLS.filter(s =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold text-blue-600 mb-2">Step 3 of 4</p>
        <h2 className="text-2xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          What are your<br />key skills?
        </h2>
        <p className="text-slate-500 text-sm mt-2">Select all that apply or add your own.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search skills…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
        />
      </div>

      {/* Skill grid */}
      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
        {filtered.map(skill => {
          const selected = data.includes(skill);
          return (
            <button
              key={skill}
              onClick={() => toggle(skill)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${
                selected
                  ? "border-transparent text-white"
                  : "border-slate-200 text-slate-700 bg-white hover:border-blue-300"
              }`}
              style={selected ? { background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" } : {}}
            >
              {selected && "✓ "}{skill}
            </button>
          );
        })}
        {filtered.length === 0 && search && (
          <p className="text-sm text-slate-400 py-2">No matches. Add it as a custom skill below.</p>
        )}
      </div>

      {/* Selected chips */}
      {data.filter(s => !DEFAULT_SKILLS.includes(s)).length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-2">Custom skills</p>
          <div className="flex flex-wrap gap-2">
            {data.filter(s => !DEFAULT_SKILLS.includes(s)).map(s => (
              <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-purple-200 bg-purple-50 text-purple-700">
                {s}
                <button onClick={() => onChange(data.filter(x => x !== s))} className="text-purple-400 hover:text-purple-600">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Add custom */}
      <div className="flex gap-2">
        <input
          type="text"
          value={custom}
          onChange={e => setCustom(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addCustom()}
          placeholder="Add a custom skill…"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
        />
        <button
          onClick={addCustom}
          disabled={!custom.trim()}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-all"
        >
          Add
        </button>
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} className="px-5 py-3.5 rounded-xl text-sm font-semibold">Back</SecondaryButton>
        <PrimaryButton onClick={onNext} disabled={data.length === 0} className="flex-1 py-3.5 rounded-xl text-sm font-bold">Continue</PrimaryButton>
      </div>
    </div>
  );
}

// ─── Step 4: Summary ──────────────────────────────────────────────────────────

function Step4({ data, onAnalyze, onDashboard, onBack }: {
  data: OnboardingData; onAnalyze: () => void; onDashboard: () => void; onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold text-blue-600 mb-2">Step 4 of 4</p>
        <h2 className="text-2xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          You're ready to analyze<br />your resume.
        </h2>
        <p className="text-slate-500 text-sm mt-2">Here's what we've set up for you.</p>
      </div>

      {/* Summary card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">Your Profile</div>
            <div className="text-xs text-slate-500">Personalized just for you</div>
          </div>
          <div className="ml-auto">
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Ready</span>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Target Role{data.roles.length > 1 ? "s" : ""}</div>
            <div className="flex flex-wrap gap-1.5">
              {data.roles.map(r => (
                <span key={r} className="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">{r}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Experience</div>
            <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">{data.experience}</span>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Skills ({data.skills.length})</div>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.slice(0, 8).map(s => (
                <span key={s} className="text-xs font-medium bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full">{s}</span>
              ))}
              {data.skills.length > 8 && (
                <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full">+{data.skills.length - 8} more</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI readiness banner */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl px-4 py-3.5">
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <p className="text-xs text-blue-800 leading-relaxed">
          AI analysis is calibrated to your profile. Your results will be personalized for <strong>{data.roles[0] ?? "your target role"}</strong>.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <PrimaryButton onClick={onAnalyze} className="w-full py-3.5 rounded-xl text-sm font-bold">
          Analyze My Resume
        </PrimaryButton>
        <button onClick={onDashboard} className="w-full border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Go to Dashboard
        </button>
        <button onClick={onBack} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          Go back
        </button>
      </div>
    </div>
  );
}

// ─── OnboardingPage shell ─────────────────────────────────────────────────────

interface OnboardingPageProps {
  onAnalyze: () => void;
  onDashboard: () => void;
}

export default function OnboardingPage({ onAnalyze, onDashboard }: OnboardingPageProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    roles: [],
    experience: "",
    skills: [],
  });

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconLogo />
          <span className="font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>ResumeAI</span>
        </div>
        <button onClick={onDashboard} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          Skip for now
        </button>
      </div>

      {/* Progress */}
      <div className="px-6 pt-6 max-w-lg mx-auto w-full">
        <StepBar step={step} total={4} />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          {step === 1 && (
            <Step1
              data={data.roles}
              onChange={roles => setData(d => ({ ...d, roles }))}
              onNext={next}
            />
          )}
          {step === 2 && (
            <Step2
              data={data.experience}
              onChange={experience => setData(d => ({ ...d, experience }))}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 3 && (
            <Step3
              data={data.skills}
              onChange={skills => setData(d => ({ ...d, skills }))}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 4 && (
            <Step4
              data={data}
              onAnalyze={onAnalyze}
              onDashboard={onDashboard}
              onBack={back}
            />
          )}
        </div>
      </div>
    </div>
  );
}
