<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@shared/components/PageHero.vue'

const route = useRoute()
const eventId = route.params.id

const event = ref(null)
const loading = ref(true)

// Mock 数据
const mockEvents = {
  '1': {
    id: '1',
    title: '校园开放日',
    subtitle: '欢迎参观我们的校园',
    day: '12',
    month: 'OCT',
    date: '2025-10-12',
    location: '主校区',
    time: '09:00–17:00',
    cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    description: '校园开放日是一个绝佳的机会，让您深入了解我们的教学环境、设施和校园文化。',
    content: `
      <h3>活动安排</h3>
      <p>活动将于上午9点开始，持续至下午5点。期间将安排校园参观、专业介绍、师生交流等多个环节。</p>
      
      <h3>参观路线</h3>
      <p>我们将为您提供详细的参观路线图，包括教学楼、实验室、图书馆、学生宿舍等主要场所。</p>
      
      <h3>报名方式</h3>
      <p>请提前通过官方网站或电话预约，以便我们为您安排更好的参观体验。</p>
    `,
    contact: '联系电话：010-1234-5678',
  },
  '2': {
    id: '2',
    title: '学术研讨会',
    subtitle: '前沿科技与创新',
    day: '21',
    month: 'NOV',
    date: '2025-11-21',
    location: '科学中心',
    time: '13:30–18:00',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    description: '本次研讨会将邀请多位知名专家学者，分享最新研究成果和学术观点。',
    content: `
      <h3>会议主题</h3>
      <p>会议将围绕人工智能、大数据、生物技术等前沿领域展开深入讨论。</p>
      
      <h3>演讲嘉宾</h3>
      <p>多位来自国内外知名高校和研究机构的专家学者将发表主题演讲。</p>
      
      <h3>参会方式</h3>
      <p>欢迎全校师生及校外学者报名参加，请提前注册以获得参会资格。</p>
    `,
    contact: '报名邮箱：conference@example.edu',
  },
}

onMounted(() => {
  setTimeout(() => {
    event.value = mockEvents[eventId] || {
      id: eventId,
      title: '活动标题',
      subtitle: '活动副标题',
      day: '01',
      month: 'JAN',
      date: '2025-01-01',
      location: '主校区',
      time: '09:00',
      cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
      description: '这是活动描述。',
      content: '<p>这是活动详情内容。</p>',
      contact: '联系方式',
    }
    loading.value = false
  }, 300)
})
</script>

<template>
  <div class="event-detail-page">
    <PageHero
      v-if="event"
      :title="event.title"
      :subtitle="event.subtitle"
      :background="event.cover"
    />

    <div v-if="loading" class="container" style="padding: 4rem; text-align: center">
      <p>加载中...</p>
    </div>

    <div v-else-if="event" class="container">
      <article class="event-detail">
        <div class="event-detail__header">
          <div class="event-detail__date-box">
            <span class="event-detail__day">{{ event.day }}</span>
            <span class="event-detail__month">{{ event.month }}</span>
          </div>
          <div class="event-detail__info">
            <h2 class="event-detail__title">{{ event.title }}</h2>
            <p class="event-detail__description">{{ event.description }}</p>
            <div class="event-detail__meta">
              <div class="event-detail__meta-item">
                <strong>时间：</strong>{{ event.date }} {{ event.time }}
              </div>
              <div class="event-detail__meta-item">
                <strong>地点：</strong>{{ event.location }}
              </div>
              <div class="event-detail__meta-item" v-if="event.contact">
                <strong>联系方式：</strong>{{ event.contact }}
              </div>
            </div>
          </div>
        </div>

        <div class="event-detail__content" v-html="event.content"></div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.event-detail-page {
  min-height: 100vh;
  background: var(--color-surface);
}

.event-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 0;
}

.event-detail__header {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.event-detail__date-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  padding: 1rem;
}

.event-detail__day {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
}

.event-detail__month {
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

.event-detail__info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-detail__title {
  margin: 0;
  font-size: 2rem;
  color: var(--color-text-primary);
}

.event-detail__description {
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.event-detail__meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.event-detail__meta-item {
  color: var(--color-text-primary);
  font-size: 0.95rem;
}

.event-detail__meta-item strong {
  color: var(--color-text-secondary);
  margin-right: 0.5rem;
}

.event-detail__content {
  line-height: 1.8;
  color: var(--color-text-primary);
}

.event-detail__content :deep(h3) {
  margin: 2rem 0 1rem;
  font-size: 1.3rem;
  color: var(--color-text-primary);
}

.event-detail__content :deep(p) {
  margin: 1rem 0;
}

@media (max-width: 48rem) {
  .event-detail__header {
    grid-template-columns: 1fr;
  }

  .event-detail__date-box {
    width: 60px;
    height: 60px;
  }

  .event-detail__day {
    font-size: 1.5rem;
  }
}
</style>

