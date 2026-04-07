#!/bin/bash
# Project Management Tool - Startup Script for macOS/Linux

echo ""
echo "===================================="
echo "Project Management Tool Startup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Start backend
echo "Starting backend server..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend
cd ../frontend
echo "Starting frontend server..."
npm install
npm start &
FRONTEND_PID=$!

echo ""
echo "===================================="
echo "Servers are starting..."
echo ""
echo "Backend will be available at:  http://localhost:5000"
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "To stop servers, run: kill $BACKEND_PID $FRONTEND_PID"
echo "===================================="
echo ""

# Wait for all processes
wait
