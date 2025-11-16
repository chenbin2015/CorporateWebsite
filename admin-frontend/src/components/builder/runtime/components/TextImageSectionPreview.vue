<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '模块标题',
  },
  description: {
    type: String,
    default: '这里是一段用于说明本模块内容的示例文案。',
  },
  image: {
    type: String,
    default: 'https://picsum.photos/seed/textimage/800/600',
  },
  highlights: {
    type: Array,
    default: () => ['亮点一：示例内容', '亮点二：示例内容', '亮点三：示例内容'],
  },
  reverse: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section :class="['text-image-preview', { 'text-image-preview--reverse': props.reverse }]">
    <div class="text-image-preview__media">
      <img :src="props.image" :alt="props.title" loading="lazy" />
    </div>
    <div class="text-image-preview__content">
      <h3>{{ props.title }}</h3>
      <p class="text-image-preview__description">
        {{ props.description }}
      </p>
      <ul class="text-image-preview__list">
        <li v-for="item in props.highlights" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.text-image-preview {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.3fr);
  gap: 1.8rem;
  align-items: center;
}

.text-image-preview--reverse {
  direction: rtl;
}

.text-image-preview--reverse > * {
  direction: ltr;
}

.text-image-preview__media {
  border-radius: 0.9rem;
  overflow: hidden;
  min-height: 10rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
}

.text-image-preview__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-image-preview__content {
  display: grid;
  gap: 0.8rem;
}

.text-image-preview__content h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.text-image-preview__description {
  margin: 0;
  font-size: 0.95rem;
  color: #64748b;
}

.text-image-preview__list {
  list-style: none;
  padding: 0;
  margin: 0.2rem 0 0;
  display: grid;
  gap: 0.4rem;
}

.text-image-preview__list li {
  position: relative;
  padding-left: 1.4rem;
  font-size: 0.9rem;
}

.text-image-preview__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: #2563eb;
}

@media (max-width: 64rem) {
  .text-image-preview {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>


