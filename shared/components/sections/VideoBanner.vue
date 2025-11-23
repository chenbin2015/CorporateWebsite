<script setup>
import { computed } from 'vue'

const props = defineProps({
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
  loop: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  controls: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: 'auto',
  },
  objectFit: {
    type: String,
    default: 'cover', // cover, contain, fill
  },
})

const videoStyle = computed(() => {
  const style = {}
  
  if (props.width) {
    style.width = props.width
  }
  
  if (props.height) {
    style.height = props.height
  }
  
  if (props.objectFit) {
    style.objectFit = props.objectFit
  }
  
  return style
})

const containerStyle = computed(() => {
  const style = {}
  
  if (props.width) {
    style.width = props.width
  }
  
  if (props.height && props.height !== 'auto') {
    style.height = props.height
  }
  
  return style
})
</script>

<template>
  <section class="video-banner">
    <div class="video-banner__container" :style="containerStyle">
      <video
        v-if="src"
        :src="src"
        :poster="poster"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted"
        :controls="controls"
        :style="videoStyle"
        class="video-banner__video"
        playsinline
      >
        您的浏览器不支持视频播放。
      </video>
      <div v-else class="video-banner__placeholder">
        <p>请配置视频地址</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-banner {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  display: block;
}

.video-banner__container {
  position: relative;
  width: 100%;
  max-width: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.video-banner__video {
  width: 100%;
  height: 100%;
  display: block;
  max-width: 100%;
  object-fit: cover;
}

.video-banner__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  background: #f5f5f5;
  color: #999;
  font-size: 1rem;
}

.video-banner__placeholder p {
  margin: 0;
}
</style>

