@echo off
chcp 65001 >nul
echo ========================================
echo 一键初始化项目
echo ========================================
echo.

node scripts/init-all.js

if %errorlevel% neq 0 (
    echo.
    echo 初始化失败，请检查错误信息
    pause
    exit /b %errorlevel%
)

echo.
pause

