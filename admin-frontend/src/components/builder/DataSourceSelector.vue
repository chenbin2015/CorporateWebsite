<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { getDataSources } from '@/services/modules/datasource'

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  projectCode: {
    type: String,
    required: true,
  },
  dataSourceType: {
    type: String,
    required: true, // 'news', 'product', 'event', 'notice'
  },
})

const emit = defineEmits(['update:modelValue', 'select'])

const dataSources = ref([])
const loading = ref(false)

// 过滤出匹配类型的数据源
const filteredDataSources = computed(() => {
  return dataSources.value.filter(ds => ds.type === props.dataSourceType)
})

// 当前选中的数据源
const selectedDataSource = computed({
  get: () => props.modelValue,
  set: (val) => {
    console.log('[DataSourceSelector] selectedDataSource set:', val)
    emit('update:modelValue', val)
    // 如果选择了数据源，触发 select 事件
    if (val) {
      console.log('[DataSourceSelector] emitting select event:', val)
      emit('select', val)
    }
  },
})

// 加载数据源列表
const loadDataSources = async () => {
  if (!props.projectCode) return
  
  loading.value = true
  try {
    dataSources.value = await getDataSources(props.projectCode, props.dataSourceType)
  } catch (error) {
    ElMessage.error('加载数据源失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDataSources()
})
</script>

<template>
  <div class="data-source-selector">
    <el-select
      v-model="selectedDataSource"
      placeholder="选择数据源（可选）"
      clearable
      filterable
      :loading="loading"
      style="width: 100%"
    >
      <el-option
        v-for="dataSource in filteredDataSources"
        :key="dataSource.code"
        :label="dataSource.name"
        :value="dataSource.code"
      >
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>{{ dataSource.name }}</span>
          <el-tag size="small" type="info" style="margin-left: 0.5rem;">
            {{ dataSource.description || '无描述' }}
          </el-tag>
        </div>
      </el-option>
    </el-select>
    <div v-if="filteredDataSources.length === 0 && !loading" style="margin-top: 0.5rem; color: #909399; font-size: 0.85rem;">
      暂无{{ dataSourceType === 'news' ? '新闻' : dataSourceType === 'product' ? '产品' : '数据' }}数据源，请在"数据源管理"中创建
    </div>
  </div>
</template>

<style scoped>
.data-source-selector {
  width: 100%;
}
</style>

