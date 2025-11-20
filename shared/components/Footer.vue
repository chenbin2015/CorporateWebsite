<script setup>
import { computed } from 'vue'

const props = defineProps({
  copyright: {
    type: String,
    default: '© 2024 版权所有',
  },
  links: {
    type: Array,
    default: () => [
      { label: '关于我们', href: '#' },
      { label: '联系我们', href: '#' },
      { label: '隐私政策', href: '#' },
      { label: '使用条款', href: '#' },
    ],
  },
  contact: {
    type: Object,
    default: () => ({
      address: '地址：江苏省南京市',
      phone: '电话：025-12345678',
      email: '邮箱：contact@example.com',
    }),
  },
  backgroundColor: {
    type: String,
    default: '#1e293b',
  },
  textColor: {
    type: String,
    default: '#f1f5f9',
  },
  linkColor: {
    type: String,
    default: '#cbd5e1',
  },
})

const footerStyle = computed(() => {
  return {
    backgroundColor: props.backgroundColor,
    color: props.textColor,
  }
})

const linkStyle = computed(() => {
  return {
    color: props.linkColor,
  }
})

const bottomBorderStyle = computed(() => {
  // 根据文字颜色计算边框颜色（使用透明度）
  // 如果是 hex 颜色，转换为 rgba；如果是 rgb/rgba，直接使用
  let borderColor = props.textColor
  if (borderColor.startsWith('#')) {
    // 简单的 hex 转 rgba（假设是 6 位 hex）
    const hex = borderColor.slice(1)
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    borderColor = `rgba(${r}, ${g}, ${b}, 0.1)`
  } else if (borderColor.startsWith('rgb(')) {
    // rgb 转 rgba
    borderColor = borderColor.replace('rgb(', 'rgba(').replace(')', ', 0.1)')
  } else if (!borderColor.startsWith('rgba(')) {
    // 其他格式，使用默认值
    borderColor = 'rgba(255, 255, 255, 0.1)'
  }
  return {
    borderTopColor: borderColor,
  }
})
</script>

<template>
  <footer class="site-footer" :style="footerStyle">
    <div class="footer-content">
      <div class="footer-section">
        <h4>快速链接</h4>
        <ul class="footer-links">
          <li v-for="link in links" :key="link.label">
            <a :href="link.href" :style="linkStyle">{{ link.label }}</a>
          </li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>联系方式</h4>
        <div class="footer-contact">
          <p v-if="contact.address">{{ contact.address }}</p>
          <p v-if="contact.phone">{{ contact.phone }}</p>
          <p v-if="contact.email">{{ contact.email }}</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom" :style="bottomBorderStyle">
      <p>{{ copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 3rem 1.5rem 1.5rem;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}

.footer-links a {
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  opacity: 0.8;
}

.footer-contact {
  display: grid;
  gap: 0.5rem;
}

.footer-contact p {
  margin: 0;
  font-size: 0.9rem;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1.5rem;
  border-top: 1px solid;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
}
</style>

