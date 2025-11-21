<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { dashboardRoutes } from '@/router/modules/dashboard'
import { projectRoutes } from '@/router/modules/projects'

const route = useRoute()
const router = useRouter()

const iconMap = {
  home: 'HomeFilled',
  folder: 'FolderOpened',
  edit: 'Edit',
  default: 'Menu',
}

const resolveIcon = (key) => iconMap[key] ?? iconMap.default

const sections = computed(() => {
  const dashboard = dashboardRoutes.filter((item) => !item.meta?.hidden)
  const projects = projectRoutes.filter((item) => !item.meta?.hidden && item.name !== 'pageBuilder')

  return [
    ...dashboard.map((route) => ({
      type: 'item',
      route,
    })),
    {
      type: 'group',
      label: '项目管理',
      icon: 'folder',
      children: [
        { name: 'projects', label: '项目列表', icon: 'folder' },
        { name: 'projectCreate', label: '添加项目', icon: 'edit' },
      ],
    },
  ]
})

const handleSelect = (index) => {
  const url = router.resolve({ name: index })
  window.open(url.href, '_blank')
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <el-icon><Grid /></el-icon>
      <div>
        <p>Low-code Builder</p>
        <small>管理控制台</small>
      </div>
    </div>
    <el-menu
      class="sidebar__menu"
      :default-active="route.name"
      background-color="transparent"
      text-color="rgba(255,255,255,0.7)"
      active-text-color="#fff"
      @select="handleSelect"
    >
      <template v-for="section in sections" :key="section.label ?? section.route?.name">
        <el-menu-item
          v-if="section.type === 'item'"
          :index="section.route.name"
        >
          <el-icon>
            <component :is="resolveIcon(section.route.meta?.icon)" />
          </el-icon>
          <span>{{ section.route.meta?.title ?? section.route.name }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="section.label">
          <template #title>
            <el-icon>
              <component :is="resolveIcon(section.icon)" />
            </el-icon>
            <span>{{ section.label }}</span>
          </template>
          <el-menu-item v-for="child in section.children" :key="child.name" :index="child.name">
            <el-icon>
              <component :is="resolveIcon(child.icon)" />
            </el-icon>
            <span>{{ child.label }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: linear-gradient(180deg, #0f172a 0%, #111827 50%, #0f172a 100%);
  color: #fff;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar__logo {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar__logo p {
  font-weight: 600;
  margin: 0;
}

.sidebar__logo small {
  opacity: 0.7;
}

.sidebar__menu {
  border-right: none;
  flex: 1;
  padding: 1rem 0.6rem;
}

:deep(.el-menu-item) {
  border-radius: 0.8rem;
  margin: 0.2rem 0.4rem;
}

:deep(.el-menu-item.is-active) {
  background: rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}
</style>

