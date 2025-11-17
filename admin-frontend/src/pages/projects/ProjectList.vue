<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { fetchProjects, deleteProject } from '@/services/modules/project'

const router = useRouter()
const projects = ref([])
const loading = ref(false)

const loadProjects = async () => {
  loading.value = true
  try {
    projects.value = await fetchProjects()
  } catch (error) {
    console.error('Failed to load projects:', error)
    ElMessage.error('加载项目列表失败')
  } finally {
    loading.value = false
  }
}

const goToBuilder = (projectId) => {
  const defaultPageId = 'home'
  router.push({ name: 'pageBuilder', params: { projectId, pageId: defaultPageId } })
}

const handleCreate = () => {
  router.push({ name: 'projectCreate' })
}

const handleEdit = (project) => {
  router.push({ name: 'projectEdit', params: { id: project.id } })
}

const handleDelete = async (project) => {
  try {
    await ElMessageBox.confirm(`确定要删除项目 "${project.name}" 吗？`, '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await deleteProject(project.id)
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
  return date.toLocaleDateString('zh-CN')
}

onMounted(() => {
  loadProjects()
})
</script>

<template>
  <div class="project-list">
    <header class="project-list__header">
      <div>
        <h1>项目管理</h1>
        <p>创建和维护可视化搭建项目。</p>
      </div>
      <el-button type="primary" @click="handleCreate">新建项目</el-button>
    </header>

    <el-card v-loading="loading" class="project-list__card">
      <div v-if="projects.length === 0 && !loading" class="empty-state">
        <p>暂无项目，点击"新建项目"开始创建</p>
      </div>
      <div v-else class="project-list__grid">
        <article v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-card__content">
            <h3>{{ project.name }}</h3>
            <p class="project-card__description">{{ project.description || '暂无描述' }}</p>
            <p class="project-card__meta">创建时间：{{ formatDate(project.createdAt) }}</p>
          </div>
          <div class="project-card__actions">
            <el-button size="small" type="primary" @click="() => router.push({ name: 'pageList', params: { projectId: project.id } })">
              页面管理
            </el-button>
            <el-button size="small" @click="goToBuilder(project.id)">打开</el-button>
            <el-button size="small" type="primary" text @click="handleEdit(project)">编辑</el-button>
            <el-button size="small" type="danger" text @click="handleDelete(project)">删除</el-button>
          </div>
        </article>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.project-list {
  display: grid;
  gap: 1.5rem;
}

.project-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-list__header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.project-list__header p {
  margin: 0.5rem 0 0;
  color: var(--color-text-secondary);
}

.project-list__card {
  min-height: 400px;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-secondary);
}

.project-list__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.project-card {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s;
}

.project-card:hover {
  border-color: var(--el-color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.project-card__content {
  flex: 1;
}

.project-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: var(--el-text-color-primary);
}

.project-card__description {
  margin: 0.5rem 0;
  color: var(--el-text-color-regular);
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card__meta {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: var(--el-text-color-secondary);
}

.project-card__actions {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--el-border-color-lighter);
}
</style>
