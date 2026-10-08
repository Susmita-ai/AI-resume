# Deployment Guide for Resume Signal

This repository is ready for automatic deployment to **Render**, **Vercel**, **Railway**, or via **Docker Containers**.

---

## 1. Quickest Cloud Deployment (Render Blueprint - Recommended)

Render supports one-click full-stack deployment using the included [`render.yaml`](file:///c:/Users/Lenovo/Desktop/ai_resume/render.yaml).

### Steps:
1. Push your latest code changes to GitHub:
   ```bash
   git add .
   git commit -m "Add deployment configuration files"
   git push origin main
   ```
2. Log in to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Blueprint**.
4. Connect your repository (`Susmita-ai/AI-resume`).
5. Render will automatically detect [`render.yaml`](file:///c:/Users/Lenovo/Desktop/ai_resume/render.yaml) and configure two services:
   - **`ai-resume-backend`**: FastAPI Python service (`uvicorn backend.app:app`)
   - **`ai-resume-frontend`**: React static web app (`npm run build`)
6. Click **Apply**. Render will build and deploy both services!

---

## 2. Deploying Frontend to Vercel (Recommended for Frontend)

Vercel provides instant worldwide CDN deployment for the React Frontend.

### Steps:
1. Push changes to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import `Susmita-ai/AI-resume`.
4. Set the **Root Directory** to `Frontend`.
5. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://ai-resume-eomi.onrender.com` (or your live backend URL)
6. Click **Deploy**.

---

## 3. Containerized Deployment (Docker & Docker Compose)

You can run the application locally or on any cloud server (AWS EC2, DigitalOcean, GCP) using Docker:

### Run with Docker Compose:
```bash
docker-compose up --build -d
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000`

---

## 4. Running Locally

To run the dev servers locally on your machine:

```powershell
.\run_project.ps1
```

- **Backend API**: `http://localhost:8000`
- **Frontend App**: `http://localhost:5173`
