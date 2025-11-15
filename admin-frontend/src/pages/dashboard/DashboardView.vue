<script setup>
const cards = [
  { label: '项目数', value: 24 },
  { label: '页面数', value: 182 },
  { label: '在线用户', value: 56 },
  { label: '构建耗时', value: '3m 12s' },
]
</script>

<template>
  <div class="dashboard">
    <header class="dashboard__header">
      <div>
        <h1>欢迎回来 👋</h1>
        <p>查看项目进度与最近操作。</p>
      </div>
      <button class="btn">新建项目</button>
    </header>

    <section class="dashboard__cards">
      <article v-for="card in cards" :key="card.label" class="card">
        <p class="dashboard__value">{{ card.value }}</p>
        <p class="dashboard__label">{{ card.label }}</p>
      </article>
    </section>

    <section class="card dashboard__timeline">
      <h3>最近活动</h3>
      <ul>
        <li>更新「官网首页」页面布局 · 5 分钟前</li>
        <li>王小宇 发布新项目「春招宣传站」 · 1 小时前</li>
        <li>触发自动部署 · 2 小时前</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: 1.5rem;
}

.dashboard__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface-contrast);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 0.1rem solid var(--color-border);
}

.dashboard__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
}

.dashboard__value {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.dashboard__label {
  margin: 0.4rem 0 0;
  color: var(--color-text-secondary);
}

.dashboard__timeline ul {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--color-text-secondary);
}

.dashboard__timeline li + li {
  margin-top: 0.6rem;
}
</style>

