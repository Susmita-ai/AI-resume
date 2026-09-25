import React from "react";
import { PrimaryButton, SecondaryButton } from "./ui";

// ─── Skeleton Loaders ─────────────────────────────────────────────────────────

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-slate-200 animate-pulse ${className}`} />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {/* Score hero */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-center gap-6">
        <Shimmer className="w-36 h-36 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-3">
          <Shimmer className="h-5 w-48" />
          <Shimmer className="h-3 w-64" />
          <Shimmer className="h-3 w-72" />
          <div className="grid grid-cols-4 gap-3 mt-2">
            {[...Array(4)].map((_, i) => <Shimmer key={i} className="h-2 rounded-full" />)}
          </div>
        </div>
      </div>
      {/* 4 score cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-3">
            <div className="flex justify-between"><Shimmer className="w-9 h-9 rounded-xl" /><Shimmer className="w-12 h-8 rounded-lg" /></div>
            <Shimmer className="h-1.5 rounded-full" />
            <Shimmer className="h-3 w-24" />
          </div>
        ))}
      </div>
      {/* Large card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4">
        <Shimmer className="h-4 w-40" />
        <Shimmer className="h-20 rounded-xl" />
        <div className="flex gap-2">{[...Array(6)].map((_, i) => <Shimmer key={i} className="h-6 w-16 rounded-full" />)}</div>
      </div>
    </div>
  );
}

export function ResumeSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
          <Shimmer className="w-10 h-10 rounded-xl shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <Shimmer className="h-3 w-48" />
            <Shimmer className="h-2.5 w-32" />
          </div>
          <div className="flex gap-2 shrink-0">
            <Shimmer className="h-7 w-14 rounded-lg" />
            <Shimmer className="h-7 w-20 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Reusable UX State Components ────────────────────────────────────────────

function StateShell({ icon, iconBg, title, subtitle, children }: {
  icon: React.ReactNode; iconBg: string; title: string; subtitle?: string; children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 gap-4">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-col sm:flex-row gap-3 mt-2">{children}</div>}
    </div>
  );
}

// Empty state
export function EmptyState({ title = "Nothing here yet.", subtitle, ctaLabel, onCta }: {
  title?: string; subtitle?: string; ctaLabel?: string; onCta?: () => void;
}) {
  return (
    <StateShell
      iconBg="bg-slate-100"
      icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>}
      title={title}
      subtitle={subtitle ?? "No resume analyses yet. Upload your resume to get AI-powered insights."}
    >
      {ctaLabel && <PrimaryButton onClick={onCta}>{ctaLabel}</PrimaryButton>}
    </StateShell>
  );
}

// Loading state
export function LoadingState({ title = "Loading…", subtitle }: { title?: string; subtitle?: string }) {
  return (
    <StateShell
      iconBg="bg-blue-50"
      icon={
        <svg className="animate-spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
      }
      title={title}
      subtitle={subtitle ?? "Please wait while we fetch your data."}
    />
  );
}

// Success state
export function SuccessState({ title = "Done!", subtitle, onContinue }: {
  title?: string; subtitle?: string; onContinue?: () => void;
}) {
  return (
    <StateShell
      iconBg="bg-emerald-100"
      icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
      title={title}
      subtitle={subtitle ?? "Analysis completed successfully."}
    >
      {onContinue && <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>}
    </StateShell>
  );
}

// Error state
export function ErrorState({ title = "Something went wrong.", subtitle, onRetry }: {
  title?: string; subtitle?: string; onRetry?: () => void;
}) {
  return (
    <StateShell
      iconBg="bg-red-100"
      icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>}
      title={title}
      subtitle={subtitle ?? "We couldn't complete the analysis. Please try again."}
    >
      {onRetry && <PrimaryButton onClick={onRetry}>Try Again</PrimaryButton>}
    </StateShell>
  );
}

// Offline state
export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <StateShell
      iconBg="bg-slate-100"
      icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>}
      title="No internet connection."
      subtitle="Check your connection and try again."
    >
      {onRetry && <SecondaryButton onClick={onRetry}>Try Again</SecondaryButton>}
    </StateShell>
  );
}

// File error state
export function FileErrorState({ onUploadAnother }: { onUploadAnother?: () => void }) {
  return (
    <StateShell
      iconBg="bg-orange-100"
      icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>}
      title="This file could not be processed."
      subtitle="The file may be corrupted, password-protected, or in an unsupported format."
    >
      {onUploadAnother && <PrimaryButton onClick={onUploadAnother}>Upload Another File</PrimaryButton>}
    </StateShell>
  );
}
