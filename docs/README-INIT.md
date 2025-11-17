# 数据库初始化指南

## 📋 初始化脚本说明

### 核心脚本

1. **`init-database.sql`** - 创建数据库表结构
   - 创建 `users` 表
   - 创建 `projects` 表
   - 创建 `pages` 表

2. **`init-project-data.sql`** - 插入示例数据
   - 1 个示例项目
   - 3 个页面（首页、关于我们、联系我们）
   - 每个页面包含多个组件数据

3. **`init-all-data.bat`** (Windows) / **`init-all-data.sh`** (Linux/Mac) - 一键初始化脚本
   - 自动执行上述两个 SQL 文件
   - 检查数据库连接
   - 显示执行进度

### 辅助脚本

4. **`admin-frontend/scripts/init-data.js`** - 通过 API 初始化（需要后端运行）
   ```bash
   cd admin-frontend
   npm run init-data
   ```

5. **`admin-frontend/scripts/generate-sql.js`** - 重新生成 SQL 文件
   ```bash
   cd admin-frontend
   node scripts/generate-sql.js
   ```

## 🚀 快速开始

### 方式一：一键初始化（推荐）

**Windows:**
```bash
init-all-data.bat
```

**Linux/Mac:**
```bash
chmod +x init-all-data.sh
./init-all-data.sh
```

### 方式二：手动执行 SQL

```bash
# 1. 创建表结构
mysql -u root -proot123456 corporate_platform < init-database.sql

# 2. 插入数据
mysql -u root -proot123456 corporate_platform < init-project-data.sql
```

### 方式三：通过 API（需要后端服务运行）

```bash
cd admin-frontend
npm run init-data
```

## 📊 初始化后的数据

### 项目
- **名称**: 示例项目
- **描述**: 这是一个示例项目，包含多个页面和组件数据

### 页面列表

1. **首页** (`/home`)
   - HeroCarousel（轮播图）
   - StatisticsBar（统计条）
   - InfoCardGrid（信息卡片）
   - ContentSplit（内容分割）
   - CTABanner（行动召唤）

2. **关于我们** (`/about`)
   - PageHero（页面头部）
   - BreadcrumbHeader（面包屑）
   - TextImageSection（图文模块）
   - SectionHero（分区英雄）
   - TimelineHorizontal（时间轴）

3. **联系我们** (`/contact`)
   - PageHero（页面头部）
   - ContactCard（联系卡片）
   - SimpleForm（表单）
   - PartnerLogoGrid（合作伙伴）

## ⚙️ 数据库配置

默认配置（可在 `backend/app-starter/src/main/resources/application.yml` 中修改）：
- **数据库名**: `corporate_platform`
- **用户名**: `root`
- **密码**: `root123456`
- **地址**: `localhost:3306`

## 🔧 修改初始化数据

如果需要修改组件数据：

1. 编辑 `admin-frontend/scripts/generate-sql.js`
2. 运行 `node admin-frontend/scripts/generate-sql.js` 重新生成 SQL
3. 执行 `init-all-data.bat` 或手动执行新的 SQL 文件

## 📝 注意事项

- 执行前请确保 MySQL 服务已启动
- 如果数据库不存在，需要先创建：
  ```sql
  CREATE DATABASE corporate_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```
- 重复执行 `init-project-data.sql` 会创建重复数据（如果需要，可以先清空表）
- 组件数据存储在 `pages.schema_data` JSON 字段中

