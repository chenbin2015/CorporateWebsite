<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  note: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="demo-panel">
    <header v-if="title || description" class="demo-panel__header">
      <h3 v-if="title">{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
    </header>
    <div class="demo-panel__body">
      <slot />
    </div>
    <footer v-if="note" class="demo-panel__note">
      {{ note }}
    </footer>
  </section>
</template>

<style scoped>
.demo-panel {
  display: grid;
  gap: 1.2rem;
  padding: 1.8rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface-contrast);
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

.demo-panel__header {
  display: grid;
  gap: 0.4rem;
}

.demo-panel__header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.demo-panel__header p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.demo-panel__body {
  display: grid;
  gap: 1rem;
}

.demo-panel__note {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  opacity: 0.8;
}
</style>

