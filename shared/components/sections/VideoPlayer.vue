<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '',
  },
  poster: {
    type: String,
    default: '',
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: 'auto',
  },
})

const isPlaying = ref(false)
</script>

<template>
  <section class="video-player">
    <header v-if="title">
      <h3>{{ title }}</h3>
    </header>
    <div class="video-wrapper" :style="{ width, height }">
      <video
        :src="src"
        :poster="poster"
        :autoplay="autoplay"
        :controls="controls"
        class="video"
        @play="isPlaying = true"
        @pause="isPlaying = false"
      >
        您的浏览器不支持视频播放。
      </video>
    </div>
  </section>
</template>

<style scoped>
.video-player {
  padding: 1.6rem;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 0.5rem);
}

header {
  margin-bottom: 1rem;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: var(--radius-md, 0.375rem);
  overflow: hidden;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

