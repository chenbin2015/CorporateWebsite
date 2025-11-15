<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: '',
})

const handleSubmit = () => {
  userStore.login(form)
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="login-page">
    <form class="login-card" @submit.prevent="handleSubmit">
      <h1>管理平台登录</h1>
      <label>
        <span>用户名</span>
        <input v-model="form.username" type="text" placeholder="请输入用户名" required />
      </label>

      <label>
        <span>密码</span>
        <input v-model="form.password" type="password" placeholder="请输入密码" required />
      </label>

      <button class="btn" type="submit">登录</button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #1d4ed8, #3b82f6);
  padding: 2rem;
}

.login-card {
  width: min(22rem, 100%);
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 2rem;
  display: grid;
  gap: 1rem;
  box-shadow: 0 1.5rem 3rem rgba(15, 23, 42, 0.25);
}

label {
  display: grid;
  gap: 0.4rem;
}

input {
  padding: 0.6rem 0.8rem;
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
}
</style>

