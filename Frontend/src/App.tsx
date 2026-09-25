import { useState, useEffect } from "react";
import { Navbar } from "./components/ui";
import LandingPage from "./components/LandingPage";
import AnalyzePage from "./components/AnalyzePage";
import Dashboard from "./components/Dashboard";
import AuthPage from "./components/AuthPage";
import OnboardingPage from "./components/OnboardingPage";
import ReportPage from "./components/ReportPage";
import RecruiterPage from "./components/RecruiterPage";
import { ToastProvider } from "./components/Toast";

type Page = "landing" | "auth" | "onboarding" | "analyze" | "dashboard" | "report" | "recruiter";

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const goAuth = (mode: "login" | "signup" = "login") => {
    setAuthMode(mode);
    setPage("auth");
  };

  return (
    <ToastProvider>
      {page === "auth" && (
        <AuthPage
          mode={authMode}
          onSuccess={() => setPage("dashboard")}
          onSignupSuccess={() => setPage("onboarding")}
          onBack={() => setPage("landing")}
        />
      )}

      {page === "onboarding" && (
        <OnboardingPage
          onAnalyze={() => setPage("analyze")}
          onDashboard={() => setPage("dashboard")}
        />
      )}

      {page === "analyze" && (
        <AnalyzePage
          onBack={() => setPage("landing")}
          onViewDashboard={() => setPage("dashboard")}
        />
      )}

      {page === "report" && (
        <ReportPage
          onBack={() => setPage("dashboard")}
          onAnalyzeAgain={() => setPage("analyze")}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          onBack={() => setPage("landing")}
          onAnalyzeAgain={() => setPage("analyze")}
          onViewReport={() => setPage("report")}
          isDark={isDark}
          onToggleDark={() => setIsDark(d => !d)}
        />
      )}

      {page === "recruiter" && (
        <RecruiterPage onCandidateLogin={() => goAuth("login")} />
      )}

      {page === "landing" && (
        <div className="min-h-screen bg-white">
          <Navbar onAnalyze={() => goAuth("login")} onRecruiter={() => setPage("recruiter")} />
          <main>
            <LandingPage onAnalyze={() => goAuth("login")} onRecruiter={() => setPage("recruiter")} />
          </main>
        </div>
      )}
    </ToastProvider>
  );
}
