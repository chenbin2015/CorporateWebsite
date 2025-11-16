<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: () => ({
      address: 'XX 大学 XX 校区 XX 路 123 号',
      email: 'contact@example.edu',
      phone: '010-1234 5678',
      qr: 'https://picsum.photos/seed/contactqr/200/200',
    }),
  },
})
</script>

<template>
  <section class="contact-card-preview">
    <div class="contact-card-preview__info">
      <h3>联系方式</h3>
      <ul>
        <li>
          <span>地址</span>
          <strong>{{ props.info.address }}</strong>
        </li>
        <li>
          <span>电话</span>
          <strong>{{ props.info.phone }}</strong>
        </li>
        <li>
          <span>邮箱</span>
          <strong>{{ props.info.email }}</strong>
        </li>
      </ul>
    </div>
    <div class="contact-card-preview__qr">
      <img :src="props.info.qr" alt="QR" />
      <small>扫码获取更多信息</small>
    </div>
  </section>
</template>

<style scoped>
.contact-card-preview {
  background: #ffffff;
  border-radius: 0.9rem;
  padding: 1.6rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1.4rem;
  align-items: center;
}

.contact-card-preview__info h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0.9rem 0 0;
  display: grid;
  gap: 0.5rem;
}

li span {
  display: block;
  font-size: 0.8rem;
  color: #64748b;
}

li strong {
  font-size: 0.95rem;
}

.contact-card-preview__qr {
  text-align: center;
}

.contact-card-preview__qr img {
  width: 5.2rem;
  height: 5.2rem;
  object-fit: cover;
  border-radius: 0.6rem;
}

.contact-card-preview__qr small {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: #64748b;
}
</style>


