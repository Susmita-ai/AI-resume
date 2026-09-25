import React, { useState } from "react";
import { PrimaryButton, SecondaryButton, Tag } from "./ui";

// ─── Shared Field ─────────────────────────────────────────────────────────────

function Field({ label, value, onChange, type = "text", placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white" />
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function Toggle({ enabled, onChange, label, sub }: { enabled: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
      <button onClick={() => onChange(!enabled)}
        className={`relative w-10 h-6 rounded-full transition-all duration-200 ${enabled ? "bg-blue-600" : "bg-slate-200"}`}>
        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? "translate-x-4" : ""}`} />
      </button>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5" style={{ boxShadow: "0 2px 16px -4px rgba(15,23,42,0.06)" }}>
      <h3 className="font-bold text-slate-900 text-base mb-5" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      {children}
    </div>
  );
}

function SaveButton({ label = "Save Changes" }: { label?: string }) {
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="flex items-center gap-3">
      <PrimaryButton onClick={handleSave} className="py-2.5 text-sm">
        {saved ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : null}
        {saved ? "Saved!" : label}
      </PrimaryButton>
      {saved && <span className="text-xs text-emerald-600 font-semibold animate-fade-up">Changes saved successfully.</span>}
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

export function ProfilePage() {
  const [name, setName] = useState("Susmita Yadav");
  const [email, setEmail] = useState("susmita@email.com");
  const [headline, setHeadline] = useState("B.Tech CSE (AI) Student · Aspiring Software Engineer");
  const [location, setLocation] = useState("Lucknow, India");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/susmita-yadav");
  const [github, setGithub] = useState("github.com/susmita-yadav");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>Profile</h1>
        <p className="text-sm text-slate-500">Manage your personal information and account details.</p>
      </div>

      {/* Avatar card */}
      <SectionCard title="Profile Photo">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shrink-0"
            style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)", fontFamily: "var(--font-display)" }}>SY</div>
          <div>
            <p className="text-sm font-semibold text-slate-800 mb-1">Susmita Yadav</p>
            <p className="text-xs text-slate-400 mb-3">JPG, PNG or GIF. Max 2MB.</p>
            <div className="flex gap-2">
              <SecondaryButton className="text-xs py-1.5 px-3">Upload Photo</SecondaryButton>
              <button className="text-xs font-medium text-red-500 hover:text-red-600 px-3 py-1.5">Remove</button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Personal info */}
      <SectionCard title="Personal Information">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Field label="Full Name" value={name} onChange={setName} placeholder="Your name" />
          <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@email.com" hint="Used for login and notifications." />
          <Field label="Location" value={location} onChange={setLocation} placeholder="City, Country" />
          <Field label="Professional Headline" value={headline} onChange={setHeadline} placeholder="e.g. Software Engineer" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <Field label="LinkedIn" value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/..." />
          <Field label="GitHub" value={github} onChange={setGithub} placeholder="github.com/..." />
        </div>
        <SaveButton />
      </SectionCard>

      {/* Target roles */}
      <SectionCard title="Target Roles">
        <p className="text-xs text-slate-500 mb-3">These roles are used to personalize your AI analysis and job match scores.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Software Engineer", "ML Engineer", "Data Scientist", "Backend Developer"].map(role => (
            <div key={role} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-medium text-blue-700">
              {role}
              <button className="text-blue-400 hover:text-blue-600 ml-0.5">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><line x1="9" y1="3" x2="3" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="3" x2="9" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          ))}
          <button className="flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-slate-300 text-xs text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><line x1="6" y1="2" x2="6" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Add role
          </button>
        </div>
        <SaveButton label="Save Roles" />
      </SectionCard>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-200 p-6">
        <h3 className="font-bold text-red-700 text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>Danger Zone</h3>
        <p className="text-xs text-slate-500 mb-4">Deleting your account will permanently remove all your resumes, analysis reports, and settings.</p>
        <button className="text-xs font-semibold text-red-600 border border-red-200 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────

export function SettingsPage({ isDark, onToggleDark }: { isDark?: boolean; onToggleDark?: () => void }) {
  const [emailDigest, setEmailDigest] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [tipsEmail, setTipsEmail] = useState(false);
  const [publicProfile, setPublicProfile] = useState(false);
  const [dataProcessing, setDataProcessing] = useState(true);
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>Settings</h1>
        <p className="text-sm text-slate-500">Control notifications, privacy, and account preferences.</p>
      </div>

      {/* Appearance */}
      {onToggleDark !== undefined && (
        <SectionCard title="Appearance">
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-semibold text-slate-700">Dark Mode</div>
              <div className="text-xs text-slate-500 mt-0.5">Switch between light and dark theme.</div>
            </div>
            <button onClick={onToggleDark}
              className={`relative w-11 rounded-full transition-colors shrink-0 ${isDark ? "bg-blue-600" : "bg-slate-200"}`}
              style={{ height: "24px" }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              role="switch" aria-checked={isDark}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isDark ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </SectionCard>
      )}

      {/* Notifications */}
      <SectionCard title="Notifications">
        <div className="divide-y divide-slate-100">
          <Toggle enabled={emailDigest} onChange={setEmailDigest}
            label="Weekly email digest" sub="Receive a weekly summary of your resume performance and tips." />
          <Toggle enabled={matchAlerts} onChange={setMatchAlerts}
            label="Job match alerts" sub="Get notified when new jobs match your resume above 75%." />
          <Toggle enabled={tipsEmail} onChange={setTipsEmail}
            label="AI improvement tips" sub="Occasional emails with resume tips and skill recommendations." />
        </div>
        <div className="mt-4"><SaveButton label="Save Notifications" /></div>
      </SectionCard>

      {/* Privacy */}
      <SectionCard title="Privacy">
        <div className="divide-y divide-slate-100">
          <Toggle enabled={publicProfile} onChange={setPublicProfile}
            label="Public profile" sub="Allow recruiters to find your profile via your public link." />
          <Toggle enabled={dataProcessing} onChange={setDataProcessing}
            label="Resume data processing" sub="Allow AI to process your resume for analysis and recommendations." />
        </div>
        <div className="mt-4"><SaveButton label="Save Privacy" /></div>
      </SectionCard>

      {/* Preferences */}
      <SectionCard title="Preferences">
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white appearance-none">
              {["English", "Hindi", "Bengali", "Tamil", "Telugu"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Timezone</label>
            <select value={timezone} onChange={e => setTimezone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white appearance-none">
              {["Asia/Kolkata", "UTC", "America/New_York", "Europe/London"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <SaveButton label="Save Preferences" />
      </SectionCard>

      {/* API key / integrations */}
      <SectionCard title="Integrations">
        <p className="text-xs text-slate-500 mb-4">Connect external services to enhance your AI analysis.</p>
        <div className="flex flex-col gap-3">
          {[
            { name: "LinkedIn", desc: "Import profile data automatically", connected: false },
            { name: "GitHub", desc: "Showcase your projects and contributions", connected: true },
            { name: "Google Drive", desc: "Import resumes directly from Drive", connected: false },
          ].map(({ name, desc, connected }) => (
            <div key={name} className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-100 bg-slate-50">
              <div>
                <p className="text-sm font-semibold text-slate-800">{name}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
              {connected
                ? <div className="flex items-center gap-2"><Tag color="green">Connected</Tag><button className="text-xs text-red-500 hover:text-red-600 font-medium">Disconnect</button></div>
                : <button className="text-xs font-semibold text-blue-600 border border-blue-100 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">Connect</button>
              }
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Change password */}
      <SectionCard title="Change Password">
        <div className="flex flex-col gap-4 max-w-sm">
          <Field label="Current Password" type="password" value="" onChange={() => {}} placeholder="••••••••" />
          <Field label="New Password" type="password" value="" onChange={() => {}} placeholder="Min. 8 characters" />
          <Field label="Confirm New Password" type="password" value="" onChange={() => {}} placeholder="Re-enter new password" />
          <SaveButton label="Update Password" />
        </div>
      </SectionCard>
    </div>
  );
}
