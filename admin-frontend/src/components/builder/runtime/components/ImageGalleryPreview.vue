<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '校园风貌',
  },
  images: {
    type: Array,
    default: () => [
      'https://picsum.photos/seed/gallery1/600/400',
      'https://picsum.photos/seed/gallery2/600/400',
      'https://picsum.photos/seed/gallery3/600/400',
      'https://picsum.photos/seed/gallery4/600/400',
    ],
  },
})
</script>

<template>
  <section class="image-gallery-preview">
    <header>
      <h3>{{ props.title }}</h3>
    </header>
    <div class="image-gallery-preview__grid">
      <img
        v-for="src in props.images"
        :key="src"
        :src="src"
        :alt="props.title"
        loading="lazy"
      />
    </div>
  </section>
</template>

<style scoped>
.image-gallery-preview {
  background: #ffffff;
  border-radius: 0.9rem;
  padding: 1.4rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.image-gallery-preview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: 0.8rem;
  margin-top: 0.8rem;
}

img {
  width: 100%;
  height: 7rem;
  object-fit: cover;
  border-radius: 0.6rem;
}
</style>


