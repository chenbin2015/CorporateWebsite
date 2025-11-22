<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { UserFilled, Lock, Bell, Setting } from '@element-plus/icons-vue'

const userStore = useUserStore()

const profile = ref({
  username: '',
  role: '',
  email: '',
  phone: '',
})

const loading = ref(false)

// 加载用户信息
const loadProfile = async () => {
  loading.value = true
  try {
    // 从 store 中获取基本信息
    profile.value = {
      username: userStore.profile?.username || '',
      role: userStore.profile?.role || '',
      email: '', // 如果有 API 可以获取更多信息
      phone: '', // 如果有 API 可以获取更多信息
    }
  } catch (error) {
    console.error('Failed to load profile:', error)
    ElMessage.error('加载用户信息失败')
  } finally {
    loading.value = false
  }
}

// 处理功能按钮点击
const handleFeatureClick = (featureName) => {
  ElMessage.info(`${featureName}功能正在开发中，敬请期待`)
}

onMounted(() => {
  loadProfile()
})
</script>

<template>
  <div class="user-profile" v-loading="loading">
    <header class="profile-header">
      <div>
        <h1>个人中心</h1>
        <p>查看和管理您的个人信息</p>
      </div>
    </header>

    <div class="profile-content">
      <!-- 基本信息卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <el-icon><UserFilled /></el-icon>
            <span>基本信息</span>
          </div>
        </template>
        <div class="profile-info">
          <div class="avatar-section">
            <el-avatar :size="100">
              <el-icon :size="50"><UserFilled /></el-icon>
            </el-avatar>
            <h2>{{ profile.username || '用户' }}</h2>
            <el-tag :type="profile.role === 'ADMIN' ? 'danger' : 'primary'" size="large">
              {{ profile.role === 'ADMIN' ? '管理员' : '普通用户' }}
            </el-tag>
          </div>
          <div class="info-section">
            <div class="info-item">
              <span class="info-label">用户名</span>
              <span class="info-value">{{ profile.username || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">角色</span>
              <span class="info-value">{{ profile.role === 'ADMIN' ? '管理员' : '普通用户' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">邮箱</span>
              <span class="info-value">{{ profile.email || '未设置' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">手机号</span>
              <span class="info-value">{{ profile.phone || '未设置' }}</span>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 其他功能卡片 -->
      <div class="feature-cards">
        <el-card class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon><Lock /></el-icon>
              <span>账户安全</span>
            </div>
          </template>
          <div class="feature-content">
            <p>修改密码、管理登录设备等安全设置</p>
            <el-button type="primary" text @click="handleFeatureClick('账户安全')">前往设置</el-button>
          </div>
        </el-card>

        <el-card class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon><Bell /></el-icon>
              <span>消息通知</span>
            </div>
          </template>
          <div class="feature-content">
            <p>管理消息通知偏好设置</p>
            <el-button type="primary" text @click="handleFeatureClick('消息通知')">前往设置</el-button>
          </div>
        </el-card>

        <el-card class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </div>
          </template>
          <div class="feature-content">
            <p>个性化设置和偏好配置</p>
            <el-button type="primary" text @click="handleFeatureClick('系统设置')">前往设置</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface-contrast);
  padding: 1.5rem 2rem;
  border-radius: var(--radius-lg);
  border: 0.1rem solid var(--color-border);
}

.profile-header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.profile-header p {
  margin: 0.5rem 0 0;
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
}

.profile-content {
  display: grid;
  gap: 1.5rem;
}

.profile-card {
  border-radius: var(--radius-lg);
}

.profile-card :deep(.el-card__header) {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.profile-card :deep(.el-card__body) {
  padding: 2rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
}

.card-header .el-icon {
  color: var(--el-color-primary);
}

.profile-info {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.avatar-section h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.info-section {
  flex: 1;
  display: grid;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
}

.info-label {
  width: 100px;
  font-size: 0.9375rem;
  color: var(--el-text-color-secondary);
  flex-shrink: 0;
}

.info-value {
  flex: 1;
  font-size: 0.9375rem;
  color: var(--el-text-color-primary);
  font-weight: 500;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  border-radius: var(--radius-lg);
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.feature-card :deep(.el-card__header) {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.feature-card :deep(.el-card__body) {
  padding: 1.5rem;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-content p {
  margin: 0;
  color: var(--el-text-color-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
}

/* 响应式 */
@media (max-width: 768px) {
  .user-profile {
    padding: 1rem;
  }

  .profile-info {
    flex-direction: column;
    gap: 2rem;
  }

  .feature-cards {
    grid-template-columns: 1fr;
  }
}
</style>

