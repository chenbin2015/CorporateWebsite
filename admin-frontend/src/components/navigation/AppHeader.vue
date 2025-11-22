<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleProfile = () => {
  router.push({ name: 'userProfile' })
}

const handleLogout = () => {
  userStore.logout()
  router.replace({ name: 'login' })
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__left">
      <slot name="title">
        <div class="header-title">
          <h2>管理平台</h2>
          <p>低代码搭建 · 权限一体化</p>
        </div>
      </slot>
    </div>
    <div class="app-header__right">
      <el-button type="primary" text circle>
        <el-icon><BellFilled /></el-icon>
      </el-button>
      <el-divider direction="vertical" />
      <el-dropdown trigger="click">
        <span class="user-entry">
          <el-avatar size="small">
            <el-icon><UserFilled /></el-icon>
          </el-avatar>
          <span>{{ userStore.displayName }}</span>
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleProfile">个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 1.5rem;
  border-bottom: 0.1rem solid var(--color-border);
  background: rgba(248, 250, 252, 0.92);
  backdrop-filter: blur(6px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-title h2 {
  margin: 0;
}

.header-title p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.app-header__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-entry {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
}
</style>

