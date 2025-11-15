<template>
  <aside class="builder-panel">
    <h4>组件库</h4>
    <ul>
      <li>标题</li>
      <li>图片</li>
      <li>按钮</li>
      <li>列表</li>
    </ul>
  </aside>
</template>

<style scoped>
.builder-panel {
  background: var(--color-surface-contrast);
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  min-height: 24rem;
}

ul {
  margin-top: 1rem;
  display: grid;
  gap: 0.4rem;
}
</style>

