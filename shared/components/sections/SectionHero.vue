<script setup>
import { computed } from 'vue'

// 支持两种 props 格式：
// 1. { title, subtitle, description, background, overlayColor, actions } - 前端格式
// 2. { title, tag, description } - Builder 格式（tag 映射到 subtitle）
const props = defineProps({
  title: {
    type: String,
    default: 'Empowering Future Innovators',
  },
  subtitle: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default:
      'We build a collaborative ecosystem for interdisciplinary research, experiential learning, and global partnerships.',
  },
  background: {
    type: String,
    default: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
  },
  overlayColor: {
    type: String,
    default: 'rgba(11, 58, 130, 0.85)',
  },
  actions: {
    type: Array,
    default: () => [
      { label: 'Learn more', href: '#', variant: 'primary' },
      { label: 'Campus tour', href: '#', variant: 'secondary' },
    ],
  },
})

// 统一 subtitle：优先使用 subtitle，如果没有则使用 tag
const displaySubtitle = computed(() => props.subtitle || props.tag || 'A campus where excellence meets opportunity.')
</script>

<template>
  <section class="section-hero" :style="{ '--overlay-color': props.overlayColor }">
    <img :src="props.background" :alt="props.title" class="section-hero__background" loading="lazy" />
    <div class="section-hero__overlay">
      <div class="section-hero__content">
        <p class="section-hero__subtitle">{{ displaySubtitle }}</p>
        <h1 class="section-hero__title">{{ props.title }}</h1>
        <p class="section-hero__description">
          {{ props.description }}
        </p>
        <div class="section-hero__actions">
          <a
            v-for="action in props.actions"
            :key="action.label"
            :href="action.href"
            :class="['section-hero__btn', `section-hero__btn--${action.variant ?? 'primary'}`]"
          >
            {{ action.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-hero {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 26rem;
  display: flex;
  align-items: stretch;
  background-color: #0f172a;
  color: #ffffff;
}

.section-hero__background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
}

.section-hero__overlay {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  background: linear-gradient(110deg, var(--overlay-color), rgba(15, 23, 42, 0.35));
  padding: clamp(2.4rem, 3vw, 3.6rem);
}

.section-hero__content {
  max-width: 48rem;
  display: grid;
  gap: 1.2rem;
}

.section-hero__subtitle {
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

.section-hero__title {
  margin: 0;
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  line-height: 1.15;
  font-weight: 700;
}

.section-hero__description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.section-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.8rem;
}

.section-hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.8rem;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section-hero__btn:hover {
  transform: translateY(-0.1rem);
  box-shadow: var(--shadow-soft);
}

.section-hero__btn--primary {
  background: #ffd166;
  color: #0f172a;
}

.section-hero__btn--secondary {
  background: transparent;
  border: 0.1rem solid rgba(255, 255, 255, 0.6);
  color: #ffffff;
}

@media (max-width: 48rem) {
  .section-hero {
    min-height: 22rem;
  }

  .section-hero__overlay {
    padding: 1.8rem;
  }

  .section-hero__actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
}
</style>

