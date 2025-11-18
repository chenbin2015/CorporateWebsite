<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: '重要通知：请关注最新公告',
  },
  type: {
    type: String,
    default: 'info', // info, warning, error, success
  },
  closable: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'top', // top, bottom
  },
})

const emit = defineEmits(['close'])

const isVisible = ref(true)

const handleClose = () => {
  isVisible.value = false
  emit('close')
}
</script>

<template>
  <div
    v-if="isVisible"
    :class="['notification-banner', `notification-banner--${type}`, `notification-banner--${position}`]"
  >
    <div class="notification-content">
      <span class="notification-message">{{ message }}</span>
      <button v-if="closable" class="notification-close" @click="handleClose" aria-label="关闭">
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.notification-banner {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.75rem 1rem;
  background: var(--color-info, #3b82f6);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.notification-banner--top {
  top: 0;
}

.notification-banner--bottom {
  bottom: 0;
}

.notification-banner--info {
  background: var(--color-info, #3b82f6);
}

.notification-banner--warning {
  background: var(--color-warning, #f59e0b);
}

.notification-banner--error {
  background: var(--color-error, #ef4444);
}

.notification-banner--success {
  background: var(--color-success, #10b981);
}

.notification-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.notification-message {
  flex: 1;
  font-size: 0.9rem;
}

.notification-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}
</style>

