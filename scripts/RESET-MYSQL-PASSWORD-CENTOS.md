# CentOS MySQL 密码重置指南

## 📋 场景
忘记了服务器上 MySQL 的 root 密码，需要重置。

---

## 方法一：使用脚本（推荐）⭐

### 快速重置

```bash
# 1. 上传脚本到服务器
# 2. 添加执行权限
chmod +x reset-mysql-password-centos.sh

# 3. 使用 sudo 运行
sudo ./reset-mysql-password-centos.sh
```

脚本会自动：
- 检测 MySQL 服务
- 停止服务
- 以安全模式启动
- 重置密码
- 恢复正常模式
- 验证新密码

---

## 方法二：手动重置（详细步骤）

### 步骤 1：停止 MySQL 服务

```bash
# 检查 MySQL 服务状态
sudo systemctl status mysqld
# 或
sudo systemctl status mysql

# 停止 MySQL 服务
sudo systemctl stop mysqld
# 或
sudo systemctl stop mysql
```

### 步骤 2：以安全模式启动 MySQL

```bash
# 设置环境变量，跳过权限表
sudo systemctl set-environment MYSQLD_OPTS="--skip-grant-tables --skip-networking"

# 启动 MySQL
sudo systemctl start mysqld

# 等待几秒让 MySQL 完全启动
sleep 3
```

### 步骤 3：连接 MySQL（无需密码）

```bash
# 直接连接，不需要密码
mysql -u root
```

### 步骤 4：重置密码

在 MySQL 命令行中执行：

**对于 MySQL 8.0+：**
```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的新密码';
FLUSH PRIVILEGES;
exit;
```

**对于 MySQL 5.7：**
```sql
FLUSH PRIVILEGES;
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('你的新密码');
FLUSH PRIVILEGES;
exit;
```

### 步骤 5：恢复正常启动模式

```bash
# 停止 MySQL
sudo systemctl stop mysqld

# 清除环境变量
sudo systemctl unset-environment MYSQLD_OPTS

# 正常启动 MySQL
sudo systemctl start mysqld
```

### 步骤 6：验证新密码

```bash
# 使用新密码登录测试
mysql -u root -p
# 输入新密码
```

---

## 方法三：使用 mysqld_safe（备用方法）

如果方法二不工作，可以尝试：

### 步骤 1：停止 MySQL

```bash
sudo systemctl stop mysqld
```

### 步骤 2：使用 mysqld_safe 启动

```bash
# 查找 MySQL 安装路径
which mysqld_safe
# 通常在 /usr/bin/mysqld_safe 或 /usr/sbin/mysqld_safe

# 以后台方式启动（跳过权限表）
sudo mysqld_safe --skip-grant-tables --skip-networking &
```

### 步骤 3：连接并重置密码

```bash
# 连接 MySQL
mysql -u root

# 重置密码（同方法二的步骤 4）
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的新密码';
FLUSH PRIVILEGES;
exit;
```

### 步骤 4：停止 mysqld_safe 并正常启动

```bash
# 查找并停止 mysqld_safe 进程
sudo pkill mysqld_safe
sudo pkill mysqld

# 正常启动 MySQL
sudo systemctl start mysqld
```

---

## 方法四：使用临时 SQL 文件

### 步骤 1：创建临时 SQL 文件

```bash
# 创建重置密码的 SQL 文件
cat > /tmp/reset_password.sql <<EOF
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的新密码';
FLUSH PRIVILEGES;
EOF
```

### 步骤 2：以安全模式启动并执行

```bash
# 停止 MySQL
sudo systemctl stop mysqld

# 设置环境变量
sudo systemctl set-environment MYSQLD_OPTS="--skip-grant-tables --skip-networking --init-file=/tmp/reset_password.sql"

# 启动 MySQL（会自动执行 SQL 文件）
sudo systemctl start mysqld

# 等待几秒
sleep 5

# 恢复正常模式
sudo systemctl stop mysqld
sudo systemctl unset-environment MYSQLD_OPTS
sudo systemctl start mysqld

# 清理临时文件
rm /tmp/reset_password.sql
```

---

## 🔧 常见问题

### 1. 找不到 mysqld 服务

```bash
# 检查服务名称
systemctl list-units | grep mysql

# 可能的名字：
# - mysqld
# - mysql
# - mariadb
```

### 2. 无法停止 MySQL 服务

```bash
# 强制停止
sudo systemctl kill -s SIGKILL mysqld

# 或者查找进程并杀死
sudo ps aux | grep mysql
sudo kill -9 <进程ID>
```

### 3. 安全模式启动失败

检查 MySQL 错误日志：

```bash
# 查看日志
sudo tail -f /var/log/mysqld.log
# 或
sudo journalctl -u mysqld -f
```

### 4. 重置后仍然无法登录

可能的原因：
- 密码包含特殊字符，需要转义
- 用户主机名不匹配（'root'@'localhost' vs 'root'@'%'）

检查用户：

```sql
SELECT user, host FROM mysql.user WHERE user='root';
```

重置所有 root 用户：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
ALTER USER 'root'@'%' IDENTIFIED BY '新密码';
FLUSH PRIVILEGES;
```

### 5. MySQL 8.0 密码策略

MySQL 8.0 有密码复杂度要求，如果密码太简单会失败：

```sql
-- 查看密码策略
SHOW VARIABLES LIKE 'validate_password%';

-- 临时降低密码策略（如果需要）
SET GLOBAL validate_password.policy=LOW;
SET GLOBAL validate_password.length=4;
```

---

## 🔒 安全建议

1. **使用强密码**：包含大小写字母、数字和特殊字符
2. **限制 root 远程访问**：只允许 localhost 连接
3. **创建专用用户**：不要所有应用都用 root
4. **定期更换密码**：建议每 3-6 个月更换一次
5. **记录密码**：使用密码管理器妥善保管

---

## 📝 重置后需要做的事情

1. **更新应用配置**：更新所有使用 MySQL 的应用配置文件
2. **测试连接**：确保所有服务能正常连接数据库
3. **备份配置**：将新密码安全地备份到密码管理器

---

## ⚠️ 注意事项

1. **需要 root 权限**：所有操作都需要 sudo 或 root 权限
2. **服务会短暂中断**：重置过程中 MySQL 服务会停止
3. **备份数据**：虽然重置密码不会影响数据，但建议先备份
4. **生产环境谨慎**：生产环境建议在维护窗口期操作

---

## 🚀 快速命令参考

```bash
# 停止 MySQL
sudo systemctl stop mysqld

# 安全模式启动
sudo systemctl set-environment MYSQLD_OPTS="--skip-grant-tables --skip-networking"
sudo systemctl start mysqld

# 连接 MySQL
mysql -u root

# 重置密码（在 MySQL 中执行）
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
FLUSH PRIVILEGES;
exit;

# 恢复正常模式
sudo systemctl stop mysqld
sudo systemctl unset-environment MYSQLD_OPTS
sudo systemctl start mysqld

# 验证
mysql -u root -p
```

---

## 📚 相关文档

- [MySQL 官方文档 - 重置 Root 密码](https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html)
- [MySQL 8.0 密码验证组件](https://dev.mysql.com/doc/refman/8.0/en/validate-password.html)

