<script setup>
import { toRefs } from 'vue'

import { defaultEvents } from '@/data/defaults'

const props = defineProps({
  title: {
    type: String,
    default: 'Upcoming Events',
  },
  events: {
    type: Array,
    default: () => defaultEvents,
  },
})

const { title, events } = toRefs(props)
</script>

<template>
  <section class="events">
    <header class="events__header">
      <h3>{{ title }}</h3>
      <a class="events__more" href="#">{{ $t('home.more') }}</a>
    </header>
    <ul class="events__list">
      <li v-for="event in events" :key="event.title" class="events__item">
        <div class="events__time">
          <span class="events__day">{{ event.day }}</span>
          <span class="events__month">{{ event.month }}</span>
        </div>
        <div class="events__details">
          <a class="events__title" :href="event.href">{{ event.title }}</a>
          <p class="events__meta">
            {{ event.location }} · {{ event.time }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.events {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  padding: 2rem;
  display: grid;
  gap: 1.6rem;
}

.events__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.events__header h3 {
  margin: 0;
  font-size: 1.6rem;
}

.events__more {
  font-size: 1rem;
  color: var(--color-primary);
}

.events__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.2rem;
}

.events__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.2rem;
  align-items: center;
  padding: 1.2rem;
  border-radius: var(--radius-md);
  border: 0.1rem solid var(--color-border);
}

.events__time {
  width: 4.8rem;
  height: 4.8rem;
  border-radius: var(--radius-md);
  background: var(--color-primary-muted);
  display: grid;
  place-items: center;
  text-transform: uppercase;
  line-height: 1.2;
  color: var(--color-primary);
  font-weight: 600;
}

.events__day {
  font-size: 1.6rem;
}

.events__month {
  font-size: 0.9rem;
}

.events__title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.events__meta {
  margin: 0.4rem 0 0;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}
</style>

