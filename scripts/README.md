# 📁 脚本目录说明

本目录包含项目初始化脚本。

## 📂 目录结构

```
scripts/
├── init-all.js              # 一键初始化脚本（主入口）
├── init-all.bat             # Windows 批处理脚本
├── init-all.sh              # Linux/Mac Shell 脚本
├── README-INIT-ALL.md        # 详细使用说明
└── database/                # 数据库 SQL 脚本
    ├── init-all.sql         # 数据库表结构和初始数据
    └── init-all-dbeaver.sql # DBeaver 版本（用于可视化工具）
```

## 🚀 快速开始

### Windows 用户

**方式一：双击运行**
```
双击 scripts/init-all.bat
```

**方式二：命令行运行**
```bash
node scripts/init-all.js
```

### Linux/Mac 用户

**方式一：直接运行脚本**
```bash
chmod +x scripts/init-all.sh
./scripts/init-all.sh
```

**方式二：使用 Node.js**
```bash
node scripts/init-all.js
```

## 📝 功能说明

`init-all.js` 脚本会一次性完成所有初始化工作：

1. ✅ **数据库表结构初始化** - 创建所有必要的数据库表
2. ✅ **创建项目** - 创建"示例项目"
3. ✅ **创建页面** - 创建3个页面（首页、关于我们、联系我们）
4. ✅ **初始化数据源** - 创建4个数据源（新闻、产品、公告、教师）
5. ✅ **初始化数据** - 为每个数据源创建测试数据

## 🔗 详细文档

更多详细信息请查看 [README-INIT-ALL.md](./README-INIT-ALL.md)
