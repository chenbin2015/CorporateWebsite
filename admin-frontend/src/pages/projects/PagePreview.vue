<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPage } from '@/services/modules/project'
import { resolveBuilderComponent } from '@/components/builder/runtime/componentRegistry'
import { loadDataSourceData, mergeDataSourceData } from '@/utils/dataSource'

const route = useRoute()

// 使用 computed 来响应式获取路由参数
const projectCode = computed(() => route.params.projectCode)
const pageCode = computed(() => route.params.pageCode)

// 判断是否为运行态（通过路径判断）
const isRuntime = computed(() => route.path.includes('/runtime/'))

const pageItems = ref([])
const pageInfo = ref(null)
const loading = ref(true)
const detailData = ref(null) // 详情页的动态数据

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

// 加载详情数据（如果当前页面是详情页）
const loadDetailData = async () => {
  const itemId = route.query.id
  const itemType = route.query.type || 'news'
  
  if (!itemId || !projectCode.value) {
    return
  }
  
  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    let response
    
    // 根据类型调用不同的 API
    if (itemType === 'product') {
      response = await fetch(`${apiBaseUrl}/products/${itemId}?projectCode=${projectCode.value}`)
    } else if (itemType === 'news') {
      response = await fetch(`${apiBaseUrl}/news/${itemId}?projectCode=${projectCode.value}`)
    } else {
      return
    }
    
    if (response.ok) {
      detailData.value = await response.json()
      // 将详情数据注入到全局 context，供组件使用
      window.__DETAIL_DATA__ = detailData.value
    }
  } catch (err) {
    console.error('Failed to load detail data:', err)
  }
}

// 加载页面数据
const loadPage = async () => {
  if (!projectCode.value || !pageCode.value) return

  loading.value = true
  try {
    // 先加载详情数据（如果是详情页）
    await loadDetailData()
    
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
        const parsed = JSON.parse(schemaData)
        
        // 加载数据源数据
        const itemsWithDataSource = await Promise.all(
          parsed.map(async (item) => {
            if (item.props?.dataSourceCode) {
              const dataSourceData = await loadDataSourceData(
                item.props.dataSourceCode,
                item.key
              )
              if (dataSourceData) {
                return {
                  ...item,
                  props: mergeDataSourceData(item.props, item.key, dataSourceData),
                }
              }
            }
            return item
          })
        )
        
        pageItems.value = itemsWithDataSource
        // 调试：检查 fullWidth 属性和 detailPage 配置
        itemsWithDataSource.forEach((item) => {
          if (item.key === 'MainHeader' || item.key === 'HeroCarousel') {
            console.log(`[PagePreview] ${item.key} fullWidth:`, item.props?.fullWidth)
          }
          if (item.key === 'ProductList') {
            console.log(`[PagePreview] ProductList detailPage:`, item.props?.detailPage)
            console.log(`[PagePreview] ProductList props:`, item.props)
          }
        })
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

// 判断组件是否为全宽组件
const isFullWidthComponent = (item) => {
  // 1. 优先检查用户配置的 fullWidth 属性（明确设置 true 或 false 都生效）
  if (item.props?.fullWidth !== undefined) {
    return item.props.fullWidth === true
  }
  // 2. 如果没有配置，使用默认规则：MainHeader、HeroCarousel、Footer 默认为全宽
  const fullWidthComponents = ['MainHeader', 'HeroCarousel', 'Footer']
  return fullWidthComponents.includes(item.key)
}

// 监听路由参数和查询参数变化，重新加载页面数据
watch(
  () => [route.params.projectCode, route.params.pageCode, route.query.id, route.query.type],
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
  delete window.__DETAIL_DATA__
  
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
      <template v-for="item in pageItems" :key="item.id">
        <!-- 全宽组件：直接渲染，不包裹容器 -->
        <component
          v-if="isFullWidthComponent(item)"
          :is="resolveBuilderComponent(item.key)"
          v-bind="item.props"
          class="preview-component preview-component--fullwidth"
        />
        <!-- 固定宽度组件：包裹在容器中 -->
        <div v-else class="preview-container">
          <component
            :is="resolveBuilderComponent(item.key)"
            v-bind="item.props"
            class="preview-component"
          />
        </div>
      </template>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  gap: 0; /* 组件之间的间距由组件自身控制 */
}

/* 固定宽度容器：包裹非全宽组件 */
.preview-container {
  width: 100%;
  margin: 0 auto;
  padding: 2.4rem 1.5rem;
  max-width: 72rem; /* 与前端 container 一致 */
}

.preview-container + .preview-container {
  margin-top: 2.8rem; /* 容器之间的间距 */
}

/* 全宽组件：直接渲染，不包裹容器 */
.preview-component--fullwidth {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* 响应式 */
@media (max-width: 48rem) {
  .preview-container {
    padding: 1.6rem 1rem;
  }
  
  .preview-container + .preview-container {
    margin-top: 2rem;
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
