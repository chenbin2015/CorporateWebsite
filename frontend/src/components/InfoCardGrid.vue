<script setup>
const props = withDefaults(
  defineProps({
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
  }),
  {
    cards: () => [
      {
        title: '默认卡片标题',
        description: '请传入 cards 数组以覆盖默认占位文本。',
        href: '#',
        meta: 'Default meta',
      },
    ],
  },
)

const gridTemplate = `repeat(${props.columns}, minmax(0, 1fr))`
</script>

<template>
  <section class="info-grid space-y-sm">
    <header v-if="props.title" class="info-grid__header">
      <h2>{{ props.title }}</h2>
    </header>
    <div class="info-grid__body" :style="{ gridTemplateColumns: gridTemplate }">
      <a v-for="card in props.cards" :key="card.title" class="info-card" :href="card.href">
        <div class="info-card__meta" v-if="card.meta">{{ card.meta }}</div>
        <h3 class="info-card__title">{{ card.title }}</h3>
        <p class="info-card__description">{{ card.description }}</p>
      </a>
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

