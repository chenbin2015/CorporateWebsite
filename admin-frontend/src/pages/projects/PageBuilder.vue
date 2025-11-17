<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

import BuilderCanvas from '@/components/layout/BuilderCanvas.vue'
import BuilderInspector from '@/components/layout/BuilderInspector.vue'
import BuilderSidebar from '@/components/layout/BuilderSidebar.vue'
import { componentPalette } from '@/data/componentPalette'
import { getComponentSchema } from '@/data/componentSchemas'
import { getPage, saveDraft, publishPage } from '@/services/modules/project'

const route = useRoute()
const projectId = computed(() => route.params.projectId)
const pageId = computed(() => route.params.pageId)

const canvasItems = ref([])
const selectedId = ref(null)
const pageInfo = ref(null)
const saving = ref(false)
const publishing = ref(false)

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

const handleDelete = async (id) => {
  const targetId = id || selectedId.value
  if (!targetId) return
  
  const targetItem = canvasItems.value.find((item) => item.id === targetId)
  if (!targetItem) return

  try {
    await ElMessageBox.confirm(`确定要删除组件 "${targetItem.label}" 吗？`, '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
    
    const index = canvasItems.value.findIndex((item) => item.id === targetId)
    if (index === -1) return
    canvasItems.value.splice(index, 1)
    if (selectedId.value === targetId) {
      selectedId.value = null
    }
    // 自动保存
    await handleSaveDraft()
  } catch {
    // 用户取消删除
  }
}

// 加载页面数据
const loadPage = async () => {
  if (!projectId.value || !pageId.value) return
  
  try {
    const page = await getPage(projectId.value, pageId.value)
    pageInfo.value = page
    
    // 解析 schema_data
    if (page.schemaData) {
      try {
        canvasItems.value = JSON.parse(page.schemaData)
      } catch (e) {
        console.error('Failed to parse schema data:', e)
        canvasItems.value = []
      }
    } else {
      canvasItems.value = []
    }
  } catch (error) {
    console.error('Failed to load page:', error)
    ElMessage.error('加载页面失败')
  }
}

// 保存草稿
const handleSaveDraft = async () => {
  if (!projectId.value || !pageId.value) return
  if (saving.value) return
  
  saving.value = true
  try {
    const schemaData = JSON.stringify(canvasItems.value)
    await saveDraft(projectId.value, pageId.value, {
      schemaData,
    })
    ElMessage.success('草稿已保存')
  } catch (error) {
    console.error('Failed to save draft:', error)
    ElMessage.error('保存草稿失败')
  } finally {
    saving.value = false
  }
}

// 发布页面
const handlePublish = async () => {
  if (!projectId.value || !pageId.value) return
  
  try {
    await ElMessageBox.confirm('确定要发布此页面吗？发布后页面将对用户可见。', '发布确认', {
      confirmButtonText: '发布',
      cancelButtonText: '取消',
      type: 'info',
    })
    
    publishing.value = true
    try {
      const schemaData = JSON.stringify(canvasItems.value)
      await publishPage(projectId.value, pageId.value, {
        schemaData,
      })
      ElMessage.success('页面已发布')
      // 重新加载页面信息
      await loadPage()
    } catch (error) {
      console.error('Failed to publish page:', error)
      ElMessage.error('发布页面失败')
    } finally {
      publishing.value = false
    }
  } catch {
    // 用户取消发布
  }
}

// 预览页面（暂时先提示）
const handlePreview = () => {
  ElMessage.info('预览功能开发中...')
}

// 监听 canvasItems 变化，自动保存（防抖）
let saveTimer = null
watch(
  canvasItems,
  () => {
    if (saveTimer) {
      clearTimeout(saveTimer)
    }
    saveTimer = setTimeout(() => {
      handleSaveDraft()
    }, 2000) // 2秒后自动保存
  },
  { deep: true }
)

onMounted(() => {
  loadPage()
})
</script>

<template>
  <div class="builder-wrapper">
    <header class="builder-header">
      <div>
        <p class="builder-breadcrumb">项目 {{ projectId }} / 页面 {{ pageId }}</p>
        <h1>页面搭建器</h1>
      </div>
      <div class="builder-actions">
        <button class="btn btn--ghost" @click="handlePreview" :disabled="saving || publishing">
          预览
        </button>
        <button class="btn btn--save" @click="handleSaveDraft" :disabled="saving || publishing">
          {{ saving ? '保存中...' : '保存草稿' }}
        </button>
        <button class="btn" @click="handlePublish" :disabled="saving || publishing">
          {{ publishing ? '发布中...' : '发布' }}
        </button>
      </div>
    </header>

    <div class="builder">
      <BuilderSidebar :categories="componentPalette" @insert="handleInsert" />
      <BuilderCanvas :items="canvasItems" :selected-id="selectedId" @select="handleSelect" @delete="handleDelete" />
      <BuilderInspector
        :selected-item="selectedItem"
        :schema="selectedSchema"
        @update-props="handleUpdateProps"
        @reset="handleResetProps"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<style scoped>
.builder-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  min-height: 0;
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

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--ghost {
  background: transparent;
  color: var(--color-primary);
  border: 0.1rem solid rgba(37, 99, 235, 0.4);
}

.btn--ghost:hover:not(:disabled) {
  background: rgba(37, 99, 235, 0.1);
}

.btn--save {
  background: #10b981;
  color: white;
}

.btn--save:hover:not(:disabled) {
  background: #059669;
}

.btn:not(.btn--ghost):not(.btn--save) {
  background: var(--color-primary);
  color: white;
}

.btn:not(.btn--ghost):not(.btn--save):hover:not(:disabled) {
  background: #1d4ed8;
}

.builder {
  display: grid;
  grid-template-columns: 16rem 1fr 16rem;
  gap: 1rem;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  align-items: stretch;
}

.builder > * {
  min-height: 0;
  height: 100%;
}

@media (max-width: 80rem) {
  .builder {
    grid-template-columns: 14rem 1fr;
    grid-template-rows: auto auto;
  }
}
</style>

