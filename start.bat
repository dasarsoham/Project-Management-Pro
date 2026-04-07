@echo off
REM Project Management Tool - Startup Script for Windows

echo.
echo ====================================
echo Project Management Tool Startup
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting backend server...
start cmd /k "cd backend && npm install && npm run dev"

timeout /t 3

echo Starting frontend server...
start cmd /k "cd frontend && npm install && npm start"

echo.
echo ====================================
echo Servers are starting...
echo.
echo Backend will be available at:  http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
echo Please wait for both servers to fully start.
echo ====================================
echo.
