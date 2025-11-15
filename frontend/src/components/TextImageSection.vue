<script setup>
import { defaultTextImage } from '@/data/defaults'

const props = withDefaults(
  defineProps({
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    highlights: {
      type: Array,
      default: () => [],
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  }),
  {
    title: defaultTextImage.title,
    description: defaultTextImage.description,
    image: defaultTextImage.image,
    highlights: () => defaultTextImage.highlights,
  },
)
</script>

<template>
  <section :class="['text-image', { 'text-image--reverse': props.reverse }]">
    <div class="text-image__media">
      <img :src="props.image" :alt="props.title" />
    </div>
    <div class="text-image__content space-y-sm">
      <h2>{{ props.title }}</h2>
      <p>{{ props.description }}</p>
      <ul class="text-image__list">
        <li v-for="item in props.highlights" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.text-image {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.4rem;
  align-items: center;
}

.text-image__media {
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 18rem;
  box-shadow: var(--shadow-soft);
}

.text-image__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-image__content h2 {
  margin: 0;
}

.text-image__content p {
  margin: 0;
}

.text-image__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;
}

.text-image__list li {
  position: relative;
  padding-left: 1.4rem;
}

.text-image__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: var(--color-primary);
}

.text-image--reverse {
  direction: rtl;
}

.text-image--reverse > * {
  direction: ltr;
}

@media (max-width: 64rem) {
  .text-image {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>

