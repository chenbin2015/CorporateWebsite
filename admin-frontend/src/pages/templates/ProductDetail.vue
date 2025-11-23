<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { getProject } from '@/services/modules/project'
import { resolveBuilderComponent } from '@/components/builder/runtime/componentRegistry'
import { loadDataSourceData, mergeDataSourceData } from '@/utils/dataSource'
import { ElMessage } from 'element-plus'

const route = useRoute()
const productId = route.params.id
const projectCode = route.query.projectCode

const product = ref(null)
const loading = ref(true)
const error = ref(null)

// 项目模板相关
const useProjectTemplate = ref(false)
const templateItems = ref([])
const projectConfig = ref(null)

// 加载项目配置（检查是否有项目模板）
const loadProjectConfig = async () => {
  if (!projectCode) {
    window.__PROJECT_NAVIGATION_CONFIG__ = null
    return
  }
  
  try {
    const project = await getProject(projectCode)
    projectConfig.value = project
    
    // 检查是否有产品详情页的项目模板
    if (project.detailPageTemplates) {
      try {
        const templates = JSON.parse(project.detailPageTemplates)
        if (templates.product?.schemaData) {
          useProjectTemplate.value = true
          templateItems.value = JSON.parse(templates.product.schemaData)
        } else {
          useProjectTemplate.value = false
          templateItems.value = []
        }
      } catch (e) {
        console.warn('详情页模板配置解析失败', e)
        useProjectTemplate.value = false
        templateItems.value = []
      }
    } else {
      useProjectTemplate.value = false
      templateItems.value = []
    }
    
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
  } catch (error) {
    console.error('加载项目配置失败:', error)
  }
}

// 从接口获取产品详情
const fetchProductDetail = async () => {
  if (!projectCode) {
    error.value = '缺少项目代码参数'
    loading.value = false
    return
  }
  
  try {
    loading.value = true
    error.value = null
    
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    const response = await axios.get(`${apiBaseUrl}/products/${productId}`, {
      params: { projectCode },
    })
    
    if (response.data) {
      product.value = {
        id: response.data.id || productId,
        name: response.data.name || '产品名称',
        description: response.data.description || '产品描述',
        price: response.data.price || '¥0',
        originalPrice: response.data.originalPrice || null,
        image: response.data.image || 'http://localhost:8002/p1.jpg',
        content: response.data.content || '<p>暂无详细内容</p>',
      }
      
      // 将详情数据注入到全局 context，供组件使用
      window.__DETAIL_DATA__ = product.value
    } else {
      error.value = '未找到产品详情'
    }
  } catch (err) {
    console.error('获取产品详情失败:', err)
    error.value = '获取产品详情失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 替换模板中的占位符
const replacePlaceholders = (props, data) => {
  if (!data) return props
  const newProps = { ...props }
  for (const key in newProps) {
    if (typeof newProps[key] === 'string' && newProps[key].startsWith('{{') && newProps[key].endsWith('}}')) {
      const field = newProps[key].slice(2, -2)
      // 支持嵌套字段，如 'author.name'
      const keys = field.split('.')
      let value = data
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          value = undefined
          break
        }
      }
      newProps[key] = value !== undefined ? value : ''
    }
  }
  return newProps
}

// 加载模板数据（如果使用项目模板）
const loadTemplateData = async () => {
  if (!useProjectTemplate.value || !templateItems.value.length || !product.value) return
  
  try {
    const itemsWithDataSource = []
    for (const item of templateItems.value) {
      // 替换占位符
      const itemPropsWithPlaceholders = replacePlaceholders(item.props, product.value)
      let updatedItem = { ...item, props: itemPropsWithPlaceholders }
      
      // 处理数据源
      if (item.props?.dataSourceCode) {
        const dataSourceData = await loadDataSourceData(
          item.props.dataSourceCode,
          item.key
        )
        if (dataSourceData) {
          updatedItem.props = mergeDataSourceData(updatedItem.props, item.key, dataSourceData)
        }
      }
      itemsWithDataSource.push(updatedItem)
    }
    
    templateItems.value = itemsWithDataSource
  } catch (err) {
    console.error('加载模板数据失败:', err)
  }
}

// 判断组件是否为全宽组件
const isFullWidthComponent = (item) => {
  if (item.props?.fullWidth !== undefined) {
    return item.props.fullWidth === true
  }
  const fullWidthComponents = ['MainHeader', 'HeroCarousel', 'Footer', 'VideoBanner']
  return fullWidthComponents.includes(item.key)
}

// 获取组件边距样式
const getComponentMarginStyle = (item) => {
  const margin = item.props?.margin
  if (!margin) return {}
  
  try {
    const parts = margin.trim().split(/\s+/)
    if (parts.length === 1) {
      return { margin: parts[0] }
    } else if (parts.length === 2) {
      return { margin: `${parts[0]} ${parts[1]}` }
    } else if (parts.length === 4) {
      return { margin: margin }
    } else {
      return { margin: parts[0] }
    }
  } catch {
    return {}
  }
}

// 获取组件 props（排除 margin）
const getComponentPropsWithoutMargin = (item) => {
  const props = { ...item.props }
  delete props.margin
  return props
}

// 初始化
const init = async () => {
  loading.value = true
  try {
    await loadProjectConfig()
    await fetchProductDetail()
    if (useProjectTemplate.value) {
      await loadTemplateData()
    }
  } catch (err) {
    console.error('初始化失败:', err)
    error.value = '加载失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  init().then(() => {
    updatePageTitle()
  })
})

onBeforeUnmount(() => {
  delete window.__DETAIL_DATA__
  delete window.__PROJECT_NAVIGATION_CONFIG__
})

// 设置页面标题
const updatePageTitle = () => {
  if (product.value) {
    const pageName = product.value.name || '产品详情'
    const projectName = projectConfig.value?.name || '企业门户'
    document.title = `${pageName} - ${projectName}`
  } else {
    document.title = '产品详情 - 企业门户'
  }
}

// 监听路由参数变化，重新加载数据
watch(
  () => [route.params.id, route.query.projectCode],
  () => {
    init()
  }
)

// 监听product变化，更新页面标题
watch(
  () => product.value,
  () => {
    updatePageTitle()
  },
  { deep: true }
)

// 监听projectConfig变化，更新页面标题
watch(
  () => projectConfig.value,
  () => {
    updatePageTitle()
  },
  { deep: true }
)
</script>

<template>
  <div class="product-detail-page">
    <div v-if="loading" class="container" style="padding: 4rem; text-align: center">
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="container" style="padding: 4rem; text-align: center">
      <p style="color: var(--color-error)">{{ error }}</p>
    </div>

    <div v-else-if="useProjectTemplate && templateItems.length > 0" class="template-content">
      <template v-for="item in templateItems" :key="item.id">
        <div
          v-if="isFullWidthComponent(item)"
          class="template-component-wrapper template-component-wrapper--fullwidth"
          :class="{ 'template-footer-wrapper': item.key === 'Footer' }"
          :style="getComponentMarginStyle(item)"
        >
          <component
            :is="resolveBuilderComponent(item.key)"
            v-bind="getComponentPropsWithoutMargin(item)"
            class="template-component template-component--fullwidth"
          />
        </div>
        <div v-else class="template-container template-component-wrapper" :style="getComponentMarginStyle(item)">
          <component
            :is="resolveBuilderComponent(item.key)"
            v-bind="getComponentPropsWithoutMargin(item)"
            class="template-component"
          />
        </div>
      </template>
    </div>

    <div v-else-if="product" class="container">
      <PageHero
        :title="product.name"
        :subtitle="product.description"
        :background="product.image"
      />
      <article class="product-detail">
        <div class="product-detail__image-wrapper">
          <img :src="product.image" :alt="product.name" class="product-detail__image" />
        </div>

        <div class="product-detail__info">
          <div class="product-detail__price">
            <span class="product-detail__price-current">{{ product.price }}</span>
            <span v-if="product.originalPrice" class="product-detail__price-original">{{ product.originalPrice }}</span>
          </div>

          <div class="product-detail__content" v-html="product.content || '<p>暂无详细内容</p>'"></div>
        </div>
      </article>
    </div>

    <div v-else class="container" style="padding: 4rem; text-align: center">
      <p>未找到产品详情或未配置模板</p>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: var(--color-surface);
}

.template-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  gap: 0;
}

.template-container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  max-width: 72rem;
}

.template-component-wrapper {
  width: 100%;
}

.template-component-wrapper--fullwidth {
  width: 100%;
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
}

.template-component {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.template-component--fullwidth {
  width: 100%;
}

/* Footer吸底：固定在窗口底部 */
.template-footer-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.template-footer-wrapper :deep(.site-footer) {
  margin-top: 0;
}

.template-component--fullwidth :deep(.footer-content),
.template-component--fullwidth :deep(.footer-bottom) {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.product-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.product-detail__image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--color-surface-contrast);
}

.product-detail__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-detail__info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-detail__price {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-detail__price-current {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
}

.product-detail__price-original {
  font-size: 1.2rem;
  color: var(--color-text-tertiary);
  text-decoration: line-through;
}

.product-detail__content {
  line-height: 1.8;
  color: var(--color-text-primary);
}

.product-detail__content :deep(h3) {
  margin: 2rem 0 1rem;
  font-size: 1.3rem;
  color: var(--color-text-primary);
}

.product-detail__content :deep(p) {
  margin: 1rem 0;
}

.product-detail__content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  margin: 1.5rem 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
