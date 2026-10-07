import React from "react";
import {
  IconBrain, IconTarget, IconShield, IconZap, IconSparkles, IconBarChart,
  IconUpload, IconFileText, IconCheck, IconX, IconArrowRight, IconLogo,
  PrimaryButton, SecondaryButton, Tag, SectionHeading, ScoreRing,
} from "./ui";

// ─── Hero Visual ──────────────────────────────────────────────────────────────

function HeroResumeVisual() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20"
        style={{ background: "radial-gradient(ellipse at 60% 40%, #4f6ef7 0%, #8b5cf6 60%, transparent 100%)" }} />
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 max-w-sm mx-auto"
        style={{ boxShadow: "0 24px 80px -12px rgba(79,110,247,0.2)" }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-3 text-blue-600">
              <IconFileText />
            </div>
            <div className="font-bold text-slate-900 text-sm" style={{ fontFamily: "var(--font-display)" }}>Sarah Johnson</div>
            <div className="text-xs text-slate-500">Software Engineer · 3 YOE</div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Tag color="green">ATS Ready</Tag>
            <Tag color="blue">PDF</Tag>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 py-4 border-y border-slate-100 mb-4">
          <ScoreRing score={82} label="AI Score" color="#4f6ef7" size={68} />
          <ScoreRing score={88} label="ATS Score" color="#8b5cf6" size={68} />
          <ScoreRing score={79} label="Job Match" color="#06b6d4" size={68} />
        </div>
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Matched Skills</div>
          <div className="flex flex-wrap gap-1.5">
            {["React", "TypeScript", "Node.js", "Python", "AWS"].map(s => <Tag key={s} color="blue">{s}</Tag>)}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Missing Skills</div>
          <div className="flex flex-wrap gap-1.5">
            {["Docker", "Kubernetes", "GraphQL"].map(s => <Tag key={s} color="red">{s}</Tag>)}
          </div>
        </div>
        <div className="flex gap-2.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-100">
          <div className="text-blue-500 mt-0.5 shrink-0"><IconSparkles /></div>
          <div>
            <div className="text-xs font-semibold text-blue-800 mb-0.5">AI Recommendation</div>
            <div className="text-xs text-slate-600 leading-relaxed">Add quantified achievements to increase impact score by ~12 points.</div>
          </div>
        </div>
      </div>
      <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg border border-slate-100 px-3 py-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><IconCheck /></div>
        <div>
          <div className="text-xs font-bold text-slate-800">85% Skills</div>
          <div className="text-[10px] text-slate-400">matched</div>
        </div>
      </div>
      <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg border border-slate-100 px-3 py-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><IconZap /></div>
        <div>
          <div className="text-xs font-bold text-slate-800">Analysis done</div>
          <div className="text-[10px] text-slate-400">in 3 seconds</div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-full"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(79,110,247,0.06) 0%, transparent 70%)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-semibold text-blue-700">AI-Powered Resume Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}>
              Build a Resume<br />That Gets{" "}
              <span className="gradient-text">Noticed.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Analyze your resume with AI, improve your ATS score, match your resume with job descriptions, and discover the skills you need to stand out.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <PrimaryButton className="px-6 py-3 text-base" onClick={onAnalyze}>
                Analyze My Resume <IconArrowRight />
              </PrimaryButton>
              <SecondaryButton className="px-6 py-3 text-base">How It Works</SecondaryButton>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroResumeVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "95%+", label: "Resume Analysis Accuracy" },
  { value: "100+", label: "Skills Detected" },
  { value: "50+", label: "Resume Parameters" },
  { value: "24/7", label: "AI-Powered Analysis" },
];

function StatsSection() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-2xl border border-slate-100 overflow-hidden"
          style={{ boxShadow: "0 4px 32px -8px rgba(15,23,42,0.08)" }}>
          {stats.map((s, i) => (
            <div key={i} className={`flex flex-col items-center justify-center py-8 px-6 ${i < 3 ? "border-r border-slate-100" : ""} ${i >= 2 ? "border-t lg:border-t-0 border-slate-100" : ""}`}>
              <div className="text-3xl font-extrabold mb-1 gradient-text" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
              <div className="text-sm text-slate-500 text-center font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────────

const features = [
  { icon: <IconBrain />, title: "AI Resume Analysis", desc: "Analyze resume content, structure, and impact using advanced AI to surface actionable insights." },
  { icon: <IconShield />, title: "ATS Score", desc: "Check how compatible your resume is with Applicant Tracking Systems used by top employers." },
  { icon: <IconTarget />, title: "Job Match", desc: "Compare your resume with a specific job description to measure alignment and fit score." },
  { icon: <IconZap />, title: "Skill Gap Detection", desc: "Instantly identify important missing skills that matter for your target role." },
  { icon: <IconSparkles />, title: "AI Recommendations", desc: "Get personalized, prioritized suggestions to improve your resume's effectiveness." },
  { icon: <IconBarChart />, title: "Resume Insights", desc: "Understand your resume's strengths, keywords, experience depth, and project relevance." },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Features" title="Everything You Need to Improve Your Resume"
          subtitle="A complete AI analysis suite — from ATS compatibility to skill gap detection and personalized recommendations." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="card-hover bg-white rounded-2xl p-6 border border-slate-100 flex flex-col gap-4"
              style={{ boxShadow: "0 2px 16px -4px rgba(15,23,42,0.06)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-600"
                style={{ background: "linear-gradient(135deg, #eff3ff, #f0e8ff)" }}>{f.icon}</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1.5 text-base" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const steps = [
  { num: "01", icon: <IconUpload />, title: "Upload Resume", desc: "Upload your PDF resume securely. Your data is processed privately." },
  { num: "02", icon: <IconFileText />, title: "Add Job Description", desc: "Paste the job description you want to target for a tailored analysis." },
  { num: "03", icon: <IconBrain />, title: "AI Analysis", desc: "AI analyzes skills, experience, keywords, ATS compatibility, and job relevance in seconds." },
  { num: "04", icon: <IconSparkles />, title: "Get Insights", desc: "Receive your scores, missing skills list, and prioritized improvement recommendations." },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Process" title="Analyze Your Resume in 4 Simple Steps"
          subtitle="From upload to actionable insights in under 30 seconds." />
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent z-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                    style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)", boxShadow: "0 8px 24px -6px rgba(79,110,247,0.4)" }}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-600">
                    {i + 1}
                  </div>
                </div>
                <div className="text-xs font-bold text-blue-500 tracking-widest mb-1.5 uppercase">{step.num}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-base" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Analysis Preview ─────────────────────────────────────────────────────────

function AnalysisPreview() {
  const matchingSkills = ["React", "TypeScript", "Node.js", "Python", "REST APIs", "Git", "AWS"];
  const missingSkills = ["Docker", "Kubernetes", "GraphQL", "Redis"];
  const recommendations = [
    "Add quantified achievements — e.g. 'Reduced load time by 40%'",
    "Include Docker and Kubernetes in your skills section",
    "Use more action verbs in your experience bullets",
    "Add a professional summary tailored to the job role",
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Live Preview"
          title={<>What Your <span className="gradient-text">Analysis</span> Looks Like</>}
          subtitle="Here's a sample of the detailed insights you receive after analyzing your resume." />
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
          style={{ boxShadow: "0 8px 48px -12px rgba(79,110,247,0.12)" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-300"/><div className="w-3 h-3 rounded-full bg-amber-300"/>
                <div className="w-3 h-3 rounded-full bg-emerald-300"/>
              </div>
              <span className="text-xs text-slate-400 font-medium">AI Resume Analysis · Sarah_Johnson_Resume.pdf</span>
            </div>
            <Tag color="green">Analysis Complete</Tag>
          </div>
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "AI Resume Score", value: 82, unit: "/100", color: "#4f6ef7", bg: "from-blue-50 to-blue-100/50" },
                { label: "ATS Score", value: 88, unit: "/100", color: "#8b5cf6", bg: "from-purple-50 to-purple-100/50" },
                { label: "Job Match", value: 79, unit: "%", color: "#0ea5e9", bg: "from-sky-50 to-sky-100/50" },
                { label: "Skills Match", value: 85, unit: "%", color: "#10b981", bg: "from-emerald-50 to-emerald-100/50" },
              ].map((s, i) => (
                <div key={i} className={`rounded-xl p-5 bg-gradient-to-br ${s.bg} border border-white`}>
                  <div className="text-xs font-semibold text-slate-500 mb-3">{s.label}</div>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-extrabold" style={{ color: s.color, fontFamily: "var(--font-display)" }}>{s.value}</span>
                    <span className="text-sm font-medium text-slate-400 mb-1">{s.unit}</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/70">
                    <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><IconCheck /></div>
                  <span className="text-sm font-bold text-slate-800" style={{ fontFamily: "var(--font-display)" }}>Matching Skills</span>
                  <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{matchingSkills.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">{matchingSkills.map(s => <Tag key={s} color="green">{s}</Tag>)}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500"><IconX /></div>
                  <span className="text-sm font-bold text-slate-800" style={{ fontFamily: "var(--font-display)" }}>Missing Skills</span>
                  <span className="ml-auto text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">{missingSkills.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">{missingSkills.map(s => <Tag key={s} color="red">{s}</Tag>)}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-blue-500"><IconSparkles /></div>
                  <span className="text-sm font-bold text-slate-800" style={{ fontFamily: "var(--font-display)" }}>AI Recommendations</span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                      <span className="text-blue-400 font-bold shrink-0 mt-0.5">→</span>{rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────

function CTASection({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden px-8 py-16 text-center"
          style={{ background: "linear-gradient(135deg, #3b52f5 0%, #6d28d9 100%)" }}>
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%"><defs><pattern id="cta-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#cta-dots)"/>
            </svg>
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <IconSparkles /><span className="text-xs font-semibold text-white/90">Powered by AI</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Ready to Improve Your Resume?
            </h2>
            <p className="text-blue-100 text-base mb-8 max-w-md mx-auto leading-relaxed">
              Get AI-powered insights and make your resume more job-ready. Free to start, no credit card required.
            </p>
            <button onClick={onAnalyze}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors"
              style={{ boxShadow: "0 8px 24px -4px rgba(0,0,0,0.2)" }}>
              Analyze My Resume <IconArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <IconLogo />
              <span className="font-extrabold text-slate-900 text-base tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                AI Resume Analyzer
              </span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              AI-powered resume analysis for students, freshers, and job seekers. Stand out from the crowd.
            </p>
            <div className="flex gap-2 mt-5"><Tag color="blue">ATS Optimized</Tag><Tag color="purple">AI Powered</Tag></div>
          </div>
          {[["Product", ["Features", "How It Works", "About"]], ["Legal", ["Privacy", "Contact"]]].map(([section, items]) => (
            <div key={section as string}>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{section as string}</div>
              <ul className="flex flex-col gap-2.5">
                {(items as string[]).map(item => (
                  <li key={item}><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© 2024 AI Resume Analyzer. All rights reserved.</p>
          <p className="text-xs text-slate-400">Built with AI · Trusted by job seekers</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function LandingPage({ onAnalyze, onRecruiter: _onRecruiter }: { onAnalyze: () => void; onRecruiter?: () => void }) {
  return (
    <>
      <HeroSection onAnalyze={onAnalyze} />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AnalysisPreview />
      <CTASection onAnalyze={onAnalyze} />
      <Footer />
    </>
  );
}
