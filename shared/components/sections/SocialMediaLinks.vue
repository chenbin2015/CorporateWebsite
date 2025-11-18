<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '关注我们',
  },
  items: {
    type: Array,
    default: () => [
      { name: '微信', icon: 'wechat', url: '#', qrCode: '' },
      { name: '微博', icon: 'weibo', url: '#' },
      { name: '抖音', icon: 'douyin', url: '#' },
    ],
  },
})
</script>

<template>
  <section class="social-media-links">
    <header v-if="title">
      <h3>{{ title }}</h3>
    </header>
    <div class="social-links">
      <a
        v-for="item in items"
        :key="item.name"
        :href="item.url"
        :title="item.name"
        class="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="social-icon">{{ item.icon }}</span>
        <span class="social-name">{{ item.name }}</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.social-media-links {
  padding: 1.6rem;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 0.5rem);
}

header {
  margin-bottom: 1rem;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  text-decoration: none;
  color: var(--color-text, #1e293b);
  transition: all 0.2s;
}

.social-link:hover {
  border-color: var(--color-primary, #3b82f6);
  background: var(--color-primary-light, rgba(59, 130, 246, 0.1));
  color: var(--color-primary, #3b82f6);
}

.social-icon {
  font-size: 1.2rem;
}

.social-name {
  font-size: 0.9rem;
}
</style>

