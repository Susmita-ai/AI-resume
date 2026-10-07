export interface ResumeAnalysis {
  resume_id: string;
  resume_score: number;
}

export interface AtsAnalysis {
  ats_score: number;
  skill_match_percentage: number;
}

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();
  if (configuredUrl) return configuredUrl.replace(/\/+$/, "");
  if (import.meta.env.DEV) return "http://localhost:8000";

  return "https://ai-resume-eomi.onrender.com";
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload: unknown = await response.json();
  if (!response.ok) {
    const detail =
      typeof payload === "object" &&
      payload !== null &&
      "detail" in payload &&
      typeof payload.detail === "string"
        ? payload.detail
        : `Request failed (${response.status}).`;
    throw new Error(detail);
  }

  return payload as T;
}

export async function analyzeResume(file: File): Promise<ResumeAnalysis> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${getApiBaseUrl()}/analyze-resume`, {
    method: "POST",
    body: formData,
  });
  const payload: unknown = await response.json();

  if (!response.ok) {
    const detail =
      typeof payload === "object" &&
      payload !== null &&
      "detail" in payload &&
      typeof payload.detail === "string"
        ? payload.detail
        : `Resume upload failed (${response.status}).`;
    throw new Error(detail);
  }

  return (payload as { data: ResumeAnalysis }).data;
}

export async function analyzeAts(
  resumeId: string,
  jobDescription: string,
): Promise<AtsAnalysis> {
  const payload = await postJson<{ data: AtsAnalysis }>("/ats-analysis", {
    resume_id: resumeId,
    job_description: jobDescription,
  });
  return payload.data;
}
