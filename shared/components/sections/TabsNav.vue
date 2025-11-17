<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const onSelect = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="tabs-nav">
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      :class="['tabs-nav__item', { 'tabs-nav__item--active': item.value === modelValue }]"
      @click="onSelect(item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs-nav {
  display: inline-flex;
  gap: 0.8rem;
  padding: 0.4rem;
  border-radius: 999px;
  background: var(--color-surface-contrast);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.4);
}

.tabs-nav__item {
  border: none;
  background: transparent;
  padding: 0.4rem 1.4rem;
  border-radius: 999px;
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.tabs-nav__item--active {
  background: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 0.3rem 1rem rgba(37, 99, 235, 0.3);
}
</style>

