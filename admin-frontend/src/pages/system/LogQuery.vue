<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'
import { fetchLogs } from '@/services/modules/log'

const loading = ref(false)
const tableData = ref([])
const searchForm = ref({
  operationType: '',
  operator: '',
  startDate: '',
  endDate: '',
  keyword: '',
})

const operationTypes = [
  { label: '全部', value: '' },
  { label: '项目操作', value: 'project' },
  { label: '页面操作', value: 'page' },
  { label: '数据源操作', value: 'datasource' },
  { label: '用户操作', value: 'user' },
  { label: '系统操作', value: 'system' },
]

const operationTypeMap = {
  project: '项目操作',
  page: '页面操作',
  datasource: '数据源操作',
  user: '用户操作',
  system: '系统操作',
}

// 模拟数据
const mockLogs = [
  {
    id: 1,
    operationType: 'project',
    operation: '创建项目',
    operator: 'admin',
    target: '项目：企业官网',
    details: '创建了新项目',
    ip: '192.168.1.100',
    createTime: '2024-12-20 15:30:00',
  },
  {
    id: 2,
    operationType: 'page',
    operation: '保存草稿',
    operator: 'admin',
    target: '页面：首页',
    details: '保存了页面草稿数据',
    ip: '192.168.1.100',
    createTime: '2024-12-20 15:25:00',
  },
  {
    id: 3,
    operationType: 'page',
    operation: '发布页面',
    operator: 'admin',
    target: '页面：关于我们',
    details: '发布了页面到生产环境',
    ip: '192.168.1.100',
    createTime: '2024-12-20 14:20:00',
  },
  {
    id: 4,
    operationType: 'project',
    operation: '更新项目',
    operator: 'user1',
    target: '项目：产品展示',
    details: '更新了项目基本信息',
    ip: '192.168.1.101',
    createTime: '2024-12-20 13:15:00',
  },
  {
    id: 5,
    operationType: 'datasource',
    operation: '创建数据源',
    operator: 'admin',
    target: '数据源：新闻数据',
    details: '创建了新的数据源配置',
    ip: '192.168.1.100',
    createTime: '2024-12-20 12:10:00',
  },
  {
    id: 6,
    operationType: 'page',
    operation: '保存草稿',
    operator: 'user1',
    target: '页面：产品列表',
    details: '保存了页面草稿数据',
    ip: '192.168.1.101',
    createTime: '2024-12-20 11:05:00',
  },
]

const loadLogs = async () => {
  loading.value = true
  try {
    // 构建查询参数
    const params = {}
    if (searchForm.value.operationType) {
      params.operationType = searchForm.value.operationType
    }
    if (searchForm.value.operator) {
      params.operator = searchForm.value.operator
    }
    if (searchForm.value.keyword) {
      params.keyword = searchForm.value.keyword
    }
    if (searchForm.value.startDate) {
      params.startDate = searchForm.value.startDate
    }
    if (searchForm.value.endDate) {
      params.endDate = searchForm.value.endDate
    }
    
    // 调用API从数据库查询日志
    const response = await fetchLogs(params)
    // 根据后端返回的数据结构调整
    tableData.value = response.data || response || []
  } catch (error) {
    console.error('加载日志失败:', error)
    ElMessage.error('加载日志失败: ' + (error.message || '未知错误'))
    // 如果API调用失败，可以暂时使用模拟数据（开发阶段）
    // tableData.value = mockLogs
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  loadLogs()
}

const handleReset = () => {
  searchForm.value = {
    operationType: '',
    operator: '',
    startDate: '',
    endDate: '',
    keyword: '',
  }
  loadLogs()
}

const handleRefresh = () => {
  loadLogs()
}

onMounted(() => {
  loadLogs()
})
</script>

<template>
  <div class="log-query">
    <div class="page-header">
      <div>
        <h1>日志查询</h1>
        <p>查看系统操作日志，记录所有重要操作</p>
      </div>
      <el-button :icon="Refresh" @click="handleRefresh">
        刷新
      </el-button>
    </div>

    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="操作类型">
          <el-select
            v-model="searchForm.operationType"
            placeholder="全部"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in operationTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input
            v-model="searchForm.operator"
            placeholder="用户名"
            clearable
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="操作/目标/详情"
            clearable
            style="width: 250px"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="searchForm.startDate"
            type="datetime"
            placeholder="开始时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 180px"
          />
          <span style="margin: 0 8px">至</span>
          <el-date-picker
            v-model="searchForm.endDate"
            type="datetime"
            placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            查询
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
        max-height="600"
      >
        <el-table-column prop="createTime" label="时间" width="180" />
        <el-table-column prop="operationType" label="类型" width="120">
          <template #default="{ row }">
            <el-tag>{{ operationTypeMap[row.operationType] || row.operationType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="150" />
        <el-table-column prop="operator" label="操作人" width="120" />
        <el-table-column prop="target" label="操作目标" width="200" />
        <el-table-column prop="details" label="详情" min-width="200" show-overflow-tooltip />
        <el-table-column prop="ip" label="IP地址" width="140" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.log-query {
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

