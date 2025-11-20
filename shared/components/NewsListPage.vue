<script setup>
import { handleDetailPageNavigation } from '@/utils/navigation'
import { isDesignMode } from '@shared/utils/context'

const props = defineProps({
  title: {
    type: String,
    default: '新闻列表',
  },
  items: {
    type: Array,
    default: () => [
      { 
        id: '1',
        title: '默认新闻条目示例一', 
        date: '2025-01-01',
        summary: '这是新闻摘要内容...',
        cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
      },
      { 
        id: '2',
        title: '默认新闻条目示例二', 
        date: '2025-01-02',
        summary: '这是新闻摘要内容...',
        cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
      },
      { 
        id: '3',
        title: '默认新闻条目示例三', 
        date: '2025-01-03',
        summary: '这是新闻摘要内容...',
        cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  layout: {
    type: String,
    default: 'list', // 'list' | 'grid'
    validator: (value) => ['list', 'grid'].includes(value),
  },
  showImage: {
    type: Boolean,
    default: false,
  },
  showSummary: {
    type: Boolean,
    default: true,
  },
  detailPage: {
    type: Object,
    default: () => null,
  },
})

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
    handleDetailPageNavigation(props.detailPage, item)
  }
}
</script>

<template>
  <section class="news-list-page">
    <header v-if="title" class="news-list-page__header">
      <h2>{{ title }}</h2>
    </header>

    <div 
      class="news-list-page__content"
      :class="{
        'news-list-page__content--list': layout === 'list',
        'news-list-page__content--grid': layout === 'grid',
      }"
    >
      <article
        v-for="(item, index) in items"
        :key="item.id || item.title || index"
        class="news-item-card"
        @click="handleItemClick(item, $event)"
        :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : 'cursor: pointer;'"
      >
        <a
          :href="isDesignMode() ? 'javascript:void(0)' : (detailPage ? 'javascript:void(0)' : (item.href || '#'))"
          class="news-item-card__link"
        >
          <div class="news-item-card__content">
            <div class="news-item-card__meta">
              <time class="news-item-card__date">{{ item.date }}</time>
              <span v-if="item.category" class="news-item-card__category">{{ item.category }}</span>
            </div>
            <h3 class="news-item-card__title">{{ item.title }}</h3>
            <p v-if="showSummary && item.summary" class="news-item-card__summary">{{ item.summary }}</p>
          </div>
        </a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.news-list-page {
  width: 100%;
  padding: 2rem 0;
}

.news-list-page__header {
  margin-bottom: 2rem;
}

.news-list-page__header h2 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-primary, #1a202c);
}

/* 列表布局 */
.news-list-page__content--list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.news-list-page__content--list .news-item-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--color-surface-contrast, #fff);
  border-radius: var(--radius-md, 0.5rem);
  box-shadow: var(--shadow-soft, 0 1px 3px rgba(0, 0, 0, 0.1));
  transition: all 0.2s ease;
}

.news-list-page__content--list .news-item-card:hover {
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
  transform: translateY(-2px);
}

.news-list-page__content--list .news-item-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* 网格布局 */
.news-list-page__content--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.news-list-page__content--grid .news-item-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  background: var(--color-surface-contrast, #fff);
  border-radius: var(--radius-md, 0.5rem);
  box-shadow: var(--shadow-soft, 0 1px 3px rgba(0, 0, 0, 0.1));
  overflow: hidden;
  transition: all 0.2s ease;
}

.news-list-page__content--grid .news-item-card:hover {
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
  transform: translateY(-2px);
}

.news-list-page__content--grid .news-item-card__content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* 通用样式 */
.news-item-card__link {
  display: contents;
  color: inherit;
  text-decoration: none;
}

.news-item-card__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary, #718096);
}

.news-item-card__date {
  font-weight: 500;
}

.news-item-card__category {
  padding: 0.25rem 0.75rem;
  background: var(--color-primary-light, #e6f2ff);
  color: var(--color-primary, #2563eb);
  border-radius: var(--radius-sm, 0.25rem);
  font-size: 0.75rem;
}

.news-item-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary, #1a202c);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-item-card__summary {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-secondary, #718096);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式 */
@media (max-width: 768px) {
  .news-list-page__content--grid {
    grid-template-columns: 1fr;
  }
}
</style>

