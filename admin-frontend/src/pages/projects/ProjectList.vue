<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const projects = [
  {
    id: 1,
    name: '企业官网',
    pages: 12,
    updatedAt: '2025-03-20',
  },
  {
    id: 2,
    name: '招生专题站',
    pages: 6,
    updatedAt: '2025-03-18',
  },
]

const goToBuilder = (projectId) => {
  const defaultPageId = 'home'
  router.push({ name: 'pageBuilder', params: { projectId, pageId: defaultPageId } })
}
</script>

<template>
  <div class="project-list">
    <header class="project-list__header">
      <div>
        <h1>项目管理</h1>
        <p>创建和维护可视化搭建项目。</p>
      </div>
      <button class="btn">新建项目</button>
    </header>

    <section class="project-list__grid">
      <article v-for="project in projects" :key="project.id" class="card">
        <h3>{{ project.name }}</h3>
        <p>{{ project.pages }} 个页面 · 最近更新 {{ project.updatedAt }}</p>
        <div class="project-list__actions">
          <button class="btn" @click="goToBuilder(project.id)">打开</button>
          <button class="link">更多</button>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.project-list {
  display: grid;
  gap: 1.5rem;
}

.project-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-list__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.project-list__actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.link {
  border: none;
  background: none;
  color: var(--color-primary);
  cursor: pointer;
}
</style>

