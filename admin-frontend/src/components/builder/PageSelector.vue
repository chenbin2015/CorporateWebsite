<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { fetchProjectPages } from '@/services/modules/project'

const props = defineProps({
  modelValue: {
    type: [Number, String, Object],
    default: null,
  },
  projectId: {
    type: [Number, String],
    required: true,
  },
  placeholder: {
    type: String,
    default: '请选择页面',
  },
})

const emit = defineEmits(['update:modelValue'])

const pages = ref([])
const loading = ref(false)

const loadPages = async () => {
  if (!props.projectId) return

  loading.value = true
  try {
    pages.value = await fetchProjectPages(props.projectId)
  } catch (error) {
    console.error('Failed to load pages:', error)
    pages.value = []
  } finally {
    loading.value = false
  }
}

const handleChange = (value) => {
  // value 是页面ID，需要同时保存 id 和 path
  const selectedPage = pages.value.find((p) => p.id === value)
  if (selectedPage) {
    // 返回包含 id 和 path 的对象
    emit('update:modelValue', {
      targetPageId: selectedPage.id,
      path: selectedPage.path,
    })
  } else {
    emit('update:modelValue', null)
  }
}

// 获取当前选中的页面ID（用于显示）
const currentPageId = computed(() => {
  if (!props.modelValue) return null
  // 兼容旧格式（直接是ID）和新格式（对象）
  if (typeof props.modelValue === 'object') {
    return props.modelValue.targetPageId
  }
  return props.modelValue
})

onMounted(() => {
  loadPages()
})

watch(
  () => props.projectId,
  () => {
    loadPages()
  },
)
</script>

<template>
  <el-select
    :model-value="currentPageId"
    :placeholder="placeholder"
    :loading="loading"
    filterable
    clearable
    style="width: 100%"
    @update:model-value="handleChange"
  >
    <el-option
      v-for="page in pages"
      :key="page.id"
      :label="`${page.name} (${page.path})`"
      :value="page.id"
    >
      <div style="display: flex; flex-direction: column; gap: 0.2rem">
        <span style="font-weight: 500">{{ page.name }}</span>
        <span style="font-size: 0.85rem; color: var(--el-text-color-secondary)">{{ page.path }}</span>
      </div>
    </el-option>
  </el-select>
</template>

