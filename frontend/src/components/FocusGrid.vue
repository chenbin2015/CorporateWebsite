<script setup>
import { toRefs } from 'vue'

import { defaultFocusCards } from '@/data/defaults'

const props = defineProps({
  title: {
    type: String,
    default: 'Highlights',
  },
  items: {
    type: Array,
    default: () => defaultFocusCards,
  },
})

const { title, items } = toRefs(props)
</script>

<template>
  <section class="focus">
    <header class="focus__header">
      <h3>{{ title }}</h3>
    </header>
    <div class="focus__grid">
      <a v-for="item in items" :key="item.title" class="focus__item" :href="item.href">
        <img :src="item.cover" :alt="item.title" class="focus__image" />
        <div class="focus__overlay">
          <h4>{{ item.title }}</h4>
          <p>{{ item.summary }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.focus {
  display: grid;
  gap: 1.6rem;
}

.focus__header h3 {
  margin: 0;
  font-size: 1.6rem;
}

.focus__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.6rem;
}

.focus__item {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  min-height: 16rem;
  display: flex;
  align-items: flex-end;
  color: #ffffff;
}

.focus__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.focus__overlay {
  position: relative;
  z-index: 1;
  padding: 1.8rem;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.85) 100%);
  display: grid;
  gap: 0.6rem;
}

.focus__overlay h4 {
  margin: 0;
  font-size: 1.4rem;
}

.focus__overlay p {
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
}

.focus__item:hover .focus__image {
  transform: scale(1.05);
}

@media (max-width: 64rem) {
  .focus__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 42rem) {
  .focus__grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>

