<script setup>
import { Delete } from '@element-plus/icons-vue'
import { resolveBuilderComponent } from '@/components/builder/runtime/componentRegistry'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  selectedId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['select', 'delete'])

const handleSelect = (id) => {
  emit('select', id)
}
</script>

<template>
  <el-card class="builder-canvas" shadow="never">
    <template #header>
      <div class="canvas-header">
        <div>
          <p class="eyebrow">页面画布</p>
          <h4>Drag & Build</h4>
        </div>
        <el-tag size="small" type="info">{{ props.items.length }} 个模块</el-tag>
      </div>
    </template>
    <div class="canvas-frame">
      <template v-if="props.items.length">
        <div class="canvas-stack">
          <article
            v-for="item in props.items"
            :key="item.id"
            :class="['canvas-item', { 'canvas-item--active': props.selectedId === item.id }]"
            @click="handleSelect(item.id)"
          >
            <header>
              <div>
                <p class="item-label">{{ item.label }}</p>
                <span class="item-source">{{ item.source }}</span>
              </div>
              <div class="item-actions">
                <el-tag size="small" type="primary">{{ item.key }}</el-tag>
                <el-button
                  v-if="props.selectedId === item.id"
                  text
                  size="small"
                  type="danger"
                  class="delete-btn"
                  @click.stop="emit('delete', item.id)"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </header>
            <component :is="resolveBuilderComponent(item.key)" v-bind="item.props" />
          </article>
        </div>
      </template>
      <el-empty v-else description="将左侧组件拖曳到此处" />
    </div>
  </el-card>
</template>

<style scoped>
.builder-canvas {
  /* 中间画布区域高度与左侧保持一致，超出部分内部滚动 */
  max-height: calc(100vh - 280px);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
}

.canvas-header {
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

.canvas-frame {
  flex: 1;
  min-height: 0;
  border-radius: var(--radius-lg);
  border: 1px dashed rgba(15, 23, 42, 0.2);
  background: radial-gradient(circle at top, rgba(99, 102, 241, 0.08), transparent 40%),
    repeating-linear-gradient(0deg, #fff, #fff 36px, rgba(148, 163, 184, 0.08) 37px),
    repeating-linear-gradient(90deg, #fff, #fff 36px, rgba(148, 163, 184, 0.08) 37px);
  display: grid;
  place-items: stretch;
  padding: 1.2rem;
  overflow-y: auto;
}

.canvas-stack {
  display: grid;
  gap: 1rem;
}

.canvas-item {
  border-radius: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 1rem;
  background: #fff;
  box-shadow: 0 1rem 2rem rgba(15, 23, 42, 0.05);
  display: grid;
  gap: 0.8rem;
  cursor: pointer;
}

.canvas-item--active {
  border-color: rgba(59, 130, 246, 0.9);
  box-shadow: 0 1.2rem 2.4rem rgba(37, 99, 235, 0.2);
}

.canvas-item header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.delete-btn {
  opacity: 0.8;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
}

.item-label {
  margin: 0;
  font-weight: 600;
}

.item-source {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  font-family: 'Fira Code', 'SFMono-Regular', Consolas, monospace;
}
</style>

