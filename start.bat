@echo off
echo Starting SafeSphere Application...

echo Starting backend server...
start cmd /k "cd safesphere-backend && mvn spring-boot:run"

timeout /t 10 /nobreak > nul

echo Starting frontend server...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting up. Please wait a moment for them to fully initialize.
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:3000