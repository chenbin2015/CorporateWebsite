<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '资料下载',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="download-list">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <ul>
      <li v-for="item in items" :key="item.name">
        <div>
          <p>{{ item.name }}</p>
          <small>{{ item.size }}</small>
        </div>
        <a :href="item.href">下载</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.download-list {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.8rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius-md);
}

p {
  margin: 0;
}

small {
  color: var(--color-text-secondary);
}
</style>

