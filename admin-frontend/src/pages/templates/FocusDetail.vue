<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@shared/components/PageHero.vue'
import TextImageSection from '@shared/components/TextImageSection.vue'

const route = useRoute()
const focusId = route.params.id

const focus = ref(null)
const loading = ref(true)

// Mock 数据
const mockFocus = {
  '1': {
    id: '1',
    title: '人工智能与机器学习',
    subtitle: '探索AI前沿技术',
    cover: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    description: '人工智能与机器学习是当前科技领域最热门的研究方向之一，正在深刻改变着我们的生活方式和工作方式。',
    content: `
      <h3>研究方向</h3>
      <p>我们的研究团队专注于深度学习、自然语言处理、计算机视觉等前沿领域，致力于推动AI技术的创新与应用。</p>
      
      <h3>研究成果</h3>
      <p>团队在多个国际顶级会议和期刊上发表了重要研究成果，获得了多项专利和奖项。</p>
      
      <h3>应用场景</h3>
      <p>我们的技术已应用于智能医疗、智慧城市、自动驾驶等多个领域，为社会创造了重要价值。</p>
    `,
    tags: ['人工智能', '机器学习', '深度学习'],
  },
  '2': {
    id: '2',
    title: '可持续发展与环境保护',
    subtitle: '构建绿色未来',
    cover: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    description: '可持续发展是当今世界面临的重要挑战，我们致力于通过科技创新推动环境保护和绿色发展。',
    content: `
      <h3>研究重点</h3>
      <p>我们关注清洁能源、循环经济、生态保护等关键领域，探索可持续发展的创新路径。</p>
      
      <h3>合作项目</h3>
      <p>与多家企业和研究机构合作，共同推进绿色技术的研发与应用。</p>
      
      <h3>社会影响</h3>
      <p>我们的研究成果为政策制定和产业转型提供了重要参考，产生了积极的社会影响。</p>
    `,
    tags: ['可持续发展', '环境保护', '绿色技术'],
  },
}

onMounted(() => {
  setTimeout(() => {
    focus.value = mockFocus[focusId] || {
      id: focusId,
      title: '专题标题',
      subtitle: '专题副标题',
      cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
      description: '这是专题描述。',
      content: '<p>这是专题详情内容。</p>',
      tags: ['专题'],
    }
    loading.value = false
  }, 300)
})
</script>

<template>
  <div class="focus-detail-page">
    <PageHero
      v-if="focus"
      :title="focus.title"
      :subtitle="focus.subtitle"
      :background="focus.cover"
    />

    <div v-if="loading" class="container" style="padding: 4rem; text-align: center">
      <p>加载中...</p>
    </div>

    <div v-else-if="focus" class="container">
      <TextImageSection
        :title="focus.title"
        :subtitle="focus.subtitle"
        :details="focus.description"
        :image="focus.cover"
        :reverse="false"
      />

      <article class="focus-detail">
        <div class="focus-detail__tags" v-if="focus.tags && focus.tags.length > 0">
          <span v-for="tag in focus.tags" :key="tag" class="focus-detail__tag">{{ tag }}</span>
        </div>

        <div class="focus-detail__content" v-html="focus.content"></div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.focus-detail-page {
  min-height: 100vh;
  background: var(--color-surface);
}

.focus-detail {
  max-width: 900px;
  margin: 3rem auto 0;
  padding: 3rem;
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
}

.focus-detail__tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.focus-detail__tag {
  padding: 0.5rem 1rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
}

.focus-detail__content {
  line-height: 1.8;
  color: var(--color-text-primary);
}

.focus-detail__content :deep(h3) {
  margin: 2rem 0 1rem;
  font-size: 1.3rem;
  color: var(--color-text-primary);
}

.focus-detail__content :deep(p) {
  margin: 1rem 0;
}
</style>

