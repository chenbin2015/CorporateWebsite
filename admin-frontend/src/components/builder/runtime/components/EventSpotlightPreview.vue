<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Upcoming Events',
  },
  events: {
    type: Array,
    default: () => [
      {
        title: 'Campus Open Day',
        day: '12',
        month: 'OCT',
        location: 'Main Auditorium',
        time: '09:00–17:00',
        href: '#',
      },
      {
        title: 'Research Symposium',
        day: '21',
        month: 'NOV',
        location: 'Science Center',
        time: '13:30–18:00',
        href: '#',
      },
    ],
  },
})
</script>

<template>
  <section class="events-preview">
    <header class="events-preview__header">
      <h3>{{ props.title }}</h3>
      <span class="events-preview__more">更多</span>
    </header>
    <ul class="events-preview__list">
      <li
        v-for="event in props.events"
        :key="event.title"
        class="events-preview__item"
      >
        <div class="events-preview__time">
          <span class="events-preview__day">{{ event.day }}</span>
          <span class="events-preview__month">{{ event.month }}</span>
        </div>
        <div class="events-preview__details">
          <p class="events-preview__title">{{ event.title }}</p>
          <p class="events-preview__meta">
            {{ event.location }} · {{ event.time }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.events-preview {
  background: #ffffff;
  border-radius: 0.9rem;
  padding: 1.6rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
  display: grid;
  gap: 1.1rem;
}

.events-preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.events-preview__header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.events-preview__more {
  font-size: 0.9rem;
  color: #2563eb;
}

.events-preview__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.9rem;
}

.events-preview__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: center;
}

.events-preview__time {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 0.75rem;
  background: #e0ebff;
  display: grid;
  place-items: center;
  text-transform: uppercase;
  color: #2563eb;
  font-weight: 600;
  line-height: 1.1;
}

.events-preview__day {
  font-size: 1.2rem;
}

.events-preview__month {
  font-size: 0.7rem;
}

.events-preview__title {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 600;
}

.events-preview__meta {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  color: #64748b;
}
</style>


