<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import { defaultHeroItems } from '@/data/defaults'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  interval: {
    type: Number,
    default: 5000,
  },
})

const slides = computed(() => (props.items && props.items.length ? props.items : defaultHeroItems))
const autoplayInterval = computed(() => Math.max(props.interval || 5000, 1500))

const activeIndex = ref(0)
let timerId

const goTo = (index) => {
  if (!slides.value.length) {
    return
  }
  activeIndex.value = index % slides.value.length
}

const next = () => {
  if (slides.value.length <= 1) {
    return
  }
  activeIndex.value = (activeIndex.value + 1) % slides.value.length
}

const activeItem = computed(() => slides.value[activeIndex.value] ?? defaultHeroItems[0])

const stopTimer = () => {
  if (!timerId) {
    return
  }
  window.clearInterval(timerId)
  timerId = undefined
}

const startTimer = () => {
  stopTimer()
  if (slides.value.length <= 1) {
    return
  }
  timerId = window.setInterval(next, autoplayInterval.value)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})

watch(
  () => slides.value,
  () => {
    activeIndex.value = 0
    startTimer()
  },
  { deep: true },
)

watch(
  () => props.interval,
  () => {
    startTimer()
  },
)
</script>

<template>
  <section class="hero">
    <div class="hero__background" :style="{ backgroundImage: `url(${activeItem.cover})` }" />
    <div class="hero__overlay">
      <div class="hero__content">
        <p class="hero__eyebrow">{{ activeItem.category }}</p>
        <h2 class="hero__title">{{ activeItem.title }}</h2>
        <p class="hero__description">
          {{ activeItem.description }}
        </p>
        <a class="btn hero__action" :href="activeItem.href">
          {{ activeItem.action }}
        </a>
      </div>
      <div class="hero__bullets">
        <button
          v-for="(item, index) in slides"
          :key="item.title ?? index"
          :class="['hero__bullet', { 'hero__bullet--active': index === activeIndex }]"
          type="button"
          @click="goTo(index)"
        >
          <span class="sr-only">{{ item.title }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 24rem;
  display: flex;
  align-items: stretch;
}

.hero__background {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.6);
}

.hero__overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 3.2rem;
  color: #ffffff;
}

.hero__content {
  max-width: 40rem;
  display: grid;
  gap: 1.2rem;
}

.hero__eyebrow {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.hero__title {
  font-size: 2.6rem;
  line-height: 1.1;
}

.hero__description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
}

.hero__action {
  justify-self: flex-start;
}

.hero__bullets {
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
}

.hero__bullet {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  border: 0.2rem solid rgba(255, 255, 255, 0.4);
  background: transparent;
  padding: 0;
}

.hero__bullet--active {
  background: #ffffff;
  border-color: #ffffff;
}

.sr-only {
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  padding: 0;
  margin: -0.1rem;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 64rem) {
  .hero {
    min-height: 20rem;
  }

  .hero__overlay {
    padding: 2.4rem;
  }
}

@media (max-width: 48rem) {
  .hero__title {
    font-size: 2rem;
  }

  .hero__overlay {
    padding: 1.6rem;
  }

  .hero__bullets {
    justify-content: center;
  }
}
</style>

