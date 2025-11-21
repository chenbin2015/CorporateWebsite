#!/bin/bash
# CentOS MySQL 密码重置脚本
# 使用方法: chmod +x reset-mysql-password-centos.sh && sudo ./reset-mysql-password-centos.sh

set -e

echo "=========================================="
echo "MySQL 密码重置脚本"
echo "=========================================="

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then 
    echo "错误: 请使用 sudo 运行此脚本"
    echo "使用方法: sudo ./reset-mysql-password-centos.sh"
    exit 1
fi

# 检测 MySQL 服务名称
if systemctl is-active --quiet mysqld 2>/dev/null; then
    MYSQL_SERVICE="mysqld"
elif systemctl is-active --quiet mysql 2>/dev/null; then
    MYSQL_SERVICE="mysql"
else
    echo "错误: 未找到运行中的 MySQL 服务"
    exit 1
fi

echo "检测到 MySQL 服务: $MYSQL_SERVICE"
echo ""

# 读取新密码
read -sp "请输入新密码: " NEW_PASSWORD
echo ""
read -sp "请再次确认新密码: " NEW_PASSWORD_CONFIRM
echo ""

if [ "$NEW_PASSWORD" != "$NEW_PASSWORD_CONFIRM" ]; then
    echo "错误: 两次输入的密码不一致"
    exit 1
fi

if [ -z "$NEW_PASSWORD" ]; then
    echo "错误: 密码不能为空"
    exit 1
fi

echo ""
echo "=========================================="
echo "开始重置 MySQL 密码..."
echo "=========================================="

# 步骤 1: 停止 MySQL 服务
echo "步骤 1: 停止 MySQL 服务..."
systemctl stop $MYSQL_SERVICE
sleep 2

# 步骤 2: 以安全模式启动 MySQL（跳过权限表）
echo "步骤 2: 以安全模式启动 MySQL..."
systemctl set-environment MYSQLD_OPTS="--skip-grant-tables --skip-networking"
systemctl start $MYSQL_SERVICE
sleep 3

# 步骤 3: 重置密码
echo "步骤 3: 重置 root 密码..."

# 等待 MySQL 完全启动
for i in {1..30}; do
    if mysql -u root -e "SELECT 1" &>/dev/null; then
        break
    fi
    sleep 1
done

# 重置密码（MySQL 5.7+ 和 8.0+ 方法不同）
MYSQL_VERSION=$(mysql -u root -e "SELECT VERSION();" 2>/dev/null | grep -oP '\d+\.\d+' | head -1)

if [ -z "$MYSQL_VERSION" ]; then
    echo "警告: 无法检测 MySQL 版本，使用通用方法"
    mysql -u root <<EOF
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '$NEW_PASSWORD';
FLUSH PRIVILEGES;
EOF
else
    echo "检测到 MySQL 版本: $MYSQL_VERSION"
    MAJOR_VERSION=$(echo $MYSQL_VERSION | cut -d. -f1)
    
    if [ "$MAJOR_VERSION" -ge 8 ]; then
        # MySQL 8.0+
        mysql -u root <<EOF
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '$NEW_PASSWORD';
FLUSH PRIVILEGES;
EOF
    else
        # MySQL 5.7
        mysql -u root <<EOF
FLUSH PRIVILEGES;
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('$NEW_PASSWORD');
FLUSH PRIVILEGES;
EOF
    fi
fi

# 步骤 4: 停止 MySQL 并恢复正常启动
echo "步骤 4: 恢复正常启动模式..."
systemctl stop $MYSQL_SERVICE
systemctl unset-environment MYSQLD_OPTS
systemctl start $MYSQL_SERVICE
sleep 3

# 步骤 5: 验证新密码
echo "步骤 5: 验证新密码..."
if mysql -u root -p"$NEW_PASSWORD" -e "SELECT 1" &>/dev/null; then
    echo ""
    echo "=========================================="
    echo "✅ 密码重置成功！"
    echo "=========================================="
    echo "新密码: $NEW_PASSWORD"
    echo ""
    echo "请妥善保管新密码！"
else
    echo ""
    echo "⚠️  警告: 密码验证失败，请手动检查"
    echo "可以尝试使用以下命令测试:"
    echo "mysql -u root -p"
fi

