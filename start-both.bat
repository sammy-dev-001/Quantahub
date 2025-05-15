@echo off
echo Starting both frontend and backend servers...

start cmd /k "cd %~dp0 && npm run dev"
start cmd /k "cd %~dp0backend && node server.js"

echo Servers have been started in separate windows.
echo Frontend: http://localhost:5173 or http://localhost:5174
echo Backend: http://localhost:5000 