<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '通知公告',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="notice">
    <header>
      <h3>{{ title }}</h3>
      <a href="#">{{ $t('home.more') }}</a>
    </header>
    <ul>
      <li v-for="item in items" :key="item.title">
        <a href="#">
          <span class="notice__title">{{ item.title }}</span>
          <time>{{ item.date }}</time>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.notice {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
  display: grid;
  gap: 1rem;
}

.notice header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notice header h3 {
  margin: 0;
}

.notice ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;
}

.notice a {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-text-primary);
}

.notice__title {
  flex: 1;
}

time {
  color: var(--color-text-secondary);
}
</style>

