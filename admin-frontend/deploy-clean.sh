#!/bin/bash
# Admin Frontend 部署脚本（清理构建缓存版本）
# 服务器: 116.62.13.27
# 目录: /etc/website/frontend

set -e

SERVER_IP="116.62.13.27"
SERVER_USER="root"
SERVER_PASSWORD="1qaz_2wsx"
SERVER_DIR="/etc/website/frontend"

echo "开始部署 admin-frontend（清理构建缓存）..."

# 检查 sshpass
if ! command -v sshpass &> /dev/null; then
    echo "警告: 未安装 sshpass，将提示手动输入密码"
    USE_SSHPASS=false
else
    USE_SSHPASS=true
fi

# SSH 命令
ssh_cmd() {
    if [ "$USE_SSHPASS" = true ]; then
        sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "$@"
    else
        ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "$@"
    fi
}

# SCP 命令
scp_cmd() {
    if [ "$USE_SSHPASS" = true ]; then
        sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no -r "$@"
    else
        scp -o StrictHostKeyChecking=no -r "$@"
    fi
}

# 清理构建缓存
echo "[0/4] 清理构建缓存..."
rm -rf dist
rm -rf node_modules/.vite

# 构建
echo "[1/4] 构建项目..."
npm run build

if [ ! -d "dist" ]; then
    echo "错误: 构建失败，找不到 dist 目录"
    exit 1
fi

# 检查构建输出中是否包含 VideoBanner
echo "[2/4] 检查构建输出..."
if grep -r "VideoBanner" dist/ > /dev/null 2>&1; then
    echo "✓ VideoBanner 组件已包含在构建输出中"
else
    echo "⚠ 警告: 未在构建输出中找到 VideoBanner，但继续部署..."
fi

# 上传
echo "[3/4] 上传到服务器..."
ssh_cmd "mkdir -p $SERVER_DIR && rm -rf $SERVER_DIR/* $SERVER_DIR/.* 2>/dev/null || true"
# 上传 dist 目录下的所有内容（包括子目录和隐藏文件）
cd dist
scp_cmd -r . "$SERVER_USER@$SERVER_IP:$SERVER_DIR/"
cd ..

# 完成
echo "[4/4] 部署完成！"
echo "访问地址: http://$SERVER_IP"
echo ""
echo "提示: 如果仍然看不到 VideoBanner 组件，请："
echo "1. 清除浏览器缓存（Ctrl+Shift+Delete 或 Cmd+Shift+Delete）"
echo "2. 强制刷新页面（Ctrl+F5 或 Cmd+Shift+R）"
echo "3. 检查浏览器控制台是否有错误信息"

