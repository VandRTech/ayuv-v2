@echo off
REM Replace YOUR_SESSION_ID_HERE with a real session ID before running.
set SESSION_ID="YOUR_SESSION_ID_HERE"

echo Invoking function with Session ID: %SESSION_ID%

supabase functions invoke final-report-generator --payload "{\"sessionId\":%SESSION_ID%}" 