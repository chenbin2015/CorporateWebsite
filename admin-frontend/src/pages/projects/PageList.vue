<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { fetchProjectPages, deletePage } from '@/services/modules/project'

const router = useRouter()
const route = useRoute()
const projectCode = route.params.projectCode

const pages = ref([])
const loading = ref(false)

const loadPages = async () => {
  if (!projectCode) return

  loading.value = true
  try {
    pages.value = await fetchProjectPages(projectCode)
  } catch (error) {
    console.error('Failed to load pages:', error)
    ElMessage.error('加载页面列表失败')
  } finally {
    loading.value = false
  }
}

const goToBuilder = (page) => {
  router.push({
    name: 'pageBuilder',
    params: { projectCode, pageCode: page.code },
  })
}

const handleCreate = () => {
  router.push({ name: 'pageCreate', params: { projectCode } })
}

const handleEdit = (page) => {
  router.push({ name: 'pageEdit', params: { projectCode, code: page.code } })
}

const handleDelete = async (page) => {
  try {
    await ElMessageBox.confirm(`确定要删除页面 "${page.name}" 吗？`, '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await deletePage(projectCode, page.code)
    ElMessage.success('删除成功')
    await loadPages()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete page:', error)
      ElMessage.error('删除页面失败')
    }
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

const getStatusBadge = (status) => {
  if (status === 'PUBLISHED') {
    return { type: 'success', text: '已发布' }
  }
  return { type: 'info', text: '草稿' }
}

onMounted(() => {
  loadPages()
})
</script>

<template>
  <div class="page-list">
    <header class="page-list__header">
      <div>
        <h1>页面管理</h1>
        <p>管理项目中的页面，创建和编辑页面内容。</p>
      </div>
      <div class="header-actions">
        <el-button @click="() => router.push({ name: 'projects' })">返回项目</el-button>
        <el-button type="primary" @click="handleCreate">新建页面</el-button>
      </div>
    </header>

    <el-card v-loading="loading" class="page-list__card">
      <div v-if="pages.length === 0 && !loading" class="empty-state">
        <p>暂无页面，点击"新建页面"开始创建</p>
      </div>
      <el-table v-else :data="pages" style="width: 100%">
        <el-table-column prop="name" label="页面名称" width="200" />
        <el-table-column prop="path" label="路径" width="200" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusBadge(row.status).type" size="small">
              {{ getStatusBadge(row.status).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.updatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" text @click="goToBuilder(row)">
              编辑内容
            </el-button>
            <el-button size="small" text @click="handleEdit(row)">编辑信息</el-button>
            <el-button size="small" type="danger" text @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.page-list {
  display: grid;
  gap: 1.5rem;
}

.page-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-list__header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.page-list__header p {
  margin: 0.5rem 0 0;
  color: var(--color-text-secondary);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.page-list__card {
  min-height: 400px;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-secondary);
}
</style>

