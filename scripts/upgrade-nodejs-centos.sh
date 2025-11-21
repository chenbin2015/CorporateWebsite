#!/bin/bash
# CentOS 升级 Node.js 脚本
# 使用方法: chmod +x upgrade-nodejs-centos.sh && ./upgrade-nodejs-centos.sh

set -e

echo "=========================================="
echo "CentOS Node.js 升级脚本"
echo "=========================================="

# 检查当前 Node.js 版本
echo "当前 Node.js 版本:"
node -v 2>/dev/null || echo "未安装 Node.js"

# 检查是否已安装 nvm
if [ -d "$HOME/.nvm" ]; then
    echo "检测到已安装 nvm，使用 nvm 升级..."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    # 安装最新的 LTS 版本
    echo "正在安装 Node.js LTS 版本..."
    nvm install --lts
    nvm use --lts
    nvm alias default lts/*
    
    echo "升级完成！"
    node -v
    npm -v
else
    echo "未安装 nvm，开始安装 nvm..."
    
    # 安装 nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    
    # 加载 nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    
    # 安装最新的 LTS 版本
    echo "正在安装 Node.js LTS 版本..."
    nvm install --lts
    nvm use --lts
    nvm alias default lts/*
    
    echo ""
    echo "=========================================="
    echo "升级完成！"
    echo "=========================================="
    echo "Node.js 版本: $(node -v)"
    echo "npm 版本: $(npm -v)"
    echo ""
    echo "注意：请将以下内容添加到 ~/.bashrc 或 ~/.zshrc 中："
    echo "export NVM_DIR=\"\$HOME/.nvm\""
    echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\""
    echo "[ -s \"\$NVM_DIR/bash_completion\" ] && \. \"\$NVM_DIR/bash_completion\""
fi

