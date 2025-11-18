<script setup>
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
})
</script>

<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>快速链接</h4>
        <ul class="footer-links">
          <li v-for="link in links" :key="link.label">
            <a :href="link.href">{{ link.label }}</a>
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
    <div class="footer-bottom">
      <p>{{ copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-surface-contrast, #1e293b);
  color: var(--color-text-inverse, #f1f5f9);
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
  color: var(--color-text-inverse, #cbd5e1);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #fff;
}

.footer-contact {
  display: grid;
  gap: 0.5rem;
}

.footer-contact p {
  margin: 0;
  color: var(--color-text-inverse, #cbd5e1);
  font-size: 0.9rem;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  color: var(--color-text-inverse, #94a3b8);
  font-size: 0.85rem;
}
</style>

