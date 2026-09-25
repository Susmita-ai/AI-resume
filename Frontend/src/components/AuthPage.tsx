import React, { useState, useEffect } from "react";
import { IconLogo, PrimaryButton } from "./ui";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuthView =
  | "login"
  | "signup"
  | "forgot"
  | "forgot-sent"
  | "reset"
  | "reset-done"
  | "verify";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getPasswordStrength(pw: string): { label: string; color: string; pct: number } {
  if (pw.length === 0) return { label: "", color: "bg-slate-200", pct: 0 };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: "Weak", color: "bg-red-400", pct: 25 };
  if (score === 2) return { label: "Fair", color: "bg-amber-400", pct: 50 };
  if (score === 3) return { label: "Good", color: "bg-blue-400", pct: 75 };
  return { label: "Strong", color: "bg-emerald-400", pct: 100 };
}

function checkPwReqs(pw: string) {
  return {
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    number: /[0-9]/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
  };
}

// ─── Shared input ─────────────────────────────────────────────────────────────

function Field({
  label, type = "text", value, onChange, placeholder, error, suffix,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; suffix?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-all
            ${error ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}
            ${suffix ? "pr-12" : ""}
          `}
        />
        {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>}
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ─── Password requirements list ───────────────────────────────────────────────

function PwReqs({ password }: { password: string }) {
  const reqs = checkPwReqs(password);
  const strength = getPasswordStrength(password);
  return (
    <div className="flex flex-col gap-2 mt-1">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.pct}%` }} />
        </div>
        <span className={`text-xs font-semibold min-w-[40px] ${strength.pct <= 25 ? "text-red-500" : strength.pct <= 50 ? "text-amber-500" : strength.pct <= 75 ? "text-blue-500" : "text-emerald-600"}`}>{strength.label}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {[
          { check: reqs.length, label: "At least 8 characters" },
          { check: reqs.upper, label: "One uppercase letter" },
          { check: reqs.number, label: "One number" },
          { check: reqs.special, label: "One special character" },
        ].map(r => (
          <div key={r.label} className="flex items-center gap-1.5">
            <span className={r.check ? "text-emerald-500" : "text-slate-300"}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span className={`text-xs ${r.check ? "text-emerald-700" : "text-slate-400"}`}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Brand panel (left side) ──────────────────────────────────────────────────

function BrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden h-full"
      style={{ background: "linear-gradient(135deg, #4f6ef7 0%, #7c3aed 100%)" }}>
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="flex items-center gap-2.5 relative z-10">
        <IconLogo />
        <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>ResumeAI</span>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex flex-col gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">AJ</div>
            <div>
              <div className="text-white text-sm font-semibold">Alex Johnson</div>
              <div className="text-white/60 text-xs">Software Engineer · Fresher</div>
            </div>
            <div className="ml-auto bg-emerald-400/20 border border-emerald-400/30 rounded-lg px-2.5 py-1">
              <span className="text-emerald-200 text-xs font-bold">87 / 100</span>
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {["Python", "React", "SQL", "ML", "AWS"].map(s => (
              <span key={s} className="text-xs bg-white/15 text-white/90 px-2.5 py-1 rounded-full font-medium">{s}</span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "ATS Score", val: 92, color: "bg-blue-300" },
              { label: "Skills Match", val: 85, color: "bg-purple-300" },
              { label: "Readability", val: 90, color: "bg-emerald-300" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="text-white/70 text-xs w-20 shrink-0">{item.label}</div>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                </div>
                <div className="text-white/80 text-xs font-semibold w-8 text-right">{item.val}%</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-white font-extrabold text-3xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Your Resume.<br />Smarter with AI.
          </h1>
          <p className="text-white/70 text-sm leading-relaxed mt-3 max-w-xs">
            Analyze your resume, discover skill gaps, improve ATS compatibility, and prepare for your next opportunity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["#60a5fa", "#a78bfa", "#34d399", "#f472b6", "#fb923c"].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white/30 flex items-center justify-center text-xs text-white font-bold" style={{ background: c }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-white/70 text-xs">
            <span className="text-white font-semibold">12,400+</span> resumes improved
          </p>
        </div>
      </div>

      <p className="relative z-10 text-white/40 text-xs">© 2025 ResumeAI. All rights reserved.</p>
    </div>
  );
}

// ─── Login Form ───────────────────────────────────────────────────────────────

function LoginForm({ onSuccess, onView }: { onSuccess: () => void; onView: (v: AuthView) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [pwErr, setPwErr] = useState("");

  const submit = () => {
    let valid = true;
    if (!email) { setEmailErr("Email is required."); valid = false; }
    else if (!/\S+@\S+\.\S+/.test(email)) { setEmailErr("Please enter a valid email address."); valid = false; }
    else setEmailErr("");
    if (!password) { setPwErr("Password is required."); valid = false; }
    else setPwErr("");
    if (!valid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1300);
  };

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Welcome Back</h2>
        <p className="text-sm text-slate-500 mt-1">Sign in to continue to your AI Resume Analyzer.</p>
      </div>

      <div className="flex flex-col gap-4">
        <Field label="Email Address" type="email" value={email} onChange={v => { setEmail(v); setEmailErr(""); }} placeholder="you@example.com" error={emailErr} />
        <Field
          label="Password"
          type={showPw ? "text" : "password"}
          value={password}
          onChange={v => { setPassword(v); setPwErr(""); }}
          placeholder="Enter your password"
          error={pwErr}
          suffix={
            <button onClick={() => setShowPw(!showPw)} className="text-slate-400 hover:text-slate-600 transition-colors" type="button">
              <EyeIcon open={showPw} />
            </button>
          }
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <button onClick={() => onView("forgot")} className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">Forgot Password?</button>
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

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <button className="w-full flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          <GoogleIcon /> Continue with Google
        </button>
      </div>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <button onClick={() => onView("signup")} className="font-bold text-blue-600 hover:text-blue-700">Sign Up</button>
      </p>
    </div>
  );
}

// ─── Sign Up Form ─────────────────────────────────────────────────────────────

function SignupForm({ onSuccess, onView }: { onSuccess: () => void; onView: (v: AuthView) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required.";
    if (!email) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Please enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 8) errs.password = "Your password doesn't meet the requirements.";
    if (!confirm) errs.confirm = "Please confirm your password.";
    else if (confirm !== password) errs.confirm = "Passwords do not match.";
    if (!agreed) errs.agreed = "You must agree to the Terms of Service.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1400);
  };

  const clr = (k: string) => setErrors(p => ({ ...p, [k]: "" }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Create Your Account</h2>
        <p className="text-sm text-slate-500 mt-1">Start improving your resume with AI.</p>
      </div>

      <div className="flex flex-col gap-3.5">
        <Field label="Full Name" value={name} onChange={v => { setName(v); clr("name"); }} placeholder="Alex Johnson" error={errors.name} />
        <Field label="Email Address" type="email" value={email} onChange={v => { setEmail(v); clr("email"); }} placeholder="you@example.com" error={errors.email} />
        <div className="flex flex-col gap-1.5">
          <Field
            label="Password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={v => { setPassword(v); clr("password"); }}
            placeholder="Create a strong password"
            error={errors.password}
            suffix={
              <button onClick={() => setShowPw(!showPw)} className="text-slate-400 hover:text-slate-600" type="button">
                <EyeIcon open={showPw} />
              </button>
            }
          />
          {password && <PwReqs password={password} />}
        </div>
        <Field
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={confirm}
          onChange={v => { setConfirm(v); clr("confirm"); }}
          placeholder="Re-enter your password"
          error={errors.confirm}
          suffix={
            <button onClick={() => setShowConfirm(!showConfirm)} className="text-slate-400 hover:text-slate-600" type="button">
              <EyeIcon open={showConfirm} />
            </button>
          }
        />
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => { setAgreed(e.target.checked); clr("agreed"); }}
            className="w-4 h-4 mt-0.5 rounded accent-blue-600 shrink-0" />
          <span className="text-sm text-slate-600">
            I agree to the{" "}
            <span className="text-blue-600 font-semibold">Terms of Service</span>
            {" "}and{" "}
            <span className="text-blue-600 font-semibold">Privacy Policy</span>
          </span>
        </label>
        {errors.agreed && <p className="text-xs text-red-500 -mt-1">{errors.agreed}</p>}
      </div>

      <div className="flex flex-col gap-3">
        <PrimaryButton onClick={submit} className="w-full py-3.5 rounded-xl text-sm font-bold">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Creating Account…
            </span>
          ) : "Create Account"}
        </PrimaryButton>
        <button className="w-full flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          <GoogleIcon /> Continue with Google
        </button>
      </div>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button onClick={() => onView("login")} className="font-bold text-blue-600 hover:text-blue-700">Sign In</button>
      </p>
    </div>
  );
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

function ForgotForm({ onView }: { onView: (v: AuthView) => void }) {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!email) { setEmailErr("Email is required."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setEmailErr("Please enter a valid email address."); return; }
    setEmailErr("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onView("forgot-sent"); }, 1200);
  };

  return (
    <div className="flex flex-col gap-7">
      <div>
        <button onClick={() => onView("login")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-5 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Sign In
        </button>
        <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Forgot Your Password?</h2>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">Enter your email address and we'll send you a link to reset your password.</p>
      </div>

      <Field label="Email Address" type="email" value={email} onChange={v => { setEmail(v); setEmailErr(""); }} placeholder="you@example.com" error={emailErr} />

      <PrimaryButton onClick={submit} className="w-full py-3.5 rounded-xl text-sm font-bold">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Sending…
          </span>
        ) : "Send Reset Link"}
      </PrimaryButton>
    </div>
  );
}

function ForgotSent({ onView }: { onView: (v: AuthView) => void }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center py-4">
      <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Reset link sent!</h2>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">Check your email for instructions to create a new password.</p>
      </div>
      <div className="flex flex-col gap-2.5 w-full">
        <button onClick={() => onView("reset")} className="w-full border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Reset Password
        </button>
        <button onClick={() => onView("login")} className="text-sm text-slate-500 hover:text-slate-700">Back to Sign In</button>
      </div>
    </div>
  );
}

// ─── Reset Password ───────────────────────────────────────────────────────────

function ResetForm({ onView }: { onView: (v: AuthView) => void }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reqs = checkPwReqs(password);

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!reqs.length || !reqs.upper || !reqs.number || !reqs.special) errs.password = "Your password doesn't meet the requirements.";
    if (confirm !== password) errs.confirm = "Passwords do not match.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onView("reset-done"); }, 1200);
  };

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Create New Password</h2>
        <p className="text-sm text-slate-500 mt-1">Choose a strong password for your account.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Field
            label="New Password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={v => { setPassword(v); setErrors(p => ({ ...p, password: "" })); }}
            placeholder="Create a strong password"
            error={errors.password}
            suffix={
              <button onClick={() => setShowPw(!showPw)} className="text-slate-400 hover:text-slate-600" type="button">
                <EyeIcon open={showPw} />
              </button>
            }
          />
          {password && <PwReqs password={password} />}
        </div>
        <Field
          label="Confirm New Password"
          type={showPw ? "text" : "password"}
          value={confirm}
          onChange={v => { setConfirm(v); setErrors(p => ({ ...p, confirm: "" })); }}
          placeholder="Re-enter your password"
          error={errors.confirm}
        />
      </div>

      <PrimaryButton onClick={submit} className="w-full py-3.5 rounded-xl text-sm font-bold">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Resetting…
          </span>
        ) : "Reset Password"}
      </PrimaryButton>
    </div>
  );
}

function ResetDone({ onView }: { onView: (v: AuthView) => void }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center py-4">
      <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Password updated successfully.</h2>
        <p className="text-sm text-slate-500 mt-2">You can now sign in with your new password.</p>
      </div>
      <PrimaryButton onClick={() => onView("login")} className="w-full py-3.5 rounded-xl text-sm font-bold">
        Continue to Login
      </PrimaryButton>
    </div>
  );
}

// ─── Email Verification ───────────────────────────────────────────────────────

function VerifyEmail({ email = "alex@example.com", onVerified }: { email?: string; onVerified: () => void }) {
  const [countdown, setCountdown] = useState(30);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const resend = () => {
    setCountdown(30);
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center py-4">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Verify Your Email</h2>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">We've sent a verification link to your email address.</p>
        <p className="text-sm font-semibold text-slate-800 mt-1 bg-slate-100 rounded-lg px-3 py-1.5 inline-block">{email}</p>
      </div>

      {resent && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-emerald-700 w-full">
          Verification email resent successfully!
        </div>
      )}

      <div className="flex flex-col gap-2.5 w-full">
        <PrimaryButton onClick={onVerified} className="w-full py-3.5 rounded-xl text-sm font-bold">
          Open Email
        </PrimaryButton>
        <button
          onClick={countdown === 0 ? resend : undefined}
          disabled={countdown > 0}
          className={`w-full border rounded-xl py-3 text-sm font-semibold transition-colors
            ${countdown > 0 ? "border-slate-100 text-slate-400 cursor-not-allowed bg-slate-50" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
        >
          {countdown > 0 ? `Resend available in ${countdown}s` : "Resend Email"}
        </button>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors">
          Change Email
        </button>
      </div>
    </div>
  );
}

// ─── AuthPage shell ───────────────────────────────────────────────────────────

interface AuthPageProps {
  mode?: "login" | "signup";
  onSuccess: () => void;
  onSignupSuccess?: () => void;
  onBack: () => void;
}

export default function AuthPage({ mode = "login", onSuccess, onSignupSuccess, onBack }: AuthPageProps) {
  const [view, setView] = useState<AuthView>(mode);

  const handleSignupSuccess = () => setView("verify");
  const handleVerified = () => {
    if (onSignupSuccess) onSignupSuccess();
    else onSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <div className="lg:w-[480px] lg:flex-none lg:sticky lg:top-0 lg:h-screen">
        <BrandPanel />
      </div>

      <div className="flex-1 flex flex-col min-h-screen bg-white">
        <div className="flex items-center justify-between px-6 py-4 lg:px-10 border-b border-slate-100">
          <div className="flex items-center gap-2 lg:hidden">
            <IconLogo />
            <span className="font-bold text-slate-900 text-base" style={{ fontFamily: "var(--font-display)" }}>ResumeAI</span>
          </div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 ml-auto transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Home
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-md">
            {view === "login" && <LoginForm onSuccess={onSuccess} onView={setView} />}
            {view === "signup" && <SignupForm onSuccess={handleSignupSuccess} onView={setView} />}
            {view === "forgot" && <ForgotForm onView={setView} />}
            {view === "forgot-sent" && <ForgotSent onView={setView} />}
            {view === "reset" && <ResetForm onView={setView} />}
            {view === "reset-done" && <ResetDone onView={setView} />}
            {view === "verify" && <VerifyEmail onVerified={handleVerified} />}
          </div>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 lg:px-16">
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
            {[
              { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "256-bit SSL" },
              { d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "SOC2 Compliant" },
              { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z", label: "Data Encrypted" },
            ].map(({ d, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
