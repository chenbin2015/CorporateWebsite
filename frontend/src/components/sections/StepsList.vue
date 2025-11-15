<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Application Process',
  },
  steps: {
    type: Array,
    default: () => [
      { label: 'Prepare materials', detail: 'Gather transcripts, recommendation letters, and personal statements.' },
      { label: 'Submit application', detail: 'Complete the online submission before the deadline.' },
      { label: 'Attend interview', detail: 'Participate in interviews or assessments arranged by the program.' },
      { label: 'Receive admission', detail: 'Check admission results online and confirm enrollment.' },
    ],
  },
})
</script>

<template>
  <section class="steps">
    <header class="steps__header">
      <h2>{{ props.title }}</h2>
    </header>
    <ol class="steps__list">
      <li v-for="(step, index) in props.steps" :key="step.label" class="steps__item">
        <div class="steps__badge">{{ (index + 1).toString().padStart(2, '0') }}</div>
        <div class="steps__content">
          <h3>{{ step.label }}</h3>
          <p>{{ step.detail }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.steps {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  padding: 2.4rem;
  display: grid;
  gap: 1.6rem;
}

.steps__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1.2rem;
}

.steps__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
  padding: 1.4rem;
  border-radius: var(--radius-md);
  border: 0.1rem solid var(--color-border);
}

.steps__badge {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-muted);
}

.steps__content h3 {
  margin: 0 0 0.4rem;
}

.steps__content p {
  margin: 0;
  color: var(--color-text-secondary);
}
</style>

