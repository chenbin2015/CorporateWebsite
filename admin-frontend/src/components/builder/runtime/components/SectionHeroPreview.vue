<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="section-hero">
    <span class="tag">{{ props.tag }}</span>
    <h3>{{ props.title }}</h3>
    <p>{{ props.description }}</p>
  </section>
</template>

<style scoped>
.section-hero {
  border-radius: 1rem;
  padding: 1.5rem;
  background: #0f172a;
  color: #e2e8f0;
  box-shadow: 0 0.8rem 1.6rem rgba(2, 6, 23, 0.35);
  display: grid;
  gap: 0.6rem;
}

.tag {
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
}

h3 {
  margin: 0;
  font-size: 1.6rem;
}

p {
  margin: 0;
  color: rgba(226, 232, 240, 0.85);
}
</style>

