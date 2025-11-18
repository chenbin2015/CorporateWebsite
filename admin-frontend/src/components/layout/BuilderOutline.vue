<script setup>
import { computed } from 'vue'
import { Folder, Document } from '@element-plus/icons-vue'

const props = defineProps({
  pageName: {
    type: String,
    default: '未命名页面',
  },
  items: {
    type: Array,
    default: () => [],
  },
  selectedId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['select', 'scroll-to'])

const handleItemClick = (item) => {
  emit('select', item.id)
  emit('scroll-to', item.id)
}

const getComponentLabel = (item) => {
  // 优先使用 label，否则使用 key
  return item.label || item.key || '未命名组件'
}

const getComponentIcon = (item) => {
  // 可以根据组件类型返回不同的图标
  return Document
}
</script>

<template>
  <div class="builder-outline">
    <div class="outline-header">
      <el-icon><Folder /></el-icon>
      <span class="outline-title">页面结构</span>
    </div>
    <div class="outline-content">
      <div class="outline-page">
        <el-icon class="page-icon"><Folder /></el-icon>
        <span class="page-name">{{ pageName }}</span>
      </div>
      <ul class="outline-list">
        <li
          v-for="(item, index) in items"
          :key="item.id || index"
          class="outline-item"
          :class="{ 'outline-item--selected': item.id === selectedId }"
          @click="handleItemClick(item)"
        >
          <el-icon class="item-icon"><Document /></el-icon>
          <span class="item-label">{{ getComponentLabel(item) }}</span>
          <span class="item-index">{{ index + 1 }}</span>
        </li>
      </ul>
      <div v-if="items.length === 0" class="outline-empty">
        <p>暂无组件</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.builder-outline {
  background: var(--color-surface, #fff);
  border-radius: var(--radius-md, 0.5rem);
  border: 1px solid var(--color-border, #e2e8f0);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.outline-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text-primary, #1e293b);
  background: var(--color-surface-contrast, #f8fafc);
}

.outline-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
}

.outline-page {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--color-primary, #3b82f6);
  border-bottom: 1px solid var(--color-border-light, #f1f5f9);
  margin-bottom: 0.5rem;
}

.page-icon {
  font-size: 1.1rem;
  color: var(--color-primary, #3b82f6);
}

.page-name {
  font-size: 0.95rem;
}

.outline-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.outline-item {
  padding: 0.5rem 1rem 0.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 2px solid transparent;
  position: relative;
}

.outline-item:hover {
  background: var(--color-surface-contrast, #f8fafc);
  border-left-color: var(--color-primary-light, #93c5fd);
}

.outline-item--selected {
  background: var(--color-primary-light, rgba(59, 130, 246, 0.1));
  border-left-color: var(--color-primary, #3b82f6);
  font-weight: 500;
}

.item-icon {
  font-size: 0.9rem;
  color: var(--color-text-secondary, #64748b);
  flex-shrink: 0;
}

.outline-item--selected .item-icon {
  color: var(--color-primary, #3b82f6);
}

.item-label {
  flex: 1;
  font-size: 0.875rem;
  color: var(--color-text-primary, #1e293b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.outline-item--selected .item-label {
  color: var(--color-primary, #3b82f6);
}

.item-index {
  font-size: 0.75rem;
  color: var(--color-text-tertiary, #94a3b8);
  background: var(--color-surface-contrast, #f8fafc);
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  flex-shrink: 0;
}

.outline-item--selected .item-index {
  background: var(--color-primary, #3b82f6);
  color: #fff;
}

.outline-empty {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--color-text-secondary, #64748b);
  font-size: 0.875rem;
}

/* 滚动条样式 */
.outline-content::-webkit-scrollbar {
  width: 6px;
}

.outline-content::-webkit-scrollbar-track {
  background: transparent;
}

.outline-content::-webkit-scrollbar-thumb {
  background: var(--color-border, #cbd5e1);
  border-radius: 3px;
}

.outline-content::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary, #94a3b8);
}
</style>

