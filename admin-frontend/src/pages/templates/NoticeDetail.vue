<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@shared/components/PageHero.vue'

const route = useRoute()
const noticeId = route.params.id

const notice = ref(null)
const loading = ref(true)

// Mock 数据
const mockNotices = {
  '1': {
    id: '1',
    title: '关于2025年春季学期开学通知',
    subtitle: '重要通知',
    date: '2025-01-20',
    publisher: '教务处',
    content: `
      <p>各位同学、老师：</p>
      
      <p>根据学校校历安排，2025年春季学期将于2月17日正式开学。现将相关事项通知如下：</p>
      
      <h3>一、开学时间</h3>
      <p>2025年2月17日（星期一）正式上课。请全体师生按时返校，做好开学准备工作。</p>
      
      <h3>二、注册安排</h3>
      <p>学生注册时间为2月15日-16日，请携带学生证及相关材料到各学院办理注册手续。</p>
      
      <h3>三、注意事项</h3>
      <p>1. 请提前做好课程预习和准备工作；</p>
      <p>2. 注意个人健康防护，如有不适及时就医；</p>
      <p>3. 关注学校官方通知，及时了解最新安排。</p>
      
      <p>特此通知。</p>
      
      <p style="text-align: right; margin-top: 2rem;">教务处<br>2025年1月20日</p>
    `,
    attachments: [
      { name: '2025年春季学期校历.pdf', url: '#' },
    ],
  },
  '2': {
    id: '2',
    title: '图书馆开放时间调整通知',
    subtitle: '服务通知',
    date: '2025-01-18',
    publisher: '图书馆',
    content: `
      <p>各位读者：</p>
      
      <p>为更好地服务师生，图书馆自2025年2月起调整开放时间，具体安排如下：</p>
      
      <h3>开放时间</h3>
      <p><strong>周一至周五：</strong>8:00 - 22:00</p>
      <p><strong>周六、周日：</strong>9:00 - 21:00</p>
      
      <h3>注意事项</h3>
      <p>1. 节假日开放时间另行通知；</p>
      <p>2. 请遵守图书馆相关规定，保持安静；</p>
      <p>3. 如有疑问，请联系图书馆服务台。</p>
      
      <p style="text-align: right; margin-top: 2rem;">图书馆<br>2025年1月18日</p>
    `,
    attachments: [],
  },
}

onMounted(() => {
  setTimeout(() => {
    notice.value = mockNotices[noticeId] || {
      id: noticeId,
      title: '公告标题',
      subtitle: '公告',
      date: '2025-01-01',
      publisher: '发布部门',
      content: '<p>这是公告详情内容。</p>',
      attachments: [],
    }
    loading.value = false
  }, 300)
})
</script>

<template>
  <div class="notice-detail-page">
    <PageHero
      v-if="notice"
      :title="notice.title"
      :subtitle="notice.subtitle"
    />

    <div v-if="loading" class="container" style="padding: 4rem; text-align: center">
      <p>加载中...</p>
    </div>

    <div v-else-if="notice" class="container">
      <article class="notice-detail">
        <div class="notice-detail__meta">
          <div class="notice-detail__meta-row">
            <time class="notice-detail__date">{{ notice.date }}</time>
            <span class="notice-detail__publisher">发布部门：{{ notice.publisher }}</span>
          </div>
        </div>

        <div class="notice-detail__content" v-html="notice.content"></div>

        <div v-if="notice.attachments && notice.attachments.length > 0" class="notice-detail__attachments">
          <h3>附件下载</h3>
          <ul>
            <li v-for="(file, index) in notice.attachments" :key="index">
              <a :href="file.url" target="_blank">{{ file.name }}</a>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.notice-detail-page {
  min-height: 100vh;
  background: var(--color-surface);
}

.notice-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 0;
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  padding: 3rem;
}

.notice-detail__meta {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.notice-detail__meta-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.notice-detail__date {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.notice-detail__publisher {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.notice-detail__content {
  line-height: 1.8;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
}

.notice-detail__content :deep(h3) {
  margin: 2rem 0 1rem;
  font-size: 1.2rem;
  color: var(--color-text-primary);
  font-weight: 600;
}

.notice-detail__content :deep(p) {
  margin: 1rem 0;
  text-indent: 2em;
}

.notice-detail__content :deep(p:first-child) {
  text-indent: 0;
}

.notice-detail__attachments {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.notice-detail__attachments h3 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  color: var(--color-text-primary);
}

.notice-detail__attachments ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notice-detail__attachments li {
  margin: 0.5rem 0;
}

.notice-detail__attachments a {
  color: var(--color-primary);
  text-decoration: none;
}

.notice-detail__attachments a:hover {
  text-decoration: underline;
}
</style>

