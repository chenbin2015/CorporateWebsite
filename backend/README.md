# Backend (Spring Boot + MyBatis + MySQL)

模块说明：

- `common`：通用工具、基础实体、异常处理。
- `security`：Spring Security + JWT 认证授权。
- `repository`：MyBatis Mapper、数据库实体。
- `service`：业务服务、领域逻辑。
- `infrastructure`：外部系统集成（缓存、消息、存储等）。
- `admin-api`：REST API 入口，面向管理端前端。

## 开发环境

- JDK 17
- Gradle 8+
- MySQL 8

## 启动步骤

```bash
cd backend
./gradlew :admin-api:bootRun
```

默认读取 `admin-api/src/main/resources/application.yml`，请根据本地数据库与 Redis 情况修改。

