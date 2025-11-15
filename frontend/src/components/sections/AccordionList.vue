<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '常见问题',
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const activeIndex = ref(0)

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>

<template>
  <section class="accordion">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <div class="accordion__list">
      <article v-for="(item, index) in items" :key="item.question">
        <button type="button" @click="toggle(index)" :aria-expanded="activeIndex === index">
          {{ item.question }}
          <span>{{ activeIndex === index ? '-' : '+' }}</span>
        </button>
        <p v-if="activeIndex === index">
          {{ item.answer }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.accordion {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
  display: grid;
  gap: 1.2rem;
}

.accordion__list {
  display: grid;
  gap: 0.8rem;
}

article {
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius-md);
}

button {
  width: 100%;
  background: none;
  border: none;
  padding: 0.9rem 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
}

p {
  margin: 0;
  padding: 0 1rem 1rem;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}
</style>

