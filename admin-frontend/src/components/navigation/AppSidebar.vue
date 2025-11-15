<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { dashboardRoutes } from '@/router/modules/dashboard'
import { projectRoutes } from '@/router/modules/projects'

const route = useRoute()
const router = useRouter()

const items = computed(() => [...dashboardRoutes, ...projectRoutes].filter((item) => !item.meta?.hidden))

const isActive = (item) => {
  return route.name === item.name
}

const navigate = (item) => {
  router.push({ name: item.name })
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__logo">Admin Console</div>
    <nav class="sidebar__nav">
      <button
        v-for="item in items"
        :key="item.name"
        type="button"
        :class="['sidebar__nav-item', { 'sidebar__nav-item--active': isActive(item) }]"
        @click="navigate(item)"
      >
        <span>{{ item.meta?.title ?? item.name }}</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: var(--color-secondary);
  color: #fff;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
}

.sidebar__logo {
  padding: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  padding: 0 0.6rem;
  gap: 0.4rem;
}

.sidebar__nav-item {
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  padding: 0.8rem 1rem;
  border-radius: var(--radius-md);
  text-align: left;
}

.sidebar__nav-item--active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>

