@echo off
echo Registering MySQL as Windows Service...
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --install MySQL84
if %errorlevel% equ 0 (
    echo Service registered successfully!
    echo Starting MySQL service...
    net start MySQL84
    if %errorlevel% equ 0 (
        echo MySQL service started successfully!
    ) else (
        echo Failed to start MySQL service.
    )
) else (
    echo Failed to register MySQL service. Please run this script as Administrator.
)
pause

