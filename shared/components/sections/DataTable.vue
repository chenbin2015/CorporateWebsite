<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '项目进展',
  },
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="data-table">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <div class="data-table__wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.data-table {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
  display: grid;
  gap: 1rem;
}

.data-table__wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 32rem;
}

th,
td {
  text-align: left;
  padding: 0.8rem;
  border-bottom: 0.1rem solid var(--color-border);
  font-size: 0.95rem;
}

th {
  font-weight: 600;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}
</style>

