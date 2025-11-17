<script setup>
import { defaultTextImage } from '@/data/defaults'

const props = withDefaults(
  defineProps({
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    details: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    imageHeight: {
      type: String,
      default: '',
    },
    titleColor: {
      type: String,
      default: '',
    },
    titleSize: {
      type: String,
      default: '',
    },
    subtitleColor: {
      type: String,
      default: '',
    },
    subtitleSize: {
      type: String,
      default: '',
    },
    detailsColor: {
      type: String,
      default: '',
    },
    detailsSize: {
      type: String,
      default: '',
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  }),
  {
    title: defaultTextImage.title,
    subtitle: defaultTextImage.subtitle,
    details: defaultTextImage.details,
    image: defaultTextImage.image,
    imageHeight: defaultTextImage.imageHeight,
    titleColor: defaultTextImage.titleColor,
    titleSize: defaultTextImage.titleSize,
    subtitleColor: defaultTextImage.subtitleColor,
    subtitleSize: defaultTextImage.subtitleSize,
    detailsColor: defaultTextImage.detailsColor,
    detailsSize: defaultTextImage.detailsSize,
  },
)
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
      <p
        class="text-image__details"
        :style="{ color: props.detailsColor, fontSize: props.detailsSize }"
      >
        {{ props.details }}
      </p>
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

