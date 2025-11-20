<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  cards: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Number,
    default: 3,
  },
})

const gridTemplate = `repeat(${props.columns}, minmax(0, 1fr))`
</script>

<template>
  <section class="info-grid space-y-sm">
    <header v-if="props.title" class="info-grid__header">
      <h2>{{ props.title }}</h2>
    </header>
    <div class="info-grid__body" :style="{ gridTemplateColumns: gridTemplate }">
      <template v-if="props.cards && props.cards.length > 0">
        <a v-for="(card, index) in props.cards" :key="card.id || card.title || index" class="info-card" :href="card.href || '#'">
          <div v-if="card.image" class="info-card__image">
            <img :src="card.image" :alt="card.title || '卡片图片'" />
          </div>
          <div class="info-card__meta" v-if="card.meta">{{ card.meta }}</div>
          <h3 class="info-card__title">{{ card.title || '未命名卡片' }}</h3>
          <p class="info-card__description">{{ card.description || '' }}</p>
          <div v-if="card.summary" class="info-card__summary" v-html="card.summary"></div>
        </a>
      </template>
      <div v-else class="info-card-empty">
        <p>暂无卡片数据，请从数据源选择数据项或手动添加卡片</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.info-grid__header h2 {
  margin: 0;
}

.info-grid__body {
  display: grid;
  gap: 1.6rem;
}

.info-card {
  display: grid;
  gap: 0.8rem;
  padding: 1.8rem;
  border-radius: var(--radius-md);
  background: var(--color-surface-contrast);
  border: 0.1rem solid rgba(37, 99, 235, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: var(--color-text-primary);
  text-decoration: none;
}

.info-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--color-fill-light, #f5f7fa);
}

.info-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.info-card:hover {
  transform: translateY(-0.4rem);
  box-shadow: var(--shadow-soft);
}

.info-card__meta {
  font-size: 0.95rem;
  color: var(--color-primary);
  font-weight: 600;
}

.info-card__title {
  margin: 0;
  font-size: 1.4rem;
}

.info-card__description {
  margin: 0;
  color: var(--color-text-secondary);
}

.info-card__summary {
  margin-top: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.info-card__summary :deep(p) {
  margin: 0.5rem 0;
}

.info-card__summary :deep(p:first-child) {
  margin-top: 0;
}

.info-card__summary :deep(p:last-child) {
  margin-bottom: 0;
}

.info-card-empty {
  grid-column: 1 / -1;
  padding: 2rem;
  text-align: center;
  color: var(--color-text-secondary);
  background: var(--color-surface-contrast);
  border: 1px dashed var(--el-border-color);
  border-radius: var(--radius-md);
}

@media (max-width: 64rem) {
  .info-grid__body {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 42rem) {
  .info-grid__body {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
  }
}
</style>

