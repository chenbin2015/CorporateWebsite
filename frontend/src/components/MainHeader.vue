<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const isNavOpen = ref(false)

const navItems = computed(() => [
  { label: t('layout.nav.about'), name: 'about' },
  { label: t('layout.nav.colleges'), name: 'colleges' },
  { label: t('layout.nav.faculty'), name: 'faculty' },
  { label: t('layout.nav.education'), name: 'education' },
  { label: t('layout.nav.research'), name: 'research' },
  { label: t('layout.nav.admissions'), name: 'admissions' },
  { label: t('layout.nav.library'), name: 'library' },
])

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const handleNavigate = () => {
  isNavOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    isNavOpen.value = false
  },
)
</script>

<template>
  <header class="main-header">
    <div class="main-header__brand">
      <img src="/vite.svg" alt="Brand logo" class="brand-mark" />
      <div class="brand-text">
        <span class="brand-text__name">{{ t('layout.title') }}</span>
        <span class="brand-text__tagline">{{ t('layout.tagline') }}</span>
      </div>
    </div>

    <button class="hamburger" type="button" @click="toggleNav" aria-label="toggle navigation">
      <span :class="['hamburger__line', { 'hamburger__line--active': isNavOpen }]" />
      <span :class="['hamburger__line', { 'hamburger__line--active': isNavOpen }]" />
      <span :class="['hamburger__line', { 'hamburger__line--active': isNavOpen }]" />
    </button>

    <nav :class="['main-nav', { 'main-nav--open': isNavOpen }]">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        class="main-nav__item"
        :to="{ name: item.name }"
        :class="{ 'main-nav__item--active': route.name === item.name }"
        @click="handleNavigate"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2.4rem;
  background: linear-gradient(135deg, #0b3a82 0%, #1e5aa8 100%);
  color: #ffffff;
}

.main-header__brand {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.brand-mark {
  width: 3.2rem;
  height: 3.2rem;
  background: #ffffff;
  border-radius: 50%;
  padding: 0.4rem;
}

.brand-text__name {
  font-size: 1.6rem;
  font-weight: 600;
  display: block;
}

.brand-text__tagline {
  font-size: 1rem;
  opacity: 0.85;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 0.4rem;
  background: none;
  border: none;
  padding: 0.4rem;
}

.hamburger__line {
  width: 2.4rem;
  height: 0.2rem;
  background-color: rgba(255, 255, 255, 0.8);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}

.main-nav__item {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  padding: 0.6rem 0;
  position: relative;
}

.main-nav__item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0.2rem;
  background-color: #ffd166;
  transition: width 0.3s ease;
}

.main-nav__item:hover::after,
.main-nav__item--active::after {
  width: 100%;
}

@media (max-width: 64rem) {
  .hamburger {
    display: flex;
  }

  .main-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    background: linear-gradient(135deg, #0b3a82 0%, #1e5aa8 100%);
    padding: 1.2rem 2.4rem;
    gap: 1rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .main-nav--open {
    max-height: 30rem;
  }
}

@media (max-width: 48rem) {
  .main-header {
    padding: 1.2rem 1.6rem;
  }

  .brand-text__name {
    font-size: 1.4rem;
  }
}
</style>

