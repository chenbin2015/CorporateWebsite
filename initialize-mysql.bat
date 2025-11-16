@echo off
echo Initializing MySQL data directory...
mkdir "C:\ProgramData\MySQL\MySQL Server 8.4\Data" 2>nul
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --initialize-insecure --datadir="C:\ProgramData\MySQL\MySQL Server 8.4\Data"
if %errorlevel% equ 0 (
    echo MySQL initialized successfully!
    echo Starting MySQL service...
    net start MySQL84
    if %errorlevel% equ 0 (
        echo MySQL service started successfully!
        echo.
        echo MySQL root user has no password. Please set a password for security.
    ) else (
        echo Failed to start MySQL service.
    )
) else (
    echo Failed to initialize MySQL. Please run this script as Administrator.
)
pause

