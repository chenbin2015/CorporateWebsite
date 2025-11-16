<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { label: '首页', href: '#' },
      { label: '学院概况', href: '#' },
      { label: '智能校园平台' },
    ],
  },
  title: {
    type: String,
    default: '智能校园平台',
  },
  description: {
    type: String,
    default: '整合教学、科研与管理的一体化门户。',
  },
})
</script>

<template>
  <section class="breadcrumb-header-preview">
    <nav class="breadcrumb-preview" aria-label="Breadcrumb">
      <template v-for="(item, index) in items" :key="item.href ?? index">
        <a v-if="item.href" href="#" class="breadcrumb-preview__link">
          {{ item.label }}
        </a>
        <span v-else class="breadcrumb-preview__current">
          {{ item.label }}
        </span>
        <span v-if="index < items.length - 1" class="breadcrumb-preview__divider">/</span>
      </template>
    </nav>
    <div class="breadcrumb-header-preview__body">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<style scoped>
.breadcrumb-header-preview {
  background: var(--color-surface-contrast);
  border-radius: 0.9rem;
  padding: 1.4rem 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: grid;
  gap: 0.5rem;
}

.breadcrumb-preview {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.breadcrumb-preview__link {
  color: var(--color-text-secondary);
  text-decoration: none;
}

.breadcrumb-preview__link:hover {
  text-decoration: underline;
}

.breadcrumb-preview__current {
  color: var(--color-text-primary);
  font-weight: 500;
}

.breadcrumb-preview__divider {
  margin: 0 0.35rem;
  color: var(--color-border);
}

.breadcrumb-header-preview__body h3 {
  margin: 0;
  font-size: 1.4rem;
}

.breadcrumb-header-preview__body p {
  margin: 0.4rem 0 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}
</style>


