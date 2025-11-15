<template>
  <section class="builder-canvas">
    <p>拖拽组件到这里进行页面搭建。</p>
  </section>
</template>

<style scoped>
.builder-canvas {
  background: repeating-linear-gradient(
    0deg,
    var(--color-surface-contrast),
    var(--color-surface-contrast) 24px,
    rgba(148, 163, 184, 0.15) 25px
  );
  border: 0.1rem dashed var(--color-border);
  min-height: 24rem;
  border-radius: var(--radius-md);
  display: grid;
  place-items: center;
  color: var(--color-text-secondary);
}
</style>

