<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Milestones',
  },
  items: {
    type: Array,
    default: () => [
      { year: '1902', description: 'Founded as Sanjiang Normal College, marking the beginning of SEU.' },
      { year: '1952', description: 'Reorganized as a national key university specializing in engineering.' },
      { year: '2000', description: 'Integrated multiple disciplines to become a comprehensive research university.' },
    ],
  },
})
</script>

<template>
  <section class="timeline">
    <h2>{{ props.title }}</h2>
    <ol class="timeline__list">
      <li v-for="item in props.items" :key="item.year" class="timeline__item">
        <div class="timeline__marker">
          <span>{{ item.year }}</span>
        </div>
        <p class="timeline__description">
          {{ item.description }}
        </p>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.timeline {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 2.4rem;
  box-shadow: var(--shadow-soft);
  display: grid;
  gap: 1.6rem;
}

.timeline__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.8rem;
  position: relative;
}

.timeline__list::before {
  content: '';
  position: absolute;
  left: 1.6rem;
  top: 0.4rem;
  bottom: 0.4rem;
  width: 0.2rem;
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.6), rgba(14, 165, 233, 0.6));
}

.timeline__item {
  display: grid;
  gap: 0.6rem;
  padding-left: 3.8rem;
  position: relative;
}

.timeline__marker {
  position: absolute;
  left: 0;
  top: 0;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background: var(--color-primary);
  display: grid;
  place-items: center;
  color: #ffffff;
  font-weight: 600;
}

.timeline__description {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 1.05rem;
}
</style>

