<template>
  <aside class="builder-panel">
    <h4>属性配置</h4>
    <div class="form">
      <label>
        <span>组件标题</span>
        <input type="text" placeholder="输入标题" />
      </label>
      <label>
        <span>对齐方式</span>
        <select>
          <option>左对齐</option>
          <option>居中</option>
          <option>右对齐</option>
        </select>
      </label>
    </div>
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

.form {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
}

label {
  display: grid;
  gap: 0.4rem;
}

input,
select {
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 0.1rem solid var(--color-border);
}
</style>

