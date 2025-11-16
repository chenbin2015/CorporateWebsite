<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: '',
})

const loading = ref(false)

const handleSubmit = async () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    const result = await userStore.login(form)
    if (result.success) {
      ElMessage.success('登录成功')
      router.push({ name: 'dashboard' })
    } else {
      ElMessage.error(result.message || '登录失败')
    }
  } catch (error) {
    ElMessage.error('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-shell">
    <div class="auth-card">
      <div class="auth-card__hero">
        <p class="eyebrow">企业管理平台</p>
        <h1>登录你的数字化管理中枢</h1>
        <p>
          在统一工作台管理项目、页面和权限。支持跨团队协作、实时预览和一键发布。
        </p>
        <ul>
          <li>可视化搭建器实时预览</li>
          <li>项目/页面权限精细控制</li>
          <li>自动化发布与状态监控</li>
        </ul>
      </div>
      <form class="auth-form" @submit.prevent="handleSubmit">
        <h2>欢迎回来</h2>
        <p class="auth-form__subtitle">首次使用请向管理员申请账号</p>
        <label>
          <span>用户名</span>
          <input v-model="form.username" type="text" placeholder="admin@company.com" required />
        </label>
        <label>
          <span>密码</span>
          <input v-model="form.password" type="password" placeholder="输入登录密码" required />
        </label>
        <div class="auth-form__meta">
          <label class="checkbox">
            <input type="checkbox" />
            <span>记住我</span>
          </label>
          <button type="button" class="link-button">忘记密码？</button>
        </div>
        <button class="btn auth-form__submit" type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-shell {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1d4ed8, #0f172a 55%);
  display: grid;
  place-items: center;
  padding: 3rem 1.5rem;
}

.auth-card {
  width: min(72rem, 100%);
  background: rgba(15, 23, 42, 0.6);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 2rem 4rem rgba(2, 6, 23, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.auth-card__hero {
  padding: 2.5rem;
  color: #e2e8f0;
  backdrop-filter: blur(10px);
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.3rem;
  color: rgba(226, 232, 240, 0.8);
}

.auth-card__hero h1 {
  font-size: 2.4rem;
  margin: 1rem 0;
}

.auth-card__hero ul {
  margin: 1.5rem 0 0;
  padding-left: 1.5rem;
  color: rgba(226, 232, 240, 0.9);
}

.auth-form {
  background: #f8fafc;
  padding: 3rem;
  display: grid;
  gap: 1rem;
}

.auth-form h2 {
  margin: 0;
}

.auth-form__subtitle {
  margin: 0;
  color: var(--color-text-secondary);
}

label {
  display: grid;
  gap: 0.4rem;
  font-size: 0.95rem;
}

input {
  padding: 0.8rem 1rem;
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
}

.auth-form__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.link-button {
  border: none;
  background: none;
  color: var(--color-primary);
  cursor: pointer;
}

.auth-form__submit {
  width: 100%;
  justify-content: center;
  font-size: 1rem;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  box-shadow: 0 1rem 2rem rgba(37, 99, 235, 0.35);
}

@media (max-width: 48rem) {
  .auth-card {
    border-radius: 1rem;
  }

  .auth-form,
  .auth-card__hero {
    padding: 2rem;
  }
}
</style>

