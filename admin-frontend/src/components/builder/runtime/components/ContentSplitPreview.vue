<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '内容分割' },
  description: { type: String, default: '左右两栏内容布局展示' },
  bullets: { type: Array, default: () => [] },
  image: { type: String, default: 'https://picsum.photos/seed/split/600/400' },
  reversed: { type: Boolean, default: false },
  actions: { type: Array, default: () => [] },
})

const displayBullets = computed(() => {
  if (props.bullets && props.bullets.length > 0) {
    return props.bullets
  }
  return ['要点一：示例内容', '要点二：示例内容', '要点三：示例内容']
})
</script>

<template>
  <section class="content-split-preview" :class="{ 'content-split-preview--reversed': reversed }">
    <div class="content-split-preview__media">
      <img :src="image" :alt="title" />
    </div>
    <div class="content-split-preview__body">
      <h3>{{ title }}</h3>
      <p class="content-split-preview__description">{{ description }}</p>
      <ul class="content-split-preview__bullets">
        <li v-for="(bullet, index) in displayBullets" :key="index">{{ bullet }}</li>
      </ul>
      <div v-if="actions && actions.length" class="content-split-preview__actions">
        <a v-for="action in actions" :key="action.href" :href="action.href" class="btn-link">
          {{ action.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-split-preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  border-radius: 0.6rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.content-split-preview--reversed {
  direction: rtl;
}

.content-split-preview--reversed > * {
  direction: ltr;
}

.content-split-preview__media {
  overflow: hidden;
}

.content-split-preview__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 200px;
}

.content-split-preview__body {
  padding: 1.5rem;
  display: grid;
  gap: 1rem;
  background: #f8fafc;
}

.content-split-preview__body h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.content-split-preview__description {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
}

.content-split-preview__bullets {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}

.content-split-preview__bullets li {
  font-size: 0.9rem;
  color: #1e293b;
  padding-left: 1.2rem;
  position: relative;
}

.content-split-preview__bullets li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #2563eb;
  font-weight: bold;
}

.content-split-preview__actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.btn-link {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: #fff;
  text-decoration: none;
  border-radius: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-link:hover {
  background: #1d4ed8;
}

@media (max-width: 48rem) {
  .content-split-preview {
    grid-template-columns: 1fr;
  }
}
</style>

