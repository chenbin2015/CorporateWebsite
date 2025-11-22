<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Folder, Document, Box, Clock, Edit, Setting, Delete, Plus } from '@element-plus/icons-vue'
import { fetchProjects, deleteProject, fetchProjectPages } from '@/services/modules/project'

const router = useRouter()
const projects = ref([])
const loading = ref(false)

// 项目卡片颜色主题
const cardColors = [
  { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '#ffffff' },
  { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '#ffffff' },
  { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '#ffffff' },
  { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', icon: '#ffffff' },
  { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', icon: '#ffffff' },
  { bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', icon: '#ffffff' },
  { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', icon: '#333333' },
  { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', icon: '#333333' },
]

// 获取项目卡片颜色
const getCardColor = (index) => {
  return cardColors[index % cardColors.length]
}

// 加载项目统计信息
const loadProjectStats = async (project) => {
  try {
    const pages = await fetchProjectPages(project.code)
    return {
      pageCount: pages?.length || 0,
      publishedCount: pages?.filter(p => p.status === 'PUBLISHED').length || 0,
    }
  } catch (error) {
    console.warn(`Failed to load stats for project ${project.code}:`, error)
    return { pageCount: 0, publishedCount: 0 }
  }
}

const loadProjects = async () => {
  loading.value = true
  try {
    const projectsList = await fetchProjects()
    // 为每个项目加载统计信息
    projects.value = await Promise.all(
      projectsList.map(async (project, index) => {
        const stats = await loadProjectStats(project)
        return {
          ...project,
          ...stats,
          colorIndex: index,
        }
      })
    )
  } catch (error) {
    console.error('Failed to load projects:', error)
    ElMessage.error('加载项目列表失败')
  } finally {
    loading.value = false
  }
}

const goToBuilder = (projectCode) => {
  // 注意：这里需要先获取默认页面的 code，暂时使用第一个页面的 code 或 'home'
  // 实际应该从项目数据中获取默认页面
  const defaultPageCode = 'home' // TODO: 从项目配置中获取默认页面 code
  const url = router.resolve({ name: 'pageBuilder', params: { projectCode, pageCode: defaultPageCode } })
  window.open(url.href, '_blank')
}

const handleCreate = () => {
  const url = router.resolve({ name: 'projectCreate' })
  window.open(url.href, '_blank')
}

const handleEdit = (project) => {
  const url = router.resolve({ name: 'projectEdit', params: { code: project.code } })
  window.open(url.href, '_blank')
}

const handleSettings = (projectCode) => {
  try {
    const url = router.resolve({ name: 'projectSettings', params: { projectCode } })
    const newWindow = window.open(url.href, '_blank')
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // 如果弹窗被阻止，在当前页面跳转
      router.push({ name: 'projectSettings', params: { projectCode } })
    }
  } catch (error) {
    console.error('Failed to open project settings:', error)
    // 如果出错，在当前页面跳转
    router.push({ name: 'projectSettings', params: { projectCode } })
  }
}

const handlePageList = (projectCode) => {
  try {
    const url = router.resolve({ name: 'pageList', params: { projectCode } })
    const newWindow = window.open(url.href, '_blank')
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // 如果弹窗被阻止，在当前页面跳转
      router.push({ name: 'pageList', params: { projectCode } })
    }
  } catch (error) {
    console.error('Failed to open page list:', error)
    // 如果出错，在当前页面跳转
    router.push({ name: 'pageList', params: { projectCode } })
  }
}

const handleDelete = async (project) => {
  try {
    await ElMessageBox.confirm(`确定要删除项目 "${project.name}" 吗？`, '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await deleteProject(project.code)
    ElMessage.success('删除成功')
    await loadProjects()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete project:', error)
      ElMessage.error('删除项目失败')
    }
  }
}


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

onMounted(() => {
  loadProjects()
})
</script>

<template>
  <div class="project-list">
    <header class="project-list__header">
     
      <el-button type="primary" @click="handleCreate">
        <el-icon><Plus /></el-icon>
        新建项目
      </el-button>
    </header>

    <el-card v-loading="loading" class="project-list__card">
      <div v-if="projects.length === 0 && !loading" class="empty-state">
        <div class="empty-state__icon">
          <el-icon :size="64"><Folder /></el-icon>
        </div>
        <h3>暂无项目</h3>
        <p>点击"新建项目"开始创建您的第一个项目</p>
      </div>
      <div v-else class="project-list__grid">
        <article 
          v-for="project in projects" 
          :key="project.id" 
          class="project-card"
          :style="{ '--card-bg': getCardColor(project.colorIndex || 0).bg, '--card-icon': getCardColor(project.colorIndex || 0).icon }"
        >
          <div class="project-card__header">
            <div class="project-card__icon">
              <el-icon :size="28"><Folder /></el-icon>
            </div>
            <div class="project-card__title-section">
              <h3>{{ project.name }}</h3>
              <p class="project-card__description">{{ project.description || '暂无描述' }}</p>
            </div>
          </div>
          
          <div class="project-card__stats">
            <div class="stat-item">
              <el-icon><Document /></el-icon>
              <span class="stat-value">{{ project.pageCount || 0 }}</span>
              <span class="stat-label">页面</span>
            </div>
            <div class="stat-item">
              <el-icon><Box /></el-icon>
              <span class="stat-value">{{ project.publishedCount || 0 }}</span>
              <span class="stat-label">已发布</span>
            </div>
            <div class="stat-item">
              <el-icon><Clock /></el-icon>
              <span class="stat-label">{{ formatDate(project.updatedAt || project.createdAt) }}</span>
            </div>
          </div>

          <div class="project-card__actions">
            <el-button size="small" text class="action-btn action-btn--primary" @click="handlePageList(project.code)">
              <el-icon><Document /></el-icon>
              页面管理
            </el-button>
            <el-button size="small" text class="action-btn action-btn--info" @click="handleSettings(project.code)">
              <el-icon><Setting /></el-icon>
              设置
            </el-button>
            <el-button size="small" text class="action-btn action-btn--warning" @click="handleEdit(project)">
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button size="small" text class="action-btn action-btn--danger" @click="handleDelete(project)">
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </div>
        </article>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.project-list {
  
}

.project-list::before {
  content: '';
  position: absolute;
  top: -1rem;
  left: -2rem;
  right: -2rem;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.05;
  border-radius: 0 0 50% 50%;
  z-index: 0;
  pointer-events: none;
}

.project-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  margin: 100;
  padding: 20px 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.project-list__header h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.project-list__header p {
  margin: 0.25rem 0 0;
  color: var(--el-text-color-regular);
  font-size: 0.875rem;
  line-height: 1.4;
}

.project-list__card {
  min-height: 400px;
  position: relative;
  z-index: 1;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.project-list__card :deep(.el-card__body) {
  padding: 2rem;
}

.empty-state {
  text-align: center;
  padding: 6rem 2rem;
  color: var(--el-text-color-secondary);
}

.empty-state__icon {
  margin-bottom: 1.5rem;
  color: var(--el-text-color-placeholder);
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: var(--el-text-color-primary);
}

.empty-state p {
  margin: 0;
  font-size: 0.9375rem;
}

.project-list__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}

.project-card {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 12px;
  padding: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  overflow: hidden;
  position: relative;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-bg);
  z-index: 1;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: transparent;
}

.project-card__header {
  padding: 1.5rem;
  padding-top: 2rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.project-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: var(--card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--card-icon);
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.project-card__title-section {
  flex: 1;
  min-width: 0;
}

.project-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  line-height: 1.4;
}

.project-card__description {
  margin: 0;
  color: var(--el-text-color-regular);
  font-size: 0.875rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card__stats {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  background: var(--el-fill-color-lighter);
  border-top: 1px solid var(--el-border-color-lighter);
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
}

.stat-item .el-icon {
  color: var(--el-text-color-secondary);
  font-size: 1rem;
}

.stat-value {
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-right: 0.25rem;
}

.stat-label {
  color: var(--el-text-color-secondary);
}

.project-card__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.action-btn .el-icon {
  font-size: 0.875rem;
}

.action-btn--primary {
  color: var(--el-color-primary);
}

.action-btn--primary:hover {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.action-btn--info {
  color: var(--el-color-info);
}

.action-btn--info:hover {
  color: var(--el-color-info);
  background-color: var(--el-color-info-light-9);
}

.action-btn--warning {
  color: var(--el-color-warning);
}

.action-btn--warning:hover {
  color: var(--el-color-warning);
  background-color: var(--el-color-warning-light-9);
}

.action-btn--danger {
  color: var(--el-color-danger);
}

.action-btn--danger:hover {
  color: var(--el-color-danger);
  background-color: var(--el-color-danger-light-9);
}

/* 响应式 */
@media (max-width: 768px) {
  .project-list__grid {
    grid-template-columns: 1fr;
  }

  .project-list__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .project-card__stats {
    flex-direction: column;
    gap: 0.75rem;
  }

  .project-card__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .action-btn {
    justify-content: center;
  }
}
</style>
