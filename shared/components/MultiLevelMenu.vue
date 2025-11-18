<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        label: '首页',
        href: '/',
      },
      {
        label: '关于我们',
        href: '#',
        children: [
          { label: '学校简介', href: '#' },
          { label: '历史沿革', href: '#' },
          { label: '领导团队', href: '#' },
        ],
      },
      {
        label: '新闻动态',
        href: '#',
        children: [
          { label: '学校新闻', href: '#' },
          { label: '通知公告', href: '#' },
          { label: '媒体报道', href: '#' },
        ],
      },
    ],
  },
})

const hoveredItem = ref(null)

const handleMouseEnter = (index) => {
  hoveredItem.value = index
}

const handleMouseLeave = () => {
  hoveredItem.value = null
}
</script>

<template>
  <nav class="multi-level-menu">
    <ul class="menu-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="menu-item"
        :class="{ 'has-children': item.children && item.children.length > 0 }"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
      >
        <a :href="item.href" class="menu-link">{{ item.label }}</a>
        <ul
          v-if="item.children && item.children.length > 0"
          class="submenu"
          :class="{ 'submenu--visible': hoveredItem === index }"
        >
          <li v-for="(child, childIndex) in item.children" :key="childIndex" class="submenu-item">
            <a :href="child.href" class="submenu-link">{{ child.label }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.multi-level-menu {
  background: var(--color-surface, #fff);
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 0;
}

.menu-item {
  position: relative;
}

.menu-link {
  display: block;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: var(--color-text, #1e293b);
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.menu-link:hover {
  color: var(--color-primary, #3b82f6);
  border-bottom-color: var(--color-primary, #3b82f6);
}

.menu-item.has-children .menu-link::after {
  content: '▼';
  margin-left: 0.5rem;
  font-size: 0.7rem;
  opacity: 0.6;
}

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-md, 0.375rem);
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s;
  z-index: 1000;
}

.submenu--visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.submenu-item {
  margin: 0;
}

.submenu-link {
  display: block;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: var(--color-text, #1e293b);
  transition: background 0.2s;
}

.submenu-link:hover {
  background: var(--color-surface-contrast, #f8fafc);
  color: var(--color-primary, #3b82f6);
}
</style>

