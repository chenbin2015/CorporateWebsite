<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '数据表格' },
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
})

const displayColumns = computed(() => {
  if (props.columns && props.columns.length > 0) {
    return props.columns
  }
  return ['项目', '状态', '进度', '负责人']
})

const displayRows = computed(() => {
  if (props.rows && props.rows.length > 0) {
    return props.rows
  }
  return [
    ['企业官网', '进行中', '80%', '张三'],
    ['管理平台', '已完成', '100%', '李四'],
    ['移动应用', '规划中', '20%', '王五'],
  ]
})
</script>

<template>
  <section class="data-table-preview">
    <header v-if="title" class="data-table-preview__header">
      <h3>{{ title }}</h3>
    </header>
    <div class="data-table-preview__wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="column in displayColumns" :key="column">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in displayRows" :key="index">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.data-table-preview {
  background: #f8fafc;
  border-radius: 0.6rem;
  padding: 1.2rem;
  border: 1px solid #e2e8f0;
  display: grid;
  gap: 0.8rem;
}

.data-table-preview__header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.data-table-preview__wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 24rem;
}

th,
td {
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.9rem;
}

th {
  font-weight: 600;
  color: #64748b;
  font-size: 0.85rem;
}

td {
  color: #1e293b;
}
</style>

