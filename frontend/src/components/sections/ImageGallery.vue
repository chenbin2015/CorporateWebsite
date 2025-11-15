<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '校园风貌',
  },
  images: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="image-gallery">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <div class="image-gallery__grid">
      <img v-for="src in images" :key="src" :src="src" :alt="title" loading="lazy" />
    </div>
  </section>
</template>

<style scoped>
.image-gallery {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

.image-gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
}

img {
  width: 100%;
  border-radius: var(--radius-md);
  object-fit: cover;
  height: 10rem;
}
</style>

