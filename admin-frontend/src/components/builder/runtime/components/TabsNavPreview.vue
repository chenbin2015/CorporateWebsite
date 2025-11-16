<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { label: '概览', value: 'overview' },
      { label: '数据', value: 'data' },
      { label: '设置', value: 'settings' },
    ],
  },
  modelValue: {
    type: String,
    default: 'overview',
  },
})
</script>

<template>
  <div class="tabs-nav-preview">
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      :class="['tabs-nav-preview__item', { 'tabs-nav-preview__item--active': item.value === modelValue }]"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs-nav-preview {
  display: inline-flex;
  gap: 0.6rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: var(--color-surface-contrast);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.45);
}

.tabs-nav-preview__item {
  border: none;
  background: transparent;
  padding: 0.35rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  cursor: default;
}

.tabs-nav-preview__item--active {
  background: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 0.25rem 0.8rem rgba(37, 99, 235, 0.35);
}
</style>


