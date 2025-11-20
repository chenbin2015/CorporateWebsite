<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: {
    type: String,
    default: 'title', // 默认显示标题字段
  },
  fallback: {
    type: String,
    default: '', // 如果数据不存在时的默认值
  },
})

// 从全局 context 获取详情数据
const detailData = computed(() => {
  return window.__DETAIL_DATA__ || null
})

// 获取指定字段的值
const fieldValue = computed(() => {
  if (!detailData.value) {
    return props.fallback
  }
  
  // 支持嵌套字段，如 'author.name'
  const keys = props.field.split('.')
  let value = detailData.value
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return props.fallback
    }
  }
  
  return value || props.fallback
})
</script>

<template>
  <span class="detail-data">{{ fieldValue }}</span>
</template>

<style scoped>
.detail-data {
  display: inline;
}
</style>

