<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { createProject, updateProject, getProject } from '@/services/modules/project'

const router = useRouter()
const route = useRoute()
const isEdit = ref(!!route.params.code)
const loading = ref(false)

const form = reactive({
  name: '',
  description: '',
})

const rules = {
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
}

const formRef = ref(null)

const loadProject = async () => {
  if (!isEdit.value || !route.params.code) return

  loading.value = true
  try {
    const project = await getProject(route.params.code)
    form.name = project.name || ''
    form.description = project.description || ''
  } catch (error) {
    console.error('Failed to load project:', error)
    ElMessage.error('加载项目信息失败')
    router.back()
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      if (isEdit.value && route.params.code) {
        await updateProject(route.params.code, {
          name: form.name,
          description: form.description,
        })
        ElMessage.success('更新成功')
      } else {
        await createProject({
          name: form.name,
          description: form.description,
        })
        ElMessage.success('创建成功')
      }
      router.back()
    } catch (error) {
      console.error('Failed to save project:', error)
      ElMessage.error(isEdit.value ? '更新失败' : '创建失败')
    } finally {
      loading.value = false
    }
  })
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  // 如果是编辑模式，加载项目数据
  if (isEdit.value) {
    loadProject()
  }
})
</script>

<template>
  <div class="project-form">
    <el-card v-loading="loading" class="form-card">
      <template #header>
        <div class="card-header">
          <div>
            <p class="eyebrow">项目管理</p>
            <h2>{{ isEdit ? '编辑项目' : '创建新项目' }}</h2>
          </div>
          <div class="header-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
          </div>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="8rem" class="create-form">
        <el-form-item label="项目名称" prop="name">
          <el-input 
            v-model="form.name" 
            placeholder="输入项目名称" 
            size="large"
            style="max-width: 900px;"
          />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="6"
            placeholder="介绍项目背景和目标"
            style="max-width: 900px;"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.project-form {
  max-width: 1600px;
  min-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.form-card {
  min-height: 500px;
}

.form-card :deep(.el-card__body) {
  padding: 2rem;
}

.form-card :deep(.el-card__header) {
  padding: 1.5rem 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.card-header h2 {
  margin: 0.5rem 0 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.create-form {
  margin-top: 2rem;
}

.create-form :deep(.el-form-item) {
  margin-bottom: 2rem;
}

.create-form :deep(.el-form-item__label) {
  font-size: 1rem;
  font-weight: 500;
  color: var(--el-text-color-primary);
  padding-bottom: 0.5rem;
}

.create-form :deep(.el-input__wrapper) {
  padding: 0.75rem 1rem;
}

.create-form :deep(.el-textarea__inner) {
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  line-height: 1.6;
}

/* 响应式 */
@media (max-width: 768px) {
  .project-form {
    padding: 1rem;
  }

  .form-card :deep(.el-card__body) {
    padding: 1.5rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .create-form :deep(.el-input),
  .create-form :deep(.el-textarea) {
    max-width: 100% !important;
  }
}
</style>
