<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
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
  <div class="breadcrumb-header">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <template v-for="(item, index) in items" :key="item.href ?? index">
        <a v-if="item.href" :href="item.href">{{ item.label }}</a>
        <span v-else>{{ item.label }}</span>
        <span v-if="index < items.length - 1" class="breadcrumb__divider">/</span>
      </template>
    </nav>
    <div class="breadcrumb-header__body">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-header {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
  display: grid;
  gap: 0.6rem;
}

.breadcrumb {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

.breadcrumb__divider {
  margin: 0 0.4rem;
  color: var(--color-border);
}

.breadcrumb-header__body h3 {
  margin: 0;
  font-size: 1.6rem;
}

.breadcrumb-header__body p {
  margin: 0.4rem 0 0;
  color: var(--color-text-secondary);
}
</style>

