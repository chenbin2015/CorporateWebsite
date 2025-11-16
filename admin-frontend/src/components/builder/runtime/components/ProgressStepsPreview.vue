<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '进度追踪',
  },
  steps: {
    type: Array,
    default: () => [
      { label: '提交申请', status: 'done' },
      { label: '资料审核', status: 'current' },
      { label: '结果通知', status: 'pending' },
    ],
  },
})

const statusClass = (status) => {
  switch (status) {
    case 'done':
      return 'progress-steps-preview__step--done'
    case 'current':
      return 'progress-steps-preview__step--current'
    default:
      return ''
  }
}
</script>

<template>
  <section class="progress-steps-preview">
    <header>
      <h3>{{ props.title }}</h3>
    </header>
    <div class="progress-steps-preview__track">
      <div
        v-for="(step, index) in props.steps"
        :key="step.label || index"
        :class="['progress-steps-preview__step', statusClass(step.status)]"
      >
        <span class="progress-steps-preview__index">{{ index + 1 }}</span>
        <span class="progress-steps-preview__label">{{ step.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.progress-steps-preview {
  background: #ffffff;
  border-radius: 0.9rem;
  padding: 1.4rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
  display: grid;
  gap: 0.8rem;
}

.progress-steps-preview__track {
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  margin-top: 0.4rem;
}

.progress-steps-preview__step {
  flex: 1;
  text-align: center;
  padding: 0.7rem;
  border-radius: 0.6rem;
  border: 1px dashed #cbd5e1;
  font-size: 0.9rem;
  display: grid;
  gap: 0.3rem;
}

.progress-steps-preview__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 999px;
  border: 1px solid #cbd5e1;
  font-size: 0.85rem;
}

.progress-steps-preview__step--done {
  border-style: solid;
  border-color: rgba(34, 197, 94, 0.6);
  background: rgba(34, 197, 94, 0.08);
}

.progress-steps-preview__step--current {
  border-style: solid;
  border-color: rgba(37, 99, 235, 0.6);
  background: rgba(37, 99, 235, 0.08);
}
</style>


