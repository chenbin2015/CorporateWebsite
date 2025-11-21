# 🚀 一键初始化脚本

## 📋 功能说明

这个脚本会一次性完成所有初始化工作：

1. ✅ **数据库表结构初始化** - 创建所有必要的数据库表
2. ✅ **创建项目** - 创建"示例项目"
3. ✅ **创建页面** - 创建3个页面（首页、关于我们、联系我们）
4. ✅ **初始化数据源** - 创建4个数据源（新闻、产品、公告、教师）
5. ✅ **初始化数据** - 为每个数据源创建测试数据

## 🎯 使用方法

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

## ⚙️ 环境要求

1. **MySQL 数据库** - 确保数据库服务正在运行
2. **后端服务** - 确保 Spring Boot 后端服务正在运行（http://localhost:8080）
3. **Node.js** - 确保已安装 Node.js

## 🔧 配置说明

脚本使用以下默认配置，可以通过环境变量修改：

```bash
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root123456
DB_NAME=corporate_platform

# API 配置
API_BASE_URL=http://localhost:8080/api
```

### 自定义配置示例

**Windows (PowerShell):**
```powershell
$env:DB_PASSWORD="your_password"
$env:API_BASE_URL="http://localhost:8080/api"
node scripts/init-all.js
```

**Linux/Mac:**
```bash
DB_PASSWORD=your_password API_BASE_URL=http://localhost:8080/api node scripts/init-all.js
```

## 📊 初始化后的数据

执行成功后，你将获得：

- **1 个项目**：示例项目
- **3 个页面**：
  - 首页（包含5个组件）
  - 关于我们（包含3个组件）
  - 联系我们（包含1个组件）
- **4 个数据源**：
  - 新闻库（6条新闻）
  - 产品库（6个产品）
  - 公告库（6条公告）
  - 教师库（6位教师）

## 🌐 访问地址

初始化完成后，你可以访问：

- **项目管理**: http://localhost:5173/projects
- **页面编辑**: http://localhost:5173/projects/{projectCode}/design/pages

## ⚠️ 注意事项

1. **数据库必须已创建** - 脚本不会自动创建数据库，请先手动创建 `corporate_platform` 数据库
2. **后端服务必须运行** - 脚本需要通过 API 创建项目、页面和数据源
3. **重复执行** - 脚本支持重复执行，已存在的数据会被跳过或更新
4. **数据安全** - 执行前请确保数据库中没有重要数据，脚本会覆盖部分数据

## 🐛 常见问题

### 1. 数据库连接失败

**错误信息**: `数据库连接失败`

**解决方法**:
- 检查 MySQL 服务是否运行
- 检查数据库配置（用户名、密码、数据库名）
- 确认数据库 `corporate_platform` 已创建

### 2. 后端服务连接失败

**错误信息**: `后端服务未运行或无法访问`

**解决方法**:
- 启动 Spring Boot 后端服务
- 检查后端服务地址是否正确（默认 http://localhost:8080）
- 检查防火墙设置

### 3. 项目已存在

**错误信息**: `创建项目失败: 400`

**解决方法**:
- 脚本会自动检测并使用已存在的项目
- 如果想重新创建，请先删除现有项目

## 📝 日志说明

脚本会输出详细的执行日志：

- `✓` 表示成功
- `✗` 表示失败
- `⚠️` 表示警告（通常可以忽略）

## 🔄 重新初始化

如果需要重新初始化：

1. **清空数据库**（可选）：
   ```sql
   DROP DATABASE corporate_platform;
   CREATE DATABASE corporate_platform;
   ```

2. **重新运行脚本**：
   ```bash
   node scripts/init-all.js
   ```

## 💡 提示

- 首次运行建议先检查数据库和后端服务是否正常
- 如果遇到问题，请查看详细的错误日志
- 脚本执行时间通常为 10-30 秒，取决于网络和数据库性能

