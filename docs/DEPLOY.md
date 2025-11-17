# 🚀 部署初始化指南

## 概述

本项目提供了一键部署初始化功能，用于在部署时自动创建数据库表结构和插入初始数据。

## 📦 部署脚本说明

### 主脚本（一键执行）

- **`deploy-init.bat`** (Windows) - 部署初始化主脚本
- **`deploy-init.sh`** (Linux/Mac) - 部署初始化主脚本

### 配置文件

- **`deploy-config.bat.example`** / **`deploy-config.sh.example`** - 配置示例
  - 复制为 `deploy-config.bat` 或 `deploy-config.sh` 并修改配置

### 数据脚本

- **`init-database.sql`** - 数据库表结构
- **`init-project-data.sql`** - 初始数据（项目、页面、组件）

## 🎯 快速开始

### 方式一：使用默认配置（最简单）

**Windows:**
```bash
deploy-init.bat
```

**Linux/Mac:**
```bash
chmod +x deploy-init.sh
./deploy-init.sh
```

### 方式二：使用自定义配置

1. **复制配置文件：**
   ```bash
   # Windows
   copy deploy-config.bat.example deploy-config.bat
   
   # Linux/Mac
   cp deploy-config.sh.example deploy-config.sh
   ```

2. **编辑配置文件：**
   ```bash
   # 修改数据库连接信息
   DB_NAME=your_database
   DB_USER=your_user
   DB_PASS=your_password
   MYSQL_HOST=your_host
   MYSQL_PORT=3306
   ```

3. **执行部署：**
   ```bash
   # Windows
   deploy-init.bat
   
   # Linux/Mac
   ./deploy-init.sh
   ```

## 📋 执行流程

部署脚本会自动执行以下步骤：

1. **检查数据库连接** - 验证 MySQL 服务是否可用
2. **创建数据库** - 如果不存在则自动创建
3. **创建表结构** - 执行 `init-database.sql`
4. **插入初始数据** - 执行 `init-project-data.sql`
5. **验证数据** - 检查插入结果

## ⚙️ 配置选项

### 环境变量（Linux/Mac）

```bash
export DB_NAME="corporate_platform"
export DB_USER="root"
export DB_PASS="root123456"
export MYSQL_HOST="localhost"
export MYSQL_PORT="3306"
export CLEAR_EXISTING="false"  # 是否清空现有数据
```

### 批处理变量（Windows）

在 `deploy-config.bat` 中设置：
```batch
set DB_NAME=corporate_platform
set DB_USER=root
set DB_PASS=root123456
set MYSQL_HOST=localhost
set MYSQL_PORT=3306
set CLEAR_EXISTING=false
```

## 🔄 重复执行

脚本支持重复执行（幂等性）：

- **默认行为**：如果数据已存在，会创建新的记录
- **清空模式**：设置 `CLEAR_EXISTING=true` 会先删除旧数据再插入

```bash
# 清空现有数据后重新插入
export CLEAR_EXISTING=true
./deploy-init.sh
```

## 🔧 集成到 CI/CD

### GitHub Actions 示例

```yaml
name: Deploy Init

on:
  workflow_dispatch:

jobs:
  init:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup MySQL
        run: |
          sudo systemctl start mysql
          
      - name: Run Init Script
        env:
          DB_NAME: corporate_platform
          DB_USER: root
          DB_PASS: ${{ secrets.DB_PASSWORD }}
          MYSQL_HOST: localhost
        run: |
          chmod +x deploy-init.sh
          ./deploy-init.sh
```

### Docker Compose 示例

```yaml
version: '3.8'
services:
  init:
    image: mysql:8.0
    command: bash -c "apt-get update && apt-get install -y mysql-client && ./deploy-init.sh"
    environment:
      DB_NAME: corporate_platform
      DB_USER: root
      DB_PASS: root123456
      MYSQL_HOST: db
    volumes:
      - .:/workspace
    working_dir: /workspace
    depends_on:
      - db
```

## 📊 初始化后的数据

执行成功后，数据库将包含：

- **1 个示例项目**
- **3 个页面**：
  - 首页 (`/home`) - 5个组件
  - 关于我们 (`/about`) - 5个组件
  - 联系我们 (`/contact`) - 4个组件

## 🐛 故障排查

### 问题：无法连接到数据库

**解决方案：**
1. 检查 MySQL 服务是否启动
2. 验证数据库配置是否正确
3. 检查防火墙设置

### 问题：表已存在错误

**解决方案：**
- 这是正常的，脚本使用 `CREATE TABLE IF NOT EXISTS`
- 如果需要重建，先手动删除表或使用 `CLEAR_EXISTING=true`

### 问题：数据重复插入

**解决方案：**
- 使用 `CLEAR_EXISTING=true` 先清空数据
- 或手动删除旧数据：
  ```sql
  DELETE FROM pages WHERE project_id IN (SELECT id FROM projects WHERE name = '示例项目');
  DELETE FROM projects WHERE name = '示例项目';
  ```

## 📝 注意事项

- ✅ 执行前确保 MySQL 服务已启动
- ✅ 确保有足够的数据库权限（CREATE DATABASE, CREATE TABLE, INSERT）
- ✅ 建议在生产环境使用配置文件，不要硬编码密码
- ✅ 脚本会自动处理字符编码（utf8mb4）
- ⚠️ 重复执行会创建重复数据（除非使用 CLEAR_EXISTING）

## 🔐 安全建议

1. **不要将配置文件提交到版本控制**
   ```bash
   # .gitignore
   deploy-config.bat
   deploy-config.sh
   ```

2. **使用环境变量或密钥管理**
   - GitHub Secrets
   - Docker Secrets
   - Kubernetes Secrets

3. **限制数据库权限**
   - 创建专用用户，只授予必要权限
   - 避免使用 root 用户

## 📚 相关文档

- [初始化脚本说明](./INIT-SCRIPTS.md)
- [数据库结构说明](./init-database.sql)

