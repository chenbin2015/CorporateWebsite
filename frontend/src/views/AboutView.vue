<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const rules = computed(() => tm('about.rules') ?? [])
</script>

<template>
  <section class="container">
    <div class="card space-y-md">
      <header class="space-y-sm">
        <h1>{{ t('about.title') }}</h1>
        <p>{{ t('home.description') }}</p>
      </header>

      <ul class="guideline-list">
        <li v-for="rule in rules" :key="rule">
          {{ rule }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.guideline-list {
  margin: 0;
  padding-left: 1.6rem;
  display: grid;
  gap: 1rem;
  font-size: 1.1rem;
  color: var(--color-text-primary);
}

.guideline-list li {
  line-height: 1.6;
}

@media (max-width: 48rem) {
  .guideline-list {
    font-size: 1rem;
  }
}
</style>

