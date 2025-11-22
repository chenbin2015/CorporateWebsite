<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isDesignMode } from '@shared/utils/context'

const props = defineProps({
  // 主菜单项
  parentMenu: {
    type: Object,
    required: true,
    default: () => ({
      label: '',
      href: '',
      navigation: { type: 'none' },
    }),
  },
  // 子菜单列表
  children: {
    type: Array,
    default: () => [],
  },
  // 当前激活的菜单项路径（用于高亮）
  activePath: {
    type: String,
    default: '',
  },
  // 宽度
  width: {
    type: [String, Number],
    default: '240px',
  },
  // 背景色
  backgroundColor: {
    type: String,
    default: '#f8fafc',
  },
  // 文字颜色
  textColor: {
    type: String,
    default: '#334155',
  },
  // 激活项背景色
  activeBackgroundColor: {
    type: String,
    default: '#2563eb',
  },
  // 激活项文字颜色
  activeTextColor: {
    type: String,
    default: '#ffffff',
  },
})

const router = useRouter()
const route = useRoute()

// 从全局导航配置中获取最新的菜单项信息
const navigationConfig = ref(null)

// 监听全局导航配置的变化
watch(
  () => window.__PROJECT_NAVIGATION_CONFIG__,
  (newConfig) => {
    navigationConfig.value = newConfig
  },
  { immediate: true, deep: true }
)

// 定期检查导航配置（作为备用方案）
let configCheckInterval = null
onMounted(() => {
  const checkConfig = () => {
    const currentConfig = window.__PROJECT_NAVIGATION_CONFIG__
    if (currentConfig !== navigationConfig.value) {
      navigationConfig.value = currentConfig
    }
  }
  checkConfig()
  configCheckInterval = setInterval(checkConfig, 500)
})

onBeforeUnmount(() => {
  if (configCheckInterval) {
    clearInterval(configCheckInterval)
    configCheckInterval = null
  }
})

// 从全局导航配置中查找菜单项（通过 label 匹配）
const findMenuItemInConfig = (label, menuItems) => {
  if (!menuItems) return null
  for (const item of menuItems) {
    if (item.label === label) {
      return item
    }
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        if (child.label === label) {
          return child
        }
      }
    }
  }
  return null
}

// 获取主菜单项（优先使用全局配置中的 navigation）
const parentMenuWithNav = computed(() => {
  if (navigationConfig.value?.menuItems) {
    const menuItem = findMenuItemInConfig(props.parentMenu.label, navigationConfig.value.menuItems)
    if (menuItem && menuItem.navigation && menuItem.navigation.type !== 'none') {
      return {
        ...props.parentMenu,
        navigation: menuItem.navigation,
      }
    }
  }
  return props.parentMenu
})

// 获取子菜单列表（优先使用全局配置中的 navigation）
const childrenWithNav = computed(() => {
  if (!props.children || props.children.length === 0) {
    return []
  }
  
  if (navigationConfig.value?.menuItems) {
    // 找到主菜单项
    const parentMenuItem = findMenuItemInConfig(props.parentMenu.label, navigationConfig.value.menuItems)
    if (parentMenuItem && parentMenuItem.children && parentMenuItem.children.length > 0) {
      // 使用全局配置中的子菜单（包含正确的 navigation）
      return parentMenuItem.children.map(child => {
        const originalChild = props.children.find(c => c.label === child.label)
        return {
          ...(originalChild || child),
          navigation: child.navigation || originalChild?.navigation || { type: 'none' },
        }
      })
    }
  }
  
  // 如果没有全局配置，使用 props 中的 children
  return props.children
})

// 计算当前激活路径
const currentPath = computed(() => {
  if (props.activePath) {
    return props.activePath
  }
  // 从路由中获取当前路径
  return route.path || window.location.pathname
})

// 判断菜单项是否激活
const isActive = (menuItem) => {
  if (!menuItem.navigation || menuItem.navigation.type !== 'page') {
    return false
  }
  
  const navPath = menuItem.navigation.path || menuItem.href || ''
  const current = currentPath.value
  
  // 精确匹配或路径包含
  return navPath === current || current.includes(navPath) || navPath.includes(current)
}

// 处理菜单项点击
const handleMenuClick = (menuItem) => {
  if (isDesignMode()) {
    return
  }
  
  if (!menuItem.navigation || menuItem.navigation.type === 'none') {
    return
  }
  
  if (menuItem.navigation.type === 'page') {
    const path = menuItem.navigation.path || menuItem.href || ''
    if (path) {
      router.push(path)
    }
  } else if (menuItem.navigation.type === 'url') {
    window.open(menuItem.navigation.url, '_blank')
  }
}

// 计算样式
const navStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  backgroundColor: props.backgroundColor,
  color: props.textColor,
}))
</script>

<template>
  <nav class="side-nav" :style="navStyle">
    <!-- 主菜单项 -->
    <div 
      class="side-nav__parent"
      :class="{ 'side-nav__parent--active': isActive(parentMenuWithNav) }"
      @click="handleMenuClick(parentMenuWithNav)"
    >
      <span class="side-nav__parent-label">{{ parentMenuWithNav.label }}</span>
    </div>
    
    <!-- 子菜单列表 -->
    <ul v-if="childrenWithNav && childrenWithNav.length > 0" class="side-nav__children">
      <li
        v-for="(child, index) in childrenWithNav"
        :key="index"
        class="side-nav__child-item"
        :class="{ 'side-nav__child-item--active': isActive(child) }"
        @click="handleMenuClick(child)"
      >
        <span class="side-nav__child-label">{{ child.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.side-nav {
  min-height: 100%;
  padding: 1.5rem 0;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.04);
  flex-shrink: 0; /* 防止收缩 */
}

.side-nav__parent {
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  margin-bottom: 0.5rem;
}

.side-nav__parent:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.side-nav__parent--active {
  background-color: v-bind('activeBackgroundColor');
  color: v-bind('activeTextColor');
  border-left-color: v-bind('activeBackgroundColor');
}

.side-nav__parent-label {
  display: block;
}

.side-nav__children {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-nav__child-item {
  padding: 0.75rem 1.5rem 0.75rem 2.5rem;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  position: relative;
}

.side-nav__child-item::before {
  content: '';
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: currentColor;
  opacity: 0.5;
}

.side-nav__child-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.side-nav__child-item--active {
  background-color: v-bind('activeBackgroundColor');
  color: v-bind('activeTextColor');
  border-left-color: v-bind('activeBackgroundColor');
  font-weight: 500;
}

.side-nav__child-item--active::before {
  background-color: v-bind('activeTextColor');
  opacity: 1;
}

.side-nav__child-label {
  display: block;
}

/* 设计模式下禁用交互 */
.side-nav[data-design-mode] .side-nav__parent,
.side-nav[data-design-mode] .side-nav__child-item {
  cursor: default;
  pointer-events: none;
}
</style>

