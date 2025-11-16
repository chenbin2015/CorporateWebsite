<script setup>
const props = defineProps({
  headline: {
    type: String,
    default: '',
  },
  subline: {
    type: String,
    default: '',
  },
  accent: {
    type: String,
    default: '#2563eb',
  },
})
</script>

<template>
  <section class="hero">
    <span class="hero__tag">HeroCarousel</span>
    <h3>{{ props.headline }}</h3>
    <p>{{ props.subline }}</p>
    <div class="hero__actions">
      <button type="button">了解更多</button>
      <button type="button" class="secondary">立即申请</button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  border-radius: 1.2rem;
  padding: 1.8rem;
  background: linear-gradient(135deg, v-bind('props.accent'), #1e3a8a);
  color: #fff;
  display: grid;
  gap: 0.8rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.hero__tag {
  font-size: 0.75rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  opacity: 0.7;
}

.hero__actions {
  display: flex;
  gap: 0.6rem;
}

button {
  border: none;
  border-radius: 999px;
  padding: 0.4rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.95);
  color: #0f172a;
}

.secondary {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.45);
}
</style>

