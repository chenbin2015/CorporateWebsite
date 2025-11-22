<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete, Search } from '@element-plus/icons-vue'

const loading = ref(false)
const tableData = ref([])
const searchForm = ref({
  keyword: '',
})

// 模拟数据
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    displayName: '管理员',
    email: 'admin@example.com',
    role: '管理员',
    status: '正常',
    createTime: '2024-01-01 10:00:00',
    lastLoginTime: '2024-12-20 15:30:00',
  },
  {
    id: 2,
    username: 'user1',
    displayName: '用户1',
    email: 'user1@example.com',
    role: '普通用户',
    status: '正常',
    createTime: '2024-02-15 14:20:00',
    lastLoginTime: '2024-12-19 09:15:00',
  },
]

const loadUsers = async () => {
  loading.value = true
  try {
    // TODO: 调用实际API
    // const response = await fetchUsers(searchForm.value)
    // tableData.value = response.data
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    tableData.value = mockUsers
  } catch (error) {
    console.error('加载用户列表失败:', error)
    ElMessage.error('加载用户列表失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  loadUsers()
}

const handleAdd = () => {
  ElMessage.info('添加用户功能待实现')
}

const handleEdit = (row) => {
  ElMessage.info('编辑用户功能待实现')
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户 "${row.displayName}" 吗？`,
      '删除确认',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    // TODO: 调用实际API
    // await deleteUser(row.id)
    ElMessage.success('删除成功')
    loadUsers()
  } catch {
    // 用户取消删除
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div class="user-management">
    <div class="page-header">
      <div>
        <h1>用户管理</h1>
        <p>管理系统用户账号和权限</p>
      </div>
      <el-button type="primary" :icon="Plus" @click="handleAdd">
        添加用户
      </el-button>
    </div>

    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="用户名/姓名/邮箱"
            clearable
            style="width: 300px"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="searchForm.keyword = ''; loadUsers()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="displayName" label="姓名" width="120" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="role" label="角色" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="lastLoginTime" label="最后登录" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              :icon="Edit"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              link
              type="danger"
              :icon="Delete"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.user-management {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.page-header p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.search-card {
  margin-bottom: 0;
}
</style>

