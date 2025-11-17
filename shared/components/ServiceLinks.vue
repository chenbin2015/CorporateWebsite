<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Key Services',
  },
  items: {
    type: Array,
    default: () => [
      { title: '默认服务入口', subtitle: '示例说明', icon: '📌', href: '#' },
      { title: '信息发布', subtitle: 'Info Center', icon: '🗞️', href: '#' },
    ],
  },
})

const { title, items } = toRefs(props)
</script>

<template>
  <section class="services">
    <header class="services__header">
      <h3>{{ title }}</h3>
    </header>
    <div class="services__grid">
      <a v-for="item in items" :key="item.title" class="services__item" :href="item.href">
        <span class="services__icon" aria-hidden="true">{{ item.icon }}</span>
        <div class="services__content">
          <span class="services__title">{{ item.title }}</span>
          <span class="services__subtitle">{{ item.subtitle }}</span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  padding: 2rem;
  display: grid;
  gap: 1.6rem;
}

.services__header h3 {
  margin: 0;
  font-size: 1.6rem;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.6rem;
}

.services__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.6rem;
  text-align: center;
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.services__item:hover {
  transform: translateY(-0.4rem);
  border-color: rgba(37, 99, 235, 0.4);
  box-shadow: var(--shadow-soft);
}

.services__icon {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--color-primary-muted);
  font-size: 1.4rem;
}

.services__title {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.services__subtitle {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

@media (max-width: 64rem) {
  .services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 42rem) {
  .services__grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>