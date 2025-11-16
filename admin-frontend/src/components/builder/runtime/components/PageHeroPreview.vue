<script setup>
const props = defineProps({
  title: { type: String, default: '页面标题' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '页面描述信息' },
  background: { type: String, default: '' },
  actions: { type: Array, default: () => [] },
})
</script>

<template>
  <section class="page-hero-preview" :style="{ background: background || 'linear-gradient(135deg, #0b3a82 0%, #1e5aa8 100%)' }">
    <div class="page-hero-preview__content">
      <p v-if="subtitle" class="page-hero-preview__subtitle">{{ subtitle }}</p>
      <h1 class="page-hero-preview__title">{{ title }}</h1>
      <p v-if="description" class="page-hero-preview__description">{{ description }}</p>
      <div v-if="actions && actions.length" class="page-hero-preview__actions">
        <a v-for="action in actions" :key="action.href" class="btn" :href="action.href">
          {{ action.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-hero-preview {
  border-radius: 0.8rem;
  padding: 3rem 2rem;
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.page-hero-preview__content {
  position: relative;
  z-index: 1;
  max-width: 52rem;
  display: grid;
  gap: 1rem;
}

.page-hero-preview__subtitle {
  font-size: 0.9rem;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  opacity: 0.85;
  margin: 0;
}

.page-hero-preview__title {
  font-size: 2rem;
  margin: 0;
  line-height: 1.2;
}

.page-hero-preview__description {
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
}

.page-hero-preview__actions {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.4rem;
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>

