<script setup>
import { computed, ref, watch } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'

import { componentPalette } from '@/data/componentPalette'

const DEFAULT_CATEGORIES = componentPalette

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
})

const searchQuery = ref('')
const activeNames = ref([])

const categories = computed(() => (props.categories.length ? props.categories : DEFAULT_CATEGORIES))

// 搜索过滤逻辑
const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return categories.value
  }

  const query = searchQuery.value.toLowerCase().trim()
  
  return categories.value
    .map((category) => {
      const filteredItems = category.items.filter((item) => {
        // 搜索组件名称、描述、key
        const label = (item.label || '').toLowerCase()
        const desc = (item.desc || '').toLowerCase()
        const key = (item.key || '').toLowerCase()
        const categoryLabel = (category.label || '').toLowerCase()
        
        return (
          label.includes(query) ||
          desc.includes(query) ||
          key.includes(query) ||
          categoryLabel.includes(query)
        )
      })
      
      return filteredItems.length > 0
        ? {
            ...category,
            items: filteredItems,
          }
        : null
    })
    .filter(Boolean)
})

const totalComponents = computed(() => {
  return filteredCategories.value.reduce((sum, cat) => sum + cat.items.length, 0)
})

// 当有搜索关键词时，自动展开所有匹配的分类
watch(
  () => searchQuery.value,
  (newQuery) => {
    if (newQuery.trim()) {
      // 有搜索关键词时，展开所有匹配的分类
      activeNames.value = filteredCategories.value.map((cat) => cat.value)
    }
    // 清空搜索时，不清空 activeNames，让用户保持之前的选择
  },
)

// 监听 filteredCategories 变化，确保搜索时展开所有分类
watch(
  () => filteredCategories.value,
  (newCategories) => {
    if (searchQuery.value.trim() && newCategories.length > 0) {
      activeNames.value = newCategories.map((cat) => cat.value)
    }
  },
)

const emit = defineEmits(['insert'])

const handleInsert = (component) => {
  emit('insert', component)
}

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <el-card class="builder-panel" shadow="hover">
    <template #header>
      <div class="panel-header">
        <div>
          <p class="eyebrow">组件库</p>
          <h4>按分类快速查找</h4>
        </div>
        <el-tag size="small" type="info">{{ totalComponents }}</el-tag>
      </div>
    </template>
    <div class="search-container">
      <el-input
        v-model="searchQuery"
        placeholder="搜索组件名称、描述..."
        clearable
        class="search-input"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>
    <el-scrollbar class="sidebar-scrollbar">
      <el-collapse v-model="activeNames" :accordion="!searchQuery.trim()">
        <el-collapse-item v-for="category in filteredCategories" :key="category.value" :name="category.value">
          <template #title>
            <div class="collapse-title">
              <span>{{ category.label }}</span>
              <el-tag size="small" type="success">{{ category.items.length }}</el-tag>
            </div>
          </template>
          <div class="component-grid">
            <article
              v-for="item in category.items"
              :key="item.label"
              class="component-card"
              @click="handleInsert(item)"
            >
              <header>
                <el-icon class="component-card__icon">
                  <component :is="item.icon" />
                </el-icon>
                <h5>{{ item.label }}</h5>
              </header>
              <p>{{ item.desc }}</p>
              <footer>
                <el-tag size="small" type="primary">拖拽</el-tag>
                <el-button text size="small" class="card-link" @click.stop="handleInsert(item)">
                  <el-icon><Plus /></el-icon>
                  插入
                </el-button>
              </footer>
            </article>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </el-card>
</template>

<style scoped>
.builder-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.builder-panel :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1rem;
}

.sidebar-scrollbar {
  flex: 1;
  height: 100%;
}

.sidebar-scrollbar :deep(.el-scrollbar__wrap) {
  height: 100%;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-container {
  padding: 0 1rem 0.8rem;
  border-bottom: 1px solid var(--color-border);
}

.search-input {
  width: 100%;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 0.6rem;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 0.7rem;
  color: var(--color-text-secondary);
}

.collapse-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 0.5rem;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: 0.8rem;
}

.component-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 0.8rem;
  padding: 0.8rem;
  display: grid;
  gap: 0.6rem;
  background: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.component-card:hover {
  border-color: rgba(79, 70, 229, 0.4);
  box-shadow: 0 0.7rem 1.2rem rgba(15, 23, 42, 0.08);
  transform: translateY(-2px);
}

.component-card header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.component-card header h5 {
  margin: 0;
  font-size: 0.95rem;
}

.component-card__icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.6rem;
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
  display: grid;
  place-items: center;
}

.component-card p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.component-card footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-link {
  padding: 0;
  font-size: 0.85rem;
}
</style>

