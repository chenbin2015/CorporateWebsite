<script setup>
import { ref } from 'vue'
import BuilderSidebar from './BuilderSidebar.vue'
import BuilderOutline from './BuilderOutline.vue'
import BuilderDataSourceManager from './BuilderDataSourceManager.vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  pageName: {
    type: String,
    default: '未命名页面',
  },
  items: {
    type: Array,
    default: () => [],
  },
  selectedId: {
    type: String,
    default: null,
  },
  projectCode: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['insert', 'select', 'scroll-to'])

const activeTab = ref('components') // 'components'、'outline' 或 'datasources'

const handleInsert = (component) => {
  emit('insert', component)
}

const handleSelect = (id) => {
  emit('select', id)
}

const handleScrollTo = (id) => {
  emit('scroll-to', id)
}
</script>

<template>
  <div class="builder-left-panel">
    <el-tabs v-model="activeTab" class="panel-tabs">
      <el-tab-pane label="组件库" name="components">
        <BuilderSidebar :categories="categories" @insert="handleInsert" />
      </el-tab-pane>
      <el-tab-pane label="页面结构" name="outline">
        <BuilderOutline
          :page-name="pageName"
          :items="items"
          :selected-id="selectedId"
          @select="handleSelect"
          @scroll-to="handleScrollTo"
        />
      </el-tab-pane>
      <el-tab-pane label="数据源管理" name="datasources">
        <BuilderDataSourceManager :project-code="projectCode" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.builder-left-panel {
    max-height: calc(100vh - 280px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 0 0.5rem;
  background: var(--color-surface-contrast, #f8fafc);
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.panel-tabs :deep(.el-tabs__nav-wrap) {
  padding: 0;
}

.panel-tabs :deep(.el-tabs__item) {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.panel-tabs :deep(.el-tabs__content) {
  flex: 1;
  overflow: hidden;
  padding: 0;
  min-height: 0;
}

.panel-tabs :deep(.el-tab-pane) {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>

