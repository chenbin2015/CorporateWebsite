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
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

const isPlaying = ref(false)
</script>

<template>
  <section class="video-player" :class="{ 'video-player--fullwidth': fullWidth }">
    <div class="video-player__container" :class="{ 'video-player__container--fullwidth': fullWidth }">
      <header v-if="title" class="video-player__header">
        <h3>{{ title }}</h3>
      </header>
      <div class="video-wrapper" :style="{ width, height }">
        <video
          v-if="src"
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
        <div v-else class="video-placeholder">
          <p>请配置视频地址</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-player {
  width: 100%;
  margin: 0;
  padding: 0;
}

.video-player--fullwidth .video-player__container {
  width: 100%;
  max-width: 100%;
}

.video-player__container {
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 2.4rem 1.5rem;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 0.5rem);
}

.video-player__container--fullwidth {
  max-width: 100%;
  padding: 0;
  border-radius: 0;
}

.video-player__header {
  margin-bottom: 1rem;
  padding: 0 1.5rem;
  padding-top: 1.5rem;
}

.video-player__container--fullwidth .video-player__header {
  padding: 1.5rem;
}

.video-player__header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary, #333);
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: var(--radius-md, 0.375rem);
  overflow: hidden;
}

.video-player__container--fullwidth .video-wrapper {
  border-radius: 0;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  color: #999;
  font-size: 1rem;
}

@media (max-width: 48rem) {
  .video-player__container {
    padding: 1.6rem 1rem;
  }

  .video-player__header {
    padding: 0 1rem;
    padding-top: 1rem;
  }

  .video-player__container--fullwidth .video-player__header {
    padding: 1rem;
  }
}
</style>

