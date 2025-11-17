<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '校友心声',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="testimonial">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <div class="testimonial__list">
      <article v-for="item in items" :key="item.author">
        <p class="testimonial__quote">“{{ item.quote }}”</p>
        <p class="testimonial__author">{{ item.author }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.testimonial {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

.testimonial__list {
  display: grid;
  gap: 1rem;
}

article {
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 0.1rem solid var(--color-border);
  background: rgba(15, 23, 42, 0.02);
}

.testimonial__quote {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
}

.testimonial__author {
  margin: 0.6rem 0 0;
  font-weight: 600;
  color: var(--color-text-secondary);
}
</style>

