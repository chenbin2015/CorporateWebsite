<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPage } from '@/services/modules/project'
import { resolveBuilderComponent } from '@/components/builder/runtime/componentRegistry'

const route = useRoute()

// 使用 computed 来响应式获取路由参数
const projectCode = computed(() => route.params.projectCode)
const pageCode = computed(() => route.params.pageCode)

// 判断是否为运行态（通过路径判断）
const isRuntime = computed(() => route.path.includes('/runtime/'))

const pageItems = ref([])
const pageInfo = ref(null)
const loading = ref(true)

// 保存原始样式
const originalHtmlOverflow = ref('')
const originalBodyOverflow = ref('')
const originalHtmlHeight = ref('')
const originalBodyHeight = ref('')

// 修复 overflow 问题
const fixOverflow = () => {
  const html = document.documentElement
  const body = document.body
  
  // 保存原始值
  originalHtmlOverflow.value = html.style.overflow || ''
  originalBodyOverflow.value = body.style.overflow || ''
  originalHtmlHeight.value = html.style.height || ''
  originalBodyHeight.value = body.style.height || ''
  
  // 设置可滚动
  html.style.overflow = 'auto'
  body.style.overflow = 'auto'
  html.style.height = 'auto'
  body.style.height = 'auto'
}

// 恢复原始样式
const restoreOverflow = () => {
  const html = document.documentElement
  const body = document.body
  
  html.style.overflow = originalHtmlOverflow.value
  body.style.overflow = originalBodyOverflow.value
  html.style.height = originalHtmlHeight.value
  body.style.height = originalBodyHeight.value
}

// 加载页面数据
const loadPage = async () => {
  if (!projectCode.value || !pageCode.value) return

  loading.value = true
  try {
    const page = await getPage(projectCode.value, pageCode.value)
    pageInfo.value = page

    // 运行态只使用 publishedSchemaData（已发布数据），预览态使用 schemaData（草稿数据）
    let schemaData = null
    if (isRuntime.value) {
      // 运行态：只使用已发布的数据，如果没有发布则提示
      if (page.publishedSchemaData) {
        schemaData = page.publishedSchemaData
      } else {
        pageItems.value = []
        ElMessage.warning('页面尚未发布，无法查看运行态')
        return
      }
    } else {
      // 预览态：使用草稿数据
      schemaData = page.schemaData
    }

    if (schemaData) {
      try {
        pageItems.value = JSON.parse(schemaData)
      } catch (e) {
        console.error('Failed to parse schema data:', e)
        pageItems.value = []
        ElMessage.error('页面数据格式错误')
      }
    } else {
      pageItems.value = []
    }
  } catch (error) {
    console.error('Failed to load page:', error)
    ElMessage.error('加载页面失败')
  } finally {
    loading.value = false
  }
}

// 监听路由参数变化，重新加载页面数据
watch(
  () => [route.params.projectCode, route.params.pageCode],
  () => {
    loadPage()
  },
  { immediate: false }
)

onMounted(() => {
  // 预览页面和运行态页面都不是设计态，允许交互
  // 只设置 admin 模式标识，不设置设计态标识
  window.__ADMIN_MODE__ = true
  if (isRuntime.value) {
    // 运行态不设置预览模式标识
    window.__RUNTIME_MODE__ = true
  } else {
    window.__PREVIEW_MODE__ = true
  }
  
  fixOverflow()
  loadPage()
})

onBeforeUnmount(() => {
  // 清理标识
  delete window.__ADMIN_MODE__
  delete window.__PREVIEW_MODE__
  delete window.__RUNTIME_MODE__
  
  restoreOverflow()
})
</script>

<template>
  <div class="page-preview">
    <div v-if="loading" class="preview-loading">
      <p>加载中...</p>
    </div>
    <div v-else-if="pageItems.length === 0" class="preview-empty">
      <p>页面暂无内容</p>
    </div>
    <div v-else class="preview-content">
      <component
        v-for="item in pageItems"
        :key="item.id"
        :is="resolveBuilderComponent(item.key)"
        v-bind="item.props"
        class="preview-component"
      />
    </div>
  </div>
</template>

<style scoped>
.page-preview {
  min-height: 100vh;
  background: #f8fafc; /* 与前端页面背景色一致 */
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.preview-loading,
.preview-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: #666;
  margin: 0;
  padding: 0;
}

.preview-content {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  margin: 0 auto;
  padding: 2.4rem 1.5rem;
  max-width: 72rem; /* 与前端 container 一致 */
  gap: 2.8rem; /* 与前端 page-stack 一致，组件之间的间距 */
}

.preview-content > * {
  width: 100%;
  min-width: 0; /* 防止内容溢出 */
}

/* 响应式 */
@media (max-width: 48rem) {
  .preview-content {
    padding: 1.6rem 1rem;
    gap: 2rem;
  }
}

.preview-component {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

/* 移除预览组件在画布中的装饰样式，让预览更真实 */
.preview-component :deep(.canvas-item) {
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
  cursor: default !important;
  border-radius: 0 !important;
}

.preview-component :deep(.canvas-item header) {
  display: none !important;
}

.preview-component :deep(.canvas-item .item-actions) {
  display: none !important;
}

.preview-component :deep(.canvas-item .item-label) {
  display: none !important;
}

.preview-component :deep(.canvas-item .item-source) {
  display: none !important;
}

/* 确保组件内容正常显示 */
.preview-component :deep(*) {
  max-width: 100%;
}

/* 确保组件内部 section 等元素有合适的样式 */
.preview-component :deep(section) {
  width: 100%;
  margin: 0;
}
</style>
