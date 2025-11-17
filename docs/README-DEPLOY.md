# 🚀 一键部署初始化 - 完整指南

## 📋 概述

本项目已配置完整的部署初始化流程，支持**一键生成**所有必要的数据库结构和初始数据。

## 🎯 核心功能

✅ **一键执行** - 单个命令完成所有初始化  
✅ **自动检测** - 自动检测 MySQL 路径和数据库状态  
✅ **幂等性** - 支持重复执行，不会出错  
✅ **配置灵活** - 支持环境变量和配置文件  
✅ **错误处理** - 完善的错误提示和验证  
✅ **跨平台** - 支持 Windows、Linux、Mac  

## 📦 文件结构

```
项目根目录/
├── deploy-init.bat          # Windows 一键部署脚本（主入口）
├── deploy-init.sh            # Linux/Mac 一键部署脚本（主入口）
├── deploy-config.bat.example # Windows 配置示例
├── deploy-config.sh.example  # Linux/Mac 配置示例
├── init-database.sql         # 数据库表结构
├── init-project-data.sql     # 初始数据（项目、页面、组件）
├── DEPLOY.md                 # 详细部署文档
└── README-DEPLOY.md         # 本文件（快速指南）
```

## 🚀 快速开始

### 最简单的方式（使用默认配置）

**Windows:**
```bash
deploy-init.bat
```

**Linux/Mac:**
```bash
chmod +x deploy-init.sh
./deploy-init.sh
```

就这么简单！脚本会自动：
1. 检测 MySQL
2. 检查数据库连接
3. 创建数据库（如果不存在）
4. 创建表结构
5. 插入初始数据
6. 验证结果

## ⚙️ 自定义配置

如果需要修改数据库配置：

### Windows

1. 复制配置示例：
   ```bash
   copy deploy-config.bat.example deploy-config.bat
   ```

2. 编辑 `deploy-config.bat`：
   ```batch
   set DB_NAME=your_database
   set DB_USER=your_user
   set DB_PASS=your_password
   set MYSQL_HOST=your_host
   set MYSQL_PORT=3306
   ```

3. 执行部署：
   ```bash
   deploy-init.bat
   ```

### Linux/Mac

1. 复制配置示例：
   ```bash
   cp deploy-config.sh.example deploy-config.sh
   ```

2. 编辑 `deploy-config.sh`：
   ```bash
   export DB_NAME="your_database"
   export DB_USER="your_user"
   export DB_PASS="your_password"
   export MYSQL_HOST="your_host"
   export MYSQL_PORT="3306"
   ```

3. 执行部署：
   ```bash
   ./deploy-init.sh
   ```

## 📊 初始化后的数据

执行成功后，数据库将包含：

- ✅ **1 个示例项目** - "示例项目"
- ✅ **3 个页面**，每个页面都包含完整的组件数据：
  - 首页 (`/home`) - 5个组件
  - 关于我们 (`/about`) - 5个组件  
  - 联系我们 (`/contact`) - 4个组件

## 🔄 重复执行

脚本支持安全地重复执行：

- **默认模式**：如果数据已存在，会创建新的记录
- **清空模式**：设置 `CLEAR_EXISTING=true` 会先删除旧数据

```bash
# 清空现有数据后重新插入
# Windows
set CLEAR_EXISTING=true
deploy-init.bat

# Linux/Mac
export CLEAR_EXISTING=true
./deploy-init.sh
```

## 🔧 集成到部署流程

### CI/CD 集成

**GitHub Actions:**
```yaml
- name: Initialize Database
  run: |
    chmod +x deploy-init.sh
    export DB_PASS=${{ secrets.DB_PASSWORD }}
    ./deploy-init.sh
```

**Docker:**
```dockerfile
COPY deploy-init.sh /app/
RUN chmod +x /app/deploy-init.sh
CMD ["/app/deploy-init.sh"]
```

### 手动部署

1. 确保 MySQL 服务运行
2. 执行 `deploy-init.bat` 或 `deploy-init.sh`
3. 检查输出确认成功

## 📝 执行流程

```
开始
  ↓
[1] 检查数据库连接
  ↓
[2] 创建数据库（如不存在）
  ↓
[3] 创建/更新表结构
  ↓
[4] 插入初始数据
  ↓
[5] 验证数据
  ↓
完成 ✓
```

## 🐛 常见问题

### Q: 提示找不到 MySQL？

**A:** 确保 MySQL 已安装并在 PATH 中，或编辑配置文件设置 MySQL 完整路径。

### Q: 连接数据库失败？

**A:** 检查：
- MySQL 服务是否启动
- 数据库配置是否正确
- 用户权限是否足够

### Q: 数据重复了？

**A:** 使用 `CLEAR_EXISTING=true` 先清空数据，或手动删除：
```sql
DELETE FROM pages WHERE project_id IN (SELECT id FROM projects WHERE name = '示例项目');
DELETE FROM projects WHERE name = '示例项目';
```

## 📚 相关文档

- [详细部署文档](./DEPLOY.md) - 完整的部署说明
- [初始化脚本说明](./INIT-SCRIPTS.md) - 脚本详细说明
- [数据库结构](./init-database.sql) - 表结构定义

## ✅ 检查清单

部署前请确认：

- [ ] MySQL 服务已启动
- [ ] 数据库用户有足够权限（CREATE DATABASE, CREATE TABLE, INSERT）
- [ ] 配置文件已设置（如需要自定义）
- [ ] 网络连接正常（如远程数据库）

## 🎉 完成！

执行完成后，你可以：

1. 在管理后台查看项目列表
2. 编辑页面内容
3. 在页面搭建器中查看组件数据
4. 开始使用系统！

---

**提示：** 配置文件包含敏感信息，已添加到 `.gitignore`，不会被提交到版本控制。

