# 🚀 一键初始化脚本说明

## 📦 已整理的初始化脚本

### 核心脚本（必须）

1. **`init-database.sql`** 
   - 创建数据库表结构（users, projects, pages）
   - 执行时机：首次初始化时

2. **`init-project-data.sql`**
   - 插入示例项目和页面数据
   - 包含：1个项目 + 3个页面（每个页面都有组件数据）

### 一键执行脚本（推荐使用）

3. **`init-all-data.bat`** (Windows)
   - ✅ 自动检测 MySQL 路径
   - ✅ 自动执行表结构创建和数据插入
   - ✅ 显示执行进度和结果
   - ✅ 支持中文显示
   
   **使用方法：**
   ```bash
   # 双击运行，或在命令行执行
   init-all-data.bat
   ```

4. **`init-all-data.sh`** (Linux/Mac)
   - 功能同 Windows 版本
   
   **使用方法：**
   ```bash
   chmod +x init-all-data.sh
   ./init-all-data.sh
   ```

### 辅助脚本（可选）

5. **`admin-frontend/scripts/init-data.js`**
   - 通过 API 初始化（需要后端服务运行）
   - 使用方法：`cd admin-frontend && npm run init-data`

6. **`admin-frontend/scripts/generate-sql.js`**
   - 重新生成 SQL 文件（修改组件数据时使用）
   - 使用方法：`cd admin-frontend && node scripts/generate-sql.js`

## 🎯 快速开始

### 方式一：一键初始化（最简单）⭐

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

## 📊 初始化后的数据

执行成功后，数据库中将包含：

- **1 个示例项目**
  - 名称：示例项目
  - 描述：这是一个示例项目，包含多个页面和组件数据

- **3 个页面**，每个页面都包含组件数据：

  1. **首页** (`/home`) - 5个组件
     - HeroCarousel（轮播图）
     - StatisticsBar（统计条）
     - InfoCardGrid（信息卡片）
     - ContentSplit（内容分割）
     - CTABanner（行动召唤）

  2. **关于我们** (`/about`) - 5个组件
     - PageHero（页面头部）
     - BreadcrumbHeader（面包屑）
     - TextImageSection（图文模块）
     - SectionHero（分区英雄）
     - TimelineHorizontal（时间轴）

  3. **联系我们** (`/contact`) - 4个组件
     - PageHero（页面头部）
     - ContactCard（联系卡片）
     - SimpleForm（表单）
     - PartnerLogoGrid（合作伙伴）

## ⚙️ 配置说明

默认数据库配置（可在 `backend/app-starter/src/main/resources/application.yml` 中修改）：

- **数据库名**: `corporate_platform`
- **用户名**: `root`
- **密码**: `root123456`
- **地址**: `localhost:3306`

如需修改，请编辑 `init-all-data.bat` 或 `init-all-data.sh` 中的变量：
```batch
set DB_NAME=corporate_platform
set DB_USER=root
set DB_PASS=root123456
```

## 🔧 修改初始化数据

如果需要修改组件数据：

1. 编辑 `admin-frontend/scripts/generate-sql.js`
2. 运行生成脚本：
   ```bash
   cd admin-frontend
   node scripts/generate-sql.js
   ```
3. 重新执行初始化：
   ```bash
   init-all-data.bat
   ```

## 📝 注意事项

- ✅ 执行前请确保 MySQL 服务已启动
- ✅ 如果数据库不存在，需要先创建：
  ```sql
  CREATE DATABASE corporate_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```
- ⚠️ 重复执行 `init-project-data.sql` 会创建重复数据
- ⚠️ 如需清空重新初始化，可先删除数据：
  ```sql
  DELETE FROM pages WHERE project_id IN (SELECT id FROM projects WHERE name = '示例项目');
  DELETE FROM projects WHERE name = '示例项目';
  ```

## 🎉 验证数据

执行完成后，可以通过以下方式验证：

```sql
-- 查看项目
SELECT * FROM projects WHERE name = '示例项目';

-- 查看页面
SELECT id, name, path, JSON_LENGTH(schema_data) as component_count 
FROM pages 
WHERE project_id = (SELECT id FROM projects WHERE name = '示例项目');
```

