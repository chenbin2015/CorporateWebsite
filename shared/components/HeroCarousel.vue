<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { isDesignMode } from '@shared/utils/context'
import { handleNavigation } from '@/utils/navigation'

// 内联默认值，避免依赖 @/data/defaults
const defaultHeroItems = [
  {
    title: '默认标题：打造高水平大学',
    description: '这是组件的默认介绍文案，可在调用组件时通过 props 覆盖。',
    category: '默认分类',
    action: '了解更多',
    href: '#',
    cover: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80',
  },
]

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  interval: {
    type: Number,
    default: 5000,
  },
  navigation: {
    type: Object,
    default: () => ({
      type: 'none',
      targetPageCode: null,
      path: null,
      url: '',
      params: {},
    }),
  },
})

const slides = computed(() => (props.items && props.items.length ? props.items : defaultHeroItems))
const autoplayInterval = computed(() => Math.max(props.interval || 5000, 1500))

const activeIndex = ref(0)
let timerId

const handleActionClick = (slide, event) => {
  // 设计态中禁用交互
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  // 如果有 navigation 配置，使用 navigation 跳转
  if (props.navigation && props.navigation.type !== 'none') {
    event.preventDefault()
    event.stopPropagation()
    handleNavigation(props.navigation, slide)
  }
  // 否则使用 slide.href（向后兼容）
}

const goTo = (index) => {
  if (!slides.value.length) {
    return
  }
  activeIndex.value = index % slides.value.length
}

const next = () => {
  goTo(activeIndex.value + 1)
}

const prev = () => {
  goTo(activeIndex.value - 1 + slides.value.length)
}

const startAutoplay = () => {
  if (slides.value.length <= 1) {
    return
  }
  timerId = setInterval(() => {
    next()
  }, autoplayInterval.value)
}

const stopAutoplay = () => {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

watch(
  () => props.interval,
  () => {
    stopAutoplay()
    startAutoplay()
  },
)
</script>

<template>
  <section class="hero-carousel">
    <div class="hero-carousel__container">
      <div class="hero-carousel__slides">
        <article
          v-for="(slide, index) in slides"
          :key="index"
          :class="['hero-carousel__slide', { 'hero-carousel__slide--active': index === activeIndex }]"
        >
          <img :src="slide.cover" :alt="slide.title" class="hero-carousel__image" loading="lazy" />
          <div class="hero-carousel__overlay">
            <div class="hero-carousel__content">
              <span class="hero-carousel__category">{{ slide.category }}</span>
              <h2 class="hero-carousel__title">{{ slide.title }}</h2>
              <p class="hero-carousel__description">{{ slide.description }}</p>
              <a 
                :href="isDesignMode() || (navigation && navigation.type !== 'none') ? 'javascript:void(0)' : (slide.href || '#')" 
                class="hero-carousel__action"
                @click="(e) => handleActionClick(slide, e)"
                :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : 'cursor: pointer;'"
              >
                {{ slide.action }}
              </a>
            </div>
          </div>
        </article>
      </div>

      <div v-if="slides.length > 1" class="hero-carousel__controls">
        <button type="button" class="hero-carousel__btn hero-carousel__btn--prev" @click="prev" aria-label="Previous">
          ←
        </button>
        <button type="button" class="hero-carousel__btn hero-carousel__btn--next" @click="next" aria-label="Next">
          →
        </button>
      </div>

      <div v-if="slides.length > 1" class="hero-carousel__indicators">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          type="button"
          :class="['hero-carousel__indicator', { 'hero-carousel__indicator--active': index === activeIndex }]"
          @click="goTo(index)"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-carousel {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 32rem;
  background: #0f172a;
}

.hero-carousel__container {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-carousel__slides {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-carousel__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.hero-carousel__slide--active {
  opacity: 1;
  z-index: 1;
}

.hero-carousel__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-carousel__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.45) 100%);
  display: flex;
  align-items: center;
  padding: clamp(2.4rem, 4vw, 4.8rem);
}

.hero-carousel__content {
  max-width: 64rem;
  color: #ffffff;
  display: grid;
  gap: 1.2rem;
}

.hero-carousel__category {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  opacity: 0.85;
}

.hero-carousel__title {
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.1;
  font-weight: 700;
}

.hero-carousel__description {
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.2rem);
  opacity: 0.9;
  max-width: 48rem;
}

.hero-carousel__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 2rem;
  border-radius: 999px;
  background: #ffd166;
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 0.4rem;
  width: fit-content;
}

.hero-carousel__action:hover {
  transform: translateY(-0.1rem);
  box-shadow: var(--shadow-soft);
}

.hero-carousel__controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.2rem;
  z-index: 2;
  pointer-events: none;
}

.hero-carousel__btn {
  pointer-events: all;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 0.3s ease;
  backdrop-filter: blur(0.4rem);
}

.hero-carousel__btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.hero-carousel__indicators {
  position: absolute;
  bottom: 1.6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.6rem;
  z-index: 2;
}

.hero-carousel__indicator {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.3s ease;
}

.hero-carousel__indicator--active {
  background: #ffffff;
}

@media (max-width: 48rem) {
  .hero-carousel {
    min-height: 24rem;
  }

  .hero-carousel__controls {
    padding: 0 0.8rem;
  }

  .hero-carousel__btn {
    width: 2.4rem;
    height: 2.4rem;
    font-size: 1.2rem;
  }
}
</style>
