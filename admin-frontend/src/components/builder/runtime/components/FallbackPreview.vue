<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Unknown Component',
  },
})
</script>

<template>
  <section class="fallback">
    <p>暂未配置 {{ props.label }} 的画布预览</p>
  </section>
</template>

<style scoped>
.fallback {
  border: 1px dashed rgba(148, 163, 184, 0.8);
  border-radius: 0.8rem;
  padding: 1rem;
  text-align: center;
  color: var(--color-text-secondary);
  background: rgba(148, 163, 184, 0.1);
}
</style>

