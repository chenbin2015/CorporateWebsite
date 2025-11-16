<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '公告列表' },
  items: { type: Array, default: () => [] },
})

const displayItems = computed(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }
  return [
    { title: '系统维护通知', date: '2025-11-16', category: '通知' },
    { title: '新功能上线', date: '2025-11-15', category: '更新' },
    { title: '重要公告', date: '2025-11-14', category: '公告' },
  ]
})
</script>

<template>
  <section class="notice-list-preview">
    <header v-if="title" class="notice-list-preview__header">
      <h3>{{ title }}</h3>
    </header>
    <ul class="notice-list-preview__list">
      <li v-for="(item, index) in displayItems" :key="index" class="notice-item-preview">
        <div class="notice-item-preview__content">
          <span class="notice-item-preview__category">{{ item.category }}</span>
          <span class="notice-item-preview__title">{{ item.title }}</span>
        </div>
        <span class="notice-item-preview__date">{{ item.date }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.notice-list-preview {
  display: grid;
  gap: 1rem;
}

.notice-list-preview__header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.notice-list-preview__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;
}

.notice-item-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  transition: background 0.2s;
}

.notice-item-preview:hover {
  background: #f1f5f9;
}

.notice-item-preview__content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.notice-item-preview__category {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  background: #2563eb;
  color: #fff;
  border-radius: 0.25rem;
  font-weight: 600;
}

.notice-item-preview__title {
  font-size: 0.9rem;
  color: #1e293b;
  font-weight: 500;
}

.notice-item-preview__date {
  font-size: 0.85rem;
  color: #64748b;
}
</style>

