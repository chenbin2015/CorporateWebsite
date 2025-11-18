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
      <component
        v-for="item in pageItems"
        :key="item.id"
        :is="resolveBuilderComponent(item.key)"
        v-bind="item.props"
        class="runtime-component"
      />
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
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  margin: 0 auto;
  padding: 2.4rem 1.5rem;
  max-width: 72rem;
  gap: 2.8rem;
}

.runtime-content > * {
  width: 100%;
  min-width: 0;
}

@media (max-width: 48rem) {
  .runtime-content {
    padding: 1.6rem 1rem;
    gap: 2rem;
  }
}

.runtime-component {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}
</style>

