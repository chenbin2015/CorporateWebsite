<template>
  <Teleport to="body" :disabled="!shouldBeFixed">
    <header 
      class="main-header" 
      :class="{ 'main-header--fixed': shouldBeFixed }"
      :style="headerStyle"
    >

    <!-- 主导航区域 -->
    <div class="main-header__main">
      <div class="main-header__container">
        <!-- Logo 和品牌 -->
        <div class="main-header__brand">
          <div class="brand-logo">
            <div class="logo-icon"></div>
          </div>
          <div class="brand-text">
            <h1 class="brand-title">{{ title }}</h1>
            <p class="brand-subtitle">{{ subtitle }}</p>
          </div>
        </div>

        <!-- 搜索框（可选） -->
        <div v-if="showSearch" class="main-header__search">
          <input type="text" placeholder="搜索..." class="search-input" />
          <button class="search-button">搜索</button>
        </div>

        <!-- 移动端菜单按钮 -->
        <button 
          class="mobile-menu-toggle" 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="切换菜单"
        >
          <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        </button>
      </div>

      <!-- 导航菜单 -->
      <nav class="main-header__nav" :class="{ 'nav--open': isMobileMenuOpen }" :style="{ background: 'transparent' }">
        <ul class="nav-list">
          <li
            v-for="(item, index) in navItems"
            :key="index"
            class="nav-item"
            :class="{ 'nav-item--has-children': item.children && item.children.length > 0 }"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
          >
            <a
              :href="isDesignMode() ? 'javascript:void(0)' : (item.href || '#')"
              class="nav-link"
              :class="{ 'nav-link--active': index === defaultActiveIndex }"
              @click="(e) => handleItemClick(item, e)"
              :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : ''"
            >
              {{ item.label }}
              <span v-if="item.children && item.children.length > 0" class="nav-arrow">▼</span>
            </a>
            
            <!-- 下拉子菜单 -->
            <ul
              v-if="item.children && item.children.length > 0"
              class="submenu"
              :class="{ 'submenu--visible': hoveredIndex === index || isMobileMenuOpen }"
            >
              <li
                v-for="(subItem, subIndex) in item.children"
                :key="subIndex"
                class="submenu-item"
              >
                <a
                  :href="isDesignMode() ? 'javascript:void(0)' : (subItem.href || '#')"
                  class="submenu-link"
                  @click="(e) => handleSubItemClick(subItem, e)"
                  :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : ''"
                >
                  {{ subItem.label }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  </Teleport>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { isDesignMode } from '@shared/utils/context'

const router = useRouter()

// 判断是否应该应用 fixed 定位（设计态不应用）
const shouldBeFixed = computed(() => {
  const fixed = props.fixed
  const designMode = isDesignMode()
  const result = fixed && !designMode
  
  // 调试：打印吸顶相关值
  console.log('[MainHeader] 吸顶调试信息:', {
    fixed: fixed,
    isDesignMode: designMode,
    shouldBeFixed: result,
    window__BUILDER_MODE__: window.__BUILDER_MODE__,
    window__PREVIEW_MODE__: window.__PREVIEW_MODE__,
    window__RUNTIME_MODE__: window.__RUNTIME_MODE__,
    pathname: window.location?.pathname,
  })
  
  return result
})

const props = defineProps({
  title: {
    type: String,
    default: '企业门户',
  },
  subtitle: {
    type: String,
    default: '智慧校园 · 数字化管理平台',
  },
  showSearch: {
    type: Boolean,
    default: false,
  },
  navBackgroundColor: {
    type: String,
    default: '#2d3748',
  },
  // 首选数组对象形式：[{ label, href, children, navigation }]
  // 兼容老的字符串数组：['关于学校', ...]
  menuItems: {
    type: Array,
    default: () => [
      { label: '关于学校', href: '/about', navigation: { type: 'none' } },
      { label: '院系设置', href: '/colleges', navigation: { type: 'none' } },
      { label: '师资队伍', href: '/faculty', navigation: { type: 'none' } },
      { label: '教育教学', href: '/education', navigation: { type: 'none' } },
      { label: '科学研究', href: '/research', navigation: { type: 'none' } },
      { label: '招生就业', href: '/admissions', navigation: { type: 'none' } },
      { label: '图书馆', href: '/library', navigation: { type: 'none' } },
    ],
  },
  defaultActiveIndex: {
    type: Number,
    default: 0, // 默认选中第一个菜单项
  },
  fixed: {
    type: Boolean,
    default: false, // 是否浮动在顶部
  },
  backgroundOpacity: {
    type: Number,
    default: 1, // 背景透明度，0-1之间
    validator: (value) => value >= 0 && value <= 1,
  },
})

const isMobileMenuOpen = ref(false)
const hoveredIndex = ref(null)

// 使用响应式的 ref 来存储导航配置，确保 Vue 能追踪变化
const projectNavigationConfig = ref(null)

// 监听 window.__PROJECT_NAVIGATION_CONFIG__ 的变化
watch(
  () => window.__PROJECT_NAVIGATION_CONFIG__,
  (newConfig) => {
    projectNavigationConfig.value = newConfig
    console.log('[MainHeader] 导航配置更新:', newConfig)
  },
  { immediate: true, deep: true }
)

// 定期检查 window 对象的变化（作为备用方案）
const checkNavigationConfig = () => {
  const currentConfig = window.__PROJECT_NAVIGATION_CONFIG__
  if (currentConfig !== projectNavigationConfig.value) {
    projectNavigationConfig.value = currentConfig
    console.log('[MainHeader] 检测到导航配置变化:', currentConfig)
  }
}

// 使用 setInterval 定期检查（每 500ms）
let configCheckInterval = null
onMounted(() => {
  // 立即检查一次
  checkNavigationConfig()
  // 定期检查
  configCheckInterval = setInterval(checkNavigationConfig, 500)
})

onBeforeUnmount(() => {
  // 清理定时器
  if (configCheckInterval) {
    clearInterval(configCheckInterval)
    configCheckInterval = null
  }
})

// 计算头部样式（背景色和透明度）
const headerStyle = computed(() => {
  const styles = {}
  
  // 处理背景色和透明度
  if (props.navBackgroundColor) {
    const color = props.navBackgroundColor
    const opacity = props.backgroundOpacity ?? 1
    
    // 如果是 hex 颜色，转换为 rgba
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)
      styles.background = `rgba(${r}, ${g}, ${b}, ${opacity})`
    } else if (color.startsWith('rgb')) {
      // 如果是 rgb 颜色，转换为 rgba
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
      if (rgbMatch) {
        styles.background = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacity})`
      } else {
        styles.background = color
      }
    } else {
      styles.background = color
    }
  }
  
  return styles
})

// 优先从全局项目配置读取导航数据
// 重要：如果项目没有配置导航（navigation_config 为空），应该显示空菜单，而不是默认菜单
const navItems = computed(() => {
  // 1. 如果已经加载了项目配置（projectNavigationConfig.value 不为 undefined）
  //    则必须使用项目配置，即使为空也要显示空菜单
  if (projectNavigationConfig.value !== undefined) {
    // 如果项目有配置导航，使用项目的导航
    if (projectNavigationConfig.value?.menuItems && projectNavigationConfig.value.menuItems.length > 0) {
      return projectNavigationConfig.value.menuItems.map((item) => ({
        label: item.label ?? '未命名',
        href: item.href ?? '#',
        children: item.children || [],
        navigation: item.navigation || { type: 'none' },
      }))
    }
    // 如果项目没有配置导航（null 或空数组），返回空数组
    return []
  }
  
  // 2. 如果还没有加载项目配置（projectNavigationConfig.value === undefined）
  //    在加载完成前，可以暂时使用 props 中的默认 menuItems（仅用于初始渲染）
  return (props.menuItems || []).map((item) => {
    if (typeof item === 'string') {
      return { label: item, href: '#', navigation: { type: 'none' } }
    }
    return {
      label: item.label ?? '未命名',
      href: item.href ?? '#',
      children: item.children || [],
      navigation: item.navigation || { type: 'none' },
    }
  })
})

// MainHeader专用的导航处理函数（在当前页打开）
const handleHeaderNavigation = (navigation, item = null) => {
  if (!navigation || navigation.type === 'none') {
    return
  }

  if (navigation.type === 'url') {
    // 外部链接在新标签页打开
    window.open(navigation.url, '_blank')
    return
  }

  if (navigation.type === 'page') {
    // 页面跳转在当前页打开
    let path = navigation.path || ''

    // 如果 path 不是 runtime 格式（不以 /projects/ 开头），尝试生成 runtime 路径
    if (!path.startsWith('/projects/') && navigation.targetPageCode) {
      // 从当前路由获取 projectCode
      const currentRoute = router.currentRoute.value
      const projectCode = currentRoute.params.projectCode
      
      if (projectCode) {
        // 生成 runtime 路由格式：/projects/{projectCode}/runtime/pages/{pageCode}
        path = `/projects/${projectCode}/runtime/pages/${navigation.targetPageCode}`
      } else {
        console.warn('页面跳转：无法获取 projectCode，使用原始路径', navigation)
      }
    }

    if (!path) {
      console.warn('页面跳转：路径为空', navigation)
      return
    }

    // 处理路径参数（如果有 item 数据）
    if (item && navigation.paramKey) {
      const paramSource = navigation.paramSource || 'id'
      const paramValue = item[paramSource] || item.id
      if (paramValue) {
        path = path.replace(`:${navigation.paramKey}`, paramValue)
      }
    }

    // 处理静态参数
    const query = {}
    if (navigation.params && Object.keys(navigation.params).length > 0) {
      Object.assign(query, navigation.params)
    }
    
    // 在当前页打开
    router.push({ path, query })
  }
}

const handleItemClick = (item, event) => {
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  if (item.navigation && item.navigation.type !== 'none') {
    event.preventDefault()
    event.stopPropagation()
    handleHeaderNavigation(item.navigation, item)
  }
}

const handleSubItemClick = (subItem, event) => {
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  if (subItem.navigation && subItem.navigation.type !== 'none') {
    event.preventDefault()
    event.stopPropagation()
    handleHeaderNavigation(subItem.navigation, subItem)
  }
}
</script>

<style scoped>
.main-header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1000;
  width: 100%;
  transition: background 0.3s ease;
}

.main-header--fixed {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  z-index: 1000 !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* 主导航区域 */
.main-header__main {
  background: transparent;
}

.main-header__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* Logo 和品牌 */
.main-header__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.brand-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(45, 55, 72, 0.2);
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 4px;
  position: relative;
}

.logo-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  border-radius: 2px;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.brand-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.2;
}

.brand-subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.2;
}

/* 搜索框 */
.main-header__search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  max-width: 400px;
}

.search-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #3b82f6;
}

.search-button {
  padding: 0.5rem 1.5rem;
  background: #2d3748;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.search-button:hover {
  background: #4a5568;
}

/* 移动端菜单按钮 */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: #2d3748;
  transition: all 0.3s;
  border-radius: 2px;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* 导航菜单 */
.main-header__nav {
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-list {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover,
.nav-link--active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.nav-link--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #ffd700;
}

.nav-arrow {
  font-size: 0.75rem;
  transition: transform 0.2s;
}

.nav-item:hover .nav-arrow {
  transform: rotate(180deg);
}

/* 下拉子菜单 */
.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s;
  z-index: 1000;
}

.submenu--visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.submenu-item {
  border-bottom: 1px solid #f1f5f9;
}

.submenu-item:last-child {
  border-bottom: none;
}

.submenu-link {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #334155;
  text-decoration: none;
  font-size: 0.9375rem;
  transition: all 0.2s;
}

.submenu-link:hover {
  background: #f8fafc;
  color: #2d3748;
  padding-left: 2rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-header__search {
    display: none;
  }
}

@media (max-width: 768px) {
  .main-header__container {
    padding: 1rem;
  }

  .brand-title {
    font-size: 1.25rem;
  }

  .brand-subtitle {
    font-size: 0.75rem;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .main-header__nav {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
  }

  .main-header__nav.nav--open {
    max-height: 1000px;
  }

  .nav-list {
    flex-direction: column;
    align-items: stretch;
    padding: 0;
  }

  .nav-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-link {
    padding: 1rem;
  }

  .submenu {
    position: static;
    box-shadow: none;
    background: rgba(0, 0, 0, 0.1);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
  }

  .submenu--visible {
    max-height: 500px;
  }

  .submenu-link {
    padding-left: 2rem;
    color: rgba(255, 255, 255, 0.9);
  }

  .submenu-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
}
</style>


