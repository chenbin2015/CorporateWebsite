<script setup>
import { toRefs } from 'vue'

import { defaultNewsHighlight, defaultNewsItems } from '@/data/defaults'

const props = defineProps({
  title: {
    type: String,
    default: 'Latest News',
  },
  highlight: {
    type: Object,
    default: () => ({ ...defaultNewsHighlight }),
  },
  items: {
    type: Array,
    default: () => [...defaultNewsItems],
  },
})

const { title, highlight, items } = toRefs(props)
</script>

<template>
  <section class="news-section">
    <header class="news-section__header">
      <h3>{{ title }}</h3>
      <a class="news-section__more" href="#">{{ $t('home.more') }}</a>
    </header>

    <div class="news-section__content">
      <article v-if="highlight" class="news-section__highlight">
        <img :src="highlight.cover" :alt="highlight.title" class="news-section__image" />
        <div class="news-section__highlight-text">
          <time class="news-section__date">{{ highlight.date }}</time>
          <h4>{{ highlight.title }}</h4>
          <p>{{ highlight.summary }}</p>
        </div>
      </article>

      <ul class="news-section__list">
        <li v-for="item in items" :key="item.title" class="news-item">
          <a :href="item.href">
            <span class="news-item__title">{{ item.title }}</span>
            <time class="news-item__date">{{ item.date }}</time>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  display: grid;
  gap: 1.6rem;
  background: var(--color-surface-contrast);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  padding: 2rem;
}

.news-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.news-section__header h3 {
  margin: 0;
  font-size: 1.6rem;
}

.news-section__more {
  font-size: 1rem;
  color: var(--color-primary);
}

.news-section__content {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 2rem;
}

.news-section__highlight {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.2rem;
}

.news-section__image {
  width: 100%;
  border-radius: var(--radius-sm);
  object-fit: cover;
  min-height: 12rem;
}

.news-section__highlight h4 {
  margin: 0 0 0.8rem;
  font-size: 1.4rem;
}

.news-section__highlight p {
  margin: 0;
  color: var(--color-text-secondary);
}

.news-section__date {
  font-size: 0.95rem;
  color: var(--color-primary);
  font-weight: 600;
}

.news-section__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1rem;
}

.news-item a {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.6rem;
  color: var(--color-text-primary);
}

.news-item__title {
  flex: 1;
  line-height: 1.5;
  font-size: 1.1rem;
}

.news-item__date {
  flex-shrink: 0;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

@media (max-width: 64rem) {
  .news-section__content {
    grid-template-columns: 1fr;
  }
}
</style>

