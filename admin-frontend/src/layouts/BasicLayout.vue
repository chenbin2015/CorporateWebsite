<script setup>
import AppHeader from '@/components/navigation/AppHeader.vue'
import AppSidebar from '@/components/navigation/AppSidebar.vue'
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <div class="layout__main">
      <AppHeader />
      <main class="layout__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  min-height: 100vh;
}

.layout__main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__content {
  flex: 1;
  padding: 1.5rem;
  background: var(--color-surface);
}

@media (max-width: 62rem) {
  .layout {
    grid-template-columns: 14rem 1fr;
  }
}
</style>

