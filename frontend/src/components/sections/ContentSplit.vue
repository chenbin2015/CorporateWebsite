<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Cultivating whole-person development',
  },
  description: {
    type: String,
    default:
      'We integrate general education, professional practice, and innovation training to nurture talents with a strong sense of responsibility and global vision.',
  },
  bullets: {
    type: Array,
    default: () => [
      'Interdisciplinary curriculum with flexible credit system.',
      'Industry partnerships and co-op programs for experiential learning.',
      'Personalized mentorship and student success centers.',
    ],
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  reversed: {
    type: Boolean,
    default: false,
  },
  actions: {
    type: Array,
    default: () => [{ label: 'Explore programs', href: '#' }],
  },
})

const splitClass = computed(() => ['content-split', props.reversed ? 'content-split--reversed' : ''])
</script>

<template>
  <section :class="splitClass">
    <div class="content-split__media">
      <img :src="props.image" :alt="props.title" loading="lazy" />
    </div>
    <div class="content-split__body">
      <h2>{{ props.title }}</h2>
      <p class="content-split__description">
        {{ props.description }}
      </p>
      <ul class="content-split__bullets">
        <li v-for="item in props.bullets" :key="item">
          {{ item }}
        </li>
      </ul>
      <div class="content-split__actions">
        <a v-for="action in props.actions" :key="action.label" class="content-split__link" :href="action.href">
          {{ action.label }} →
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-split {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2.4rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface-contrast);
  box-shadow: var(--shadow-soft);
}

.content-split--reversed {
  grid-template-columns: 1fr 1.1fr;
}

.content-split__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 18rem;
}

.content-split__body {
  padding: clamp(2rem, 3vw, 3rem);
  display: grid;
  gap: 1rem;
}

.content-split__description {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 1.05rem;
}

.content-split__bullets {
  margin: 0;
  padding-left: 1.4rem;
  display: grid;
  gap: 0.6rem;
  color: var(--color-text-primary);
}

.content-split__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.content-split__link {
  font-weight: 600;
  color: var(--color-primary);
}

@media (max-width: 64rem) {
  .content-split,
  .content-split--reversed {
    grid-template-columns: 1fr;
  }

  .content-split__media img {
    min-height: 16rem;
  }
}
</style>

