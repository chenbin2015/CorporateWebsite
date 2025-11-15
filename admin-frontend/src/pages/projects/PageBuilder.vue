<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BuilderCanvas from '@/components/layout/BuilderCanvas.vue'
import BuilderInspector from '@/components/layout/BuilderInspector.vue'
import BuilderSidebar from '@/components/layout/BuilderSidebar.vue'

const route = useRoute()
const projectId = computed(() => route.params.projectId)
const pageId = computed(() => route.params.pageId)
</script>

<template>
  <div class="builder-wrapper">
    <header class="builder-header">
      <div>
        <p class="builder-breadcrumb">项目 {{ projectId }} / 页面 {{ pageId }}</p>
        <h1>页面搭建器</h1>
      </div>
      <div class="builder-actions">
        <button class="btn btn--ghost">预览</button>
        <button class="btn">发布</button>
      </div>
    </header>

    <div class="builder">
      <BuilderSidebar />
      <BuilderCanvas />
      <BuilderInspector />
    </div>
  </div>
</template>

<style scoped>
.builder-wrapper {
  display: grid;
  gap: 1rem;
}

.builder-header {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  border: 0.1rem solid var(--color-border);
  padding: 1rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.builder-breadcrumb {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.builder-actions {
  display: flex;
  gap: 0.5rem;
}

.btn--ghost {
  background: transparent;
  color: var(--color-primary);
  border: 0.1rem solid rgba(37, 99, 235, 0.4);
}

.builder {
  display: grid;
  grid-template-columns: 16rem 1fr 16rem;
  gap: 1rem;
}

@media (max-width: 80rem) {
  .builder {
    grid-template-columns: 14rem 1fr;
    grid-template-rows: auto auto;
  }
}
</style>

