<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '预约咨询',
  },
})

const handleSubmit = (event) => {
  event.preventDefault()
}
</script>

<template>
  <section class="simple-form">
    <h3>{{ title }}</h3>
    <form @submit="handleSubmit">
      <label>
        <span>姓名</span>
        <input type="text" required />
      </label>
      <label>
        <span>邮箱</span>
        <input type="email" required />
      </label>
      <label>
        <span>问题简述</span>
        <textarea rows="3" />
      </label>
      <button type="submit">提交</button>
    </form>
  </section>
</template>

<style scoped>
.simple-form {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
}

form {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.4rem;
}

input,
textarea {
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.6rem;
  font-size: 1rem;
}

button {
  border: none;
  border-radius: var(--radius-md);
  padding: 0.8rem;
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
}
</style>

