<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '信息卡片组' },
  cards: { type: Array, default: () => [] },
  columns: { type: Number, default: 3 },
})

const displayCards = computed(() => {
  if (props.cards && props.cards.length > 0) {
    return props.cards
  }
  return [
    { title: '示例卡片 1', description: '这是第一个示例卡片', meta: '分类', href: '#' },
    { title: '示例卡片 2', description: '这是第二个示例卡片', meta: '分类', href: '#' },
    { title: '示例卡片 3', description: '这是第三个示例卡片', meta: '分类', href: '#' },
  ]
})
</script>

<template>
  <section class="info-card-grid-preview">
    <header v-if="title" class="info-card-grid-preview__header">
      <h3>{{ title }}</h3>
    </header>
    <div class="info-card-grid-preview__body" :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }">
      <div v-for="(card, index) in displayCards" :key="index" class="info-card-preview">
        <div v-if="card.meta" class="info-card-preview__meta">{{ card.meta }}</div>
        <h4 class="info-card-preview__title">{{ card.title }}</h4>
        <p class="info-card-preview__description">{{ card.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.info-card-grid-preview {
  display: grid;
  gap: 1.2rem;
}

.info-card-grid-preview__header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.info-card-grid-preview__body {
  display: grid;
  gap: 1rem;
}

.info-card-preview {
  display: grid;
  gap: 0.6rem;
  padding: 1.2rem;
  border-radius: 0.6rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.info-card-preview__meta {
  font-size: 0.85rem;
  color: #2563eb;
  font-weight: 600;
}

.info-card-preview__title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.info-card-preview__description {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
}
</style>

