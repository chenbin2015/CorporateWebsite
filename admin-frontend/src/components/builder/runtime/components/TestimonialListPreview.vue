<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '校友心声',
  },
  items: {
    type: Array,
    default: () => [
      { quote: '在这里收获了终身难忘的学习经历。', author: '张同学' },
      { quote: '优秀的师资和开放的学术氛围。', author: '李校友' },
    ],
  },
})
</script>

<template>
  <section class="testimonial-preview">
    <header>
      <h3>{{ props.title }}</h3>
    </header>
    <div class="testimonial-preview__list">
      <article v-for="item in props.items" :key="item.author">
        <p class="testimonial-preview__quote">“{{ item.quote }}”</p>
        <p class="testimonial-preview__author">{{ item.author }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.testimonial-preview {
  background: #ffffff;
  border-radius: 0.9rem;
  padding: 1.4rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.testimonial-preview__list {
  display: grid;
  gap: 0.8rem;
  margin-top: 0.6rem;
}

article {
  padding: 0.8rem;
  border-radius: 0.7rem;
  border: 1px solid #e2e8f0;
  background: rgba(15, 23, 42, 0.02);
}

.testimonial-preview__quote {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.testimonial-preview__author {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}
</style>


