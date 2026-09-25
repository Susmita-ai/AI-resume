# Resume Signal

Resume Signal analyzes text-based PDF resumes, predicts a job role, calculates a resume score, and compares the resume with a job description.

## Backend

Create or activate the virtual environment, then install dependencies:

```powershell
.\resume\Scripts\Activate.ps1
pip install -r backend/requirements.txt
```

Start the API from the repository root:

```powershell
uvicorn backend.app:app --reload --port 8000
```

The API is available at `http://localhost:8000`. Upload a PDF to `POST /analyze-resume`, then send its returned `resume_id` with a job description to `POST /ats-analysis`.

## Frontend

```powershell
cd Frontend
npm install
npm run dev
```

The frontend uses `http://localhost:8000` by default. Set `VITE_API_URL` when the API runs elsewhere.

## Tests

Install pytest if needed, then run the canonical root tests:

```powershell
..\resume\Scripts\python.exe -m pip install pytest
..\resume\Scripts\python.exe -m pytest -q
```

The `ai_resume/` directory is a legacy duplicate implementation and is not part of the canonical application.
