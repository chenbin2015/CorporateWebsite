<script setup>
import { computed } from 'vue'

import { componentPalette } from '@/data/componentPalette'

const DEFAULT_CATEGORIES = componentPalette

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
})

const categories = computed(() => (props.categories.length ? props.categories : DEFAULT_CATEGORIES))

const emit = defineEmits(['insert'])

const handleInsert = (component) => {
  emit('insert', component)
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
        <el-tag size="small" type="info">{{ categories.reduce((sum, cat) => sum + cat.items.length, 0) }}</el-tag>
      </div>
    </template>
    <el-scrollbar class="sidebar-scrollbar">
      <el-collapse accordion>
        <el-collapse-item v-for="category in categories" :key="category.value" :name="category.value">
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
  max-height: calc(100vh - 280px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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

