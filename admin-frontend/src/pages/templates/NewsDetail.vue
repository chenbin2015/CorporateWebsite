<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PageHero from '@shared/components/PageHero.vue'
import TextImageSection from '@shared/components/TextImageSection.vue'

const route = useRoute()
const newsId = route.params.id
const projectCode = route.query.projectCode // 从查询参数获取 projectCode

const news = ref(null)
const loading = ref(true)
const error = ref(null)

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

onMounted(() => {
  fetchNewsDetail()
})
</script>

<template>
  <div class="news-detail-page">
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
  </div>
</template>

<style scoped>
.news-detail-page {
  min-height: 100vh;
  background: var(--color-surface);
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
</style>

