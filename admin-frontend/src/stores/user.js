import { defineStore } from 'pinia'
import * as authApi from '@/services/modules/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('admin_token') || '',
    profile: {
      username: '',
      role: '',
    },
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    displayName: (state) => state.profile?.username || '用户',
  },
  actions: {
    async login({ username, password }) {
      try {
        const response = await authApi.login({ username, password })
        this.token = response.token
        this.profile = {
          username: response.username,
          role: response.role,
        }
        localStorage.setItem('admin_token', this.token)
        return { success: true }
      } catch (error) {
        console.error('Login failed:', error)
        return {
          success: false,
          message: error.message || '登录失败，请检查用户名和密码',
        }
      }
    },
    logout() {
      this.token = ''
      this.profile = { username: '', role: '' }
      localStorage.removeItem('admin_token')
    },
  },
})

