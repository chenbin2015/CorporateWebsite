<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPage, getProject } from '@/services/modules/project'
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
const projectConfig = ref(null) // 项目配置（包含导航配置）

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

// 加载项目配置（包含导航配置）
const loadProjectConfig = async () => {
  if (!projectCode.value) {
    // 如果没有 projectCode，清理导航配置
    window.__PROJECT_NAVIGATION_CONFIG__ = null
    return
  }
  
  try {
    const project = await getProject(projectCode.value)
    projectConfig.value = project
    
    // 将导航配置注入到全局 context，供 MainHeader 组件使用
    if (project.navigationConfig) {
      try {
        const navConfig = JSON.parse(project.navigationConfig)
        window.__PROJECT_NAVIGATION_CONFIG__ = navConfig
        console.log('[PagePreview] 加载项目导航配置:', projectCode.value, navConfig)
      } catch (e) {
        console.warn('导航配置解析失败', e)
        window.__PROJECT_NAVIGATION_CONFIG__ = null
      }
    } else {
      window.__PROJECT_NAVIGATION_CONFIG__ = null
      console.log('[PagePreview] 项目没有导航配置:', projectCode.value)
    }
  } catch (error) {
    console.error('加载项目配置失败:', error)
    window.__PROJECT_NAVIGATION_CONFIG__ = null
  }
}

// 加载页面数据
const loadPage = async () => {
  if (!projectCode.value || !pageCode.value) return

  loading.value = true
  try {
    // 先加载项目配置（包含导航配置）
    await loadProjectConfig()
    
    // 再加载详情数据（如果是详情页）
    await loadDetailData()
    
    const page = await getPage(projectCode.value, pageCode.value)
    pageInfo.value = page

    // 调试：打印接口返回的原始数据
    console.log('[PagePreview] 接口返回的完整 page 对象:', JSON.parse(JSON.stringify(page)))
    console.log('[PagePreview] page.schemaData (预览态使用):', page.schemaData)
    console.log('[PagePreview] page.publishedSchemaData (运行态使用):', page.publishedSchemaData)

    // 运行态只使用 publishedSchemaData（已发布数据），预览态使用 schemaData（草稿数据）
    let schemaData = null
    if (isRuntime.value) {
      // 运行态：只使用已发布的数据，如果没有发布则提示
      if (page.publishedSchemaData) {
        schemaData = page.publishedSchemaData
        console.log('[PagePreview] 运行态：使用 publishedSchemaData')
      } else {
        pageItems.value = []
        ElMessage.warning('页面尚未发布，无法查看运行态')
        return
      }
    } else {
      // 预览态：使用草稿数据
      schemaData = page.schemaData
      console.log('[PagePreview] 预览态：使用 schemaData (草稿数据)')
    }
    
    console.log('[PagePreview] 最终使用的 schemaData:', schemaData)

    if (schemaData) {
      try {
        const parsed = JSON.parse(schemaData)
        
        // 调试：打印原始解析的数据
        const mainHeaderItem = parsed.find(item => item.key === 'MainHeader')
        if (mainHeaderItem) {
          console.log('[PagePreview] 从接口获取的原始 MainHeader 数据:', JSON.parse(JSON.stringify(mainHeaderItem)))
          console.log('[PagePreview] 原始 MainHeader props.fixed:', mainHeaderItem.props?.fixed)
        }
        
        // 加载数据源数据，并为旧数据补充默认值
        const itemsWithDataSource = await Promise.all(
          parsed.map(async (item) => {
            // 为 MainHeader 补充缺失的字段（兼容旧数据）
            if (item.key === 'MainHeader' && item.props) {
              // 如果缺少 fixed 字段，使用默认值 false
              if (item.props.fixed === undefined) {
                item.props.fixed = false
              }
              // 如果缺少 backgroundOpacity 字段，使用默认值 1
              if (item.props.backgroundOpacity === undefined) {
                item.props.backgroundOpacity = 1
              }
              // 如果缺少 navBackgroundColor 字段，使用默认值
              if (!item.props.navBackgroundColor) {
                item.props.navBackgroundColor = '#2d3748'
              }
              // 如果缺少 showSearch 字段，使用默认值 false
              if (item.props.showSearch === undefined) {
                item.props.showSearch = false
              }
              // 如果缺少 defaultActiveIndex 字段，使用默认值 0
              if (item.props.defaultActiveIndex === undefined) {
                item.props.defaultActiveIndex = 0
              }
            }
            
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
                console.log('[PagePreview] 加载新闻数据源:', item.props.newsDataSourceCode)
                const newsData = await loadDataSourceData(
                  item.props.newsDataSourceCode,
                  'NewsSection' // 使用 NewsSection 的转换逻辑
                )
                console.log('[PagePreview] 新闻数据源加载结果:', newsData)
                if (newsData && newsData.items) {
                  updatedProps.newsItems = newsData.items
                  console.log('[PagePreview] 设置 newsItems:', updatedProps.newsItems)
                } else {
                  console.warn('[PagePreview] 新闻数据源加载失败或数据格式不正确:', { newsData, hasItems: newsData?.items })
                }
              }
            }
            
            console.log('[PagePreview] CarouselNewsSplit 最终 props:', updatedProps)
            
            return {
              ...item,
              props: updatedProps,
            }
          })
        )
        
        pageItems.value = itemsWithDataSource
        // 调试：检查 fullWidth 属性和 detailPage 配置
        itemsWithDataSource.forEach((item) => {
          if (item.key === 'MainHeader' || item.key === 'HeroCarousel') {
            console.log(`[PagePreview] ${item.key} fullWidth:`, item.props?.fullWidth)
            if (item.key === 'MainHeader') {
              console.log(`[PagePreview] MainHeader 完整 props:`, JSON.parse(JSON.stringify(item.props)))
              console.log(`[PagePreview] MainHeader fixed:`, item.props?.fixed, typeof item.props?.fixed)
              console.log(`[PagePreview] MainHeader backgroundOpacity:`, item.props?.backgroundOpacity)
            }
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

// 获取 SideNav 和 ContentDetail 的索引
const getSideNavLayoutIndices = () => {
  const sideNavIndex = pageItems.value.findIndex(item => item.key === 'SideNav')
  const contentDetailIndex = pageItems.value.findIndex(item => item.key === 'ContentDetail')
  if (sideNavIndex !== -1 && contentDetailIndex !== -1 && contentDetailIndex === sideNavIndex + 1) {
    return { sideNavIndex, contentDetailIndex }
  }
  return null
}

// 计算预览内容区域的样式（如果 MainHeader 是固定的，需要添加 padding-top）
const previewContentStyle = computed(() => {
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
  delete window.__PROJECT_NAVIGATION_CONFIG__
  
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
    <div v-else class="preview-content" :style="previewContentStyle">
      <template v-for="(item, index) in pageItems" :key="item.id">
        <!-- SideNav 和 ContentDetail 组合：左右布局 -->
        <template v-if="item.key === 'SideNav' && getSideNavLayoutIndices()?.sideNavIndex === index">
          <div class="preview-side-nav-layout preview-component-wrapper" :style="getComponentMarginStyle(item)">
            <div class="preview-side-nav-container">
              <component
                :is="resolveBuilderComponent(item.key)"
                v-bind="getComponentPropsWithoutMargin(item)"
                class="preview-component preview-component--side-nav"
              />
            </div>
            <div class="preview-content-detail-container">
              <component
                :is="resolveBuilderComponent(pageItems[index + 1].key)"
                v-bind="getComponentPropsWithoutMargin(pageItems[index + 1])"
                class="preview-component preview-component--content-detail"
              />
            </div>
          </div>
        </template>
        <!-- 跳过 ContentDetail（如果它紧跟在 SideNav 后面，已经在上面渲染了） -->
        <template v-else-if="item.key === 'ContentDetail' && getSideNavLayoutIndices()?.contentDetailIndex === index">
          <!-- 已经在 SideNav 布局中渲染，跳过 -->
        </template>
        <!-- 全宽组件：直接渲染，不包裹容器，但应用 margin 样式 -->
        <div
          v-else-if="isFullWidthComponent(item)"
          class="preview-component-wrapper preview-component-wrapper--fullwidth"
          :class="{ 'preview-footer-wrapper': item.key === 'Footer' }"
          :style="getComponentMarginStyle(item)"
        >
          <component
            :is="resolveBuilderComponent(item.key)"
            v-bind="getComponentPropsWithoutMargin(item)"
            class="preview-component preview-component--fullwidth"
          />
        </div>
        <!-- 固定宽度组件：包裹在容器中 -->
        <div v-else class="preview-container preview-component-wrapper" :style="getComponentMarginStyle(item)">
          <component
            :is="resolveBuilderComponent(item.key)"
            v-bind="getComponentPropsWithoutMargin(item)"
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
  background: var(--color-surface);
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
  padding: 0;
  max-width: 72rem;
}

.preview-container + .preview-container {
  margin-top: 0; /* 移除自动间距，由组件自己控制 */
}

/* 组件包装器 */
.preview-component-wrapper {
  width: 100%;
}

.preview-component-wrapper--fullwidth {
  width: 100%;
}

/* 全宽组件：直接渲染，不包裹容器 */
.preview-component--fullwidth {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* 非全宽模式下的 MainHeader、HeroCarousel、Footer 需要居中 */
.preview-container :deep(.main-header) {
  width: 100% !important;
  max-width: 72rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  position: relative !important;
}

.preview-container :deep(.main-header--fixed) {
  position: relative !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
}

.preview-container :deep(.hero-carousel) {
  width: 100%;
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
}

.preview-container :deep(.site-footer) {
  width: 100%;
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
}

/* 非全宽模式下的 MainHeader 容器 */
.preview-container :deep(.main-header__container),
.preview-container :deep(.main-header__nav .nav-list) {
  max-width: 100%;
}

/* 非全宽模式下的 HeroCarousel 内容居中 */
.preview-container :deep(.hero-carousel__overlay) {
  justify-content: center;
}

.preview-container :deep(.hero-carousel__content) {
  margin: 0 auto;
}

/* Footer吸底：固定在窗口底部 */
.preview-footer-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.preview-footer-wrapper :deep(.site-footer) {
  margin-top: 0;
}

/* Footer 内容区域样式，与详情页保持一致 */
.preview-component--fullwidth :deep(.footer-content),
.preview-component--fullwidth :deep(.footer-bottom) {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
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

/* 确保 MainHeader 的标题和副标题正常显示 */
.preview-component :deep(.main-header .brand-text),
.preview-component :deep(.main-header .brand-title),
.preview-component :deep(.main-header .brand-subtitle) {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  height: auto !important;
  width: auto !important;
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

/* 确保 MainHeader 的标题和副标题正常显示（优先级最高） */
.preview-component :deep(.main-header .brand-text),
.preview-component :deep(.main-header .brand-title),
.preview-component :deep(.main-header .brand-subtitle) {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  height: auto !important;
  width: auto !important;
  color: #2d3748 !important;
  font-size: inherit !important;
}

/* 确保组件内部 section 等元素有合适的样式 */
.preview-component :deep(section) {
  width: 100%;
  margin: 0;
}

/* SideNav 和 ContentDetail 左右布局 */
.preview-side-nav-layout {
  display: flex;
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  gap: 0;
  align-items: flex-start;
}

.preview-side-nav-container {
  flex-shrink: 0;
}

.preview-content-detail-container {
  flex: 1;
  min-width: 0;
}

.preview-component--side-nav {
  width: auto;
  height: 100%;
}

.preview-component--content-detail {
  width: 100%;
}

@media (max-width: 768px) {
  .preview-side-nav-layout {
    flex-direction: column;
  }
  
  .preview-side-nav-container {
    width: 100%;
  }
  
  .preview-content-detail-container {
    width: 100%;
  }
}
</style>
