<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '流程日程',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="timeline-horizontal">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <div class="timeline-horizontal__track">
      <div v-for="item in items" :key="item.label" class="timeline-horizontal__item">
        <span class="timeline-horizontal__time">{{ item.time }}</span>
        <span class="timeline-horizontal__label">{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-horizontal {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

.timeline-horizontal__track {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1.2rem;
  margin-top: 1rem;
}

.timeline-horizontal__item {
  text-align: center;
  position: relative;
  padding-top: 0.6rem;
}

.timeline-horizontal__item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: var(--color-primary);
  transform: translateX(-50%);
}

.timeline-horizontal__time {
  display: block;
  font-weight: 600;
}

.timeline-horizontal__label {
  display: block;
  margin-top: 0.3rem;
  color: var(--color-text-secondary);
}
</style>

