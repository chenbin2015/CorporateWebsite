# CentOS 升级 Node.js 指南

## 📋 当前环境
- 系统：CentOS
- 当前 Node.js 版本：10.24.0
- 目标：升级到最新 LTS 版本（推荐 18.x 或 20.x）

---

## 方法一：使用 NVM（推荐）⭐

NVM (Node Version Manager) 是最灵活的方式，可以轻松切换不同版本。

### 步骤 1：安装 NVM

```bash
# 下载并安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 或者使用 wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 步骤 2：加载 NVM

```bash
# 临时加载（当前会话有效）
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# 永久加载（添加到 ~/.bashrc）
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.bashrc

# 重新加载配置
source ~/.bashrc
```

### 步骤 3：卸载旧版本（可选）

```bash
# 查看已安装的版本
nvm list

# 卸载旧版本
nvm uninstall 10.24.0
```

### 步骤 4：安装新版本

```bash
# 安装最新的 LTS 版本（推荐）
nvm install --lts

# 或者安装特定版本
nvm install 20.10.0
nvm install 18.19.0

# 使用新版本
nvm use 20.10.0

# 设置为默认版本
nvm alias default 20.10.0
```

### 步骤 5：验证

```bash
node -v
npm -v
```

---

## 方法二：使用 NodeSource 仓库

适合系统级安装，所有用户共享。

### 步骤 1：清理旧版本

```bash
# 如果使用 yum 安装的，先卸载
sudo yum remove nodejs npm -y

# 清理缓存
sudo yum clean all
```

### 步骤 2：添加 NodeSource 仓库

```bash
# 对于 Node.js 20.x (LTS)
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# 或者 Node.js 18.x (LTS)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
```

### 步骤 3：安装 Node.js

```bash
sudo yum install -y nodejs
```

### 步骤 4：验证

```bash
node -v
npm -v
```

---

## 方法三：使用 EPEL 仓库

CentOS 官方仓库方式，但版本可能不是最新的。

### 步骤 1：启用 EPEL 仓库

```bash
# CentOS 7
sudo yum install -y epel-release

# CentOS 8/9
sudo dnf install -y epel-release
```

### 步骤 2：安装 Node.js

```bash
# CentOS 7
sudo yum install -y nodejs npm

# CentOS 8/9
sudo dnf install -y nodejs npm
```

---

## 方法四：从源码编译（不推荐）

仅在没有其他选择时使用，编译时间较长。

```bash
# 安装编译工具
sudo yum groupinstall -y "Development Tools"
sudo yum install -y python3

# 下载源码
cd /tmp
wget https://nodejs.org/dist/v20.10.0/node-v20.10.0.tar.gz
tar -xzf node-v20.10.0.tar.gz
cd node-v20.10.0

# 编译安装
./configure
make -j$(nproc)
sudo make install
```

---

## 🔧 常见问题

### 1. 权限问题

如果遇到权限错误，使用 `sudo` 或切换到 root 用户：

```bash
sudo su -
```

### 2. 命令找不到

安装后如果 `node` 命令找不到，检查 PATH：

```bash
# 查看 node 位置
which node

# 如果使用 nvm，确保已加载
source ~/.bashrc
```

### 3. npm 版本过旧

升级 npm 到最新版本：

```bash
npm install -g npm@latest
```

### 4. 全局包丢失

如果使用 nvm 切换版本，全局包需要重新安装：

```bash
# 查看全局包
npm list -g --depth=0

# 重新安装常用包
npm install -g pm2 nodemon
```

---

## 📝 推荐方案

**对于生产服务器，推荐使用方法一（NVM）**，原因：

1. ✅ 可以轻松切换版本
2. ✅ 不需要 root 权限
3. ✅ 不会影响系统其他用户
4. ✅ 可以同时安装多个版本
5. ✅ 升级和降级都很方便

---

## 🚀 快速脚本

使用提供的脚本一键升级：

```bash
# 下载脚本
cd /path/to/scripts

# 添加执行权限
chmod +x upgrade-nodejs-centos.sh

# 运行脚本
./upgrade-nodejs-centos.sh
```

---

## ⚠️ 注意事项

1. **备份重要数据**：升级前确保重要项目已备份
2. **测试环境**：建议先在测试环境验证
3. **检查依赖**：确认项目依赖是否兼容新版本
4. **全局包**：升级后可能需要重新安装全局 npm 包
5. **服务重启**：如果 Node.js 用于运行服务，升级后需要重启服务

---

## 📚 参考链接

- [NVM 官方文档](https://github.com/nvm-sh/nvm)
- [NodeSource 仓库](https://github.com/nodesource/distributions)
- [Node.js 官方下载](https://nodejs.org/)

