<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <RouterLink class="btn" to="/">返回首页</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: grid;
  place-items: center;
  gap: 1rem;
}
</style>

