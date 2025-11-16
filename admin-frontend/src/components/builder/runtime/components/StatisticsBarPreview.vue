<script setup>
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
</script>

<template>
  <section :class="['statistics-preview', `statistics-preview--${props.variant}`]">
    <article
      v-for="item in props.items"
      :key="item.label"
      class="statistics-preview__item"
    >
      <p class="statistics-preview__value">{{ item.value }}</p>
      <p class="statistics-preview__label">{{ item.label }}</p>
    </article>
  </section>
</template>

<style scoped>
.statistics-preview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 1.4rem;
  padding: 1.6rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.statistics-preview--light {
  background: #f8fafc;
  color: #0f172a;
}

.statistics-preview--dark {
  background: linear-gradient(90deg, #0b3a82 0%, #1e5aa8 100%);
  color: rgba(255, 255, 255, 0.96);
  border-color: transparent;
}

.statistics-preview__item {
  text-align: center;
  display: grid;
  gap: 0.3rem;
}

.statistics-preview__value {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.statistics-preview__label {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>


