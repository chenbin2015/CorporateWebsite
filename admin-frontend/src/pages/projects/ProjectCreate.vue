<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  name: '',
  description: '',
  owner: '',
})

const handleSubmit = () => {
  ElMessage.success('模拟创建成功')
}
</script>

<template>
  <el-card class="create-card">
    <template #header>
      <div class="card-header">
        <div>
          <p class="eyebrow">项目管理</p>
          <h2>创建新项目</h2>
        </div>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </template>

    <el-form :model="form" label-width="6rem" class="create-form">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" placeholder="输入项目名称" />
      </el-form-item>
      <el-form-item label="项目负责人">
        <el-input v-model="form.owner" placeholder="输入负责人" />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="form.description" type="textarea" rows="4" placeholder="介绍项目背景" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.create-card {
  max-width: 720px;
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

.create-form {
  margin-top: 1rem;
}
</style>

