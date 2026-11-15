import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, isLoggedIn: false }),
  actions: {
    login(data) { this.user = data; this.isLoggedIn = true },
    logout() { this.user = null; this.isLoggedIn = false },
    updateProfile(u) { if (this.user) this.user = { ...this.user, ...u } }
  },
  persist: true
})
