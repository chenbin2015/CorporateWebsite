<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '默认版块标题',
  },
  subtitle: {
    type: String,
    default: 'Default subtitle',
  },
  details: {
    type: String,
    default:
      '请在接口返回的数据中提供 title、subtitle、details、image 等字段，组件会自动渲染。当前显示为静态占位内容。',
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  imageHeight: {
    type: String,
    default: '18rem',
  },
  titleColor: {
    type: String,
    default: '#0f172a',
  },
  titleSize: {
    type: String,
    default: '1.8rem',
  },
  subtitleColor: {
    type: String,
    default: '#64748b',
  },
  subtitleSize: {
    type: String,
    default: '1rem',
  },
  detailsColor: {
    type: String,
    default: '#0f172a',
  },
  detailsSize: {
    type: String,
    default: '0.98rem',
  },
  reverse: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section :class="['text-image', { 'text-image--reverse': props.reverse }]">
    <div class="text-image__media">
      <img :src="props.image" :alt="props.title" :style="{ minHeight: props.imageHeight }" />
    </div>
    <div class="text-image__content space-y-sm">
      <h2 :style="{ color: props.titleColor, fontSize: props.titleSize }">
        {{ props.title }}
      </h2>
      <p
        v-if="props.subtitle"
        class="text-image__subtitle"
        :style="{ color: props.subtitleColor, fontSize: props.subtitleSize }"
      >
        {{ props.subtitle }}
      </p>
      <div
        class="text-image__details"
        :style="{ color: props.detailsColor, fontSize: props.detailsSize }"
        v-html="props.details"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.text-image {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.4rem;
  align-items: center;
}

.text-image__media {
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 18rem;
  box-shadow: var(--shadow-soft);
}

.text-image__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-image__content h2 {
  margin: 0;
}

.text-image__content p {
  margin: 0;
}

.text-image__subtitle {
  font-size: 0.98rem;
  color: var(--color-text-secondary);
}

.text-image__details {
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--color-text-primary);
}

.text-image__details :deep(p) {
  margin: 0.75rem 0;
}

.text-image__details :deep(p:first-child) {
  margin-top: 0;
}

.text-image__details :deep(p:last-child) {
  margin-bottom: 0;
}

.text-image__details :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  margin: 1rem 0;
}

.text-image__details :deep(h1),
.text-image__details :deep(h2),
.text-image__details :deep(h3),
.text-image__details :deep(h4) {
  margin: 1rem 0 0.5rem;
  font-weight: 600;
}

.text-image__details :deep(ul),
.text-image__details :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
}

.text-image__details :deep(li) {
  margin: 0.25rem 0;
}

.text-image--reverse {
  direction: rtl;
}

.text-image--reverse > * {
  direction: ltr;
}

@media (max-width: 64rem) {
  .text-image {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>

