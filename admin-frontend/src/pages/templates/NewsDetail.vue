<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { getProject } from '@/services/modules/project'
import { resolveBuilderComponent } from '@/components/builder/runtime/componentRegistry'
import { loadDataSourceData, mergeDataSourceData } from '@/utils/dataSource'
import PageHero from '@shared/components/PageHero.vue'
import TextImageSection from '@shared/components/TextImageSection.vue'

const route = useRoute()
const newsId = route.params.id
const projectCode = route.query.projectCode // 从查询参数获取 projectCode

const news = ref(null)
const loading = ref(true)
const error = ref(null)

// 项目模板相关
const useProjectTemplate = ref(false)
const templateItems = ref([])
const projectConfig = ref(null)

// 加载项目配置（检查是否有项目模板）
const loadProjectConfig = async () => {
  if (!projectCode) return
  
  try {
    const project = await getProject(projectCode)
    projectConfig.value = project
    
    // 检查是否有新闻详情页的项目模板
    if (project.detailPageTemplates) {
      try {
        const templates = JSON.parse(project.detailPageTemplates)
        const newsTemplate = templates.news
        if (newsTemplate?.schemaData) {
          useProjectTemplate.value = true
          // 解析模板数据
          templateItems.value = JSON.parse(newsTemplate.schemaData)
          console.log('[NewsDetail] 使用项目模板:', templateItems.value)
        } else {
          useProjectTemplate.value = false
          templateItems.value = []
        }
      } catch (e) {
        console.warn('项目模板配置解析失败', e)
        useProjectTemplate.value = false
        templateItems.value = []
      }
    } else {
      useProjectTemplate.value = false
      templateItems.value = []
    }
    
    // 加载导航配置
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

// 从接口获取新闻详情
const fetchNewsDetail = async () => {
  if (!projectCode) {
    error.value = '缺少项目代码参数'
    loading.value = false
    return
  }
  
  try {
    loading.value = true
    error.value = null
    
    // 调用接口获取新闻详情
    // 接口会从项目下所有页面的 schema_data 中查找对应的新闻项
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    const response = await axios.get(`${apiBaseUrl}/news/${newsId}`, {
      params: { projectCode },
    })
    
    if (response.data) {
      news.value = {
        id: response.data.id || newsId,
        title: response.data.title || '新闻标题',
        subtitle: response.data.summary || response.data.subtitle || '新闻副标题',
        date: response.data.date || '2025-01-01',
        author: response.data.author || '新闻中心',
        cover: response.data.cover || response.data.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        content: response.data.content || '<p>这是新闻详情内容。</p>',
        tags: response.data.tags || (response.data.category ? [response.data.category] : ['新闻']),
      }
      
      // 将详情数据注入到全局 context，供组件使用
      window.__DETAIL_DATA__ = news.value
    } else {
      error.value = '未找到新闻详情'
    }
  } catch (err) {
    console.error('获取新闻详情失败:', err)
    error.value = '获取新闻详情失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 替换 props 中的占位符为实际数据
const replacePlaceholders = (props, detailData) => {
  if (!detailData || !props) return props
  
  const replaced = { ...props }
  
  // 遍历所有 props，查找占位符并替换
  for (const key in replaced) {
    const value = replaced[key]
    if (typeof value === 'string' && value.startsWith('{{') && value.endsWith('}}')) {
      // 提取字段名，如 {{title}} -> title
      const fieldName = value.slice(2, -2).trim()
      // 从详情数据中获取对应字段的值
      replaced[key] = detailData[fieldName] || value
    }
  }
  
  return replaced
}

// 加载模板数据（如果使用项目模板）
const loadTemplateData = async () => {
  if (!useProjectTemplate.value || !templateItems.value.length) return
  
  try {
    // 处理数据源和占位符替换
    const itemsWithDataSource = []
    for (const item of templateItems.value) {
      let updatedItem = { ...item }
      
      // 先替换占位符（如果有详情数据）
      if (news.value) {
        updatedItem.props = replacePlaceholders(updatedItem.props, news.value)
      }
      
      // 然后处理数据源
      if (updatedItem.props?.dataSourceCode) {
        const dataSourceData = await loadDataSourceData(
          updatedItem.props.dataSourceCode,
          updatedItem.key
        )
        if (dataSourceData) {
          updatedItem.props = mergeDataSourceData(updatedItem.props, updatedItem.key, dataSourceData)
        }
      }
      
      itemsWithDataSource.push(updatedItem)
    }
    
    templateItems.value = itemsWithDataSource
    console.log('[NewsDetail] 模板数据加载完成:', templateItems.value)
  } catch (err) {
    console.error('加载模板数据失败:', err)
  }
}

// 判断组件是否为全宽组件
const isFullWidthComponent = (item) => {
  if (item.props?.fullWidth !== undefined) {
    return item.props.fullWidth === true
  }
  const fullWidthComponents = ['MainHeader', 'HeroCarousel', 'Footer']
  return fullWidthComponents.includes(item.key)
}

// 获取组件边距样式
const getComponentMarginStyle = (item) => {
  const margin = item.props?.margin
  if (!margin) return {}
  
  try {
    // 支持多种格式：'10px', '10px 20px', '10px 20px 30px 40px'
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

// Mock 数据 - 实际应该从 API 获取
const mockNews = {
  '1': {
    id: '1',
    title: '智慧校园建设取得重大突破',
    subtitle: '数字化校园管理平台正式上线',
    date: '2025-01-15',
    author: '新闻中心',
    cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    content: `
      <p>经过数月的精心筹备，我校智慧校园建设取得重大突破。全新的数字化校园管理平台于今日正式上线，为广大师生提供更加便捷、高效的服务体验。</p>
      
      <h3>平台特色功能</h3>
      <p>新平台集成了教学管理、学生服务、后勤保障等多个模块，实现了校园生活的全方位数字化覆盖。师生可以通过统一的门户访问各类服务，大大提升了办事效率。</p>
      
      <h3>未来规划</h3>
      <p>学校将继续推进智慧校园建设，计划在未来一年内完成更多功能模块的开发与部署，打造更加智能、便捷的校园环境。</p>
    `,
    tags: ['智慧校园', '数字化', '平台上线'],
  },
  '2': {
    id: '2',
    title: '2025年度科研项目申报启动',
    subtitle: '支持多领域创新研究',
    date: '2025-01-10',
    author: '科研处',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    content: `
      <p>2025年度科研项目申报工作正式启动。本次申报面向全校教师开放，支持多个学科领域的创新研究项目。</p>
      
      <h3>申报要求</h3>
      <p>申报项目需具有创新性、前瞻性和实用性，能够推动学科发展，服务社会需求。项目负责人需具备相应的研究能力和条件。</p>
      
      <h3>支持领域</h3>
      <p>本次申报涵盖自然科学、工程技术、人文社科等多个领域，鼓励跨学科合作研究。</p>
    `,
    tags: ['科研项目', '申报', '创新研究'],
  },
}

// 初始化
const init = async () => {
  loading.value = true
  try {
    // 先加载项目配置（检查是否有项目模板）
    await loadProjectConfig()
    
    // 加载新闻详情数据
    await fetchNewsDetail()
    
    // 如果使用项目模板，加载模板数据（必须在详情数据加载后）
    if (useProjectTemplate.value && news.value) {
      await loadTemplateData()
    }
  } catch (err) {
    console.error('初始化失败:', err)
    error.value = '加载失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 设置页面标题
const updatePageTitle = () => {
  if (news.value) {
    const pageName = news.value.title || '新闻详情'
    const projectName = projectConfig.value?.name || '企业门户'
    document.title = `${pageName} - ${projectName}`
  } else {
    document.title = '新闻详情 - 企业门户'
  }
}

// 监听news变化，更新页面标题
watch(
  () => news.value,
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

onMounted(() => {
  init().then(() => {
    updatePageTitle()
  })
})

onBeforeUnmount(() => {
  delete window.__DETAIL_DATA__
  delete window.__PROJECT_NAVIGATION_CONFIG__
})
</script>

<template>
  <div class="news-detail-page">
    <!-- 使用项目模板 -->
    <div v-if="useProjectTemplate && templateItems.length > 0" class="template-content">
      <template v-for="item in templateItems" :key="item.id">
        <!-- 全宽组件 -->
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
        <!-- 固定宽度组件 -->
        <div v-else class="template-container template-component-wrapper" :style="getComponentMarginStyle(item)">
          <component
            :is="resolveBuilderComponent(item.key)"
            v-bind="getComponentPropsWithoutMargin(item)"
            class="template-component"
          />
        </div>
      </template>
    </div>
    
    <!-- 使用默认模板 -->
    <template v-else>
      <PageHero
        v-if="news"
        :title="news.title"
        :subtitle="news.subtitle"
        :background="news.cover"
      />

      <div v-if="loading" class="container" style="padding: 4rem; text-align: center">
        <p>加载中...</p>
      </div>

      <div v-else-if="error" class="container" style="padding: 4rem; text-align: center">
        <p style="color: var(--color-error)">{{ error }}</p>
      </div>

      <div v-else-if="news" class="container">
        <article class="news-detail">
          <div class="news-detail__meta">
            <time class="news-detail__date">{{ news.date }}</time>
            <span class="news-detail__author">作者：{{ news.author }}</span>
            <div class="news-detail__tags">
              <span v-for="tag in news.tags" :key="tag" class="news-detail__tag">{{ tag }}</span>
            </div>
          </div>

          <div class="news-detail__content" v-html="news.content"></div>
        </article>
      </div>
    </template>
  </div>
</template>

<style scoped>
.news-detail-page {
  min-height: 100vh;
  background: var(--color-surface);
  padding-bottom: 320px; /* footer高度约300px + 20px间距 */
}

/* 使用项目模板时的内容区域样式 */
.template-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  gap: 0;
}

.news-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 0;
}

.news-detail__meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.news-detail__date {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.news-detail__author {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.news-detail__tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.news-detail__tag {
  padding: 0.25rem 0.75rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
}

.news-detail__content {
  line-height: 1.8;
  color: var(--color-text-primary);
}

.news-detail__content :deep(h3) {
  margin: 2rem 0 1rem;
  font-size: 1.3rem;
  color: var(--color-text-primary);
}

.news-detail__content :deep(p) {
  margin: 1rem 0;
}

.news-detail__content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  margin: 1.5rem 0;
}

/* 项目模板样式 */
.template-component-wrapper {
  width: 100%;
}

.template-component-wrapper--fullwidth {
  width: 100%;
}

.template-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.template-component {
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
</style>

