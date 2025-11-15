<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const quickLinks = [
  { labelKey: 'layout.quickLinks.students', href: '#' },
  { labelKey: 'layout.quickLinks.staff', href: '#' },
  { labelKey: 'layout.quickLinks.visitors', href: '#' },
  { labelKey: 'layout.quickLinks.services', href: '#' },
  { labelKey: 'layout.quickLinks.contact', href: '#' },
  { labelKey: 'layout.quickLinks.portal', href: '#' },
  { labelKey: 'layout.quickLinks.showcase', href: '/style-guide' },
]
</script>

<template>
  <div class="top-links">
    <nav class="top-links__nav">
      <a v-for="item in quickLinks" :key="item.labelKey" class="top-links__item" :href="item.href">
        {{ t(item.labelKey) }}
      </a>
    </nav>
    <div class="top-links__actions">
      <button type="button" class="top-links__action">
        {{ t('layout.quickLinks.cn') }}
      </button>
      <span class="divider" aria-hidden="true">/</span>
      <button type="button" class="top-links__action">
        {{ t('layout.quickLinks.en') }}
      </button>
      <button type="button" class="top-links__search" aria-label="search">
        <span class="top-links__search-icon" aria-hidden="true">🔍</span>
        <span class="top-links__search-text">{{ t('layout.quickLinks.search') }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.top-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 2.4rem;
  font-size: 1rem;
  background: var(--color-surface-contrast);
  border-bottom: 0.1rem solid var(--color-border);
}

.top-links__nav {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
}

.top-links__item {
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.top-links__item:hover {
  color: var(--color-primary);
}

.top-links__actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.top-links__action {
  background: none;
  border: none;
  padding: 0;
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.top-links__action:hover {
  color: var(--color-primary);
}

.top-links__search {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 0.1rem solid var(--color-border);
  border-radius: 999px;
  padding: 0.4rem 1rem;
  background-color: #ffffff;
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.top-links__search:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.top-links__search-icon {
  line-height: 1;
}

.divider {
  color: var(--color-border);
}

@media (max-width: 64rem) {
  .top-links {
    display: none;
  }
}
</style>

