<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '媒体报道',
  },
  items: {
    type: Array,
    default: () => [
      {
        title: '东南大学在科技创新方面取得重大突破',
        source: '人民日报',
        date: '2024-01-15',
        url: '#',
      },
      {
        title: '东南大学举办国际学术会议',
        source: '新华社',
        date: '2024-01-10',
        url: '#',
      },
    ],
  },
})
</script>

<template>
  <section class="media-links">
    <header v-if="title">
      <h3>{{ title }}</h3>
    </header>
    <ul class="media-list">
      <li v-for="(item, index) in items" :key="index" class="media-item">
        <a :href="item.url" class="media-link" target="_blank" rel="noopener noreferrer">
          <div class="media-content">
            <h4 class="media-title">{{ item.title }}</h4>
            <div class="media-meta">
              <span class="media-source">{{ item.source }}</span>
              <span class="media-date">{{ item.date }}</span>
            </div>
          </div>
          <span class="media-arrow">→</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.media-links {
  padding: 1.6rem;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 0.5rem);
}

header {
  margin-bottom: 1rem;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.media-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;
}

.media-item {
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  padding-bottom: 0.8rem;
}

.media-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.media-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-decoration: none;
  color: var(--color-text, #1e293b);
  transition: all 0.2s;
  padding: 0.5rem;
  border-radius: var(--radius-md, 0.375rem);
}

.media-link:hover {
  background: var(--color-surface-contrast, #f8fafc);
}

.media-content {
  flex: 1;
}

.media-title {
  margin: 0 0 0.4rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
}

.media-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--color-text-secondary, #64748b);
}

.media-source {
  font-weight: 500;
}

.media-arrow {
  font-size: 1.2rem;
  color: var(--color-text-secondary, #64748b);
  transition: transform 0.2s;
}

.media-link:hover .media-arrow {
  transform: translateX(4px);
  color: var(--color-primary, #3b82f6);
}
</style>

