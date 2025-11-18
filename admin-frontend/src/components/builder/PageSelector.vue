<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { fetchProjectPages } from '@/services/modules/project'

const props = defineProps({
  modelValue: {
    type: [Number, String, Object],
    default: null,
  },
  projectCode: {
    type: String,
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
  if (!props.projectCode) return

  loading.value = true
  try {
    pages.value = await fetchProjectPages(props.projectCode)
  } catch (error) {
    console.error('Failed to load pages:', error)
    pages.value = []
  } finally {
    loading.value = false
  }
}

const handleChange = (value) => {
  // value 是页面 code，需要同时保存 code 和 path
  const selectedPage = pages.value.find((p) => p.code === value)
  if (selectedPage) {
    // 生成 runtime 路由格式：/projects/{projectCode}/runtime/pages/{pageCode}
    const runtimePath = `/projects/${props.projectCode}/runtime/pages/${selectedPage.code}`
    // 返回包含 code 和 runtime path 的对象
    emit('update:modelValue', {
      targetPageCode: selectedPage.code,
      path: runtimePath,
    })
  } else {
    emit('update:modelValue', null)
  }
}

// 获取当前选中的页面 code（用于显示）
const currentPageCode = computed(() => {
  if (!props.modelValue) return null
  // 兼容旧格式（直接是 code）和新格式（对象）
  if (typeof props.modelValue === 'object') {
    return props.modelValue.targetPageCode
  }
  return props.modelValue
})

onMounted(() => {
  loadPages()
})

watch(
  () => props.projectCode,
  () => {
    loadPages()
  },
)
</script>

<template>
  <el-select
    :model-value="currentPageCode"
    :placeholder="placeholder"
    :loading="loading"
    filterable
    clearable
    style="width: 100%"
    @update:model-value="handleChange"
  >
    <el-option
      v-for="page in pages"
      :key="page.code"
      :label="`${page.name} (${page.path})`"
      :value="page.code"
    >
      <div style="display: flex; flex-direction: column; gap: 0.2rem">
        <span style="font-weight: 500">{{ page.name }}</span>
        <span style="font-size: 0.85rem; color: var(--el-text-color-secondary)">{{ page.path }}</span>
      </div>
    </el-option>
  </el-select>
</template>

