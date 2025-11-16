<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '卡片网格' },
  description: { type: String, default: '' },
  cards: { type: Array, default: () => [] },
  columns: { type: Number, default: 3 },
  footerLink: { type: Object, default: () => null },
})

const displayCards = computed(() => {
  if (props.cards && props.cards.length > 0) {
    return props.cards
  }
  return [
    { title: '卡片标题 1', summary: '这是第一个卡片的描述内容', href: '#' },
    { title: '卡片标题 2', summary: '这是第二个卡片的描述内容', href: '#' },
    { title: '卡片标题 3', summary: '这是第三个卡片的描述内容', href: '#' },
  ]
})
</script>

<template>
  <section class="card-grid-preview">
    <header class="card-grid-preview__header">
      <h3>{{ title }}</h3>
      <p v-if="description" class="card-grid-preview__description">{{ description }}</p>
    </header>
    <div class="card-grid-preview__body" :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }">
      <div v-for="(card, index) in displayCards" :key="index" class="card-preview">
        <h4 class="card-preview__title">{{ card.title }}</h4>
        <p class="card-preview__summary">{{ card.summary }}</p>
        <a v-if="card.href" :href="card.href" class="card-preview__link">了解更多 →</a>
      </div>
    </div>
    <footer v-if="footerLink" class="card-grid-preview__footer">
      <a :href="footerLink.href" class="footer-link">{{ footerLink.label }}</a>
    </footer>
  </section>
</template>

<style scoped>
.card-grid-preview {
  display: grid;
  gap: 1.5rem;
}

.card-grid-preview__header {
  display: grid;
  gap: 0.5rem;
}

.card-grid-preview__header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.card-grid-preview__description {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
}

.card-grid-preview__body {
  display: grid;
  gap: 1rem;
}

.card-preview {
  padding: 1.2rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.6rem;
  display: grid;
  gap: 0.8rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-preview:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-preview__title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.card-preview__summary {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
}

.card-preview__link {
  font-size: 0.85rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  margin-top: 0.2rem;
}

.card-preview__link:hover {
  text-decoration: underline;
}

.card-grid-preview__footer {
  text-align: center;
}

.footer-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>

