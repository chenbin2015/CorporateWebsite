#!/bin/bash

echo "========================================"
echo "一键初始化项目"
echo "========================================"
echo ""

# 解析环境参数（默认使用生产环境）
ENV="prod"
if [ "$1" = "--env=local" ] || [ "$1" = "-e" ] && [ "$2" = "local" ]; then
    ENV="local"
    echo "使用本地环境配置"
elif [ "$1" = "--env=prod" ] || [ "$1" = "-e" ] && [ "$2" = "prod" ]; then
    ENV="prod"
    echo "使用生产环境配置"
else
    echo "使用生产环境配置（默认）"
    echo "提示：使用 --env=local 或 -e local 切换到本地环境"
fi
echo ""

# 执行初始化脚本
node scripts/init-all.js --env=$ENV

if [ $? -ne 0 ]; then
    echo ""
    echo "初始化失败，请检查错误信息"
    exit 1
fi

echo ""
echo "按 Enter 键退出..."
read

