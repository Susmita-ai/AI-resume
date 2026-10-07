import React, { useState, useRef, useCallback, useEffect } from "react";
import { analyzeAts, analyzeResume, type AtsAnalysis, type ResumeAnalysis } from "../lib/api";
import {
  PrimaryButton, SecondaryButton, Tag,
  IconSparkles, IconUpload, IconFileText, IconCheck, IconX,
  IconArrowRight, IconAlertCircle, IconTrash, IconRefresh, IconLock,
  IconCheckCircle, IconFilePdf, IconBrain, IconArrowLeft, IconLogo,
} from "./ui";

// ─── Types ────────────────────────────────────────────────────────────────────

type WorkflowStep = "form" | "loading" | "complete";
type UploadState = "idle" | "uploading" | "uploaded" | "error-format" | "error-size" | "error-corrupt";

interface FileInfo {
  name: string;
  size: string;
  rawSize: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateFile(file: File): UploadState {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext !== "pdf") return "error-format";
  if (file.size > 10 * 1024 * 1024) return "error-size";
  return "uploaded";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// Checkbox component
function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all shrink-0 ${
          checked
            ? "border-blue-600 bg-blue-600"
            : "border-slate-300 bg-white group-hover:border-blue-400"
        }`}
      >
        {checked && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="text-sm text-slate-700 font-medium">{label}</span>
    </label>
  );
}

// Input field
function InputField({ label, placeholder, value, onChange }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
      />
    </div>
  );
}

// ─── Upload Drop Zone ─────────────────────────────────────────────────────────

function UploadDropZone({ onFile }: { onFile: (file: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }, [onFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed py-12 px-8 cursor-pointer transition-all duration-200 ${
        dragging
          ? "border-blue-400 bg-blue-50 scale-[1.01]"
          : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
      }`}
    >
      <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleChange} />

      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
        dragging ? "bg-blue-100 text-blue-600 scale-110" : "bg-white text-blue-500 shadow-sm border border-slate-100"
      }`}>
        <IconUpload size={28} />
      </div>

      <div className="text-center">
        <p className="font-bold text-slate-800 text-base mb-1" style={{ fontFamily: "var(--font-display)" }}>
          {dragging ? "Drop your resume here" : "Upload Your Resume"}
        </p>
        <p className="text-sm text-slate-500 mb-4">
          Drag & drop your resume here or browse files
        </p>
        <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
          <Tag color="blue">PDF</Tag>
          <span className="text-slate-300">·</span>
          <span>Max 10 MB</span>
        </div>
      </div>

      <button
        type="button"
        onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
        className="px-5 py-2 rounded-lg text-sm font-semibold text-blue-600 border border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-400 transition-all"
      >
        Browse Files
      </button>
    </div>
  );
}

// ─── Uploaded File Card ───────────────────────────────────────────────────────

function UploadedFileCard({ file, onRemove, onReplace }: {
  file: FileInfo; onRemove: () => void; onReplace: () => void;
}) {
  const isPdf = file.name.toLowerCase().endsWith(".pdf");
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      {/* File icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isPdf ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
        <IconFilePdf size={24} />
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-bold text-slate-900 truncate" style={{ fontFamily: "var(--font-display)" }}>
            {file.name}
          </p>
          <Tag color="green">
            <IconCheck size={10} />
            <span className="ml-1">Uploaded</span>
          </Tag>
        </div>
        <p className="text-xs text-slate-500">{file.size} · {isPdf ? "PDF Document" : "Word Document"}</p>
        <p className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
          <IconCheck size={11} /> Ready to analyze
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={onReplace}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-white">
          <IconRefresh size={13} /> Replace
        </button>
        <button onClick={onRemove}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-white">
          <IconTrash size={13} /> Remove
        </button>
      </div>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function UploadErrorCard({ state, onRetry }: { state: UploadState; onRetry: () => void }) {
  const messages: Record<string, { title: string; reasons: string[] }> = {
    "error-format": {
      title: "Unsupported file format",
      reasons: ["Only PDF files are accepted by the resume analyzer", "Please check the file extension", "Rename the file if the extension is missing"],
    },
    "error-size": {
      title: "File is too large",
      reasons: ["Maximum file size is 10 MB", "Try compressing your PDF", "Remove unnecessary images or attachments"],
    },
    "error-corrupt": {
      title: "We couldn't read this file",
      reasons: ["The file may be corrupted or password-protected", "Try re-saving the document and uploading again", "Export a fresh copy from your word processor"],
    },
  };

  const msg = messages[state] ?? messages["error-format"];

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
      <div className="flex gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-500 shrink-0">
          <IconAlertCircle size={22} />
        </div>
        <div>
          <p className="font-bold text-red-800 text-sm mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
            We couldn't upload this file
          </p>
          <p className="text-xs text-red-600 font-medium">{msg.title}</p>
        </div>
      </div>
      <ul className="flex flex-col gap-1.5 mb-4">
        {msg.reasons.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-red-700">
            <span className="text-red-400 mt-0.5 shrink-0">·</span> {r}
          </li>
        ))}
      </ul>
      <button onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-red-700 bg-white border border-red-200 hover:bg-red-50 transition-colors">
        <IconRefresh size={13} /> Try Again
      </button>
    </div>
  );
}

// ─── Analysis Options ─────────────────────────────────────────────────────────

const DEFAULT_OPTIONS = {
  ats: true,
  jobMatch: true,
  skillGap: true,
  quality: true,
  recommendations: true,
};

// ─── Form Screen ──────────────────────────────────────────────────────────────

interface AnalysisResult {
  resume: ResumeAnalysis;
  ats: AtsAnalysis;
}

function FormScreen({
  onStart,
  onComplete,
  onFailure,
}: {
  onStart: () => void;
  onComplete: (result: AnalysisResult) => void;
  onFailure: () => void;
}) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [company, setCompany] = useState("");
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [jdError, setJdError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const replaceRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const validated = validateFile(file);
    if (validated !== "uploaded") {
      setSelectedFile(null);
      setFileInfo(null);
      setUploadState(validated);
      return;
    }
    setSelectedFile(file);
    setUploadState("uploaded");
    setFileInfo({ name: file.name, size: formatBytes(file.size), rawSize: file.size });
  };

  const handleAnalyze = async () => {
    if (!jobDesc.trim()) { setJdError(true); return; }
    if (uploadState !== "uploaded" || !selectedFile) return;
    setJdError(false);
    setApiError("");
    setIsSubmitting(true);
    onStart();
    try {
      const resume = await analyzeResume(selectedFile);
      const ats = await analyzeAts(resume.resume_id, jobDesc.trim());
      onComplete({ resume, ats });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Analysis failed. Please try again.");
      onFailure();
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleOption = (key: keyof typeof DEFAULT_OPTIONS) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const optionItems: { key: keyof typeof DEFAULT_OPTIONS; label: string }[] = [
    { key: "ats", label: "ATS Compatibility" },
    { key: "jobMatch", label: "Job Description Matching" },
    { key: "skillGap", label: "Skill Gap Analysis" },
    { key: "quality", label: "Resume Quality Analysis" },
    { key: "recommendations", label: "AI Recommendations" },
  ];

  const canAnalyze = uploadState === "uploaded" && jobDesc.trim().length > 0;
  const isUploading = uploadState === "uploading" || isSubmitting;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Analyze Your Resume
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Upload your resume and provide a target job description to get personalized AI-powered insights.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* ── Upload Card ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6" style={{ boxShadow: "0 2px 20px -4px rgba(15,23,42,0.07)" }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-blue-600" style={{ background: "linear-gradient(135deg, #eff3ff, #f0e8ff)" }}>
              <IconFileText size={16} />
            </div>
            <h2 className="font-bold text-slate-900 text-base" style={{ fontFamily: "var(--font-display)" }}>Resume Upload</h2>
          </div>

          {uploadState === "idle" && <UploadDropZone onFile={handleFile} />}

          {uploadState === "uploading" && fileInfo && (
            <div className="flex items-center gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 animate-fade-up">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                <svg className="animate-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>{fileInfo.name}</p>
                <div className="h-1.5 rounded-full bg-blue-200 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500 animate-pulse" style={{ width: "70%" }} />
                </div>
                <p className="text-xs text-blue-600 font-medium mt-1">Uploading… {fileInfo.size}</p>
              </div>
            </div>
          )}

          {uploadState === "uploaded" && fileInfo && (
            <>
              <UploadedFileCard
                file={fileInfo}
                onRemove={() => { setUploadState("idle"); setFileInfo(null); setSelectedFile(null); }}
                onReplace={() => replaceRef.current?.click()}
              />
              <input ref={replaceRef} type="file" accept=".pdf" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </>
          )}

          {(uploadState === "error-format" || uploadState === "error-size" || uploadState === "error-corrupt") && (
            <UploadErrorCard state={uploadState} onRetry={() => setUploadState("idle")} />
          )}
        </div>

        {/* ── Job Description ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6" style={{ boxShadow: "0 2px 20px -4px rgba(15,23,42,0.07)" }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-purple-600" style={{ background: "linear-gradient(135deg, #f5f0ff, #eff3ff)" }}>
              <IconBrain />
            </div>
            <h2 className="font-bold text-slate-900 text-base" style={{ fontFamily: "var(--font-display)" }}>Target Job Description</h2>
            <span className="ml-auto text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Required</span>
          </div>
          <p className="text-xs text-slate-500 mb-4 ml-9">Paste the job description you want to compare your resume against.</p>

          {/* Optional fields */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <InputField label="Job Role" placeholder="e.g. Software Engineer" value={jobRole} onChange={setJobRole} />
            <InputField label="Company" placeholder="e.g. Amazon" value={company} onChange={setCompany} />
          </div>

          {/* Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Job Description <span className="text-red-500">*</span></label>
            <div className={`relative rounded-xl border transition-all ${
              jdError ? "border-red-400 ring-2 ring-red-100" : jobDesc ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
            }`}>
              <textarea
                value={jobDesc}
                onChange={e => { setJobDesc(e.target.value); if (e.target.value) setJdError(false); }}
                placeholder="Paste the job description here…"
                rows={7}
                className="w-full px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent resize-none rounded-xl"
              />
              <div className="absolute bottom-2 right-3 text-xs text-slate-400 font-medium">
                {jobDesc.length} chars
              </div>
            </div>
            {jdError && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-0.5">
                <IconAlertCircle size={13} /> Please add a job description to continue.
              </div>
            )}
          </div>
        </div>

        {/* ── Analysis Options ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6" style={{ boxShadow: "0 2px 20px -4px rgba(15,23,42,0.07)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-emerald-600" style={{ background: "linear-gradient(135deg, #ecfdf5, #eff3ff)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h2 className="font-bold text-slate-900 text-base" style={{ fontFamily: "var(--font-display)" }}>Analysis Options</h2>
            <span className="ml-auto text-xs text-slate-400">All enabled by default</span>
          </div>
          <div className="flex flex-col gap-3.5">
            {optionItems.map(({ key, label }) => (
              <Checkbox key={key} label={label} checked={options[key]} onChange={() => toggleOption(key)} />
            ))}
          </div>
        </div>

        {/* ── Main CTA ────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3">
          <PrimaryButton
            onClick={handleAnalyze}
            disabled={!canAnalyze || isUploading}
            className="w-full py-4 text-base rounded-xl"
          >
            <IconSparkles size={18} />
            Analyze Resume with AI
          </PrimaryButton>

          {apiError && (
            <p role="alert" className="text-sm text-red-600 text-center">
              {apiError}
            </p>
          )}

          {!canAnalyze && (
            <p className="text-xs text-slate-400 text-center">
              {uploadState !== "uploaded" ? "Upload a resume to continue" : "Add a job description to continue"}
            </p>
          )}

          <div className="flex flex-col items-center gap-1.5 mt-1">
            <p className="text-xs text-slate-500">Analysis usually takes less than a minute.</p>
            <p className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <IconLock size={12} /> Your resume is analyzed securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

const ANALYSIS_STEPS = [
  "Reading resume",
  "Extracting information",
  "Identifying skills",
  "Comparing with job description",
  "Checking ATS compatibility",
  "Generating recommendations",
];

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Keep the progress below completion until the API requests finish.
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) { clearInterval(interval); return 95; }
        return Math.min(prev + 1.5, 95);
      });
    }, 60);

    // Advance steps
    const stepTimings = [0, 600, 1200, 1900, 2700, 3400];
    const timers = stepTimings.map((t, i) => setTimeout(() => setCurrentStep(i), t));

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  const clampedProgress = Math.min(Math.round(progress), 100);

  return (
    <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-8 py-8">
      {/* Animated document visual */}
      <div className="relative w-32 h-32">
        {/* Outer pulse ring */}
        <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)" }} />
        <div className="absolute inset-2 rounded-full opacity-30" style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)", animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite 0.5s" }} />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white"
            style={{ background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)", boxShadow: "0 8px 32px -8px rgba(79,110,247,0.6)" }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              {/* Document */}
              <rect x="7" y="4" width="18" height="22" rx="2" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.5"/>
              <line x1="11" y1="11" x2="21" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="11" y1="15" x2="21" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="11" y1="19" x2="17" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              {/* AI sparkle */}
              <circle cx="26" cy="26" r="7" fill="white" fillOpacity="0.2"/>
              <path d="M26 21.5l1.2 3.3 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Analyzing Your Resume…
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
          Our AI is reviewing your resume against the selected job requirements.
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500 font-medium">Processing</span>
          <span className="text-sm font-bold text-blue-600" style={{ fontFamily: "var(--font-display)" }}>
            {clampedProgress}%
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${clampedProgress}%`,
              background: "linear-gradient(90deg, #4f6ef7, #8b5cf6)",
              boxShadow: "0 0 8px rgba(79,110,247,0.5)",
            }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="w-full bg-slate-50 rounded-2xl border border-slate-100 p-5">
        <div className="flex flex-col gap-3">
          {ANALYSIS_STEPS.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={i} className="flex items-center gap-3">
                {/* Status icon */}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  done ? "bg-emerald-500 text-white" :
                  active ? "border-2 border-blue-500 bg-white" :
                  "border-2 border-slate-200 bg-white"
                }`}>
                  {done ? (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : active ? (
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  ) : null}
                </div>

                <span className={`text-sm transition-all duration-300 ${
                  done ? "text-emerald-700 font-medium" :
                  active ? "text-blue-700 font-semibold" :
                  "text-slate-400"
                }`}>
                  {step}
                </span>

                {active && (
                  <div className="ml-auto flex gap-0.5">
                    {[0, 1, 2].map(d => (
                      <div key={d} className="w-1 h-1 rounded-full bg-blue-400"
                        style={{ animation: `bounce 1.2s ease infinite ${d * 0.2}s` }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-400 italic">This may take a few moments.</p>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({
  result,
  onViewAnalysis,
  onReset,
}: {
  result: AnalysisResult;
  onViewAnalysis: () => void;
  onReset: () => void;
}) {
  const scores = [
    { label: "Resume Score", value: Math.round(result.resume.resume_score), unit: "/100", color: "#4f6ef7", bg: "from-blue-50 to-blue-100/60" },
    { label: "ATS Score", value: Math.round(result.ats.ats_score), unit: "/100", color: "#8b5cf6", bg: "from-purple-50 to-purple-100/60" },
    { label: "Job Match", value: Math.round(result.ats.skill_match_percentage), unit: "%", color: "#0ea5e9", bg: "from-sky-50 to-sky-100/60" },
  ];

  return (
    <div className="max-w-md mx-auto text-center flex flex-col items-center gap-8 py-4">
      {/* Success icon */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-white"
          style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 12px 40px -8px rgba(16,185,129,0.5)" }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
            <polyline points="12 22 18 29 32 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Confetti dots */}
        {[
          { top: "-8px", left: "50%", color: "#4f6ef7", size: 10 },
          { top: "20%", left: "-12px", color: "#8b5cf6", size: 8 },
          { top: "20%", right: "-12px", color: "#f59e0b", size: 8 },
          { bottom: "-8px", left: "30%", color: "#10b981", size: 10 },
          { bottom: "-8px", right: "30%", color: "#ef4444", size: 7 },
        ].map((dot, i) => (
          <div key={i} className="absolute rounded-full"
            style={{ width: dot.size, height: dot.size, background: dot.color, top: dot.top, left: (dot as any).left, right: (dot as any).right, bottom: dot.bottom }} />
        ))}
      </div>

      {/* Heading */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-emerald-700">Analysis Complete</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Analysis Complete!
        </h2>
        <p className="text-slate-500 text-base leading-relaxed">
          Your AI-powered resume report is ready. Here's a quick overview of your results.
        </p>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {scores.map((s, i) => (
          <div key={i} className={`rounded-2xl p-4 bg-gradient-to-br ${s.bg} border border-white/80 text-center`}>
            <div className="flex items-end justify-center gap-0.5 mb-1">
              <span className="text-2xl font-extrabold" style={{ color: s.color, fontFamily: "var(--font-display)" }}>{s.value}</span>
              <span className="text-sm text-slate-400 mb-0.5">{s.unit}</span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 w-full">
        <PrimaryButton onClick={onViewAnalysis} className="py-3.5 text-base w-full">
          <IconCheckCircle size={18} />
          View Full Analysis
        </PrimaryButton>
        <SecondaryButton onClick={onReset} className="w-full py-3">
          <IconArrowLeft size={15} />
          Analyze Another Resume
        </SecondaryButton>
      </div>

      <p className="text-xs text-slate-400">
        Your report includes skills analysis, ATS compatibility, job match score, and personalized recommendations.
      </p>
    </div>
  );
}

// ─── Page Shell (Navbar + layout) ─────────────────────────────────────────────

function AnalyzeNavbar({ onBack }: { onBack: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2.5">
          <IconLogo />
          <span className="font-extrabold text-slate-900 text-base tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            AI Resume Analyzer
          </span>
        </button>

        {/* Step indicator */}
        <div className="hidden sm:flex items-center gap-1.5">
          {[
            { label: "Upload", step: 1 },
            { label: "Analyze", step: 2 },
            { label: "Results", step: 3 },
          ].map(({ label, step }) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 1 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                }`}>{step}</div>
                <span className={`text-xs font-medium ${step === 1 ? "text-blue-700" : "text-slate-400"}`}>{label}</span>
              </div>
              {step < 3 && <div className="w-6 h-px bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>

        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">
          <IconArrowLeft size={14} /> Back to Home
        </button>
      </nav>
    </header>
  );
}

// ─── Analyze Page ─────────────────────────────────────────────────────────────

export default function AnalyzePage({ onBack, onViewDashboard }: { onBack: () => void; onViewDashboard: () => void }) {
  const [step, setStep] = useState<WorkflowStep>("form");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <AnalyzeNavbar onBack={onBack} />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className={step === "form" ? "" : "hidden"}>
          <FormScreen
            onStart={() => setStep("loading")}
            onComplete={analysis => { setResult(analysis); setStep("complete"); }}
            onFailure={() => setStep("form")}
          />
        </div>
        {step === "loading" && (
          <LoadingScreen />
        )}
        {step === "complete" && result && (
          <SuccessScreen
            result={result}
            onViewAnalysis={onViewDashboard}
            onReset={() => setStep("form")}
          />
        )}
      </main>
    </div>
  );
}
