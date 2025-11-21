#!/bin/bash

echo "========================================"
echo "一键初始化项目"
echo "========================================"
echo ""

node scripts/init-all.js

if [ $? -ne 0 ]; then
    echo ""
    echo "初始化失败，请检查错误信息"
    exit 1
fi

echo ""
echo "按 Enter 键退出..."
read

