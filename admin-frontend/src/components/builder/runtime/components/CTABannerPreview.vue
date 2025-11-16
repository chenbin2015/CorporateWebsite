<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="cta">
    <div>
      <p class="eyebrow">CTABanner</p>
      <h3>{{ props.title }}</h3>
      <p>{{ props.description }}</p>
    </div>
    <button type="button">{{ props.buttonText }}</button>
  </section>
</template>

<style scoped>
.cta {
  border-radius: 1rem;
  padding: 1.4rem;
  background: linear-gradient(120deg, #f97316, #ea580c);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  font-size: 0.7rem;
  opacity: 0.7;
}

h3 {
  margin: 0.2rem 0;
}

p {
  margin: 0;
}

button {
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.4rem;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.35);
}
</style>

