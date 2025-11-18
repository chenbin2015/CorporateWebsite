<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { resolveBuilderComponent } from '@/components/builder/runtime/componentRegistry'

const route = useRoute()

// 使用 computed 来响应式获取路由参数
const projectCode = computed(() => route.params.projectCode)
const pageCode = computed(() => route.params.pageCode)

const pageItems = ref([])
const pageInfo = ref(null)
const loading = ref(true)
const error = ref(null)

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
        pageItems.value = JSON.parse(page.publishedSchemaData)
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

// 监听路由参数变化，重新加载页面数据
watch(
  () => [route.params.projectCode, route.params.pageCode],
  () => {
    loadPage()
  },
  { immediate: false }
)

onMounted(() => {
  loadPage()
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
    <div v-else class="runtime-content">
      <template v-for="item in pageItems" :key="item.id">
        <!-- 全宽组件：直接渲染，不包裹容器 -->
        <component
          v-if="isFullWidthComponent(item)"
          :is="resolveBuilderComponent(item.key)"
          v-bind="item.props"
          class="runtime-component runtime-component--fullwidth"
        />
        <!-- 固定宽度组件：包裹在容器中 -->
        <div v-else class="runtime-container">
          <component
            :is="resolveBuilderComponent(item.key)"
            v-bind="item.props"
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
  padding: 2.4rem 1.5rem;
  max-width: 72rem;
}

.runtime-container + .runtime-container {
  margin-top: 2.8rem; /* 容器之间的间距 */
}

/* 全宽组件：直接渲染，不包裹容器 */
.runtime-component--fullwidth {
  width: 100%;
  margin: 0;
  padding: 0;
}

@media (max-width: 48rem) {
  .runtime-container {
    padding: 1.6rem 1rem;
  }
  
  .runtime-container + .runtime-container {
    margin-top: 2rem;
  }
}

.runtime-component {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}
</style>

