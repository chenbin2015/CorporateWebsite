<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getDataSourceItems } from '@/services/modules/datasource'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dataSourceCode: {
    type: String,
    default: null,
  },
  selectedItems: {
    type: Array,
    default: () => [],
  },
  componentKey: {
    type: String,
    required: true, // 'NewsSection', 'NewsListPage', 'ProductList'
  },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const dataSourceItems = ref([])
const loading = ref(false)
const selectedItemCodes = ref([])

// 全选/取消全选
const isAllSelected = computed(() => {
  return dataSourceItems.value.length > 0 && selectedItemCodes.value.length === dataSourceItems.value.length
})

const handleSelectAll = (checked) => {
  console.log('[DataSourceItemSelector] handleSelectAll:', { checked, isAllSelected: isAllSelected.value, itemsCount: dataSourceItems.value.length })
  if (checked) {
    // 全选
    selectedItemCodes.value = dataSourceItems.value.map(item => item.code)
    console.log('[DataSourceItemSelector] Selected all:', selectedItemCodes.value)
  } else {
    // 取消全选
    selectedItemCodes.value = []
    console.log('[DataSourceItemSelector] Deselected all')
  }
}

// 初始化已选择的数据项
watch([() => props.selectedItems, () => dataSourceItems.value], ([selectedItems, items]) => {
  if (selectedItems && Array.isArray(selectedItems) && items && items.length > 0) {
    // 根据已选择的 items 找到对应的 code
    selectedItemCodes.value = selectedItems
      .map(selectedItem => {
        const item = items.find(i => (i.code === selectedItem.id) || (i.code === selectedItem.code))
        return item ? item.code : null
      })
      .filter(Boolean)
  } else {
    selectedItemCodes.value = []
  }
}, { immediate: true })

// 加载数据源项
const loadDataSourceItems = async () => {
  if (!props.dataSourceCode) {
    dataSourceItems.value = []
    return
  }
  
  loading.value = true
  try {
    const items = await getDataSourceItems(props.dataSourceCode)
    console.log('[DataSourceItemSelector] raw items:', items)
    // 解析 JSON 数据
    dataSourceItems.value = items.map(item => {
      let parsedData = {}
      try {
        parsedData = typeof item.data === 'string' ? JSON.parse(item.data || '{}') : (item.data || {})
      } catch (e) {
        console.error('Failed to parse item data:', e, item)
        parsedData = {}
      }
      const result = {
        ...item,
        data: parsedData,
      }
      console.log('[DataSourceItemSelector] parsed item:', result)
      return result
    })
    console.log('[DataSourceItemSelector] loaded items:', dataSourceItems.value)
  } catch (error) {
    console.error('[DataSourceItemSelector] Failed to load items:', error)
    ElMessage.error('加载数据源项失败')
    dataSourceItems.value = []
  } finally {
    loading.value = false
  }
}

// 监听数据源变化
watch(() => props.dataSourceCode, (newVal) => {
  if (newVal) {
    loadDataSourceItems()
  } else {
    dataSourceItems.value = []
  }
}, { immediate: true })

// 监听对话框显示状态
watch(() => props.modelValue, (newVal) => {
  console.log('[DataSourceItemSelector] dialog visible changed:', newVal, 'dataSourceCode:', props.dataSourceCode)
  if (newVal && props.dataSourceCode) {
    loadDataSourceItems()
  }
})

// 监听 dataSourceCode 变化
watch(() => props.dataSourceCode, (newVal) => {
  console.log('[DataSourceItemSelector] dataSourceCode changed:', newVal)
})

// 获取显示标题
const getItemTitle = (item) => {
  console.log('[DataSourceItemSelector] getItemTitle item:', item)
  if (props.componentKey === 'ProductList') {
    return item.data?.name || item.data?.title || '未命名产品'
  } else if (props.componentKey === 'InfoCardGrid') {
    return item.data?.name || item.data?.title || '未命名卡片'
  } else {
    return item.data?.title || item.data?.name || '未命名新闻'
  }
}

// 确认选择
const handleConfirm = () => {
  // 根据选中的 code 找到对应的数据项
  const selectedItems = dataSourceItems.value
    .filter(item => selectedItemCodes.value.includes(item.code))
    .map(item => {
      // 转换为组件期望的格式
      if (props.componentKey === 'ProductList') {
        return {
          id: item.code,
          name: item.data.name || '',
          description: item.data.description || '',
          image: item.data.image || '',
          price: item.data.price || '',
          originalPrice: item.data.originalPrice || '',
          content: item.data.content || '',
          ...item.data,
        }
      } else if (props.componentKey === 'InfoCardGrid') {
        const data = item.data
        // 如果是教师类型，转换为卡片格式
        if (data.name) {
          return {
            id: item.code, // 添加 id 字段用于去重
            title: data.name || '未命名',
            description: `${data.title || ''} | ${data.department || ''}\n${data.research || ''}`.trim(),
            summary: data.summary || '', // 富文本简介单独显示
            image: data.avatar || '',
            href: '#',
            meta: data.department || '',
          }
        }
        // 通用格式：尝试从数据中提取字段
        return {
          id: item.code, // 添加 id 字段用于去重
          title: data.title || data.name || '未命名',
          description: data.description || data.summary || '',
          image: data.image || data.avatar || '',
          href: data.href || '#',
          meta: data.meta || data.department || '',
        }
      } else {
        return {
          id: item.code,
          title: item.data.title || '',
          date: item.data.date || '',
          content: item.data.content || '',
          cover: item.data.cover || '',
          summary: item.data.summary || '',
          ...item.data,
        }
      }
    })
  
  emit('confirm', selectedItems)
  dialogVisible.value = false
}

// 取消
const handleCancel = () => {
  dialogVisible.value = false
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="选择数据项"
    width="800px"
    :close-on-click-modal="false"
    @open="() => console.log('[DataSourceItemSelector] dialog opened')"
    @close="() => console.log('[DataSourceItemSelector] dialog closed')"
  >
    <div v-loading="loading">
      <div style="margin-bottom: 1rem; padding: 0.75rem; background: #f5f7fa; border-radius: 4px;">
        <el-checkbox
          :model-value="isAllSelected"
          :indeterminate="selectedItemCodes.length > 0 && selectedItemCodes.length < dataSourceItems.length"
          @change="handleSelectAll"
        >
          全选
        </el-checkbox>
        <span style="margin-left: 1rem; color: #909399; font-size: 0.85rem;">
          已选择 {{ selectedItemCodes.length }} / {{ dataSourceItems.length }} 项
        </span>
      </div>
      <el-checkbox-group v-model="selectedItemCodes" style="width: 100%">
        <div
          v-for="item in dataSourceItems"
          :key="item.code"
          style="
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            margin-bottom: 0.5rem;
          "
        >
          <el-checkbox :label="item.code" style="margin-right: 1rem;" />
          <div style="flex: 1;">
            <div style="font-weight: 500; margin-bottom: 0.25rem;">
              {{ getItemTitle(item) }}
            </div>
            <div v-if="componentKey !== 'ProductList' && componentKey !== 'InfoCardGrid' && item.data?.date" style="font-size: 0.85rem; color: #909399;">
              {{ item.data.date }}
            </div>
            <div v-if="componentKey === 'ProductList' && item.data?.price" style="font-size: 0.85rem; color: #909399;">
              价格: {{ item.data.price }}
            </div>
            <div v-if="componentKey === 'InfoCardGrid' && item.data?.department" style="font-size: 0.85rem; color: #909399;">
              {{ item.data.department }}
            </div>
          </div>
        </div>
      </el-checkbox-group>
      
      <div v-if="dataSourceItems.length === 0 && !loading" style="text-align: center; padding: 2rem; color: #909399;">
        该数据源暂无数据项
      </div>
    </div>
    
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :disabled="selectedItemCodes.length === 0">
        确定 (已选择 {{ selectedItemCodes.length }} 项)
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>

