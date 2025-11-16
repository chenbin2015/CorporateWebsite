<script setup>
import { computed } from 'vue'

const props = defineProps({
  selectedItem: {
    type: Object,
    default: null,
  },
  schema: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update-props', 'reset'])

const title = computed(() => props.selectedItem?.label ?? '未选择组件')

const handleInput = (prop, value) => {
  emit('update-props', { [prop]: value })
}
</script>

<template>
  <el-card class="builder-panel" shadow="hover">
    <template #header>
      <div class="panel-header">
        <div>
          <p class="eyebrow">属性配置</p>
          <h4>{{ title }}</h4>
        </div>
        <el-button text size="small" :disabled="!schema" @click="emit('reset')">
          重置
        </el-button>
      </div>
    </template>
    <template v-if="schema && selectedItem">
      <el-form label-position="top" size="small" class="inspector-form">
        <el-form-item v-for="field in schema.fields" :key="field.prop" :label="field.label">
          <el-input
            v-if="field.type === 'text'"
            :model-value="selectedItem.props?.[field.prop]"
            :placeholder="field.placeholder"
            @update:model-value="(val) => handleInput(field.prop, val)"
          />
          <el-input
            v-else-if="field.type === 'textarea'"
            type="textarea"
            :rows="3"
            :model-value="selectedItem.props?.[field.prop]"
            :placeholder="field.placeholder"
            @update:model-value="(val) => handleInput(field.prop, val)"
          />
          <el-color-picker
            v-else-if="field.type === 'color'"
            :model-value="selectedItem.props?.[field.prop]"
            @update:model-value="(val) => handleInput(field.prop, val)"
          />
        </el-form-item>
      </el-form>
    </template>
    <el-empty v-else description="请选择画布中的组件以配置属性" />
  </el-card>
</template>

<style scoped>
.builder-panel {
  min-height: 100%;
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

.inspector-form {
  margin-top: 0.5rem;
}
</style>

