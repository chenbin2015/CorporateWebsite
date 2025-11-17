<script setup>
import { computed } from 'vue'

// 支持两种 props 格式：
// 1. { data: { title, description, action: { label, href }, image } } - 前端格式
// 2. { title, description, buttonText } - Builder 格式
const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
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
    default: '了解更多',
  },
  href: {
    type: String,
    default: '#',
  },
  image: {
    type: String,
    default: '',
  },
})

// 统一数据格式
const ctaData = computed(() => {
  if (props.data) {
    // 前端格式
    return props.data
  }
  // Builder 格式，转换为前端格式
  return {
    title: props.title,
    description: props.description,
    action: {
      label: props.buttonText,
      href: props.href,
    },
    image: props.image,
  }
})
</script>

<template>
  <section class="cta-banner">
    <div class="cta-banner__content">
      <h3>{{ ctaData.title }}</h3>
      <p>{{ ctaData.description }}</p>
      <a class="btn" :href="ctaData.action.href">{{ ctaData.action.label }}</a>
    </div>
    <img v-if="ctaData.image" :src="ctaData.image" :alt="ctaData.title" loading="lazy" />
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

