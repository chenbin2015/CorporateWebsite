<script setup>
import { computed } from 'vue'
import { Calendar, User } from '@element-plus/icons-vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  createdAt: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  showCreatedAt: {
    type: Boolean,
    default: true,
  },
  showAuthor: {
    type: Boolean,
    default: true,
  },
  showContent: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: '',
  },
})

// 从全局 context 获取详情数据（作为 fallback）
const detailData = computed(() => {
  return window.__DETAIL_DATA__ || null
})

// 合并 props 和详情数据，props 优先
const displayTitle = computed(() => {
  return props.title || detailData.value?.title || detailData.value?.name || ''
})

const displayCreatedAt = computed(() => {
  return props.createdAt || detailData.value?.date || detailData.value?.createdAt || ''
})

const displayAuthor = computed(() => {
  return props.author || detailData.value?.author || ''
})

const displayContent = computed(() => {
  return props.content || detailData.value?.content || ''
})

// 计算样式
const contentDetailStyle = computed(() => {
  const style = {}
  if (props.height) {
    style.minHeight = props.height
  }
  return style
})
</script>

<template>
  <section class="content-detail" :style="contentDetailStyle">
    <header v-if="showTitle || showCreatedAt || showAuthor" class="content-detail__header">
      <h1 v-if="showTitle && displayTitle" class="content-detail__title">{{ displayTitle }}</h1>
      <div v-if="showCreatedAt || showAuthor" class="content-detail__meta">
        <span v-if="showCreatedAt && displayCreatedAt" class="content-detail__date">
          <el-icon><Calendar /></el-icon>
          {{ displayCreatedAt }}
        </span>
        <span v-if="showAuthor && displayAuthor" class="content-detail__author">
          <el-icon><User /></el-icon>
          {{ displayAuthor }}
        </span>
      </div>
    </header>
    <div v-if="showContent && displayContent" class="content-detail__body" v-html="displayContent"></div>
    <div v-else-if="showContent && !displayContent" class="content-detail__empty">
      <p>暂无内容</p>
    </div>
  </section>
</template>

<style scoped>
.content-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.content-detail__header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--el-border-color-light);
}

.content-detail__title {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--el-text-color-primary);
  line-height: 1.3;
}

.content-detail__meta {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 0.9rem;
  color: var(--el-text-color-secondary);
}

.content-detail__date,
.content-detail__author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.content-detail__body {
  line-height: 1.8;
  color: var(--el-text-color-primary);
  font-size: 1rem;
}

.content-detail__body :deep(p) {
  margin: 1rem 0;
}

.content-detail__body :deep(p:first-child) {
  margin-top: 0;
}

.content-detail__body :deep(p:last-child) {
  margin-bottom: 0;
}

.content-detail__body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  margin: 1.5rem 0;
}

.content-detail__body :deep(h1),
.content-detail__body :deep(h2),
.content-detail__body :deep(h3),
.content-detail__body :deep(h4),
.content-detail__body :deep(h5),
.content-detail__body :deep(h6) {
  margin: 1.5rem 0 0.75rem;
  font-weight: 600;
  line-height: 1.4;
}

.content-detail__body :deep(h1) {
  font-size: 1.8rem;
}

.content-detail__body :deep(h2) {
  font-size: 1.5rem;
}

.content-detail__body :deep(h3) {
  font-size: 1.3rem;
}

.content-detail__body :deep(ul),
.content-detail__body :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.content-detail__body :deep(li) {
  margin: 0.5rem 0;
}

.content-detail__body :deep(blockquote) {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid var(--el-color-primary);
  background: var(--el-fill-color-light);
  border-radius: var(--radius-sm);
}

.content-detail__body :deep(code) {
  padding: 0.2rem 0.4rem;
  background: var(--el-fill-color-light);
  border-radius: var(--radius-sm);
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.content-detail__body :deep(pre) {
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--el-fill-color-light);
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.content-detail__body :deep(pre code) {
  padding: 0;
  background: transparent;
}

.content-detail__body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.content-detail__body :deep(table th),
.content-detail__body :deep(table td) {
  padding: 0.75rem;
  border: 1px solid var(--el-border-color);
  text-align: left;
}

.content-detail__body :deep(table th) {
  background: var(--el-fill-color-light);
  font-weight: 600;
}

.content-detail__empty {
  padding: 3rem;
  text-align: center;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color-lighter);
  border-radius: var(--radius-md);
}

@media (max-width: 64rem) {
  .content-detail {
    padding: 1rem;
  }
  
  .content-detail__title {
    font-size: 1.5rem;
  }
  
  .content-detail__meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

