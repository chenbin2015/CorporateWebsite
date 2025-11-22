<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { DocumentCopy } from '@element-plus/icons-vue'

import BuilderCanvas from '@/components/layout/BuilderCanvas.vue'
import BuilderInspector from '@/components/layout/BuilderInspector.vue'
import BuilderLeftPanel from '@/components/layout/BuilderLeftPanel.vue'
import { componentPalette } from '@/data/componentPalette'
import { getComponentSchema } from '@/data/componentSchemas'
import { getPage, saveDraft, publishPage, getProject } from '@/services/modules/project'
import { loadDataSourceData, mergeDataSourceData } from '@/utils/dataSource'

const route = useRoute()
const router = useRouter()
const projectCode = computed(() => route.params.projectCode)
const pageCode = computed(() => route.params.pageCode)

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
  
  // 如果选中了某个组件，插入到该组件下方；否则插入到底部
  if (selectedId.value) {
    const selectedIndex = canvasItems.value.findIndex((item) => item.id === selectedId.value)
    if (selectedIndex !== -1) {
      // 插入到选中组件的下方
      canvasItems.value.splice(selectedIndex + 1, 0, instance)
    } else {
      // 如果找不到选中的组件，插入到底部
      canvasItems.value.push(instance)
    }
  } else {
    // 没有选中组件，插入到底部
    canvasItems.value.push(instance)
  }
  
  selectedId.value = instance.id
}

const handleSelect = (componentId) => {
  selectedId.value = componentId
}

// 处理从结构树点击的滚动事件
const handleScrollTo = (id) => {
  // 先选中组件
  selectedId.value = id
  // BuilderCanvas 会自动监听 selectedId 变化并滚动
}

const handleUpdateProps = async (updatedProps) => {
  const index = canvasItems.value.findIndex((item) => item.id === selectedId.value)
  if (index === -1) {
    console.warn('[PageBuilder] handleUpdateProps: item not found', { selectedId: selectedId.value, items: canvasItems.value.map(i => i.id) })
    return
  }
  console.log('[PageBuilder] handleUpdateProps:', { index, selectedId: selectedId.value, updatedProps, before: JSON.parse(JSON.stringify(canvasItems.value[index].props)) })
  
  const item = canvasItems.value[index]
  const newProps = {
    ...item.props,
    ...updatedProps,
  }
  
  // 使用 Vue 的响应式更新方式
  canvasItems.value[index] = {
    ...item,
    props: newProps,
  }
  
  // 强制触发响应式更新
  canvasItems.value = [...canvasItems.value]
  
  console.log('[PageBuilder] handleUpdateProps after:', { 
    props: JSON.parse(JSON.stringify(canvasItems.value[index].props)),
    cardsCount: canvasItems.value[index].props?.cards?.length || 0,
    fixed: canvasItems.value[index].props?.fixed,
    backgroundOpacity: canvasItems.value[index].props?.backgroundOpacity,
  })
  
  // 自动保存草稿
  handleSaveDraft()
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

// 处理组件重新排序
const handleReorder = (newItems) => {
  canvasItems.value = newItems
  // 自动保存
  handleSaveDraft()
}

// 加载项目配置（包含导航配置）
const loadProjectConfig = async () => {
  if (!projectCode.value) {
    // 如果没有 projectCode，清理导航配置
    window.__PROJECT_NAVIGATION_CONFIG__ = null
    return
  }
  
  try {
    const project = await getProject(projectCode.value)
    
    // 将导航配置注入到全局 context，供 MainHeader 组件使用
    if (project.navigationConfig) {
      try {
        const navConfig = JSON.parse(project.navigationConfig)
        window.__PROJECT_NAVIGATION_CONFIG__ = navConfig
        console.log('[PageBuilder] 加载项目导航配置:', projectCode.value, navConfig)
      } catch (e) {
        console.warn('导航配置解析失败', e)
        window.__PROJECT_NAVIGATION_CONFIG__ = null
      }
    } else {
      window.__PROJECT_NAVIGATION_CONFIG__ = null
      console.log('[PageBuilder] 项目没有导航配置:', projectCode.value)
    }
  } catch (error) {
    console.error('加载项目配置失败:', error)
    window.__PROJECT_NAVIGATION_CONFIG__ = null
  }
}

// 加载页面数据
const loadPage = async () => {
  if (!projectCode.value || !pageCode.value) return
  
  try {
    // 先加载项目配置（包含导航配置）
    await loadProjectConfig()
    
    const page = await getPage(projectCode.value, pageCode.value)
    pageInfo.value = page
    
    // 解析 schema_data
    let items = []
    if (page.schemaData) {
      try {
        items = JSON.parse(page.schemaData)
      } catch (e) {
        console.error('Failed to parse schema data:', e)
        items = []
      }
    }
    
    // 不再自动加载数据源数据，用户需要手动选择数据项
    canvasItems.value = items
  } catch (error) {
    console.error('Failed to load page:', error)
    ElMessage.error('加载页面失败')
  }
}

// 保存草稿
const handleSaveDraft = async () => {
  if (!projectCode.value || !pageCode.value) return
  if (saving.value) return
  
  saving.value = true
  try {
    // 调试：打印保存前的数据
    const mainHeaderItem = canvasItems.value.find(item => item.key === 'MainHeader')
    if (mainHeaderItem) {
      console.log('[PageBuilder] 保存前 MainHeader props:', JSON.parse(JSON.stringify(mainHeaderItem.props)))
      console.log('[PageBuilder] 保存前 MainHeader fixed:', mainHeaderItem.props?.fixed, typeof mainHeaderItem.props?.fixed)
      console.log('[PageBuilder] 保存前 MainHeader backgroundOpacity:', mainHeaderItem.props?.backgroundOpacity)
    }
    
    const schemaData = JSON.stringify(canvasItems.value)
    
    // 调试：检查序列化后的数据
    const parsed = JSON.parse(schemaData)
    const mainHeaderInSchema = parsed.find(item => item.key === 'MainHeader')
    if (mainHeaderInSchema) {
      console.log('[PageBuilder] 序列化后 MainHeader props:', mainHeaderInSchema.props)
      console.log('[PageBuilder] 序列化后 MainHeader fixed:', mainHeaderInSchema.props?.fixed, typeof mainHeaderInSchema.props?.fixed)
    }
    
    await saveDraft(projectCode.value, pageCode.value, {
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
  if (!projectCode.value || !pageCode.value) return
  
  try {
    await ElMessageBox.confirm(
      '发布后，当前页面的内容将对所有用户可见。\n\n发布操作会将当前草稿内容保存为已发布版本，运行态页面将显示已发布的内容。\n\n确定要发布此页面吗？',
      '发布确认',
      {
        confirmButtonText: '确定发布',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: false,
        distinguishCancelAndClose: true,
      }
    )
    
    publishing.value = true
    try {
      const schemaData = JSON.stringify(canvasItems.value)
      await publishPage(projectCode.value, pageCode.value, {
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
    // 用户取消发布，不显示任何提示
  }
}

// 复制访问地址（运行态地址）
const handleCopyUrl = async () => {
  if (!projectCode.value || !pageCode.value) {
    ElMessage.warning('页面信息不完整')
    return
  }
  
  try {
    // 复制运行态地址：/projects/:projectCode/runtime/pages/:pageCode
    // 注意：运行态在 frontend 项目中，需要获取 frontend 的地址
    // 这里假设 frontend 运行在同一个域名下，或者可以通过配置获取
    const runtimePath = `/projects/${projectCode.value}/runtime/pages/${pageCode.value}`
    
    // 获取 frontend 的基础 URL（可以通过环境变量配置，或使用相对路径）
    // 暂时使用当前域名，实际应该从配置中获取 frontend 的地址
    const frontendBaseUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin
    const fullUrl = `${frontendBaseUrl}${runtimePath}`
    
    // 使用 Clipboard API 复制
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullUrl)
      ElMessage.success('运行态访问地址已复制到剪贴板')
    } else {
      // 降级方案：使用传统方法
      const textArea = document.createElement('textarea')
      textArea.value = fullUrl
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      ElMessage.success('运行态访问地址已复制到剪贴板')
    }
  } catch (error) {
    console.error('复制失败:', error)
    ElMessage.error('复制失败，请手动复制')
  }
}

// 预览页面
const handlePreview = () => {
  if (!projectCode.value || !pageCode.value) {
    ElMessage.warning('页面信息不完整')
    return
  }
  
  // 先保存草稿，确保预览的是最新数据
  handleSaveDraft().then(() => {
    // 在新窗口打开预览
    const previewUrl = router.resolve({
      name: 'pagePreview',
      params: {
        projectCode: projectCode.value,
        pageCode: pageCode.value,
      },
    }).href
    
    window.open(previewUrl, '_blank')
  }).catch(() => {
    // 即使保存失败也打开预览（使用已保存的数据）
    const previewUrl = router.resolve({
      name: 'pagePreview',
      params: {
        projectCode: projectCode.value,
        pageCode: pageCode.value,
      },
    }).href
    
    window.open(previewUrl, '_blank')
  })
}

// 面包屑点击处理
const handleBreadcrumbProjects = () => {
  router.push({ name: 'projects' })
}

const handleBreadcrumbPageList = () => {
  router.push({ name: 'pageList', params: { projectCode: projectCode.value } })
}

// 监听路由参数变化，重新加载页面数据（包括项目配置）
watch(
  () => [route.params.projectCode, route.params.pageCode],
  () => {
    loadPage()
  },
  { immediate: false }
)

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

// 保存原始样式（用于恢复）
const originalHtmlOverflow = ref('')
const originalBodyOverflow = ref('')
const originalHtmlHeight = ref('')
const originalBodyHeight = ref('')

// 设计态：禁用全局滚动条
const disableGlobalScroll = () => {
  const html = document.documentElement
  const body = document.body
  
  // 保存原始值
  originalHtmlOverflow.value = html.style.overflow || ''
  originalBodyOverflow.value = body.style.overflow || ''
  originalHtmlHeight.value = html.style.height || ''
  originalBodyHeight.value = body.style.height || ''
  
  // 设计态禁用滚动条
  html.style.overflow = 'hidden'
  body.style.overflow = 'hidden'
  html.style.height = '100%'
  body.style.height = '100%'
}

// 恢复原始样式
const restoreGlobalScroll = () => {
  const html = document.documentElement
  const body = document.body
  
  html.style.overflow = originalHtmlOverflow.value
  body.style.overflow = originalBodyOverflow.value
  html.style.height = originalHtmlHeight.value
  body.style.height = originalBodyHeight.value
}

onMounted(() => {
  // 设置设计态标识（页面搭建器是设计态）
  window.__DESIGN_MODE__ = true
  window.__BUILDER_MODE__ = true
  
  // 设计态禁用全局滚动条
  disableGlobalScroll()
  
  loadPage()
})

onBeforeUnmount(() => {
  // 恢复全局滚动条
  restoreGlobalScroll()
  
  // 清理设计态标识和项目配置
  delete window.__DESIGN_MODE__
  delete window.__BUILDER_MODE__
  delete window.__PROJECT_NAVIGATION_CONFIG__
})
</script>

<template>
  <div class="builder-wrapper">
    <header class="builder-header">
      <div>
        <p class="builder-breadcrumb">
          <a @click.prevent="handleBreadcrumbProjects" class="breadcrumb-link">项目</a>
          <span> / </span>
          <a @click.prevent="handleBreadcrumbPageList" class="breadcrumb-link">页面管理</a>
          <span> / </span>
          <span>{{ pageInfo?.name || `页面 ${pageCode}` }}</span>
        </p>
        <h1>页面搭建器</h1>
      </div>
      <div class="builder-actions">
        <button class="btn btn--ghost" @click="handleCopyUrl" title="复制访问地址">
          <el-icon style="margin-right: 0.25rem;"><DocumentCopy /></el-icon>
          复制地址
        </button>
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
      <BuilderLeftPanel
        :categories="componentPalette"
        :page-name="pageInfo?.name || `页面 ${pageCode}`"
        :items="canvasItems"
        :selected-id="selectedId"
        :project-code="projectCode"
        @insert="handleInsert"
        @select="handleSelect"
        @scroll-to="handleScrollTo"
      />
      <BuilderCanvas 
        :items="canvasItems" 
        :selected-id="selectedId" 
        @select="handleSelect" 
        @delete="handleDelete"
        @reorder="handleReorder"
      />
      <BuilderInspector
        :selected-item="selectedItem"
        :schema="selectedSchema"
        :project-code="projectCode"
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

.breadcrumb-link {
  color: var(--el-color-primary);
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--el-color-primary-dark-2);
  text-decoration: underline;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
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

