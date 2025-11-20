<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getDataSources, createDataSource, updateDataSource, deleteDataSource } from '@/services/modules/datasource'
import { getDataSourceItems, createDataSourceItem, updateDataSourceItem, deleteDataSourceItem, reorderDataSourceItems } from '@/services/modules/datasource'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ElDatePicker } from 'element-plus'

const props = defineProps({
  projectCode: {
    type: String,
    required: true,
  },
})

// 数据源列表
const dataSources = ref([])
const selectedDataSource = ref(null)
const dataSourceItems = ref([])

// 数据源对话框
const dataSourceDialogVisible = ref(false)
const dataSourceDialogMode = ref('create') // 'create' 或 'edit'
const dataSourceForm = ref({
  name: '',
  type: 'news',
  description: '',
})

// 数据源类型选项
const dataSourceTypes = [
  { label: '新闻', value: 'news' },
  { label: '产品', value: 'product' },
  { label: '活动', value: 'event' },
  { label: '通知', value: 'notice' },
  { label: '教师', value: 'teacher' },
]

// 数据源项对话框
const itemDialogVisible = ref(false)
const itemDialogMode = ref('create')
const itemDialogIndex = ref(-1)
const itemForm = ref({
  title: '',
  date: '',
  content: '',
  cover: '', // 新闻封面图片
  summary: '', // 新闻摘要
  // 产品相关字段
  name: '',
  description: '',
  image: '',
  price: '',
  originalPrice: '',
  // 教师相关字段
  department: '',
  avatar: '',
  research: '',
  email: '',
})

// 加载数据源列表
const loadDataSources = async () => {
  try {
    dataSources.value = await getDataSources(props.projectCode)
  } catch (error) {
    ElMessage.error('加载数据源失败')
  }
}

// 打开创建数据源对话框
const openCreateDataSourceDialog = () => {
  dataSourceDialogMode.value = 'create'
  dataSourceForm.value = {
    name: '',
    type: 'news',
    description: '',
  }
  dataSourceDialogVisible.value = true
}

// 打开编辑数据源对话框
const openEditDataSourceDialog = (dataSource) => {
  dataSourceDialogMode.value = 'edit'
  dataSourceForm.value = {
    name: dataSource.name,
    type: dataSource.type,
    description: dataSource.description || '',
  }
  selectedDataSource.value = dataSource
  dataSourceDialogVisible.value = true
}

// 保存数据源
const saveDataSource = async () => {
  try {
    if (dataSourceDialogMode.value === 'create') {
      await createDataSource(props.projectCode, dataSourceForm.value)
      ElMessage.success('创建成功')
    } else {
      await updateDataSource(props.projectCode, selectedDataSource.value.code, dataSourceForm.value)
      ElMessage.success('更新成功')
    }
    dataSourceDialogVisible.value = false
    await loadDataSources()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 删除数据源
const handleDeleteDataSource = async (dataSource) => {
  try {
    await ElMessageBox.confirm('确定要删除这个数据源吗？删除后，所有关联的数据项也会被删除。', '确认删除', {
      type: 'warning',
    })
    await deleteDataSource(props.projectCode, dataSource.code)
    ElMessage.success('删除成功')
    if (selectedDataSource.value?.code === dataSource.code) {
      selectedDataSource.value = null
      dataSourceItems.value = []
    }
    await loadDataSources()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 选择数据源
const selectDataSource = async (dataSource) => {
  selectedDataSource.value = dataSource
  await loadDataSourceItems(dataSource.code)
}

// 加载数据源项
const loadDataSourceItems = async (dataSourceCode) => {
  try {
    const items = await getDataSourceItems(dataSourceCode)
    // 解析JSON数据
    dataSourceItems.value = items.map(item => ({
      ...item,
      data: JSON.parse(item.data || '{}'),
    }))
  } catch (error) {
    ElMessage.error('加载数据项失败')
  }
}

// 打开创建数据源项对话框
const openCreateItemDialog = () => {
  itemDialogMode.value = 'create'
  itemDialogIndex.value = -1
  resetItemForm()
  itemDialogVisible.value = true
}

// 打开编辑数据源项对话框
const openEditItemDialog = (item, index) => {
  itemDialogMode.value = 'edit'
  itemDialogIndex.value = index
  const data = item.data || {}
  resetItemForm()
  
  // 根据数据源类型填充表单
  if (selectedDataSource.value.type === 'news') {
    itemForm.value.title = data.title || ''
    itemForm.value.date = data.date || ''
    itemForm.value.content = data.content || ''
    itemForm.value.cover = data.cover || ''
    itemForm.value.summary = data.summary || ''
  } else if (selectedDataSource.value.type === 'product') {
    itemForm.value.name = data.name || ''
    itemForm.value.description = data.description || ''
    itemForm.value.image = data.image || ''
    itemForm.value.price = data.price || ''
    itemForm.value.originalPrice = data.originalPrice || ''
    itemForm.value.content = data.content || ''
  } else if (selectedDataSource.value.type === 'teacher') {
    itemForm.value.name = data.name || ''
    itemForm.value.title = data.title || ''
    itemForm.value.department = data.department || ''
    itemForm.value.avatar = data.avatar || ''
    itemForm.value.research = data.research || ''
    itemForm.value.summary = data.summary || ''
    itemForm.value.email = data.email || ''
  }
  itemDialogVisible.value = true
}

// 重置数据源项表单
const resetItemForm = () => {
  itemForm.value = {
    title: '',
    date: '',
    content: '',
    cover: '',
    summary: '',
    name: '',
    description: '',
    image: '',
    price: '',
    originalPrice: '',
    department: '',
    avatar: '',
    research: '',
    email: '',
  }
}

// 保存数据源项
const saveItem = async () => {
  try {
    const data = {}
    
    // 根据数据源类型构建数据对象
    if (selectedDataSource.value.type === 'news') {
      data.title = itemForm.value.title
      data.date = itemForm.value.date
      data.content = itemForm.value.content
      data.cover = itemForm.value.cover
      data.summary = itemForm.value.summary
    } else if (selectedDataSource.value.type === 'product') {
      data.name = itemForm.value.name
      data.description = itemForm.value.description
      data.image = itemForm.value.image
      data.price = itemForm.value.price
      data.originalPrice = itemForm.value.originalPrice
      data.content = itemForm.value.content
    } else if (selectedDataSource.value.type === 'teacher') {
      data.name = itemForm.value.name
      data.title = itemForm.value.title
      data.department = itemForm.value.department
      data.avatar = itemForm.value.avatar
      data.research = itemForm.value.research
      data.summary = itemForm.value.summary
      data.email = itemForm.value.email
    }
    
    const dataJson = JSON.stringify(data)
    
    if (itemDialogMode.value === 'create') {
      await createDataSourceItem(selectedDataSource.value.code, {
        data: dataJson,
        sortOrder: dataSourceItems.value.length,
      })
      ElMessage.success('创建成功')
    } else {
      const item = dataSourceItems.value[itemDialogIndex.value]
      await updateDataSourceItem(selectedDataSource.value.code, item.code, {
        data: dataJson,
        sortOrder: item.sortOrder,
      })
      ElMessage.success('更新成功')
    }
    
    itemDialogVisible.value = false
    await loadDataSourceItems(selectedDataSource.value.code)
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 删除数据源项
const handleDeleteItem = async (item, index) => {
  try {
    await ElMessageBox.confirm('确定要删除这个数据项吗？', '确认删除', {
      type: 'warning',
    })
    await deleteDataSourceItem(selectedDataSource.value.code, item.code)
    ElMessage.success('删除成功')
    await loadDataSourceItems(selectedDataSource.value.code)
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 当前数据源类型
const currentDataSourceType = computed(() => {
  return selectedDataSource.value?.type || 'news'
})

onMounted(() => {
  loadDataSources()
})
</script>

<template>
  <div class="builder-data-source-manager">
    <div class="data-source-list">
      <div class="list-header">
        <span class="title">数据源</span>
        <el-button type="primary" size="small" @click="openCreateDataSourceDialog">
          新建
        </el-button>
      </div>
      <div class="list-content">
        <div
          v-for="dataSource in dataSources"
          :key="dataSource.code"
          class="data-source-item"
          :class="{ active: selectedDataSource?.code === dataSource.code }"
          @click="selectDataSource(dataSource)"
        >
          <div class="item-name">{{ dataSource.name }}</div>
          <div class="item-meta">
            <el-tag size="small" type="info">{{ dataSourceTypes.find(t => t.value === dataSource.type)?.label }}</el-tag>
            <el-button
              type="text"
              size="small"
              @click.stop="openEditDataSourceDialog(dataSource)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              danger
              @click.stop="handleDeleteDataSource(dataSource)"
            >
              删除
            </el-button>
          </div>
        </div>
        <div v-if="dataSources.length === 0" class="empty-state">
          暂无数据源，点击"新建"创建
        </div>
      </div>
    </div>

    <div v-if="selectedDataSource" class="data-source-items">
      <div class="items-header">
        <span class="title">{{ selectedDataSource.name }} - 数据项</span>
        <el-button type="primary" size="small" @click="openCreateItemDialog">
          添加
        </el-button>
      </div>
      <div class="items-content">
        <div
          v-for="(item, index) in dataSourceItems"
          :key="item.code"
          class="item-row"
        >
          <div class="item-info">
            <div class="item-title">
              {{ currentDataSourceType === 'news' ? (item.data?.title || '未命名') : (item.data?.name || '未命名') }}
            </div>
            <div v-if="currentDataSourceType === 'news' && item.data?.date" class="item-meta">
              {{ item.data.date }}
            </div>
          </div>
          <div class="item-actions">
            <el-button type="text" size="small" @click="openEditItemDialog(item, index)">
              编辑
            </el-button>
            <el-button type="text" size="small" danger @click="handleDeleteItem(item, index)">
              删除
            </el-button>
          </div>
        </div>
        <div v-if="dataSourceItems.length === 0" class="empty-state">
          暂无数据项，点击"添加"创建
        </div>
      </div>
    </div>

    <!-- 数据源对话框 -->
    <el-dialog
      v-model="dataSourceDialogVisible"
      :title="dataSourceDialogMode === 'create' ? '新建数据源' : '编辑数据源'"
      width="600px"
    >
      <el-form :model="dataSourceForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="dataSourceForm.name" placeholder="请输入数据源名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="dataSourceForm.type" placeholder="请选择类型">
            <el-option
              v-for="type in dataSourceTypes"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="dataSourceForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dataSourceDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveDataSource">确定</el-button>
      </template>
    </el-dialog>

    <!-- 数据源项对话框 -->
    <el-dialog
      v-model="itemDialogVisible"
      :title="itemDialogMode === 'create' ? '添加数据项' : '编辑数据项'"
      width="1000px"
    >
      <el-form :model="itemForm" label-width="100px">
        <!-- 新闻类型 -->
        <template v-if="currentDataSourceType === 'news'">
          <el-form-item label="标题">
            <el-input v-model="itemForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker
              v-model="itemForm.date"
              type="date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="封面图片">
            <el-input v-model="itemForm.cover" placeholder="请输入封面图片URL" />
          </el-form-item>
          <el-form-item label="摘要">
            <el-input
              v-model="itemForm.summary"
              type="textarea"
              :rows="3"
              placeholder="请输入新闻摘要"
            />
          </el-form-item>
          <el-form-item label="内容">
            <div class="quill-editor-wrapper">
              <QuillEditor v-model:content="itemForm.content" contentType="html" />
            </div>
          </el-form-item>
        </template>

        <!-- 产品类型 -->
        <template v-else-if="currentDataSourceType === 'product'">
          <el-form-item label="产品名称">
            <el-input v-model="itemForm.name" placeholder="请输入产品名称" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="itemForm.description"
              type="textarea"
              :rows="3"
              placeholder="请输入描述"
            />
          </el-form-item>
          <el-form-item label="图片">
            <el-input v-model="itemForm.image" placeholder="请输入图片URL" />
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number v-model="itemForm.price" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="原价">
            <el-input-number v-model="itemForm.originalPrice" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="详情">
            <div class="quill-editor-wrapper">
              <QuillEditor v-model:content="itemForm.content" contentType="html" />
            </div>
          </el-form-item>
        </template>

        <!-- 教师类型 -->
        <template v-else-if="currentDataSourceType === 'teacher'">
          <el-form-item label="姓名">
            <el-input v-model="itemForm.name" placeholder="请输入教师姓名" />
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="itemForm.title" placeholder="请输入职称（如：教授、博士生导师）" />
          </el-form-item>
          <el-form-item label="院系">
            <el-input v-model="itemForm.department" placeholder="请输入所属院系" />
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="itemForm.avatar" placeholder="请输入头像图片URL" />
          </el-form-item>
          <el-form-item label="研究方向">
            <el-input
              v-model="itemForm.research"
              type="textarea"
              :rows="2"
              placeholder="请输入研究方向"
            />
          </el-form-item>
          <el-form-item label="简介">
            <div class="quill-editor-wrapper">
              <QuillEditor v-model:content="itemForm.summary" contentType="html" />
            </div>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="itemForm.email" placeholder="请输入邮箱地址" />
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <el-button @click="itemDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveItem">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.builder-data-source-manager {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.data-source-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border, #e2e8f0);
  min-width: 200px;
  max-width: 300px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  background: var(--color-surface-contrast, #f8fafc);
}

.list-header .title {
  font-weight: 600;
  font-size: 0.9rem;
}

.list-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.data-source-item {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.data-source-item:hover {
  background: var(--color-surface-contrast, #f8fafc);
}

.data-source-item.active {
  background: var(--el-color-primary-light-9, #ecf5ff);
  border-color: var(--el-color-primary, #409eff);
}

.item-name {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: var(--color-text-secondary, #64748b);
  font-size: 0.9rem;
}

.data-source-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.items-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  background: var(--color-surface-contrast, #f8fafc);
}

.items-header .title {
  font-weight: 600;
  font-size: 0.9rem;
}

.items-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 4px;
}

.item-info {
  flex: 1;
}

.item-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.item-meta {
  font-size: 0.85rem;
  color: var(--color-text-secondary, #64748b);
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.quill-editor-wrapper {
  width: 100%;
  min-height: 300px;
}

.quill-editor-wrapper :deep(.ql-container) {
  min-height: 250px;
}

.el-form-item {
  margin-bottom: 1rem;
}
</style>

