<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '默认页面标题',
  },
  subtitle: {
    type: String,
    default: 'Default subtitle',
  },
  description: {
    type: String,
    default: '组件缺少 props 时的占位文本，用于设计稿验收。',
  },
  background: {
    type: String,
    default:
      'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 100%), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80)',
  },
  actions: {
    type: Array,
    default: () => [],
  },
})

const style = computed(() => ({
  background:
    props.background ||
    'linear-gradient(135deg, #0b3a82 0%, #1e5aa8 100%)',
}))
</script>

<template>
  <section class="page-hero" :style="style">
    <div class="page-hero__content">
      <p v-if="props.subtitle" class="page-hero__subtitle">{{ props.subtitle }}</p>
      <h1 class="page-hero__title">{{ props.title }}</h1>
      <p v-if="props.description" class="page-hero__description">
        {{ props.description }}
      </p>
      <div v-if="props.actions.length" class="page-hero__actions">
        <a
          v-for="action in props.actions"
          :key="action.href"
          class="btn"
          :href="action.href"
          :target="action.newTab ? '_blank' : '_self'"
          rel="noopener"
        >
          {{ action.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  border-radius: var(--radius-lg);
  padding: 4rem 3.2rem;
  color: #ffffff;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.page-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.45) 100%);
}

.page-hero__content {
  position: relative;
  z-index: 1;
  max-width: 52rem;
  display: grid;
  gap: 1.2rem;
}

.page-hero__subtitle {
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  opacity: 0.85;
}

.page-hero__title {
  font-size: 2.8rem;
  margin: 0;
  line-height: 1.1;
}

.page-hero__description {
  margin: 0;
  font-size: 1.2rem;
  max-width: 48rem;
}

.page-hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 48rem) {
  .page-hero {
    padding: 3rem 1.8rem;
  }

  .page-hero__title {
    font-size: 2.2rem;
  }
}
</style>

