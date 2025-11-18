<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => ['学生', '教职工', '访客', '服务大厅', '联系我们', '统一门户'],
  },
  localeCn: {
    type: String,
    default: '中文',
  },
  localeEn: {
    type: String,
    default: 'EN',
  },
})
</script>

<template>
  <section class="top-links-preview">
    <nav class="top-links-preview__nav">
      <a v-for="item in links" :key="item" href="#" class="top-links-preview__item">
        {{ item }}
      </a>
    </nav>
    <div class="top-links-preview__actions">
      <button type="button" class="top-links-preview__action">
        {{ localeCn }}
      </button>
      <span class="divider" aria-hidden="true">/</span>
      <button type="button" class="top-links-preview__action">
        {{ localeEn }}
      </button>
      <button type="button" class="top-links-preview__search">
        <span class="top-links-preview__search-icon" aria-hidden="true">🔍</span>
        <span class="top-links-preview__search-text">搜索</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.top-links-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  background: var(--color-surface-contrast);
  border-radius: 0.6rem;
  border: 1px solid var(--color-border);
}

.top-links-preview__nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.top-links-preview__item {
  color: var(--color-text-secondary);
  text-decoration: none;
}

.top-links-preview__item:hover {
  color: var(--color-primary);
}

.top-links-preview__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.top-links-preview__action {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.top-links-preview__action:hover {
  color: var(--color-primary);
}

.top-links-preview__search {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  background-color: #ffffff;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.top-links-preview__search:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.top-links-preview__search-icon {
  line-height: 1;
}

.divider {
  color: var(--color-border);
}
</style>








