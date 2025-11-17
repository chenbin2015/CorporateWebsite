<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: '企业门户',
  },
  subtitle: {
    type: String,
    default: '智慧校园 · 数字化管理平台',
  },
  // 首选数组对象形式：[{ label, href }]
  // 兼容老的字符串数组：['关于学校', ...]
  menuItems: {
    type: Array,
    default: () => [
      { label: '关于学校', href: '/about' },
      { label: '院系设置', href: '/colleges' },
      { label: '师资队伍', href: '/faculty' },
      { label: '教育教学', href: '/education' },
      { label: '科学研究', href: '/research' },
      { label: '招生就业', href: '/admissions' },
      { label: '图书馆', href: '/library' },
    ],
  },
})

const navItems = computed(() =>
  (props.menuItems || []).map((item) => {
    if (typeof item === 'string') {
      return { label: item, href: '#' }
    }
    return {
      label: item.label ?? '未命名',
      href: item.href ?? '#',
    }
  }),
)
</script>

<template>
  <header class="header-preview">
    <div class="header-preview__brand">
      <div class="logo-dot" />
      <div class="brand-text">
        <span class="brand-text__title">{{ title }}</span>
        <span class="brand-text__subtitle">{{ subtitle }}</span>
      </div>
    </div>
    <nav class="header-preview__nav">
      <a
        v-for="(item, index) in navItems"
        :key="item.label + index"
        :href="item.href || '#'"
        class="nav-item"
        :class="{ 'nav-item--active': index === 0 }"
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>

<style scoped>
.header-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #0b3a82 0%, #1e5aa8 100%);
  color: #fff;
}

.header-preview__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-dot {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #bfdbfe, #2563eb);
  box-shadow: 0 0 0 3px rgba(191, 219, 254, 0.35);
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.brand-text__title {
  font-size: 0.98rem;
  font-weight: 600;
}

.brand-text__subtitle {
  font-size: 0.78rem;
  opacity: 0.85;
}

.header-preview__nav {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.nav-item {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  transition: background 0.2s, color 0.2s;
}

.nav-item--active {
  background: rgba(15, 23, 42, 0.2);
  color: #fff;
  font-weight: 600;
}

.nav-item:hover {
  background: rgba(15, 23, 42, 0.15);
}

@media (max-width: 42rem) {
  .header-preview {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }

  .header-preview__nav {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>


