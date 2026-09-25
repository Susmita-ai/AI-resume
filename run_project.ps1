$ErrorActionPreference = "Stop"

$root = "C:\Users\Lenovo\Desktop\ai_resume"
$backend = Join-Path $root "backend"
$frontend = Join-Path $root "Frontend"
$venvPython = Join-Path $root "resume\Scripts\python.exe"

Write-Host "Starting backend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$backend'; & '$venvPython' -m uvicorn app:app --host 0.0.0.0 --port 8000" -WorkingDirectory $backend

Write-Host "Starting frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$frontend'; & 'C:\Program Files\nodejs\npm.cmd' run dev -- --host 0.0.0.0 --port 5173" -WorkingDirectory $frontend

Write-Host "Project started."
Write-Host "Backend: http://localhost:8000"
Write-Host "Frontend: http://localhost:5173"
