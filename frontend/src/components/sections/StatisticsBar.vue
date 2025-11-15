<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { value: '120+', label: 'Years of history' },
      { value: '35k+', label: 'Students enrolled' },
      { value: '98%', label: 'Graduate employment rate' },
    ],
  },
  variant: {
    type: String,
    default: 'light',
  },
})

const stripClass = computed(() => [`statistics`, `statistics--${props.variant}`])
</script>

<template>
  <section :class="stripClass">
    <article v-for="item in props.items" :key="item.label" class="statistics__item">
      <p class="statistics__value">{{ item.value }}</p>
      <p class="statistics__label">{{ item.label }}</p>
    </article>
  </section>
</template>

<style scoped>
.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 2rem;
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

.statistics--light {
  background: var(--color-surface-contrast);
  color: var(--color-text-primary);
}

.statistics--dark {
  background: linear-gradient(90deg, #0b3a82 0%, #1e5aa8 100%);
  color: rgba(255, 255, 255, 0.95);
  border-color: transparent;
}

.statistics__item {
  display: grid;
  gap: 0.4rem;
  text-align: center;
}

.statistics__value {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
}

.statistics__label {
  margin: 0;
  font-size: 1rem;
  color: inherit;
  opacity: 0.7;
}
</style>

