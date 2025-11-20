<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { resolveBuilderComponent } from '@/components/builder/runtime/componentRegistry'
import { loadDataSourceData, mergeDataSourceData } from '@/utils/dataSource'

const route = useRoute()

// 使用 computed 来响应式获取路由参数
const projectCode = computed(() => route.params.projectCode)
const pageCode = computed(() => route.params.pageCode)

const pageItems = ref([])
const pageInfo = ref(null)
const loading = ref(true)
const error = ref(null)
const detailData = ref(null) // 详情页的动态数据

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
    } else if (itemType === 'event') {
      // TODO: 实现 event API
      return
    } else if (itemType === 'notice') {
      // TODO: 实现 notice API
      return
    } else if (itemType === 'focus') {
      // TODO: 实现 focus API
      return
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

// 加载项目配置（包含导航配置）
const loadProjectConfig = async () => {
  if (!projectCode.value) return
  
  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    const response = await fetch(`${apiBaseUrl}/projects/${projectCode.value}`)
    if (response.ok) {
      const project = await response.json()
      
      // 将导航配置注入到全局 context，供 MainHeader 组件使用
      if (project.navigationConfig) {
        try {
          const navConfig = JSON.parse(project.navigationConfig)
          window.__PROJECT_NAVIGATION_CONFIG__ = navConfig
        } catch (e) {
          console.warn('导航配置解析失败', e)
          window.__PROJECT_NAVIGATION_CONFIG__ = null
        }
      } else {
        window.__PROJECT_NAVIGATION_CONFIG__ = null
      }
    }
  } catch (error) {
    console.error('加载项目配置失败:', error)
    window.__PROJECT_NAVIGATION_CONFIG__ = null
  }
}

// 加载页面数据
const loadPage = async () => {
  if (!projectCode.value || !pageCode.value) {
    error.value = '页面参数不完整'
    loading.value = false
    return
  }

  loading.value = true
  error.value = null
  
  try {
    // 先加载项目配置（包含导航配置）
    await loadProjectConfig()
    
    // 再加载详情数据（如果是详情页）
    await loadDetailData()
    
    // 调用 API 获取页面数据（运行态应该使用已发布的数据）
    // 使用 fetch 直接调用 API，因为 frontend 可能没有配置 request 工具
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    const response = await fetch(`${apiBaseUrl}/projects/${projectCode.value}/pages/${pageCode.value}`)
    if (!response.ok) {
      throw new Error('加载页面失败')
    }
    
    const page = await response.json()
    pageInfo.value = page

    // 运行态：只使用已发布的数据（publishedSchemaData），不使用草稿数据
    if (page.publishedSchemaData) {
      try {
        const parsed = JSON.parse(page.publishedSchemaData)
        
        // 加载数据源数据
        const itemsWithDataSource = await Promise.all(
          parsed.map(async (item) => {
            let updatedProps = { ...item.props }
            
            // 处理标准 dataSourceCode
            if (item.props?.dataSourceCode) {
              const dataSourceData = await loadDataSourceData(
                item.props.dataSourceCode,
                item.key
              )
              if (dataSourceData) {
                updatedProps = mergeDataSourceData(updatedProps, item.key, dataSourceData)
              }
            }
            
            // 处理 CarouselNewsSplit 的多个数据源
            if (item.key === 'CarouselNewsSplit') {
              // 加载轮播数据源
              if (item.props?.carouselDataSourceCode) {
                const carouselData = await loadDataSourceData(
                  item.props.carouselDataSourceCode,
                  'HeroCarousel' // 使用 HeroCarousel 的转换逻辑
                )
                if (carouselData && carouselData.items) {
                  updatedProps.carouselItems = carouselData.items.map(item => ({
                    title: item.title || '',
                    description: item.summary || '',
                    cover: item.cover || '',
                    action: '了解更多',
                    navigation: { type: 'none' },
                    ...item,
                  }))
                }
              }
              
              // 加载新闻数据源
              if (item.props?.newsDataSourceCode) {
                const newsData = await loadDataSourceData(
                  item.props.newsDataSourceCode,
                  'NewsSection' // 使用 NewsSection 的转换逻辑
                )
                if (newsData && newsData.items) {
                  updatedProps.newsItems = newsData.items
                }
              }
            }
            
            return {
              ...item,
              props: updatedProps,
            }
          })
        )
        
        pageItems.value = itemsWithDataSource
      } catch (e) {
        console.error('Failed to parse schema data:', e)
        pageItems.value = []
        error.value = '页面数据格式错误'
      }
    } else {
      pageItems.value = []
      error.value = '页面尚未发布，无法查看运行态'
    }
  } catch (err) {
    console.error('Failed to load page:', err)
    error.value = '加载页面失败'
  } finally {
    loading.value = false
  }
}

// 判断组件是否为全宽组件
const isFullWidthComponent = (item) => {
  // 1. 优先检查用户配置的 fullWidth 属性
  if (item.props?.fullWidth !== undefined) {
    return item.props.fullWidth === true
  }
  // 2. 如果没有配置，使用默认规则：MainHeader、HeroCarousel、Footer 默认为全宽
  const fullWidthComponents = ['MainHeader', 'HeroCarousel', 'Footer']
  return fullWidthComponents.includes(item.key)
}

// 计算运行时内容区域的样式（如果 MainHeader 是固定的，需要添加 padding-top）
const runtimeContentStyle = computed(() => {
  const styles = {}

  // 查找 MainHeader 组件，检查是否 fixed
  const mainHeader = pageItems.value.find(item => item.key === 'MainHeader')
  if (mainHeader?.props?.fixed) {
    // MainHeader 固定时，需要为内容添加顶部间距，避免被遮挡
    // 根据 MainHeader 的实际高度动态计算（品牌区域 + 导航区域，大约 120-140px）
    styles.paddingTop = '140px'
  }

  return styles
})

// 获取组件的 margin 样式（从 props 中读取 margin 配置）
const getComponentMarginStyle = (item) => {
  const styles = {}
  
  // 从 props 中读取 margin 配置
  const margin = item.props?.margin
  if (margin) {
    // 支持多种格式：
    // 1. 字符串：'2.4rem 1.5rem' 或 '2.4rem' 或 '2.4rem auto'
    // 2. 对象：{ top: '2.4rem', right: '1.5rem', bottom: '2.4rem', left: '1.5rem' }
    if (typeof margin === 'string') {
      styles.margin = margin
    } else if (typeof margin === 'object') {
      if (margin.top !== undefined) styles.marginTop = margin.top
      if (margin.right !== undefined) styles.marginRight = margin.right
      if (margin.bottom !== undefined) styles.marginBottom = margin.bottom
      if (margin.left !== undefined) styles.marginLeft = margin.left
    }
  } else {
    // 默认 margin（如果没有配置）：上下 2.4rem，左右 auto（居中）
    styles.margin = '2.4rem auto'
  }
  
  return styles
}

// 获取组件 props，排除 margin（避免 margin 作为 HTML 属性传递）
const getComponentPropsWithoutMargin = (item) => {
  const props = { ...item.props }
  // 移除 margin，因为它已经通过 style 应用了
  delete props.margin
  return props
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
  loadPage()
})

// 组件卸载时清理全局数据
onBeforeUnmount(() => {
  delete window.__DETAIL_DATA__
  delete window.__PROJECT_NAVIGATION_CONFIG__
})
</script>

<template>
  <div class="runtime-page">
    <div v-if="loading" class="runtime-loading">
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="runtime-error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="pageItems.length === 0" class="runtime-empty">
      <p>页面暂无内容</p>
    </div>
    <div v-else class="runtime-content" :style="runtimeContentStyle">
      <template v-for="item in pageItems" :key="item.id">
        <!-- 全宽组件：直接渲染，不包裹容器，但应用 margin 样式 -->
        <div
          v-if="isFullWidthComponent(item)"
          class="runtime-component-wrapper runtime-component-wrapper--fullwidth"
          :style="getComponentMarginStyle(item)"
        >
          <component
            :is="resolveBuilderComponent(item.key)"
            v-bind="getComponentPropsWithoutMargin(item)"
            class="runtime-component runtime-component--fullwidth"
          />
        </div>
        <!-- 固定宽度组件：包裹在容器中 -->
        <div v-else class="runtime-container runtime-component-wrapper" :style="getComponentMarginStyle(item)">
          <component
            :is="resolveBuilderComponent(item.key)"
            v-bind="getComponentPropsWithoutMargin(item)"
            class="runtime-component"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.runtime-page {
  min-height: 100vh;
  background: var(--color-surface);
  width: 100%;
  margin: 0;
  padding: 0;
}

.runtime-loading,
.runtime-error,
.runtime-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: var(--color-text-secondary);
}

.runtime-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  gap: 0; /* 组件之间的间距由组件自身控制 */
}

/* 固定宽度容器：包裹非全宽组件 */
.runtime-container {
  width: 100%;
  margin: 0 auto;
  padding: 0; /* 移除自动 padding，由组件自己控制 */
  max-width: 72rem;
}

.runtime-container + .runtime-container {
  margin-top: 0; /* 移除自动间距，由组件自己控制 */
}

/* 组件包装器 */
.runtime-component-wrapper {
  width: 100%;
}

.runtime-component-wrapper--fullwidth {
  width: 100%;
}

/* 全宽组件：直接渲染，不包裹容器 */
.runtime-component--fullwidth {
  width: 100%;
  margin: 0;
  padding: 0;
}

@media (max-width: 48rem) {
  .runtime-container {
    padding: 0; /* 移除自动 padding，由组件自己控制 */
  }
  
  .runtime-container + .runtime-container {
    margin-top: 0; /* 移除自动间距，由组件自己控制 */
  }
}

.runtime-component {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}
</style>

