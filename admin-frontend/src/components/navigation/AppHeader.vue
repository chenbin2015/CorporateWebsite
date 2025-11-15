<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__left">
      <slot name="title">管理平台</slot>
    </div>
    <div class="app-header__right">
      <span class="app-header__user">{{ userStore.displayName }}</span>
      <button type="button" class="link" @click="handleLogout">退出</button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  border-bottom: 0.1rem solid var(--color-border);
  background: var(--color-surface-contrast);
  position: sticky;
  top: 0;
  z-index: 10;
}

.app-header__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-header__user {
  font-weight: 600;
}

.link {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
}
</style>

