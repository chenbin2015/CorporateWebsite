# 📁 脚本目录说明

本目录包含项目所有的脚本和工具文件，按功能分类组织。

## 📂 目录结构

```
scripts/
├── deploy/          # 部署相关脚本
│   ├── deploy-init.bat          # Windows 部署初始化脚本（主入口）
│   ├── deploy-init.sh           # Linux/Mac 部署初始化脚本（主入口）
│   ├── deploy-config.bat.example # Windows 配置示例
│   └── deploy-config.sh.example  # Linux/Mac 配置示例
│
├── database/        # 数据库 SQL 脚本
│   ├── init-database.sql        # 数据库表结构
│   └── init-project-data.sql    # 初始数据（项目、页面、组件）
│
└── tools/           # 工具脚本
    ├── initialize-mysql.bat      # 初始化 MySQL 数据目录
    ├── fix-mysql-service.bat    # 修复 MySQL 服务
    ├── register-mysql-service.bat # 注册 MySQL 服务
    ├── create-test-user.ps1     # 创建测试用户（PowerShell）
    ├── create-test-user.sql     # 创建测试用户（SQL）
    └── change-root-password.sql # 修改 root 密码
```

## 🚀 快速开始

### 部署初始化（推荐）

在项目根目录执行：

```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

或者直接进入 deploy 目录：

```bash
# Windows
cd scripts\deploy
deploy-init.bat

# Linux/Mac
cd scripts/deploy
./deploy-init.sh
```

### 数据库脚本

数据库相关的 SQL 文件位于 `database/` 目录：

- `init-database.sql` - 创建表结构
- `init-project-data.sql` - 插入初始数据

### 工具脚本

工具脚本位于 `tools/` 目录，用于 MySQL 服务管理：

- `initialize-mysql.bat` - 首次初始化 MySQL
- `fix-mysql-service.bat` - 修复 MySQL 服务问题
- `register-mysql-service.bat` - 注册 MySQL 为 Windows 服务

## 📝 说明

- **部署脚本** (`deploy/`) - 用于生产环境部署，一键初始化数据库
- **数据库脚本** (`database/`) - 核心的数据库结构和数据文件
- **工具脚本** (`tools/`) - 开发和维护时使用的辅助工具

## 🔗 相关文档

详细说明请查看 `docs/` 目录下的文档：
- `docs/DEPLOY.md` - 详细部署文档
- `docs/README-DEPLOY.md` - 快速部署指南

