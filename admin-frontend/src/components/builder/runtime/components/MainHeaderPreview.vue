<template>
  <header class="main-header">

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
      <nav class="main-header__nav" :class="{ 'nav--open': isMobileMenuOpen }" :style="{ background: navBackgroundColor }">
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
</template>

<script setup>
import { computed, ref } from 'vue'
import { isDesignMode } from '@shared/utils/context'
import { handleNavigation } from '@/utils/navigation'

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
})

const isMobileMenuOpen = ref(false)
const hoveredIndex = ref(null)

const navItems = computed(() =>
  (props.menuItems || []).map((item) => {
    if (typeof item === 'string') {
      return { label: item, href: '#', navigation: { type: 'none' } }
    }
    return {
      label: item.label ?? '未命名',
      href: item.href ?? '#',
      children: item.children || [],
      navigation: item.navigation || { type: 'none' },
    }
  }),
)

const handleItemClick = (item, event) => {
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  if (item.navigation && item.navigation.type !== 'none') {
    event.preventDefault()
    event.stopPropagation()
    handleNavigation(item.navigation, item)
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
    handleNavigation(subItem.navigation, subItem)
  }
}
</script>

<style scoped>
.main-header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1000;
}


/* 主导航区域 */
.main-header__main {
  background: #fff;
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
  background: #2d3748;
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


