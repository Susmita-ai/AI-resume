import React from "react";

// ─── Icons ───────────────────────────────────────────────────────────────────

export function IconBrain() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
      <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
      <path d="M6 18a4 4 0 0 1-1.967-.516"/>
      <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  );
}

export function IconTarget() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

export function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

export function IconZap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

export function IconSparkles({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}

export function IconBarChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/>
      <line x1="6" x2="6" y1="20" y2="14"/><line x1="2" x2="22" y1="20" y2="20"/>
    </svg>
  );
}

export function IconUpload({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" x2="12" y1="3" y2="15"/>
    </svg>
  );
}

export function IconFileText({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
    </svg>
  );
}

export function IconCheck({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export function IconX({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/>
    </svg>
  );
}

export function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

export function IconArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

export function IconArrowLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  );
}

export function IconAlertCircle({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" x2="12" y1="8" y2="12"/>
      <line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
  );
}

export function IconTrash({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  );
}

export function IconRefresh({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M8 16H3v5"/>
    </svg>
  );
}

export function IconLock({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

export function IconCheckCircle({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

export function IconFilePdf({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <path d="M9 13v-1h6v1"/>
      <path d="M11 12v3"/>
      <path d="M9 16h6"/>
    </svg>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

let _logoId = 0;
export function IconLogo() {
  const id = React.useRef(`lg-${++_logoId}`).current;
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill={`url(#${id})`}/>
      <path d="M8 20L12 8L16 16L18 12L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="9" r="2.5" fill="white" fillOpacity="0.9"/>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f6ef7"/>
          <stop offset="1" stopColor="#8b5cf6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Buttons ─────────────────────────────────────────────────────────────────

export function PrimaryButton({
  children, className = "", onClick, disabled = false, type = "button"
}: {
  children: React.ReactNode; className?: string; onClick?: () => void; disabled?: boolean; type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
      style={!disabled ? { background: "linear-gradient(135deg, #4f6ef7 0%, #7c3aed 100%)", boxShadow: "0 4px 16px -4px rgba(79,110,247,0.5)" } : { background: "#9ca3af" }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children, className = "", onClick, disabled = false
}: {
  children: React.ReactNode; className?: string; onClick?: () => void; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

export function Tag({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "purple" | "green" | "red" | "orange" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border border-blue-100",
    purple: "bg-purple-50 text-purple-700 border border-purple-100",
    green: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    red: "bg-red-50 text-red-600 border border-red-100",
    orange: "bg-orange-50 text-orange-700 border border-orange-100",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      {eyebrow && (
        <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-600 border border-blue-100">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      {subtitle && <p className="text-slate-500 text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
}

// ─── Score Ring ───────────────────────────────────────────────────────────────

export function ScoreRing({ score, label, max = 100, color = "#4f6ef7", size = 80 }: {
  score: number; label: string; max?: number; color?: string; size?: number;
}) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / max);
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size} viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#f1f5f9" strokeWidth="6"/>
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 36 36)"
          style={{ transition: "stroke-dashoffset 1s ease" }}/>
        <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a" fontFamily="var(--font-display)">{score}</text>
      </svg>
      <span className="text-xs text-slate-500 font-medium text-center leading-tight">{label}</span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar({ onAnalyze, onRecruiter }: { onAnalyze: () => void; onRecruiter?: () => void }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <IconLogo />
          <span className="font-extrabold text-slate-900 text-base tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            AI Resume Analyzer
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Features", "How It Works", "About"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">{item}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {onRecruiter && (
            <button onClick={onRecruiter} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-3 py-1.5">
              Recruiter Sign In
            </button>
          )}
          <PrimaryButton onClick={onAnalyze}>Analyze Resume</PrimaryButton>
        </div>
        <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
          <IconMenu />
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-4">
          {["Home", "Features", "How It Works", "About"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>{item}</a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            {onRecruiter && (
              <button onClick={() => { onRecruiter(); setMobileOpen(false); }} className="text-sm font-semibold text-slate-600 text-left">Recruiter Sign In</button>
            )}
            <PrimaryButton className="justify-center" onClick={onAnalyze}>Analyze Resume</PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}
