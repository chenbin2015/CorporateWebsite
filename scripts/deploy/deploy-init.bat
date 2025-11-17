@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo 部署初始化脚本 - 一键生成所有数据
echo ========================================
echo.

REM 设置默认配置
set DB_NAME=corporate_platform
set DB_USER=root
set DB_PASS=root123456
set MYSQL_HOST=localhost
set MYSQL_PORT=3306

REM 检查是否有配置文件
if exist "deploy-config.bat" (
    echo [信息] 加载自定义配置...
    call deploy-config.bat
)

REM 检测 MySQL 路径
set MYSQL_PATH=
if exist "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" (
    set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe"
) else if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
) else (
    where mysql >nul 2>&1
    if !errorlevel! equ 0 (
        set MYSQL_PATH=mysql
    ) else (
        echo [错误] 未找到 MySQL 命令
        echo 请确保 MySQL 已安装并添加到 PATH，或编辑 deploy-config.bat 设置 MYSQL_PATH
        pause
        exit /b 1
    )
)

echo [配置信息]
echo   数据库: %DB_NAME%
echo   MySQL路径: %MYSQL_PATH%
echo.

REM 步骤1: 检查数据库连接
echo [步骤 1/4] 检查数据库连接...
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %DB_USER% -p%DB_PASS% -e "SELECT 1;" >nul 2>&1
if !errorlevel! neq 0 (
    echo [错误] 无法连接到数据库
    echo 请检查：
    echo   1. MySQL 服务是否启动
    echo   2. 数据库配置是否正确（可编辑 deploy-config.bat）
    echo   3. 数据库是否存在（如果不存在，脚本会自动创建）
    pause
    exit /b 1
)
echo [✓] 数据库连接成功

REM 步骤2: 确保数据库存在
echo.
echo [步骤 2/4] 确保数据库存在...
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %DB_USER% -p%DB_PASS% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME% CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
if !errorlevel! equ 0 (
    echo [✓] 数据库已就绪
) else (
    echo [警告] 数据库创建可能失败，继续执行...
)

REM 步骤3: 创建表结构
echo.
echo [步骤 3/4] 创建/更新表结构...
set SCRIPT_DIR=%~dp0
set DB_SCRIPT=%SCRIPT_DIR%..\database\init-database.sql
if not exist "%DB_SCRIPT%" (
    echo [错误] 未找到 init-database.sql 文件: %DB_SCRIPT%
    pause
    exit /b 1
)
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %DB_USER% -p%DB_PASS% %DB_NAME% --default-character-set=utf8mb4 < "%DB_SCRIPT%"
if !errorlevel! equ 0 (
    echo [✓] 表结构创建/更新完成
) else (
    echo [错误] 表结构创建失败
    pause
    exit /b 1
)

REM 步骤4: 插入初始化数据
echo.
echo [步骤 4/4] 插入初始化数据...
set DATA_SCRIPT=%SCRIPT_DIR%..\database\init-project-data.sql
if not exist "%DATA_SCRIPT%" (
    echo [错误] 未找到 init-project-data.sql 文件: %DATA_SCRIPT%
    pause
    exit /b 1
)

REM 检查是否已存在数据（可选：清空旧数据）
if "%CLEAR_EXISTING%"=="true" (
    echo [信息] 清空现有数据...
    %MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %DB_USER% -p%DB_PASS% %DB_NAME% --default-character-set=utf8mb4 -e "DELETE FROM pages WHERE project_id IN (SELECT id FROM projects WHERE name = '示例项目'); DELETE FROM projects WHERE name = '示例项目';" 2>nul
)

%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %DB_USER% -p%DB_PASS% %DB_NAME% --default-character-set=utf8mb4 < "%DATA_SCRIPT%"
if !errorlevel! equ 0 (
    echo [✓] 数据插入成功
) else (
    echo [错误] 数据插入失败
    pause
    exit /b 1
)

REM 验证数据
echo.
echo [验证] 检查插入的数据...
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %DB_USER% -p%DB_PASS% %DB_NAME% --default-character-set=utf8mb4 -e "SELECT p.id as project_id, p.name as project_name, COUNT(pg.id) as page_count FROM projects p LEFT JOIN pages pg ON pg.project_id = p.id WHERE p.name = '示例项目' GROUP BY p.id, p.name;" 2>nul

echo.
echo ========================================
echo 部署初始化完成！
echo ========================================
echo.
echo 已创建：
echo   - 数据库表结构
echo   - 1 个示例项目
echo   - 3 个页面（每个页面都包含组件数据）
echo.
echo 可以在管理后台查看和编辑这些数据。
echo.
pause
exit /b 0

