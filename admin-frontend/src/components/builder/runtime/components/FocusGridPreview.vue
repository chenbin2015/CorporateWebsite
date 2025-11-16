<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Highlights',
  },
  items: {
    type: Array,
    default: () => [
      {
        title: '智慧校园平台',
        summary: '统一门户、数据中台与移动端一体化建设。',
        href: '#',
        cover: 'https://picsum.photos/seed/focus1/800/600',
      },
      {
        title: '国际合作项目',
        summary: '与世界多所高校开展联合培养与科研合作。',
        href: '#',
        cover: 'https://picsum.photos/seed/focus2/800/600',
      },
      {
        title: '创新创业中心',
        summary: '支持学生创新实践与创业孵化。',
        href: '#',
        cover: 'https://picsum.photos/seed/focus3/800/600',
      },
    ],
  },
})
</script>

<template>
  <section class="focus-preview">
    <header class="focus-preview__header">
      <h3>{{ props.title }}</h3>
    </header>
    <div class="focus-preview__grid">
      <a
        v-for="item in props.items"
        :key="item.title"
        class="focus-preview__item"
        :href="item.href || '#'"
      >
        <div class="focus-preview__media">
          <img :src="item.cover" :alt="item.title" loading="lazy" />
        </div>
        <div class="focus-preview__overlay">
          <h4>{{ item.title }}</h4>
          <p>{{ item.summary }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.focus-preview {
  display: grid;
  gap: 1.2rem;
}

.focus-preview__header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.focus-preview__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.focus-preview__item {
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  min-height: 10rem;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: flex-end;
}

.focus-preview__media {
  position: absolute;
  inset: 0;
}

.focus-preview__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.focus-preview__overlay {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0) 0%,
    rgba(15, 23, 42, 0.9) 100%
  );
  display: grid;
  gap: 0.4rem;
}

.focus-preview__overlay h4 {
  margin: 0;
  font-size: 1.1rem;
}

.focus-preview__overlay p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}

.focus-preview__item:hover .focus-preview__media img {
  transform: scale(1.05);
}

@media (max-width: 64rem) {
  .focus-preview__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 42rem) {
  .focus-preview__grid {
    grid-template-columns: 1fr;
  }
}
</style>


