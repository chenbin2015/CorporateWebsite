<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '师资名录',
  },
  items: {
    type: Array,
    default: () => [
      {
        name: '王教授',
        title: '计算机科学与技术学院',
        tags: ['博士生导师', '人工智能'],
      },
      {
        name: '李老师',
        title: '软件工程学院',
        tags: ['云计算', '微服务架构'],
      },
    ],
  },
})
</script>

<template>
  <section class="avatar-grid-preview">
    <header>
      <h3>{{ props.title }}</h3>
    </header>
    <div class="avatar-grid-preview__content">
      <article v-for="item in props.items" :key="item.name">
        <div class="avatar-grid-preview__avatar" aria-hidden="true">
          {{ item.name.slice(0, 1) }}
        </div>
        <div>
          <p class="avatar-grid-preview__name">{{ item.name }}</p>
          <p class="avatar-grid-preview__title">{{ item.title }}</p>
          <div class="avatar-grid-preview__tags">
            <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.avatar-grid-preview {
  background: #ffffff;
  border-radius: 0.9rem;
  padding: 1.4rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
  display: grid;
  gap: 1rem;
}

.avatar-grid-preview__content {
  display: grid;
  gap: 0.9rem;
}

article {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.avatar-grid-preview__avatar {
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background: #e0ebff;
  color: #2563eb;
  font-weight: 600;
  display: grid;
  place-items: center;
}

.avatar-grid-preview__name {
  margin: 0;
  font-weight: 600;
}

.avatar-grid-preview__title {
  margin: 0.15rem 0 0;
  font-size: 0.9rem;
  color: #64748b;
}

.avatar-grid-preview__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.35rem;
}

.avatar-grid-preview__tags span {
  font-size: 0.78rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
}
</style>


