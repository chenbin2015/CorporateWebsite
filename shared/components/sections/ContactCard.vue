<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: () => ({
      address: '',
      email: '',
      phone: '',
      qr: '',
    }),
  },
})
</script>

<template>
  <section class="contact-card">
    <div class="contact-card__info">
      <h3>{{ $t('showcasePage.contactTitle') }}</h3>
      <ul>
        <li>
          <span>{{ $t('showcasePage.contactAddress') }}</span>
          <strong>{{ info.address }}</strong>
        </li>
        <li>
          <span>{{ $t('showcasePage.contactPhone') }}</span>
          <strong>{{ info.phone }}</strong>
        </li>
        <li>
          <span>{{ $t('showcasePage.contactEmail') }}</span>
          <strong>{{ info.email }}</strong>
        </li>
      </ul>
    </div>
    <div class="contact-card__qr">
      <img :src="info.qr" alt="QR" />
      <small>{{ $t('showcasePage.contactQR') }}</small>
    </div>
  </section>
</template>

<style scoped>
.contact-card {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1.6rem;
  align-items: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.6rem;
}

li span {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

li strong {
  font-size: 1rem;
}

.contact-card__qr {
  text-align: center;
}

.contact-card__qr img {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: var(--radius-md);
}
</style>

