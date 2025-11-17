<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '模块标题',
  },
  subtitle: {
    type: String,
    default: '这里是一段用于说明模块的子标题。',
  },
  details: {
    type: String,
    default: '这里是一段用于展示模块详情的示例文案，用于更深入地说明该图文区域的内容。',
  },
  image: {
    type: String,
    default: 'https://picsum.photos/seed/textimage/800/600',
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
    default: '1.6rem',
  },
  subtitleColor: {
    type: String,
    default: '#64748b',
  },
  subtitleSize: {
    type: String,
    default: '0.96rem',
  },
  detailsColor: {
    type: String,
    default: '#0f172a',
  },
  detailsSize: {
    type: String,
    default: '0.95rem',
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
      <img :src="props.image" :alt="props.title" loading="lazy" :style="{ minHeight: props.imageHeight }" />
    </div>
    <div class="text-image-preview__content">
      <h3 :style="{ color: props.titleColor, fontSize: props.titleSize }">
        {{ props.title }}
      </h3>
      <p
        v-if="props.subtitle"
        class="text-image-preview__subtitle"
        :style="{ color: props.subtitleColor, fontSize: props.subtitleSize }"
      >
        {{ props.subtitle }}
      </p>
      <p
        class="text-image-preview__details"
        :style="{ color: props.detailsColor, fontSize: props.detailsSize }"
      >
        {{ props.details }}
      </p>
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

.text-image-preview__subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: #64748b;
}

.text-image-preview__details {
  margin: 0;
  font-size: 0.95rem;
  color: #1f2933;
  line-height: 1.7;
}

@media (max-width: 64rem) {
  .text-image-preview {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>


