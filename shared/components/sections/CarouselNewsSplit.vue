<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { isDesignMode } from '@shared/utils/context'
import { handleNavigation, handleDetailPageNavigation } from '@/utils/navigation'

const props = defineProps({
  // 轮播相关
  carouselItems: {
    type: Array,
    default: () => [],
  },
  carouselInterval: {
    type: Number,
    default: 5000,
  },
  // 新闻相关
  newsTitle: {
    type: String,
    default: '最新动态',
  },
  newsItems: {
    type: Array,
    default: () => [],
  },
  newsDetailPage: {
    type: Object,
    default: () => null,
  },
  // 数据源
  carouselDataSourceCode: {
    type: String,
    default: null,
  },
  newsDataSourceCode: {
    type: String,
    default: null,
  },
  // 布局
  reversed: {
    type: Boolean,
    default: false,
  },
})

// 轮播相关
const slides = computed(() => {
  if (props.carouselItems && props.carouselItems.length > 0) {
    return props.carouselItems
  }
  return [
    {
      title: '默认标题',
      description: '这是轮播图的默认内容',
      cover: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80',
      navigation: { type: 'none' },
    },
  ]
})

const activeIndex = ref(0)
let timerId

const autoplayInterval = computed(() => Math.max(props.carouselInterval || 5000, 1500))

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

const handleCarouselActionClick = (slide, event) => {
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (slide.navigation && slide.navigation.type !== 'none') {
    event.preventDefault()
    event.stopPropagation()
    handleNavigation(slide.navigation, slide)
  }
}

// 新闻相关
const handleNewsItemClick = (item, event) => {
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (props.newsDetailPage) {
    event.preventDefault()
    handleDetailPageNavigation(props.newsDetailPage, item)
  }
}

const splitClass = computed(() => [
  'carousel-news-split',
  props.reversed ? 'carousel-news-split--reversed' : '',
])

watch(
  () => props.carouselInterval,
  () => {
    if (!isDesignMode()) {
      stopAutoplay()
      startAutoplay()
    }
  },
)

watch(
  () => slides.value,
  () => {
    if (!isDesignMode() && slides.value.length > 1) {
      stopAutoplay()
      startAutoplay()
    }
  },
  { deep: true },
)

onMounted(() => {
  if (!isDesignMode()) {
    startAutoplay()
  }
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section :class="splitClass">
    <!-- 左侧：轮播图 -->
    <div class="carousel-news-split__carousel">
      <div class="carousel-news-split__carousel-container">
        <div class="carousel-news-split__slides">
          <article
            v-for="(slide, index) in slides"
            :key="index"
            :class="[
              'carousel-news-split__slide',
              { 'carousel-news-split__slide--active': index === activeIndex },
            ]"
          >
            <img
              :src="slide.cover"
              :alt="slide.title"
              class="carousel-news-split__image"
              loading="lazy"
            />
            <div class="carousel-news-split__overlay">
              <div class="carousel-news-split__content">
                <h3 class="carousel-news-split__title">{{ slide.title }}</h3>
                <p v-if="slide.description" class="carousel-news-split__description">
                  {{ slide.description }}
                </p>
                <a
                  v-if="slide.action"
                  :href="isDesignMode() || (slide.navigation && slide.navigation.type !== 'none') ? 'javascript:void(0)' : (slide.href || '#')"
                  class="carousel-news-split__action"
                  @click="(e) => handleCarouselActionClick(slide, e)"
                  :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : 'cursor: pointer;'"
                >
                  {{ slide.action }}
                </a>
              </div>
            </div>
          </article>
        </div>

        <div v-if="slides.length > 1" class="carousel-news-split__controls">
          <button
            type="button"
            class="carousel-news-split__btn carousel-news-split__btn--prev"
            @click="prev"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            class="carousel-news-split__btn carousel-news-split__btn--next"
            @click="next"
            aria-label="Next"
          >
            →
          </button>
        </div>

        <div v-if="slides.length > 1" class="carousel-news-split__indicators">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            type="button"
            :class="[
              'carousel-news-split__indicator',
              { 'carousel-news-split__indicator--active': index === activeIndex },
            ]"
            @click="goTo(index)"
            :aria-label="`Go to slide ${index + 1}`"
          />
        </div>
      </div>
    </div>

    <!-- 右侧：新闻列表 -->
    <div class="carousel-news-split__news">
      <header class="carousel-news-split__news-header">
        <h3>{{ newsTitle }}</h3>
      </header>
      <ul class="carousel-news-split__news-list">
        <li
          v-for="(item, index) in newsItems"
          :key="item.id || index"
          class="carousel-news-split__news-item"
        >
          <a
            :href="isDesignMode() ? 'javascript:void(0)' : (newsDetailPage ? 'javascript:void(0)' : '#')"
            class="carousel-news-split__news-link"
            @click="(e) => handleNewsItemClick(item, e)"
            :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : 'cursor: pointer;'"
          >
            <span class="carousel-news-split__news-title">{{ item.title }}</span>
            <time v-if="item.date" class="carousel-news-split__news-date">{{ item.date }}</time>
          </a>
        </li>
      </ul>
      <div v-if="newsItems.length === 0" class="carousel-news-split__news-empty">
        <p>暂无新闻</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-news-split {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2.4rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface-contrast);
  box-shadow: var(--shadow-soft);
  min-height: 24rem;
}

.carousel-news-split--reversed {
  grid-template-columns: 1fr 1.1fr;
  direction: rtl;
}

.carousel-news-split--reversed > * {
  direction: ltr;
}

/* 轮播部分 */
.carousel-news-split__carousel {
  position: relative;
  overflow: hidden;
  min-height: 24rem;
}

.carousel-news-split__carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 24rem;
}

.carousel-news-split__slides {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 24rem;
}

.carousel-news-split__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
  overflow: hidden;
}

.carousel-news-split__slide--active {
  opacity: 1;
  z-index: 1;
}

.carousel-news-split__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  min-width: 100%;
  min-height: 100%;
}

.carousel-news-split__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.45) 100%);
  display: flex;
  align-items: center;
  padding: clamp(1.6rem, 3vw, 2.4rem);
}

.carousel-news-split__content {
  max-width: 100%;
  color: #ffffff;
  display: grid;
  gap: 0.8rem;
}

.carousel-news-split__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
  font-weight: 700;
  margin: 0;
}

.carousel-news-split__description {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  opacity: 0.9;
  margin: 0;
}

.carousel-news-split__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  background: #ffd166;
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 0.4rem;
  width: fit-content;
  font-size: 0.9rem;
}

.carousel-news-split__action:hover {
  transform: translateY(-0.1rem);
  box-shadow: var(--shadow-soft);
}

.carousel-news-split__controls {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 2;
  pointer-events: none;
}

.carousel-news-split__btn {
  pointer-events: all;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease;
  backdrop-filter: blur(0.4rem);
}

.carousel-news-split__btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.carousel-news-split__indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
}

.carousel-news-split__indicator {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.3s ease;
}

.carousel-news-split__indicator--active {
  background: #ffffff;
}

/* 新闻部分 */
.carousel-news-split__news {
  padding: clamp(1.6rem, 3vw, 2.4rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.carousel-news-split__news-header {
  margin: 0;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.carousel-news-split__news-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-heading);
}

.carousel-news-split__news-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;
  flex: 1;
}

.carousel-news-split__news-item {
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--color-border-light, #f1f5f9);
}

.carousel-news-split__news-item:last-child {
  border-bottom: none;
}

.carousel-news-split__news-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.carousel-news-split__news-link:hover {
  color: var(--el-color-primary);
}

.carousel-news-split__news-title {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.carousel-news-split__news-date {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.carousel-news-split__news-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 64rem) {
  .carousel-news-split,
  .carousel-news-split--reversed {
    grid-template-columns: 1fr;
  }

  .carousel-news-split__carousel {
    min-height: 20rem;
  }

  .carousel-news-split__carousel-container,
  .carousel-news-split__slides {
    min-height: 20rem;
  }
}
</style>

