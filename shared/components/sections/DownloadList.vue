<script setup>
import { Document } from '@element-plus/icons-vue'

const props = defineProps({
  title: {
    type: String,
    default: '资料下载',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="download-list">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <ul>
      <li v-for="item in items" :key="item.name || item.id">
        <div class="download-item__content">
          <div v-if="item.image || item.icon" class="download-item__image">
            <img v-if="item.image" :src="item.image" :alt="item.name || '下载文件'" />
            <div v-else-if="item.icon" class="download-item__icon">
              <el-icon :size="24"><Document /></el-icon>
            </div>
          </div>
          <div class="download-item__info">
            <p>{{ item.name }}</p>
            <small v-if="item.size">{{ item.size }}</small>
            <small v-if="item.description" class="download-item__description">{{ item.description }}</small>
          </div>
        </div>
        <a :href="item.href || '#'" class="download-item__link">下载</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.download-list {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.8rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius-md);
  gap: 1rem;
}

.download-item__content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.download-item__image {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-fill-light, #f5f7fa);
  display: flex;
  align-items: center;
  justify-content: center;
}

.download-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.download-item__icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
}

.download-item__info {
  flex: 1;
  min-width: 0;
}

.download-item__info p {
  margin: 0;
  font-weight: 500;
}

.download-item__info small {
  display: block;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.download-item__description {
  display: block;
  margin-top: 0.25rem;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  line-height: 1.4;
}

.download-item__link {
  padding: 0.5rem 1rem;
  background: var(--el-color-primary);
  color: #fff;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.download-item__link:hover {
  background: var(--el-color-primary-dark-2);
}
</style>

