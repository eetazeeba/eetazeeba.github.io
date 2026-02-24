@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Download it from: https://nodejs.org/
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not available. Reinstall Node.js from: https://nodejs.org/
  pause
  exit /b 1
)

echo Starting Musifer local site...
echo Open http://127.0.0.1:8080 in your browser.
echo Press Ctrl+C in this window to stop the server.
echo.

call npm start
if errorlevel 1 pause
