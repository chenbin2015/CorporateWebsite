@echo off
echo Removing existing MySQL service...
sc delete MySQL84
timeout /t 2 /nobreak >nul

echo Re-registering MySQL service with data directory...
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --install MySQL84 --datadir="C:\ProgramData\MySQL\MySQL Server 8.4\Data"
if %errorlevel% equ 0 (
    echo Service registered successfully!
    echo Starting MySQL service...
    net start MySQL84
    if %errorlevel% equ 0 (
        echo MySQL service started successfully!
        echo.
        echo You can now connect to MySQL with:
        echo   Username: root
        echo   Password: (empty, no password)
    ) else (
        echo Failed to start MySQL service. Check error logs.
    )
) else (
    echo Failed to register MySQL service.
)
pause

