<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Folder,
  Document,
  Box,
  Check,
  Clock,
  TrendCharts,
  User,
  Files,
  Plus,
} from '@element-plus/icons-vue'
import { fetchProjects } from '@/services/modules/project'

const router = useRouter()

const projects = ref([])
const loading = ref(false)

// 统计数据
const stats = computed(() => {
  const totalProjects = projects.value.length
  const totalPages = projects.value.reduce((sum, p) => sum + (p.pageCount || 0), 0)
  const publishedPages = projects.value.reduce((sum, p) => sum + (p.publishedPageCount || 0), 0)
  const totalDataSources = projects.value.reduce((sum, p) => sum + (p.dataSourceCount || 0), 0)
  
  return {
    totalProjects,
    totalPages,
    publishedPages,
    draftPages: totalPages - publishedPages,
    totalDataSources,
  }
})

// 统计卡片数据
const statCards = computed(() => [
  {
    label: '项目总数',
    value: stats.value.totalProjects,
    icon: Folder,
    color: '#409EFF',
    bgColor: '#ECF5FF',
    trend: '+12%',
  },
  {
    label: '页面总数',
    value: stats.value.totalPages,
    icon: Document,
    color: '#67C23A',
    bgColor: '#F0F9FF',
    trend: '+8%',
  },
  {
    label: '已发布页面',
    value: stats.value.publishedPages,
    icon: Check,
    color: '#67C23A',
    bgColor: '#F0F9FF',
    trend: `占比 ${stats.value.totalPages > 0 ? Math.round((stats.value.publishedPages / stats.value.totalPages) * 100) : 0}%`,
  },
  {
    label: '数据源总数',
    value: stats.value.totalDataSources,
    icon: Box,
    color: '#E6A23C',
    bgColor: '#FDF6EC',
    trend: '+5%',
  },
])

// 项目状态分布数据
const projectStatusData = computed(() => {
  const statusCount = {
    active: 0,
    archived: 0,
    draft: 0,
  }
  
  projects.value.forEach((project) => {
    if (project.status === 'ACTIVE') {
      statusCount.active++
    } else if (project.status === 'ARCHIVED') {
      statusCount.archived++
    } else {
      statusCount.draft++
    }
  })
  
  return [
    { label: '运行中', value: statusCount.active, color: '#67C23A' },
    { label: '已归档', value: statusCount.archived, color: '#909399' },
    { label: '草稿', value: statusCount.draft, color: '#E6A23C' },
  ]
})

// 页面状态分布数据
const pageStatusData = computed(() => {
  return [
    { label: '已发布', value: stats.value.publishedPages, color: '#67C23A' },
    { label: '草稿', value: stats.value.draftPages, color: '#E6A23C' },
  ]
})

// 最近项目（按更新时间排序）
const recentProjects = computed(() => {
  return [...projects.value]
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0)
      const dateB = new Date(b.updatedAt || b.createdAt || 0)
      return dateB - dateA
    })
    .slice(0, 5)
})

// 加载项目列表
const loadProjects = async () => {
  loading.value = true
  try {
    const response = await fetchProjects()
    const projectsList = response.data || response || []
    
    // 为每个项目加载页面数量和数据源数量
    projects.value = await Promise.all(
      projectsList.map(async (project) => {
        try {
          // 加载页面列表以获取页面数量
          const { fetchProjectPages } = await import('@/services/modules/project')
          const pages = await fetchProjectPages(project.code)
          const pageCount = pages?.length || 0
          const publishedPageCount = pages?.filter((p) => p.status === 'PUBLISHED').length || 0
          
          // 加载数据源（如果有API）
          // const dataSources = await fetchDataSources(project.code)
          // const dataSourceCount = dataSources?.length || 0
          const dataSourceCount = 0 // 暂时设为0，等有API后再实现
          
          return {
            ...project,
            pageCount,
            publishedPageCount,
            dataSourceCount,
          }
        } catch (error) {
          console.warn(`Failed to load stats for project ${project.code}:`, error)
          return {
            ...project,
            pageCount: 0,
            publishedPageCount: 0,
            dataSourceCount: 0,
          }
        }
      })
    )
  } catch (error) {
    console.error('Failed to load projects:', error)
    ElMessage.error('加载项目列表失败')
    projects.value = []
  } finally {
    loading.value = false
  }
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  if (hours < 24) return `${hours} 小时前`
  if (days < 7) return `${days} 天前`
  return date.toLocaleDateString('zh-CN')
}

// 跳转到项目
const goToProject = (project) => {
  const url = router.resolve({
    name: 'projects',
    params: { projectCode: project.code },
  })
  window.open(url.href, '_blank')
}

// 创建新项目
const handleCreateProject = () => {
  const url = router.resolve({ name: 'projectCreate' })
  window.open(url.href, '_blank')
}

onMounted(() => {
  loadProjects()
})
</script>

<template>
  <div class="dashboard" v-loading="loading">
    <!-- 头部 -->
    <header class="dashboard__header">
      <div>
        <h1>欢迎回来 👋</h1>
        <p>查看项目进度与最近操作。</p>
      </div>
      <el-button type="primary" @click="handleCreateProject">
        <el-icon><Plus /></el-icon>
        新建项目
      </el-button>
    </header>

    <!-- 统计卡片 -->
    <section class="dashboard__cards">
      <el-card
        v-for="card in statCards"
        :key="card.label"
        class="stat-card"
        :style="{ '--card-color': card.color, '--card-bg': card.bgColor }"
      >
        <div class="stat-card__content">
          <div class="stat-card__icon" :style="{ backgroundColor: card.bgColor, color: card.color }">
            <el-icon :size="24">
              <component :is="card.icon" />
            </el-icon>
          </div>
          <div class="stat-card__info">
            <p class="stat-card__value">{{ card.value }}</p>
            <p class="stat-card__label">{{ card.label }}</p>
            <p class="stat-card__trend">{{ card.trend }}</p>
          </div>
        </div>
      </el-card>
    </section>

    <!-- 图表和最近项目 -->
    <div class="dashboard__main">
      <!-- 左侧：图表区域 -->
      <div class="dashboard__charts">
        <!-- 项目状态分布 -->
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>项目状态分布</span>
              <el-icon><TrendCharts /></el-icon>
            </div>
          </template>
          <div class="chart-content">
            <div class="chart-legend">
              <div
                v-for="item in projectStatusData"
                :key="item.label"
                class="legend-item"
              >
                <span class="legend-color" :style="{ backgroundColor: item.color }"></span>
                <span class="legend-label">{{ item.label }}</span>
                <span class="legend-value">{{ item.value }}</span>
              </div>
            </div>
            <div class="chart-bars">
              <div
                v-for="item in projectStatusData"
                :key="item.label"
                class="chart-bar-item"
              >
                <div class="chart-bar-label">{{ item.label }}</div>
                <div class="chart-bar-container">
                  <div
                    class="chart-bar"
                    :style="{
                      width: `${stats.totalProjects > 0 ? (item.value / stats.totalProjects) * 100 : 0}%`,
                      backgroundColor: item.color,
                    }"
                  >
                    <span class="chart-bar-value">{{ item.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 页面状态分布 -->
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>页面状态分布</span>
              <el-icon><Files /></el-icon>
            </div>
          </template>
          <div class="chart-content">
            <div class="chart-legend">
              <div
                v-for="item in pageStatusData"
                :key="item.label"
                class="legend-item"
              >
                <span class="legend-color" :style="{ backgroundColor: item.color }"></span>
                <span class="legend-label">{{ item.label }}</span>
                <span class="legend-value">{{ item.value }}</span>
              </div>
            </div>
            <div class="chart-bars">
              <div
                v-for="item in pageStatusData"
                :key="item.label"
                class="chart-bar-item"
              >
                <div class="chart-bar-label">{{ item.label }}</div>
                <div class="chart-bar-container">
                  <div
                    class="chart-bar"
                    :style="{
                      width: `${stats.totalPages > 0 ? (item.value / stats.totalPages) * 100 : 0}%`,
                      backgroundColor: item.color,
                    }"
                  >
                    <span class="chart-bar-value">{{ item.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 右侧：最近项目 -->
      <el-card class="dashboard__recent">
        <template #header>
          <div class="card-header">
            <span>最近项目</span>
            <el-icon><Clock /></el-icon>
          </div>
        </template>
        <div v-if="recentProjects.length === 0" class="empty-state">
          <p>暂无项目</p>
        </div>
        <div v-else class="recent-projects">
          <div
            v-for="project in recentProjects"
            :key="project.code"
            class="recent-project-item"
            @click="goToProject(project)"
          >
            <div class="project-info">
              <h4 class="project-name">{{ project.name }}</h4>
              <p class="project-desc">{{ project.description || '暂无描述' }}</p>
              <div class="project-meta">
                <span class="meta-item">
                  <el-icon><Document /></el-icon>
                  {{ project.pageCount || 0 }} 个页面
                </span>
                <span class="meta-item">
                  <el-icon><Box /></el-icon>
                  {{ project.dataSourceCount || 0 }} 个数据源
                </span>
              </div>
            </div>
            <div class="project-time">
              <el-icon><Clock /></el-icon>
              {{ formatDate(project.updatedAt || project.createdAt) }}
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem;
}

.dashboard__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface-contrast);
  padding: 1.5rem 2rem;
  border-radius: var(--radius-lg);
  border: 0.1rem solid var(--color-border);
}

.dashboard__header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.dashboard__header p {
  margin: 0.5rem 0 0;
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
}

/* 统计卡片 */
.dashboard__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  border-radius: var(--radius-lg);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-card :deep(.el-card__body) {
  padding: 1.5rem;
}

.stat-card__content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-card__icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-card__info {
  flex: 1;
}

.stat-card__value {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--el-text-color-primary);
  line-height: 1.2;
}

.stat-card__label {
  margin: 0.5rem 0 0;
  color: var(--el-text-color-secondary);
  font-size: 0.875rem;
}

.stat-card__trend {
  margin: 0.25rem 0 0;
  color: var(--el-color-success);
  font-size: 0.75rem;
  font-weight: 500;
}

/* 主要内容区域 */
.dashboard__main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.dashboard__charts {
  display: grid;
  gap: 1.5rem;
}

.chart-card {
  border-radius: var(--radius-lg);
}

.chart-card :deep(.el-card__header) {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.chart-card :deep(.el-card__body) {
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1rem;
}

.card-header .el-icon {
  color: var(--el-text-color-secondary);
}

.chart-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 图例 */
.chart-legend {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-label {
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
}

.legend-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-left: 0.25rem;
}

/* 图表条 */
.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chart-bar-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.chart-bar-label {
  width: 80px;
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
  flex-shrink: 0;
}

.chart-bar-container {
  flex: 1;
  height: 32px;
  background-color: var(--el-fill-color-lighter);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.chart-bar {
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.75rem;
  transition: width 0.5s ease;
  min-width: 40px;
}

.chart-bar-value {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

/* 最近项目 */
.dashboard__recent {
  border-radius: var(--radius-lg);
}

.dashboard__recent :deep(.el-card__header) {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.dashboard__recent :deep(.el-card__body) {
  padding: 1.5rem;
}

.recent-projects {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recent-project-item {
  padding: 1rem;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.recent-project-item:hover {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
  transform: translateX(4px);
}

.project-info {
  margin-bottom: 0.75rem;
}

.project-name {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.project-desc {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--el-text-color-secondary);
}

.meta-item .el-icon {
  font-size: 0.875rem;
}

.project-time {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--el-text-color-placeholder);
  padding-top: 0.75rem;
  border-top: 1px solid var(--el-border-color-lighter);
}

.project-time .el-icon {
  font-size: 0.875rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--el-text-color-secondary);
}

/* 响应式 */
@media (max-width: 1200px) {
  .dashboard__main {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }

  .dashboard__cards {
    grid-template-columns: 1fr;
  }

  .dashboard__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .chart-legend {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>

