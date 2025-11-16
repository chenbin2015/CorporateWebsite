## Backend (COLA Architecture)

模块结构：

- `app-domain`：领域层，定义实体、仓储接口。
- `app-infrastructure`：基础设施层，MyBatis 与数据源实现。
- `app-application`：应用层，用例编排（Command/Query Service）。
- `app-client`：客户端层，REST Controller/DTO。
- `app-starter`：启动层（Spring Boot），聚合所有模块。

### 构建

```bash
cd backend
mvn clean install
```

### 启动

```bash
cd backend/app-starter
mvn spring-boot:run
```

默认端口 `8080`，示例接口：`GET /api/projects`。配置位于 `app-starter/src/main/resources/application.yml`，按需修改 MySQL 连接。

### 数据库示例

```sql
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'ADMIN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
