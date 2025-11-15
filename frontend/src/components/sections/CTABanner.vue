<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      action: { label: '了解更多', href: '#' },
      image: '',
    }),
  },
})
</script>

<template>
  <section class="cta-banner">
    <div class="cta-banner__content">
      <h3>{{ data.title }}</h3>
      <p>{{ data.description }}</p>
      <a class="btn" :href="data.action.href">{{ data.action.label }}</a>
    </div>
    <img v-if="data.image" :src="data.image" :alt="data.title" loading="lazy" />
  </section>
</template>

<style scoped>
.cta-banner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.6rem;
  align-items: center;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, #0b3a82, #2f6ed8);
  color: #ffffff;
  box-shadow: var(--shadow-soft);
}

.cta-banner__content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.8rem;
}

.cta-banner__content p {
  margin: 0 0 1rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.cta-banner img {
  width: 100%;
  border-radius: var(--radius-lg);
  object-fit: cover;
  min-height: 12rem;
}
</style>

