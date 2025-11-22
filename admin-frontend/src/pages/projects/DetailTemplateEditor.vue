<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'

import BuilderCanvas from '@/components/layout/BuilderCanvas.vue'
import BuilderInspector from '@/components/layout/BuilderInspector.vue'
import BuilderLeftPanel from '@/components/layout/BuilderLeftPanel.vue'
import { componentPalette } from '@/data/componentPalette'
import { getComponentSchema } from '@/data/componentSchemas'
import { getProject, updateProjectDetailPageTemplates } from '@/services/modules/project'

const route = useRoute()
const router = useRouter()
const projectCode = computed(() => route.params.projectCode)
const templateType = computed(() => route.params.templateType) // news, product, event, notice, focus

const canvasItems = ref([])
const selectedId = ref(null)
const project = ref(null)
const saving = ref(false)

const selectedItem = computed(() => canvasItems.value.find((item) => item.id === selectedId.value))
const selectedSchema = computed(() => (selectedItem.value ? getComponentSchema(selectedItem.value.key) : null))

// 模板类型的中文名称
const templateTypeName = computed(() => {
  const names = {
    news: '新闻详情页',
    product: '产品详情页',
    event: '活动详情页',
    notice: '公告详情页',
    focus: '焦点详情页',
  }
  return names[templateType.value] || '详情页'
})

// 模拟详情数据（用于预览）
const mockDetailData = computed(() => {
  const mocks = {
    news: {
      id: 'mock-news-1',
      title: '示例新闻标题',
      date: '2025-01-15',
      author: '新闻中心',
      cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
      content: '<p>这是示例新闻的详细内容。您可以在模板中使用 DetailData 组件来显示这些数据。</p>',
      summary: '这是新闻摘要',
    },
    product: {
      id: 'mock-product-1',
      name: '示例产品名称',
      description: '这是产品描述',
      price: '¥999',
      originalPrice: '¥1299',
      image: 'http://localhost:8002/p1.jpg',
      content: '<p>这是产品的详细内容。</p>',
    },
    event: {
      id: 'mock-event-1',
      title: '示例活动标题',
      date: '2025-02-01',
      location: '活动地点',
      content: '<p>这是活动的详细内容。</p>',
    },
    notice: {
      id: 'mock-notice-1',
      title: '示例公告标题',
      date: '2025-01-10',
      content: '<p>这是公告的详细内容。</p>',
    },
    focus: {
      id: 'mock-focus-1',
      title: '示例焦点标题',
      summary: '这是焦点摘要',
      content: '<p>这是焦点的详细内容。</p>',
    },
  }
  return mocks[templateType.value] || {}
})

const handleInsert = (component) => {
  const schema = getComponentSchema(component.key)
  const defaults = schema?.defaults ? JSON.parse(JSON.stringify(schema.defaults)) : {}
  const instance = {
    id: `${component.key}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ...component,
    props: defaults,
  }
  
  if (selectedId.value) {
    const selectedIndex = canvasItems.value.findIndex((item) => item.id === selectedId.value)
    if (selectedIndex !== -1) {
      canvasItems.value.splice(selectedIndex + 1, 0, instance)
    } else {
      canvasItems.value.push(instance)
    }
  } else {
    canvasItems.value.push(instance)
  }
  
  selectedId.value = instance.id
}

const handleSelect = (componentId) => {
  selectedId.value = componentId
}

const handleScrollTo = (id) => {
  selectedId.value = id
}

const handleUpdateProps = async (updatedProps) => {
  const index = canvasItems.value.findIndex((item) => item.id === selectedId.value)
  if (index === -1) return
  
  const item = canvasItems.value[index]
  const newProps = {
    ...item.props,
    ...updatedProps,
  }
  
  canvasItems.value[index] = {
    ...item,
    props: newProps,
  }
  
  canvasItems.value = [...canvasItems.value]
  
  // 自动保存
  handleSave()
}

const handleDelete = async (id) => {
  console.log('[DetailTemplateEditor] handleDelete called:', { id, selectedId: selectedId.value })
  const targetId = id || selectedId.value
  if (!targetId) {
    console.warn('[DetailTemplateEditor] handleDelete: no targetId')
    return
  }
  
  const targetItem = canvasItems.value.find((item) => item.id === targetId)
  if (!targetItem) {
    console.warn('[DetailTemplateEditor] handleDelete: targetItem not found', { targetId, items: canvasItems.value.map(i => i.id) })
    return
  }

  console.log('[DetailTemplateEditor] handleDelete: targetItem found', targetItem)

  try {
    await ElMessageBox.confirm(`确定要删除组件 "${targetItem.label}" 吗？`, '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })
    
    console.log('[DetailTemplateEditor] handleDelete: user confirmed')
    
    const index = canvasItems.value.findIndex((item) => item.id === targetId)
    console.log('[DetailTemplateEditor] handleDelete: index found', index)
    if (index === -1) {
      console.warn('[DetailTemplateEditor] handleDelete: index not found')
      return
    }
    
    // 删除组件
    console.log('[DetailTemplateEditor] handleDelete: before splice', canvasItems.value.length)
    canvasItems.value.splice(index, 1)
    console.log('[DetailTemplateEditor] handleDelete: after splice', canvasItems.value.length)
    
    // 强制触发响应式更新
    canvasItems.value = [...canvasItems.value]
    console.log('[DetailTemplateEditor] handleDelete: after reactive update', canvasItems.value.length)
    
    // 如果删除的是当前选中的组件，清除选中状态
    if (selectedId.value === targetId) {
      selectedId.value = null
      console.log('[DetailTemplateEditor] handleDelete: cleared selectedId')
    }
    
    // 自动保存
    console.log('[DetailTemplateEditor] handleDelete: calling handleSave')
    await handleSave()
    console.log('[DetailTemplateEditor] handleDelete: save completed')
  } catch (error) {
    // 用户取消删除或其他错误
    console.log('[DetailTemplateEditor] handleDelete: error or cancelled', error)
  }
}

const handleReorder = (newItems) => {
  canvasItems.value = newItems
  handleSave()
}

// 加载项目配置（包含导航配置）
const loadProjectConfig = async () => {
  if (!projectCode.value) {
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
        console.log('[DetailTemplateEditor] 加载项目导航配置:', projectCode.value, navConfig)
      } catch (e) {
        console.warn('导航配置解析失败', e)
        window.__PROJECT_NAVIGATION_CONFIG__ = null
      }
    } else {
      window.__PROJECT_NAVIGATION_CONFIG__ = null
      console.log('[DetailTemplateEditor] 项目没有导航配置:', projectCode.value)
    }
  } catch (error) {
    console.error('加载项目配置失败:', error)
    window.__PROJECT_NAVIGATION_CONFIG__ = null
  }
}

// 加载项目信息和模板
const loadTemplate = async () => {
  if (!projectCode.value || !templateType.value) return
  
  try {
    // 先加载项目配置（包含导航配置）
    await loadProjectConfig()
    
    const projectData = await getProject(projectCode.value)
    project.value = projectData
    
    // 解析详情页模板配置
    let templates = {}
    if (projectData.detailPageTemplates) {
      try {
        templates = JSON.parse(projectData.detailPageTemplates)
      } catch (e) {
        console.warn('详情页模板配置解析失败', e)
        templates = {}
      }
    }
    
    // 加载当前类型的模板
    const currentTemplate = templates[templateType.value]
    if (currentTemplate?.schemaData) {
      try {
        canvasItems.value = JSON.parse(currentTemplate.schemaData)
      } catch (e) {
        console.error('模板数据解析失败', e)
        canvasItems.value = []
      }
    } else {
      // 如果没有模板，使用默认布局
      canvasItems.value = getDefaultTemplate()
    }
    
    // 设置模拟数据用于预览
    window.__DETAIL_DATA__ = mockDetailData.value
  } catch (error) {
    ElMessage.error('加载模板失败: ' + error.message)
  }
}

// 获取默认模板布局
const getDefaultTemplate = () => {
  // 根据类型返回不同的默认布局
  const defaults = {
    news: [
      {
        id: 'PageHero-1',
        key: 'PageHero',
        label: '页面标题',
        props: {
          title: '{{title}}',
          subtitle: '{{summary}}',
          background: '{{cover}}',
        },
      },
      {
        id: 'ContentDetail-1',
        key: 'ContentDetail',
        label: '内容详情',
        props: {
          title: '{{title}}',
          createdAt: '{{date}}',
          author: '{{author}}',
          content: '{{content}}',
          showTitle: true,
          showCreatedAt: true,
          showAuthor: true,
          showContent: true,
        },
      },
    ],
    product: [
      {
        id: 'PageHero-1',
        key: 'PageHero',
        label: '页面标题',
        props: {
          title: '{{name}}',
          subtitle: '{{description}}',
          background: '{{image}}',
        },
      },
      {
        id: 'ContentDetail-1',
        key: 'ContentDetail',
        label: '内容详情',
        props: {
          title: '{{name}}',
          content: '{{content}}',
          showTitle: true,
          showCreatedAt: false,
          showAuthor: false,
          showContent: true,
        },
      },
    ],
  }
  
  return defaults[templateType.value] || []
}

// 保存模板
const handleSave = async () => {
  if (!projectCode.value || !templateType.value) return
  
  try {
    saving.value = true
    
    // 获取项目当前的详情页模板配置
    const projectData = await getProject(projectCode.value)
    let templates = {}
    if (projectData.detailPageTemplates) {
      try {
        templates = JSON.parse(projectData.detailPageTemplates)
      } catch (e) {
        templates = {}
      }
    }
    
    // 更新当前类型的模板
    templates[templateType.value] = {
      schemaData: JSON.stringify(canvasItems.value),
      updatedAt: new Date().toISOString(),
    }
    
    // 保存到后端
    await updateProjectDetailPageTemplates(projectCode.value, JSON.stringify(templates))
    
    ElMessage.success('模板保存成功')
  } catch (error) {
    ElMessage.error('保存模板失败: ' + error.message)
  } finally {
    saving.value = false
  }
}

// 返回项目设置
const goBack = () => {
  router.back()
}

onMounted(() => {
  // 设置设计态标识
  window.__DESIGN_MODE__ = true
  window.__BUILDER_MODE__ = true
  
  loadTemplate()
})

onBeforeUnmount(() => {
  // 清理标识和数据
  delete window.__DESIGN_MODE__
  delete window.__BUILDER_MODE__
  delete window.__DETAIL_DATA__
  delete window.__PROJECT_NAVIGATION_CONFIG__
})
</script>

<template>
  <div class="template-editor-wrapper">
    <div class="template-editor-header">
      <div class="header-left">
        <el-button :icon="ArrowLeft" text @click="goBack" style="margin-right: 1rem;">
          返回
        </el-button>
        <div class="header-title">
          <h2>{{ templateTypeName }}模板编辑</h2>
          <p class="header-subtitle">项目：{{ project?.name }}</p>
        </div>
      </div>
      <div class="header-actions">
        <el-button type="primary" @click="handleSave" :loading="saving">
          保存模板
        </el-button>
      </div>
    </div>

    <div class="template-editor-content">
      <BuilderLeftPanel
        :project-code="projectCode"
        @insert="handleInsert"
        @scroll-to="handleScrollTo"
      />
      
      <div class="editor-main">
        <BuilderCanvas
          :items="canvasItems"
          :selected-id="selectedId"
          @select="handleSelect"
          @delete="handleDelete"
          @reorder="handleReorder"
        />
      </div>
      
      <div class="editor-inspector">
        <BuilderInspector
          v-if="selectedItem"
          :selected-item="selectedItem"
          :schema="selectedSchema"
          :project-code="projectCode"
          @update-props="handleUpdateProps"
          @delete="handleDelete"
        />
        <div v-else class="inspector-empty">
          <p>请选择一个组件进行编辑</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.template-editor-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.template-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.header-title h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #303133;
}

.header-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
  color: #909399;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.template-editor-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.editor-main {
  flex: 1;
  overflow: auto;
  background: #f5f5f5;
}

.editor-inspector {
  width: 320px;
  background: #fff;
  border-left: 1px solid #e4e7ed;
  overflow-y: auto;
}

.inspector-empty {
  padding: 3rem 1.5rem;
  text-align: center;
  color: #909399;
}
</style>

