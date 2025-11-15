<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '输入关键字搜索',
  },
})

const emit = defineEmits(['update:modelValue', 'search'])

const selectOption = (value) => {
  emit('update:modelValue', value)
}

const onSubmit = (event) => {
  emit('search', event.target.elements.keyword.value)
}
</script>

<template>
  <form class="filter-bar" @submit.prevent="onSubmit">
    <div class="filter-bar__options">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :class="['filter-bar__chip', { 'filter-bar__chip--active': option.value === modelValue }]"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
    <div class="filter-bar__search">
      <input name="keyword" :placeholder="placeholder" />
      <button type="submit">搜索</button>
    </div>
  </form>
</template>

<style scoped>
.filter-bar {
  display: grid;
  gap: 1rem;
  padding: 1.6rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface-contrast);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
  box-shadow: var(--shadow-soft);
}

.filter-bar__options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.filter-bar__chip {
  border: 0.1rem solid var(--color-border);
  background: transparent;
  border-radius: 999px;
  padding: 0.4rem 1.2rem;
  color: var(--color-text-secondary);
}

.filter-bar__chip--active {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(37, 99, 235, 0.08);
}

.filter-bar__search {
  display: flex;
  gap: 0.8rem;
}

.filter-bar__search input {
  flex: 1;
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
}

.filter-bar__search button {
  border: none;
  border-radius: var(--radius-md);
  padding: 0 1.4rem;
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
}
</style>

