<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { createPage, updatePage, getPage } from '@/services/modules/project'

const router = useRouter()
const route = useRoute()
const projectCode = route.params.projectCode
const isEdit = ref(!!route.params.code)
const loading = ref(false)

const form = reactive({
  name: '',
  path: '',
  title: '',
  description: '',
})

const rules = {
  name: [{ required: true, message: '请输入页面名称', trigger: 'blur' }],
  path: [
    { required: true, message: '请输入页面路径', trigger: 'blur' },
    { pattern: /^\/[a-zA-Z0-9/-]*$/, message: '路径必须以 / 开头，只能包含字母、数字、/ 和 -', trigger: 'blur' },
  ],
}

const formRef = ref(null)

const loadPage = async () => {
  if (!isEdit.value || !route.params.code) return

  loading.value = true
  try {
    const page = await getPage(projectCode, route.params.code)
    form.name = page.name || ''
    form.path = page.path || ''
    form.title = page.title || ''
    form.description = page.description || ''
  } catch (error) {
    console.error('Failed to load page:', error)
    ElMessage.error('加载页面信息失败')
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
        await updatePage(projectCode, route.params.code, {
          name: form.name,
          path: form.path,
          title: form.title,
          description: form.description,
        })
        ElMessage.success('更新成功')
      } else {
        await createPage(projectCode, {
          name: form.name,
          path: form.path,
          title: form.title,
          description: form.description,
          schemaData: '[]',
        })
        ElMessage.success('创建成功')
      }
      const url = router.resolve({ name: 'pageList', params: { projectCode } })
      window.open(url.href, '_blank')
    } catch (error) {
      console.error('Failed to save page:', error)
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
  if (isEdit.value) {
    loadPage()
  }
})
</script>

<template>
  <div class="page-form">
    <el-card v-loading="loading" class="form-card">
      <template #header>
        <div class="card-header">
          <div>
            <p class="eyebrow">页面管理</p>
            <h2>{{ isEdit ? '编辑页面' : '创建新页面' }}</h2>
          </div>
          <div class="header-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
          </div>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="8rem" class="create-form">
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="form.name" placeholder="例如：首页" />
        </el-form-item>
        <el-form-item label="页面路径" prop="path">
          <el-input v-model="form.path" placeholder="例如：/home 或 /about" />
          <div class="form-tip">路径必须以 / 开头，用于访问页面</div>
        </el-form-item>
        <el-form-item label="页面标题">
          <el-input v-model="form.title" placeholder="SEO 标题" />
        </el-form-item>
        <el-form-item label="页面描述">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="页面描述信息（SEO）"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.page-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-card {
  min-height: 400px;
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
  font-size: 1.5rem;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.create-form {
  margin-top: 1.5rem;
}

.form-tip {
  font-size: 0.85rem;
  color: var(--el-text-color-secondary);
  margin-top: 0.25rem;
}
</style>

