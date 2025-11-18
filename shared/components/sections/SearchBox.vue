<script setup>
import { ref } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入关键词搜索...',
  },
  action: {
    type: String,
    default: '/search',
  },
  method: {
    type: String,
    default: 'get',
  },
})

const searchQuery = ref('')

const handleSubmit = (event) => {
  if (!searchQuery.value.trim()) {
    event.preventDefault()
    return
  }
  // 可以在这里添加搜索逻辑
}
</script>

<template>
  <section class="search-box">
    <form :action="action" :method="method" @submit="handleSubmit">
      <div class="search-input-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholder"
          class="search-input"
          name="q"
        />
        <button type="submit" class="search-button">
          <span>搜索</span>
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.search-box {
  padding: 1.6rem;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 0.5rem);
}

.search-input-wrapper {
  display: flex;
  gap: 0.5rem;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--color-primary, #3b82f6);
}

.search-button {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary, #3b82f6);
  color: #fff;
  border: none;
  border-radius: var(--radius-md, 0.375rem);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.search-button:hover {
  background: var(--color-primary-dark, #2563eb);
}
</style>

