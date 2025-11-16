<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '合作伙伴',
  },
  logos: {
    type: Array,
    default: () => [
      { name: 'Partner A', logo: 'https://picsum.photos/seed/logo1/200/80' },
      { name: 'Partner B', logo: 'https://picsum.photos/seed/logo2/200/80' },
      { name: 'Partner C', logo: 'https://picsum.photos/seed/logo3/200/80' },
      { name: 'Partner D', logo: 'https://picsum.photos/seed/logo4/200/80' },
    ],
  },
})
</script>

<template>
  <section class="partner-logos-preview">
    <header>
      <h3>{{ props.title }}</h3>
    </header>
    <div class="partner-logos-preview__grid">
      <div
        v-for="logo in props.logos"
        :key="logo.name"
        class="partner-logos-preview__item"
      >
        <img :src="logo.logo" :alt="logo.name" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.partner-logos-preview {
  background: #ffffff;
  border-radius: 0.9rem;
  padding: 1.4rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.partner-logos-preview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  gap: 0.9rem;
  align-items: center;
  margin-top: 0.8rem;
}

.partner-logos-preview__item {
  padding: 0.7rem;
  border-radius: 0.6rem;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  display: grid;
  place-items: center;
}

img {
  max-width: 100%;
  height: auto;
}
</style>


