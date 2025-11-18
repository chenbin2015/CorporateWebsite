<script setup>
import { handleDetailPageNavigation } from '@/utils/navigation'
import { isDesignMode } from '@shared/utils/context'

const props = defineProps({
  title: {
    type: String,
    default: '通知公告',
  },
  items: {
    type: Array,
    default: () => [],
  },
  moreText: {
    type: String,
    default: '更多',
  },
  detailPage: {
    type: Object,
    default: () => null,
  },
})

const handleItemClick = (item, event) => {
  // 设计态中禁用交互
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  if (props.detailPage) {
    event.preventDefault()
    handleDetailPageNavigation(props.detailPage, item)
  }
}
</script>

<template>
  <section class="notice">
    <header>
      <h3>{{ title }}</h3>
      <a href="#">{{ moreText }}</a>
    </header>
    <ul>
      <li v-for="item in items" :key="item.title || item.id">
        <a 
          :href="isDesignMode() ? 'javascript:void(0)' : (detailPage ? 'javascript:void(0)' : '#')"
          @click="(e) => handleItemClick(item, e)"
          :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : 'cursor: pointer;'"
        >
          <span class="notice__title">{{ item.title }}</span>
          <time>{{ item.date }}</time>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.notice {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
  display: grid;
  gap: 1rem;
}

.notice header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notice header h3 {
  margin: 0;
}

.notice ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;
}

.notice a {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-text-primary);
}

.notice__title {
  flex: 1;
}

time {
  color: var(--color-text-secondary);
}
</style>

