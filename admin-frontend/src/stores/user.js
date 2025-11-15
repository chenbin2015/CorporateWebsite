import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('admin_token') || '',
    profile: {
      name: 'Admin',
    },
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    displayName: (state) => state.profile?.name ?? '用户',
  },
  actions: {
    login({ username }) {
      this.token = `token-${username}-${Date.now()}`
      this.profile = { name: username || 'Admin' }
      localStorage.setItem('admin_token', this.token)
    },
    logout() {
      this.token = ''
      localStorage.removeItem('admin_token')
    },
  },
})

