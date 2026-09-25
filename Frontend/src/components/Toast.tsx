import React, { createContext, useContext, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastKind = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ToastContextValue {
  toast: (kind: ToastKind, message: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

// ─── Icons per kind ───────────────────────────────────────────────────────────

const KIND_META: Record<ToastKind, { icon: React.ReactNode; bg: string; border: string; text: string }> = {
  success: {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800",
  },
  error: {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
    bg: "bg-red-50", border: "border-red-200", text: "text-red-800",
  },
  warning: {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
    bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800",
  },
  info: {
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
    bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800",
  },
};

// ─── Toast item ───────────────────────────────────────────────────────────────

function ToastItem({ t, onClose }: { t: Toast; onClose: () => void }) {
  const meta = KIND_META[t.kind];
  return (
    <div
      role="alert"
      aria-live={t.kind === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${meta.bg} ${meta.border} shadow-lg max-w-xs animate-fade-up`}
      style={{ minWidth: 240 }}>
      <span className="shrink-0" aria-hidden="true">{meta.icon}</span>
      <p className={`text-xs font-semibold flex-1 ${meta.text}`}>{t.message}</p>
      <button onClick={onClose} aria-label="Dismiss notification"
        className="text-slate-400 hover:text-slate-600 shrink-0 focus:outline-none focus:ring-2 focus:ring-current rounded">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((kind: ToastKind, message: string) => {
    const id = ++nextId;
    setToasts(prev => [...prev, { id, kind, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const close = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toasts portal */}
      <div
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 items-end pointer-events-none"
        aria-label="Notifications"
        aria-relevant="additions"
        aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem t={t} onClose={() => close(t.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
