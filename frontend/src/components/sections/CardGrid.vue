<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Strategic Focus Areas',
  },
  description: {
    type: String,
    default:
      'We accelerate innovation, cultivate talents, and deepen collaboration through these strategic priorities.',
  },
  cards: {
    type: Array,
    default: () => [
      {
        title: 'Interdisciplinary Platforms',
        summary: 'Build cross-college collaboration hubs to respond to complex global challenges.',
        href: '#',
      },
      {
        title: 'Global Partnerships',
        summary: 'Expand exchange programs and joint research centers with world-class universities.',
        href: '#',
      },
      {
        title: 'Innovation & Entrepreneurship',
        summary: 'Support student-led startups and incubators with mentorship and funding.',
        href: '#',
      },
    ],
  },
  columns: {
    type: Number,
    default: 3,
  },
  footerLink: {
    type: Object,
    default: () => ({ label: 'View all initiatives', href: '#' }),
  },
})

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${Math.max(1, props.columns)}, minmax(0, 1fr))`,
}))
</script>

<template>
  <section class="card-grid">
    <header class="card-grid__header">
      <div>
        <h2>{{ props.title }}</h2>
        <p class="card-grid__description">
          {{ props.description }}
        </p>
      </div>
      <a class="card-grid__more" :href="props.footerLink.href">
        {{ props.footerLink.label }} →
      </a>
    </header>

    <div class="card-grid__content" :style="gridStyle">
      <article v-for="card in props.cards" :key="card.title" class="card-grid__item">
        <h3>{{ card.title }}</h3>
        <p>{{ card.summary }}</p>
        <a class="card-grid__link" :href="card.href"> {{ card.cta ?? 'Learn more' }} → </a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.card-grid {
  display: grid;
  gap: 2rem;
}

.card-grid__header {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  align-items: flex-end;
  justify-content: space-between;
}

.card-grid__header h2 {
  margin: 0;
}

.card-grid__description {
  margin: 0.6rem 0 0;
  color: var(--color-text-secondary);
  max-width: 42rem;
}

.card-grid__more {
  font-weight: 600;
  color: var(--color-primary);
}

.card-grid__content {
  display: grid;
  gap: 1.6rem;
}

.card-grid__item {
  border-radius: var(--radius-md);
  border: 0.1rem solid var(--color-border);
  padding: 2rem;
  background: var(--color-surface-contrast);
  display: grid;
  gap: 1rem;
  box-shadow: var(--shadow-soft);
  transition: transform 0.3s ease;
}

.card-grid__item:hover {
  transform: translateY(-0.3rem);
}

.card-grid__item p {
  margin: 0;
  color: var(--color-text-secondary);
}

.card-grid__link {
  font-weight: 600;
  color: var(--color-primary);
}

@media (max-width: 64rem) {
  .card-grid__content {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 42rem) {
  .card-grid__content {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
  }
}
</style>

