<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import BuilderCanvas from '@/components/layout/BuilderCanvas.vue'
import BuilderInspector from '@/components/layout/BuilderInspector.vue'
import BuilderSidebar from '@/components/layout/BuilderSidebar.vue'
import { componentPalette } from '@/data/componentPalette'
import { getComponentSchema } from '@/data/componentSchemas'

const route = useRoute()
const projectId = computed(() => route.params.projectId)
const pageId = computed(() => route.params.pageId)

const canvasItems = ref([])
const selectedId = ref(null)

const selectedItem = computed(() => canvasItems.value.find((item) => item.id === selectedId.value))
const selectedSchema = computed(() => (selectedItem.value ? getComponentSchema(selectedItem.value.key) : null))

const handleInsert = (component) => {
  const schema = getComponentSchema(component.key)
  const defaults = schema?.defaults ? JSON.parse(JSON.stringify(schema.defaults)) : {}
  const instance = {
    id: `${component.key}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ...component,
    props: defaults,
  }
  canvasItems.value.push(instance)
  selectedId.value = instance.id
}

const handleSelect = (componentId) => {
  selectedId.value = componentId
}

const handleUpdateProps = (updatedProps) => {
  const index = canvasItems.value.findIndex((item) => item.id === selectedId.value)
  if (index === -1) return
  canvasItems.value[index] = {
    ...canvasItems.value[index],
    props: {
      ...canvasItems.value[index].props,
      ...updatedProps,
    },
  }
}

const handleResetProps = () => {
  if (!selectedSchema.value) return
  const index = canvasItems.value.findIndex((item) => item.id === selectedId.value)
  if (index === -1) return
  canvasItems.value[index] = {
    ...canvasItems.value[index],
    props: JSON.parse(JSON.stringify(selectedSchema.value.defaults ?? {})),
  }
}
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
      <BuilderSidebar :categories="componentPalette" @insert="handleInsert" />
      <BuilderCanvas :items="canvasItems" :selected-id="selectedId" @select="handleSelect" />
      <BuilderInspector
        :selected-item="selectedItem"
        :schema="selectedSchema"
        @update-props="handleUpdateProps"
        @reset="handleResetProps"
      />
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

