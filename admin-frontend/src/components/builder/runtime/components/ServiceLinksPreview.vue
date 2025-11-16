<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '服务入口' },
  items: { type: Array, default: () => [] },
})

const displayItems = computed(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }
  return [
    { title: '在线服务', subtitle: 'Online Services', icon: '🌐', href: '#' },
    { title: '学生门户', subtitle: 'Student Portal', icon: '👨‍🎓', href: '#' },
    { title: '教职工', subtitle: 'Faculty', icon: '👨‍🏫', href: '#' },
    { title: '图书馆', subtitle: 'Library', icon: '📚', href: '#' },
  ]
})
</script>

<template>
  <section class="service-links-preview">
    <header v-if="title" class="service-links-preview__header">
      <h3>{{ title }}</h3>
    </header>
    <div class="service-links-preview__grid">
      <div v-for="(item, index) in displayItems" :key="index" class="service-link-preview">
        <span class="service-link-preview__icon">{{ item.icon }}</span>
        <div class="service-link-preview__content">
          <span class="service-link-preview__title">{{ item.title }}</span>
          <span class="service-link-preview__subtitle">{{ item.subtitle }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-links-preview {
  display: grid;
  gap: 1rem;
}

.service-links-preview__header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.service-links-preview__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
}

.service-link-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem;
  text-align: center;
  border: 1px solid #e2e8f0;
  border-radius: 0.6rem;
  background: #f8fafc;
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-link-preview:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-link-preview__icon {
  font-size: 2rem;
  line-height: 1;
}

.service-link-preview__content {
  display: grid;
  gap: 0.2rem;
}

.service-link-preview__title {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
}

.service-link-preview__subtitle {
  font-size: 0.8rem;
  color: #64748b;
}
</style>

