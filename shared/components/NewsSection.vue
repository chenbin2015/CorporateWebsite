<script setup>
import { toRefs } from 'vue'
import { handleDetailPageNavigation } from '@/utils/navigation'
import { isDesignMode } from '@shared/utils/context'

const props = defineProps({
  title: {
    type: String,
    default: 'Latest News',
  },
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
      { title: '默认新闻条目示例一', date: '01-01', href: '#', id: '1' },
      { title: '默认新闻条目示例二', date: '01-02', href: '#', id: '2' },
      { title: '默认新闻条目示例三', date: '01-03', href: '#', id: '3' },
    ],
  },
  moreText: {
    type: String,
    default: '更多',
  },
  detailPage: {
    type: Object,
    default: () => null,
  },
})

const { title, highlight, items } = toRefs(props)

const handleItemClick = (item, event) => {
  // 设计态中禁用交互
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  if (props.detailPage) {
    event.preventDefault()
    event.stopPropagation()
    console.log('NewsSection item click:', { detailPage: props.detailPage, item })
    handleDetailPageNavigation(props.detailPage, item)
  }
}

const handleHighlightClick = (event) => {
  // 设计态中禁用交互
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  if (props.detailPage && props.highlight) {
    event.preventDefault()
    event.stopPropagation()
    console.log('NewsSection highlight click:', { detailPage: props.detailPage, highlight: props.highlight })
    // 确保 highlight 有 id
    const highlightWithId = { ...props.highlight, id: props.highlight.id || '1' }
    handleDetailPageNavigation(props.detailPage, highlightWithId)
  }
}
</script>

<template>
  <section class="news-section">
    <header class="news-section__header">
      <h3>{{ title }}</h3>
      <a class="news-section__more" href="#">{{ moreText }}</a>
    </header>

    <div class="news-section__content">
      <article 
        v-if="highlight" 
        class="news-section__highlight" 
        @click="handleHighlightClick"
        :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : ''"
      >
        <a 
          :href="isDesignMode() ? 'javascript:void(0)' : (detailPage ? 'javascript:void(0)' : '#')" 
          style="display: contents"
        >
          <img :src="highlight.cover" :alt="highlight.title" class="news-section__image" />
          <div class="news-section__highlight-text">
            <time class="news-section__date">{{ highlight.date }}</time>
            <h4>{{ highlight.title }}</h4>
            <p>{{ highlight.summary }}</p>
          </div>
        </a>
      </article>

      <ul class="news-section__list">
        <li v-for="(item, index) in items" :key="item.title || item.id || index" class="news-item">
          <a 
            :href="isDesignMode() ? 'javascript:void(0)' : (detailPage ? 'javascript:void(0)' : (item.href || '#'))" 
            @click="(e) => handleItemClick(item, e)"
            :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : 'cursor: pointer;'"
          >
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
  cursor: pointer;
}

.news-section__highlight:hover {
  opacity: 0.9;
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

