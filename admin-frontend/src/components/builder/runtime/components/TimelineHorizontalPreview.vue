<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '流程日程',
  },
  items: {
    type: Array,
    default: () => [
      { time: 'Day 1', label: '提交申请' },
      { time: 'Day 3', label: '资格审核' },
      { time: 'Day 7', label: '结果通知' },
    ],
  },
})
</script>

<template>
  <section class="timeline-horizontal-preview">
    <header>
      <h3>{{ props.title }}</h3>
    </header>
    <div class="timeline-horizontal-preview__track">
      <div
        v-for="item in props.items"
        :key="item.label"
        class="timeline-horizontal-preview__item"
      >
        <span class="timeline-horizontal-preview__time">{{ item.time }}</span>
        <span class="timeline-horizontal-preview__label">{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-horizontal-preview {
  background: #ffffff;
  border-radius: 0.9rem;
  padding: 1.4rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.timeline-horizontal-preview__track {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 1.2rem;
  margin-top: 0.8rem;
}

.timeline-horizontal-preview__item {
  text-align: center;
  position: relative;
  padding-top: 0.8rem;
}

.timeline-horizontal-preview__item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: #2563eb;
  transform: translateX(-50%);
}

.timeline-horizontal-preview__time {
  display: block;
  font-weight: 600;
  font-size: 0.95rem;
}

.timeline-horizontal-preview__label {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #64748b;
}
</style>


