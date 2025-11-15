<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '合作伙伴',
  },
  logos: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="partner-logos">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <div class="partner-logos__grid">
      <div v-for="logo in logos" :key="logo.name" class="partner-logos__item">
        <img :src="logo.logo" :alt="logo.name" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.partner-logos {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

.partner-logos__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 1rem;
  align-items: center;
}

.partner-logos__item {
  padding: 0.8rem;
  border-radius: var(--radius-md);
  border: 0.1rem solid var(--color-border);
  background: #fff;
  display: grid;
  place-items: center;
}

img {
  max-width: 100%;
  height: auto;
}
</style>

