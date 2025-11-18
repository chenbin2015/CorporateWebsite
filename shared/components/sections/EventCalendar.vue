<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '活动日历',
  },
  events: {
    type: Array,
    default: () => [
      { date: '2024-01-15', title: '学术讲座', type: 'academic' },
      { date: '2024-01-20', title: '校园活动', type: 'campus' },
      { date: '2024-01-25', title: '会议', type: 'meeting' },
    ],
  },
})

const currentDate = ref(new Date())
const currentMonth = computed(() => currentDate.value.getMonth())
const currentYear = computed(() => currentDate.value.getFullYear())

// 获取月份的第一天是星期几
const getFirstDayOfMonth = () => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay()
}

// 获取月份的天数
const getDaysInMonth = () => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
}

// 获取日期对应的事件
const getEventsForDate = (date) => {
  const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
  return props.events.filter((event) => event.date === dateStr)
}

const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}
</script>

<template>
  <section class="event-calendar">
    <header v-if="title">
      <h3>{{ title }}</h3>
    </header>
    <div class="calendar">
      <div class="calendar-header">
        <button class="calendar-nav" @click="prevMonth">←</button>
        <h4>{{ currentYear }}年{{ currentMonth + 1 }}月</h4>
        <button class="calendar-nav" @click="nextMonth">→</button>
      </div>
      <div class="calendar-weekdays">
        <div v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day" class="weekday">
          {{ day }}
        </div>
      </div>
      <div class="calendar-days">
        <div
          v-for="n in getFirstDayOfMonth()"
          :key="`empty-${n}`"
          class="calendar-day empty"
        ></div>
        <div
          v-for="day in getDaysInMonth()"
          :key="day"
          :class="['calendar-day', { 'has-events': getEventsForDate(day).length > 0 }]"
        >
          <span class="day-number">{{ day }}</span>
          <div v-if="getEventsForDate(day).length > 0" class="day-events">
            <span
              v-for="(event, index) in getEventsForDate(day).slice(0, 2)"
              :key="index"
              class="event-dot"
              :class="`event-dot--${event.type}`"
            ></span>
            <span
              v-if="getEventsForDate(day).length > 2"
              class="event-more"
            >+{{ getEventsForDate(day).length - 2 }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event-calendar {
  padding: 1.6rem;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 0.5rem);
}

header {
  margin-bottom: 1rem;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.calendar {
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  overflow: hidden;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--color-surface-contrast, #f8fafc);
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.calendar-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.calendar-nav {
  background: none;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-sm, 0.25rem);
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.calendar-nav:hover {
  background: var(--color-primary, #3b82f6);
  color: #fff;
  border-color: var(--color-primary, #3b82f6);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: var(--color-surface-contrast, #f8fafc);
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.weekday {
  padding: 0.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text-secondary, #64748b);
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-day {
  aspect-ratio: 1;
  padding: 0.5rem;
  border-right: 1px solid var(--color-border, #e2e8f0);
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.calendar-day:nth-child(7n) {
  border-right: none;
}

.calendar-day.empty {
  background: var(--color-surface-contrast, #f8fafc);
}

.calendar-day.has-events {
  background: rgba(59, 130, 246, 0.05);
}

.day-number {
  font-size: 0.9rem;
  font-weight: 500;
}

.day-events {
  display: flex;
  gap: 0.2rem;
  margin-top: 0.2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.event-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-primary, #3b82f6);
}

.event-dot--academic {
  background: #3b82f6;
}

.event-dot--campus {
  background: #10b981;
}

.event-dot--meeting {
  background: #f59e0b;
}

.event-more {
  font-size: 0.7rem;
  color: var(--color-text-secondary, #64748b);
}
</style>

