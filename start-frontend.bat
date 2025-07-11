@echo off
echo ========================================
echo    Travel Booking System - Frontend
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found: 
node --version

echo.
echo Checking if dependencies are installed...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed
)

echo.
echo Starting development server...
echo Frontend will be available at: http://localhost:8081
echo API Gateway should be running at: http://localhost:9999
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause 