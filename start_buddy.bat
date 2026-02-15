@echo off
echo Starting YARA AI System...

echo Starting Backend Server on port 8000...
start "YARA Backend" cmd /k "cd /d %~dp0 && python server.py"

echo Starting Frontend Dev Server...
start "YARA Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo System Started! 
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8000
pause
