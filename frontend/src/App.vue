<script setup>
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'

import MainHeader from './components/MainHeader.vue'
import TopLinksBar from './components/TopLinksBar.vue'

const { t } = useI18n()
</script>

<template>
  <div class="app-shell">
    <TopLinksBar />
    <MainHeader />

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <small>{{ t('layout.footer') }}</small>
    </footer>
  </div>
</template>
