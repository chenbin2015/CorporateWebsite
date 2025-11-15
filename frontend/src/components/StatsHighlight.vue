<script setup>
import { defaultStats } from '@/data/defaults'

const props = withDefaults(
  defineProps({
    items: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Number,
      default: 3,
    },
  }),
  {
    items: () => defaultStats,
  },
)

const gridTemplate = `repeat(${props.columns}, minmax(0, 1fr))`
</script>

<template>
  <section class="stats">
    <div class="stats__grid" :style="{ gridTemplateColumns: gridTemplate }">
      <div v-for="item in props.items" :key="item.label" class="stats__item">
        <span class="stats__value">{{ item.value }}</span>
        <span class="stats__label">{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats__grid {
  display: grid;
  gap: 1.6rem;
}

.stats__item {
  padding: 2rem 1.6rem;
  border-radius: var(--radius-md);
  background: var(--color-surface-contrast);
  text-align: center;
  box-shadow: var(--shadow-soft);
}

.stats__value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.4rem;
}

.stats__label {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
}

@media (max-width: 64rem) {
  .stats__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 42rem) {
  .stats__grid {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
  }
}
</style>

