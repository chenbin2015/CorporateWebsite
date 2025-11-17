<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Latest News' },
  highlight: {
    type: Object,
    default: () => ({
      title: '默认新闻标题',
      summary: '请在 props 中传入 highlight、items 数据，或绑定远程接口结果。',
      date: '2025-01-01',
      cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    }),
  },
  items: {
    type: Array,
    default: () => [
      { title: '默认新闻条目示例一', date: '01-01', href: '#' },
      { title: '默认新闻条目示例二', date: '01-02', href: '#' },
      { title: '默认新闻条目示例三', date: '01-03', href: '#' },
    ],
  },
})

const displayHighlight = computed(() => {
  if (props.highlight && props.highlight.title) {
    return props.highlight
  }
  return {
    title: '默认新闻标题',
    summary: '请在 props 中传入 highlight、items 数据，或绑定远程接口结果。',
    date: '2025-01-01',
    cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
  }
})

const displayItems = computed(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }
  return [
    { title: '默认新闻条目示例一', date: '01-01', href: '#' },
    { title: '默认新闻条目示例二', date: '01-02', href: '#' },
    { title: '默认新闻条目示例三', date: '01-03', href: '#' },
  ]
})
</script>

<template>
  <section class="news-section-preview">
    <header v-if="title" class="news-section-preview__header">
      <h3>{{ title }}</h3>
      <a class="news-section-preview__more" href="#">更多</a>
    </header>

    <div class="news-section-preview__content">
      <article v-if="displayHighlight" class="news-section-preview__highlight">
        <img
          :src="displayHighlight.cover"
          :alt="displayHighlight.title"
          class="news-section-preview__image"
        />
        <div class="news-section-preview__highlight-text">
          <time class="news-section-preview__date">{{ displayHighlight.date }}</time>
          <h4>{{ displayHighlight.title }}</h4>
          <p>{{ displayHighlight.summary }}</p>
        </div>
      </article>

      <ul class="news-section-preview__list">
        <li v-for="(item, index) in displayItems" :key="index" class="news-item-preview">
          <a :href="item.href || '#'">
            <span class="news-item-preview__title">{{ item.title }}</span>
            <time class="news-item-preview__date">{{ item.date }}</time>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.news-section-preview {
  display: grid;
  gap: 1.2rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.news-section-preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.news-section-preview__header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #1e293b;
}

.news-section-preview__more {
  font-size: 0.9rem;
  color: #2563eb;
  text-decoration: none;
}

.news-section-preview__content {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 1.5rem;
}

.news-section-preview__highlight {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

.news-section-preview__image {
  width: 100%;
  border-radius: 0.4rem;
  object-fit: cover;
  min-height: 10rem;
  background: #f1f5f9;
}

.news-section-preview__highlight-text {
  display: grid;
  gap: 0.6rem;
}

.news-section-preview__highlight h4 {
  margin: 0;
  font-size: 1.2rem;
  color: #1e293b;
  line-height: 1.4;
}

.news-section-preview__highlight p {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
}

.news-section-preview__date {
  font-size: 0.85rem;
  color: #2563eb;
  font-weight: 600;
}

.news-section-preview__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.8rem;
}

.news-item-preview a {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.2rem;
  color: #1e293b;
  text-decoration: none;
  padding: 0.6rem;
  border-radius: 0.4rem;
  transition: background 0.2s;
}

.news-item-preview a:hover {
  background: #f8fafc;
}

.news-item-preview__title {
  flex: 1;
  line-height: 1.5;
  font-size: 0.95rem;
  color: #1e293b;
}

.news-item-preview__date {
  flex-shrink: 0;
  font-size: 0.85rem;
  color: #64748b;
}

@media (max-width: 64rem) {
  .news-section-preview__content {
    grid-template-columns: 1fr;
  }
}
</style>

