<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '进度追踪',
  },
  steps: {
    type: Array,
    default: () => [],
  },
})

const statusClass = (status) => {
  switch (status) {
    case 'done':
      return 'progress-steps__step--done'
    case 'current':
      return 'progress-steps__step--current'
    default:
      return ''
  }
}
</script>

<template>
  <section class="progress-steps">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <div class="progress-steps__track">
      <div v-for="(step, index) in steps" :key="step.label" :class="['progress-steps__step', statusClass(step.status)]">
        <span class="progress-steps__index">{{ index + 1 }}</span>
        <span>{{ step.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.progress-steps {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

.progress-steps__track {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 0.8rem;
}

.progress-steps__step {
  flex: 1;
  text-align: center;
  padding: 0.8rem;
  border-radius: var(--radius-md);
  border: 0.1rem dashed var(--color-border);
}

.progress-steps__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 0.1rem solid var(--color-border);
  margin-bottom: 0.4rem;
}

.progress-steps__step--done {
  border-style: solid;
  border-color: rgba(34, 197, 94, 0.5);
  background: rgba(34, 197, 94, 0.1);
}

.progress-steps__step--current {
  border-style: solid;
  border-color: rgba(37, 99, 235, 0.5);
  background: rgba(37, 99, 235, 0.1);
}
</style>

