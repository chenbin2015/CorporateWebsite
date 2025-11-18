<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '热门标签',
  },
  tags: {
    type: Array,
    default: () => [
      { name: '新闻', count: 120, href: '#' },
      { name: '活动', count: 85, href: '#' },
      { name: '公告', count: 65, href: '#' },
      { name: '学术', count: 45, href: '#' },
    ],
  },
  maxSize: {
    type: Number,
    default: 24,
  },
  minSize: {
    type: Number,
    default: 12,
  },
})

// 计算标签大小（基于数量）
const getTagSize = (count, maxCount) => {
  if (maxCount === 0) return props.minSize
  const ratio = count / maxCount
  return props.minSize + (props.maxSize - props.minSize) * ratio
}

const maxCount = computed(() => {
  return Math.max(...props.tags.map((tag) => tag.count || 0), 0)
})
</script>

<template>
  <section class="tag-cloud">
    <header v-if="title">
      <h3>{{ title }}</h3>
    </header>
    <div class="tags">
      <a
        v-for="tag in tags"
        :key="tag.name"
        :href="tag.href || '#'"
        class="tag"
        :style="{ fontSize: `${getTagSize(tag.count || 0, maxCount)}px` }"
      >
        {{ tag.name }}
        <span v-if="tag.count" class="tag-count">({{ tag.count }})</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.tag-cloud {
  padding: 1.6rem;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 0.5rem);
}

header {
  margin-bottom: 1rem;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
}

.tag {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: var(--color-surface-contrast, #f8fafc);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.375rem);
  text-decoration: none;
  color: var(--color-text, #1e293b);
  transition: all 0.2s;
  line-height: 1.4;
}

.tag:hover {
  background: var(--color-primary, #3b82f6);
  color: #fff;
  border-color: var(--color-primary, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tag-count {
  font-size: 0.75em;
  opacity: 0.7;
  margin-left: 0.2rem;
}
</style>

